const { allowedSeller, baseUrl, clearCookie, cookies, decode, encode, safeReturnTo, sendError, sessionCookie, setCookie, stateCookie, verifyGoogleCode } = require("../_lib/auth");

module.exports = async function callback(req, res) {
  const rawState = String(req.query.state || "");
  const [audience, state] = rawState.split(".");
  const loginUrl = audience === "seller" ? "/login.html" : "/catalogo.html";
  try {
    if (!state || !["customer", "seller"].includes(audience)) throw new Error("La respuesta de inicio de sesión no es válida.");
    const stored = decode(cookies(req)[stateCookie(audience)] || "");
    if (!stored || stored.state !== state || stored.exp < Math.floor(Date.now() / 1000)) throw new Error("La solicitud de inicio de sesión venció. Intentá nuevamente.");
    clearCookie(res, req, stateCookie(audience));
    if (req.query.error) throw new Error(req.query.error === "access_denied" ? "Cancelaste el inicio de sesión con Google." : "Google no pudo completar el inicio de sesión.");
    const profile = await verifyGoogleCode(String(req.query.code || ""), `${baseUrl(req)}/api/auth/callback`);
    const role = audience === "seller" ? allowedSeller(profile.email) : "Cliente";
    if (audience === "seller" && !role) {
      res.redirect(302, "/login.html?authError=not_authorized");
      return;
    }
    const session = encode({ audience, sub: profile.sub, email: profile.email, name: profile.name || profile.email, givenName: profile.given_name || "", familyName: profile.family_name || "", picture: profile.picture || "", role, exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 });
    setCookie(res, req, sessionCookie(audience), session, 7 * 24 * 60 * 60);
    res.redirect(302, safeReturnTo(stored.returnTo, audience));
  } catch (error) {
    res.redirect(302, `${loginUrl}?authError=${encodeURIComponent(error.message || "oauth_failed")}`);
  }
};
