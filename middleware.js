export const config = { matcher: ["/", "/index.html"] };

const text = new TextEncoder();
const b64 = (value) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  return Uint8Array.from(atob(normalized + "=".repeat((4 - normalized.length % 4) % 4)), (char) => char.charCodeAt(0));
};
async function validSeller(cookie) {
  try {
    const [body, signature] = (cookie || "").split(".");
    if (!body || !signature || !process.env.SESSION_SECRET) return false;
    const key = await crypto.subtle.importKey("raw", text.encode(process.env.SESSION_SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
    const ok = await crypto.subtle.verify("HMAC", key, b64(signature), text.encode(body));
    const payload = JSON.parse(new TextDecoder().decode(b64(body)));
    return ok && payload.audience === "seller" && payload.exp > Math.floor(Date.now() / 1000);
  } catch { return false; }
}
export default async function middleware(request) {
  const host = request.headers.get("host") || "";
  if (host.startsWith("tienda.") || host.startsWith("catalogo.")) return;
  // Vercel production provides request.cookies; `vercel dev` may provide the
  // Node-compatible request shape instead, so parse Cookie as a safe fallback.
  const cookieHeader = request.headers.get("cookie") || "";
  const cookieValue = request.cookies?.get?.("ce_seller_session")?.value ||
    cookieHeader.split(/;\s*/).find((item) => item.startsWith("ce_seller_session="))?.slice("ce_seller_session=".length);
  if (await validSeller(cookieValue)) return;
  const url = new URL("/login.html?authError=session_required", request.url);
  return Response.redirect(url, 302);
}
