/* Lógica de interacción de comercIAndo Emprendedores */

"use strict";
// Sistema operativo y lógica de interacción de comercIAndo Emprendedores
const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];
const esc = (x) =>
  String(x ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const money = (x) =>
  "$ " + Number(x || 0).toLocaleString("es-AR", { maximumFractionDigits: 2 });
const date = (x) =>
  new Date(x).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
const ICON = {
  home: "M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  pos: "M4 5h16v10H4zM8 19h8M12 15v4",
  sales: "M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6",
  ship: "M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6zM9 12l2 2 4-4",
  web: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  stock: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  mod: "M12 3v18M3 12h18",
  cfg: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 12a7 7 0 0 0-.1-1.3l2-1.5-2-3.4-2.3 1a7 7 0 0 0-2.2-1.3L14 3h-4l-.4 2.5a7 7 0 0 0-2.2 1.3l-2.3-1-2 3.4 2 1.5a7 7 0 0 0 0 2.6l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 2.2 1.3L10 21h4l.4-2.5a7 7 0 0 0 2.2-1.3l2.3 1 2-3.4-2-1.5c.1-.4.1-.9.1-1.3z",
};
Object.assign(ICON, {
  home: `<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`,
  pos: `<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>`,
  sales: `<path d="M12 17V7"/><path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8"/><path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"/>`,
  ship: `<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/>`,
  web: `<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>`,
  stock: `<path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5"/><path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244"/><path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05"/>`,
  mod: `<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M8 18v-2"/><path d="M12 18v-4"/><path d="M16 18v-6"/>`,
  cfg: `<path d="M11 10.27 7 3.34"/><path d="m11 13.73-4 6.93"/><path d="M12 22v-2"/><path d="M12 2v2"/><path d="M14 12h8"/><path d="m17 20.66-1-1.73"/><path d="m17 3.34-1 1.73"/><path d="M2 12h2"/><path d="m20.66 17-1.73-1"/><path d="m20.66 7-1.73 1"/><path d="m3.34 17 1.73-1"/><path d="m3.34 7 1.73 1"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="12" r="8"/>`,
  sun: `<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>`,
  moon: `<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>`,
  soundOn: `<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>`,
  soundOff: `<path d="M16 9a5 5 0 0 1 .95 2.293"/><path d="M19.364 5.636a9 9 0 0 1 1.889 9.96"/><path d="m2 2 20 20"/><path d="m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11"/><path d="M9.828 4.172A.686.686 0 0 1 11 4.657v.686"/>`,
  cart: `<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57L22 6H5.12"/>`,
  chart: `<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>`,
  card: `<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>`,
  dollar: `<circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/>`,
  receipt: `<path d="M12 17V7"/><path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8"/><path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"/>`,
  packagePlus: `<path d="M12 22V12"/><path d="M16 17h6"/><path d="M19 14v6"/><path d="M21 10.535V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.675-.955"/><path d="M3.29 7 12 12l8.71-5"/><path d="m7.5 4.27 8.997 5.148"/>`,
  banknoteX: `<path d="M13 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"/><path d="m17 17 5 5"/><path d="M18 12h.01"/><path d="m22 17-5 5"/><path d="M6 12h.01"/><circle cx="12" cy="12" r="2"/>`,
  truck: `<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>`,
  alert: `<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z"/><path d="M12 9v4"/><path d="M12 17h.01"/>`,
  trophy: `<path d="M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2"/><path d="M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2"/><path d="M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3"/><path d="M4 22h16"/><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"/><path d="M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3"/>`,
  chartLine: `<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/>`,
  trendUp: `<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>`,
  lightbulb: `<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.74c.63.45 1 1.17 1 1.94V17h6v-.32c0-.77.37-1.49 1-1.94A7 7 0 0 0 12 2Z"/>`,
  download: `<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>`,
  info: `<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>`,
  plus: `<path d="M12 5v14"/><path d="M5 12h14"/>`,
});
const chevronRight = () =>
  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#707B8E" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`;
const posPlus = () =>
  `<svg width="256" height="256" viewBox="0 0 24 24" fill="none" stroke="#89AEFF" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`;
const posMinus = () =>
  `<svg width="256" height="256" viewBox="0 0 24 24" fill="none" stroke="#89AEFF" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/></svg>`;
const ic = (k) =>
  k === "chevronRight"
    ? chevronRight()
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round">${ICON[k] || ICON.home}</svg>`;
const NAV = [
  ["home", "Inicio"],
  ["pos", "Punto de venta Lite"],
  ["sales", "Ventas y cobros Lite"],
  ["ship", "Entregas y despacho Lite"],
  ["virtual", "Catálogo virtual Lite"],
  ["stock", "Stock Lite"],
  ["mod", "Reportes de negocio Lite"],
  ["cfg", "Configuración"],
];
const NAME = {
  home: "Inicio",
  pos: "Punto de venta Lite",
  sales: "Ventas y cobros Lite",
  ship: "Entregas y despacho Lite",
  virtual: "Catálogo virtual Lite",
  stock: "Stock Lite",
  mod: "Reportes de negocio Lite",
  cfg: "Configuración",
};
const SEED = [
  [
    "Yerba mate Playadito 1 kg",
    "Almacén",
    4700,
    6600,
    28,
    6,
    "🧉",
    "7790000000011",
  ],
  ["Arroz Gallo Oro 1 kg", "Almacén", 1980, 2900, 37, 8, "🍚", "7790000000012"],
  [
    "Fideos Matarazzo 500 g",
    "Almacén",
    1180,
    1850,
    46,
    10,
    "🍝",
    "7790000000013",
  ],
  [
    "Aceite Cocinero girasol 900 ml",
    "Almacén",
    3010,
    4250,
    24,
    5,
    "🫒",
    "7790000000014",
  ],
  [
    "Harina 000 Pureza 1 kg",
    "Almacén",
    930,
    1450,
    50,
    7,
    "🌾",
    "7790000000015",
  ],
  ["Azúcar Ledesma 1 kg", "Almacén", 1120, 1750, 31, 7, "🍬", "7790000000016"],
  [
    "Galletitas dulces 350 g",
    "Desayuno",
    1210,
    1800,
    22,
    5,
    "🍪",
    "7790000000017",
  ],
  ["Agua mineral 1,5 L", "Bebidas", 980, 1900, 41, 10, "💧", "7790000000018"],
  ["Chocolate 100 g", "Golosinas", 2150, 3300, 15, 5, "🍫", "7790000000019"],
];
const state = {
  products: SEED.map((p, i) => ({
    id: i + 1,
    name: p[0],
    cat: p[1],
    cost: p[2],
    price: p[3],
    stock: p[4],
    min: p[5],
    emoji: p[6],
    barcode: p[7],
    published: i < 6,
    image: "",
  })),
  categories: [...new Set(SEED.map((p) => p[1]))],
  sales: [
    {
      id: "V-1001",
      at: new Date(Date.now() - 2 * 3600000).toISOString(),
      total: 6100,
      payment: "Efectivo",
      delivery: "Retiro",
      customer: "María Gómez",
      items: [
        { id: 2, name: "Arroz Gallo Oro 1 kg", qty: 1, price: 2900 },
        { id: 8, name: "Agua mineral 1,5 L", qty: 2, price: 1600 },
      ],
    },
    {
      id: "V-1002",
      at: new Date(Date.now() - 1 * 3600000).toISOString(),
      total: 9900,
      payment: "Transferencia",
      delivery: "Envío",
      customer: "Juan Pérez",
      items: [
        { id: 1, name: "Yerba mate Playadito 1 kg", qty: 1, price: 6600 },
        { id: 9, name: "Chocolate 100 g", qty: 1, price: 3300 },
      ],
    },
  ],
  deliveries: [
    {
      id: "P-101",
      customer: "Juan Pérez",
      sale: "V-1002",
      type: "Envío",
      address: "Av. Belgrano 120",
      status: "Pendiente",
    },
  ],
  movements: [],
  cash: true,
  sound: true,
  theme: "light",
  store: "Mi emprendimiento",
  users: ["Marina López", "Santiago Díaz"],
};
let view = "home",
  cart = {},
  category = "Todas",
  searchTerm = "",
  editingId = null,
  editingPhoto = "",
  editingCategory = null,
  payment = "Efectivo",
  delivery = "Retiro",
  salesFilter = "all",
  stockFilter = "all",
  stockViewMode = "cards",
  globalSearchTerm = "",
  discount = 0,
  modalEscape = null,
  toastTimer = null,
  uiMotion = null,
  ctx = null,
  lastBeep = -10000;
const marginAmount = (cost, price) =>
  Math.max(0, (Number(price) || 0) - (Number(cost) || 0));
const marginOnCost = (cost, price) => {
  cost = Number(cost) || 0;
  return cost ? (marginAmount(cost, price) * 100) / cost : 0;
};
const marginOnSale = (cost, price) => {
  price = Number(price) || 0;
  return price ? (marginAmount(cost, price) * 100) / price : 0;
};
function syncCategories() {
  state.categories = [
    ...new Set(
      state.products
        .map((p) => p.cat)
        .filter(Boolean)
        .concat(state.categories || []),
    ),
  ].sort((a, b) => a.localeCompare(b, "es"));
}

const STATE_STORAGE_KEY = "comerciando_emprendedores_state_v2";

function saveState() {
  try {
    const payload = {
      products: state.products,
      categories: state.categories,
      sales: state.sales,
      deliveries: state.deliveries,
      movements: state.movements,
      cash: state.cash,
      sound: state.sound,
      soundStyle,
      theme: state.theme,
      store: state.store,
      users: state.users,
      stockViewMode,
    };
    localStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.warn("No se pudo guardar en localStorage:", err);
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STATE_STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") return;
    if (Array.isArray(data.products) && data.products.length) {
      state.products = data.products.map((p) => ({ ...p, image: p.image || "" }));
    }
    if (Array.isArray(data.categories) && data.categories.length) {
      state.categories = data.categories;
    }
    if (Array.isArray(data.sales)) state.sales = data.sales;
    if (Array.isArray(data.deliveries)) state.deliveries = data.deliveries;
    if (Array.isArray(data.movements)) state.movements = data.movements;
    if (typeof data.cash === "boolean") state.cash = data.cash;
    if (typeof data.sound === "boolean") state.sound = data.sound;
    if (data.soundStyle) soundStyle = data.soundStyle;
    if (data.theme === "light" || data.theme === "dark") {
      state.theme = data.theme;
      document.documentElement.dataset.theme = state.theme;
    }
    if (data.store) state.store = data.store;
    if (Array.isArray(data.users) && data.users.length) state.users = data.users;
    if (data.stockViewMode === "cards" || data.stockViewMode === "table") {
      stockViewMode = data.stockViewMode;
    }
  } catch (err) {
    console.warn("No se pudo cargar desde localStorage:", err);
  }
}

loadState();
syncCategories();
const THEME_PREF_KEY = "comerciando_emprendedores_theme_v1";
try {
  const savedTheme = localStorage.getItem(THEME_PREF_KEY);
  if (savedTheme === "dark" || savedTheme === "light") state.theme = savedTheme;
  const savedSalesFilter = localStorage.getItem("comerciando_emprendedores_sales_filter");
  const savedStockFilter = localStorage.getItem("comerciando_emprendedores_stock_filter");
  if (["all", "Efectivo", "Transferencia"].includes(savedSalesFilter)) salesFilter = savedSalesFilter;
  if (["all", "low"].includes(savedStockFilter)) stockFilter = savedStockFilter;
} catch {}
function saveThemePreference() {
  try {
    localStorage.setItem(THEME_PREF_KEY, state.theme);
  } catch {}
}
const SOUND_PREF_KEY = "comerciando_emprendedores_audio_v052";
let soundStyle = "suave";
try {
  const saved = JSON.parse(localStorage.getItem(SOUND_PREF_KEY) || "null");
  if (saved) {
    state.sound = saved.enabled !== false;
    soundStyle = ["suave", "digital"].includes(saved.style)
      ? saved.style
      : "suave";
  }
} catch {}
function saveSoundPreference() {
  try {
    localStorage.setItem(
      SOUND_PREF_KEY,
      JSON.stringify({ enabled: state.sound, style: soundStyle }),
    );
  } catch {}
}
let lastSoundAt = 0;
function tone(kind = "") {
  // sólo eventos concretos. Silencio por defecto para navegación y botones.
  if (typeof kind !== "string" || !kind || !state.sound) return;
  if (!["add", "success", "warning", "notice"].includes(kind)) return;
  const now = performance.now();
  if (now - lastSoundAt < 85) return;
  lastSoundAt = now;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!ctx || ctx.state === "closed") ctx = new AC();
    if (ctx.state === "suspended") void ctx.resume().catch(() => {});
    const at = ctx.currentTime + 0.006;
    const modern = soundStyle === "digital";
    const notes = {
      add: modern ? [[600, 0, 0.055]] : [[630, 0, 0.075]],
      success: modern
        ? [
            [660, 0, 0.075],
            [990, 0.085, 0.095],
          ]
        : [
            [523, 0, 0.095],
            [784, 0.105, 0.125],
          ],
      warning: modern
        ? [
            [360, 0, 0.115],
            [280, 0.13, 0.14],
          ]
        : [[392, 0, 0.16]],
      notice: modern ? [[660, 0, 0.075]] : [[587, 0, 0.105]],
    }[kind];
    notes.forEach(([freq, delay, len]) => {
      const o = ctx.createOscillator(),
        g = ctx.createGain(),
        t = at + delay;
      o.type = modern ? "triangle" : "sine";
      o.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(modern ? 0.019 : 0.014, t + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + len);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(t);
      o.stop(t + len + 0.015);
      o.onended = () => {
        o.disconnect();
        g.disconnect();
      };
    });
  } catch {}
}
function toast(msg, error = false) {
  clearTimeout(toastTimer);
  $(".lite-toast")?.remove();
  let p = document.createElement("div");
  p.className = "lite-toast";
  p.textContent = msg;
  p.style.borderColor = error ? "#f47083" : "#3d6da5";
  document.body.append(p);
  if (error) tone("warning");
  toastTimer = setTimeout(() => p.remove(), 3100);
}
function title(h, sub, tools = "") {
  return `<div class="v8-title"><div><h1>${h}</h1><p>${sub}</p></div><div class="v8-title-actions">${tools}</div></div>`;
}
function kpi(name, val, desc, color = "sky") {
  return `<div class="v8-kpi ${color}"><small>${name}</small><strong>${val}</strong><span>${desc}</span></div>`;
}
function avatar(p) {
  if (p?.image) {
    return `<div class="lite-productmark" style="padding:0;overflow:hidden"><img src="${p.image}" alt="${esc(p.name)}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit"></div>`;
  }
  return `<div class="lite-productmark">${esc(p?.emoji || "📦")}</div>`;
}
function renderProductCard(p, mode = "pos") {
  const isPos = mode === "pos";
  const idText = p.barcode ? `ID: ${esc(p.barcode)}` : `ID: ${p.id}`;
  const outOfStock = p.stock <= 0;
  const isLowStock = p.stock <= p.min;

  const mediaContent = p.image
    ? `<img src="${p.image}" alt="${esc(p.name)}" class="pro-card-img" loading="lazy">`
    : `<div class="pro-card-placeholder" aria-label="${esc(p.name)}">
         <span>${esc(p.emoji || "📦")}</span>
       </div>`;

  const metaHtml = isPos
    ? `<div class="pro-card-meta">
         <span class="pro-card-stock ${isLowStock ? "warn" : "ok"}">${outOfStock ? "Agotado" : `${p.stock} u. disp.`}</span>
         <span class="pro-card-cat">${esc(p.cat || "")}</span>
       </div>`
    : `<div class="pro-card-meta">
         <span class="pro-card-stock ${isLowStock ? "warn" : "ok"}">${isLowStock ? "Reponer: " : "Stock: "}${p.stock} u.</span>
         <span class="pro-card-margin">Margen: ${marginOnSale(p.cost, p.price).toFixed(0)}%</span>
       </div>`;

  const actionHtml = isPos
    ? `<button type="button" class="pro-card-btn" data-add="${p.id}" ${outOfStock ? "disabled" : ""} aria-label="Agregar ${esc(p.name)} al carrito">
         ${outOfStock ? "Sin stock" : "Agregar al carrito"}
       </button>`
    : `<button type="button" class="pro-card-btn" data-action="edit:${p.id}" aria-label="Editar ${esc(p.name)}">
         Editar producto
       </button>`;

  const clickAttr = isPos
    ? (outOfStock ? "" : `data-add="${p.id}"`)
    : `data-action="edit:${p.id}"`;

  return `
    <article class="pro-card" data-product-id="${p.id}">
      <div class="pro-card-media" ${clickAttr} role="button" tabindex="0">
        ${mediaContent}
      </div>
      <div class="pro-card-body">
        <div class="pro-card-row">
          <div class="pro-card-left">
            <h3 class="pro-card-title" title="${esc(p.name)}">${esc(p.name)}</h3>
            <div class="pro-card-id">${idText}</div>
          </div>
          <div class="pro-card-price">${money(p.price)}</div>
        </div>
        ${metaHtml}
      </div>
      <div class="pro-card-action">
        ${actionHtml}
      </div>
    </article>
  `;
}
function label(txt, theme = "blue") {
  return `<span class="v8-label ${theme}">${esc(txt)}</span>`;
}
function action(text, act, extra = "g sm") {
  return `<button class="btn ${extra}" data-action="${act}">${text}</button>`;
}
function toggleNav() {
  document.body.classList.toggle("remake-nav-open");
  $("#side").classList.toggle("open");
}
function closeNav() {
  document.body.classList.remove("remake-nav-open");
  $("#side").classList.remove("open");
}
const SIDEBAR_PREF_KEY = "comerciando_emprendedores_sidebar_v07";
let sidebarMode = "fixed";
try {
  const saved =
    localStorage.getItem(SIDEBAR_PREF_KEY) ||
    localStorage.getItem("comerciando_emprendedores_sidebar_v052") ||
    localStorage.getItem("comerciando_emprendedores_sidebar_v05");
  sidebarMode = ["fixed", "auto", "compact"].includes(saved)
    ? saved
    : saved === "compact"
      ? "compact"
      : "fixed";
} catch {}
function setSidebarMode(mode) {
  if (!["fixed", "auto", "compact"].includes(mode)) return;
  sidebarMode = mode;
  try {
    localStorage.setItem(SIDEBAR_PREF_KEY, mode);
  } catch {}
  applySidebarMode();
}
function applySidebarMode() {
  const b = document.body,
    side = $("#side");
  b.classList.toggle("lite-sidebar-pinned", sidebarMode === "fixed");
  b.classList.toggle("lite-sidebar-auto", sidebarMode === "auto");
  b.classList.toggle("lite-sidebar-compact", sidebarMode === "compact");
  side?.classList.remove("remake-peek");
  document.querySelectorAll("[data-litemenu]").forEach((el) => {
    const selected = el.dataset.litemenu === sidebarMode;
    el.setAttribute("aria-pressed", String(selected));
    el.title = el.textContent.trim() + (selected ? " (seleccionado)" : "");
  });
}
function renderNav() {
  const nav = $("#nav");
  if (!nav.querySelector(".lite-nav-flat")) {
    const linksHtml = NAV.map(
      ([k, n]) =>
        `<button type="button" class="nav-item side-control" data-go="${k}" title="${n}" aria-label="${n}">${ic(k === "virtual" ? "web" : k)}<span>${n}</span></button>`,
    ).join("");
    nav.innerHTML = `<div class="nav-home lite-nav-flat">${linksHtml}</div>`;
  }
  nav.querySelectorAll("[data-go]").forEach((button) => {
    const selected = button.dataset.go === view;
    button.toggleAttribute("aria-current", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  $("#themeName").textContent =
    "Tema: " + (state.theme === "dark" ? "oscuro" : "claro");
  $("#themeIcon").innerHTML = ic(state.theme === "dark" ? "moon" : "sun");
  $("#soundName").textContent = state.sound
    ? "Avisos sonoros activados"
    : "Avisos silenciados";
  $("#soundIcon").innerHTML = ic(state.sound ? "soundOn" : "soundOff");
  $("#storeNameSide").textContent = state.store;
  document.querySelectorAll("[data-pref]").forEach((el) => {
    el.setAttribute(
      "aria-pressed",
      String(
        el.dataset.pref === "theme" ? state.theme === "dark" : state.sound,
      ),
    );
  });
  applySidebarMode();
}
function go(page) {
  if (!(page in NAME)) return;
  view = page;
  try {
    history.replaceState(null, "", "#" + page);
  } catch {}
  document.body.dataset.view = page;
  $("#crumb").innerHTML = `Comerciando Emprendedores · <b>${NAME[page]}</b>`;
  closeNav();
  render();
  $("#m").scrollTop = 0;
}
function setCashText() {
  $("#cashHeader").textContent = state.cash
    ? "● Caja abierta"
    : "○ Caja cerrada";
}
function render() {
  renderNav();
  setCashText();
  $("#v").innerHTML = {
    home: home,
    pos: pos,
    sales: salesView,
    ship: shipView,
    virtual: catalogView,
    stock: stockView,
    mod: reports,
    cfg: settings,
  }[view]();
  if (uiMotion) {
    const { type, id } = uiMotion;
    uiMotion = null;
    const selector =
      type === "pos-add"
        ? `[data-add="${id}"] .lite-add, .cart .ch p`
        : `[data-qty="${id}"], .cart .ch p`;
    $$(selector).forEach((el) => el.classList.add("ui-feedback-pop"));
  }
}
const todaySales = () =>
  state.sales.filter(
    (s) => new Date(s.at).toDateString() === new Date().toDateString(),
  );
function home() {
  const sales = todaySales(),
    sum = sales.reduce((a, x) => a + x.total, 0),
    low = state.products.filter((p) => p.stock <= p.min).length;
  const chartDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const example = [10000, 16500, 12000, 21400, 14700, 26000, 17700];
  const moneyValue = (v) => new Intl.NumberFormat("es-AR").format(v);
  return `<div class="ex-dashboard premium-dashboard">
 <div class="ex-welcome premium-hero">
  <div class="premium-hero-copy"><div class="premium-eyebrow">PANEL DE MI NEGOCIO <span>·</span> PLAN EMPRENDEDORES</div><h1>Buen día, Marina 👋</h1><p>Acá tenés el resumen de tu emprendimiento. Todo en una sola vista.</p></div>
  <div class="ex-date premium-date"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>${new Date().toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })}</div>
  <div class="premium-swoosh one" aria-hidden="true"></div><div class="premium-swoosh two" aria-hidden="true"></div>
  <svg class="premium-store" viewBox="0 0 300 220" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
 <defs><linearGradient id="shopRoof" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".96"/><stop offset="1" stop-color="#c2dcff" stop-opacity=".65"/></linearGradient><linearGradient id="shopGlass" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#c6e8ff" stop-opacity=".72"/><stop offset="1" stop-color="#6674ff" stop-opacity=".26"/></linearGradient></defs>
 <ellipse cx="154" cy="202" rx="115" ry="15" fill="#ffffff" fill-opacity=".12"/><path d="M64 87 85 37h141l23 50" stroke="#fff" stroke-opacity=".68" stroke-width="4" stroke-linejoin="round"/><rect x="70" y="104" width="176" height="108" rx="9" fill="url(#shopGlass)" stroke="#fff" stroke-opacity=".5" stroke-width="3"/><path d="M126 213v-75h66v75" fill="#d9efff" fill-opacity=".4" stroke="#fff" stroke-opacity=".75" stroke-width="3"/><path d="M83 142v35h31v-35zM205 142v35h28v-35z" fill="#e0f4ff" fill-opacity=".42" stroke="#fff" stroke-opacity=".55" stroke-width="2"/><path d="M64 87h186v20a20 20 0 0 1-35 13 20 20 0 0 1-31 0 20 20 0 0 1-31 0 20 20 0 0 1-31 0 20 20 0 0 1-31 0 20 20 0 0 1-27-13z" fill="url(#shopRoof)" stroke="#fff" stroke-opacity=".8" stroke-width="2.5"/><path d="m96 87-4 34m36-34-5 34m36-34v34m33-34 5 34m29-34 12 34" stroke="#697cf5" stroke-opacity=".35" stroke-width="3"/><path d="m156 140 0 65" stroke="#fff" stroke-opacity=".4" stroke-width="2"/><circle cx="183" cy="176" r="3" fill="white"/></svg>
 </div>
 <div class="ex-status-grid premium-status-grid">
  <div class="card ex-status-card premium-status-card"><div class="ex-icon premium-status-icon"><img class="premium-status-art" src="img/trade.png" alt=""></div><div class="ex-status-text"><div class="ex-title-line"><h2>${esc(state.store)}</h2><span class="pill premium-pill">● Operativo</span></div><p>Tu comercio</p><small>Una sola ubicación · Plan Emprendedores</small></div></div>
  <div class="card ex-status-card premium-status-card"><div class="ex-icon premium-status-icon cash"><img class="premium-status-art" src="img/CashRegister.png" alt=""></div><div class="ex-status-text"><div class="ex-title-line"><h2>Control de caja</h2><span class="pill premium-pill ${state.cash ? "" : "w"}">${state.cash ? "● Caja abierta" : "○ Caja cerrada"}</span></div><p>${state.cash ? "Listo para registrar cobros" : "Abrí caja para empezar a vender"}</p><small>Registro operativo de ventas en tiempo real.</small></div><button class="btn g sm" data-action="toggle-cash">${state.cash ? "Cerrar caja" : "Abrir caja"}</button></div>
 </div>
  <div class="v8-metrics four premium-kpis">
  <button class="v8-kpi sky premium-kpi premium-kpi-primary dashboard-kpi" data-dashboard="sales"><div class="premium-kpi-text"><small>Ventas del día</small><strong>${money(sum)}</strong><span>Cobros registrados</span></div><div class="premium-kpi-icon" aria-hidden="true">${ic("sales")}</div></button>
  <button class="v8-kpi mint premium-kpi dashboard-kpi" data-dashboard="sales"><div class="premium-kpi-text"><small>Operaciones</small><strong>${sales.length}</strong><span>Ventas realizadas</span></div><div class="premium-kpi-icon" aria-hidden="true">${ic("pos")}</div></button>
  <button class="v8-kpi amber premium-kpi dashboard-kpi" data-dashboard="stock"><div class="premium-kpi-text"><small>Stock crítico</small><strong>${low}</strong><span>Productos por reponer</span></div><div class="premium-kpi-icon" aria-hidden="true">${ic("stock")}</div></button>
  <button class="v8-kpi lilac premium-kpi dashboard-kpi" data-dashboard="ship"><div class="premium-kpi-text"><small>Pedidos en curso</small><strong>${state.deliveries.filter((d) => d.status !== "Entregado").length}</strong><span>Pendientes de entrega</span></div><div class="premium-kpi-icon" aria-hidden="true">${ic("ship")}</div></button>
 </div>
 <div class="lite-summary premium-lower">
  <section class="v8-panel premium-panel premium-chart-panel"><div class="v8-panelhead premium-panel-heading"><div class="premium-heading-icon">${ic("mod")}</div><div><h2>Movimiento comercial</h2><p>Representación de ventas recientes del negocio.</p></div></div>
   <div class="v8-panel-inner"><div class="premium-chart-wrap"><div class="premium-axis" aria-hidden="true">${[30000, 25000, 20000, 15000, 10000, 5000, 0].map((n) => `<span>${moneyValue(n)}</span>`).join("")}</div><div class="premium-chart-area"><div class="premium-gridlines" aria-hidden="true"></div><div class="lite-chart premium-chart" role="img" aria-label="Gráfico demostrativo de ventas de lunes a domingo">${chartDays.map((n, i) => `<div class="premium-bar-wrap"><div class="lite-column premium-bar" style="height:${Math.round((example[i] / 30000) * 100)}%" title="${n}: $ ${moneyValue(example[i])}"></div><span>${n}</span></div>`).join("")}</div></div></div><p class="lite-note premium-info"><span aria-hidden="true">${ic("info")}</span>Estadísticas consolidadas en base a operaciones registradas.</p></div>
  </section>
  <section class="v8-panel premium-panel premium-quick-panel"><div class="v8-panelhead premium-panel-heading"><div class="premium-heading-icon quick">${ic("pos")}</div><div><h2>Accesos rápidos</h2><p>Las tareas más habituales de tu emprendimiento.</p></div></div>
   <div class="v8-panel-inner premium-quick-actions"><button class="premium-quick-button primary" data-go="pos"><span class="quick-symbol">${ic("plus")}</span><span>Registrar venta</span><span class="quick-arrow">${chevronRight()}</span></button><button class="premium-quick-button" data-go="stock"><span class="quick-symbol">${ic("stock")}</span><span>Administrar productos</span><span class="quick-arrow">${chevronRight()}</span></button><button class="premium-quick-button" data-go="ship"><span class="quick-symbol">${ic("ship")}</span><span>Ver entregas pendientes</span><span class="quick-arrow">${chevronRight()}</span></button><button class="premium-quick-button" data-go="mod"><span class="quick-symbol">${ic("mod")}</span><span>Consultar reportes Lite</span><span class="quick-arrow">${chevronRight()}</span></button></div>
  </section>
 </div>
 </div>`;
}
function pos() {
  const cats = ["Todas", ...new Set(state.products.map((p) => p.cat))],
    items = state.products.filter(
      (p) =>
        (category === "Todas" || p.cat === category) &&
        (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (p.barcode && p.barcode.toLowerCase().includes(searchTerm.toLowerCase()))),
    ),
    qty = Object.values(cart).reduce((a, b) => a + b, 0),
    total = cartTotal();
  return `${title("Punto de venta", "Venta rápida, cobro y actualización de stock desde una misma pantalla.", `<span class="pill ${state.cash ? "" : "w"}">${state.cash ? "CAJA ABIERTA" : "CAJA CERRADA"}</span>${action("Vaciar", "clear-cart")}`)}<div class="pos"><div><div class="bar"><input id="posSearch" class="search" placeholder="Buscar por nombre o código..." value="${esc(searchTerm)}" aria-label="Buscar producto"></div><div class="chips">${cats.map((c) => `<button class="${category === c ? "on" : ""}" data-category="${esc(c)}">${esc(c)}</button>`).join("")}</div><div id="grid" class="grid pro-cards-grid">${items.map((p) => renderProductCard(p, "pos")).join("") || '<p class="lite-empty" style="grid-column:1/-1">No hay productos para este filtro.</p>'}</div></div><div class="card cart"><div class="ch"><div><h2>Venta actual</h2><p>${qty} unidades</p></div><span class="pill a">NUEVA</span></div><div class="lines" id="lines">${
    Object.entries(cart)
      .map(([id, q]) => {
        const p = state.products.find((p) => p.id === Number(id));
        return `<div class="ln">${avatar(p)}<div class="t"><b>${esc(p?.name || "")}</b><small>${money(p?.price || 0)} c/u</small></div><div class="q"><button class="pos-minus-button" data-qty="${id}" data-delta="-1" aria-label="Quitar uno">${posMinus()}</button><span class="num">${q}</span><button class="pos-plus-button" data-qty="${id}" data-delta="1" aria-label="Agregar uno">${posPlus()}</button></div></div>`;
      })
      .join("") ||
    '<p class="lite-empty">Tocá un producto para empezar la venta.</p>'
  }</div><div class="tot"><div class="row"><span>Subtotal</span><b class="num">${money(total)}</b></div><div class="row"><span>Productos</span><span>${qty}</span></div><div class="row t2"><span>Total</span><b class="num">${money(total)}</b></div><p class="lite-note">Medio de pago y entrega se eligen al cobrar.</p><button class="btn" data-action="checkout" ${qty === 0 || !state.cash ? "disabled" : ""}>Cobrar venta</button></div></div></div>${qty > 0 ? `<div class="mobile-pos-dock" role="group" aria-label="Acciones de venta en celular"><button type="button" class="mobile-pos-jump" data-action="jump-cart" aria-label="Ir al carrito con ${qty} unidades">Carrito · ${qty} u.</button><button type="button" class="mobile-pos-charge" data-action="checkout" ${state.cash ? "" : "disabled"}>${state.cash ? "Cobrar " + money(total) : "Caja cerrada"}</button></div>` : ""}`;
}

function cartTotal() {
  return Object.entries(cart).reduce(
    (total, [id, q]) =>
      total + (state.products.find((p) => p.id === Number(id))?.price || 0) * q,
    0,
  );
}
function salesView() {
  const sales = state.sales.filter((s) => salesFilter === "all" || s.payment === salesFilter);
  return `<div class="v8-screen">${title("Ventas y cobros Lite", "Historial simple de ventas y medios de pago.", action("+ Nueva venta", "go-pos", ""))}<div class="v8-metrics three">${kpi("Ventas registradas", state.sales.length, "Operaciones", "sky")}${kpi("Ingresos totales", money(state.sales.reduce((a, s) => a + s.total, 0)), "Acumulado simulado", "mint")}${kpi("Ticket promedio", money(state.sales.reduce((a, s) => a + s.total, 0) / (state.sales.length || 1)), "Por operación", "lilac")}</div><div class="lite-filterbar" role="group" aria-label="Filtrar ventas"><span>Filtrar:</span>${[["all", "Todas"], ["Efectivo", "Efectivo"], ["Transferencia", "Transferencia"]].map(([id, text]) => `<button class="${salesFilter === id ? "on" : ""}" data-sales-filter="${id}">${text}</button>`).join("")}<button class="lite-filter-clear" data-sales-filter="all" ${salesFilter === "all" ? "hidden" : ""}>Limpiar</button></div><div class="v8-panel v8-overflow"><table class="v8-table"><thead><tr><th>Venta</th><th>Fecha</th><th>Cliente</th><th>Forma de pago</th><th>Entrega</th><th>Total</th><th>Acciones</th></tr></thead><tbody>${sales.map((s) => `<tr><td><b>${s.id}</b></td><td>${date(s.at)}</td><td>${esc(s.customer || "—")}</td><td>${label(s.payment)}</td><td>${label(s.delivery || "Retiro", "ok")}</td><td class="v8-money">${money(s.total)}</td><td>${action("Ver detalle", "sale:" + s.id)}</td></tr>`).join("") || '<tr><td colspan="7"><p class="lite-empty">No hay ventas para este filtro.</p></td></tr>'}</tbody></table></div></div>`;
}
function shipView() {
  const steps = ["Pendiente", "En preparación", "Entregado"];
  return `<div class="v8-screen">${title("Entregas y despacho Lite", "Un recorrido simple desde el pedido confirmado hasta la entrega.", action("+ Nuevo pedido", "new-delivery", ""))}<div class="v8-metrics three">${steps.map((step, i) => kpi(step, state.deliveries.filter((d) => d.status === step).length, "Pedidos", ["amber", "sky", "mint"][i])).join("")}</div><div class="v8-board" style="grid-template-columns:repeat(3,minmax(0,1fr))">${steps
    .map(
      (step, i) =>
        `<div class="v8-lane ${["amber", "sky", "mint"][i]}"><div class="v8-lane-title"><b>${step}</b>${label(state.deliveries.filter((d) => d.status === step).length)}</div><div class="v8-lane-cards">${
          state.deliveries
            .filter((d) => d.status === step)
            .map(
              (d) =>
                `<article class="v8-delivery-card"><div class="v8-del-head"><b>${d.id}</b><small>${d.sale}</small></div><b class="v8-del-name">${esc(d.customer)}</b><small>${esc(d.type)}${d.address ? " · " + esc(d.address) : ""}</small><div class="v8-del-foot">${i < 2 ? action(i === 0 ? "Preparar" : "Entregar", "advance:" + d.id, "") : '<span class="v8-label ok">Completado</span>'}</div></article>`,
            )
            .join("") || '<p class="v8-empty">Sin pedidos</p>'
        }</div></div>`,
    )
    .join("")}</div></div>`;
}
function stockView() {
  const low = state.products.filter((p) => p.stock <= p.min).length;
  const avgGain =
    state.products.reduce((a, p) => a + marginAmount(p.cost, p.price), 0) /
    (state.products.length || 1);
  const products = state.products.filter((p) => stockFilter === "all" || p.stock <= p.min);
  return `<div class="v8-screen">${title(
    "Stock Lite",
    "Control de productos, existencias y movimientos básicos.",
    action("+ Nuevo producto", "new-product", "") +
      action("Categorías", "categories") +
      action("Registrar movimiento", "move"),
  )}<div class="v8-metrics four">${kpi("Productos", state.products.length, "Artículos cargados", "sky")}${kpi(
    "Unidades totales",
    state.products.reduce((a, p) => a + p.stock, 0),
    "Existencias",
    "mint",
  )}${kpi("Stock crítico", low, "Reponer", "amber")}${kpi(
    "Ganancia promedio",
    money(avgGain),
    "Por unidad",
    "lilac",
  )}</div>
  <div class="lite-filterbar" role="group" aria-label="Filtrar stock" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
    <div style="display:flex;align-items:center;gap:8px">
      <span>Mostrar:</span>
      <button class="${stockFilter === "all" ? "on" : ""}" data-stock-filter="all">Todo</button>
      <button class="${stockFilter === "low" ? "on" : ""}" data-stock-filter="low">Por reponer (${low})</button>
    </div>
    <div class="stock-view-toggle" role="group" aria-label="Modo de visualización">
      <button type="button" class="${stockViewMode === "cards" ? "on" : ""}" data-stock-view="cards" title="Vista en tarjetas (Foto 1)">⊞ Tarjetas</button>
      <button type="button" class="${stockViewMode === "table" ? "on" : ""}" data-stock-view="table" title="Vista en tabla">☰ Tabla</button>
    </div>
  </div>
  ${
    stockViewMode === "cards"
      ? `<div id="stockGrid" class="pro-cards-grid" style="margin-top:14px">${
          products.map((p) => renderProductCard(p, "stock")).join("") ||
          '<p class="lite-empty" style="grid-column:1/-1">No hay productos para este filtro.</p>'
        }</div>`
      : `<div class="v8-panel v8-overflow" style="margin-top:14px"><table class="v8-table"><thead><tr><th>Producto</th><th>Categoría</th><th>Compra</th><th>Venta</th><th>Ganancia</th><th>Stock disponible</th><th>Mínimo</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>${
          products
            .map(
              (p) =>
                `<tr><td><div class="v8-prodcell">${avatar(p)}<span><b>${esc(p.name)}</b><small>${esc(p.barcode || "Sin código")}</small></span></div></td><td>${esc(p.cat)}</td><td class="v8-money">${money(p.cost || 0)}</td><td class="v8-money">${money(p.price)}</td><td><b>${money(marginAmount(p.cost, p.price))}</b><small style="display:block;color:var(--muted)">${marginOnCost(p.cost, p.price).toFixed(0)}% s/costo · ${marginOnSale(p.cost, p.price).toFixed(0)}% s/venta</small></td><td><b>${p.stock} u.</b><div class="lite-stockbar"><i style="width:${Math.min(100, (100 * p.stock) / (p.min * 3 || 1))}%"></i></div></td><td>${p.min} u.</td><td>${p.stock <= p.min ? label("Reponer", "warn") : label("Disponible", "ok")}</td><td>${action("Editar", "edit:" + p.id)}</td></tr>`,
            )
            .join("") ||
          '<tr><td colspan="9"><p class="lite-empty">No hay productos para reponer.</p></td></tr>'
        }</tbody></table></div>`
  }
  <p class="lite-note">Stock Lite permite cargar fotos del producto, gestionar existencias, categorías y rentabilidad unitaria.</p></div>`;
}
function catalogView() {
  const published = state.products.filter((p) => p.published).length;
  return `<div class="v8-screen">${title("Catálogo virtual Lite", "Elegí qué artículos mostrar en un catálogo público de ejemplo.", action("Vista previa", "preview", ""))}<div class="v8-metrics three">${kpi("Productos publicados", published, "Visibles", "mint")}${kpi("Sin publicar", state.products.length - published, "Ocultos", "amber")}${kpi("Precio promedio", money(state.products.reduce((a, p) => a + p.price, 0) / state.products.length), "Artículos", "sky")}</div><div class="v8-panel"><div class="v8-panelhead"><h2>Publicación de productos</h2><p>Catálogo digital optimizado para exhibición y pedidos.</p></div>${state.products.map((p) => `<div class="lite-catalog-item"><div class="v8-prodcell">${avatar(p)}<div><b>${esc(p.name)}</b><small>${money(p.price)} · ${p.stock} disponibles</small></div></div><div class="lite-actions">${p.published ? label("Publicado", "ok") : label("Oculto", "warn")}<button class="btn g sm" data-action="publish:${p.id}">${p.published ? "Ocultar" : "Publicar"}</button></div></div>`).join("")}</div></div>`;
}
function reports() {
  return liteReportRender();
}
/* Reportes Lite: cálculos exclusivamente desde ventas y productos del comercio.
   En producción state = liteState(document) obtenido de Supabase con las RLS vigentes.
   No persiste ni modifica operaciones: filtros y exportación son sólo lectura. */
/* Reportes Lite: cálculos exclusivamente desde ventas y productos del comercio.
   En producción state = liteState(document) obtenido de Supabase con las RLS vigentes.
   No persiste ni modifica operaciones: filtros y exportación son sólo lectura. */
let liteReportRange = "7";
const liteReportCurrency = (n) =>
  money(Math.round((Number(n) || 0) * 100) / 100);
const liteReportDay = (d) => {
  const x = new Date(d);
  return Number.isFinite(x.getTime())
    ? new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime()
    : NaN;
};
const liteReportParse = (d) => {
  if (!d) return NaN;
  const x = new Date(d);
  return Number.isFinite(x.getTime()) ? x.getTime() : NaN;
};
const liteReportQty = (i) => Math.max(0, Number(i?.qty ?? i?.[1] ?? 0) || 0);
const liteReportName = (i) =>
  String(i?.name ?? i?.[0] ?? "Producto sin nombre");
const liteReportPrice = (i) =>
  Math.max(0, Number(i?.price ?? i?.[2] ?? 0) || 0);
const liteReportPaid = (s) =>
  !["Pendiente", "Anulada", "Cancelada", "Baja"].includes(
    String(s?.status || "Cobrada"),
  );
const liteReportValid = () =>
  state.sales.filter(
    (s) =>
      liteReportPaid(s) &&
      Number.isFinite(liteReportParse(s.at)) &&
      Number.isFinite(Number(s.total)),
  );
const liteReportSum = (arr) =>
  arr.reduce((n, s) => n + Math.max(0, Number(s.total) || 0), 0);
function liteReportData() {
  const now = new Date(),
    today = liteReportDay(now),
    days = liteReportRange === "today" ? 1 : liteReportRange === "30" ? 30 : 7;
  const start = today - (days - 1) * 86400000,
    prevStart = start - days * 86400000;
  const paid = liteReportValid();
  const current = paid.filter(
    (s) => liteReportDay(s.at) >= start && liteReportDay(s.at) <= today,
  );
  const previous = paid.filter(
    (s) => liteReportDay(s.at) >= prevStart && liteReportDay(s.at) < start,
  );
  const todaySales = paid.filter((s) => liteReportDay(s.at) === today);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  const monthSales = paid.filter(
    (s) => liteReportDay(s.at) >= monthStart && liteReportDay(s.at) <= today,
  );
  const prevMonthStart = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1,
  ).getTime();
  const prevMonthEnd = monthStart;
  const lastMonthSales = paid.filter(
    (s) =>
      liteReportDay(s.at) >= prevMonthStart &&
      liteReportDay(s.at) < prevMonthEnd,
  );
  const currentTotal = liteReportSum(current),
    prevTotal = liteReportSum(previous),
    ticket = current.length ? currentTotal / current.length : 0;
  const prevTicket = previous.length ? prevTotal / previous.length : 0;
  const byPayment = new Map([
    ["Efectivo", 0],
    ["Transferencia", 0],
  ]);
  for (const s of current) {
    const method = String(s.payment || "")
      .toLocaleLowerCase("es")
      .includes("transfer")
      ? "Transferencia"
      : String(s.payment || "")
            .toLocaleLowerCase("es")
            .includes("efect")
        ? "Efectivo"
        : "Otros";
    byPayment.set(
      method,
      (byPayment.get(method) || 0) + Math.max(0, Number(s.total) || 0),
    );
  }
  const byProducts = new Map(),
    byCategory = new Map();
  let costEstimate = 0,
    estimatedSales = 0,
    unmatched = 0;
  for (const s of current) {
    const subtotal = (s.items || []).reduce(
      (t, i) => t + liteReportQty(i) * liteReportPrice(i),
      0,
    );
    const discount = Math.min(subtotal, Math.max(0, Number(s.discount) || 0));
    for (const item of s.items || []) {
      const name = liteReportName(item),
        qty = liteReportQty(item),
        price = liteReportPrice(item);
      const p = state.products.find(
        (p) =>
          (item?.id != null && p.id === item.id) ||
          (item?.productId != null && p.backendId === item.productId) ||
          p.name === name,
      );
      const ratio = subtotal > 0 ? (qty * price) / subtotal : 0;
      const netRevenue = Math.max(0, qty * price - discount * ratio);
      const key = p?.name || name;
      const previous = byProducts.get(key) || {
        name: key,
        qty: 0,
        revenue: 0,
        emoji: p?.emoji || "📦",
      };
      byProducts.set(key, {
        ...previous,
        qty: previous.qty + qty,
        revenue: previous.revenue + netRevenue,
      });
      const cat = p?.cat || "Sin categoría";
      byCategory.set(cat, (byCategory.get(cat) || 0) + netRevenue);
      if (p && Number.isFinite(Number(p.cost))) {
        costEstimate += qty * Math.max(0, Number(p.cost));
        estimatedSales += netRevenue;
      } else unmatched += 1;
    }
  }
  const profit = estimatedSales - costEstimate;
  const margin = estimatedSales > 0 ? (profit / estimatedSales) * 100 : 0;
  const points = Array.from({ length: days }, (_, i) => {
    const day = start + i * 86400000;
    const d = new Date(day);
    const group = current.filter((s) => liteReportDay(s.at) === day);
    return {
      day,
      label: d.toLocaleDateString("es-AR", {
        weekday: "short",
        day: days > 7 ? "numeric" : undefined,
      }),
      value: liteReportSum(group),
    };
  });
  const stocks = state.products.filter(
    (p) => p.enabled !== false && Number(p.stock) <= Number(p.min),
  );
  const pendingDelivery = state.deliveries.filter(
    (d) =>
      !["Entregado", "Cancelado", "Cancelada", "Anulado", "Anulada"].includes(
        d.status,
      ),
  );
  const pendingPayments = Math.max(
    0,
    Number(state.reportMeta?.pendingPayments) || 0,
  );
  const pendingAmount = Math.max(
    0,
    Number(state.reportMeta?.pendingAmount) || 0,
  );
  return {
    now,
    days,
    current,
    previous,
    paid,
    todaySales,
    monthSales,
    lastMonthSales,
    currentTotal,
    prevTotal,
    ticket,
    prevTicket,
    byPayment,
    byProducts: [...byProducts.values()]
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5),
    byCategory: [...byCategory.entries()].sort((a, b) => b[1] - a[1]),
    costEstimate,
    estimatedSales,
    unmatched,
    profit,
    margin,
    points,
    stocks,
    pendingDelivery,
    pendingPayments,
    pendingAmount,
  };
}
function liteReportChange(now, before) {
  if (!before)
    return '<span class="lr-subtle">Sin período anterior comparable</span>';
  const delta = ((now - before) * 100) / before;
  return `<span class="lr-trend ${delta < 0 ? "negative" : ""}">${delta >= 0 ? "↗" : "↘"} ${delta > 0 ? "+" : ""}${delta.toFixed(1)}% vs. período anterior</span>`;
}
function liteReportCard(label, value, note, color, icon) {
  return `<article class="lr-kpi ${color}"><span class="lr-kpi-icon">${icon}</span><div class="lr-kpi-text"><span>${label}</span><strong>${value}</strong>${note}</div></article>`;
}
function liteReportRender() {
  const r = liteReportData(),
    monthTotal = liteReportSum(r.monthSales),
    lastMonth = liteReportSum(r.lastMonthSales),
    paymentTotal = [...r.byPayment.values()].reduce((a, b) => a + b, 0),
    max = Math.max(1, ...r.points.map((x) => x.value));
  const percentCash = paymentTotal
    ? Math.round(((r.byPayment.get("Efectivo") || 0) * 100) / paymentTotal)
    : 0;
  const percentTransfer = paymentTotal
    ? Math.round(((r.byPayment.get("Transferencia") || 0) * 100) / paymentTotal)
    : 0;
  const other = Math.max(0, 100 - percentCash - percentTransfer);
  const trendToday = (() => {
    const y = liteReportDay(r.now) - 86400000;
    return liteReportSum(r.paid.filter((s) => liteReportDay(s.at) === y));
  })();
  const best = r.points.reduce((a, b) => (b.value > a.value ? b : a), {
    label: "",
    value: 0,
  });
  const topCat = r.byCategory[0];
  return `<div class="v8-screen lr-report">
 <div class="lr-heading"><div><h1>Reportes de negocio Lite</h1><p>Información básica para tomar mejores decisiones en tu emprendimiento.</p></div><div class="lr-toolbar"><div class="lr-range" role="group" aria-label="Período del reporte">${[
   ["today", "Hoy"],
   ["7", "7 días"],
   ["30", "30 días"],
 ]
   .map(
     ([id, label]) =>
       `<button type="button" class="${liteReportRange === id ? "on" : ""}" data-report-range="${id}" aria-pressed="${liteReportRange === id}">${label}</button>`,
   )
   .join(
     "",
   )}</div><button type="button" class="lr-export" data-report-export>${ic("download")}Exportar resumen</button></div></div>
 <div class="lr-kpis">
 ${liteReportCard("Ventas del día", liteReportCurrency(liteReportSum(r.todaySales)), liteReportChange(liteReportSum(r.todaySales), trendToday), "lr-blue", ic("cart"))}
 ${liteReportCard("Ventas del mes", liteReportCurrency(monthTotal), liteReportChange(monthTotal, lastMonth), "lr-green", ic("chart"))}
 ${liteReportCard("Ticket promedio", liteReportCurrency(r.ticket), liteReportChange(r.ticket, r.prevTicket), "lr-amber", ic("card"))}
 ${liteReportCard("Margen bruto estimado", r.estimatedSales > 0 ? r.margin.toFixed(1) + "%" : "—", `<small>${r.estimatedSales > 0 ? `≈ ${liteReportCurrency(r.profit)} de ganancia` : "Sin ventas con costos conocidos"}</small>`, "lr-purple", ic("dollar"))}
 </div>
 <div class="lr-primary-grid"><section class="lr-panel"><div class="lr-panel-title"><span class="lr-icon">${ic("chart")}</span><div><h2>Ventas ${r.days === 1 ? "de hoy" : "de los últimos " + r.days + " días"}</h2><p>Solo operaciones registradas como cobradas.</p></div></div><div class="lr-chart-scroll"><div class="lr-chart" style="--lr-days:${r.days};min-width:${r.days > 7 ? "850px" : "430px"}">${r.points.map((p, i) => `<div class="lr-column-wrap"><div class="lr-column-value">${p.value ? liteReportCurrency(p.value) : "—"}</div><div class="lr-column" title="${esc(p.label)}: ${esc(liteReportCurrency(p.value))}" style="height:${Math.max(p.value ? 5 : 2, (p.value / max) * 100)}%"></div><small>${esc(p.label)}</small></div>`).join("")}</div></div><p class="lr-footnote">${ic("info")}Los importes corresponden a las ventas cobradas.</p></section>
 <section class="lr-panel"><div class="lr-panel-title"><span class="lr-icon">${ic("card")}</span><div><h2>Medios de pago</h2><p>Distribución del período seleccionado</p></div></div><div class="lr-payment"><div class="lr-donut" style="--cash:${percentCash}%;--transfer:${percentCash + percentTransfer}%"><div><strong>${liteReportCurrency(paymentTotal)}</strong><small>Total cobrado</small></div></div><div class="lr-payment-list">${[
   ...r.byPayment.entries(),
 ]
   .filter(([n, v]) => ["Efectivo", "Transferencia"].includes(n) || v > 0)
   .map(
     ([name, value]) =>
       `<div class="lr-payment-row"><span class="lr-dot ${name === "Efectivo" ? "lr-dot-cash" : name === "Transferencia" ? "lr-dot-transfer" : "lr-dot-other"}"></span><span>${esc(name)}</span><b>${paymentTotal ? ((value * 100) / paymentTotal).toFixed(0) + "%" : "0%"}</b><small>${liteReportCurrency(value)}</small></div>`,
   )
   .join("")}</div></div></section></div>
 <div class="lr-secondary-grid"><section class="lr-panel"><div class="lr-panel-title"><span class="lr-icon">${ic("package")}</span><h2>Productos más vendidos</h2></div><div class="lr-product-head"><span>Producto</span><span>Unidades</span></div>${r.byProducts.length ? r.byProducts.map((p) => `<div class="lr-product"><span>${esc(p.emoji)} ${esc(p.name)}</span><b>${p.qty} u.</b></div>`).join("") : '<p class="lr-empty">Todavía no hay ventas cobradas en este período.</p>'}</section>
 <section class="lr-panel"><div class="lr-panel-title"><span class="lr-icon">${ic("alert")}</span><h2>Alertas útiles</h2></div>
 <button class="lr-alert" type="button" data-go="stock"><span class="lr-item-icon">${ic("packagePlus")}</span><span><b>${r.stocks.length} productos por reponer</b><small>Stock igual o inferior al mínimo.</small></span><span class="lr-chevron">${chevronRight()}</span></button>
 <button class="lr-alert" type="button" data-go="sales"><span class="lr-item-icon">${ic("banknoteX")}</span><span><b>${r.pendingPayments} cobros pendientes</b><small>${liteReportCurrency(r.pendingAmount)} aún no cobrados.</small></span><span class="lr-chevron">${chevronRight()}</span></button>
 <button class="lr-alert" type="button" data-go="ship"><span class="lr-item-icon">${ic("truck")}</span><span><b>${r.pendingDelivery.length} entregas pendientes</b><small>Pedidos por preparar o entregar.</small></span><span class="lr-chevron">${chevronRight()}</span></button></section>
 <section class="lr-panel"><div class="lr-panel-title"><span class="lr-icon">${ic("lightbulb")}</span><h2>Resumen rápido</h2></div>
 <div class="lr-insight"><span class="lr-item-icon">${ic("trophy")}</span><div><b>${best.value ? `Tu mejor día fue ${esc(best.label)}` : "Todavía no hay un día destacado"}</b><small>${best.value ? "Con " + liteReportCurrency(best.value) + " en ventas." : "Los resultados aparecerán al cobrar ventas."}</small></div></div>
 <div class="lr-insight"><span class="lr-item-icon">${ic("receipt")}</span><div><b>${r.prevTicket ? "Ticket promedio " + (r.ticket >= r.prevTicket ? "en aumento" : "en descenso") : "Ticket promedio del período"}</b><small>${liteReportCurrency(r.ticket)} por operación cobrada.</small></div></div>
 <div class="lr-insight"><span class="lr-item-icon">${ic("chartLine")}</span><div><b>${topCat ? `La categoría ${esc(topCat[0])} concentra más ventas` : "Sin categoría destacada"}</b><small>${topCat && r.currentTotal ? `Representa ${((topCat[1] / r.currentTotal) * 100).toFixed(0)}% de lo cobrado.` : "Se actualizará con tus ventas."}</small></div></div></section></div>
 <p class="lr-disclaimer">El margen utiliza el costo de compra actual de los productos vendidos: es una estimación, no un resultado contable. ${r.unmatched ? "No se encontró costo para " + r.unmatched + " producto(s) vendido(s)." : ""}</p></div>`;
}
function liteReportExport() {
  const r = liteReportData();
  const headers = [
    "Fecha",
    "Operación",
    "Cliente",
    "Forma de pago",
    "Total ARS",
    "Descuento ARS",
  ];
  const rows = r.current.map((s) => [
    new Date(s.at).toLocaleDateString("es-AR"),
    s.id,
    s.customer || "",
    s.payment || "",
    Number(s.total) || 0,
    Number(s.discount) || 0,
  ]);
  const quote = (v) => {
    let raw = String(v ?? "");
    if (/^[\s]*[=+\-@]/.test(raw)) raw = "'" + raw;
    return '"' + raw.replaceAll('"', '""') + '"';
  };
  const csv =
    "\ufeff" +
    [headers, ...rows].map((row) => row.map(quote).join(";")).join("\r\n");
  const url = URL.createObjectURL(
    new Blob([csv], { type: "text/csv;charset=utf-8" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download =
    "comerciando_emprendedores_ventas_" +
    new Date().toISOString().slice(0, 10) +
    ".csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function settings() {
  return `<div class="v8-screen">${title("Configuración", "Preferencias del emprendimiento y usuarios Lite.")}<div class="lite-summary"><div class="v8-panel"><div class="v8-panelhead"><h2>Datos del comercio</h2><p>Configuración general y preferencias de tu comercio.</p></div><div class="v8-panel-inner"><div class="lite-form"><label class="full">Nombre del negocio<input id="storeEdit" class="lite-input" value="${esc(state.store)}" maxlength="60"></label><label>Tema<select id="themeEdit" class="lite-input"><option value="dark" ${state.theme === "dark" ? "selected" : ""}>Oscuro</option><option value="light" ${state.theme === "light" ? "selected" : ""}>Claro</option></select></label><label>Sonidos<select id="soundEdit" class="lite-input"><option value="true" ${state.sound ? "selected" : ""}>Activados</option><option value="false" ${!state.sound ? "selected" : ""}>Desactivados</option></select></label><label>Estilo de sonido<select id="soundStyleEdit" class="lite-input"><option value="suave" ${soundStyle === "suave" ? "selected" : ""}>Suave · Campanillas discretas</option><option value="digital" ${soundStyle === "digital" ? "selected" : ""}>Digital · Tonos breves</option></select></label></div><div class="lite-sound-tools"><h3>Probar sonidos de Emprendedores</h3><p>Ya no hay bip al navegar ni al tocar cada botón. Los avisos acompañan sólo acciones importantes.</p><div class="lite-sound-examples"><button class="btn g sm" data-action="sound-preview:add">Agregar producto</button><button class="btn g sm" data-action="sound-preview:success">Venta confirmada</button><button class="btn g sm" data-action="sound-preview:warning">Advertencia</button></div><small class="lite-sound-hint">Elegí el estilo y presioná un botón para escucharlo. Si están silenciados no sonará.</small></div><div style="margin-top:17px;display:flex;gap:10px;align-items:center;flex-wrap:wrap">${action("Guardar preferencias", "save-settings", "")}${action("Restablecer demo", "reset-demo", "g sm")}</div></div></div><div class="v8-panel"><div class="v8-panelhead"><h2>Usuarios · máximo 3</h2><p>Tope de usuarios permitido por el plan Emprendedores.</p></div><div class="v8-panel-inner"><div class="lite-rows">${state.users.map((u, i) => `<div class="lite-row"><div class="lite-pick"><span class="v8-usercircle">${u.slice(0, 2).toUpperCase()}</span><div><b>${esc(u)}</b><small>${i === 0 ? "Administrador" : "Colaborador"}</small></div></div>${label("Activo", "ok")}</div>`).join("")}</div><div style="margin-top:17px">${action(state.users.length >= 3 ? "Límite alcanzado" : "+ Invitar usuario", "new-user", state.users.length >= 3 ? "g sm" : "")}<p class="lite-note" style="margin-top:11px">${state.users.length} de 3 usuarios. Las invitaciones se gestionan por correo electrónico.</p></div></div></div></div></div>`;
}
function openModal(h, sub, content, actions = "") {
  $("#modalTitle").textContent = h;
  $("#modalSubtitle").textContent = sub;
  $("#modalBody").innerHTML = content;
  $("#modalActions").innerHTML = actions;
  $("#modal").classList.add("open");
  document.body.style.overflow = "hidden";
  $("#modalX").focus();
}
function closeModal() {
  $("#modal").classList.remove("open");
  $("#modal").classList.remove("lite-detail-drawer");
  document.body.style.overflow = "";
}
function checkout() {
  if (!state.cash) return toast("Abrí caja antes de cobrar", true);
  if (!cartTotal()) return;
  payment = "Efectivo";
  delivery = "Retiro";
  discount = 0;
  renderCheckout();
}
function renderCheckout() {
  const sum = cartTotal(),
    total = Math.max(0, sum - discount);
  const customer = $("#customer")?.value || "",
    address = $("#address")?.value || "";
  openModal(
    "Cobrar venta",
    "Revisá el detalle antes de registrar esta operación.",
    `<div class="lite-total"><span>TOTAL A COBRAR</span><strong id="payTotal">${money(total)}</strong></div><div class="lite-rows">${Object.entries(
      cart,
    )
      .map(([id, q]) => {
        const p = state.products.find((p) => p.id === Number(id));
        return `<div class="lite-row"><div><b>${esc(p?.name || "")}</b><div class="lite-note">${q} × ${money(p?.price || 0)}</div></div><strong>${money(q * (p?.price || 0))}</strong></div>`;
      })
      .join(
        "",
      )}</div><div class="lite-form" style="margin-top:16px"><label class="full">Descuento fijo (ARS)<input id="discountInput" type="number" min="0" max="${sum}" class="lite-input" value="${discount}"><small class="lite-note">Aplicable sólo a esta venta.</small></label><label class="full">Medio de pago<div class="lite-choice">${["Efectivo", "Transferencia"].map((x) => `<button type="button" data-payment="${x}" class="${payment === x ? "active" : ""}">${x}</button>`).join("")}</div></label><label class="full">Tipo de entrega<div class="lite-choice">${["Retiro", "Envío"].map((x) => `<button type="button" data-delivery="${x}" class="${delivery === x ? "active" : ""}">${x}</button>`).join("")}</div></label><label class="full">Nombre del cliente<input id="customer" class="lite-input" value="${esc(customer)}" placeholder="Nombre de quien recibe o retira"></label>${delivery === "Envío" ? `<label class="full">Dirección de entrega<input id="address" class="lite-input" value="${esc(address)}" placeholder="Dirección de entrega"></label>` : ""}</div><p class="lite-note" style="margin-top:15px">Registro de cobro y actualización automática de existencias.</p>`,
    `<button class="btn g" data-action="close-modal">Volver</button><button class="btn" data-action="confirm-sale">✓ Confirmar venta</button>`,
  );
  $("#discountInput").addEventListener("input", (e) => {
    discount = Math.max(0, Math.min(sum, Number(e.target.value) || 0));
    $("#payTotal").textContent = money(sum - discount);
  });
}
function confirmSale() {
  const missing = Object.entries(cart).find(
    ([id, q]) =>
      (state.products.find((p) => p.id === Number(id))?.stock || 0) < q,
  );
  if (missing)
    return toast("Stock insuficiente para confirmar esta venta.", true);
  const customer = ($("#customer")?.value || "").trim(),
    address = ($("#address")?.value || "").trim();
  if (!customer) return toast("Ingresá el nombre del cliente.", true);
  if (delivery === "Envío" && !address)
    return toast("Ingresá la dirección de envío.", true);
  const id = "V-" + String(1001 + state.sales.length);
  let rows = Object.entries(cart).map(([pid, qty]) => {
    const p = state.products.find((p) => p.id === Number(pid));
    p.stock -= qty;
    state.movements.push({
      at: new Date().toISOString(),
      name: p.name,
      delta: -qty,
      reason: id,
    });
    return { id: p.id, name: p.name, qty, price: p.price };
  });
  state.sales.unshift({
    id,
    at: new Date().toISOString(),
    total: Math.max(0, cartTotal() - discount),
    payment,
    delivery,
    customer,
    items: rows,
  });
  state.deliveries.unshift({
    id: "P-" + String(101 + state.deliveries.length),
    sale: id,
    customer,
    type: delivery,
    address,
    status: "Pendiente",
  });
  cart = {};
  saveState();
  closeModal();
  render();
  tone("success");
  toast("Venta registrada con éxito");
}
function refreshProductProfit() {
  const cost = Number($('#productForm [name="cost"]')?.value || 0),
    price = Number($('#productForm [name="price"]')?.value || 0);
  const gain = marginAmount(cost, price),
    costPct = marginOnCost(cost, price),
    salePct = marginOnSale(cost, price);
  $("#profitAmount") && ($("#profitAmount").textContent = money(gain));
  $("#profitCostPct") &&
    ($("#profitCostPct").textContent = cost ? costPct.toFixed(1) + "%" : "0%");
  $("#profitSalePct") &&
    ($("#profitSalePct").textContent = price ? salePct.toFixed(1) + "%" : "0%");
}

function updateModalPhotoPreview() {
  const previewWrap = $("#photoPreviewWrap");
  const removeBtn = $("#btnRemovePhoto");
  if (!previewWrap) return;
  if (editingPhoto) {
    previewWrap.innerHTML = `<img src="${editingPhoto}" alt="Foto producto" class="photo-preview-img" id="photoPreviewImg">`;
    if (removeBtn) removeBtn.style.display = "";
  } else {
    previewWrap.innerHTML = `<div class="photo-preview-empty" id="photoPreviewEmpty"><span style="font-size:32px">📷</span><span>Sin foto</span></div>`;
    if (removeBtn) removeBtn.style.display = "none";
  }
}

function processImageFile(file) {
  if (!file || !file.type.startsWith("image/")) {
    return toast("Seleccioná un archivo de imagen válido (JPG, PNG, WebP).", true);
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const maxDim = 800;
      let w = img.width,
        h = img.height;
      if (w > maxDim || h > maxDim) {
        if (w > h) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);
      editingPhoto = canvas.toDataURL("image/jpeg", 0.85);
      updateModalPhotoPreview();
      toast("Foto cargada con éxito");
    };
    img.onerror = () => {
      toast("No se pudo procesar la imagen seleccionada.", true);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function setupPhotoUploaderEvents() {
  const fileInput = $("#productPhotoFile");
  const uploadBtn = $("#btnUploadPhoto");
  const removeBtn = $("#btnRemovePhoto");
  const dropzone = $("#photoDropzone");
  const urlBtn = $("#btnAddUrlPhoto");
  const urlInput = $("#photoUrlInput");

  uploadBtn?.addEventListener("click", () => fileInput?.click());

  fileInput?.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (file) processImageFile(file);
    fileInput.value = "";
  });

  removeBtn?.addEventListener("click", () => {
    editingPhoto = "";
    if (urlInput) urlInput.value = "";
    updateModalPhotoPreview();
    toast("Foto quitada");
  });

  urlBtn?.addEventListener("click", () => {
    const url = (urlInput?.value || "").trim();
    if (!url) return toast("Ingresá una URL de imagen.", true);
    const testImg = new Image();
    testImg.crossOrigin = "anonymous";
    testImg.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const maxDim = 800;
        let w = testImg.naturalWidth || testImg.width,
          h = testImg.naturalHeight || testImg.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(testImg, 0, 0, w, h);
        editingPhoto = canvas.toDataURL("image/jpeg", 0.85);
      } catch {
        editingPhoto = url;
      }
      updateModalPhotoPreview();
      toast("Foto cargada desde enlace");
    };
    testImg.onerror = () => {
      toast("No se pudo cargar la imagen desde esa URL.", true);
    };
    testImg.src = url;
  });

  if (dropzone) {
    ["dragenter", "dragover"].forEach((eventName) => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add("dragover");
      });
    });
    ["dragleave", "drop"].forEach((eventName) => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove("dragover");
      });
    });
    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove("dragover");
      const file = e.dataTransfer?.files?.[0];
      if (file) processImageFile(file);
    });
  }
}

