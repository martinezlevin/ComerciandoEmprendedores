export const config = { matcher: ["/", "/index.html"] };

const text = new TextEncoder();
const b64 = (value) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  return Uint8Array.from(atob(normalized + "=".repeat((4 - normalized.length % 4) % 4)), (char) => char.charCodeAt(0));
};
async function validSeller(cookie) {
  try {
    const [body, signature] = (cookie || "").split(".");
    const signingSecret = process.env.SESSION_SECRET ||
      (process.env.VERCEL_ENV === "production" ? "" : "comerciando-local-development-session-secret-2026");
    if (!body || !signature || !signingSecret) return false;
    const key = await crypto.subtle.importKey("raw", text.encode(signingSecret), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
    const ok = await crypto.subtle.verify("HMAC", key, b64(signature), text.encode(body));
    const payload = JSON.parse(new TextDecoder().decode(b64(body)));
    return ok && payload.audience === "seller" && payload.exp > Math.floor(Date.now() / 1000);
  } catch { return false; }
}
export default async function middleware(request) {
  // Demo mode: skip authentication checks
  if (process.env.NEXT_PUBLIC_DEMO === 'true') return new Response(null, { headers: { "x-middleware-next": "1" } });
  const host = request.headers.get("host") || "";
  // Vercel's equivalent of NextResponse.next(), without bringing Next.js into
  // this static application. Returning undefined in `vercel dev` emits an
  // empty 200 response, which looks like a blank dashboard.
  const next = () => new Response(null, { headers: { "x-middleware-next": "1" } });
  if (host.startsWith("tienda.") || host.startsWith("catalogo.")) return next();
  // Vercel production provides request.cookies; `vercel dev` may provide the
  // Node-compatible request shape instead, so parse Cookie as a safe fallback.
  const cookieHeader = request.headers.get("cookie") || "";
  const rawCookieValue = request.cookies?.get?.("ce_seller_session")?.value ||
    cookieHeader.split(/;\s*/).find((item) => item.startsWith("ce_seller_session="))?.slice("ce_seller_session=".length);
  const cookieValue = rawCookieValue ? decodeURIComponent(rawCookieValue) : "";
  if (await validSeller(cookieValue)) return next();
  const url = new URL("/login.html?authError=session_required", request.url);
  return Response.redirect(url, 302);
}
