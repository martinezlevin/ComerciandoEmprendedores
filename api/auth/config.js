module.exports = function config(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    googleEnabled: Boolean(
      process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      String(process.env.SESSION_SECRET || "").length >= 32,
    ),
  });
};
