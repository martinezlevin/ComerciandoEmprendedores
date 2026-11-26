/* Lógica de la OnePage Catálogo Online estilo Market — Comerciando */
"use strict";

const STORE_STATE_KEY = "comerciando_emprendedores_state_v2";
const STORE_THEME_KEY = "comerciando_emprendedores_theme_v1";
const STORE_CART_KEY = "comerciando_public_store_cart_v1";
const STORE_CUSTOMER_KEY = "comerciando_store_customer_v1";
const ADMIN_AUTH_KEY = "comerciando_auth_session";

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
    } else {
      const rawAdmin = localStorage.getItem(ADMIN_AUTH_KEY);
      if (rawAdmin) {
        const a = JSON.parse(rawAdmin);
        if (a?.user?.name) {
          customerUser = {
            name: a.user.name,
            email: a.user.email || "",
            provider: "Comerciando",
          };
        }
      }
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
    btn.innerHTML = `<span class="store-user-avatar">${esc(initials || "U")}</span><span>${esc(customerUser.name.split(" ")[0])}</span>`;
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
    return `<div class="market-qty-float"><button type="button" class="market-add-circle" data-add="${p.id}" style="background:var(--bad)" aria-label="Sin stock">!</button></div>`;
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
  const parsed = parseProductTitle(p.name);
  const displayName = parsed.spec ? parsed.title : p.name;
  const specBadge = parsed.spec
    ? `<span class="pro-card-spec">${esc(parsed.spec)}</span>`
    : "";
  const media = p.image
    ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" class="pro-card-img" loading="lazy">`
    : `<div class="pro-card-placeholder"><span>${esc(p.emoji || "📦")}</span></div>`;

  return `
    <article class="pro-card market-card ${outOfStock ? "out-of-stock" : ""}" data-add="${p.id}">
      <div class="pro-card-media" role="button" tabindex="0">
        ${media}
        ${renderFloatQty(p)}
      </div>
      <div class="pro-card-body">
        <div class="pro-card-price" style="font-size:17px;margin-bottom:2px">${money(p.price)}</div>
        <h3 class="pro-card-title" title="${esc(p.name)}">${esc(displayName)}</h3>
        <div class="pro-card-meta">
          <span class="pro-card-stock ${outOfStock ? "warn" : "ok"}">${outOfStock ? "Sin stock" : `${p.stock} disp.`}</span>
          ${specBadge}
        </div>
      </div>
    </article>
  `;
}

function renderListRow(p) {
  const outOfStock = p.stock <= 0;
  const parsed = parseProductTitle(p.name);
  const displayName = parsed.spec ? parsed.title : p.name;
  const media = p.image
    ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" class="pro-list-img" loading="lazy">`
    : `<div class="pro-list-placeholder"><span>${esc(p.emoji || "📦")}</span></div>`;

  return `
    <article class="pro-list-row ${outOfStock ? "out-of-stock" : ""}" data-add="${p.id}">
      <div class="pro-list-media">${media}</div>
      <div class="pro-list-info">
        <h3 class="pro-list-title">${esc(displayName)}</h3>
        <div class="pro-list-meta">
          <span class="pro-list-cat">${esc(p.cat || "")}</span>
          <span class="pro-list-dot">·</span>
          <span class="pro-card-stock ${outOfStock ? "warn" : "ok"}">${outOfStock ? "Sin stock" : `${p.stock} disp.`}</span>
          ${parsed.spec ? `<span class="pro-list-dot">·</span><span class="pro-card-spec">${esc(parsed.spec)}</span>` : ""}
        </div>
      </div>
      <div class="pro-list-right">
        <div class="pro-list-price">${money(p.price)}</div>
        <button type="button" class="pro-card-round-btn ${outOfStock ? "out-of-stock-btn" : ""}" data-add="${p.id}" aria-label="Agregar ${esc(p.name)} al carrito">
          <span class="pro-round-plus" aria-hidden="true">${outOfStock ? "!" : "+"}</span>
        </button>
      </div>
    </article>
  `;
}

