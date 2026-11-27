module.exports = function config(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    googleEnabled: false,
  });
};
