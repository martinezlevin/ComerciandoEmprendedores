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
  logout: `<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>`,
  logoutSquare: `<path d="M3 12h10"/><path d="M3 8V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3"/><path d="m9 16 4-4-4-4"/>`,
  eyeOff: `<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/>`,
  globeCheck: `<path d="m15 6 2 2 4-4"/><path d="M2 12h20A10 10 0 1 1 12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 4-10"/>`,
  globeX: `<path d="m16 3 5 5"/><path d="M2 12h20A10 10 0 1 1 12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 4-10"/><path d="m21 3-5 5"/>`,
});
const chevronRight = () =>
  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`;
const chevronDown = () =>
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`;
const chevronUp = () =>
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up" aria-hidden="true"><path d="m18 15-6-6-6 6"/></svg>`;
const iconWarningStock = () =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f00000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-exclamation-point" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`;
const posPlus = () =>
  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`;
const posMinus = () =>
  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus" aria-hidden="true"><path d="M5 12h14"/></svg>`;
const iconTrash = (size = 18) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash" aria-hidden="true"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`;
const iconGrid = () =>
  `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-grid" aria-hidden="true"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>`;
const iconList = () =>
  `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-list" aria-hidden="true"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><path d="M14 4h7"/><path d="M14 9h7"/><path d="M14 15h7"/><path d="M14 20h7"/></svg>`;
const iconBanknote = (size = 18) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-banknote" aria-hidden="true"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>`;
const iconCreditCard = (size = 18) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-credit-card" aria-hidden="true"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/><path d="M6 14h2"/></svg>`;
const iconQrCode = (size = 18) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-qr-code" aria-hidden="true"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>`;
const iconStore = (size = 18) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-store" aria-hidden="true"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"/></svg>`;
const iconShoppingBag = (size = 18) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag" aria-hidden="true"><path d="M16 10a4 4 0 0 1-8 0"/><path d="M3.103 6.034h17.794"/><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/></svg>`;
const iconMoped = (size = 18) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moped" aria-hidden="true"><path d="m18.16 14.12-2.927-8.447A1 1 0 0 0 14.288 5H13"/><path d="M19 10a7 7 0 0 0-6.928 6"/><path d="M2 10h5.5a3 3 0 0 1 2.747 1.795l1.669 3.803A1 1 0 0 1 11.01 17H8"/><circle cx="19" cy="17" r="3"/><circle cx="5" cy="17" r="3"/></svg>`;
const iconPackage = (size = 17) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-package" aria-hidden="true"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/></svg>`;
const iconPercent = (size = 16) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-percent" aria-hidden="true"><line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>`;
const iconCheck = (size = 17) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`;
const iconArrowRight = (size = 17) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;
const iconArrowLeft = (size = 17) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left" aria-hidden="true"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`;
const ic = (k, size = 20) =>
  k === "chevronRight"
    ? chevronRight()
    : `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-${k}" aria-hidden="true">${ICON[k] || ICON.home}</svg>`;
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
    "img/Products/yerba.webp",
  ],
  [
    "Arroz Gallo Oro 1 kg",
    "Almacén",
    1980,
    2900,
    37,
    8,
    "🍚",
    "7790000000012",
    "img/Products/arroz.webp",
  ],
  [
    "Fideos Matarazzo 500 g",
    "Almacén",
    1180,
    1850,
    46,
    10,
    "🍝",
    "7790000000013",
    "img/Products/fideos.webp",
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
    "img/Products/aceite.webp",
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
    "img/Products/harina.webp",
  ],
  [
    "Azúcar Ledesma 1 kg",
    "Almacén",
    1120,
    1750,
    31,
    7,
    "🍬",
    "7790000000016",
    "img/Products/azucar.webp",
  ],
  [
    "Galletitas dulces 350 g",
    "Desayuno",
    1210,
    1800,
    22,
    5,
    "🍪",
    "7790000000017",
    "img/Products/galletas.webp",
  ],
  [
    "Agua mineral 1,5 L",
    "Bebidas",
    980,
    1900,
    41,
    10,
    "💧",
    "7790000000018",
    "img/Products/agua.webp",
  ],
  [
    "Chocolate 100 g",
    "Golosinas",
    2150,
    3300,
    15,
    5,
    "🍫",
    "7790000000019",
    "img/Products/chocolate.webp",
  ],
];
// Opciones curadas para mantener el catálogo ordenado y asociadas a los íconos
// disponibles en la tienda pública.
const PREDEFINED_CATEGORIES = [
  "Almacén", "Desayuno", "Bebidas", "Bebidas alcohólicas", "Golosinas",
  "Caramelos", "Lácteos", "Panadería", "Panadería dulce", "Postres",
  "Frutas y Verduras", "Carnes", "Pollería", "Congelados", "Sin gluten",
  "Limpieza", "Cuidado personal", "Farmacia", "Bebé", "Mascotas", "Hogar",
  "Ferretería", "Automotor", "Tecnología", "Librería", "Juguetes", "Regalos",
  "Navidad", "Indumentaria", "Abrigos", "Buzo", "Sweater", "Pantalones",
  "Bermudas", "Shorts", "Calzas", "Vestidos", "Calzado", "Sombreros",
  "Lencería", "Ropa interior",
];
const state = {
  categoryCatalogVersion: 1,
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
    published: true,
    image: p[8] || "",
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
  cash: false,
  sound: true,
  theme: "light",
  store: "Mi emprendimiento",
  storeConfig: {
    address: "Av. Corrientes 1234, CABA",
    lat: -34.603722,
    lng: -58.381592,
    hours: "Lunes a Viernes de 9:00 a 19:00 · Sábados de 9:00 a 14:00",
    alias: "comerciando.demo.mp",
    cbu: "0000003100012345678901",
    whatsapp: "5491123456789",
  },
  users: [
    {
      id: "usr_1",
      name: "Invitado",
      firstName: "Invitado",
      lastName: "",
      email: "invitado@comercio.com",
      role: "Administrador",
      photo: "",
      status: "Activo",
      verified: true,
    },
  ],
};
let view = "home",
  cart = {},
  category = "Todas",
  searchTerm = "",
  editingId = null,
  editingPhoto = "",
  editingUserId = null,
  editingUserPhoto = "",
  editingCategory = null,
  payment = "Efectivo",
  delivery = "Mostrador",
  checkoutStep = 1,
  prevCheckoutStep = 1,
  checkoutCustomer = "",
  checkoutAddress = "",
  checkoutPhone = "",
  checkoutShippingCost = "",
  checkoutCashReceived = "",
  checkoutShowItems = false,
  checkoutErrors = {},
  salesFilter = "all",
  stockFilter = "all",
  stockViewMode = "cards",
  posViewMode = "cards",
  cartCollapsed = true,
  soundStyle = "suave",
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
const CART_STORAGE_PREFIX = "comerciando_pos_cart_v1_";