function renderCatalog() {
  $("#storeName").textContent = storeName;
  document.title = `${storeName} — Catálogo Online`;

  const productCats = [...new Set(allProducts.map((p) => p.cat).filter(Boolean))];
  const cats = [
    "Todas",
    ...new Set([...productCats, ...Object.keys(CAT_VISUALS).filter((c) => c !== "Todas")]),
  ];
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
    showToast(`Stock máximo alcanzado (${p.stock} u.).`);
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
    showToast(`Stock máximo disponible: ${p.stock} u.`);
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
  $("#storeModal").classList.add("on");
}

function closeModal() {
  $("#storeModal").classList.remove("on");
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
      saveCustomerUser(null);
      closeModal();
      showToast("Sesión cerrada");
    });
    $("#authCloseBtn").addEventListener("click", closeModal);
    return;
  }

  openModal(
    "Iniciar sesión",
    `Ingresá para guardar tus datos y agilizar tus compras en ${storeName}.`,
    `
      <div class="store-social-stack">
        <button type="button" class="store-social-btn" id="authGoogleBtn">${SVG.google}<span>Google</span></button>
        <button type="button" class="store-social-btn" id="authAppleBtn">${SVG.apple}<span>Apple</span></button>
      </div>
      <div class="store-auth-divider">o con tu cuenta de Comerciando</div>
      <form id="storeLoginForm" class="store-form-grid" onsubmit="return false;">
        <div class="store-field full">
          <label for="authName">Nombre</label>
          <input id="authName" type="text" placeholder="Ej: Juan Pérez" value="Invitado Comerciando" />
        </div>
        <div class="store-field full">
          <label for="authEmail">Correo electrónico</label>
          <input id="authEmail" type="email" placeholder="tu@correo.com" value="cliente@comercio.com" />
        </div>
      </form>
    `,
    `
      <button type="button" class="btn g" id="authCancelBtn">Cancelar</button>
      <button type="button" class="btn" id="authComerciandoBtn">Ingresar con Comerciando</button>
    `,
  );

  $("#authCancelBtn").addEventListener("click", closeModal);
  $("#authGoogleBtn").addEventListener("click", () => {
    saveCustomerUser({
      name: "Usuario Google",
      email: "cliente@gmail.com",
      provider: "Google",
    });
    closeModal();
    showToast("Sesión iniciada con Google");
  });
  $("#authAppleBtn").addEventListener("click", () => {
    saveCustomerUser({
      name: "Usuario Apple",
      email: "cliente@icloud.com",
      provider: "Apple",
    });
    closeModal();
    showToast("Sesión iniciada con Apple");
  });
  $("#authComerciandoBtn").addEventListener("click", () => {
    const name = ($("#authName").value || "").trim() || "Cliente Comerciando";
    const email = ($("#authEmail").value || "").trim();
    saveCustomerUser({ name, email, provider: "Comerciando" });
    closeModal();
    showToast(`Bienvenido, ${name}`);
  });
}

