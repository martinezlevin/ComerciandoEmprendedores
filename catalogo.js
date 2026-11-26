/* Lógica de la OnePage Catálogo Online estilo Market — Comerciando */
"use strict";

const STORE_STATE_KEY = "comerciando_emprendedores_state_v2";
const STORE_THEME_KEY = "comerciando_emprendedores_theme_v1";
const STORE_CART_KEY = "comerciando_public_store_cart_v1";
const STORE_CUSTOMER_KEY = "comerciando_store_customer_v1";
const ADMIN_AUTH_KEY = "comerciando_auth_session";
const STORE_CHECKOUT_AFTER_LOGIN_KEY = "comerciando_store_checkout_after_login_v1";

const DEFAULT_SEED = [
  ["Yerba mate Playadito 1 kg", "Almacén", 4700, 6600, 28, 6, "🧉", "7790000000011", "img/Products/yerba.webp"],
  ["Arroz Gallo Oro 1 kg", "Almacén", 1980, 2900, 37, 8, "🍚", "7790000000012", "img/Products/arroz.webp"],
  ["Fideos Matarazzo 500 g", "Almacén", 1180, 1850, 46, 10, "🍝", "7790000000013", "img/Products/fideos.webp"],
  ["Aceite Cocinero girasol 900 ml", "Almacén", 3010, 4250, 24, 5, "🫒", "7790000000014", "img/Products/aceite.webp"],
  ["Harina 000 Pureza 1 kg", "Almacén", 930, 1450, 50, 7, "🌾", "7790000000015", "img/Products/harina.webp"],
  ["Azúcar Ledesma 1 kg", "Almacén", 1120, 1750, 31, 7, "🍬", "7790000000016", "img/Products/azucar.webp"],
  ["Galletitas dulces 350 g", "Desayuno", 1210, 1800, 22, 5, "🍪", "7790000000017", "img/Products/galletas.webp"],
  ["Agua mineral 1,5 L", "Bebidas", 980, 1900, 41, 10, "💧", "7790000000018", "img/Products/agua.webp"],
  ["Chocolate 100 g", "Golosinas", 2150, 3300, 15, 5, "🍫", "7790000000019", "img/Products/chocolate.webp"],
];

