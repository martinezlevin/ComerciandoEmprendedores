const { getSession } = require("../_lib/auth");
module.exports = function session(req, res) {
  const audience = req.query.audience === "seller" ? "seller" : "customer";
  const data = getSession(req, audience);
  if (!data) return res.status(401).json({ authenticated: false });
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ authenticated: true, user: { id: data.sub, email: data.email, name: data.name, givenName: data.givenName, familyName: data.familyName, picture: data.picture, role: data.role } });
};