function productModal(id) {
  syncCategories();
  const p = state.products.find((x) => x.id === id);
  editingId = id || null;
  editingPhoto = p?.image || "";

  const renderPhotoSection = () => `
    <div class="product-photo-uploader" id="photoDropzone">
      <div class="photo-uploader-content">
        <div class="photo-preview-wrap" id="photoPreviewWrap">
          ${
            editingPhoto
              ? `<img src="${editingPhoto}" alt="Foto producto" class="photo-preview-img" id="photoPreviewImg">`
              : `<div class="photo-preview-empty" id="photoPreviewEmpty">
                   <span style="font-size:32px">📷</span>
                   <span>Sin foto</span>
                 </div>`
          }
        </div>
        <div class="photo-controls">
          <div>
            <b>Foto del producto</b>
            <p class="photo-help-text">Subí una imagen desde tu dispositivo o arrastrala acá. Se optimiza y almacena de forma local.</p>
          </div>
          <div class="photo-buttons-row">
            <input type="file" id="productPhotoFile" accept="image/png,image/jpeg,image/webp,image/gif" style="display:none">
            <button type="button" class="btn g sm" id="btnUploadPhoto">📁 Subir foto</button>
            <button type="button" class="btn g sm" id="btnRemovePhoto" ${!editingPhoto ? 'style="display:none"' : ""}>✕ Quitar</button>
          </div>
          <div class="photo-url-row">
            <input type="url" id="photoUrlInput" class="lite-input" placeholder="O pegar enlace web (https://...)" style="font-size:12px;padding:6px 10px">
            <button type="button" class="btn g sm" id="btnAddUrlPhoto">Cargar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  openModal(
    p ? "Editar producto" : "Nuevo producto",
    "Gestión de datos y fotos del artículo para Stock Lite y Punto de Venta.",
    `<form id="productForm" class="lite-form">
      ${renderPhotoSection()}
      <label class="full">Nombre del producto *<input name="name" required class="lite-input" maxlength="120" value="${esc(p?.name || "")}" placeholder="Ej. Yerba mate 1 kg"></label>
      <label>Categoría *<select name="cat" required class="lite-input">${state.categories.map((cat) => `<option value="${esc(cat)}" ${(p?.cat || "Almacén") === cat ? "selected" : ""}>${esc(cat)}</option>`).join("")}</select></label>
      <label>Precio de compra ($) *<input name="cost" type="number" min="0" step="0.01" required class="lite-input" value="${p?.cost ?? 0}"></label>
      <label>Precio de venta ($) *<input name="price" type="number" min="0" step="0.01" required class="lite-input" value="${p?.price ?? 0}"></label>
      <div class="lite-profit-box">
        <div><small>Ganancia por unidad</small><strong id="profitAmount">${money(marginAmount(p?.cost || 0, p?.price || 0))}</strong></div>
        <div><small>Rentabilidad sobre costo</small><strong id="profitCostPct">${marginOnCost(p?.cost || 0, p?.price || 0).toFixed(1)}%</strong></div>
        <div><small>Margen sobre venta</small><strong id="profitSalePct">${marginOnSale(p?.cost || 0, p?.price || 0).toFixed(1)}%</strong></div>
      </div>
      <label>Código de barras / ID<input name="barcode" maxlength="80" class="lite-input" value="${esc(p?.barcode || "")}" placeholder="Código o ID numérico"></label>
      <label>Stock disponible<input name="stock" type="number" min="0" step="1" required class="lite-input" value="${p?.stock ?? 0}"></label>
      <label>Stock mínimo<input name="min" type="number" min="0" step="1" required class="lite-input" value="${p?.min ?? 0}"></label>
      <div class="lite-help-box">Usá el botón <b>Categorías</b> para agregar, editar o suprimir categorías del inventario.</div>
    </form>`,
    `<button class="btn g" data-action="close-modal">Cancelar</button><button class="btn g" data-action="categories">Categorías</button><button class="btn" data-action="save-product">Guardar producto</button>`,
  );

  setupPhotoUploaderEvents();

  ["cost", "price"].forEach((name) =>
    $('#productForm [name="' + name + '"]')?.addEventListener(
      "input",
      refreshProductProfit,
    ),
  );
}
function saveProduct() {
  const f = $("#productForm");
  if (!f.reportValidity()) return;
  const data = Object.fromEntries(new FormData(f));
  const other = state.products.find(
    (p) => p.id !== editingId && data.barcode && p.barcode === data.barcode,
  );
  if (other)
    return toast(
      "Ese código de barras ya está vinculado a otro producto.",
      true,
    );
  const values = {
    name: data.name.trim(),
    cat: data.cat.trim(),
    cost: Number(data.cost),
    price: Number(data.price),
    barcode: data.barcode.trim(),
    stock: Number(data.stock),
    min: Number(data.min),
    image: editingPhoto || "",
  };
  if (values.price < values.cost)
    return toast(
      "El precio de venta no puede ser menor que el precio de compra.",
      true,
    );
  if (editingId) {
    const existing = state.products.find((p) => p.id === editingId);
    if (existing) {
      Object.assign(existing, values);
    }
  } else {
    state.products.push({
      id: Math.max(0, ...state.products.map((p) => p.id)) + 1,
      ...values,
      emoji: "📦",
      published: true,
    });
  }
  syncCategories();
  saveState();
  closeModal();
  render();
  tone("success");
  toast("Producto guardado con éxito");
}
function categoryModal() {
  syncCategories();
  openModal(
    "Categorías",
    "Agregá, editá o suprimí categorías para organizar tu Stock Lite.",
    `<div class="lite-inline-row" style="margin-bottom:14px"><label class="grow">Nueva categoría<input id="categoryName" class="lite-input" maxlength="50" placeholder="Ej. Limpieza"></label><button type="button" class="btn" data-action="add-category">Agregar categoría</button></div><div class="lite-rows">${state.categories.map((cat) => `<div class="lite-category-head"><div><b>${esc(cat)}</b><small style="display:block;color:var(--muted)">${state.products.filter((p) => p.cat === cat).length} producto(s)</small></div><div class="lite-category-actions"><button class="btn g sm" data-action="edit-category:${encodeURIComponent(cat)}">Editar</button><button class="btn g sm" data-action="delete-category:${encodeURIComponent(cat)}">Suprimir</button></div></div>`).join("") || '<p class="lite-note">Todavía no hay categorías.</p>'}</div>`,
    `<button class="btn g" data-action="close-modal">Cerrar</button>`,
  );
}
function addCategory() {
  const input = $("#categoryName");
  const name = (input?.value || "").trim();
  if (!name) return toast("Ingresá el nombre de la categoría.", true);
  if (state.categories.some((c) => c.toLowerCase() === name.toLowerCase()))
    return toast("Esa categoría ya existe.", true);
  state.categories.push(name);
  syncCategories();
  saveState();
  categoryModal();
  toast("Categoría agregada");
}
function editCategory(oldName) {
  const current = decodeURIComponent(oldName);
  const next = prompt("Editar categoría", current);
  if (next === null) return;
  const name = next.trim();
  if (!name) return toast("Ingresá un nombre válido.", true);
  if (
    state.categories.some(
      (c) => c !== current && c.toLowerCase() === name.toLowerCase(),
    )
  )
    return toast("Ya existe otra categoría con ese nombre.", true);
  state.categories = state.categories.map((c) => (c === current ? name : c));
  state.products
    .filter((p) => p.cat === current)
    .forEach((p) => (p.cat = name));
  syncCategories();
  saveState();
  categoryModal();
  render();
  toast("Categoría actualizada");
}
function deleteCategory(oldName) {
  const current = decodeURIComponent(oldName);
  if (state.products.some((p) => p.cat === current))
    return toast(
      "No podés suprimir una categoría que aún tenga productos asociados.",
      true,
    );
  state.categories = state.categories.filter((c) => c !== current);
  syncCategories();
  saveState();
  categoryModal();
  render();
  toast("Categoría eliminada");
}
function moveModal() {
  openModal(
    "Registrar movimiento",
    "Entrada o salida de stock Lite.",
    `<form class="lite-form" id="moveForm"><label class="full">Producto<select name="id" class="lite-input">${state.products.map((p) => `<option value="${p.id}">${esc(p.name)} · ${p.stock} u.</option>`).join("")}</select></label><label>Tipo<select name="type" class="lite-input"><option value="in">Entrada</option><option value="out">Salida</option></select></label><label>Cantidad<input name="qty" class="lite-input" type="number" min="1" step="1" value="1" required></label></form>`,
    `<button class="btn g" data-action="close-modal">Cancelar</button><button class="btn" data-action="save-move">Registrar</button>`,
  );
}
function saveMove() {
  const f = $("#moveForm");
  if (!f.reportValidity()) return;
  const d = Object.fromEntries(new FormData(f)),
    p = state.products.find((x) => x.id === Number(d.id)),
    qty = Number(d.qty) * (d.type === "out" ? -1 : 1);
  if (p.stock + qty < 0)
    return toast("No se puede dejar el stock en negativo.", true);
  p.stock += qty;
  state.movements.push({
    at: new Date().toISOString(),
    name: p.name,
    delta: qty,
    reason: "Ajuste Lite",
  });
  saveState();
  closeModal();
  render();
  tone("success");
  toast("Movimiento registrado");
}
function deliveryModal() {
  openModal(
    "Nuevo pedido",
    "Creá un nuevo pedido de entrega para despachar.",
    `<form class="lite-form" id="deliveryForm"><label class="full">Nombre del cliente<input name="customer" class="lite-input" required placeholder="Nombre del cliente"></label><label>Modalidad<select name="type" class="lite-input"><option>Retiro</option><option>Envío</option></select></label><label>Dirección (para envíos)<input name="address" class="lite-input" placeholder="Dirección"></label></form>`,
    `<button class="btn g" data-action="close-modal">Cancelar</button><button class="btn" data-action="save-delivery">Crear pedido</button>`,
  );
}
function saveDelivery() {
  const f = $("#deliveryForm");
  if (!f.reportValidity()) return;
  const d = Object.fromEntries(new FormData(f));
  if (d.type === "Envío" && !d.address.trim())
    return toast("Ingresá la dirección de envío.", true);
  state.deliveries.unshift({
    id: "P-" + String(101 + state.deliveries.length),
    sale: "Directa",
    customer: d.customer,
    type: d.type,
    address: d.address,
    status: "Pendiente",
  });
  saveState();
  closeModal();
  render();
  tone("success");
  toast("Pedido creado con éxito");
}
function saleDetail(id) {
  const s = state.sales.find((s) => s.id === id);
  if (!s) return;
  openModal(
    "Detalle de " + s.id,
    "Comprobante y detalle de la operación.",
    `<div class="lite-row"><span>Medio de pago</span><b>${esc(s.payment)}</b></div><div class="lite-row"><span>Tipo de entrega</span><b>${esc(s.delivery || "Retiro")}</b></div><div class="lite-row"><span>Cliente</span><b>${esc(s.customer || "—")}</b></div><div class="lite-rows" style="margin-top:12px">${(s.items || []).map((i) => `<div class="lite-row"><span>${esc(i.name)} · ${i.qty} u.</span><b>${money(i.price * i.qty)}</b></div>`).join("")}</div><div class="lite-total"><span>Total</span><strong>${money(s.total)}</strong></div>`,
    `<button class="btn" data-action="close-modal">Cerrar</button>`,
  );
  $("#modal").classList.add("lite-detail-drawer");
}
function normalizeSearchText(str) {
  return (str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getGlobalSearchResults(q) {
  const raw = (q || "").trim();
  if (!raw) return [];
  const term = normalizeSearchText(raw);
  return [
    ...state.products
      .filter((p) => normalizeSearchText(`${p.name} ${p.cat}`).includes(term))
      .map((p) => ({ type: "Producto", text: p.name, sub: p.cat, go: "stock" })),
    ...state.sales
      .filter((s) => normalizeSearchText(`${s.id} ${s.customer || ""}`).includes(term))
      .map((s) => ({ type: "Venta", text: s.id, sub: s.customer || "Sin cliente", sale: s.id })),
    ...state.deliveries
      .filter((d) => normalizeSearchText(`${d.id} ${d.customer} ${d.status}`).includes(term))
      .map((d) => ({ type: "Entrega", text: d.id, sub: `${d.customer} · ${d.status}`, go: "ship" })),
  ].slice(0, 8);
}

function renderGlobalSearchResults() {
  const resultsContainer = document.querySelector(".global-search-results");
  if (!resultsContainer) return;
  const q = (globalSearchTerm || "").trim().toLocaleLowerCase("es");
  const results = getGlobalSearchResults(q);
  resultsContainer.innerHTML = q
    ? results.map((r) => `<button class="global-search-hit" data-global-go="${r.go || ""}" data-global-sale="${r.sale || ""}"><span>${esc(r.type)}</span><b>${esc(r.text)}</b><small>${esc(r.sub)}</small>${chevronRight()}</button>`).join("") || '<p class="lite-empty">No encontramos resultados.</p>'
    : '<p class="lite-empty">Empezá a escribir para buscar.</p>';
}

function openGlobalSearch(initialTerm) {
  if (typeof initialTerm === "string") {
    globalSearchTerm = initialTerm;
  }
  const navInput = $("#navSearchInput");
  if (navInput && navInput.value !== globalSearchTerm) {
    navInput.value = globalSearchTerm;
  }

  const modal = $("#modal");
  const isModalOpen = modal?.classList.contains("open");
  const existingInput = $("#globalSearch");

  // Si el modal ya está abierto, solo actualizamos los resultados sin destruir el input
  if (isModalOpen && existingInput) {
    if (existingInput.value !== globalSearchTerm) {
      existingInput.value = globalSearchTerm;
    }
    renderGlobalSearchResults();
    existingInput.focus();
    const len = existingInput.value.length;
    existingInput.setSelectionRange(len, len);
    return;
  }

  const q = (globalSearchTerm || "").trim().toLocaleLowerCase("es");
  const results = getGlobalSearchResults(q);

  openModal(
    "Buscar en el negocio",
    "Productos, ventas, clientes y entregas. Atajo: Ctrl/Cmd + K.",
    `<div class="global-search"><input id="globalSearch" class="lite-input" placeholder="Buscar producto, venta, cliente…" value="${esc(globalSearchTerm)}" aria-label="Buscar en el negocio"><div class="global-search-results">${q ? results.map((r) => `<button class="global-search-hit" data-global-go="${r.go || ""}" data-global-sale="${r.sale || ""}"><span>${esc(r.type)}</span><b>${esc(r.text)}</b><small>${esc(r.sub)}</small>${chevronRight()}</button>`).join("") || '<p class="lite-empty">No encontramos resultados.</p>' : '<p class="lite-empty">Empezá a escribir para buscar.</p>'}</div></div>`,
    `<button class="btn g" data-action="close-modal">Cerrar</button>`
  );

  const input = $("#globalSearch");
  if (input) {
    input.focus();
    const len = input.value.length;
    input.setSelectionRange(len, len);
  }
}
function preview() {
  const items = state.products.filter((p) => p.published);
  openModal(
    "Catálogo virtual Lite",
    "Vista previa del catálogo público de productos.",
    `<div class="lite-catalog-preview">${items.map((p) => `<div class="lite-preview-item">${avatar(p)}<b>${esc(p.name)}</b><small>${money(p.price)}</small></div>`).join("") || '<p class="lite-empty">No hay productos publicados.</p>'}</div>`,
    `<button class="btn" data-action="close-modal">Cerrar</button>`,
  );
}
function saveSettings() {
  state.store = ($("#storeEdit").value || "Mi emprendimiento").trim();
  state.theme = $("#themeEdit").value;
  state.sound = $("#soundEdit").value === "true";
  soundStyle = $("#soundStyleEdit").value;
  saveThemePreference();
  saveSoundPreference();
  saveState();
  document.documentElement.dataset.theme = state.theme;
  render();
  toast("Preferencias actualizadas");
}
function modalAction(code) {
  if (code === "close-modal") return closeModal();
  if (code === "confirm-sale") return confirmSale();
  if (code === "save-product") return saveProduct();
  if (code === "save-move") return saveMove();
  if (code === "save-delivery") return saveDelivery();
  if (code === "add-category") return addCategory();
}
document.addEventListener("click", (e) => {
  const target = e.target.closest("button, [data-add], [data-action], [data-stock-view]");
  if (!target || target.disabled) return;
  if (target === $("#bg")) {
    toggleNav();
    return;
  }
  if (target === $("#modalX")) {
    closeModal();
    return;
  }
  if (target === $("#cashHeader")) {
    state.cash = !state.cash;
    saveState();
    render();
    tone("notice");
    toast(state.cash ? "Caja abierta" : "Caja cerrada");
    return;
  }
  if (target === $("#navSearchBtn") || target.closest("#navSearchBtn")) {
    e.preventDefault();
    const val = $("#navSearchInput")?.value || "";
    openGlobalSearch(val);
    return;
  }
  if (target.dataset.litemenu) {
    const icon = target.querySelector("svg");
    const nextMode =
      target.dataset.litemenu === sidebarMode
        ? "fixed"
        : target.dataset.litemenu;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (icon && !reducedMotion) {
      icon.getAnimations().forEach((animation) => animation.cancel());
      icon.animate(
        [
          { transform: "rotate(0deg) scale(1)" },
          { transform: "rotate(220deg) scale(1.16)", offset: 0.58 },
          { transform: "rotate(360deg) scale(1)" },
        ],
        { duration: 440, easing: "cubic-bezier(0.22, 0.61, 0.36, 1)" },
      );
      window.setTimeout(() => setSidebarMode(nextMode), 440);
    } else {
      setSidebarMode(nextMode);
    }
    return;
  }
  if (target.dataset.reportRange) {
    liteReportRange = target.dataset.reportRange;
    render();
    return;
  }
  if (target.dataset.dashboard) {
    if (target.dataset.dashboard === "stock") stockFilter = "low";
    if (target.dataset.dashboard === "sales") salesFilter = "all";
    go(target.dataset.dashboard);
    return;
  }
  if (target.dataset.salesFilter) {
    salesFilter = target.dataset.salesFilter;
    try { localStorage.setItem("comerciando_emprendedores_sales_filter", salesFilter); } catch {}
    render();
    return;
  }
  if (target.dataset.stockFilter) {
    stockFilter = target.dataset.stockFilter;
    try { localStorage.setItem("comerciando_emprendedores_stock_filter", stockFilter); } catch {}
    render();
    return;
  }
  if (target.dataset.globalSale) {
    closeModal();
    saleDetail(target.dataset.globalSale);
    return;
  }
  if (target.dataset.globalGo) {
    closeModal();
    go(target.dataset.globalGo);
    return;
  }
  if (target.hasAttribute("data-report-export")) {
    liteReportExport();
    return;
  }
  if (target.dataset.go) {
    go(target.dataset.go);
    return;
  }
  if (target.dataset.pref) {
    if (target.dataset.pref === "theme") {
      state.theme = state.theme === "dark" ? "light" : "dark";
      saveThemePreference();
      document.documentElement.dataset.theme = state.theme;
    } else {
      state.sound = !state.sound;
      saveSoundPreference();
    }
    renderNav();
    return;
  }
  if (target.dataset.stockView) {
    stockViewMode = target.dataset.stockView;
    saveState();
    render();
    return;
  }
  if (target.dataset.add) {
    const p = state.products.find((p) => p.id === Number(target.dataset.add));
    if ((cart[p.id] || 0) >= p.stock)
      return toast("Sin más existencias.", true);
    cart[p.id] = (cart[p.id] || 0) + 1;
    uiMotion = { type: "pos-add", id: p.id };
    render();
    tone("add");
    return;
  }
  if (target.dataset.qty) {
    const id = Number(target.dataset.qty),
      p = state.products.find((p) => p.id === id);
    cart[id] = Math.min(
      p.stock,
      (cart[id] || 0) + Number(target.dataset.delta),
    );
    if (cart[id] <= 0) delete cart[id];
    uiMotion = { type: "pos-qty", id };
    render();
    tone("add");
    return;
  }
  if (target.dataset.category) {
    category = target.dataset.category;
    render();
    $("#posSearch")?.focus();
    return;
  }
  if (target.dataset.payment) {
    const customer = $("#customer")?.value || "",
      addr = $("#address")?.value || "";
    payment = target.dataset.payment;
    renderCheckout();
    $("#customer").value = customer;
    if ($("#address")) $("#address").value = addr;
    return;
  }
  if (target.dataset.delivery) {
    const customer = $("#customer")?.value || "",
      addr = $("#address")?.value || "";
    delivery = target.dataset.delivery;
    renderCheckout();
    $("#customer").value = customer;
    if ($("#address")) $("#address").value = addr;
    return;
  }
  const code = target.dataset.action;
  if (!code) return;
  if (code === "jump-cart") {
    document
      .querySelector("#v .cart")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  if (code.startsWith("sound-preview:")) {
    const sel = $("#soundStyleEdit");
    if (sel) soundStyle = sel.value;
    const active = $("#soundEdit");
    if (active) state.sound = active.value === "true";
    return tone(code.split(":")[1]);
  }
  if (code === "new-product") return productModal(null);
  if (code === "categories") return categoryModal();
  if (code.startsWith("edit-category:"))
    return editCategory(code.split(":")[1]);
  if (code.startsWith("delete-category:"))
    return deleteCategory(code.split(":")[1]);
  if (code.startsWith("edit:")) return productModal(Number(code.split(":")[1]));
  if (code === "move") return moveModal();
  if (code === "new-delivery") return deliveryModal();
  if (code === "go-pos") return go("pos");
  if (code === "checkout") return checkout();
  if (code === "clear-cart") {
    cart = {};
    render();
    return toast("Carrito vaciado");
  }
  if (code === "toggle-cash") {
    state.cash = !state.cash;
    saveState();
    render();
    return toast(state.cash ? "Caja abierta" : "Caja cerrada");
  }
  if (code.startsWith("sale:")) return saleDetail(code.slice(5));
  if (code.startsWith("advance:")) {
    const d = state.deliveries.find((d) => d.id === code.slice(8));
    d.status = d.status === "Pendiente" ? "En preparación" : "Entregado";
    saveState();
    render();
    tone("notice");
    return toast("Estado de pedido actualizado");
  }
  if (code.startsWith("publish:")) {
    const p = state.products.find((p) => p.id === Number(code.slice(8)));
    p.published = !p.published;
    saveState();
    render();
    tone("notice");
    return toast(
      p.published ? "Producto publicado en catálogo" : "Producto oculto",
    );
  }
  if (code === "preview") return preview();
  if (code === "save-settings") return saveSettings();
  if (code === "reset-demo") {
    if (
      confirm(
        "¿Deseás restablecer los productos y datos originales del demo? Se reiniciarán las imágenes y datos guardados localmente.",
      )
    ) {
      try {
        localStorage.removeItem(STATE_STORAGE_KEY);
      } catch {}
      location.reload();
    }
    return;
  }
  if (code === "new-user") {
    if (state.users.length >= 3)
      return toast("Este plan permite hasta 3 usuarios.", true);
    openModal(
      "Invitar usuario",
      "Límite de usuarios activos del plan.",
      `<label class="lite-form">Nombre completo<input class="lite-input" id="newUser" maxlength="60" placeholder="Nombre del usuario"></label>`,
      `<button class="btn g" data-action="close-modal">Cancelar</button><button class="btn" data-action="add-user">Agregar usuario</button>`,
    );
    return;
  }
  if (code === "add-user") {
    const val = ($("#newUser")?.value || "").trim();
    if (!val) return toast("Ingresá un nombre.", true);
    if (state.users.length >= 3) return toast("Límite de 3 usuarios.", true);
    state.users.push(val);
    saveState();
    closeModal();
    render();
    return toast("Usuario agregado con éxito");
  }
  modalAction(code);
});
document.addEventListener("input", (e) => {
  if (e.target.id === "globalSearch") {
    globalSearchTerm = e.target.value;
    const navInput = $("#navSearchInput");
    if (navInput && navInput !== document.activeElement) {
      navInput.value = globalSearchTerm;
    }
    renderGlobalSearchResults();
    return;
  }
  if (e.target.id === "navSearchInput") {
    globalSearchTerm = e.target.value;
    const globInput = $("#globalSearch");
    if (globInput && globInput !== document.activeElement) {
      globInput.value = globalSearchTerm;
      renderGlobalSearchResults();
    }
    return;
  }
  if (e.target.id === "posSearch") {
    searchTerm = e.target.value;
    const caret = e.target.selectionStart;
    render();
    const input = $("#posSearch");
    input?.focus();
    input?.setSelectionRange(caret, caret);
  }
});
document.addEventListener("submit", (e) => {
  if (e.target.id === "navSearchForm") {
    e.preventDefault();
    const val = $("#navSearchInput")?.value || "";
    openGlobalSearch(val);
  }
  if (e.target.id === "productForm") {
    e.preventDefault();
    saveProduct();
  }
});
$("#modal").addEventListener("click", (e) => {
  if (e.target.id === "modal") closeModal();
});
$("#overlay").addEventListener("click", closeNav);
document.addEventListener("keydown", (e) => {
  if (e.target.id === "globalSearch" && e.key === "Enter") {
    e.preventDefault();
    const firstHit = document.querySelector(".global-search-hit");
    if (firstHit) firstHit.click();
    return;
  }
  if (e.target.id === "navSearchInput" && e.key === "Enter") {
    e.preventDefault();
    const val = $("#navSearchInput")?.value || "";
    openGlobalSearch(val);
    return;
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    const initial = $("#navSearchInput")?.value || "";
    openGlobalSearch(initial);
    const inp = $("#globalSearch");
    if (inp && initial) inp.select();
    return;
  }
  if (e.key === "/" && !/input|textarea|select/i.test(e.target.tagName)) {
    e.preventDefault();
    const initial = $("#navSearchInput")?.value || "";
    openGlobalSearch(initial);
    const inp = $("#globalSearch");
    if (inp && initial) inp.select();
    return;
  }
  if (e.key.toLowerCase() === "n" && !/input|textarea|select/i.test(e.target.tagName)) {
    e.preventDefault();
    go(view === "stock" ? "stock" : "pos");
    if (view === "stock") productModal(null);
    return;
  }
  if ((e.key === "+" || e.key === "-") && view === "pos" && !/input|textarea|select/i.test(e.target.tagName)) {
    const id = Number(Object.keys(cart).at(-1));
    const product = state.products.find((p) => p.id === id);
    if (!product) return;
    const delta = e.key === "+" ? 1 : -1;
    if (delta > 0 && (cart[id] || 0) >= product.stock) return;
    cart[id] = (cart[id] || 0) + delta;
    if (cart[id] <= 0) delete cart[id];
    uiMotion = { type: "pos-qty", id };
    render();
    tone("add");
    return;
  }
  if (e.key === "Escape") {
    closeModal();
    closeNav();
  }
});
if (window.matchMedia("(max-width: 850px)").matches) {
  document.body.classList.add("remake-touch");
}
window.addEventListener("resize", () => {
  document.body.classList.toggle("remake-touch", window.innerWidth <= 850);
});
document.documentElement.dataset.theme = state.theme;
const initialHash = location.hash.replace("#", "");
if (initialHash in NAME) {
  go(initialHash);
} else {
  render();
}