const $ = (s) => document.querySelector(s);
const esc = (x) =>
  String(x ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
const money = (x) =>
  "$ " + Number(x || 0).toLocaleString("es-AR", { maximumFractionDigits: 2 });

const SVG = {
  sun: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
  moon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>`,
  plus: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
  minus: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>`,
  trash: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
  chevronUp: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`,
  chevronDown: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
  check: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`,
  user: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  google: `<svg width="17" height="17" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.25-.96 2.31-2.04 3.02l3.3 2.56c1.92-1.77 3.04-4.38 3.04-7.48 0-.71-.06-1.4-.18-2.06H12Z"/><path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.3-2.56c-.91.61-2.08.98-3.32.98-2.55 0-4.71-1.72-5.48-4.04H3.1v2.64A10 10 0 0 0 12 22Z"/><path fill="#4A90E2" d="M6.52 13.96A5.99 5.99 0 0 1 6.2 12c0-.68.12-1.34.32-1.96V7.4H3.1A10 10 0 0 0 2 12c0 1.61.38 3.14 1.1 4.6l3.42-2.64Z"/><path fill="#FBBC05" d="M12 6c1.47 0 2.79.5 3.83 1.5l2.87-2.87C16.95 2.98 14.7 2 12 2A10 10 0 0 0 3.1 7.4l3.42 2.64C7.29 7.72 9.45 6 12 6Z"/></svg>`,
  apple: `<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M16.36 12.76c.02 2.2 1.93 2.94 1.95 2.95-.02.05-.3 1.04-1 2.06-.6.88-1.23 1.76-2.22 1.78-.97.02-1.28-.58-2.4-.58-1.11 0-1.46.56-2.38.6-.95.04-1.68-.95-2.28-1.83-1.24-1.79-2.19-5.05-.91-7.27.63-1.1 1.76-1.8 2.99-1.82.93-.02 1.81.63 2.38.63.57 0 1.64-.78 2.77-.67.47.02 1.8.19 2.65 1.44-.07.04-1.58.92-1.55 2.73ZM14.52 6.95c.51-.62.85-1.48.76-2.34-.73.03-1.62.49-2.14 1.1-.47.54-.88 1.42-.77 2.26.82.06 1.64-.41 2.15-1.02Z"/></svg>`,
  store: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"/></svg>`,
  truck: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>`,
  mapPin: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`,
  clock: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  banknote: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>`,
  landmark: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>`,
  copy: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,
  messageCircle: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>`,
  alertCircle: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
  arrowLeft: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,
  arrowRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  externalLink: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>`,
};

// Íconos 3D estilo Thiings para categorías (usa img/icons/<slug>.png si existe, con fallback al ícono 3D)
const CAT_VISUALS = {
  Todas: { slug: "todas", bg: "linear-gradient(135deg,#2f5bea,#5b86ff)", icon: "🛍️" },
  Almacén: { slug: "almacen", bg: "linear-gradient(135deg,#f59e0b,#fbbf24)", icon: "🧺" },
  Desayuno: { slug: "desayuno", bg: "linear-gradient(135deg,#ec4899,#f472b6)", icon: "🥐" },
  Bebidas: { slug: "bebidas", bg: "linear-gradient(135deg,#06b6d4,#38bdf8)", icon: "🥤" },
  "Bebidas alcohólicas": { slug: "bebidas-alcoholicas", bg: "linear-gradient(135deg,#7c3aed,#a855f7)", icon: "🍷" },
  Golosinas: { slug: "golosinas", bg: "linear-gradient(135deg,#8b5cf6,#a78bfa)", icon: "🍫" },
  Caramelos: { slug: "caramelos", bg: "linear-gradient(135deg,#f43f5e,#fb7185)", icon: "🍬" },
  Lácteos: { slug: "lacteos", bg: "linear-gradient(135deg,#3b82f6,#60a5fa)", icon: "🥛" },
  Panadería: { slug: "panaderia", bg: "linear-gradient(135deg,#d97706,#f59e0b)", icon: "🥖" },
  "Panadería dulce": { slug: "panaderia-dulce", bg: "linear-gradient(135deg,#db2777,#f472b6)", icon: "🧁" },
  Postres: { slug: "postres", bg: "linear-gradient(135deg,#e11d48,#fda4af)", icon: "🍰" },
  "Frutas y Verduras": { slug: "verduleria", bg: "linear-gradient(135deg,#16a34a,#4ade80)", icon: "🥬" },
  Carnes: { slug: "carnes", bg: "linear-gradient(135deg,#dc2626,#f87171)", icon: "🥩" },
  Pollería: { slug: "polleria", bg: "linear-gradient(135deg,#ea580c,#fb923c)", icon: "🍗" },
  Congelados: { slug: "congelados", bg: "linear-gradient(135deg,#0ea5e9,#7dd3fc)", icon: "🧊" },
  "Sin gluten": { slug: "sin-gluten", bg: "linear-gradient(135deg,#65a30d,#a3e635)", icon: "🌾" },
  Limpieza: { slug: "limpieza", bg: "linear-gradient(135deg,#14b8a6,#5eead4)", icon: "🧼" },
  "Cuidado personal": { slug: "cuidado-personal", bg: "linear-gradient(135deg,#a855f7,#d8b4fe)", icon: "🧴" },
  Farmacia: { slug: "farmacia", bg: "linear-gradient(135deg,#10b981,#34d399)", icon: "💊" },
  Bebé: { slug: "bebe", bg: "linear-gradient(135deg,#38bdf8,#93c5fd)", icon: "🍼" },
  Mascotas: { slug: "mascotas", bg: "linear-gradient(135deg,#f97316,#fdba74)", icon: "🐾" },
  Hogar: { slug: "hogar", bg: "linear-gradient(135deg,#0d9488,#2dd4bf)", icon: "🏠" },
  Ferretería: { slug: "ferreteria", bg: "linear-gradient(135deg,#475569,#94a3b8)", icon: "🛠️" },
  Automotor: { slug: "automotor", bg: "linear-gradient(135deg,#1e293b,#64748b)", icon: "🚗" },
  Tecnología: { slug: "tecnologia", bg: "linear-gradient(135deg,#334155,#64748b)", icon: "🎧" },
  Librería: { slug: "libreria", bg: "linear-gradient(135deg,#e11d48,#fb7185)", icon: "📚" },
  Juguetes: { slug: "juguetes", bg: "linear-gradient(135deg,#f59e0b,#fcd34d)", icon: "🧸" },
  Regalos: { slug: "regalos", bg: "linear-gradient(135deg,#ec4899,#f9a8d4)", icon: "🎁" },
  Navidad: { slug: "navidad", bg: "linear-gradient(135deg,#b91c1c,#ef4444)", icon: "🎄" },
  Indumentaria: { slug: "indumentaria", bg: "linear-gradient(135deg,#6366f1,#a5b4fc)", icon: "👕" },
  Abrigos: { slug: "abrigos", bg: "linear-gradient(135deg,#4f46e5,#818cf8)", icon: "🧥" },
  Buzo: { slug: "buzo", bg: "linear-gradient(135deg,#2563eb,#60a5fa)", icon: "🧶" },
  Sweater: { slug: "sweater", bg: "linear-gradient(135deg,#7c3aed,#c084fc)", icon: "🧣" },
  Pantalones: { slug: "pantalones", bg: "linear-gradient(135deg,#1d4ed8,#3b82f6)", icon: "👖" },
  Bermudas: { slug: "bermudas", bg: "linear-gradient(135deg,#0284c7,#38bdf8)", icon: "🩳" },
  Shorts: { slug: "shorts", bg: "linear-gradient(135deg,#0891b2,#22d3ee)", icon: "🩳" },
  Calzas: { slug: "calzas", bg: "linear-gradient(135deg,#9333ea,#c084fc)", icon: "🧘" },
  Vestidos: { slug: "vestidos", bg: "linear-gradient(135deg,#db2777,#f472b6)", icon: "👗" },
  Calzado: { slug: "calzado", bg: "linear-gradient(135deg,#ea580c,#fb923c)", icon: "👟" },
  Sombreros: { slug: "sombreros", bg: "linear-gradient(135deg,#b45309,#f59e0b)", icon: "🧢" },
  Lencería: { slug: "lenceria", bg: "linear-gradient(135deg,#be185d,#f472b6)", icon: "👙" },
  "Ropa interior": { slug: "ropa-interior", bg: "linear-gradient(135deg,#4338ca,#818cf8)", icon: "🩲" },
};

function slugifyCategory(cat) {
  return String(cat || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getCategoryVisual(cat) {
  const base = CAT_VISUALS[cat] || {
    slug: slugifyCategory(cat) || "general",
    bg: "linear-gradient(135deg,#1d9a62,#4cc88b)",
    icon: "📦",
  };
  return {
    ...base,
    imgPath: `img/icons/${base.slug}.png`,
  };
}

let storeName = "Mi emprendimiento";
let storeConfig = {
  address: "Av. Corrientes 1234, CABA",
  lat: -34.603722,
  lng: -58.381592,
  hours: "Lunes a Viernes de 9:00 a 19:00 · Sábados de 9:00 a 14:00",
  alias: "comerciando.demo.mp",
  cbu: "0000003100012345678901",
  whatsapp: "5491123456789",
};
let allProducts = [];
let activeCategory = "Todas";
let searchTerm = "";
let viewMode = "cards";
let cart = {};
let cartDrawerOpen = false;
let customerUser = null;
let toastTimer = null;

function parseProductTitle(rawName) {
  const str = String(rawName || "").trim();
  const regex =
    /\s+(\d+(?:[.,]\d+)?\s*(?:kg|g|gr|grs|mg|l|lt|lts|ml|cc|cm3|u|unidades|pack|u\.)(?:\s.*)?)$/i;
  const match = str.match(regex);
  if (match) {
    return {
      title: str.slice(0, match.index).trim(),
      spec: match[1].trim(),
    };
  }
  return { title: str, spec: "" };
}

function loadStoreData() {
  let loaded = null;
  try {
    const raw = localStorage.getItem(STORE_STATE_KEY);
    if (raw) loaded = JSON.parse(raw);
  } catch {}

  if (loaded && loaded.storeConfig && typeof loaded.storeConfig === "object") {
    storeConfig = { ...storeConfig, ...loaded.storeConfig };
  }
  if (loaded && Array.isArray(loaded.products) && loaded.products.length > 0) {
    allProducts = loaded.products.filter((p) => p && p.published);
    if (loaded.store) storeName = loaded.store;
  } else {
    allProducts = DEFAULT_SEED.map((p, i) => ({
      id: i + 1,
      name: p[0],
      cat: p[1],
      cost: p[2],
      price: p[3],
      stock: p[4],
      min: p[5],
      emoji: p[6],
      barcode: p[7],
      published: true,
      image: p[8] || "",
    }));
  }

  try {
    const rawCart = localStorage.getItem(STORE_CART_KEY);
    if (rawCart) {
      const parsed = JSON.parse(rawCart);
      if (parsed && typeof parsed === "object") cart = parsed;
    }
  } catch {}

  try {
    const rawCust = localStorage.getItem(STORE_CUSTOMER_KEY);
    if (rawCust) {
      customerUser = JSON.parse(rawCust);
    }
  } catch {}
}

function saveCart() {
  try {
    localStorage.setItem(STORE_CART_KEY, JSON.stringify(cart));
  } catch {}
}

function saveCustomerUser(user) {
  customerUser = user;
  try {
    if (user) localStorage.setItem(STORE_CUSTOMER_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORE_CUSTOMER_KEY);
  } catch {}
  renderAuthButton();
}

function showToast(msg) {
  const el = $("#storeToast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("on"), 2600);
}

function applyTheme(theme) {
  const next = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(STORE_THEME_KEY, next);
  } catch {}
  const iconEl = $("#themeToggleIcon");
  const labelEl = $("#themeToggleLabel");
  if (iconEl) iconEl.innerHTML = next === "dark" ? SVG.sun : SVG.moon;
  if (labelEl) labelEl.textContent = next === "dark" ? "Claro" : "Oscuro";
}

function renderAuthButton() {
  const btn = $("#storeAuthBtn");
  if (!btn) return;
  if (customerUser && customerUser.name) {
    const initials = customerUser.name
      .split(/\s+/)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase() || "")
      .join("");
    const avatar = customerUser.picture
      ? `<img class="store-user-avatar store-user-avatar-photo" src="${esc(customerUser.picture)}" alt="">`
      : `<span class="store-user-avatar">${esc(initials || "U")}</span>`;
    btn.innerHTML = `${avatar}<span>${esc(customerUser.name.split(" ")[0])}</span>`;
    btn.title = `Sesión iniciada (${customerUser.provider || "Comerciando"})`;
  } else {
    btn.innerHTML = `${SVG.user}<span>Iniciar sesión</span>`;
    btn.title = "Iniciar sesión con Comerciando, Google o Apple";
  }
}

function avatarHtml(p) {
  if (p?.image) {
    return `<div class="lite-productmark" style="padding:0;overflow:hidden"><img src="${esc(p.image)}" alt="${esc(p.name)}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit"></div>`;
  }
  return `<div class="lite-productmark">${esc(p?.emoji || "📦")}</div>`;
}

function renderFloatQty(p) {
  const outOfStock = p.stock <= 0;
  const inCart = cart[p.id] || 0;
  if (outOfStock) {
    return `<div class="market-qty-float"><button type="button" class="market-add-circle market-add-disabled" disabled aria-label="Producto agotado">!</button></div>`;
  }
  if (inCart > 0) {
    return `
      <div class="market-qty-float" onclick="event.stopPropagation()">
        <div class="market-qty-pill">
          <button type="button" data-qty="${p.id}" data-delta="-1" aria-label="Quitar uno">${SVG.minus}</button>
          <span>${inCart}</span>
          <button type="button" data-qty="${p.id}" data-delta="1" aria-label="Agregar uno">${SVG.plus}</button>
        </div>
      </div>
    `;
  }
  return `<div class="market-qty-float"><button type="button" class="market-add-circle" data-add="${p.id}" aria-label="Agregar ${esc(p.name)}">${SVG.plus}</button></div>`;
}

function renderCard(p) {
  const outOfStock = p.stock <= 0;
  const isLowStock = !outOfStock && p.stock <= p.min;
  const parsed = parseProductTitle(p.name);
  const displayName = parsed.spec ? parsed.title : p.name;
  const specBadge = parsed.spec
    ? `<span class="pro-card-spec">${esc(parsed.spec)}</span>`
    : "";
  const media = p.image
    ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" class="pro-card-img" loading="lazy">`
    : `<div class="pro-card-placeholder"><span>${esc(p.emoji || "📦")}</span></div>`;

  return `
    <article class="pro-card market-card ${outOfStock ? "out-of-stock" : ""}" ${outOfStock ? "aria-disabled=\"true\"" : `data-add="${p.id}"`}>
      <div class="pro-card-media" role="button" tabindex="0">
        ${media}
        ${outOfStock ? '<span class="store-stock-badge sold-out">AGOTADO</span>' : isLowStock ? '<span class="store-stock-badge low-stock">ÚLTIMAS UNIDADES</span>' : ""}
        ${renderFloatQty(p)}
      </div>
      <div class="pro-card-body">
        <div class="pro-card-price" style="font-size:17px;margin-bottom:2px">${money(p.price)}</div>
        <h3 class="pro-card-title" title="${esc(p.name)}">${esc(displayName)}</h3>
        <div class="pro-card-meta">
          ${specBadge}
        </div>
      </div>
    </article>
  `;
}

function renderListRow(p) {
  const outOfStock = p.stock <= 0;
  const isLowStock = !outOfStock && p.stock <= p.min;
  const parsed = parseProductTitle(p.name);
  const displayName = parsed.spec ? parsed.title : p.name;
  const media = p.image
    ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" class="pro-list-img" loading="lazy">`
    : `<div class="pro-list-placeholder"><span>${esc(p.emoji || "📦")}</span></div>`;

  return `
    <article class="pro-list-row ${outOfStock ? "out-of-stock" : ""}" ${outOfStock ? "aria-disabled=\"true\"" : `data-add="${p.id}"`}>
      <div class="pro-list-media">${media}</div>
      <div class="pro-list-info">
        <h3 class="pro-list-title">${esc(displayName)}</h3>
        <div class="pro-list-meta">
          <span class="pro-list-cat">${esc(p.cat || "")}</span>
          ${outOfStock ? '<span class="store-stock-badge sold-out">AGOTADO</span>' : isLowStock ? '<span class="store-stock-badge low-stock">ÚLTIMAS UNIDADES</span>' : ""}
          ${parsed.spec ? `<span class="pro-list-dot">·</span><span class="pro-card-spec">${esc(parsed.spec)}</span>` : ""}
        </div>
      </div>
      <div class="pro-list-right">
        <div class="pro-list-price">${money(p.price)}</div>
        <button type="button" class="pro-card-round-btn ${outOfStock ? "out-of-stock-btn" : ""}" ${outOfStock ? "disabled" : `data-add="${p.id}"`} aria-label="${outOfStock ? "Producto agotado" : `Agregar ${esc(p.name)} al carrito`}">
          <span class="pro-round-plus" aria-hidden="true">${outOfStock ? "!" : "+"}</span>
        </button>
      </div>
    </article>
  `;
}

function renderCatalog() {
  $("#storeName").textContent = storeName;
  document.title = `${storeName} — Catálogo Online`;

  // Sólo se muestran categorías con productos publicados: las vacías no ocupan espacio.
  const productCats = [...new Set(allProducts.map((p) => p.cat).filter(Boolean))];
  const cats = ["Todas", ...productCats];
  if (!cats.includes(activeCategory)) activeCategory = "Todas";

  $("#storeChips").innerHTML = cats
    .map((c) => {
      const vis = getCategoryVisual(c);
      return `
        <button type="button" class="store-cat-tile ${activeCategory === c ? "on" : ""}" data-cat="${esc(c)}" role="tab" aria-selected="${activeCategory === c}">
          <div class="store-cat-icon3d">
            <img src="${esc(vis.imgPath)}" alt="${esc(c)}" onerror="this.style.display='none';this.nextElementSibling.style.display='inline';" />
            <span style="display:none;font-size:34px;line-height:1">${vis.icon}</span>
          </div>
          <span>${esc(c)}</span>
        </button>
      `;
    })
    .join("");

  const q = searchTerm.trim().toLowerCase();
  const filtered = allProducts.filter(
    (p) =>
      (activeCategory === "Todas" || p.cat === activeCategory) &&
      (!q ||
        p.name.toLowerCase().includes(q) ||
        (p.cat && p.cat.toLowerCase().includes(q))),
  );

  $("#storeCountLabel").textContent = `${filtered.length} ${filtered.length === 1 ? "producto" : "productos"}`;

  const container = $("#storeGrid");
  if (!filtered.length) {
    container.innerHTML = `<p class="lite-empty">No encontramos productos para "${esc(searchTerm || activeCategory)}".</p>`;
    return;
  }

  // Agrupación estilo Rappi Market por categoría cuando está en "Todas"
  const groups =
    activeCategory === "Todas" && !q
      ? [...new Set(filtered.map((p) => p.cat || "Otros"))].map((catName) => ({
          title: catName,
          items: filtered.filter((p) => (p.cat || "Otros") === catName),
        }))
      : [{ title: activeCategory === "Todas" ? "Resultados" : activeCategory, items: filtered }];

  container.innerHTML = groups
    .map((g) => {
      const body =
        viewMode === "cards"
          ? `<div class="grid pro-cards-grid">${g.items.map(renderCard).join("")}</div>`
          : `<div class="pro-list-container">${g.items.map(renderListRow).join("")}</div>`;
      return `
        <div class="store-shelf">
          <div class="store-shelf-head">
            <h3>${esc(g.title)}</h3>
            <span>${g.items.length} ${g.items.length === 1 ? "artículo" : "artículos"}</span>
          </div>
          ${body}
        </div>
      `;
    })
    .join("");
}

function getCartEntries() {
  return Object.entries(cart)
    .map(([id, qty]) => {
      const product = allProducts.find((p) => p.id === Number(id));
      return product && qty > 0 ? { product, qty } : null;
    })
    .filter(Boolean);
}

function setCartDrawer(open) {
  cartDrawerOpen = Boolean(open);
  const panel = $("#storeCartPanel");
  const backdrop = $("#storeCartBackdrop");
  const navBtn = $("#storeCartNavBtn");
  if (panel) panel.classList.toggle("open", cartDrawerOpen);
  if (backdrop) backdrop.classList.toggle("on", cartDrawerOpen);
  if (navBtn) navBtn.setAttribute("aria-expanded", String(cartDrawerOpen));
  document.body.style.overflow = cartDrawerOpen ? "hidden" : "";
}

function renderCart() {
  const entries = getCartEntries();
  const totalQty = entries.reduce((acc, e) => acc + e.qty, 0);
  const totalAmount = entries.reduce((acc, e) => acc + e.product.price * e.qty, 0);

  const badge = $("#storeCartBadge");
  if (badge) badge.textContent = String(totalQty);

  $("#storeCartSummary").innerHTML = `${totalQty} ${totalQty === 1 ? "unidad" : "unidades"} · <b class="cart-ch-total">${money(totalAmount)}</b>`;
  $("#storeCartSubtotal").textContent = money(totalAmount);
  $("#storeCartQty").textContent = String(totalQty);
  $("#storeCartTotal").textContent = money(totalAmount);

  $("#storeClearCartBtn").innerHTML = SVG.trash;
  $("#storeClearCartBtn").disabled = totalQty === 0;
  $("#storeCheckoutBtn").disabled = totalQty === 0;

  $("#storeCartLines").innerHTML =
    entries
      .map(({ product, qty }) => {
        const parsed = parseProductTitle(product.name);
        const titleText = parsed.title || product.name;
        const specText = parsed.spec ? `${esc(parsed.spec)} · ` : "";
        return `
          <div class="ln">
            ${avatarHtml(product)}
            <div class="t">
              <b title="${esc(product.name)}">${esc(titleText)}</b>
              <small>${specText}${money(product.price)} c/u</small>
            </div>
            <div class="q">
              <button type="button" class="pos-minus-button" data-qty="${product.id}" data-delta="-1" aria-label="Quitar uno">${SVG.minus}</button>
              <span class="num">${qty}</span>
              <button type="button" class="pos-plus-button" data-qty="${product.id}" data-delta="1" aria-label="Agregar uno">${SVG.plus}</button>
            </div>
          </div>
        `;
      })
      .join("") ||
    '<p class="lite-empty">Tocá un producto para agregarlo a tu carrito.</p>';
}

function addToCart(id) {
  const p = allProducts.find((x) => x.id === Number(id));
  if (!p) return;
  if (p.stock <= 0) {
    showToast("Producto sin stock disponible.");
    return;
  }
  const current = cart[p.id] || 0;
  if (current >= p.stock) {
    showToast("Ya agregaste la cantidad disponible de este producto.");
    return;
  }
  cart[p.id] = current + 1;
  saveCart();
  renderCatalog();
  renderCart();
  showToast(`${p.name} agregado al carrito`);
}

function updateQty(id, delta) {
  const p = allProducts.find((x) => x.id === Number(id));
  if (!p) return;
  const next = (cart[p.id] || 0) + delta;
  if (next <= 0) {
    delete cart[p.id];
  } else if (next > p.stock) {
    showToast("Ya agregaste la cantidad disponible de este producto.");
    return;
  } else {
    cart[p.id] = next;
  }
  saveCart();
  renderCatalog();
  renderCart();
}

function openModal(title, subtitle, bodyHtml, footHtml) {
  $("#storeModalTitle").textContent = title;
  $("#storeModalSubtitle").textContent = subtitle;
  $("#storeModalBody").innerHTML = bodyHtml;
  $("#storeModalFoot").innerHTML = footHtml;
  $("#storeModal").classList.add("open");
}

function closeModal() {
  $("#storeModal").classList.remove("open");
  if (checkoutMapInstance) {
    try {
      checkoutMapInstance.remove();
    } catch {}
    checkoutMapInstance = null;
  }
}

function openAuthModal() {
  if (customerUser && customerUser.name) {
    openModal(
      "Tu cuenta",
      `Conectado con ${customerUser.provider || "Comerciando"}`,
      `
        <div class="store-order-summary" style="margin-top:0">
          <div class="store-order-summary-row"><span>Nombre</span><b>${esc(customerUser.name)}</b></div>
          ${customerUser.email ? `<div class="store-order-summary-row"><span>Email</span><b>${esc(customerUser.email)}</b></div>` : ""}
        </div>
      `,
      `
        <button type="button" class="btn g" id="authLogoutBtn">Cerrar sesión</button>
        <button type="button" class="btn" id="authCloseBtn">Listo</button>
      `,
    );
    $("#authLogoutBtn").addEventListener("click", () => {
      fetch("/api/auth/logout?audience=customer", { method: "POST", credentials: "same-origin" }).catch(() => {});
      saveCustomerUser(null);
      closeModal();
      showToast("Sesión cerrada");
    });
    $("#authCloseBtn").addEventListener("click", closeModal);
    return;
  }

  openModal(
    "Iniciar sesión",
    `Usá tu cuenta de Google para guardar tus datos y agilizar tus compras en ${storeName}.`,
    `
      <div class="store-social-stack">
        <button type="button" class="store-social-btn" id="authGoogleBtn">${SVG.google}<span>Continuar con Google</span></button>
      </div>
    `,
    `
      <button type="button" class="btn g" id="authCancelBtn">Cancelar</button>
    `,
  );

  $("#authCancelBtn").addEventListener("click", closeModal);
  $("#authGoogleBtn").addEventListener("click", async () => {
    const button = $("#authGoogleBtn");
    button.disabled = true;
    button.innerHTML = `${SVG.google}<span>Preparando acceso seguro…</span>`;
    try {
      const response = await fetch("/api/auth/config", { cache: "no-store" });
      const config = response.ok ? await response.json() : null;
      if (!config?.googleEnabled) {
        button.disabled = false;
        button.innerHTML = `${SVG.google}<span>Continuar con Google</span>`;
        showToast("El acceso con Google todavía no está configurado para este comercio. Probá nuevamente más tarde.");
        return;
      }
    } catch {
      button.disabled = false;
      button.innerHTML = `${SVG.google}<span>Continuar con Google</span>`;
      showToast("No pudimos verificar el acceso con Google. Revisá tu conexión e intentá nuevamente.");
      return;
    }
    saveCart();
    try { localStorage.setItem(STORE_CHECKOUT_AFTER_LOGIN_KEY, "0"); } catch {}
    location.assign("/api/auth/start?audience=customer&returnTo=" + encodeURIComponent("/catalogo.html"));
  });
}

async function getCustomerSession() {
  const response = await fetch("/api/auth/session?audience=customer", { credentials: "same-origin", cache: "no-store" });
  if (!response.ok) return null;
  const data = await response.json();
  if (!data.authenticated || !data.user) return null;
  const user = { ...data.user, provider: "Google", picture: data.user.picture || "" };
  saveCustomerUser(user);
  return user;
}

async function beginCheckout() {
  const entries = getCartEntries();
  if (!entries.length) return;
  try {
    const user = await getCustomerSession();
    if (user) return openCheckoutModal();
  } catch {}
  saveCart();
  try { localStorage.setItem(STORE_CHECKOUT_AFTER_LOGIN_KEY, "1"); } catch {}
  location.assign("/api/auth/start?audience=customer&returnTo=" + encodeURIComponent("/catalogo.html?checkout=1"));
}

let checkoutState = {
  step: 1,
  prevStep: 1,
  delivery: "",
  name: "",
  phone: "",
  email: "",
  address: "",
  lat: null,
  lng: null,
  paymentMethod: "",
  errors: {},
};
let checkoutMapInstance = null;

function refreshStoreConfig() {
  try {
    const raw = localStorage.getItem(STORE_STATE_KEY);
    if (!raw) return;
    const loaded = JSON.parse(raw);
    if (loaded?.store) storeName = loaded.store;
    if (loaded?.storeConfig && typeof loaded.storeConfig === "object") {
      storeConfig = { ...storeConfig, ...loaded.storeConfig };
    }
  } catch {}
}

function normalizeWhatsappNumber(raw) {
  return String(raw || "").replace(/[^\d]/g, "");
}

function copyToClipboard(text, labelText) {
  if (!text) return;
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(
      () => showToast(`${labelText} copiado`),
      () => showToast(`No se pudo copiar ${labelText}`, true),
    );
  } else {
    showToast(`${labelText}: ${text}`);
  }
}

function openCheckoutModal() {
  const entries = getCartEntries();
  if (!entries.length) return;
  refreshStoreConfig();
  checkoutState = {
    step: 1,
    prevStep: 1,
    delivery: "",
    name: customerUser?.name || "",
    phone: "",
    email: customerUser?.email || "",
    address: "",
    lat: null,
    lng: null,
    paymentMethod: "",
    errors: {},
  };
  renderCheckoutModal();
}

function syncCheckoutStepInputs() {
  const nameEl = $("#custName");
  const phoneEl = $("#custPhone");
  const emailEl = $("#custEmail");
  const addrEl = $("#custAddress");
  if (nameEl) checkoutState.name = nameEl.value;
  if (phoneEl) checkoutState.phone = phoneEl.value;
  if (emailEl) checkoutState.email = emailEl.value;
  if (addrEl) checkoutState.address = addrEl.value;
}

function validateCheckoutStep(step) {
  syncCheckoutStepInputs();
  checkoutState.errors = {};

  if (step === 1) {
    if (checkoutState.delivery !== "Retiro" && checkoutState.delivery !== "Envío") {
      checkoutState.errors.delivery = "Elegí una opción de entrega para continuar.";
      renderCheckoutModal();
      return false;
    }
    return true;
  }

  if (step === 2) {
    if (!checkoutState.name.trim()) {
      checkoutState.errors.name = "Ingresá tu nombre completo.";
    }
    if (!checkoutState.phone.trim()) {
      checkoutState.errors.phone = "Ingresá tu teléfono o WhatsApp.";
    }
    const emailVal = checkoutState.email.trim();
    if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      checkoutState.errors.email = "Ingresá un correo electrónico válido.";
    }
    if (checkoutState.delivery === "Envío" && !checkoutState.address.trim()) {
      checkoutState.errors.address = "Ingresá la dirección de entrega.";
    }
    if (Object.keys(checkoutState.errors).length) {
      renderCheckoutModal();
      if (checkoutState.errors.name) $("#custName")?.focus();
      else if (checkoutState.errors.phone) $("#custPhone")?.focus();
      else if (checkoutState.errors.email) $("#custEmail")?.focus();
      else if (checkoutState.errors.address) $("#custAddress")?.focus();
      return false;
    }
    return true;
  }

  if (step === 3) {
    if (checkoutState.delivery === "Envío" && !checkoutState.paymentMethod) {
      checkoutState.errors.payment = "Elegí una forma de pago para confirmar el pedido.";
      renderCheckoutModal();
      return false;
    }
    return true;
  }

  return true;
}

