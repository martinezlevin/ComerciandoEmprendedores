const crypto = require("crypto");
const { encode, sendError, sessionCookie, setCookie } = require("../_lib/auth");

// This endpoint exists only to make local UI development possible before a
// Google OAuth client is configured. Vercel production never enables it.
module.exports = async function devLogin(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido." });
  // Vercel's local worker does not reliably forward .env.local values into
  // every function process. localhost is therefore an explicit development
  // boundary; this path remains unavailable on any deployed hostname.
  const host = String(req.headers.host || "").toLowerCase();
  const isLocal = host.startsWith("localhost:") || host.startsWith("127.0.0.1:");
  if (!isLocal && process.env.DEV_AUTH_ENABLED !== "true") {
    return res.status(404).json({ error: "No disponible." });
  }
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();
    const password = String(req.body?.password || "");
    const expectedEmail = String(process.env.DEV_SUPERUSER_EMAIL || "dev-admin@comerciando.local").trim().toLowerCase();
    const expectedPassword = String(process.env.DEV_SUPERUSER_PASSWORD || "ComerciandoDev!2026");
    const actualPassword = Buffer.from(password);
    const configuredPassword = Buffer.from(expectedPassword);
    if (!expectedEmail || !expectedPassword || email !== expectedEmail || actualPassword.length !== configuredPassword.length || !crypto.timingSafeEqual(actualPassword, configuredPassword)) {
      return res.status(401).json({ error: "Credenciales de desarrollo inválidas." });
    }
    const session = encode({
      audience: "seller",
      sub: "dev-superuser",
      email: expectedEmail,
      name: "Superusuario de desarrollo",
      givenName: "Superusuario",
      familyName: "Desarrollo",
      picture: "",
      role: "Administrador",
      exp: Math.floor(Date.now() / 1000) + 8 * 60 * 60,
    });
    setCookie(res, req, sessionCookie("seller"), session, 8 * 60 * 60);
    res.status(200).json({ authenticated: true });
  } catch (error) { sendError(res, error); }
};
