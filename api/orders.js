const { getSession } = require("./_lib/auth");
module.exports = function createOrder(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido." });
  const customer = getSession(req, "customer");
  if (!customer) return res.status(401).json({ error: "Tu sesión de cliente venció. Volvé a iniciar sesión." });
  const items = Array.isArray(req.body?.items) ? req.body.items : [];
  if (!items.length) return res.status(400).json({ error: "El pedido no contiene productos." });
  // La persistencia de inventario/pedidos pertenece a la base de datos del comercio.
  // Este endpoint deja la autorización del pedido protegida antes de esa integración.
  res.status(201).json({ id: `WEB-${Date.now().toString().slice(-8)}`, customer: { email: customer.email, name: customer.name } });
};