function renderCheckoutModal() {
  const entries = getCartEntries();
  if (!entries.length) {
    closeModal();
    return;
  }
  const total = entries.reduce((acc, e) => acc + e.product.price * e.qty, 0);
  const totalQty = entries.reduce((acc, e) => acc + e.qty, 0);

  const steps = [
    [1, "Entrega"],
    [2, "Datos"],
    [3, "Pago"],
  ];
  const fromPct = Math.max(0, Math.min(100, (checkoutState.prevStep - 1) * 50));
  const toPct = Math.max(0, Math.min(100, (checkoutState.step - 1) * 50));
  checkoutState.prevStep = checkoutState.step;

  const stepperHtml = `
    <nav class="bs-stepper" aria-label="Pasos del pedido">
      <div class="bs-stepper-grid">
        <div class="bs-stepper-track" aria-hidden="true">
          <div class="bs-stepper-fill" style="--stepper-from:${fromPct}%;--stepper-to:${toPct}%"></div>
        </div>
        ${steps
          .map(([num, labelText]) => {
            const isDone = checkoutState.step > num;
            const isActive = checkoutState.step === num;
            return `<button type="button" class="bs-stepper-item ${isActive ? "is-active" : ""} ${isDone ? "is-completed" : ""}" data-co-step="${num}" aria-current="${isActive ? "step" : "false"}">
              <span class="bs-stepper-circle">${num}</span>
              <span class="bs-stepper-label">${labelText}</span>
            </button>`;
          })
          .join("")}
      </div>
    </nav>
  `;

  let bodyHtml = "";
  let footHtml = "";

  if (checkoutState.step === 1) {
    bodyHtml = `
      <div class="ce-step-section">
        <p class="ce-step-lead">¿Cómo querés recibir tu pedido de <b>${esc(storeName)}</b>?</p>
        <div class="lite-choice two-col ce-delivery-choices">
          <button type="button" data-co-delivery="Retiro" class="${checkoutState.delivery === "Retiro" ? "active" : ""}">
            ${SVG.store}
            <span>Retiro en el local</span>
            <small>Retirás personalmente por el comercio</small>
          </button>
          <button type="button" data-co-delivery="Envío" class="${checkoutState.delivery === "Envío" ? "active" : ""}">
            ${SVG.truck}
            <span>Envío a domicilio</span>
            <small>Te lo enviamos a tu dirección</small>
          </button>
        </div>
        ${checkoutState.errors.delivery ? `<p class="field-error" style="margin-top:8px">${esc(checkoutState.errors.delivery)}</p>` : ""}
        <div class="store-order-summary" style="margin-top:16px">
          <div class="store-order-summary-row"><span>Productos en tu carrito</span><b>${totalQty} ${totalQty === 1 ? "unidad" : "unidades"}</b></div>
          <div class="store-order-summary-row total"><span>Total estimado</span><span>${money(total)}</span></div>
        </div>
      </div>
    `;
    footHtml = `
      <button type="button" class="btn g" id="coCancelBtn">Cancelar</button>
      <button type="button" class="btn" id="coNextBtn"><span>Continuar</span>${SVG.arrowRight}</button>
    `;
  } else if (checkoutState.step === 2) {
    const isPickup = checkoutState.delivery === "Retiro";
    const hasStoreCoords =
      typeof storeConfig.lat === "number" &&
      typeof storeConfig.lng === "number" &&
      !Number.isNaN(storeConfig.lat) &&
      !Number.isNaN(storeConfig.lng);
    const storeMapQuery = hasStoreCoords
      ? `${storeConfig.lat},${storeConfig.lng}`
      : storeConfig.address
        ? encodeURIComponent(storeConfig.address)
        : "";

    const pickupInfoHtml = `
      <div class="ce-pickup-card">
        <div class="ce-pickup-row">
          ${SVG.mapPin}
          <div>
            <b>Dirección del local</b>
            ${
              storeConfig.address
                ? `<p>${esc(storeConfig.address)}</p>`
                : `<p class="ce-muted-warn">El vendedor aún no cargó la dirección del local.</p>`
            }
          </div>
        </div>
        <div class="ce-pickup-row">
          ${SVG.clock}
          <div>
            <b>Horarios de atención para retirar</b>
            ${
              storeConfig.hours
                ? `<p>${esc(storeConfig.hours)}</p>`
                : `<p class="ce-muted-warn">Horarios de atención a confirmar con el local.</p>`
            }
          </div>
        </div>
        ${
          storeMapQuery
            ? `<div class="ce-minimap-wrap">
                <iframe class="ce-minimap-frame" title="Ubicación del local" loading="lazy" src="https://maps.google.com/maps?q=${storeMapQuery}&z=16&output=embed"></iframe>
                <a class="ce-map-ext-link" href="https://www.google.com/maps?q=${storeMapQuery}" target="_blank" rel="noopener noreferrer">${SVG.externalLink}<span>Abrir en Google Maps</span></a>
              </div>`
            : `<div class="ce-notice warn">${SVG.alertCircle}<span>El local aún no configuró su ubicación en el mapa. Podés continuar igual o consultar por WhatsApp.</span></div>`
        }
      </div>
    `;

    const deliveryMapHtml = `
      <div class="store-field full">
        <label for="custAddress">Dirección de entrega *</label>
        <div class="ce-address-row">
          <input id="custAddress" type="text" class="${checkoutState.errors.address ? "is-invalid" : ""}" placeholder="Calle, número, piso/depto, localidad" value="${esc(checkoutState.address)}" />
          <button type="button" class="btn g sm" id="coFindAddressBtn">Ubicar</button>
        </div>
        ${checkoutState.errors.address ? `<span class="field-error">${esc(checkoutState.errors.address)}</span>` : ""}
      </div>
      <div class="store-field full">
        <label>Ubicación exacta en el mapa (arrastrá el marcador para ajustar)</label>
        <div id="checkoutDeliveryMap" class="ce-map-box" aria-label="Mapa de entrega"></div>
        <div class="ce-map-coords">
          <span id="coCoordsText">${
            typeof checkoutState.lat === "number" && typeof checkoutState.lng === "number"
              ? `Coordenadas guardadas: ${checkoutState.lat.toFixed(5)}, ${checkoutState.lng.toFixed(5)}`
              : "Escribí tu dirección o arrastrá el marcador hasta tu ubicación exacta."
          }</span>
        </div>
      </div>
    `;

    bodyHtml = `
      <form id="storeCheckoutForm" class="store-form-grid" onsubmit="return false;">
        <div class="store-field full">
          <label for="custName">Nombre completo *</label>
          <input id="custName" type="text" class="${checkoutState.errors.name ? "is-invalid" : ""}" placeholder="Ej: María Gómez" value="${esc(checkoutState.name)}" />
          ${checkoutState.errors.name ? `<span class="field-error">${esc(checkoutState.errors.name)}</span>` : ""}
        </div>
        <div class="store-field">
          <label for="custPhone">Teléfono / WhatsApp *</label>
          <input id="custPhone" type="tel" class="${checkoutState.errors.phone ? "is-invalid" : ""}" placeholder="Ej: 11 1234-5678" value="${esc(checkoutState.phone)}" />
          ${checkoutState.errors.phone ? `<span class="field-error">${esc(checkoutState.errors.phone)}</span>` : ""}
        </div>
        <div class="store-field">
          <label for="custEmail">Mail *</label>
          <input id="custEmail" type="email" class="${checkoutState.errors.email ? "is-invalid" : ""}" placeholder="tu@mail.com" value="${esc(checkoutState.email)}" />
          ${checkoutState.errors.email ? `<span class="field-error">${esc(checkoutState.errors.email)}</span>` : ""}
        </div>
        ${isPickup ? `<div class="store-field full">${pickupInfoHtml}</div>` : deliveryMapHtml}
      </form>
    `;
    footHtml = `
      <button type="button" class="btn g" id="coBackBtn">${SVG.arrowLeft}<span>Atrás</span></button>
      <button type="button" class="btn" id="coNextBtn"><span>Continuar</span>${SVG.arrowRight}</button>
    `;
  } else {
    const isPickup = checkoutState.delivery === "Retiro";
    const hasTransferData = Boolean(
      (storeConfig.alias || storeConfig.cbu) && normalizeWhatsappNumber(storeConfig.whatsapp),
    );
    const waNumber = normalizeWhatsappNumber(storeConfig.whatsapp);
    const summaryText = entries
      .map(({ product, qty }) => `• ${qty}x ${product.name} (${money(product.price * qty)})`)
      .join("\n");
    const transferWaText = encodeURIComponent(
      `Hola ${storeName}! Soy ${checkoutState.name.trim()}. Te envío el comprobante de transferencia de mi pedido:\n${summaryText}\n\nTotal: ${money(total)}`,
    );

    const paymentSectionHtml = isPickup
      ? `
        <div class="ce-notice info" style="margin-top:14px">
          ${SVG.store}
          <div>
            <b>Pago en el local</b>
            <p>El pago se procesará en el local al momento de retirar tu pedido.</p>
          </div>
        </div>
      `
      : `
        <div class="ce-payment-block">
          <label class="ce-block-label">Elegí tu forma de pago *</label>
          <div class="lite-choice two-col">
            <button type="button" data-co-pay="Efectivo al delivery" class="${checkoutState.paymentMethod === "Efectivo al delivery" ? "active" : ""}">
              ${SVG.banknote}
              <span>Efectivo al delivery</span>
            </button>
            <button type="button" data-co-pay="Transferencia bancaria" class="${checkoutState.paymentMethod === "Transferencia bancaria" ? "active" : ""}" ${!hasTransferData ? 'disabled title="El vendedor aún no cargó sus datos de transferencia o WhatsApp"' : ""}>
              ${SVG.landmark}
              <span>Transferencia bancaria</span>
            </button>
          </div>
          ${
            !hasTransferData
              ? `<div class="ce-notice warn" style="margin-top:10px">${SVG.alertCircle}<span>La transferencia bancaria no está disponible porque el vendedor aún no completó su alias/CBU o WhatsApp en Configuración. Podés abonar en efectivo al delivery.</span></div>`
              : ""
          }
          ${checkoutState.errors.payment ? `<p class="field-error" style="margin-top:8px">${esc(checkoutState.errors.payment)}</p>` : ""}
          ${
            checkoutState.paymentMethod === "Transferencia bancaria" && hasTransferData
              ? `
                <div class="ce-transfer-box">
                  <div class="ce-transfer-head">
                    <b>Datos para transferir</b>
                    <small>Transferí el total (${money(total)}) y enviá el comprobante por WhatsApp.</small>
                  </div>
                  ${
                    storeConfig.alias
                      ? `<div class="ce-copy-row"><div><span>Alias</span><b>${esc(storeConfig.alias)}</b></div><button type="button" class="btn g sm" data-copy-val="${esc(storeConfig.alias)}" data-copy-label="Alias">${SVG.copy}<span>Copiar</span></button></div>`
                      : ""
                  }
                  ${
                    storeConfig.cbu
                      ? `<div class="ce-copy-row"><div><span>CVU / CBU</span><b>${esc(storeConfig.cbu)}</b></div><button type="button" class="btn g sm" data-copy-val="${esc(storeConfig.cbu)}" data-copy-label="CVU/CBU">${SVG.copy}<span>Copiar</span></button></div>`
                      : ""
                  }
                  <div class="ce-transfer-wa-box">
                    <p><b>Importante:</b> enviá el comprobante de transferencia por WhatsApp al <b>${esc(storeConfig.whatsapp)}</b> para confirmar tu pago.</p>
                    <a class="btn ce-wa-btn" href="https://wa.me/${waNumber}?text=${transferWaText}" target="_blank" rel="noopener noreferrer">
                      ${SVG.messageCircle}
                      <span>Enviar comprobante por WhatsApp</span>
                    </a>
                  </div>
                </div>
              `
              : ""
          }
        </div>
      `;

    const mpDisabledHtml = `
      <div class="ce-mp-wrap">
        <button type="button" class="payment-mp-disabled" disabled title="Próximamente disponible" aria-label="Mercado Pago (Próximamente)">
          <span class="mp-brand-left">
            <svg class="mp-logo-svg" width="26" height="18" viewBox="0 0 38 26" aria-hidden="true">
              <ellipse cx="19" cy="13" rx="18" ry="11.5" fill="#009EE3"/>
              <path d="M10.5 14.2c1.4-2.4 3.4-3.6 5.5-3.6 1.3 0 2.3.5 3 1.2.7-.7 1.7-1.2 3-1.2 2.1 0 4.1 1.2 5.5 3.6.3.5.1 1.1-.4 1.3-.5.3-1.1.1-1.3-.4-1-1.7-2.4-2.5-3.8-2.5-1.1 0-1.9.5-2.4 1.3-.2.4-.9.4-1.2 0-.5-.8-1.3-1.3-2.4-1.3-1.4 0-2.8.8-3.8 2.5-.3.5-.9.7-1.3.4-.5-.2-.7-.8-.4-1.3Z" fill="#fff"/>
            </svg>
            <span>Mercado Pago</span>
          </span>
          <span class="mp-soon-pill">Próximamente</span>
        </button>
      </div>
    `;

    bodyHtml = `
      <div class="store-order-summary" style="margin-top:0">
        ${entries
          .map(
            ({ product, qty }) =>
              `<div class="store-order-summary-row"><span>${qty} × ${esc(product.name)}</span><b>${money(product.price * qty)}</b></div>`,
          )
          .join("")}
        <div class="store-order-summary-row total">
          <span>Total del pedido</span>
          <span>${money(total)}</span>
        </div>
      </div>

      <div class="checkout-summary" style="margin-top:12px">
        <div class="checkout-summary-row"><span>Entrega</span><b>${isPickup ? "Retiro en el local" : "Envío a domicilio"}</b></div>
        <div class="checkout-summary-row"><span>Cliente</span><b>${esc(checkoutState.name.trim())}</b></div>
        <div class="checkout-summary-row"><span>Teléfono</span><b>${esc(checkoutState.phone.trim())}</b></div>
        <div class="checkout-summary-row"><span>Mail</span><b>${esc(checkoutState.email.trim())}</b></div>
        ${
          isPickup
            ? `${storeConfig.address ? `<div class="checkout-summary-row"><span>Local</span><b>${esc(storeConfig.address)}</b></div>` : ""}
               ${storeConfig.hours ? `<div class="checkout-summary-row"><span>Horarios</span><b>${esc(storeConfig.hours)}</b></div>` : ""}`
            : `<div class="checkout-summary-row"><span>Dirección</span><b>${esc(checkoutState.address.trim())}</b></div>
               ${typeof checkoutState.lat === "number" && typeof checkoutState.lng === "number" ? `<div class="checkout-summary-row"><span>Ubicación</span><b>${checkoutState.lat.toFixed(5)}, ${checkoutState.lng.toFixed(5)}</b></div>` : ""}`
        }
      </div>

      ${paymentSectionHtml}
      ${mpDisabledHtml}
    `;

    footHtml = `
      <button type="button" class="btn g" id="coBackBtn">${SVG.arrowLeft}<span>Atrás</span></button>
      <button type="button" class="btn" id="coConfirmBtn">Confirmar pedido</button>
    `;
  }

  openModal(
    "Realizar pedido",
    `Paso ${checkoutState.step} de 3 · ${storeName}`,
    `${stepperHtml}<div class="checkout-step-body">${bodyHtml}</div>`,
    footHtml,
  );

  // Bind stepper header navigation
  document.querySelectorAll("[data-co-step]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetStep = Number(btn.dataset.coStep);
      if (targetStep === checkoutState.step) return;
      if (targetStep < checkoutState.step) {
        syncCheckoutStepInputs();
        checkoutState.step = targetStep;
        renderCheckoutModal();
      } else {
        for (let s = checkoutState.step; s < targetStep; s++) {
          if (!validateCheckoutStep(s)) return;
        }
        checkoutState.step = targetStep;
        renderCheckoutModal();
      }
    });
  });

  if (checkoutState.step === 1) {
    document.querySelectorAll("[data-co-delivery]").forEach((btn) => {
      btn.addEventListener("click", () => {
        checkoutState.delivery = btn.dataset.coDelivery;
        checkoutState.paymentMethod =
          checkoutState.delivery === "Retiro" ? "Pago en el local" : "";
        delete checkoutState.errors.delivery;
        renderCheckoutModal();
      });
    });
    $("#coCancelBtn")?.addEventListener("click", closeModal);
    $("#coNextBtn")?.addEventListener("click", () => {
      if (!validateCheckoutStep(1)) return;
      checkoutState.step = 2;
      renderCheckoutModal();
    });
  } else if (checkoutState.step === 2) {
    $("#custName")?.addEventListener("input", (e) => {
      checkoutState.name = e.target.value;
    });
    $("#custPhone")?.addEventListener("input", (e) => {
      checkoutState.phone = e.target.value;
    });
    $("#custEmail")?.addEventListener("input", (e) => {
      checkoutState.email = e.target.value;
    });
    $("#custAddress")?.addEventListener("input", (e) => {
      checkoutState.address = e.target.value;
    });
    $("#coBackBtn")?.addEventListener("click", () => {
      syncCheckoutStepInputs();
      checkoutState.step = 1;
      renderCheckoutModal();
    });
    $("#coNextBtn")?.addEventListener("click", () => {
      if (!validateCheckoutStep(2)) return;
      checkoutState.step = 3;
      renderCheckoutModal();
    });
    if (checkoutState.delivery === "Envío") {
      initCheckoutDeliveryMap();
    }
  } else {
    document.querySelectorAll("[data-co-pay]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.disabled) return;
        checkoutState.paymentMethod = btn.dataset.coPay;
        delete checkoutState.errors.payment;
        renderCheckoutModal();
      });
    });
    document.querySelectorAll("[data-copy-val]").forEach((btn) => {
      btn.addEventListener("click", () => {
        copyToClipboard(btn.dataset.copyVal, btn.dataset.copyLabel || "Dato");
      });
    });
    $("#coBackBtn")?.addEventListener("click", () => {
      checkoutState.step = 2;
      renderCheckoutModal();
    });
    $("#coConfirmBtn")?.addEventListener("click", () => {
      if (!validateCheckoutStep(3)) return;
      submitOrder(entries, total);
    });
  }
}

