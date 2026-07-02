/************************************************************
 * EIZLIYA STREAM HUB - TOYYIBPAY CHECKOUT V7 WEB1 STOCK + TOYYIBPAY PRICE
 * Uses Customer Website 1 endpoint for stock, ToyyibPay endpoint for prices/payment.
 * Customer pays first, then success page opens Telegram admin with paid order message.
 ************************************************************/

let CONFIG = window.NUMO_DIRECT_CONFIG || {};
let TXT = window.NUMO_BUTTON_TEXT || {};
let started = false;
let selectedCategory = "Semua";
let control = { stock: [], promos: [], hotSelling: [], meta: {}, loaded: false };
let hotItems = [];
let hotIndex = 0;
let hotTimer = null;
let currentOrderMessage = "";
let currentTelegramUrl = "";
let currentPaymentOrder = null;
let paymentModalHistoryActive = false;

const PRODUCTS = [
  {
    name: "NETFLIX PREMIUM",
    display: "Netflix Premium",
    image: "netflix.jpg",
    category: "Streaming",
    desc: "Private profile dan warranty penuh sepanjang langganan.",
    plans: [
      { duration: "1 Bulan", price: "RM25" },
      { duration: "2 Bulan", price: "RM50" },
      { duration: "3 Bulan Promo", label: "3 Bulan", price: "RM75" },
      { duration: "6 Bulan", price: "RM150" },
      { duration: "12 Bulan", price: "RM300" }
    ]
  },
  {
    name: "YOUTUBE PREMIUM",
    display: "YouTube Premium",
    image: "youtube.jpg",
    category: "Streaming",
    desc: "Email sendiri atau email seller.",
    sections: [
      {
        title: "Email Sendiri",
        plans: [
          { duration: "1 Bulan", price: "RM16" },
          { duration: "3 Bulan", price: "RM45" },
          { duration: "6 Bulan", price: "RM85" },
          { duration: "12 Bulan", price: "RM144" }
        ]
      },
      {
        title: "Email Seller",
        plans: [
          { duration: "1 Bulan", price: "RM10" },
          { duration: "3 Bulan", price: "RM27" },
          { duration: "6 Bulan", price: "RM48" },
          { duration: "12 Bulan", price: "RM84" }
        ]
      }
    ]
  },
  {
    name: "DISNEY+ HOTSTAR",
    display: "Disney+ Hotstar",
    image: "disney.jpg",
    category: "Streaming",
    desc: "Premium entertainment dengan warranty.",
    plans: [
      { duration: "1 Bulan", price: "RM25" },
      { duration: "2 Bulan", price: "RM45" },
      { duration: "Promo 3 Bulan", label: "3 Bulan", price: "RM60" },
      { duration: "6 Bulan", price: "RM120" },
      { duration: "12 Bulan", price: "RM230" }
    ]
  },
  {
    name: "SOOKA PREMIUM",
    display: "Sooka Premium",
    image: "sooka.jpg",
    category: "Streaming",
    desc: "Pilih device TV, Phone atau Tablet.",
    sections: [
      {
        title: "TV",
        plans: [
          { duration: "1 Bulan", price: "RM25" },
          { duration: "2 Bulan", price: "RM46" },
          { duration: "6 Bulan", price: "RM120" },
          { duration: "12 Bulan", price: "RM216" }
        ]
      },
      {
        title: "Phone",
        plans: [
          { duration: "1 Bulan", price: "RM25" },
          { duration: "2 Bulan", price: "RM46" },
          { duration: "6 Bulan", price: "RM120" },
          { duration: "12 Bulan", price: "RM216" }
        ]
      },
      {
        title: "Tablet",
        plans: [
          { duration: "1 Bulan", price: "RM25" },
          { duration: "2 Bulan", price: "RM46" },
          { duration: "6 Bulan", price: "RM120" },
          { duration: "12 Bulan", price: "RM216" }
        ]
      }
    ]
  },
  {
    name: "VIU PREMIUM",
    display: "Viu Premium",
    image: "viu.jpg",
    category: "Streaming",
    desc: "Drama dan entertainment premium.",
    plans: [
      { duration: "1 Bulan", price: "RM15" },
      { duration: "2 Bulan", price: "RM26" },
      { duration: "6 Bulan", price: "RM66" },
      { duration: "12 Bulan", price: "RM120" }
    ]
  },
  {
    name: "iQIYI PREMIUM",
    display: "iQiyi Premium",
    image: "iqiyi.jpg",
    category: "Streaming",
    desc: "Movie dan drama premium.",
    plans: [
      { duration: "1 Bulan", price: "RM15" },
      { duration: "2 Bulan", price: "RM26" },
      { duration: "Promo 3 Bulan", label: "3 Bulan", price: "RM33" },
      { duration: "6 Bulan", price: "RM66" },
      { duration: "12 Bulan", price: "RM120" }
    ]
  },
  {
    name: "SPOTIFY PREMIUM",
    display: "Spotify Premium",
    image: "spotify.jpg",
    category: "Music",
    desc: "Music tanpa iklan dan offline mode.",
    plans: [
      { duration: "1 Bulan", price: "RM15" },
      { duration: "2 Bulan", price: "RM28" },
      { duration: "Promo 2 Bulan", label: "2 Bulan Promo", price: "RM25" },
      { duration: "6 Bulan", price: "RM72" },
      { duration: "12 Bulan", price: "RM120" }
    ]
  }
];

