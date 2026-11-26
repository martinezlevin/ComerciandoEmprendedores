const { clearCookie } = require("../_lib/auth");
module.exports = function logout(req, res) {
  const audience = req.query.audience === "seller" ? "seller" : "customer";
  clearCookie(res, req, `ce_${audience}_session`);
  res.status(204).end();
};