function initCheckoutDeliveryMap() {
  const mapEl = $("#checkoutDeliveryMap");
  if (!mapEl) return;
  if (typeof L === "undefined") {
    mapEl.innerHTML =
      '<div class="ce-map-fallback">No se pudo cargar el mapa interactivo. Podés continuar ingresando tu dirección arriba.</div>';
    return;
  }
  if (checkoutMapInstance) {
    try {
      checkoutMapInstance.remove();
    } catch {}
    checkoutMapInstance = null;
  }

  const hasSaved =
    typeof checkoutState.lat === "number" &&
    typeof checkoutState.lng === "number" &&
    !Number.isNaN(checkoutState.lat) &&
    !Number.isNaN(checkoutState.lng);
  const storeHasCoords =
    typeof storeConfig.lat === "number" &&
    typeof storeConfig.lng === "number" &&
    !Number.isNaN(storeConfig.lat) &&
    !Number.isNaN(storeConfig.lng);

  const startLat = hasSaved
    ? checkoutState.lat
    : storeHasCoords
      ? storeConfig.lat
      : -34.603722;
  const startLng = hasSaved
    ? checkoutState.lng
    : storeHasCoords
      ? storeConfig.lng
      : -58.381592;
  const zoom = hasSaved ? 16 : 13;

  checkoutMapInstance = L.map(mapEl).setView([startLat, startLng], zoom);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
    maxZoom: 19,
  }).addTo(checkoutMapInstance);

  const marker = L.marker([startLat, startLng], { draggable: true }).addTo(
    checkoutMapInstance,
  );

  const setCoords = (lat, lng) => {
    checkoutState.lat = lat;
    checkoutState.lng = lng;
    const txt = $("#coCoordsText");
    if (txt) {
      txt.textContent = `Coordenadas guardadas: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    }
  };

  if (hasSaved) setCoords(startLat, startLng);

  marker.on("dragend", () => {
    const pos = marker.getLatLng();
    setCoords(pos.lat, pos.lng);
  });

  checkoutMapInstance.on("click", (ev) => {
    marker.setLatLng(ev.latlng);
    setCoords(ev.latlng.lat, ev.latlng.lng);
  });

  const geocodeDeliveryAddress = async (silent = false) => {
    const query = ($("#custAddress")?.value || "").trim();
    if (!query) {
      if (!silent) showToast("Ingresá una dirección para ubicarla en el mapa.");
      return;
    }
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`,
      );
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        marker.setLatLng([lat, lng]);
        checkoutMapInstance.setView([lat, lng], 16);
        setCoords(lat, lng);
        if (!silent) showToast("Dirección ubicada. Podés arrastrar el marcador para ajustar.");
      } else if (!silent) {
        showToast("No encontramos esa dirección exacta. Arrastrá el marcador manualmente.");
      }
    } catch {
      if (!silent) showToast("No se pudo buscar la dirección. Arrastrá el marcador manualmente.");
    }
  };

  $("#coFindAddressBtn")?.addEventListener("click", () => geocodeDeliveryAddress(false));
  let debounceTimer = null;
  $("#custAddress")?.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const val = ($("#custAddress")?.value || "").trim();
      if (val.length >= 8) geocodeDeliveryAddress(true);
    }, 900);
  });

  setTimeout(() => checkoutMapInstance?.invalidateSize(), 180);
}