function openCheckoutModal() {
  const entries = getCartEntries();
  if (!entries.length) return;
  const total = entries.reduce((acc, e) => acc + e.product.price * e.qty, 0);

  openModal(
    "Realizar compra",
    `Completá tus datos para confirmar tu pedido en ${storeName}.`,
    `
      <form id="storeCheckoutForm" class="store-form-grid" onsubmit="return false;">
        <div class="store-field">
          <label for="custName">Nombre y apellido *</label>
          <input id="custName" type="text" required placeholder="Ej: María Gómez" value="${esc(customerUser?.name || "")}" />
        </div>
        <div class="store-field">
          <label for="custPhone">Teléfono / WhatsApp *</label>
          <input id="custPhone" type="tel" required placeholder="Ej: 11 1234-5678" />
        </div>
        <div class="store-field">
          <label for="custDelivery">Entrega</label>
          <select id="custDelivery">
            <option value="Retiro">Retiro en local</option>
            <option value="Envío">Envío a domicilio</option>
          </select>
        </div>
        <div class="store-field">
          <label for="custPayment">Medio de pago</label>
          <select id="custPayment">
            <option value="Efectivo">Efectivo</option>
            <option value="Transferencia">Transferencia</option>
            <option value="QR / Mercado Pago">QR / Mercado Pago</option>
          </select>
        </div>
        <div class="store-field full hidden" id="custAddressWrap">
          <label for="custAddress">Dirección de envío *</label>
          <input id="custAddress" type="text" placeholder="Calle, número, piso/depto" />
        </div>
        <div class="store-field full">
          <label for="custNotes">Notas adicionales (opcional)</label>
          <input id="custNotes" type="text" placeholder="Horario preferido, aclaraciones..." />
        </div>
      </form>
      <div class="store-order-summary">
        ${entries
          .map(
            ({ product, qty }) =>
              `<div class="store-order-summary-row"><span>${qty} × ${esc(product.name)}</span><b>${money(product.price * qty)}</b></div>`,
          )
          .join("")}
        <div class="store-order-summary-row total">
          <span>Total a pagar</span>
          <span>${money(total)}</span>
        </div>
      </div>
    `,
    `
      <button type="button" class="btn g" id="checkoutCancelBtn">Cancelar</button>
      <button type="button" class="btn" id="checkoutConfirmBtn">Confirmar pedido</button>
    `,
  );

  $("#custDelivery").addEventListener("change", (e) => {
    $("#custAddressWrap").classList.toggle("hidden", e.target.value !== "Envío");
  });
  $("#checkoutCancelBtn").addEventListener("click", closeModal);
  $("#checkoutConfirmBtn").addEventListener("click", () => submitOrder(entries, total));
}

function submitOrder(entries, total) {
  const name = ($("#custName").value || "").trim();
  const phone = ($("#custPhone").value || "").trim();
  const delivery = $("#custDelivery").value;
  const payment = $("#custPayment").value;
  const address = ($("#custAddress").value || "").trim();

  if (!name || !phone) {
    showToast("Completá tu nombre y teléfono para continuar.");
    return;
  }
  if (delivery === "Envío" && !address) {
    showToast("Ingresá la dirección de envío.");
    return;
  }

  const orderId = "WEB-" + Math.floor(1000 + Math.random() * 9000);

  try {
    const raw = localStorage.getItem(STORE_STATE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (Array.isArray(data.sales)) {
        data.sales.unshift({
          id: orderId,
          at: new Date().toISOString(),
          total,
          payment,
          delivery,
          customer: `${name} (${phone})`,
          items: entries.map(({ product, qty }) => ({
            id: product.id,
            name: product.name,
            qty,
            price: product.price,
          })),
        });
      }
      if (delivery === "Envío" && Array.isArray(data.deliveries)) {
        data.deliveries.unshift({
          id: "P-" + Math.floor(100 + Math.random() * 900),
          customer: name,
          sale: orderId,
          type: "Envío",
          address,
          status: "Pendiente",
        });
      }
      if (Array.isArray(data.products)) {
        for (const { product, qty } of entries) {
          const target = data.products.find((x) => x.id === product.id);
          if (target) target.stock = Math.max(0, target.stock - qty);
        }
      }
      localStorage.setItem(STORE_STATE_KEY, JSON.stringify(data));
    }
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
  const waText = encodeURIComponent(
    `Hola ${storeName}! Hice el pedido *${orderId}*:\n${summaryLines}\n\nTotal: ${money(total)}\nEntrega: ${delivery}${address ? ` (${address})` : ""}\nPago: ${payment}\nCliente: ${name} (${phone})`,
  );

  openModal(
    "¡Pedido confirmado!",
    `Comprobante ${orderId}`,
    `
      <div class="store-success-box">
        <div class="store-success-badge">${SVG.check}</div>
        <h3>Gracias por tu compra, ${esc(name)}</h3>
        <p>Registramos tu pedido <b>${esc(orderId)}</b> por <b>${money(total)}</b> (${esc(delivery)} · ${esc(payment)}).</p>
      </div>
    `,
    `
      <a class="btn g" href="https://wa.me/?text=${waText}" target="_blank" rel="noopener noreferrer">Enviar por WhatsApp</a>
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
    openCheckoutModal();
  });
  $("#storeModalClose").addEventListener("click", closeModal);
  $("#storeModal").addEventListener("click", (e) => {
    if (e.target === $("#storeModal")) closeModal();
  });
});