function saveState() {
  try {
    const payload = {
      products: state.products,
      categories: state.categories,
      categoryCatalogVersion: state.categoryCatalogVersion,
      sales: state.sales,
      deliveries: state.deliveries,
      movements: state.movements,
      cash: state.cash,
      sound: state.sound,
      soundStyle,
      theme: state.theme,
      store: state.store,
      storeConfig: state.storeConfig,
      users: state.users,
      stockViewMode,
      posViewMode,
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
      state.products = data.products.map((p) => {
        const seedItem = SEED.find(
          (s) =>
            s[0] === p.name ||
            s[7] === p.barcode ||
            s[0].toLowerCase() === (p.name || "").toLowerCase(),
        );
        let img = p.image || (seedItem ? seedItem[8] : "");
        if (img && img.startsWith("img/products/")) {
          img = img.replace("img/products/", "img/Products/");
        }
        return {
          ...p,
          image: img,
        };
      });
    }
    if (Array.isArray(data.categories) && data.categories.length) {
      // La versión anterior precargaba todas las opciones como si ya estuvieran
      // creadas. Al migrar, dejamos sólo las categorías realmente usadas.
      state.categories = data.categoryCatalogVersion
        ? data.categories
        : [...new Set(state.products.map((p) => p.cat).filter(Boolean))];
    }
    state.categoryCatalogVersion = 1;
    if (Array.isArray(data.sales)) state.sales = data.sales;
    if (Array.isArray(data.deliveries)) state.deliveries = data.deliveries;
    if (Array.isArray(data.movements)) state.movements = data.movements;
    // Restaurar estado de caja guardada (cerrada por defecto si no existe)
    if (typeof data.cash === "boolean") state.cash = data.cash;
    if (typeof data.sound === "boolean") state.sound = data.sound;
    if (data.soundStyle) soundStyle = data.soundStyle;
    if (data.theme === "light" || data.theme === "dark") {
      state.theme = data.theme;
      document.documentElement.dataset.theme = state.theme;
    }
    if (data.store) state.store = data.store;
    if (data.storeConfig && typeof data.storeConfig === "object") {
      state.storeConfig = { ...state.storeConfig, ...data.storeConfig };
    }
    if (Array.isArray(data.users) && data.users.length) {
      const filtered = data.users.filter((u) => {
        const uName = (typeof u === "string" ? u : u.name || "")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .trim();
        return uName !== "marina lopez" && uName !== "santiago diaz";
      });
      if (filtered.length) {
        state.users = filtered.map((u, i) => {
          if (typeof u === "string") {
            const isDemo = ["guille", "guillermo", "emprendedor", "invitado"].includes(
              u.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()
            );
            const rawName = isDemo ? "Invitado" : u;
            const parts = rawName.trim().split(" ");
            return {
              id: "usr_" + (i + 1),
              name: rawName,
              firstName: parts[0] || rawName,
              lastName: parts.slice(1).join(" ") || "",
              email: rawName === "Invitado" ? "invitado@comercio.com" : "",
              role: i === 0 ? "Administrador" : "Colaborador",
              photo: "",
              status: "Activo",
              verified: true,
            };
          }
          const isLegacyDemo = ["guille", "guillermo", "emprendedor", "invitado"].includes(
            (u.name || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()
          );
          return {
            ...u,
            name: isLegacyDemo ? "Invitado" : u.name,
            firstName: isLegacyDemo ? "Invitado" : (u.firstName || u.name),
            email: isLegacyDemo ? "invitado@comercio.com" : (u.email || ""),
            role: i === 0 ? "Administrador" : u.role || "Colaborador",
          };
        });
      } else {
        state.users = [
          {
            id: "usr_1",
            name: "Invitado",
            firstName: "Invitado",
            lastName: "",
            email: "invitado@comercio.com",
            role: "Administrador",
            photo: "",
            status: "Activo",
            verified: true,
          },
        ];
      }
    }
    // Las sesiones del dashboard se validan exclusivamente con la cookie HttpOnly
    // emitida por el servidor; no se importa una sesión local del navegador.
    const authSessionRaw = null;
    if (authSessionRaw) {
      try {
        const authSession = JSON.parse(authSessionRaw);
        if (authSession && authSession.user) {
          const authUser = authSession.user;
          const isLegacy = ["guille", "guillermo", "emprendedor"].includes(
            (authUser.name || "").toLowerCase()
          );
          if (isLegacy) {
            authUser.name = "Invitado";
            authUser.firstName = "Invitado";
            authUser.email = "invitado@comercio.com";
          }
          const matchIdx = state.users.findIndex(
            (u) =>
              u.id === authUser.id ||
              (u.email &&
                u.email.toLowerCase() === (authUser.email || "").toLowerCase()),
          );
          if (matchIdx !== -1) {
            state.users[matchIdx] = { ...state.users[matchIdx], ...authUser };
          } else {
            state.users.unshift(authUser);
          }
        }
      } catch (e) {}
    }
    if (data.stockViewMode === "cards" || data.stockViewMode === "table") {
      stockViewMode = data.stockViewMode;
    }
    if (data.posViewMode === "cards" || data.posViewMode === "list") {
      posViewMode = data.posViewMode;
    }
  } catch (err) {
    console.warn("No se pudo cargar desde localStorage:", err);
  }
}

loadState();
syncCategories();
restoreCart();
saveState();
async function hydrateSellerSession() {
  try {
    const response = await fetch("/api/auth/session?audience=seller", { credentials: "same-origin", cache: "no-store" });
    if (!response.ok) {
      return;
    }
    const data = await response.json();
    const profile = data.user;
    if (!profile) throw new Error("missing_profile");
    const seller = {
      id: profile.id,
      name: profile.name,
      firstName: profile.givenName || profile.name?.split(" ")[0] || "",
      lastName: profile.familyName || "",
      email: profile.email,
      role: profile.role,
      photo: profile.picture || "",
      verified: true,
      authProvider: "google",
    };
    const index = state.users.findIndex((user) => user.email?.toLowerCase() === seller.email.toLowerCase());
    if (index >= 0) state.users[index] = { ...state.users[index], ...seller };
    else state.users.unshift(seller);
    saveState();
    render();
  } catch {
    // Modo demo sin sesión de servidor
  }
}
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
  if (!["add", "success", "warning", "notice", "sale"].includes(kind)) return;
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
    const peakGain = kind === "sale" ? (modern ? 0.055 : 0.048) : modern ? 0.019 : 0.014;
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
      sale: modern
        ? [
            [659.25, 0, 0.08],
            [880, 0.075, 0.095],
            [1318.51, 0.155, 0.24],
          ]
        : [
            [523.25, 0, 0.095],
            [659.25, 0.08, 0.105],
            [783.99, 0.16, 0.12],
            [1046.5, 0.24, 0.28],
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
      g.gain.exponentialRampToValueAtTime(peakGain, t + 0.012);
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
function parseProductTitle(rawName) {
  const str = String(rawName || "").trim();
  const regex = /\s+(\d+(?:[.,]\d+)?\s*(?:kg|g|gr|grs|mg|l|lt|lts|ml|cc|cm3|u|unidades|pack|u\.)(?:\s.*)?)$/i;
  const match = str.match(regex);
  if (match) {
    return {
      title: str.slice(0, match.index).trim(),
      spec: match[1].trim(),
    };
  }
  return { title: str, spec: "" };
}
function renderProductCard(p, mode = "pos") {
  const isPos = mode === "pos";
  const idText = p.barcode ? `ID: ${esc(p.barcode)}` : `ID: ${p.id}`;
  const outOfStock = p.stock <= 0;
  const isLowStock = p.stock <= p.min;
  const parsed = parseProductTitle(p.name);
  const displayName = isPos && parsed.spec ? parsed.title : p.name;
  const specBadge = parsed.spec
    ? `<span class="pro-card-spec" title="Presentación / Gramaje">${esc(parsed.spec)}</span>`
    : "";

  // Categoría arriba de la foto: visible solo si el filtro activo es "Todas" (o no hay categoría seleccionada)
  const showCategoryAbove = (category === "Todas" || !category) && p.cat;
  const catAboveHtml = showCategoryAbove
    ? `<div class="pro-card-top-cat" title="${esc(p.cat)}">${esc(p.cat)}</div>`
    : "";

  const mediaContent = p.image
    ? `<img src="${p.image}" alt="${esc(p.name)}" class="pro-card-img" loading="lazy">`
    : `<div class="pro-card-placeholder" aria-label="${esc(p.name)}">
         <span>${esc(p.emoji || "📦")}</span>
       </div>`;

  const metaHtml = isPos
    ? `<div class="pro-card-meta">
         <span class="pro-card-stock ${isLowStock ? "warn" : "ok"}">${outOfStock ? "Agotado" : `${p.stock} u. disp.`}</span>
         ${specBadge}
       </div>`
    : `<div class="pro-card-meta">
         <span class="pro-card-stock ${isLowStock ? "warn" : "ok"}">${isLowStock ? "Reponer: " : "Stock: "}${p.stock} u.</span>
         ${specBadge}
         <span class="pro-card-margin">Margen: ${marginOnSale(p.cost, p.price).toFixed(0)}%</span>
       </div>`;

  const actionHtml = isPos
    ? `<button type="button" class="pro-card-round-btn ${outOfStock ? "out-of-stock-btn" : ""}" data-add="${p.id}" ${outOfStock ? 'data-out-of-stock="true"' : ""} aria-label="${outOfStock ? `Sin stock: ${esc(p.name)}` : `Agregar ${esc(p.name)} al carrito`}" title="${outOfStock ? "Sin stock disponible" : "Agregar al carrito"}">
         ${outOfStock ? iconWarningStock() : '<span class="pro-round-plus" aria-hidden="true">+</span>'}
       </button>`
    : `<button type="button" class="pro-card-btn" data-action="edit:${p.id}" aria-label="Editar ${esc(p.name)}">
         Editar producto
       </button>`;

  const clickAttr = isPos
    ? `data-add="${p.id}" ${outOfStock ? 'data-out-of-stock="true"' : ""}`
    : `data-action="edit:${p.id}"`;

  return `
    <article class="pro-card ${outOfStock ? "out-of-stock" : ""}" data-product-id="${p.id}">
      ${catAboveHtml}
      <div class="pro-card-media" ${clickAttr} role="button" tabindex="0">
        ${mediaContent}
      </div>
      <div class="pro-card-body">
        <h3 class="pro-card-title" title="${esc(p.name)}" ${clickAttr} role="button" tabindex="0">${esc(displayName)}</h3>
        <div class="pro-card-id">${idText}</div>
        ${metaHtml}
      </div>
      <div class="pro-card-footer">
        <div class="pro-card-price">${money(p.price)}</div>
        <div class="pro-card-action">
          ${actionHtml}
        </div>
      </div>
    </article>
  `;
}
function renderProductListRow(p, mode = "pos") {
  const isPos = mode === "pos";
  const idText = p.barcode ? `ID: ${esc(p.barcode)}` : `ID: ${p.id}`;
  const outOfStock = p.stock <= 0;
  const isLowStock = p.stock <= p.min;
  const parsed = parseProductTitle(p.name);
  const displayName = isPos && parsed.spec ? parsed.title : p.name;
  const specBadge = parsed.spec
    ? `<span class="pro-card-spec" title="Presentación / Gramaje">${esc(parsed.spec)}</span>`
    : "";

  const mediaContent = p.image
    ? `<img src="${p.image}" alt="${esc(p.name)}" class="pro-list-img" loading="lazy">`
    : `<div class="pro-list-placeholder" aria-label="${esc(p.name)}">
         <span>${esc(p.emoji || "📦")}</span>
       </div>`;

  const metaHtml = isPos
    ? `<div class="pro-list-meta">
         <span class="pro-list-id">${idText}</span>
         <span class="pro-list-dot">·</span>
         <span class="pro-list-cat">${esc(p.cat || "")}</span>
         <span class="pro-list-dot">·</span>
         <span class="pro-card-stock ${isLowStock ? "warn" : "ok"}">${outOfStock ? "Agotado" : `${p.stock} u. disp.`}</span>
         ${specBadge ? `<span class="pro-list-dot">·</span>${specBadge}` : ""}
       </div>`
    : `<div class="pro-list-meta">
         <span class="pro-list-id">${idText}</span>
         <span class="pro-list-dot">·</span>
         <span class="pro-list-cat">${esc(p.cat || "")}</span>
         <span class="pro-list-dot">·</span>
         <span class="pro-card-stock ${isLowStock ? "warn" : "ok"}">${isLowStock ? "Reponer: " : "Stock: "}${p.stock} u.</span>
         ${specBadge ? `<span class="pro-list-dot">·</span>${specBadge}` : ""}
       </div>`;

  const actionHtml = isPos
    ? `<button type="button" class="pro-card-round-btn ${outOfStock ? "out-of-stock-btn" : ""}" data-add="${p.id}" ${outOfStock ? 'data-out-of-stock="true"' : ""} aria-label="${outOfStock ? `Sin stock: ${esc(p.name)}` : `Agregar ${esc(p.name)} al carrito`}" title="${outOfStock ? "Sin stock disponible" : "Agregar al carrito"}">
         ${outOfStock ? iconWarningStock() : '<span class="pro-round-plus" aria-hidden="true">+</span>'}
       </button>`
    : `<button type="button" class="pro-list-btn" data-action="edit:${p.id}" aria-label="Editar ${esc(p.name)}">
         Editar
       </button>`;

  const clickAttr = isPos
    ? `data-add="${p.id}" ${outOfStock ? 'data-out-of-stock="true"' : ""}`
    : `data-action="edit:${p.id}"`;

  return `
    <article class="pro-list-row ${outOfStock ? "out-of-stock" : ""}" data-product-id="${p.id}">
      <div class="pro-list-media" ${clickAttr} role="button" tabindex="0">
        ${mediaContent}
      </div>
      <div class="pro-list-info" ${clickAttr} role="button" tabindex="0">
        <h3 class="pro-list-title" title="${esc(p.name)}">${esc(displayName)}</h3>
        ${metaHtml}
      </div>
      <div class="pro-list-right">
        <div class="pro-list-price">${money(p.price)}</div>
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
function getCurrentUser() {
  return (
    state.users[0] || {
      id: "usr_1",
      name: "Invitado",
      firstName: "Invitado",
      lastName: "",
      email: "invitado@comercio.com",
      role: "Administrador",
      photo: "",
      status: "Activo",
    }
  );
}
function getGreeting(name) {
  const hour = new Date().getHours();
  let greet = "Buenas noches";
  if (hour >= 5 && hour < 12) {
    greet = "Buen día";
  } else if (hour >= 12 && hour < 20) {
    greet = "Buenas tardes";
  }
  return `${greet}, ${esc(name || "Invitado")} 👋`;
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
  const storeNameSide = $("#storeNameSide");
  if (storeNameSide) storeNameSide.textContent = state.store;

  const user = getCurrentUser();
  const initials = (
    (user.firstName?.[0] || user.name?.[0] || "U") +
    (user.lastName?.[0] || "")
  ).toUpperCase();
  const avatarHtml = user.photo
    ? `<img src="${user.photo}" alt="${esc(user.name)}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit">`
    : esc(initials);

  const meAvatar = $("#meAvatar");
  if (meAvatar) meAvatar.innerHTML = avatarHtml;

  const userCountSide = $("#userCountSide");
  if (userCountSide)
    userCountSide.textContent = `${user.firstName || user.name || "Invitado"} · ${state.users.length}/3 usuarios`;

  const topUserCircle = $("#topUserCircle");
  if (topUserCircle) topUserCircle.innerHTML = avatarHtml;

  const topUserName = $("#topUserName");
  if (topUserName)
    topUserName.textContent = user.name || user.firstName || "Usuario";

  const topUserRole = $("#topUserRole");
  if (topUserRole) topUserRole.textContent = user.role || "Administrador";

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
  const crumbEl = $("#crumb");
  if (crumbEl) crumbEl.innerHTML = "";
  closeNav();
  render();
  $("#m").scrollTop = 0;
}
function setCashText() {
  const headerBtn = $("#cashHeader");
  if (!headerBtn) return;
  headerBtn.textContent = state.cash
    ? "● Caja abierta"
    : "○ Caja cerrada";
  headerBtn.classList.toggle("w", !state.cash);
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
  if (view === "cfg") initCfgStoreMap();
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
  <div class="premium-hero-copy"><div class="premium-eyebrow">PANEL DE MI NEGOCIO <span>·</span> PLAN EMPRENDEDORES</div><h1>${getGreeting(getCurrentUser().firstName || getCurrentUser().name)}</h1><p>Acá tenés el resumen de tu emprendimiento. Todo en una sola vista.</p></div>
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
  return `${title("Punto de venta", "Cobro rápido de mostrador y control de ventas.")}<div class="pos"><div><div class="bar pos-bar"><input id="posSearch" class="search" placeholder="Buscar por nombre o código..." value="${esc(searchTerm)}" aria-label="Buscar producto"><div class="stock-view-toggle pos-view-toggle" role="group" aria-label="Modo de visualización en punto de venta"><button type="button" class="${posViewMode === "cards" ? "on" : ""}" data-pos-view="cards" title="Vista en tarjetas (Foto 1)">${iconGrid()} Tarjetas</button><button type="button" class="${posViewMode === "list" ? "on" : ""}" data-pos-view="list" title="Vista en lista">${iconList()} Lista</button></div></div><div class="chips">${cats.map((c) => `<button class="${category === c ? "on" : ""}" data-category="${esc(c)}">${esc(c)}</button>`).join("")}</div>${posViewMode === "cards" ? `<div id="grid" class="grid pro-cards-grid">${items.map((p) => renderProductCard(p, "pos")).join("") || '<p class="lite-empty" style="grid-column:1/-1">No hay productos para este filtro.</p>'}</div>` : `<div id="grid" class="pro-list-container">${items.map((p) => renderProductListRow(p, "pos")).join("") || '<p class="lite-empty">No hay productos para este filtro.</p>'}</div>`}</div><div class="card cart ${cartCollapsed ? "collapsed" : "expanded"}"><div class="ch" data-action="toggle-cart" role="button" tabindex="0" aria-expanded="${!cartCollapsed}" aria-label="Alternar venta actual"><div class="ch-info"><h2>Venta actual</h2><p>${qty} ${qty === 1 ? "unidad" : "unidades"} · <b class="cart-ch-total">${money(total)}</b></p></div><div class="ch-actions"><button type="button" class="cart-toggle-btn" data-action="toggle-cart" aria-label="${cartCollapsed ? "Desplegar venta actual" : "Minimizar venta actual"}">${cartCollapsed ? chevronUp() : chevronDown()}</button></div></div><div class="cart-body"><div class="lines" id="lines">${
    Object.entries(cart)
      .map(([id, q]) => {
        const p = state.products.find((p) => p.id === Number(id));
        const parsed = parseProductTitle(p?.name || "");
        const titleText = parsed.title || p?.name || "";
        const specText = parsed.spec ? `${esc(parsed.spec)} · ` : "";
        return `<div class="ln">${avatar(p)}<div class="t"><b title="${esc(p?.name || "")}">${esc(titleText)}</b><small>${specText}${money(p?.price || 0)} c/u</small></div><div class="q"><button class="pos-minus-button" data-qty="${id}" data-delta="-1" aria-label="Quitar uno">${posMinus()}</button><span class="num">${q}</span><button class="pos-plus-button" data-qty="${id}" data-delta="1" aria-label="Agregar uno">${posPlus()}</button></div></div>`;
      })
      .join("") ||
    '<p class="lite-empty">Tocá un producto para empezar la venta.</p>'
  }</div><div class="tot"><div class="row"><span>Subtotal</span><b class="num">${money(total)}</b></div><div class="row"><span>Productos</span><span>${qty}</span></div><div class="row t2"><span>Total</span><b class="num">${money(total)}</b></div><p class="lite-note">Medio de pago y entrega se eligen al cobrar.</p><div class="cart-tot-actions"><button type="button" class="btn-clear-cart" data-action="prompt-clear-cart" ${qty === 0 ? "disabled" : ""} aria-label="Vaciar carrito" title="Vaciar todos los productos del carrito">${iconTrash(19)}</button><button class="btn" data-action="checkout" ${qty === 0 || !state.cash ? "disabled" : ""}>Cobrar venta</button></div></div></div></div></div>`;
}

function getCartStorageKey() {
  let userKey = "default";
  try {
    const authRaw = localStorage.getItem("comerciando_auth_session");
    if (authRaw) {
      const auth = JSON.parse(authRaw);
      const u = auth?.user;
      if (u) {
        userKey = u.id || u.email || u.name || "default";
      }
    }
  } catch {}
  if (userKey === "default") {
    const cur = typeof getCurrentUser === "function" ? getCurrentUser() : state.users?.[0];
    if (cur) userKey = cur.id || cur.email || cur.name || "default";
  }
  const safeKey = String(userKey).toLowerCase().replace(/[^a-z0-9_-]/g, "_");
  return CART_STORAGE_PREFIX + safeKey;
}

function clearSavedCart() {
  try {
    localStorage.removeItem(getCartStorageKey());
  } catch (err) {
    console.warn("No se pudo limpiar el carrito guardado:", err);
  }
}

function saveCart() {
  try {
    const entries = Object.entries(cart).filter(([, q]) => Number(q) > 0);
    if (!entries.length) {
      clearSavedCart();
      return;
    }
    const payload = {
      items: Object.fromEntries(entries),
      discount: Number(discount) || 0,
      updatedAt: Date.now(),
    };
    localStorage.setItem(getCartStorageKey(), JSON.stringify(payload));
  } catch (err) {
    console.warn("No se pudo guardar el carrito en localStorage:", err);
  }
}

function restoreCart() {
  try {
    const raw = localStorage.getItem(getCartStorageKey());
    if (!raw) return;
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object" || !data.items || typeof data.items !== "object") {
      cart = {};
      discount = 0;
      clearSavedCart();
      return;
    }
    const restored = {};
    let adjusted = false;
    for (const [idStr, rawQty] of Object.entries(data.items)) {
      const pid = Number(idStr);
      const p = state.products.find((prod) => prod.id === pid);
      const qty = Math.floor(Number(rawQty) || 0);
      if (!p || p.stock <= 0 || qty <= 0) {
        adjusted = true;
        continue;
      }
      const clampedQty = Math.min(qty, p.stock);
      if (clampedQty !== qty) adjusted = true;
      restored[p.id] = clampedQty;
    }
    if (!Object.keys(restored).length) {
      cart = {};
      discount = 0;
      clearSavedCart();
      return;
    }
    cart = restored;
    const sum = cartTotal();
    discount = Math.max(0, Math.min(sum, Number(data.discount) || 0));
    if (adjusted) saveCart();
  } catch (err) {
    console.warn("No se pudo restaurar el carrito guardado:", err);
    cart = {};
    discount = 0;
    clearSavedCart();
  }
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
            .map((d) => {
              const itemsCount = Array.isArray(d.items)
                ? d.items.reduce((acc, it) => acc + (Number(it.qty) || 0), 0)
                : 0;
              const itemsPreview = Array.isArray(d.items) && d.items.length
                ? d.items
                    .slice(0, 2)
                    .map((it) => `${it.qty}× ${esc(it.name)}`)
                    .join(", ") + (d.items.length > 2 ? ` +${d.items.length - 2} más` : "")
                : "";
              const hasCoords =
                typeof d.lat === "number" &&
                typeof d.lng === "number" &&
                !Number.isNaN(d.lat) &&
                !Number.isNaN(d.lng);
              const mapsUrl = hasCoords
                ? `https://www.google.com/maps?q=${d.lat},${d.lng}`
                : d.address
                  ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.address)}`
                  : "";
              const payText = d.paymentMethod || d.payment || "";
              return `<article class="v8-delivery-card">
                <div class="v8-del-head">
                  <b>${esc(d.id)}</b>
                  <small>${esc(d.sale || "")}${d.source === "Catálogo online" ? ' · <span class="ce-del-source">Catálogo</span>' : ""}</small>
                </div>
                <b class="v8-del-name">${esc(d.customer)}</b>
                ${d.phone || d.email ? `<small class="ce-del-contact">${[d.phone ? esc(d.phone) : "", d.email ? esc(d.email) : ""].filter(Boolean).join(" · ")}</small>` : ""}
                <div class="ce-del-badges">
                  <span class="ce-del-pill">${esc(d.type || "Retiro")}</span>
                  ${payText ? `<span class="ce-del-pill pay">${esc(payText)}</span>` : ""}
                  ${typeof d.total === "number" ? `<span class="ce-del-pill total">${money(d.total)}</span>` : ""}
                  ${d.offHours ? `<span class="ce-del-pill off-hours">&#9200; Fuera de horario</span>` : ""}
                </div>
                ${d.address ? `<small class="ce-del-addr">${esc(d.address)}</small>` : ""}
                ${itemsPreview ? `<small class="ce-del-items">${itemsCount} u.: ${itemsPreview}</small>` : ""}
                ${d.type === "Envío" && mapsUrl ? `<a class="ce-del-map-link" href="${mapsUrl}" target="_blank" rel="noopener noreferrer">Ver ubicación en mapa ↗</a>` : ""}
                <div class="v8-del-foot">
                  ${action("Detalle", "delivery-detail:" + d.id, "g sm")}
                  ${i < 2 ? action(i === 0 ? "Preparar" : "Entregar", "advance:" + d.id, "") : '<span class="v8-label ok">Completado</span>'}
                </div>
              </article>`;
            })
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
      <button type="button" class="${stockViewMode === "cards" ? "on" : ""}" data-stock-view="cards" title="Vista en tarjetas (Foto 1)">${iconGrid()} Tarjetas</button>
      <button type="button" class="${stockViewMode === "table" ? "on" : ""}" data-stock-view="table" title="Vista en lista">${iconList()} Lista</button>
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
  return `<div class="v8-screen">${title(
    "Catálogo virtual Lite",
    "Elegí qué artículos mostrar en un catálogo público de ejemplo.",
    action("Vista previa", "preview", "")
  )}<div class="v8-metrics three">${kpi(
    "Productos publicados",
    published,
    "Visibles",
    "mint"
  )}${kpi(
    "Sin publicar",
    state.products.length - published,
    "Ocultos",
    "amber"
  )}${kpi(
    "Precio promedio",
    money(
      state.products.reduce((a, p) => a + p.price, 0) / state.products.length
    ),
    "Artículos",
    "sky"
  )}</div><div class="v8-panel"><div class="v8-panelhead"><h2>Publicación de productos</h2><p>Catálogo digital optimizado para exhibición y pedidos.</p></div>${state.products
    .map((p) => {
      const parsed = parseProductTitle(p.name);
      const subInfo = [
        parsed.spec ? parsed.spec : null,
        money(p.price),
        `${p.stock} disponibles`,
      ]
        .filter(Boolean)
        .join(" · ");
      return `<div class="lite-catalog-item">
        <div class="v8-prodcell">${avatar(p)}<div class="v8-prodcell-info"><b title="${esc(
        p.name
      )}">${esc(parsed.title || p.name)}</b><small>${subInfo}</small></div></div>
        <div class="lite-actions">
          ${
            p.published
              ? `<span class="v8-label ok catalog-status-pill">${ic("globeCheck", 14)}<span>Publicado</span></span>`
              : `<span class="v8-label warn catalog-status-pill">${ic("globeX", 14)}<span>Oculto</span></span>`
          }
          <button class="btn g sm catalog-toggle-btn ${p.published ? "is-published" : "is-hidden"}" data-action="publish:${p.id}" title="${p.published ? "Ocultar del catálogo" : "Publicar en catálogo"}" aria-label="${p.published ? "Ocultar " + esc(p.name) : "Publicar " + esc(p.name)}">
            ${ic(p.published ? "eyeOff" : "web", 15)}
            <span class="catalog-btn-text">${p.published ? "Ocultar" : "Publicar"}</span>
          </button>
        </div>
      </div>`;
    })
    .join("")}</div></div>`;
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
  const userCount = state.users.length;
  const isLimit = userCount >= 3;
  const cfg = state.storeConfig || {};
  const hasCoords =
    typeof cfg.lat === "number" &&
    typeof cfg.lng === "number" &&
    !Number.isNaN(cfg.lat) &&
    !Number.isNaN(cfg.lng);
  return `<div class="v8-screen">${title("Configuración", "Preferencias del emprendimiento, local físico, cobros y usuarios.")}<div class="lite-summary"><div class="v8-panel"><div class="v8-panelhead"><h2>Datos del comercio</h2><p>Configuración general y preferencias de tu comercio.</p></div><div class="v8-panel-inner"><div class="lite-form"><label class="full">Nombre del negocio<input id="storeEdit" class="lite-input" value="${esc(state.store)}" maxlength="60"></label><label>Tema<select id="themeEdit" class="lite-input"><option value="dark" ${state.theme === "dark" ? "selected" : ""}>Oscuro</option><option value="light" ${state.theme === "light" ? "selected" : ""}>Claro</option></select></label><label>Sonidos<select id="soundEdit" class="lite-input"><option value="true" ${state.sound ? "selected" : ""}>Activados</option><option value="false" ${!state.sound ? "selected" : ""}>Desactivados</option></select></label><label>Estilo de sonido<select id="soundStyleEdit" class="lite-input"><option value="suave" ${soundStyle === "suave" ? "selected" : ""}>Suave · Campanillas discretas</option><option value="digital" ${soundStyle === "digital" ? "selected" : ""}>Digital · Tonos breves</option></select></label></div><div class="lite-sound-tools"><h3>Probar sonidos de Emprendedores</h3><p>Ya no hay bip al navegar ni al tocar cada botón. Los avisos acompañan sólo acciones importantes.</p><div class="lite-sound-examples"><button class="btn g sm" data-action="sound-preview:add">Agregar producto</button><button class="btn g sm" data-action="sound-preview:success">Venta confirmada</button><button class="btn g sm" data-action="sound-preview:warning">Advertencia</button></div><small class="lite-sound-hint">Elegí el estilo y presioná un botón para escucharlo. Si están silenciados no sonará.</small></div><div style="margin-top:17px;display:flex;gap:10px;align-items:center;flex-wrap:wrap">${action("Guardar preferencias", "save-settings", "")}${action("Restablecer demo", "reset-demo", "g sm")}<button type="button" class="btn g sm" data-action="logout" style="color:#dc2626;margin-left:auto">Cerrar sesión</button></div></div></div><div class="v8-panel"><div class="v8-panelhead"><div><h2>Local físico, horarios y pagos</h2><p>Estos datos se muestran automáticamente en el checkout de tu catálogo online.</p></div></div><div class="v8-panel-inner"><div class="lite-form"><label class="full">Dirección del local físico<div class="ce-address-row"><input id="cfgStoreAddress" class="lite-input" value="${esc(cfg.address || "")}" placeholder="Ej: Av. Corrientes 1234, CABA"><button type="button" class="btn g sm" id="cfgFindAddressBtn">Ubicar en mapa</button></div></label><div class="full"><div id="cfgStoreMap" class="ce-map-box" aria-label="Mapa de ubicación del local"></div><div class="ce-map-coords"><span id="cfgStoreCoordsText">${hasCoords ? `Ubicación marcada: ${cfg.lat.toFixed(5)}, ${cfg.lng.toFixed(5)}` : "Buscá la dirección o arrastrá el marcador para fijar la ubicación exacta del local."}</span></div><input type="hidden" id="cfgStoreLat" value="${hasCoords ? cfg.lat : ""}"><input type="hidden" id="cfgStoreLng" value="${hasCoords ? cfg.lng : ""}"></div><label class="full">Horarios de atención para retiro<input id="cfgStoreHours" class="lite-input" value="${esc(cfg.hours || "")}" placeholder="Ej: Lun a Vie 9 a 18 hs · Sáb 9 a 13 hs"></label><label>Alias para transferencias<input id="cfgStoreAlias" class="lite-input" value="${esc(cfg.alias || "")}" placeholder="Ej: mi.comercio.mp"></label><label>CVU / CBU<input id="cfgStoreCbu" class="lite-input" value="${esc(cfg.cbu || "")}" placeholder="22 dígitos"></label><label class="full">WhatsApp del local (para recibir comprobantes)<input id="cfgStoreWhatsapp" type="tel" class="lite-input" value="${esc(cfg.whatsapp || "")}" placeholder="Ej: 5491112345678 (con código de país y área)"></label></div><div style="margin-top:17px;display:flex;gap:10px;align-items:center;flex-wrap:wrap">${action("Guardar datos del local", "save-settings", "")}</div></div></div><div class="v8-panel"><div class="v8-panelhead"><div><h2>Usuarios · máximo 3</h2><p>Tope de usuarios permitido por el plan Emprendedores.</p></div><span class="pill premium-pill">${userCount}/3 activos</span></div><div class="v8-panel-inner"><div class="lite-rows">${state.users.map((u, i) => {
    const nameStr = u.name || `${u.firstName || ""} ${u.lastName || ""}`.trim() || "Usuario";
    const initials = ((u.firstName?.[0] || nameStr[0] || "U") + (u.lastName?.[0] || "")).toUpperCase();
    const avatarContent = u.photo
      ? `<img src="${u.photo}" alt="${esc(nameStr)}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit">`
      : initials;
    const roleStr = u.role || (i === 0 ? "Administrador" : "Colaborador");
    return `<div class="lite-row user-row-item"><div class="lite-pick"><span class="v8-usercircle" style="overflow:hidden;padding:0">${avatarContent}</span><div><b>${esc(nameStr)}</b><small>${esc(roleStr)}${u.email ? " · " + esc(u.email) : ""}</small></div></div><div style="display:flex;align-items:center;gap:8px">${label("Activo", "ok")}<button type="button" class="btn g sm" data-action="edit-user:${u.id || i}">Editar</button></div></div>`;
  }).join("")}</div><div style="margin-top:17px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px"><button type="button" class="btn ${isLimit ? "g sm" : ""}" data-action="new-user">${isLimit ? "Límite alcanzado" : "+ Invitar usuario"}</button><p class="lite-note" style="margin:0">${userCount} de 3 usuarios. Las invitaciones se gestionan por correo electrónico.</p></div></div></div></div></div>`;
}

function promptToggleCash() {
  if (!state.cash) {
    openModal(
      "Apertura de caja",
      "Control operativo de cobros y ventas",
      `<div style="display:flex;flex-direction:column;gap:12px;padding:6px 0">
        <p style="font-size:15px;color:var(--ink);margin:0;line-height:1.4">¿Estás seguro de que querés realizar la <b>apertura de caja</b>?</p>
        <div style="background:var(--s2,#f1f5f9);border:1px solid var(--line,#e2e8f0);border-radius:12px;padding:12px 14px;font-size:13px;color:var(--muted)">
          <b style="color:var(--ink);display:block;margin-bottom:4px">Reinicio de jornada:</b>
          Al abrir la caja se reiniciarán a 0 todos los contadores de ventas, operaciones y totales del día para que puedas iniciar la jornada con datos limpios.
        </div>
      </div>`,
      `<button class="btn" data-action="confirm-open-cash">Confirmar</button><button class="btn g sm" data-action="close-modal">Cancelar</button>`
    );
  } else {
    openModal(
      "Cierre de caja",
      "Finalización de jornada",
      `<div style="display:flex;flex-direction:column;gap:12px;padding:6px 0">
        <p style="font-size:15px;color:var(--ink);margin:0;line-height:1.4">¿Estás seguro de que querés realizar el <b>cierre de caja</b>?</p>
        <p class="lite-note" style="margin:0">Al cerrar la caja no se podrán registrar nuevas operaciones en el Punto de Venta hasta volver a abrirla.</p>
      </div>`,
      `<button class="btn" data-action="confirm-close-cash">Confirmar</button><button class="btn g sm" data-action="close-modal">Cancelar</button>`
    );
  }
}

function openEditUserModal(uid) {
  const u = state.users.find(
    (x, idx) => (x.id ? x.id === uid : String(idx) === String(uid)),
  );
  if (!u) return toast("Usuario no encontrado", true);
  editingUserId = u.id || uid;
  editingUserPhoto = u.photo || "";

  const nameStr =
    u.name || `${u.firstName || ""} ${u.lastName || ""}`.trim();
  const initials = (
    (u.firstName?.[0] || nameStr[0] || "U") + (u.lastName?.[0] || "")
  ).toUpperCase();

  const content = `
    <form id="editUserForm" onsubmit="event.preventDefault();" class="lite-form" style="gap:14px">
      <div style="display:flex;align-items:center;gap:16px;grid-column:1/-1;padding:8px 0;border-bottom:1px solid var(--line,#e2e8f0);margin-bottom:4px">
        <div id="userPhotoPreviewWrap" class="user-photo-preview">
          ${editingUserPhoto ? `<img src="${editingUserPhoto}" style="width:100%;height:100%;object-fit:cover" id="userPhotoImg">` : `<span style="color:#fff;font-size:22px;font-weight:700" id="userPhotoInitials">${initials}</span>`}
        </div>
        <div style="display:flex;flex-direction:column;gap:6px">
          <label class="btn g sm" style="cursor:pointer;margin:0;display:inline-flex;align-items:center;gap:6px">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
            <span>Subir foto de perfil</span>
            <input type="file" id="userPhotoInput" accept="image/*" style="display:none">
          </label>
          <button type="button" class="btn g sm" id="btnRemoveUserPhoto" style="${editingUserPhoto ? "" : "display:none;"}color:#dc2626">Quitar foto</button>
        </div>
      </div>
      <label>Nombre
        <input type="text" id="editUserFirst" class="lite-input" value="${esc(u.firstName || nameStr)}" required>
      </label>
      <label>Apellido
        <input type="text" id="editUserLast" class="lite-input" value="${esc(u.lastName || "")}">
      </label>
      <label class="full">Correo electrónico
        <input type="email" id="editUserEmail" class="lite-input" value="${esc(u.email || "")}" placeholder="ejemplo@comercio.com" required>
      </label>
      <label class="full">Rol asignado
        <select id="editUserRole" class="lite-input">
          <option value="Administrador" ${(u.role || "Administrador") === "Administrador" ? "selected" : ""}>Administrador (Acceso y control total)</option>
          <option value="Colaborador" ${u.role === "Colaborador" ? "selected" : ""}>Colaborador (Ventas y Stock)</option>
        </select>
      </label>
      <div style="grid-column:1/-1;padding:12px;background:var(--s2,#f1f5f9);border-radius:12px;border:1px solid var(--line,#e2e8f0);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-top:4px">
        <div>
          <b style="font-size:13px;display:block">Restablecimiento de clave</b>
          <small style="color:var(--muted)">Enviá un email seguro para actualizar la contraseña.</small>
        </div>
        <button type="button" class="btn g sm" data-action="send-reset-email:${u.id || uid}">Enviar recupero de clave</button>
      </div>
    </form>
  `;

  openModal(
    "Editar usuario",
    "Modificá los datos personales, rol o foto de perfil.",
    content,
    `<button class="btn" data-action="save-user-edit">Guardar cambios</button><button class="btn g sm" data-action="close-modal">Cancelar</button>`,
  );

  setTimeout(() => {
    const input = $("#userPhotoInput");
    if (input) {
      input.addEventListener("change", (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          editingUserPhoto = ev.target.result;
          const wrap = $("#userPhotoPreviewWrap");
          if (wrap)
            wrap.innerHTML = `<img src="${editingUserPhoto}" style="width:100%;height:100%;object-fit:cover" id="userPhotoImg">`;
          const rem = $("#btnRemoveUserPhoto");
          if (rem) rem.style.display = "";
        };
        reader.readAsDataURL(file);
      });
    }
    const remBtn = $("#btnRemoveUserPhoto");
    if (remBtn) {
      remBtn.addEventListener("click", () => {
        editingUserPhoto = "";
        const wrap = $("#userPhotoPreviewWrap");
        if (wrap)
          wrap.innerHTML = `<span style="color:#fff;font-size:22px;font-weight:700" id="userPhotoInitials">${initials}</span>`;
        remBtn.style.display = "none";
      });
    }
  }, 50);
}

function saveUserEdit() {
  const first = ($("#editUserFirst")?.value || "").trim();
  const last = ($("#editUserLast")?.value || "").trim();
  const email = ($("#editUserEmail")?.value || "").trim();
  const role = $("#editUserRole")?.value || "Colaborador";

  if (!first) return toast("Ingresá al menos el nombre del usuario.", true);

  const u = state.users.find(
    (x, idx) => (x.id ? x.id === editingUserId : String(idx) === String(editingUserId)),
  );
  if (!u) return toast("No se encontró el usuario.", true);

  u.firstName = first;
  u.lastName = last;
  u.name = `${first} ${last}`.trim();
  u.email = email;
  u.role = role;
  u.photo = editingUserPhoto;

  saveState();
  closeModal();
  render();
  tone("success");
  toast("Usuario actualizado correctamente");
}

function openNewUserModal() {
  if (state.users.length >= 3) {
    openModal(
      "Usuario adicional",
      "Tope alcanzado en Plan Emprendedor (3 usuarios)",
      `<div class="extra-user-modal" style="padding:6px 0">
        <div style="background:var(--s2,#f1f5f9);border:1.5px solid var(--line,#e2e8f0);border-radius:14px;padding:16px;text-align:center">
          <div style="display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:50%;background:#edf3ff;color:#175bdf;margin-bottom:10px">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
          </div>
          <h3 style="margin:0 0 6px;font-size:16px;color:var(--ink)">¿Querés sumar más colaboradores a tu comercio?</h3>
          <p style="margin:0 0 12px;font-size:13px;color:var(--muted)">El plan base Emprendedor incluye hasta <b>3 usuarios</b> activos simultáneos.</p>
          <div style="display:inline-flex;align-items:baseline;gap:4px;padding:6px 14px;background:#ffffff;border:1px solid #c8d9ff;border-radius:99px">
            <b style="font-size:18px;color:#175bdf">$ 3.500</b>
            <span style="font-size:12px;color:var(--muted)">/ mes por usuario extra</span>
          </div>
        </div>
        <div style="font-size:13px;color:var(--muted);line-height:1.5;padding:0 4px">
          <p style="margin:0 0 6px;color:var(--ink);font-weight:600">Beneficios incluidos:</p>
          <ul style="margin:0;padding-left:18px">
            <li>Acceso simultáneo e independiente para tu colaborador</li>
            <li>Registro y trazabilidad de ventas por cada cajero</li>
            <li>Facturación automática unificada en tu suscripción</li>
          </ul>
        </div>
      </div>`,
      `<button class="btn" data-action="confirm-extra-user-checkout">Procesar cobro adicional</button><button class="btn g sm" data-action="close-modal">Cancelar</button>`,
    );
    return;
  }

  openModal(
    "Invitar usuario",
    `Plan Emprendedor (${state.users.length} de 3 usuarios activos)`,
    `<form id="newUserForm" onsubmit="event.preventDefault();" class="lite-form" style="gap:12px">
      <label>Nombre
        <input type="text" id="newUserFirst" class="lite-input" placeholder="Ej. Camila" required>
      </label>
      <label>Apellido
        <input type="text" id="newUserLast" class="lite-input" placeholder="Ej. Romero">
      </label>
      <label class="full">Correo electrónico
        <input type="email" id="newUserEmail" class="lite-input" placeholder="colaborador@comercio.com" required>
      </label>
      <label class="full">Rol
        <select id="newUserRole" class="lite-input">
          <option value="Colaborador" selected>Colaborador (Ventas y Stock)</option>
          <option value="Administrador">Administrador (Control total)</option>
        </select>
      </label>
      <p class="lite-note" style="grid-column:1/-1;margin:0">Se enviará un correo con el enlace para que el nuevo usuario active su acceso.</p>
    </form>`,
    `<button class="btn" data-action="confirm-invite-user">Enviar invitación</button><button class="btn g sm" data-action="close-modal">Cancelar</button>`,
  );
}

function confirmInviteUser(isExtra = false) {
  const first = ($("#newUserFirst")?.value || "").trim();
  const last = ($("#newUserLast")?.value || "").trim();
  const email = ($("#newUserEmail")?.value || "").trim();
  const role = $("#newUserRole")?.value || "Colaborador";

  if (!first) return toast("Ingresá el nombre del usuario.", true);
  if (!email) return toast("Ingresá el correo electrónico.", true);

  if (!isExtra && state.users.length >= 3) {
    return toast("Límite de 3 usuarios alcanzado.", true);
  }

  const newUser = {
    id: "usr_" + Date.now(),
    name: `${first} ${last}`.trim(),
    firstName: first,
    lastName: last,
    email,
    role,
    photo: "",
    status: "Activo",
    verified: true,
    createdAt: new Date().toISOString(),
  };

  state.users.push(newUser);
  saveState();
  closeModal();
  render();
  tone("success");
  toast(`Invitación enviada a ${email}. Usuario agregado.`);
}
function openModal(h, sub, content, actions = "") {
  $("#modal").classList.remove("checkout-success-modal");
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
  $("#modal").classList.remove("checkout-success-modal");
  document.body.style.overflow = "";
}
function checkout() {
  if (!state.cash) return toast("Abrí caja antes de cobrar", true);
  if (!cartTotal()) return;
  payment = "Efectivo";
  delivery = "Mostrador";
  checkoutStep = 1;
  prevCheckoutStep = 1;
  checkoutCustomer = "";
  checkoutAddress = "";
  checkoutPhone = "";
  checkoutShippingCost = "";
  checkoutCashReceived = "";
  checkoutShowItems = false;
  checkoutErrors = {};
  discount = Math.max(0, Math.min(cartTotal(), Number(discount) || 0));
  renderCheckout();
}
function getCheckoutTotals() {
  const sum = cartTotal();
  const baseTotal = Math.max(0, sum - discount);
  const shippingExtra =
    delivery === "Envío" ? Math.max(0, Number(checkoutShippingCost) || 0) : 0;
  return {
    sum,
    baseTotal,
    shippingExtra,
    finalTotal: baseTotal + shippingExtra,
  };
}
function syncCheckoutInputs() {
  const c = $("#customer"),
    a = $("#address"),
    p = $("#customerPhone"),
    s = $("#shippingCostInput"),
    r = $("#cashReceivedInput");
  if (c) checkoutCustomer = c.value;
  if (a) checkoutAddress = a.value;
  if (p) checkoutPhone = p.value;
  if (s) checkoutShippingCost = s.value;
  if (r) checkoutCashReceived = r.value;
}
function validateCheckoutStep(step) {
  syncCheckoutInputs();
  const { baseTotal } = getCheckoutTotals();
  if (step === 1) {
    if (
      payment === "Efectivo" &&
      checkoutCashReceived !== "" &&
      Number(checkoutCashReceived) < baseTotal
    ) {
      toast("El monto recibido es menor al total a cobrar.", true);
      $("#cashReceivedInput")?.focus();
      return false;
    }
    return true;
  }
  if (step === 2) {
    checkoutErrors = {};
    if (delivery === "Retiro" || delivery === "Envío") {
      if (!checkoutCustomer.trim()) {
        checkoutErrors.customer = "Ingresá el nombre completo del cliente.";
      }
      if (!checkoutPhone.trim()) {
        checkoutErrors.phone = "Ingresá un teléfono o WhatsApp de contacto.";
      }
    }
    if (delivery === "Envío" && !checkoutAddress.trim()) {
      checkoutErrors.address = "Ingresá la dirección de entrega.";
    }
    if (Object.keys(checkoutErrors).length) {
      renderCheckout();
      if (checkoutErrors.customer) $("#customer")?.focus();
      else if (checkoutErrors.phone) $("#customerPhone")?.focus();
      else if (checkoutErrors.address) $("#address")?.focus();
      return false;
    }
    return true;
  }
  return true;
}
function updateCashChangeUI(total) {
  const box = $("#cashChangeBox");
  if (!box) return;
  if (checkoutCashReceived === "") {
    box.className = "checkout-change";
    box.innerHTML =
      '<span class="lite-note">Ingresá con cuánto abona para calcular el vuelto.</span>';
    return;
  }
  const received = Number(checkoutCashReceived) || 0;
  if (received >= total) {
    box.className = "checkout-change ok";
    box.innerHTML = `<span>Vuelto a entregar</span><strong>${money(received - total)}</strong>`;
  } else {
    box.className = "checkout-change warn";
    box.innerHTML = `<span>Falta abonar</span><strong>${money(total - received)}</strong>`;
  }
}
function renderCheckout() {
  const { sum, baseTotal, shippingExtra, finalTotal } = getCheckoutTotals(),
    qty = Object.values(cart).reduce((a, b) => a + b, 0);
  const steps = [
    [1, "Cobro"],
    [2, "Entrega"],
    [3, "Resumen"],
  ];
  const fromPct = Math.max(0, Math.min(100, (prevCheckoutStep - 1) * 50));
  const toPct = Math.max(0, Math.min(100, (checkoutStep - 1) * 50));
  prevCheckoutStep = checkoutStep;
  const stepperHtml = `<nav class="bs-stepper" aria-label="Etapas de cobro"><div class="bs-stepper-grid"><div class="bs-stepper-track" aria-hidden="true"><div class="bs-stepper-fill" style="--stepper-from:${fromPct}%;--stepper-to:${toPct}%"></div></div>${steps
    .map(([num, labelText]) => {
      const isDone = checkoutStep > num;
      const isActive = checkoutStep === num;
      return `<button type="button" class="bs-stepper-item ${isActive ? "is-active" : ""} ${isDone ? "is-completed" : ""}" data-checkout-step="${num}" aria-current="${isActive ? "step" : "false"}"><span class="bs-stepper-circle">${num}</span><span class="bs-stepper-label">${labelText}</span></button>`;
    })
    .join("")}</div></nav>`;

  let stepBody = "";
  let footerHtml = "";

  if (checkoutStep === 1) {
    const itemsHtml = Object.entries(cart)
      .map(([id, q]) => {
        const p = state.products.find((prod) => prod.id === Number(id));
        return `<div class="lite-row"><div><b>${esc(p?.name || "")}</b><div class="lite-note">${q} × ${money(p?.price || 0)}</div></div><strong>${money(q * (p?.price || 0))}</strong></div>`;
      })
      .join("");
    stepBody = `<button type="button" class="checkout-items-toggle" data-action="toggle-checkout-items" aria-expanded="${checkoutShowItems}">
      <span class="checkout-items-toggle-left">${iconPackage(16)}<span>Ver detalle de productos (${qty})</span></span>
      ${checkoutShowItems ? chevronUp() : chevronDown()}
    </button>
    ${checkoutShowItems ? `<div class="checkout-items-box"><div class="lite-rows">${itemsHtml}</div></div>` : ""}
    <div class="lite-total" style="margin-top:12px"><div><span>TOTAL A COBRAR</span>${discount > 0 ? `<div class="lite-note">Descuento aplicado: −${money(discount)}</div>` : ""}</div><strong id="payTotal">${money(baseTotal)}</strong></div>
    <div class="lite-form" style="margin-top:14px">
      <label class="full"><span class="label-with-icon">${iconPercent(15)}<span>Descuento fijo (ARS)</span> <span class="opt-tag">(opcional)</span></span><input id="discountInput" type="number" min="0" max="${sum}" class="lite-input" value="${discount || ""}" placeholder="0"></label>
      <label class="full">Medio de pago
        <div class="lite-choice two-col">
          <button type="button" data-payment="Efectivo" class="${payment === "Efectivo" ? "active" : ""}">${iconBanknote(18)}<span>Efectivo</span></button>
          <button type="button" data-payment="Transferencia" class="${payment === "Transferencia" ? "active" : ""}">${iconCreditCard(18)}<span>Transferencia</span></button>
          <button type="button" data-payment="QR" class="${payment === "QR" ? "active" : ""}">${iconQrCode(18)}<span>QR</span></button>
          <button type="button" class="payment-arca-disabled" disabled aria-label="Facturación electrónica ARCA (no incluida)" title="Facturación electrónica ARCA no incluida de forma nativa">
            <img src="https://www.afip.gob.ar/frameworkAFIP/img/logo_arca_blanco.svg" alt="ARCA" class="arca-logo-icon" />
          </button>
        </div>
      </label>
      ${
        payment === "Efectivo"
          ? `<div class="full checkout-cash-box">
              <div class="checkout-cash-head">
                <label for="cashReceivedInput">Monto con el que paga <span class="opt-tag">(opcional)</span></label>
                <button type="button" class="btn g sm" data-action="cash-exact">Monto exacto</button>
              </div>
              <input id="cashReceivedInput" type="number" min="0" class="lite-input" value="${esc(checkoutCashReceived)}" placeholder="Ej: ${Math.ceil(baseTotal / 1000) * 1000}">
              <div id="cashChangeBox" class="checkout-change"></div>
            </div>`
          : ""
      }
    </div>`;
    footerHtml = `<button type="button" class="btn g" data-action="close-modal">Cancelar</button><button type="button" class="btn" data-action="checkout-next"><span>Continuar</span>${iconArrowRight(17)}</button>`;
  } else if (checkoutStep === 2) {
    const reqClient = delivery === "Retiro" || delivery === "Envío";
    const hintText =
      delivery === "Mostrador"
        ? "Venta rápida en mostrador: los datos del cliente son opcionales."
        : delivery === "Retiro"
          ? "Retiro en local: completá nombre completo y teléfono de contacto."
          : "Envío a domicilio: completá los datos del cliente y el costo de envío si corresponde.";
    stepBody = `<div class="lite-form">
      <label class="full">Medio de entrega
        <div class="lite-choice three">
          <button type="button" data-delivery="Mostrador" class="${delivery === "Mostrador" ? "active" : ""}">${iconStore(18)}<span>Mostrador</span></button>
          <button type="button" data-delivery="Envío" class="${delivery === "Envío" ? "active" : ""}">${iconMoped(18)}<span>Envío</span></button>
          <button type="button" data-delivery="Retiro" class="${delivery === "Retiro" ? "active" : ""}">${iconShoppingBag(18)}<span>Retiro</span></button>
        </div>
      </label>
      <div class="full checkout-delivery-hint">${hintText}</div>
      <label class="full"><span>Nombre completo ${reqClient ? '<span class="req-tag">*</span>' : '<span class="opt-tag">(opcional)</span>'}</span><input id="customer" class="lite-input ${checkoutErrors.customer ? "is-invalid" : ""}" value="${esc(checkoutCustomer)}" placeholder="${reqClient ? "Nombre completo del cliente" : "Opcional en mostrador"}">${checkoutErrors.customer ? `<span class="field-error">${esc(checkoutErrors.customer)}</span>` : ""}</label>
      <label class="full"><span>Teléfono / WhatsApp de contacto ${reqClient ? '<span class="req-tag">*</span>' : '<span class="opt-tag">(opcional)</span>'}</span><input id="customerPhone" type="tel" class="lite-input ${checkoutErrors.phone ? "is-invalid" : ""}" value="${esc(checkoutPhone)}" placeholder="Ej: 11 2345 6789">${checkoutErrors.phone ? `<span class="field-error">${esc(checkoutErrors.phone)}</span>` : ""}</label>
      ${
        delivery === "Envío"
          ? `<label class="full"><span>Dirección de entrega <span class="req-tag">*</span></span><input id="address" class="lite-input ${checkoutErrors.address ? "is-invalid" : ""}" value="${esc(checkoutAddress)}" placeholder="Calle, número, piso/depto">${checkoutErrors.address ? `<span class="field-error">${esc(checkoutErrors.address)}</span>` : ""}</label>
             <label class="full"><span>Monto de envío extra (ARS) <span class="opt-tag">(opcional)</span></span><input id="shippingCostInput" type="number" min="0" class="lite-input" value="${esc(checkoutShippingCost)}" placeholder="0"></label>`
          : ""
      }
    </div>`;
    footerHtml = `<button type="button" class="btn g" data-action="checkout-prev">${iconArrowLeft(17)}<span>Atrás</span></button><button type="button" class="btn" data-action="checkout-next"><span>Continuar</span>${iconArrowRight(17)}</button>`;
  } else {
    const received = Number(checkoutCashReceived) || 0;
    const hasCashInfo = payment === "Efectivo" && checkoutCashReceived !== "";
    stepBody = `<div class="lite-total"><div><span>TOTAL FINAL</span>${shippingExtra > 0 ? `<div class="lite-note">Incluye ${money(shippingExtra)} de envío</div>` : ""}</div><strong>${money(finalTotal)}</strong></div>
    <div class="checkout-summary">
      <div class="checkout-summary-row"><span>Productos</span><b>${qty} ${qty === 1 ? "unidad" : "unidades"} (${money(sum)})</b></div>
      ${discount > 0 ? `<div class="checkout-summary-row"><span>Descuento</span><b>−${money(discount)}</b></div>` : ""}
      <div class="checkout-summary-row"><span>Medio de pago</span><b>${esc(payment)}</b></div>
      ${hasCashInfo ? `<div class="checkout-summary-row"><span>Paga con</span><b>${money(received)}</b></div><div class="checkout-summary-row"><span>Vuelto</span><b>${money(Math.max(0, received - finalTotal))}</b></div>` : ""}
      <div class="checkout-summary-row"><span>Entrega</span><b>${esc(delivery)}</b></div>
      ${delivery === "Envío" ? `<div class="checkout-summary-row"><span>Envío extra</span><b>${money(shippingExtra)}</b></div>` : ""}
      <div class="checkout-summary-row"><span>Cliente</span><b>${esc(checkoutCustomer.trim() || "Consumidor final")}</b></div>
      ${checkoutPhone.trim() ? `<div class="checkout-summary-row"><span>Teléfono / WhatsApp</span><b>${esc(checkoutPhone.trim())}</b></div>` : ""}
      ${delivery === "Envío" ? `<div class="checkout-summary-row"><span>Dirección</span><b>${esc(checkoutAddress.trim())}</b></div>` : ""}
    </div>
    <p class="lite-note" style="margin-top:14px">Al finalizar se registrará el cobro y se actualizará el stock automáticamente.</p>`;
    footerHtml = `<button type="button" class="btn g" data-action="checkout-prev">${iconArrowLeft(17)}<span>Atrás</span></button><button type="button" class="btn" data-action="confirm-sale">${iconCheck(17)}<span>Finalizar venta</span></button>`;
  }

  openModal(
    "Cobrar venta",
    `Etapa ${checkoutStep} de 3 · Revisá y confirmá la operación.`,
    `${stepperHtml}<div class="checkout-step-body">${stepBody}</div>`,
    footerHtml,
  );

  if (checkoutStep === 1) {
    $("#discountInput")?.addEventListener("input", (e) => {
      discount = Math.max(0, Math.min(sum, Number(e.target.value) || 0));
      const newTotal = Math.max(0, sum - discount);
      $("#payTotal").textContent = money(newTotal);
      updateCashChangeUI(newTotal);
      saveCart();
    });
    $("#cashReceivedInput")?.addEventListener("input", (e) => {
      checkoutCashReceived = e.target.value;
      updateCashChangeUI(Math.max(0, sum - discount));
    });
    updateCashChangeUI(baseTotal);
  } else if (checkoutStep === 2) {
    $("#customer")?.addEventListener("input", (e) => {
      checkoutCustomer = e.target.value;
      if (checkoutErrors.customer && checkoutCustomer.trim()) {
        delete checkoutErrors.customer;
        e.target.classList.remove("is-invalid");
        e.target.parentElement?.querySelector(".field-error")?.remove();
      }
    });
    $("#customerPhone")?.addEventListener("input", (e) => {
      checkoutPhone = e.target.value;
      if (checkoutErrors.phone && checkoutPhone.trim()) {
        delete checkoutErrors.phone;
        e.target.classList.remove("is-invalid");
        e.target.parentElement?.querySelector(".field-error")?.remove();
      }
    });
    $("#address")?.addEventListener("input", (e) => {
      checkoutAddress = e.target.value;
      if (checkoutErrors.address && checkoutAddress.trim()) {
        delete checkoutErrors.address;
        e.target.classList.remove("is-invalid");
        e.target.parentElement?.querySelector(".field-error")?.remove();
      }
    });
    $("#shippingCostInput")?.addEventListener("input", (e) => {
      checkoutShippingCost = e.target.value;
    });
  }
}
function confirmSale() {
  if (checkoutStep < 3) {
    if (!validateCheckoutStep(checkoutStep)) return;
    checkoutStep = 3;
    return renderCheckout();
  }
  const missing = Object.entries(cart).find(
    ([id, q]) =>
      (state.products.find((p) => p.id === Number(id))?.stock || 0) < q,
  );
  if (missing)
    return toast("Stock insuficiente para confirmar esta venta.", true);
  if (!validateCheckoutStep(2)) {
    checkoutStep = 2;
    return renderCheckout();
  }
  const customer =
      checkoutCustomer.trim() ||
      (delivery === "Mostrador" ? "Consumidor final" : ""),
    address = checkoutAddress.trim(),
    phone = checkoutPhone.trim();
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
  const { shippingExtra, finalTotal } = getCheckoutTotals();
  const received =
    payment === "Efectivo" && checkoutCashReceived !== ""
      ? Number(checkoutCashReceived) || 0
      : null;
  const saleRecord = {
    id,
    at: new Date().toISOString(),
    total: finalTotal,
    discount,
    shippingCost: shippingExtra,
    payment,
    cashReceived: received,
    change: received !== null ? Math.max(0, received - finalTotal) : null,
    delivery,
    customer,
    address,
    phone,
    items: rows,
  };
  state.sales.unshift(saleRecord);
  if (delivery !== "Mostrador") {
    state.deliveries.unshift({
      id: "P-" + String(101 + state.deliveries.length),
      sale: id,
      customer,
      type: delivery,
      address,
      phone,
      shippingCost: shippingExtra,
      status: "Pendiente",
    });
  }
  cart = {};
  discount = 0;
  checkoutStep = 1;
  prevCheckoutStep = 1;
  checkoutCustomer = "";
  checkoutAddress = "";
  checkoutPhone = "";
  checkoutShippingCost = "";
  checkoutCashReceived = "";
  checkoutShowItems = false;
  checkoutErrors = {};
  clearSavedCart();
  saveState();
  render();
  renderCheckoutSuccess(saleRecord);
  tone("sale");
  toast("Venta registrada con éxito");
}
function renderCheckoutSuccess(sale) {
  const sparkles = [
    ["-58px", "-46px", "-25deg", "0.08s", "#22c55e"],
    ["56px", "-48px", "25deg", "0.11s", "#38bdf8"],
    ["-72px", "6px", "-40deg", "0.14s", "#facc15"],
    ["72px", "4px", "40deg", "0.12s", "#34d399"],
    ["-46px", "54px", "18deg", "0.16s", "#60a5fa"],
    ["48px", "52px", "-18deg", "0.15s", "#22c55e"],
    ["0px", "-70px", "0deg", "0.1s", "#4ade80"],
    ["-26px", "-64px", "-12deg", "0.18s", "#fbbf24"],
    ["28px", "-62px", "14deg", "0.17s", "#38bdf8"],
    ["0px", "68px", "0deg", "0.19s", "#34d399"],
  ]
    .map(
      ([tx, ty, rot, delay, color]) =>
        `<span class="sale-sparkle" style="--tx:${tx};--ty:${ty};--rot:${rot};--delay:${delay};--sp-color:${color}" aria-hidden="true"></span>`,
    )
    .join("");

  const changeHtml =
    sale.change !== null && sale.change > 0
      ? `<div class="sale-success-meta-row"><span>Vuelto entregado</span><strong>${money(sale.change)}</strong></div>`
      : "";

  const bodyHtml = `<div class="sale-success-stage">
    <div class="sale-check-wrap" aria-hidden="true">
      <span class="sale-ring"></span>
      <span class="sale-ring sale-ring-2"></span>
      ${sparkles}
      <svg class="sale-check-svg" viewBox="0 0 64 64" fill="none">
        <circle class="sale-check-bg" cx="32" cy="32" r="28" />
        <circle class="sale-check-circle" cx="32" cy="32" r="28" />
        <path class="sale-check-mark" d="M20 33.5L28.5 41.5L45 24" />
      </svg>
    </div>
    <h3 class="sale-success-heading">¡Compra procesada con éxito!</h3>
    <p class="sale-success-sub">Comprobante <b>${esc(sale.id)}</b> · Stock actualizado</p>
    <div class="sale-success-card">
      <div class="sale-success-total">
        <span>Total cobrado</span>
        <strong>${money(sale.total)}</strong>
      </div>
      <div class="sale-success-meta">
        <div class="sale-success-meta-row"><span>Medio de pago</span><b>${esc(sale.payment)}</b></div>
        <div class="sale-success-meta-row"><span>Entrega</span><b>${esc(sale.delivery)}</b></div>
        <div class="sale-success-meta-row"><span>Cliente</span><b>${esc(sale.customer || "Consumidor final")}</b></div>
        ${changeHtml}
      </div>
    </div>
  </div>`;

  const footerHtml = `<button type="button" class="btn g" data-action="sale:${esc(sale.id)}">Ver comprobante</button><button type="button" class="btn" id="checkoutSuccessDone" data-action="close-modal">${iconCheck(17)}<span>Listo</span></button>`;

  openModal("¡Venta exitosa!", `Operación ${sale.id} registrada.`, bodyHtml, footerHtml);
  $("#modal").classList.add("checkout-success-modal");
  $("#checkoutSuccessDone")?.focus();
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
  const available = PREDEFINED_CATEGORIES.filter(
    (name) => !state.categories.some((cat) => cat.toLowerCase() === name.toLowerCase()),
  );
  openModal(
    "Categorías",
    "Elegí una categoría predefinida para organizar tu Stock Lite.",
    `<div class="lite-inline-row" style="margin-bottom:14px"><label class="grow">Nueva categoría<select id="categoryName" class="lite-input" ${available.length ? "" : "disabled"}><option value="">Seleccioná una categoría</option>${available.map((name) => `<option value="${esc(name)}">${esc(name)}</option>`).join("")}</select></label><button type="button" class="btn" data-action="add-category" ${available.length ? "" : "disabled"}>Agregar categoría</button></div>${available.length ? "" : '<p class="lite-note">Ya agregaste todas las categorías disponibles.</p>'}<div class="lite-rows">${state.categories.map((cat) => `<div class="lite-category-head"><div><b>${esc(cat)}</b><small style="display:block;color:var(--muted)">${state.products.filter((p) => p.cat === cat).length} producto(s)</small></div><div class="lite-category-actions"><button class="btn g sm" data-action="delete-category:${encodeURIComponent(cat)}">Suprimir</button></div></div>`).join("") || '<p class="lite-note">Todavía no hay categorías.</p>'}</div><div class="lite-category-suggestion"><b>¿No encontrás la categoría que necesitás?</b><p class="lite-note">Sugerila y la enviaremos al equipo para evaluarla.</p><div class="lite-inline-row"><label class="grow">Sugerencia<input id="categorySuggestion" class="lite-input" maxlength="50" placeholder="Ej. Plantas y jardinería"></label><button type="button" class="btn g" data-action="suggest-category">Enviar sugerencia</button></div></div>`,
    `<button class="btn g" data-action="close-modal">Cerrar</button>`,
  );
}
function addCategory() {
  const input = $("#categoryName");
  const name = (input?.value || "").trim();
  if (!name) return toast("Seleccioná una categoría.", true);
  if (!PREDEFINED_CATEGORIES.includes(name))
    return toast("Elegí una categoría de la lista disponible.", true);
  if (state.categories.some((c) => c.toLowerCase() === name.toLowerCase()))
    return toast("Esa categoría ya existe.", true);
  state.categories.push(name);
  syncCategories();
  saveState();
  categoryModal();
  toast("Categoría agregada");
}
function suggestCategory() {
  const suggestion = ($("#categorySuggestion")?.value || "").trim();
  if (!suggestion) return toast("Ingresá una categoría para sugerir.", true);
  const sender = state.users?.find((user) => user.role === "Administrador") || state.users?.[0];
  const senderName = sender?.name || "Comercio sin usuario identificado";
  const subject = "Sugerencia de categoría para Comerciando";
  const body = `Comercio: ${state.store || "Sin nombre"}\nUsuario: ${senderName}\nCategoría sugerida: ${suggestion}`;
  window.location.href = `mailto:contacto@andessolutions.com.ar?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  toast("Abrimos tu correo con la sugerencia lista para enviar.");
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
function deliveryDetail(id) {
  const d = state.deliveries.find((x) => x.id === id);
  if (!d) return;
  const hasCoords =
    typeof d.lat === "number" &&
    typeof d.lng === "number" &&
    !Number.isNaN(d.lat) &&
    !Number.isNaN(d.lng);
  const mapQuery = hasCoords
    ? `${d.lat},${d.lng}`
    : d.address
      ? encodeURIComponent(d.address)
      : "";
  const itemsHtml =
    Array.isArray(d.items) && d.items.length
      ? `<div class="lite-rows" style="margin-top:12px">${d.items.map((it) => `<div class="lite-row"><span>${esc(it.name)} · ${it.qty} u.</span><b>${money((it.price || 0) * (it.qty || 1))}</b></div>`).join("")}</div>`
      : "";
  const mapHtml =
    d.type === "Envío" && mapQuery
      ? `<div style="margin-top:12px"><iframe class="ce-minimap-frame" title="Ubicación de entrega" loading="lazy" src="https://maps.google.com/maps?q=${mapQuery}&z=16&output=embed"></iframe><a class="ce-del-map-link" style="margin-top:6px;display:inline-block" href="https://www.google.com/maps?q=${mapQuery}" target="_blank" rel="noopener noreferrer">Abrir en Google Maps ↗</a></div>`
      : "";
  openModal(
    `Pedido ${d.id}`,
    `${d.sale ? `Operación ${d.sale} · ` : ""}${d.status}`,
    `<div class="lite-row"><span>Cliente</span><b>${esc(d.customer || "—")}</b></div>
     ${d.phone ? `<div class="lite-row"><span>Teléfono</span><b>${esc(d.phone)}</b></div>` : ""}
     ${d.email ? `<div class="lite-row"><span>Mail</span><b>${esc(d.email)}</b></div>` : ""}
     <div class="lite-row"><span>Entrega</span><b>${esc(d.type || "Retiro")}</b></div>
     ${d.paymentMethod || d.payment ? `<div class="lite-row"><span>Pago</span><b>${esc(d.paymentMethod || d.payment)}</b></div>` : ""}
     ${d.address ? `<div class="lite-row"><span>Dirección</span><b>${esc(d.address)}</b></div>` : ""}
     ${itemsHtml}
     ${typeof d.total === "number" ? `<div class="lite-total" style="margin-top:12px"><span>Total</span><strong>${money(d.total)}</strong></div>` : ""}
     ${mapHtml}`,
    `<button class="btn" data-action="close-modal">Cerrar</button>`,
  );
  $("#modal").classList.add("lite-detail-drawer");
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
function getPublicCatalogUrl() {
  const host = location.hostname || "";
  if (!host || host === "localhost" || host === "127.0.0.1") {
    return "https://tienda.comerciando-andes.vercel.app";
  }
  if (host.startsWith("tienda.") || host.startsWith("catalogo.")) {
    return location.origin;
  }
  return `${location.protocol}//tienda.${host}`;
}
function preview() {
  const publicUrl = getPublicCatalogUrl();
  openModal(
    "Catálogo virtual Lite",
    "Compartí el link público con tus clientes o abrí la tienda online.",
    `<div class="lite-catalog-link-box">
       <label for="catalogPublicUrl">Link público del catálogo (subdominio)</label>
       <div class="lite-catalog-link-row">
         <input id="catalogPublicUrl" type="text" readonly value="${esc(publicUrl)}" aria-label="Link público del catálogo" />
         <button type="button" class="btn sm" data-action="copy-catalog-url">Copiar link</button>
       </div>
       <small class="lite-note">Si aún no configuraste el subdominio en Vercel, podés acceder directo en <code>/catalogo</code>.</small>
     </div>
     <div class="lite-public-preview"><iframe src="catalogo.html?preview=1" title="Vista previa del catálogo público" loading="eager"></iframe></div>`,
    `<button class="btn g" data-action="close-modal">Cerrar</button>
     <a class="btn" href="catalogo.html" target="_blank" rel="noopener noreferrer">Abrir catálogo</a>`,
  );
}
function saveSettings() {
  state.store = ($("#storeEdit")?.value || "Mi emprendimiento").trim();
  state.theme = $("#themeEdit")?.value || state.theme;
  state.sound = $("#soundEdit")?.value === "true";
  soundStyle = $("#soundStyleEdit")?.value || soundStyle;
  const addrEl = $("#cfgStoreAddress");
  if (addrEl) {
    const latVal = parseFloat($("#cfgStoreLat")?.value);
    const lngVal = parseFloat($("#cfgStoreLng")?.value);
    state.storeConfig = {
      address: addrEl.value.trim(),
      lat: Number.isFinite(latVal) ? latVal : null,
      lng: Number.isFinite(lngVal) ? lngVal : null,
      hours: ($("#cfgStoreHours")?.value || "").trim(),
      alias: ($("#cfgStoreAlias")?.value || "").trim(),
      cbu: ($("#cfgStoreCbu")?.value || "").trim(),
      whatsapp: ($("#cfgStoreWhatsapp")?.value || "").trim(),
    };
  }
  saveThemePreference();
  saveSoundPreference();
  saveState();
  document.documentElement.dataset.theme = state.theme;
  render();
  toast("Preferencias y datos del local actualizados");
}

let cfgMapInstance = null;
function initCfgStoreMap() {
  const mapEl = $("#cfgStoreMap");
  if (!mapEl) return;
  if (typeof L === "undefined") {
    mapEl.innerHTML =
      '<div class="ce-map-fallback">No se pudo cargar el mapa interactivo. Verificá tu conexión a internet.</div>';
    return;
  }
  if (cfgMapInstance) {
    try {
      cfgMapInstance.remove();
    } catch {}
    cfgMapInstance = null;
  }
  const cfg = state.storeConfig || {};
  const hasCoords =
    typeof cfg.lat === "number" &&
    typeof cfg.lng === "number" &&
    !Number.isNaN(cfg.lat) &&
    !Number.isNaN(cfg.lng);
  const defaultLat = hasCoords ? cfg.lat : -34.603722;
  const defaultLng = hasCoords ? cfg.lng : -58.381592;
  const zoom = hasCoords ? 16 : 12;

  cfgMapInstance = L.map(mapEl).setView([defaultLat, defaultLng], zoom);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
    maxZoom: 19,
  }).addTo(cfgMapInstance);

  const marker = L.marker([defaultLat, defaultLng], { draggable: true }).addTo(
    cfgMapInstance,
  );

  const updateCoords = (lat, lng) => {
    const latInput = $("#cfgStoreLat");
    const lngInput = $("#cfgStoreLng");
    const textEl = $("#cfgStoreCoordsText");
    if (latInput) latInput.value = String(lat);
    if (lngInput) lngInput.value = String(lng);
    if (textEl) {
      textEl.textContent = `Ubicación marcada: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    }
  };

  marker.on("dragend", () => {
    const pos = marker.getLatLng();
    updateCoords(pos.lat, pos.lng);
  });

  cfgMapInstance.on("click", (ev) => {
    marker.setLatLng(ev.latlng);
    updateCoords(ev.latlng.lat, ev.latlng.lng);
  });

  const geocodeCfgAddress = async () => {
    const query = ($("#cfgStoreAddress")?.value || "").trim();
    if (!query) return toast("Ingresá una dirección para buscar en el mapa.", true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`,
      );
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        marker.setLatLng([lat, lng]);
        cfgMapInstance.setView([lat, lng], 16);
        updateCoords(lat, lng);
        toast("Ubicación encontrada. Podés arrastrar el marcador para ajustar.");
      } else {
        toast("No encontramos esa dirección exacta. Arrastrá el marcador manualmente.", true);
      }
    } catch {
      toast("No se pudo buscar la dirección. Arrastrá el marcador manualmente.", true);
    }
  };

  $("#cfgFindAddressBtn")?.addEventListener("click", geocodeCfgAddress);
  let debounceTimer = null;
  $("#cfgStoreAddress")?.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const val = ($("#cfgStoreAddress")?.value || "").trim();
      if (val.length >= 8) geocodeCfgAddress();
    }, 900);
  });
  setTimeout(() => cfgMapInstance?.invalidateSize(), 150);
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
  const target = e.target.closest("button, [data-add], [data-action], [data-stock-view], [data-pos-view]");
  if (!target || target.disabled) return;
  if (target === $("#bg")) {
    toggleNav();
    return;
  }
  if (target === $("#modalX")) {
    closeModal();
    return;
  }
  if (target === $("#cashHeader") || target.closest("#cashHeader")) {
    promptToggleCash();
    return;
  }
  if (target === $("#planBadgeBtn") || target.closest("#planBadgeBtn")) {
    tone("notice");
    toast("Plan Emprendedor activo: Tenés acceso por 7 días gratis.");
    return;
  }
  if (target === $("#navSearchBtn") || target.closest("#navSearchBtn")) {
    e.preventDefault();
    const inp = $("#navSearchInput");
    const val = inp?.value || "";
    if (inp && document.activeElement !== inp && !val.trim()) {
      inp.focus();
      return;
    }
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
  if (target.dataset.posView) {
    posViewMode = target.dataset.posView;
    saveState();
    render();
    return;
  }
  if (target.dataset.add) {
    if (!state.cash) {
      tone("warning");
      openModal(
        "Caja cerrada",
        "Apertura de caja requerida",
        `<div style="display:flex;flex-direction:column;gap:14px;padding:6px 0">
          <div style="display:flex;align-items:center;gap:12px;background:rgba(239, 68, 68, 0.1);border:1px solid rgba(239, 68, 68, 0.25);border-radius:12px;padding:12px 14px">
            <span style="font-size:24px">🔒</span>
            <div style="font-size:14px;color:var(--ink);line-height:1.4">
              <b>La caja se encuentra cerrada.</b><br>
              Para agregar productos e iniciar una venta debés abrir la caja primero.
            </div>
          </div>
          <p class="lite-note" style="margin:0">Al abrir la caja podrás registrar ventas, cobrar con diferentes medios de pago y actualizar el stock en tiempo real.</p>
        </div>`,
        `<button class="btn" data-action="confirm-open-cash">Abrir caja ahora</button><button class="btn g sm" data-action="close-modal">Cancelar</button>`
      );
      return;
    }
    const p = state.products.find((p) => p.id === Number(target.dataset.add));
    if (!p || p.stock <= 0) {
      tone("warning");
      return toast("Sin stock disponible de este producto.", true);
    }
    if ((cart[p.id] || 0) >= p.stock)
      return toast("Sin más existencias.", true);
    cart[p.id] = (cart[p.id] || 0) + 1;
    saveCart();
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
    if (!Object.keys(cart).length) discount = 0;
    saveCart();
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
    syncCheckoutInputs();
    payment = target.dataset.payment;
    renderCheckout();
    return;
  }
  if (target.dataset.delivery) {
    syncCheckoutInputs();
    delivery = target.dataset.delivery;
    checkoutErrors = {};
    renderCheckout();
    return;
  }
  if (target.dataset.checkoutStep) {
    const nextStep = Number(target.dataset.checkoutStep);
    if (nextStep === checkoutStep) return;
    if (nextStep < checkoutStep) {
      syncCheckoutInputs();
      checkoutStep = nextStep;
      renderCheckout();
      return;
    }
    for (let s = checkoutStep; s < nextStep; s++) {
      if (!validateCheckoutStep(s)) return;
    }
    checkoutStep = nextStep;
    renderCheckout();
    return;
  }
  const code = target.dataset.action;
  if (!code) return;
  if (code === "toggle-checkout-items") {
    syncCheckoutInputs();
    checkoutShowItems = !checkoutShowItems;
    renderCheckout();
    return;
  }
  if (code === "cash-exact") {
    const total = Math.max(0, cartTotal() - discount);
    checkoutCashReceived = String(total);
    const inp = $("#cashReceivedInput");
    if (inp) inp.value = checkoutCashReceived;
    updateCashChangeUI(total);
    return;
  }
  if (code === "checkout-next") {
    if (!validateCheckoutStep(checkoutStep)) return;
    checkoutStep = Math.min(3, checkoutStep + 1);
    renderCheckout();
    return;
  }
  if (code === "checkout-prev") {
    syncCheckoutInputs();
    checkoutErrors = {};
    checkoutStep = Math.max(1, checkoutStep - 1);
    renderCheckout();
    return;
  }
  if (code === "jump-cart") {
    cartCollapsed = false;
    render();
    document
      .querySelector("#v .cart")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  if (code === "toggle-cart") {
    cartCollapsed = !cartCollapsed;
    const cartEl = document.querySelector("#v .cart");
    if (cartEl) {
      cartEl.classList.toggle("collapsed", cartCollapsed);
      cartEl.classList.toggle("expanded", !cartCollapsed);
      const headerEl = cartEl.querySelector(".ch");
      const toggleBtn = cartEl.querySelector(".cart-toggle-btn");
      if (headerEl) headerEl.setAttribute("aria-expanded", String(!cartCollapsed));
      if (toggleBtn) {
        toggleBtn.setAttribute(
          "aria-label",
          cartCollapsed ? "Desplegar venta actual" : "Minimizar venta actual",
        );
        toggleBtn.innerHTML = cartCollapsed ? chevronUp() : chevronDown();
      }
      return;
    }
    render();
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
  if (code === "suggest-category") return suggestCategory();
  if (code.startsWith("edit-category:"))
    return editCategory(code.split(":")[1]);
  if (code.startsWith("delete-category:"))
    return deleteCategory(code.split(":")[1]);
  if (code.startsWith("edit:")) return productModal(Number(code.split(":")[1]));
  if (code === "move") return moveModal();
  if (code === "new-delivery") return deliveryModal();
  if (code === "go-pos") return go("pos");
  if (code === "start-tour") return startTour(true);
  if (code === "checkout") return checkout();
  if (code === "prompt-clear-cart") {
    const qty = Object.values(cart).reduce((a, b) => a + b, 0);
    if (qty === 0) return;
    tone("warning");
    openModal(
      "Vaciar carrito",
      "Confirmación requerida",
      `<div style="display:flex;flex-direction:column;gap:12px;padding:6px 0">
        <p style="font-size:15px;color:var(--ink);margin:0;line-height:1.4">
          ¿Seguro que querés vaciar los <b>${qty} ${qty === 1 ? "producto" : "productos"}</b> agregados a la venta actual?
        </p>
        <p class="lite-note" style="margin:0">Esta acción removerá todos los artículos de la venta en curso.</p>
      </div>`,
      `<button class="btn g" data-action="close-modal">Cancelar</button><button class="btn danger" data-action="confirm-clear-cart">Sí, vaciar carrito</button>`
    );
    return;
  }
  if (code === "confirm-clear-cart") {
    cart = {};
    discount = 0;
    clearSavedCart();
    closeModal();
    render();
    tone("remove");
    return toast("Carrito vaciado correctamente");
  }
  if (code === "clear-cart") {
    cart = {};
    discount = 0;
    clearSavedCart();
    render();
    return toast("Carrito vaciado");
  }
  if (code === "toggle-cash") return promptToggleCash();
  if (code === "confirm-open-cash") {
    state.cash = true;
    state.sales = [];
    state.deliveries = [];
    state.movements = [];
    cart = {};
    discount = 0;
    clearSavedCart();
    saveState();
    closeModal();
    render();
    tone("success");
    return toast("Caja abierta. Contadores del día reiniciados.");
  }
  if (code === "confirm-close-cash") {
    state.cash = false;
    cart = {};
    discount = 0;
    clearSavedCart();
    saveState();
    closeModal();
    render();
    tone("notice");
    return toast("Caja cerrada.");
  }
  if (code.startsWith("sale:")) return saleDetail(code.slice(5));
  if (code.startsWith("delivery-detail:")) return deliveryDetail(code.slice(16));
  if (code.startsWith("advance:")) {
    const d = state.deliveries.find((d) => d.id === code.slice(8));
    if (d) {
      d.status = d.status === "Pendiente" ? "En preparación" : "Entregado";
      saveState();
      render();
      tone("notice");
      return toast("Estado de pedido actualizado");
    }
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
  if (code === "copy-catalog-url") {
    const url = $("#catalogPublicUrl")?.value || getPublicCatalogUrl();
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(
        () => toast("Link público copiado"),
        () => toast("No se pudo copiar automáticamente"),
      );
    } else {
      const inp = $("#catalogPublicUrl");
      if (inp) {
        inp.select();
        document.execCommand("copy");
      }
      toast("Link público copiado");
    }
    return;
  }
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
  if (code.startsWith("edit-user:")) return openEditUserModal(code.slice(10));
  if (code === "save-user-edit") return saveUserEdit();
  if (code.startsWith("send-reset-email:")) {
    const uid = code.slice(17);
    const u = state.users.find(
      (x, idx) => (x.id ? x.id === uid : String(idx) === String(uid)),
    );
    const targetEmail = u?.email || "el correo registrado";
    tone("notice");
    return toast(`Correo de recuperación enviado a ${targetEmail}`);
  }
  if (code === "new-user") return openNewUserModal();
  if (code === "confirm-invite-user") return confirmInviteUser(false);
  if (code === "confirm-extra-user-checkout") {
    closeModal();
    tone("success");
    toast("¡Cobro de usuario adicional procesado con éxito!");
    setTimeout(() => {
      openModal(
        "Invitar usuario adicional",
        "Usuario adicional habilitado",
        `<form id="newUserForm" onsubmit="event.preventDefault();" class="lite-form" style="gap:12px">
          <label>Nombre
            <input type="text" id="newUserFirst" class="lite-input" placeholder="Ej. Camila" required>
          </label>
          <label>Apellido
            <input type="text" id="newUserLast" class="lite-input" placeholder="Ej. Romero">
          </label>
          <label class="full">Correo electrónico
            <input type="email" id="newUserEmail" class="lite-input" placeholder="colaborador@comercio.com" required>
          </label>
          <label class="full">Rol
            <select id="newUserRole" class="lite-input">
              <option value="Colaborador" selected>Colaborador (Ventas y Stock)</option>
              <option value="Administrador">Administrador (Control total)</option>
            </select>
          </label>
        </form>`,
        `<button class="btn" data-action="confirm-invite-user-extra">Agregar usuario</button><button class="btn g sm" data-action="close-modal">Cancelar</button>`,
      );
    }, 350);
    return;
  }
  if (code === "confirm-invite-user-extra") return confirmInviteUser(true);
  if (code === "logout") {
    fetch("/api/auth/logout?audience=seller", { method: "POST", credentials: "same-origin" }).catch(() => {});
    closeModal();
    toast("Cerrando sesión…");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 450);
    return;
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
$("#modal")?.addEventListener("click", (e) => {
  if (e.target.id === "modal") closeModal();
});
$("#overlay")?.addEventListener("click", closeNav);
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
    if (!Object.keys(cart).length) discount = 0;
    saveCart();
    uiMotion = { type: "pos-qty", id };
    render();
    tone("add");
    return;
  }
  if (tourActive) {
    if (e.key === "Escape") {
      e.preventDefault();
      endTour(true);
      return;
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextTourStep();
      return;
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevTourStep();
      return;
    }
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
$("#topUserBadge")?.addEventListener("click", () => {
  const activeUser = state.users[0] || { name: "Usuario", role: "Administrador", email: "" };
  const nameStr = activeUser.name || `${activeUser.firstName || ""} ${activeUser.lastName || ""}`.trim() || "Usuario";
  const initials = ((activeUser.firstName?.[0] || nameStr[0] || "U") + (activeUser.lastName?.[0] || "")).toUpperCase();
  openModal(
    "Mi Cuenta",
    "Sesión activa del comercio",
    `<div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:12px;padding:10px 0">
      <div class="user-photo-preview" style="width:72px;height:72px;font-size:24px;margin:0 auto">
        ${activeUser.photo ? `<img src="${activeUser.photo}" style="width:100%;height:100%;object-fit:cover">` : `<span style="color:#fff;font-weight:700">${initials}</span>`}
      </div>
      <div>
        <h3 style="margin:0;font-size:18px;color:var(--ink)">${esc(nameStr)}</h3>
        <p style="margin:4px 0 0 0;font-size:13px;color:var(--muted)">${esc(activeUser.email || "Sin correo")}</p>
        <span class="pill premium-pill" style="margin-top:8px;display:inline-block">${esc(activeUser.role || "Administrador")}</span>
      </div>
      <div style="background:var(--s2,#f1f5f9);border:1px solid var(--line,#e2e8f0);border-radius:12px;padding:12px;width:100%;font-size:13px;text-align:left;color:var(--ink)">
        <b>Plan actual:</b> Plan Emprendedor (7 días de prueba)<br>
        <b>Colaboradores:</b> ${state.users.length} de 3 activos
      </div>
    </div>`,
    `<button class="btn g sm" data-action="close-modal">Cerrar</button>`
  );
});
const initialHash = location.hash.replace("#", "");
if (initialHash in NAME) {
  go(initialHash);
} else {
  render();
}
hydrateSellerSession();

/* ==========================================================================
   TUTORIAL GUIADO INTERACTIVO (PRIMERA VISITA)
   ========================================================================== */
const TOUR_STORAGE_KEY = "comerciando_emprendedores_tour_done_v1";
let tourActive = false;
let tourIndex = 0;
let tourRepositionTimer = null;

const TOUR_STEPS = [
  {
    view: "home",
    target: null,
    badge: "Bienvenida",
    title: "¡Bienvenido a Comerciando Emprendedores!",
    body: "En menos de un minuto te mostramos qué hace cada sección de la web y cómo empezar a vender paso a paso.",
    tip: "Podés avanzar con las flechas del teclado o volver a abrir esta guía cuando quieras desde el botón «Guía» arriba a la derecha.",
  },
  {
    view: "home",
    target: "#cashHeader",
    badge: "Paso clave · Caja",
    title: "1. Abrí la caja antes de vender",
    body: "Este botón superior te muestra si la caja está abierta o cerrada. Para poder cobrar en el Punto de Venta, primero tenés que abrirla.",
    tip: "Al hacer clic acá (o en «Abrir caja» en el panel de Inicio), se inicia la jornada y quedan habilitados los cobros.",
  },
  {
    view: "home",
    target: ".premium-kpis",
    badge: "Inicio",
    title: "2. Tu resumen diario en un vistazo",
    body: "En Inicio ves las ventas del día, operaciones realizadas, productos con stock crítico y pedidos pendientes de entrega.",
    tip: "Cada tarjeta es un acceso directo: tocalas para ir directo a Ventas, Stock o Entregas.",
  },
  {
    view: "home",
    target: ".premium-quick-actions",
    badge: "Accesos rápidos",
    title: "3. Atajos a las tareas principales",
    body: "Desde acá podés saltar en un clic a Registrar venta, Administrar productos, Ver entregas o Consultar reportes.",
    tip: "También podés usar el menú lateral izquierdo para moverte entre todas las pantallas.",
  },
  {
    view: "pos",
    target: "#posSearch",
    badge: "Punto de venta",
    title: "4. Buscá y filtrá tus productos",
    body: "Ya estamos en el Punto de venta Lite. Escribí el nombre o código de barras del producto, o usá las categorías y la vista en Tarjetas o Lista.",
    tip: "Atajo rápido: presioná la tecla «N» desde cualquier pantalla para venir directo a vender.",
  },
  {
    view: "pos",
    target: "#grid .pro-card, #grid .pro-list-row",
    badge: "Punto de venta",
    title: "5. Sumá productos al carrito",
    body: "Tocá cualquier producto del catálogo para agregar una unidad a «Venta actual».",
    tip: "Cada clic suma 1 unidad y descuenta visualmente según el stock disponible.",
  },
  {
    view: "pos",
    target: "#v .cart",
    badge: "Cobro rápido",
    title: "6. Revisá el carrito y cobrá la venta",
    body: "Acá ajustás cantidades con + / -, vaciás el carrito si hace falta y tocás «Cobrar venta» para elegir medio de pago (Efectivo, Transferencia, etc.) y entrega.",
    tip: "Recordá: el botón «Cobrar venta» se habilita cuando la caja está abierta y hay al menos 1 producto en el carrito.",
  },
  {
    view: "sales",
    target: ".lite-filterbar",
    badge: "Ventas y cobros",
    title: "7. Historial de ventas y comprobantes",
    body: "Cada cobro que confirmás queda guardado acá. Podés filtrar por medio de pago, ver el ticket promedio y abrir el detalle de cada operación.",
    tip: "Usá «+ Nueva venta» arriba a la derecha para volver al mostrador al instante.",
  },
  {
    view: "ship",
    target: ".v8-board",
    badge: "Entregas y despacho",
    title: "8. Seguimiento de pedidos y envíos",
    body: "Organizá tus entregas en tres columnas: Pendiente, En preparación y Entregado. Avanzá cada pedido con un solo clic.",
    tip: "Ideal si hacés envíos a domicilio o preparás pedidos para retirar en el local.",
  },
  {
    view: "stock",
    target: '[data-action="new-product"]',
    badge: "Stock Lite",
    title: "9. Cargá productos y controlá tu stock",
    body: "Desde Stock Lite creás nuevos productos con foto, precio de compra/venta, ganancia automática, categorías y alertas de reposición.",
    tip: "También podés registrar ingresos o egresos manuales de mercadería con «Registrar movimiento».",
  },
  {
    view: "virtual",
    target: '[data-action="preview"]',
    badge: "Catálogo virtual",
    title: "10. Publicá tu catálogo online",
    body: "Elegí qué productos mostrar u ocultar para tus clientes y tocá «Vista previa» para ver cómo luce tu vidriera digital.",
    tip: "Cada producto tiene su botón «Publicar / Ocultar» para actualizar tu catálogo al instante.",
  },
  {
    view: "mod",
    target: ".v8-screen",
    badge: "Reportes Lite",
    title: "11. Analizá el rendimiento del negocio",
    body: "En Reportes de negocio Lite consultás tus ingresos, productos más vendidos y evolución por rango de fechas.",
    tip: "Los datos se calculan automáticamente a partir de tus ventas registradas.",
  },
  {
    view: "cfg",
    target: ".v8-screen",
    badge: "Configuración",
    title: "12. Personalizá tu comercio y equipo",
    body: "Cambiá el nombre de tu negocio, elegí tema claro u oscuro, ajustá los sonidos de aviso y administrá hasta 3 usuarios.",
    tip: "Si estás probando el sistema, desde acá también podés restablecer los datos demo cuando quieras.",
  },
  {
    view: "home",
    target: "#navSearchInput",
    badge: "Buscador global",
    title: "13. Encontrá todo al instante",
    body: "Desde la barra superior buscás productos, ventas, clientes o entregas sin importar en qué sección estés.",
    tip: "Atajo profesional: presioná «Ctrl + K» (o «/») en cualquier momento para buscar.",
  },
  {
    view: "home",
    target: null,
    badge: "¡Listo para vender!",
    title: "Ya conocés todo Comerciando Emprendedores",
    body: "Resumen para tu primera venta: 1) Abrí la caja arriba a la derecha, 2) Entrá a Punto de venta y tocá tus productos, 3) Presioná «Cobrar venta».",
    tip: "Si necesitás repasar algún paso, tocá el botón «Guía» en la barra superior en cualquier momento.",
  },
];

function ensureTourDom() {
  let root = $("#tourRoot");
  if (root) return root;
  root = document.createElement("div");
  root.id = "tourRoot";
  root.className = "tour-root";
  root.hidden = true;
  root.innerHTML = `
    <div class="tour-backdrop" id="tourBackdrop"></div>
    <div class="tour-spotlight" id="tourSpotlight" hidden></div>
    <section class="tour-card" id="tourCard" role="dialog" aria-modal="true" aria-labelledby="tourTitle">
      <div class="tour-card-head">
        <span class="tour-step-badge" id="tourBadge"></span>
        <button type="button" class="tour-close-btn" id="tourCloseBtn" aria-label="Cerrar tutorial" title="Cerrar tutorial">✕</button>
      </div>
      <h3 class="tour-title" id="tourTitle"></h3>
      <p class="tour-body" id="tourBody"></p>
      <div class="tour-tip" id="tourTip" hidden></div>
      <div class="tour-progress"><div class="tour-progress-bar" id="tourProgressBar"></div></div>
      <div class="tour-actions">
        <button type="button" class="tour-skip-btn" id="tourSkipBtn">Omitir</button>
        <div class="tour-actions-right">
          <button type="button" class="btn g sm" id="tourPrevBtn">Anterior</button>
          <button type="button" class="btn sm" id="tourNextBtn">Siguiente</button>
        </div>
      </div>
    </section>
  `;
  document.body.appendChild(root);

  $("#tourCloseBtn").addEventListener("click", () => endTour(true));
  $("#tourSkipBtn").addEventListener("click", () => endTour(true));
  $("#tourPrevBtn").addEventListener("click", prevTourStep);
  $("#tourNextBtn").addEventListener("click", nextTourStep);
  $("#tourBackdrop").addEventListener("click", (e) => {
    if (e.target.id === "tourBackdrop") endTour(true);
  });
  window.addEventListener("resize", scheduleTourReposition);
  $("#m")?.addEventListener("scroll", scheduleTourReposition, { passive: true });
  return root;
}

function scheduleTourReposition() {
  if (!tourActive) return;
  if (tourRepositionTimer) clearTimeout(tourRepositionTimer);
  tourRepositionTimer = setTimeout(() => {
    if (tourActive) positionTourStep();
  }, 60);
}

function startTour(manual = false) {
  if (manual) closeModal();
  closeNav();
  ensureTourDom();
  tourActive = true;
  tourIndex = 0;
  $("#tourRoot").hidden = false;
  renderTourStep();
}

function endTour(markSeen = true) {
  tourActive = false;
  if (tourRepositionTimer) {
    clearTimeout(tourRepositionTimer);
    tourRepositionTimer = null;
  }
  const root = $("#tourRoot");
  if (root) root.hidden = true;
  if (markSeen) {
    try {
      localStorage.setItem(TOUR_STORAGE_KEY, "1");
    } catch {}
  }
}

function nextTourStep() {
  if (tourIndex >= TOUR_STEPS.length - 1) {
    endTour(true);
    toast("¡Tutorial completado! Ya podés empezar a vender.");
    return;
  }
  tourIndex += 1;
  renderTourStep();
}

function prevTourStep() {
  if (tourIndex <= 0) return;
  tourIndex -= 1;
  renderTourStep();
}

function renderTourStep() {
  const step = TOUR_STEPS[tourIndex];
  if (!step) return endTour(true);

  if (step.view && view !== step.view) {
    go(step.view);
  }

  const total = TOUR_STEPS.length;
  const isFirst = tourIndex === 0;
  const isLast = tourIndex === total - 1;

  $("#tourBadge").textContent = `${step.badge} · ${tourIndex + 1}/${total}`;
  $("#tourTitle").textContent = step.title;
  $("#tourBody").textContent = step.body;

  const tipEl = $("#tourTip");
  if (step.tip) {
    tipEl.hidden = false;
    tipEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lightbulb" aria-hidden="true"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg><span>${esc(step.tip)}</span>`;
  } else {
    tipEl.hidden = true;
    tipEl.innerHTML = "";
  }

  $("#tourProgressBar").style.width = `${Math.round(((tourIndex + 1) / total) * 100)}%`;
  $("#tourPrevBtn").hidden = isFirst;
  $("#tourSkipBtn").hidden = isLast;
  $("#tourNextBtn").textContent = isFirst
    ? "Comenzar"
    : isLast
      ? "¡Empezar a vender!"
      : "Siguiente";

  requestAnimationFrame(() => {
    const target = step.target ? document.querySelector(step.target) : null;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      setTimeout(() => {
        if (tourActive) positionTourStep();
      }, 220);
    }
    positionTourStep();
  });
}

function positionTourStep() {
  const step = TOUR_STEPS[tourIndex];
  if (!step) return;

  const backdrop = $("#tourBackdrop");
  const spotlight = $("#tourSpotlight");
  const card = $("#tourCard");
  const target = step.target ? document.querySelector(step.target) : null;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const margin = 12;

  if (!target) {
    spotlight.hidden = true;
    backdrop.hidden = false;
    card.style.left = "50%";
    card.style.top = "50%";
    card.style.transform = "translate(-50%, -50%)";
    return;
  }

  const rect = target.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) {
    spotlight.hidden = true;
    backdrop.hidden = false;
    card.style.left = "50%";
    card.style.top = "50%";
    card.style.transform = "translate(-50%, -50%)";
    return;
  }

  const pad = 6;
  const sTop = Math.max(4, rect.top - pad);
  const sLeft = Math.max(4, rect.left - pad);
  const sWidth = Math.min(vw - sLeft - 4, rect.width + pad * 2);
  const sHeight = Math.min(vh - sTop - 4, rect.height + pad * 2);

  backdrop.hidden = true;
  spotlight.hidden = false;
  spotlight.style.top = `${sTop}px`;
  spotlight.style.left = `${sLeft}px`;
  spotlight.style.width = `${sWidth}px`;
  spotlight.style.height = `${sHeight}px`;

  card.style.transform = "none";
  const cardRect = card.getBoundingClientRect();
  const cw = cardRect.width || Math.min(390, vw - margin * 2);
  const ch = cardRect.height || 240;
  const gap = 14;

  let top = sTop + sHeight + gap;
  let left = sLeft + sWidth / 2 - cw / 2;

  if (top + ch + margin > vh) {
    const aboveTop = sTop - ch - gap;
    if (aboveTop >= margin) {
      top = aboveTop;
    } else {
      top = Math.max(margin, vh - ch - margin);
    }
  }

  left = Math.max(margin, Math.min(vw - cw - margin, left));
  top = Math.max(margin, Math.min(vh - ch - margin, top));

  card.style.left = `${Math.round(left)}px`;
  card.style.top = `${Math.round(top)}px`;
}

try {
  if (localStorage.getItem(TOUR_STORAGE_KEY) !== "1") {
    setTimeout(() => {
      const modalOpen = $("#modal")?.classList.contains("open");
      if (!modalOpen && !tourActive) {
        startTour(false);
      }
    }, 500);
  }
} catch {}