async function submitOrder(entries, total) {
  const name = checkoutState.name.trim();
  const phone = checkoutState.phone.trim();
  const email = checkoutState.email.trim();
  const delivery = checkoutState.delivery;
  const address =
    delivery === "Envío"
      ? checkoutState.address.trim()
      : storeConfig.address || "";
  const paymentMethod =
    delivery === "Retiro" ? "Pago en el local" : checkoutState.paymentMethod;

  const orderId = "WEB-" + Math.floor(1000 + Math.random() * 9000);
  const items = entries.map(({ product, qty }) => ({
    id: product.id,
    name: product.name,
    qty,
    price: product.price,
  }));

  try {
    const secureOrder = await fetch("/api/orders", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, total, delivery, paymentMethod }),
    });
    if (!secureOrder.ok) {
      const problem = await secureOrder.json().catch(() => ({}));
      if (secureOrder.status === 401) {
        saveCart();
        try { localStorage.setItem(STORE_CHECKOUT_AFTER_LOGIN_KEY, "1"); } catch {}
        location.assign("/api/auth/start?audience=customer&returnTo=" + encodeURIComponent("/catalogo.html?checkout=1"));
        return;
      }
      throw new Error(problem.error || "No se pudo validar el pedido.");
    }
  } catch (error) {
    showToast(error.message || "Error de red al validar tu pedido.");
    return;
  }

  try {
    const raw = localStorage.getItem(STORE_STATE_KEY);
    const data = raw ? JSON.parse(raw) : {};
    if (!Array.isArray(data.sales)) data.sales = [];
    if (!Array.isArray(data.deliveries)) data.deliveries = [];

    data.sales.unshift({
      id: orderId,
      at: new Date().toISOString(),
      total,
      payment: paymentMethod,
      delivery,
      customer: `${name} (${phone})`,
      email,
      address,
      items,
    });

    data.deliveries.unshift({
      id: "P-" + Math.floor(100 + Math.random() * 900),
      sale: orderId,
      source: "Catálogo online",
      customer: name,
      phone,
      email,
      type: delivery,
      address,
      lat: delivery === "Envío" ? checkoutState.lat : null,
      lng: delivery === "Envío" ? checkoutState.lng : null,
      paymentMethod,
      total,
      items,
      createdAt: new Date().toISOString(),
      status: "Pendiente",
    });

    if (Array.isArray(data.products)) {
      for (const { product, qty } of entries) {
        const target = data.products.find((x) => x.id === product.id);
        if (target) target.stock = Math.max(0, target.stock - qty);
      }
    }
    localStorage.setItem(STORE_STATE_KEY, JSON.stringify(data));
  } catch {}

  for (const { product, qty } of entries) {
    product.stock = Math.max(0, product.stock - qty);
  }
  cart = {};
  saveCart();
  renderCatalog();
  renderCart();

  const summaryLines = entries
    .map(({ product, qty }) => `• ${qty}x ${product.name} (${money(product.price * qty)})`)
    .join("\n");
  const waNumber = normalizeWhatsappNumber(storeConfig.whatsapp);
  const waText = encodeURIComponent(
    paymentMethod === "Transferencia bancaria"
      ? `Hola ${storeName}! Soy ${name}. Te envío el comprobante de transferencia del pedido *${orderId}*:\n${summaryLines}\n\nTotal: ${money(total)}`
      : `Hola ${storeName}! Hice el pedido *${orderId}*:\n${summaryLines}\n\nTotal: ${money(total)}\nEntrega: ${delivery}${address ? ` (${address})` : ""}\nPago: ${paymentMethod}\nCliente: ${name} (${phone})`,
  );
  const waHref = waNumber ? `https://wa.me/${waNumber}?text=${waText}` : `https://wa.me/?text=${waText}`;

  openModal(
    "¡Pedido confirmado!",
    `Comprobante ${orderId}`,
    `
      <div class="store-success-box">
        <div class="store-success-badge">${SVG.check}</div>
        <h3>¡Gracias por tu pedido, ${esc(name)}!</h3>
        <p>Tu pedido <b>${esc(orderId)}</b> quedó registrado en estado <b>Pendiente</b> por <b>${money(total)}</b>.</p>
        <div class="checkout-summary" style="text-align:left;margin-top:12px">
          <div class="checkout-summary-row"><span>Entrega</span><b>${delivery === "Retiro" ? "Retiro en el local" : "Envío a domicilio"}</b></div>
          <div class="checkout-summary-row"><span>Forma de pago</span><b>${esc(paymentMethod)}</b></div>
          ${address ? `<div class="checkout-summary-row"><span>Dirección</span><b>${esc(address)}</b></div>` : ""}
        </div>
        ${
          paymentMethod === "Transferencia bancaria"
            ? `<div class="ce-notice info" style="text-align:left;margin-top:12px">${SVG.messageCircle}<span>Recordá enviar tu comprobante de transferencia por WhatsApp para que el local valide el pago.</span></div>`
            : ""
        }
      </div>
    `,
    `
      <a class="btn g" href="${waHref}" target="_blank" rel="noopener noreferrer">${SVG.messageCircle}<span>${paymentMethod === "Transferencia bancaria" ? "Enviar comprobante por WhatsApp" : "Enviar por WhatsApp"}</span></a>
      <button type="button" class="btn" id="orderDoneBtn">Seguir comprando</button>
    `,
  );
  $("#orderDoneBtn").addEventListener("click", closeModal);
}

