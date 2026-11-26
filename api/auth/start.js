const crypto = require("crypto");
const { baseUrl, encode, requireConfig, safeReturnTo, sendError, setCookie, stateCookie } = require("../_lib/auth");

module.exports = async function start(req, res) {
  try {
    requireConfig();
    const audience = req.query.audience === "seller" ? "seller" : "customer";
    const returnTo = safeReturnTo(req.query.returnTo, audience);
    const state = crypto.randomBytes(32).toString("base64url");
    setCookie(res, req, stateCookie(audience), encode({ state, returnTo, exp: Math.floor(Date.now() / 1000) + 600 }), 600);
    const redirectUri = `${baseUrl(req)}/api/auth/callback`;
    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    url.search = new URLSearchParams({ client_id: process.env.GOOGLE_CLIENT_ID, redirect_uri: redirectUri, response_type: "code", scope: "openid email profile", state: `${audience}.${state}`, prompt: "select_account" });
    res.redirect(302, url.toString());
  } catch (error) { sendError(res, error); }
};