const $ = id => document.getElementById(id);

window.addEventListener("load", () => {
  const frame = $("configFrame");
  if (frame) {
    frame.addEventListener("load", initPage);
    setTimeout(initPage, 700);
  } else {
    initPage();
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopHotAutoplay();
  else startHotAutoplay();
});

function initPage() {
  if (started) return;
  started = true;

  loadFrameConfig();
  applyConfigText();
  bindBaseEvents();
  renderCategories();
  renderBundles();
  renderTrust();
  renderFaq();
  renderProducts();
  loadControl();
}

function loadFrameConfig() {
  const frame = $("configFrame");
  try {
    const fwin = frame && frame.contentWindow;
    if (fwin && fwin.NUMO_DIRECT_CONFIG) CONFIG = { ...CONFIG, ...fwin.NUMO_DIRECT_CONFIG };
    if (fwin && fwin.NUMO_BUTTON_TEXT) TXT = { ...TXT, ...fwin.NUMO_BUTTON_TEXT };
  } catch (e) {
    // fallback to app2.js globals
  }

  selectedCategory = TXT.categoryAll || "Semua";
}

function applyConfigText() {
  const text = CONFIG.TEXT || {};
  const logo = CONFIG.LOGO_IMAGE || "numologo.png";

  setText("navBrand", text.navBrand);
  setText("navTagline", text.navTagline);
  setText("heroBadge", text.heroBadge);
  setHeroTitle(text.heroTitle || "Akaun Premium Strim Direct Numo");
  setText("heroText", text.heroText);
  setText("heroPrimary", text.heroPrimary);
  setText("heroSecondary", text.heroSecondary);
  setText("hotEyebrow", text.hotEyebrow);
  setText("hotTitle", text.hotTitle);
  setText("hotDesc", text.hotDesc);
  setText("productEyebrow", text.productEyebrow);
  setText("productTitle", text.productTitle);
  setText("productDesc", text.productDesc);
  setText("bundleEyebrow", text.bundleEyebrow);
  setText("bundleTitle", text.bundleTitle);
  setText("bundleDesc", text.bundleDesc);
  setText("trustEyebrow", text.trustEyebrow);
  setText("trustTitle", text.trustTitle);
  setText("trustDesc", text.trustDesc);
  setText("faqEyebrow", text.faqEyebrow);
  setText("faqTitle", text.faqTitle);
  setText("faqDesc", text.faqDesc);
  setText("footerText", text.footerText);
  setText("modalTitle", text.modalTitle);
  setText("modalIntro", text.modalIntro);
  setText("copyMessage", text.copyButton || TXT.copyButton);
  setText("openTelegram", text.telegramButton || TXT.telegramButton);
  setText("newOrder", text.closeButton || TXT.closeButton);

  ["navLogo", "heroLogo", "modalLogo"].forEach(id => {
    if ($(id)) $(id).src = logo;
  });

  const search = $("searchInput");
  if (search) search.placeholder = TXT.searchPlaceholder || "Cari produk...";

  const adminUrl = getAdminUrl();
  if ($("navTelegram")) $("navTelegram").href = adminUrl;
  if ($("openTelegram")) $("openTelegram").href = adminUrl;
}

function setHeroTitle(title) {
  if (!$("heroTitle")) return;
  const clean = safe(title || "Akaun Premium Strim Direct Numo");
  let updated = clean;
  const highlights = ["Streaming Premium", "Direct Numo", "Premium"];
  for (const h of highlights) {
    const re = new RegExp(h, "i");
    if (re.test(updated)) {
      updated = updated.replace(re, match => `<span class="grad">${match}</span>`);
      break;
    }
  }
  $("heroTitle").innerHTML = updated;
}

function getControlApiUrl() {
  return String(CONFIG.CONTROL_API_URL || CONFIG.STOCK_API_URL || CONFIG.API_URL || "").trim();
}

function getPaymentApiUrl() {
  return String(CONFIG.PAYMENT_API_URL || CONFIG.API_URL || "").trim();
}

function bindBaseEvents() {
  if ($("searchInput")) $("searchInput").addEventListener("input", renderProducts);
  if ($("closeModal")) $("closeModal").onclick = closeModal;
  if ($("newOrder")) $("newOrder").onclick = closeModal;
  if ($("copyMessage")) $("copyMessage").onclick = copyOrderMessage;
  if ($("orderModal")) {
    $("orderModal").onclick = e => {
      if (e.target.id === "orderModal") closeModal();
    };
  }
}

async function loadControl() {
  setSync(TXT.syncing || "Syncing...", "warn");

  try {
    const stockApiUrl = getControlApiUrl();
    const paymentApiUrl = getPaymentApiUrl();
    if (!stockApiUrl || stockApiUrl.includes("PASTE_")) throw new Error("Control API URL not set");
    if (!paymentApiUrl || paymentApiUrl.includes("PASTE_")) throw new Error("Payment API URL not set");

    // Stock ikut Customer Website 1 endpoint.
    const stockRes = await jsonp({ mode: "getWebsiteControl", _: Date.now() }, stockApiUrl);
    if (!stockRes.ok) throw new Error(stockRes.error || "Stock API error");

    // Price/promo/hot selling ikut ToyyibPay payment endpoint sebab endpoint ini ada Normal Price.
    let priceRes = null;
    try {
      priceRes = await jsonp({ mode: "getWebsiteControl", _: Date.now() }, paymentApiUrl);
    } catch (e) {
      priceRes = null;
    }

    const stockData = stockRes.data || {};
    const priceData = priceRes && priceRes.ok ? (priceRes.data || {}) : {};

    control = {
      stock: stockData.stock || [],
      promos: priceData.promos || stockData.promos || [],
      hotSelling: priceData.hotSelling || stockData.hotSelling || [],
      meta: { ...(stockData.meta || {}), paymentMeta: priceData.meta || {} },
      loaded: true
    };

    setSync((TXT.liveStockPromo || "• Live stock & Promo", "live");
  } catch (e) {
    control.loaded = false;
    setSync(TXT.offlinePriceMode || "Tidak dapat sync. Guna harga default.", "warn");
  }

  renderHotSelling();
  renderProducts();
}

function setSync(text, mode) {
  if (!$("syncStatus")) return;
  $("syncStatus").textContent = text;
  $("syncStatus").className = mode === "live" ? "sync live" : "sync";
}

function renderCategories() {
  if (!$("categoryButtons")) return;
  const cats = [TXT.categoryAll || "Semua", ...new Set(PRODUCTS.map(p => p.category))];
  $("categoryButtons").innerHTML = cats.map(c => `
    <button class="chip ${c === selectedCategory ? "active" : ""}" type="button" data-cat="${attr(c)}">${safe(c)}</button>
  `).join("");

  $("categoryButtons").querySelectorAll("[data-cat]").forEach(btn => {
    btn.onclick = () => {
      selectedCategory = btn.dataset.cat;
      renderCategories();
      renderProducts();
    };
  });
}

function renderProducts() {
  if (!$("productsGrid")) return;
  const q = ($("searchInput")?.value || "").toLowerCase().trim();
  const all = TXT.categoryAll || "Semua";
  const items = PRODUCTS.filter(p =>
    (selectedCategory === all || p.category === selectedCategory) &&
    (!q || `${p.name} ${p.display} ${p.desc}`.toLowerCase().includes(q))
  );

  $("emptyBox")?.classList.toggle("hidden", !!items.length);
  if ($("emptyBox")) $("emptyBox").textContent = TXT.emptySearchText || "Tiada produk dijumpai.";

  $("productsGrid").innerHTML = items.map(renderProductCard).join("");

  $("productsGrid").querySelectorAll("[data-toggle]").forEach(btn => {
    btn.onclick = () => {
      const card = btn.closest(".product");
      const open = card.classList.toggle("open");
      btn.textContent = open ? (TXT.closePackages || "Tutup Pakej") : (TXT.viewPackages || "Lihat Pakej");
    };
  });

  bindBuyButtons($("productsGrid"));
}

function renderProductCard(p) {
  const available = isAvailable(p.name, "ALL");
  const stockText = available ? (TXT.readyLabel || "Ready") : getStockText(p.name, "ALL");
  const pillClass = available ? "" : "off";

  return `
    <article class="product">
      <div class="photo-box">
        <img src="${attr(p.image)}" alt="${attr(p.display)}">
        <span class="stock-pill ${pillClass}">${safe(stockText)}</span>
      </div>
      <div class="product-body">
        <div class="p-name">${safe(p.display)}</div>
        <div class="p-desc">${safe(p.desc)}</div>
        <div class="from"><span>Harga dari</span><strong>${safe(lowestPrice(p))}</strong></div>
        <button class="view" type="button" data-toggle>${safe(TXT.viewPackages || "Lihat Pakej")}</button>
      </div>
      <div class="plans">
        ${p.sections ? p.sections.map(s => `
          <div class="subhead">${safe(s.title)}</div>
          ${renderPlans(p, s.plans, s.title)}
        `).join("") : renderPlans(p, p.plans || [], "ALL")}
      </div>
    </article>
  `;
}

function renderPlans(product, plans, section) {
  if (!plans || !plans.length) return `<div class="empty">${safe(TXT.noPriceText || "Harga belum tersedia. Sila PM admin.")}</div>`;

  return plans.map(plan => {
    const stockSection = section || "ALL";
    const ok = isAvailable(product.name, stockSection);
    const promo = findPromo(product.name, stockSection, plan.duration);
    const on = isPromoActive(promo) && promo.promoPrice;
    const normal = promo?.normalPrice || plan.price;
    const price = on ? promo.promoPrice : normal;
    const badge = on ? `<span class="badge ${badgeClass(promo.badgeColor)}">${safe(promo.badgeText || promo.badgePreset || "PROMO")}</span>` : "";
    const note = on && promo.note ? `<div class="note">${safe(promo.note)}</div>` : "";
    const oldPrice = normal || plan.price;
    const disabledText = getStockText(product.name, stockSection);

    return `
      <div class="plan">
        <div class="plan-top">
          <span class="plan-name">${safe(plan.label || displayDuration(plan.duration))}</span>
          ${badge}
        </div>
        ${note}
        <div class="plan-bottom">
          <div>
            <span class="mini-price">${safe(price)}</span>
            ${on && oldPrice && price !== oldPrice ? `<span class="mini-old">${safe(oldPrice)}</span>` : ""}
          </div>
          ${ok ? `
            <button class="buy" type="button"
              data-buy-product="${attr(product.name)}"
              data-buy-section="${attr(stockSection)}"
              data-buy-duration="${attr(plan.duration)}"
              data-buy-price="${attr(price)}">${safe(TXT.buyNow || "Order Sekarang")}</button>
          ` : `<button class="buy" type="button" disabled>${safe(disabledText)}</button>`}
        </div>
      </div>
    `;
  }).join("");
}

function renderHotSelling() {
  if (!$("hot") || !$("hotGrid")) return;

  hotItems = (control.hotSelling || [])
    .filter(x => isAvailable(x.product, x.section || "ALL"))
    .slice(0, 3);

  stopHotAutoplay();

  if (!hotItems.length) {
    $("hot").classList.add("hidden");
    return;
  }

  $("hot").classList.remove("hidden");

  const slides = hotItems.map(x => {
    const p = findProduct(x.product) || {};
    const local = findLocalPlan(x.product, x.section || "ALL", x.duration);
    const badge = x.hotBadge || x.badge || x.hotSellingBadge || "HOT";
    const price = x.promoPrice || local?.price || "Tanya Admin";
    const old = local?.price && local.price !== price ? `<span class="old">${safe(local.price)}</span>` : "";
    const section = normalize(x.section || "ALL") !== "ALL" ? ` • ${safe(x.section)}` : "";

    return `
      <div class="hot-slide">
        <article class="hot-card">
          <div class="hot-img">
            <img src="${attr(p.image || "numologo.png")}" alt="${attr(p.display || x.product)}">
            <span class="hot-badge">${safe(badge)}</span>
          </div>
          <div class="hot-info">
            <h3>${safe(p.display || x.product)}</h3>
            <div class="hot-plan">${safe(displayDuration(x.duration))}${section}</div>
            <div class="price-line"><span class="price">${safe(price)}</span>${old}</div>
            <button class="btn primary" type="button"
              data-buy-product="${attr(x.product)}"
              data-buy-section="${attr(x.section || "ALL")}" 
              data-buy-duration="${attr(x.duration)}"
              data-buy-price="${attr(price)}">${safe(TXT.buyNow || "Order Sekarang")}</button>
          </div>
        </article>
      </div>
    `;
  }).join("");

  const dots = hotItems.map((_, i) => `<button class="dot ${i === 0 ? "active" : ""}" type="button" data-dot="${i}" aria-label="Slide ${i + 1}"></button>`).join("");

  $("hotGrid").innerHTML = `
    <div class="hot-stage"><div id="hotTrack" class="hot-track">${slides}</div></div>
    <div class="hot-controls">
      <button id="hotPrev" class="arrow" type="button" aria-label="Sebelumnya">‹</button>
      <div id="hotDots" class="dots">${dots}</div>
      <button id="hotNext" class="arrow" type="button" aria-label="Seterusnya">›</button>
    </div>
  `;

  hotIndex = 0;
  updateHotSlider();
  if ($("hotPrev")) $("hotPrev").onclick = () => moveHot(-1);
  if ($("hotNext")) $("hotNext").onclick = () => moveHot(1);
  $("hotDots")?.querySelectorAll("[data-dot]").forEach(btn => btn.onclick = () => goHot(Number(btn.dataset.dot)));
  bindBuyButtons($("hotGrid"));
  startHotAutoplay();
}

function renderBundles() {
  if (!$("bundleGrid")) return;
  const bundles = CONFIG.BUNDLES || [];
  $("bundleGrid").innerHTML = bundles.map(b => `
    <article class="bundle">
      <span class="bundle-tag">${safe(b.tag || "BUNDLE")}</span>
      <h3>${safe(b.title || "Bundle")}</h3>
      <p>${safe(b.text || "")}</p>
      <span class="price">${safe(b.price || "Tanya Admin")}</span>
      <button class="btn primary" type="button" data-bundle-title="${attr(b.title || "Bundle")}">PM Admin</button>
    </article>
  `).join("");

  $("bundleGrid").querySelectorAll("[data-bundle-title]").forEach(btn => {
    btn.onclick = () => prepareBundleOrder(btn.dataset.bundleTitle, btn);
  });
}

function renderTrust() {
  if (!$("trustGrid")) return;
  const cards = CONFIG.TRUST_CARDS || [];
  $("trustGrid").innerHTML = cards.map(x => `
    <article class="trust">
      <div class="icon">${safe(x.icon || "✓")}</div>
      <h3>${safe(x.title || "")}</h3>
      <p>${safe(x.text || "")}</p>
    </article>
  `).join("");
}

function renderFaq() {
  if (!$("faqGrid")) return;
  const faqs = CONFIG.FAQ || [];
  $("faqGrid").innerHTML = faqs.map(x => `
    <details class="faq">
      <summary>${safe(x.q || "")}</summary>
      <p>${safe(x.a || "")}</p>
    </details>
  `).join("");
}

function bindBuyButtons(root) {
  if (!root) return;
  root.querySelectorAll("[data-buy-product]").forEach(btn => {
    const product = btn.dataset.buyProduct;
    const section = btn.dataset.buySection || "ALL";

    // V5 ADMIN PANEL STOCK LOGIC:
    // Even if old HTML/button is still visible, button will be disabled if stock is not ON.
    if (!isAvailable(product, section)) {
      btn.disabled = true;
      btn.textContent = getStockText(product, section);
      btn.classList.add("disabled-stock");
      btn.onclick = null;
      return;
    }

    btn.onclick = () => {
      const order = {
        product: btn.dataset.buyProduct,
        section: btn.dataset.buySection || "ALL",
        duration: btn.dataset.buyDuration,
        price: btn.dataset.buyPrice
      };

      if (!isAvailable(order.product, order.section)) {
        btn.disabled = true;
        btn.textContent = getStockText(order.product, order.section);
        toast(getStockText(order.product, order.section));
        renderProducts();
        renderHotSelling();
        return;
      }

      showPaymentForm(order, btn);
    };
  });
}

function showPaymentForm(order, button) {
  // V5 safety: never open payment modal if admin panel stock is not available.
  if (!isAvailable(order.product, order.section || "ALL")) {
    const msg = getStockText(order.product, order.section || "ALL");
    if (button) {
      button.disabled = true;
      button.textContent = msg;
    }
    toast(msg || "Produk habis stok");
    renderProducts();
    renderHotSelling();
    return;
  }

  currentPaymentOrder = { ...order, button };
  ensurePaymentModal();

  const productText = displayProduct(order.product);
  const sectionText = normalize(order.section || "ALL") !== "ALL" ? ` • ${order.section}` : "";
  const planText = `${displayDuration(order.duration)}${sectionText}`;

  setText("payProduct", productText);
  setText("payPlan", planText);
  setText("payPrice", order.price || "");
  const err = $("payError");
  if (err) err.textContent = "";

  const form = $("paymentForm");
  if (form) form.reset();

  // Android/browser Back button fix:
  // Bila payment modal terbuka, Back akan tutup modal dulu, bukan terus keluar website.
  openPaymentModalHistory();

  $("paymentModal")?.classList.add("show");
  setTimeout(() => $("payName")?.focus(), 80);
}

function ensurePaymentModal() {
  if ($("paymentModal")) return;

  const style = document.createElement("style");
  style.textContent = `
    .payment-fields{display:grid;gap:10px;margin-top:14px}
    .payment-fields label{display:grid;gap:6px;font-size:12px;font-weight:900;color:#333}
    .payment-fields input{width:100%;border:1px solid rgba(0,0,0,.14);border-radius:14px;padding:12px 13px;color:#080808;background:#fff;outline:none}
    .payment-fields input:focus{border-color:var(--red);box-shadow:0 0 0 3px rgba(229,9,20,.10)}
    .pay-error{min-height:18px;color:var(--red);font-size:12px;font-weight:900;margin-top:8px}
    .payment-note{font-size:12px;color:#666;line-height:1.45;margin-top:10px}
  `;
  document.head.appendChild(style);

  const html = `
    <div id="paymentModal" class="modal" aria-hidden="true">
      <div class="modal-card">
        <button id="closePaymentModal" class="x" type="button" aria-label="Tutup">×</button>
        <img id="payLogo" class="modal-logo" src="${attr(CONFIG.LOGO_IMAGE || "numologo.png")}" alt="Logo">
        <h3>Lengkapkan detail</h3>
        <p>Isi detail dibawah</p>

        <div class="order-summary">
          <div class="row"><span>Produk</span><strong id="payProduct">-</strong></div>
          <div class="row"><span>Pakej</span><strong id="payPlan">-</strong></div>
          <div class="row"><span>Harga</span><strong id="payPrice">-</strong></div>
        </div>

        <form id="paymentForm">
          <div class="payment-fields">
            <label>Nama
              <input id="payName" name="name" type="text" placeholder="Nama anda" autocomplete="name" required>
            </label>
            <label>No. telefon
              <input id="payPhone" name="phone" type="tel" placeholder="Contoh: 0123456789" autocomplete="tel" required>
            </label>
            <label>Email <span style="font-weight:700;color:#777">(optional)</span>
              <input id="payEmail" name="email" type="email" placeholder="email@example.com" autocomplete="email">
            </label>
          </div>
          <div id="payError" class="pay-error"></div>
          <div class="payment-note">Sila pastikan produk,Pakej dan Harga adalah betul</div>
          <div class="modal-actions">
            <button id="submitPayment" class="btn primary" type="submit">Terus ke ToyyibPay</button>
            <button id="cancelPayment" class="btn danger" type="button">Tutup</button>
          </div>
        </form>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", html);

  const close = () => closePaymentModal(false);
  $("closePaymentModal").onclick = close;
  $("cancelPayment").onclick = close;
  $("paymentModal").onclick = e => { if (e.target.id === "paymentModal") close(); };
  $("paymentForm").onsubmit = submitPaymentForm;
}

function openPaymentModalHistory() {
  if (paymentModalHistoryActive) return;
  try {
    window.history.pushState({ paymentModal: true }, "", window.location.href);
    paymentModalHistoryActive = true;
  } catch (e) {
    paymentModalHistoryActive = false;
  }
}

function closePaymentModal(fromBack) {
  const modal = $("paymentModal");
  if (modal) modal.classList.remove("show");

  if (fromBack) {
    paymentModalHistoryActive = false;
    return;
  }

  if (paymentModalHistoryActive) {
    paymentModalHistoryActive = false;
    try { window.history.back(); } catch (e) {}
  }
}

window.addEventListener("popstate", () => {
  const modal = $("paymentModal");
  if (modal && modal.classList.contains("show")) {
    closePaymentModal(true);
  }
});

async function submitPaymentForm(e) {
  e.preventDefault();
  if (!currentPaymentOrder) return;

  const order = currentPaymentOrder;
  const submit = $("submitPayment");
  const err = $("payError");
  const old = submit?.textContent;
  if (err) err.textContent = "";

  const customerName = ($("payName")?.value || "").trim();
  const phone = ($("payPhone")?.value || "").trim();
  const email = ($("payEmail")?.value || "").trim();

  if (!customerName || !phone) {
    if (err) err.textContent = "Sila isi nama dan no. telefon.";
    return;
  }

  try {
    if (submit) {
      submit.disabled = true;
      submit.textContent = TXT.preparingOrder || "Buka payment...";
    }

    if (!isAvailable(order.product, order.section || "ALL")) {
      throw new Error(getStockText(order.product, order.section || "ALL") || "Produk habis stok");
    }

    const bill = await createPaymentBill(order, { customerName, phone, email });
    if (!bill.paymentUrl) throw new Error("Payment URL tidak dijumpai.");
    window.location.href = bill.paymentUrl;
  } catch (ex) {
    if (err) err.textContent = ex.message || "Payment gagal dibuat. Sila cuba lagi.";
    toast(ex.message || "Payment gagal dibuat");
  } finally {
    if (submit) {
      submit.disabled = false;
      submit.textContent = old || "Terus ke ToyyibPay";
    }
  }
}

async function createPaymentBill(order, customer) {
  const apiUrl = getPaymentApiUrl();
  if (!apiUrl || apiUrl.includes("PASTE_")) throw new Error("Payment API URL not set");

  const successUrl = new URL("success.html", window.location.href).href;
  const r = await jsonp({
    mode: "createPaymentBill",
    product: order.product,
    section: order.section || "ALL",
    duration: order.duration,
    customerName: customer.customerName,
    phone: customer.phone,
    email: customer.email || "",
    successUrl,
    source: CONFIG.SOURCE || "DIRECT_ADMIN_WEBSITE",
    _: Date.now()
  }, apiUrl);

  if (!r.ok) throw new Error(r.error || "ToyyibPay bill gagal dibuat");
  return r.data || {};
}

async function prepareBundleOrder(title, button) {
  const order = { product: "BUNDLE", section: title, duration: "Custom", price: "Tanya Admin" };
  await prepareDirectOrder(order, button, true);
}

async function prepareDirectOrder(order, button, isBundle = false) {
  const old = button?.textContent;
  if (button) {
    button.disabled = true;
    button.textContent = TXT.preparingOrder || "Prepare order...";
  }

  let lead = null;
  try {
    lead = await createDirectLead(order);
  } catch (e) {
    lead = makeLocalLead(order);
  }

  if (button) {
    button.disabled = false;
    button.textContent = old;
  }

  openTelegramOrder(lead, isBundle);
}

async function createDirectLead(order) {
  const apiUrl = CONFIG.API_URL || "";
  if (!apiUrl || apiUrl.includes("PASTE_")) throw new Error("API URL not set");

  const r = await jsonp({
    mode: "directAdminLead",
    product: order.product,
    section: order.section || "ALL",
    duration: order.duration,
    price: order.price,
    source: CONFIG.SOURCE || "DIRECT_ADMIN_WEBSITE",
    _: Date.now()
  });

  if (!r.ok) throw new Error(r.error || "directAdminLead not active");
  return r.data || makeLocalLead(order);
}

function makeLocalLead(order) {
  return {
    leadId: "DIRECT" + dateStamp(),
    product: order.product,
    section: order.section || "ALL",
    duration: order.duration,
    price: order.price,
    status: "DIRECT_ADMIN_LOCAL",
    reseller: {
      name: getBrandName(),
      telegramUsername: getAdminUsername()
    },
    telegramUsername: getAdminUsername(),
    telegramUrl: getAdminUrl()
  };
}

function makeOrderContext(lead, isBundle = false) {
  const productText = isBundle || normalize(lead.product) === "BUNDLE" ? lead.section : displayProduct(lead.product);
  const sectionText = normalize(lead.section || "ALL") !== "ALL" && normalize(lead.product) !== "BUNDLE" ? ` • ${lead.section}` : "";
  const planText = `${displayDuration(lead.duration)}${sectionText}`;
  const leadId = lead.leadId || (TXT.leadLabel || "Lead ID");
  const price = lead.price || "Tanya Admin";
  return { ...lead, productText, planText, price, leadId };
}

function openTelegramOrder(lead, isBundle = false) {
  const ctx = makeOrderContext(lead, isBundle);
  currentOrderMessage = buildOrderMessage(ctx);
  currentTelegramUrl = buildTelegramUrl(currentOrderMessage);

  if ($("openTelegram")) $("openTelegram").href = currentTelegramUrl;
  toast(TXT.openingTelegram || "Buka Telegram...");

  // Direct redirect supaya customer tak perlu copy mesej.
  // Telegram akan buka chat admin dengan text order siap di ruangan taip.
  window.location.href = currentTelegramUrl;
}

function showOrderModal(lead, isBundle = false) {
  const ctx = makeOrderContext(lead, isBundle);

  setText("modalProduct", ctx.productText);
  setText("modalPlan", ctx.planText);
  setText("modalPrice", ctx.price);
  setText("modalLead", ctx.leadId);

  currentOrderMessage = buildOrderMessage(ctx);
  currentTelegramUrl = buildTelegramUrl(currentOrderMessage);

  if ($("modalMessage")) $("modalMessage").textContent = currentOrderMessage;
  if ($("openTelegram")) $("openTelegram").href = currentTelegramUrl;
  $("orderModal")?.classList.add("show");
}

function closeModal() {
  $("orderModal")?.classList.remove("show");
}

function buildOrderMessage(lead) {
  const brand = getBrandName();
  return [
    `Hi ${brand}, saya nak order.`,
    "",
    `Produk: ${lead.productText}`,
    `Pakej: ${lead.planText}`,
    `Harga: ${lead.price}`,
    `Lead ID: ${lead.leadId}`,
    "",
    "Mohon confirm stock dan cara payment."
  ].join("\n");
}

function buildTelegramUrl(message) {
  const user = getAdminUsername();
  const encoded = encodeURIComponent(message || "Hi Numo, saya nak order.");
  return `https://t.me/${encodeURIComponent(user)}?text=${encoded}`;
}

async function copyOrderMessage() {
  try {
    await navigator.clipboard.writeText(currentOrderMessage || "");
    toast(TXT.copySuccess || "Mesej order copied");
  } catch (e) {
    fallbackCopy(currentOrderMessage || "");
  }
}

function fallbackCopy(text) {
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    toast(TXT.copySuccess || "Mesej order copied");
  } catch (e) {
    toast(TXT.copyFail || "Tak dapat copy. Sila copy manual.");
  }
}

function toast(text) {
  if (!$("toast")) return;
  $("toast").textContent = text;
  $("toast").classList.add("show");
  setTimeout(() => $("toast")?.classList.remove("show"), 1800);
}

/****************************************************
 * HOT SLIDER
 ****************************************************/
function updateHotSlider() {
  const track = $("hotTrack");
  if (!track) return;
  track.style.transform = `translateX(-${hotIndex * 100}%)`;
  $("hotDots")?.querySelectorAll(".dot").forEach((d, i) => d.classList.toggle("active", i === hotIndex));
}
function moveHot(step) {
  if (!hotItems.length) return;
  hotIndex = (hotIndex + step + hotItems.length) % hotItems.length;
  updateHotSlider();
  startHotAutoplay();
}
function goHot(i) {
  if (!hotItems.length) return;
  hotIndex = i;
  updateHotSlider();
  startHotAutoplay();
}
function stopHotAutoplay() {
  if (hotTimer) clearInterval(hotTimer);
  hotTimer = null;
}
function startHotAutoplay() {
  stopHotAutoplay();
  if (hotItems.length <= 1 || document.hidden) return;
  hotTimer = setInterval(() => {
    hotIndex = (hotIndex + 1) % hotItems.length;
    updateHotSlider();
  }, 4200);
}

/****************************************************
 * PRODUCT / STOCK / PROMO HELPERS
 ****************************************************/
function findProduct(n) {
  return PRODUCTS.find(p => normalize(p.name) === normalize(n)) || null;
}
function displayProduct(n) {
  return findProduct(n)?.display || n;
}
function displayDuration(d) {
  return String(d || "").replace(/^Promo\s+/i, "").replace(/\s+Promo$/i, "");
}
function findLocalPlan(n, s, d) {
  const p = findProduct(n);
  if (!p) return null;
  const plans = p.sections
    ? (p.sections.find(x => normalize(x.title) === normalize(s))?.plans || p.sections[0]?.plans || [])
    : p.plans || [];
  return plans.find(x => normalize(x.duration) === normalize(d) || normalize(x.label) === normalize(d)) || null;
}
function findPromo(product, section, duration) {
  const exact = control.promos.find(x =>
    normalize(x.product) === normalize(product) &&
    normalize(x.section || "ALL") === normalize(section || "ALL") &&
    normalize(x.duration) === normalize(duration)
  );
  if (exact) return exact;
  return control.promos.find(x =>
    normalize(x.product) === normalize(product) &&
    normalize(x.section || "ALL") === "ALL" &&
    normalize(x.duration) === normalize(duration)
  );
}
function isPromoActive(p) {
  return p && ["ON", "YES", "TRUE", "ACTIVE"].includes(normalize(p.promoActive));
}
function getStock(product, section = "ALL") {
  // V7: exact stock lookup ikut Customer Website 1 endpoint.
  return (control.stock || []).find(x =>
    normalize(x.product) === normalize(product) &&
    normalize(x.section || "ALL") === normalize(section || "ALL")
  ) || null;
}

function isStockOn(product, section = "ALL") {
  // Exact Customer Website 1 logic:
  // row tak jumpa = dianggap bukan OFF; row jumpa hanya OFF kalau status OFF.
  const x = getStock(product, section);
  return !x || normalize(x.status) !== "OFF";
}

function getStockText(product, section = "ALL") {
  return getStock(product, section)?.stockText || TXT.soldOutLabel || "Habis Stok";
}

function sookaStates() {
  const devices = [
    { key: "TV", label: "TV" },
    { key: "PHONE", label: "Phone" },
    { key: "TABLET", label: "Tablet" }
  ];

  const deviceRows = devices.some(d => getStock("SOOKA PREMIUM", d.key));

  return devices.map(d => ({
    ...d,
    on: deviceRows
      ? isStockOn("SOOKA PREMIUM", d.key)
      : isStockOn("SOOKA PREMIUM", "ALL")
  }));
}

function isAvailable(product, section = "ALL") {
  if (normalize(product) === "SOOKA PREMIUM") {
    if (normalize(section) !== "ALL") return isStockOn("SOOKA PREMIUM", section);
    return sookaStates().some(x => x.on);
  }

  if (normalize(product) === "YOUTUBE PREMIUM" && normalize(section) === "ALL") {
    return isStockOn(product, "Email Sendiri") || isStockOn(product, "Email Seller");
  }

  return isStockOn(product, section);
}

function lowestPrice(p) {
  const list = [];
  if (p.sections) p.sections.forEach(s => s.plans.forEach(plan => list.push({ plan, section: s.title })));
  else (p.plans || []).forEach(plan => list.push({ plan, section: "ALL" }));

  const values = list.map(item => {
    const promo = findPromo(p.name, item.section, item.plan.duration);
    const value = isPromoActive(promo) && promo.promoPrice ? promo.promoPrice : (promo?.normalPrice || item.plan.price);
    const n = Number(String(value).replace(/[^0-9.]/g, ""));
    return { value, n };
  }).filter(x => Number.isFinite(x.n)).sort((a, b) => a.n - b.n);

  return values.length ? values[0].value : "Tanya Admin";
}
function badgeClass(c) {
  c = normalize(c);
  return ["GREEN", "RED", "BLUE"].includes(c) ? c.toLowerCase() : "";
}

/****************************************************
 * API / BASIC HELPERS
 ****************************************************/
function jsonp(params, apiUrlOverride) {
  return new Promise((resolve, reject) => {
    const apiUrl = apiUrlOverride || CONFIG.API_URL || "";
    if (!apiUrl) return reject(new Error("API URL not set"));

    const cb = "numoDirect_" + Date.now() + "_" + Math.floor(Math.random() * 100000);
    const s = document.createElement("script");
    const timer = setTimeout(() => {
      clean();
      reject(new Error("Timeout"));
    }, 20000);

    window[cb] = data => {
      clean();
      resolve(data || {});
    };

    function clean() {
      clearTimeout(timer);
      delete window[cb];
      s.remove();
    }

    s.onerror = () => {
      clean();
      reject(new Error("Network error"));
    };

    s.src = apiUrl + "?" + new URLSearchParams({ ...params, callback: cb });
    document.body.appendChild(s);
  });
}
function getBrandName() {
  return String(CONFIG.TEXT?.navBrand || "Numo").trim();
}
function getAdminUsername() {
  return String(CONFIG.ADMIN_TELEGRAM_USERNAME || "ownernumoventures").replace(/^@/, "").trim();
}
function getAdminUrl() {
  return "https://t.me/" + encodeURIComponent(getAdminUsername());
}
function dateStamp() {
  const d = new Date();
  const pad = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}
function setText(id, value) {
  if ($(id) && value !== undefined && value !== null) $(id).textContent = value;
}
function safe(v = "") {
  return String(v ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function attr(v = "") {
  return safe(v);
}
function normalize(v = "") {
  return String(v || "").trim().toUpperCase();
}