// Eventos
document.addEventListener("DOMContentLoaded", () => {
  loadStoreData();
  applyTheme(document.documentElement.dataset.theme || "light");
  renderAuthButton();
  renderCatalog();
  renderCart();

  $("#storeAuthBtn").addEventListener("click", openAuthModal);

  $("#themeToggleBtn").addEventListener("click", () => {
    const cur = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    applyTheme(cur === "dark" ? "light" : "dark");
  });

  $("#storeSearch").addEventListener("input", (e) => {
    searchTerm = e.target.value;
    renderCatalog();
  });

  document.addEventListener("click", (e) => {
    const qtyBtn = e.target.closest("[data-qty]");
    if (qtyBtn) {
      updateQty(qtyBtn.dataset.qty, Number(qtyBtn.dataset.delta));
      return;
    }

    const catBtn = e.target.closest("[data-cat]");
    if (catBtn) {
      activeCategory = catBtn.dataset.cat;
      renderCatalog();
      return;
    }

    const viewBtn = e.target.closest("[data-store-view]");
    if (viewBtn) {
      viewMode = viewBtn.dataset.storeView;
      document
        .querySelectorAll("[data-store-view]")
        .forEach((b) => b.classList.toggle("on", b === viewBtn));
      renderCatalog();
      return;
    }

    const addEl = e.target.closest("[data-add]");
    if (addEl) {
      addToCart(addEl.dataset.add);
      return;
    }
  });

  $("#storeCartNavBtn").addEventListener("click", () => setCartDrawer(true));
  $("#storeCartCloseBtn").addEventListener("click", () => setCartDrawer(false));
  $("#storeCartBackdrop").addEventListener("click", () => setCartDrawer(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cartDrawerOpen) setCartDrawer(false);
  });

  $("#storeClearCartBtn").addEventListener("click", () => {
    cart = {};
    saveCart();
    renderCatalog();
    renderCart();
    showToast("Carrito vaciado");
  });

  $("#storeCheckoutBtn").addEventListener("click", () => {
    setCartDrawer(false);
    beginCheckout();
  });
  $("#storeModalClose").addEventListener("click", closeModal);
  $("#storeModal").addEventListener("click", (e) => {
    if (e.target === $("#storeModal")) closeModal();
  });
  getCustomerSession().then((user) => {
    if (user && new URLSearchParams(location.search).get("checkout") === "1") {
      history.replaceState({}, "", "catalogo.html");
      openCheckoutModal();
    }
  }).catch(() => {
    const error = new URLSearchParams(location.search).get("authError");
    if (error) showToast("No pudimos iniciar sesión con Google. Tu carrito se conservó.");
  });
});
