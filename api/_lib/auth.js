const crypto = require("crypto");
const { OAuth2Client } = require("google-auth-library");

const DAY = 24 * 60 * 60;
const b64 = (value) => Buffer.from(typeof value === "string" ? value : JSON.stringify(value)).toString("base64url");
const unb64 = (value) => Buffer.from(value, "base64url").toString("utf8");
// `vercel dev` can isolate functions from `.env.local`; a deterministic
// localhost-only fallback keeps the developer login testable. Production has
// no fallback: SESSION_SECRET remains mandatory through requireConfig().
const secret = () => process.env.SESSION_SECRET ||
  (process.env.VERCEL_ENV === "production" ? "" : "comerciando-local-development-session-secret-2026");

function requireConfig() {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || secret().length < 32) {
    const err = new Error("OAuth no está configurado en el servidor.");
    err.statusCode = 503;
    throw err;
  }
}

function sign(value) {
  return crypto.createHmac("sha256", secret()).update(value).digest("base64url");
}

function encode(payload) {
  const body = b64(payload);
  return `${body}.${sign(body)}`;
}

function decode(token) {
  if (!token || !secret()) return null;
  const [body, signature] = String(token).split(".");
  const received = Buffer.from(signature || "");
  const expected = Buffer.from(body ? sign(body) : "");
  if (!body || !signature || received.length !== expected.length || !crypto.timingSafeEqual(received, expected)) return null;
  try {
    const payload = JSON.parse(unb64(body));
    return payload.exp > Math.floor(Date.now() / 1000) ? payload : null;
  } catch { return null; }
}

function cookies(req) {
  return Object.fromEntries(String(req.headers.cookie || "").split(/;\s*/).filter(Boolean).map((part) => {
    const idx = part.indexOf("=");
    return [part.slice(0, idx), decodeURIComponent(part.slice(idx + 1))];
  }));
}

function isSecure(req) {
  // `vercel dev` reports NODE_ENV=production even while serving HTTP on
  // localhost. Secure cookies would then be dropped by the browser. Detect
  // the actual request/public URL instead.
  return req.headers["x-forwarded-proto"] === "https" || String(process.env.APP_BASE_URL || "").startsWith("https://");
}

function setCookie(res, req, name, value, maxAge = DAY) {
  const cookie = `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${isSecure(req) ? "; Secure" : ""}`;
  const previous = res.getHeader("Set-Cookie");
  res.setHeader("Set-Cookie", previous ? [].concat(previous, cookie) : cookie);
}

function clearCookie(res, req, name) { setCookie(res, req, name, "", 0); }
function sessionCookie(audience) { return `ce_${audience}_session`; }
function stateCookie(audience) { return `ce_${audience}_oauth_state`; }
function getSession(req, audience) {
  const payload = decode(cookies(req)[sessionCookie(audience)]);
  return payload?.audience === audience ? payload : null;
}

function baseUrl(req) {
  return (process.env.APP_BASE_URL || `${isSecure(req) ? "https" : "http"}://${req.headers["x-forwarded-host"] || req.headers.host}`).replace(/\/$/, "");
}

function safeReturnTo(value, audience) {
  const fallback = audience === "seller" ? "/index.html" : "/catalogo.html";
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") ? value : fallback;
}

function allowedSeller(email) {
  const normal = String(email || "").trim().toLowerCase();
  const owner = String(process.env.VENDOR_OWNER_EMAIL || "").trim().toLowerCase();
  const collaborators = String(process.env.VENDOR_COLLABORATOR_EMAILS || "").split(",").map((item) => item.trim().toLowerCase()).filter(Boolean);
  if (normal && normal === owner) return "Administrador";
  return collaborators.includes(normal) ? "Colaborador" : null;
}

async function verifyGoogleCode(code, redirectUri) {
  requireConfig();
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });
  const tokens = await tokenResponse.json();
  if (!tokenResponse.ok || !tokens.id_token) throw new Error("Google no devolvió una identidad válida.");
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const ticket = await client.verifyIdToken({ idToken: tokens.id_token, audience: process.env.GOOGLE_CLIENT_ID });
  const profile = ticket.getPayload();
  if (!profile?.sub || !profile.email || !profile.email_verified) throw new Error("La cuenta de Google no tiene un correo verificado.");
  return profile;
}

function sendError(res, error) {
  const status = error.statusCode || 500;
  res.status(status).json({ error: error.message || "No se pudo completar la operación." });
}

module.exports = { DAY, allowedSeller, baseUrl, clearCookie, cookies, decode, encode, getSession, requireConfig, safeReturnTo, sendError, sessionCookie, setCookie, stateCookie, verifyGoogleCode };
