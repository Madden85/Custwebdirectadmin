/************************************************************
 * CUSTOMER WEBSITE 2 - TEXT / CONTENT CONFIG ONLY
 * Edit tulisan, produk, harga default, FAQ, dan username admin di sini.
 * Jangan letak function website dalam file ini.
 ************************************************************/

// ==========================================
// 1) TUKAR USERNAME TELEGRAM ADMIN DI SINI
// ==========================================
window.NUMO_ADMIN_CONFIG = {
  // Contoh: "ownernumoventures" atau "@ownernumoventures"
  ADMIN_TELEGRAM_USERNAME: "Eizliya"
};

// ==========================================
// 2) SETTING WEBSITE / API
// ==========================================
window.NUMO_DIRECT_CONFIG = {
  // Stock/promo display ikut Customer Website 1 endpoint.
  CONTROL_API_URL: "https://script.google.com/macros/s/AKfycbwqqBJ1A9tqYhPhEJe37Ik3-HGKZOHUUHqdf_jtLJuTv8tqQpt6WqX5jUBQwKPMbM92tw/exec",

  // Payment/ToyyibPay ikut backend payment endpoint.
  PAYMENT_API_URL: "https://script.google.com/macros/s/AKfycbxVm79WzB0PnyDcFPM9hWl4Lj1smvQJe2EaoeGzNAExzp8PTbHwdfxmJ-Uqbml2RGlF/exec",

  // Fallback untuk success.html dan compatibility.
  API_URL: "https://script.google.com/macros/s/AKfycbxVm79WzB0PnyDcFPM9hWl4Lj1smvQJe2EaoeGzNAExzp8PTbHwdfxmJ-Uqbml2RGlF/exec",

  LOGO_IMAGE: "numologo.png",
  SOURCE: "DIRECT_ADMIN_WEBSITE",

  // true = tunjuk tulisan sync, false = sorok tulisan sync.
  SHOW_SYNC_STATUS: false,

  TEXT: {
    navBrand: "EizLiya Stream Hub",
    navTagline: "Anda puashati, kami happy",
    navPackage: "Pakej",
    navBundle: "Bundle",
    navFaq: "FAQ",
    navAdmin: "PM Admin",

    heroBadge: "Fast Response • Satisfied Guaranteed",
    heroTitle: "Akaun Streaming Premium",
    heroText: "Pilih platform streaming kegemaran anda, semak pakej dan teruskan pembayaran",
    heroPrimary: "Semua Pakej",
    heroSecondary: "Pakej Bundle",
    floatingSmall: "WAKTU BEROPERASI",
    floatingStrong: "7am - 12am",
    floatingStatus: "Online",

    hotEyebrow: "Hot Selling",
    hotTitle: "Pilihan paling berbaloi",
    hotDesc: "3 pilihan paling berbaloi, hanya untuk anda",

    productEyebrow: "Akaun streaming premium kami",
    productTitle: "Senarai Akaun Premium",
    productDesc: "Tekan produk untuk lihat harga.",

    bundleEyebrow: "Jimat Lebih Banyak",
    bundleTitle: "Pakej Bundle",
    bundleDesc: "Pilih pakej bundle kegemaran anda",

    trustEyebrow: "Kenapa perlu pilih kami",
    trustTitle: "Fast response,Trusted,Full warranty",
    trustDesc: "Kesemua Akaun premium kami adalah legit",

    faqEyebrow: "Soalan Lazim",
    faqTitle: "FAQ Sebelum Order",
    faqDesc: "Sila baca dahulu sebelum PM",

    footerText: "© 2026 EizLiya Stream Hub.",
    stickyText: "Nak order sekarang?",
    stickyButton: "Semua Pakej",

    modalTitle: "Payment Numo",
    modalIntro: "Lepas payment berjaya, Telegram admin akan dibuka dengan mesej order siap.",
    telegramButton: "Buka Telegram",
    copyButton: "Copy Mesej",
    closeButton: "Tutup",
    modalProductLabel: "Produk",
    modalPlanLabel: "Pakej",
    modalPriceLabel: "Harga",
    modalLeadLabel: "Lead ID"
  },

  PAYMENT_MODAL: {
    title: "Lengkapkan detail",
    intro: "Isi detail dibawah",
    logoAlt: "Logo",
    closeAria: "Tutup",
    nameLabel: "Nama",
    namePlaceholder: "Nama anda",
    phoneLabel: "No. telefon",
    phonePlaceholder: "Contoh: 0123456789",
    emailLabel: "Email",
    emailOptionalText: "(optional)",
    emailPlaceholder: "email@example.com",
    note: "Sila pastikan Produk, Pakej dan harga adalah betul",
    submitButton: "Teruskan Pembayaran",
    cancelButton: "Tutup",
    requiredError: "Sila isi nama dan no. telefon.",
    paymentUrlMissing: "Payment URL tidak dijumpai.",
    paymentCreateFail: "Payment gagal dibuat. Sila cuba lagi.",
    paymentCreateFailShort: "Payment gagal dibuat"
  },

  PAYMENT_SUMMARY_LABELS: {
    product: "Produk",
    package: "Pakej",
    amount: "Harga"
  },

  SUCCESS_PAGE: {
    pageTitle: "Payment Status | EizLiya Stream Hub",
    checkingPill: "Semak payment...",
    checkingTitle: "Sila tunggu",
    checkingDesc: "Kami sedang semak status payment anda.",
    paidPill: "Payment berjaya ✅",
    paidTitle: "Payment berjaya",
    paidDesc: "Tekan PM Admin untuk teruskan order.",
    failedPill: "Payment tidak berjaya",
    failedTitle: "Payment belum berjaya",
    failedDesc: "Payment tidak disahkan. Sila cuba semula atau PM admin jika duit telah ditolak.",
    pendingPill: "Payment masih pending",
    manualPill: "Perlu semak manual",
    manualTitle: "Status belum dapat disahkan",
    noOrderError: "Order ID tidak dijumpai.",
    orderNotFound: "Order tidak dijumpai",
    checkError: "Tak dapat semak status payment.",
    recheckText: "Semak semula payment...",
    telegramButton: "PM Admin",
    refreshButton: "Semak Semula",
    backButton: "Kembali Website",
    smallNote: "Jika Telegram tidak terbuka automatik, tekan button PM Admin.",
    defaultMessage: "Mesej Telegram akan disediakan selepas status payment disahkan.",
    autoOpenTelegram: true,
    autoOpenDelayMs: 1600,
    maxAutoCheck: 5,
    autoCheckDelayMs: 2500
  },

  SUCCESS_SUMMARY_LABELS: {
    orderId: "Order ID",
    product: "Produk",
    package: "Pakej",
    amount: "Harga",
    status: "Status"
  },

  TELEGRAM_MESSAGES: {
    defaultMessage: "Hi admin, saya nak order.",
    paidOrder: {
      greeting: "Hi admin, saya dah buat payment.",
      orderLabel: "Order ID",
      productLabel: "Produk",
      packageLabel: "Pakej",
      amountLabel: "Harga",
      statusLabel: "Status Payment",
      refLabel: "ToyyibPay Ref",
      closing: "Mohon proceed order saya ya."
    },
    directOrder: {
      greeting: "Hi {brand}, saya nak order.",
      productLabel: "Produk",
      packageLabel: "Pakej",
      amountLabel: "Harga",
      leadLabel: "Lead ID",
      closing: "Mohon confirm stock dan cara payment."
    }
  },

  BUNDLES: [
    { tag: "POPULAR", title: "Netflix + YouTube", text: "Sesuai untuk customer yang nak movie dan YouTube tanpa iklan.", price: "Tanya Admin" },
    { tag: "FAMILY", title: "Disney+ Hotstar + Sooka", text: "Untuk hiburan family, live sports dan movie pilihan.", price: "Tanya Admin" },
    { tag: "JIMAT", title: "Custom Bundle", text: "Pilih sendiri platform yang customer nak. Admin akan quote harga.", price: "Custom" }
  ],

  TRUST_CARDS: [
    { icon: "⚡", title: "Pantas & Mudah", text: "Terus dapat detail akaun selepas bayar" },
    { icon: "🛡️", title: "Full Warranty", text: "Support sepanjang tempoh langganan mengikut pakej yang dibeli." },
    { icon: "🛡️", title: "100% Legit", text: "Kesemua akaun kami adalah akaun legit & bukan akaun curi" },
    { icon: "💬", title: "Trusted", text: "Kami telah menjual akaun premium sejak tahun 2015" }
  ],

  FAQ: [
    { q: "Kalau buat pembayaran, boleh dapat akaun terus ke?", a: "Ya, boleh. Lepas payment selesai dan admin dah confirm bayaran, akaun akan terus diberikan secepat mungkin. Customer boleh terus login dan guna akaun tanpa perlu tunggu lama." },
    { q: "Kalau akaun ada masalah, macam mana?", a: "Jangan risau, akaun ada warranty sepanjang tempoh langganan. Kalau ada apa-apa masalah macam tak boleh login, akaun sangkut, profil tak boleh guna atau masalah lain, terus je bagitahu admin. Admin akan bantu dengan fast response sampai masalah settle." },
    { q: "Netflix akan ada masalah household tak?", a: "Ya, untuk Netflix memang ada kemungkinan keluar masalah household sebab itu memang dari sistem Netflix sendiri. Tapi tak perlu risau, sebab customer boleh verify sendiri tanpa perlu tunggu admin. Nanti akan ada panduan untuk buat verification, jadi boleh sambung tengok macam biasa." },
    { q: "Kalau renew, perlu tukar akaun ke?", a: "Tak perlu tukar akaun. Kalau renew, customer boleh terus sambung guna akaun yang sama. Jadi tak perlu login akaun baru, tak perlu setup semula, dan boleh terus guna profil yang sedia ada." },
    { q: "Akaun akan terkeluar sendiri tak?", a: "Ya, ada kemungkinan akaun akan terkeluar sendiri dari device. Ini sebab password akaun akan ditukar dua kali sebulan untuk jaga keselamatan akaun dan elakkan orang luar masuk tanpa izin. Kalau akaun terkeluar, jangan panik. Terus hubungi admin dan admin akan bantu untuk login semula." }
  ]
};

window.NUMO_BUTTON_TEXT = {
  categoryAll: "Semua",
  searchPlaceholder: "Cari produk...",
  emptySearchText: "Tiada produk dijumpai.",
  syncing: "Syncing...",
  liveStockPromo: "Live stock & promo",
  stockVersionLabel: "",
  offlinePriceMode: "Tidak dapat sync. Guna harga default.",
  readyLabel: "Ready",
  soldOutLabel: "Habis Stok sementara",
  viewPackages: "Lihat Pakej",
  closePackages: "Tutup Pakej",
  buyNow: "Bayar Sekarang",
  preparingOrder: "Buka payment...",
  noHotSelling: "Tiada Hot Selling aktif sekarang.",
  noPriceText: "Harga belum tersedia. Sila PM admin.",
  copySuccess: "Mesej order copied",
  copyFail: "Tak dapat copy. Sila copy manual.",
  openingTelegram: "Buka Telegram admin...",
  telegramFallbackInfo: "Jika auto text tidak keluar dalam Telegram, paste mesej yang telah dicopy tadi.",
  leadLabel: "Lead ID",
  fromPriceLabel: "Harga dari",
  bundleDefaultTag: "BUNDLE",
  bundleDefaultTitle: "Bundle",
  askAdminPrice: "Tanya Admin",
  pmAdminButton: "PM Admin",
  prevSlideLabel: "Sebelumnya",
  nextSlideLabel: "Seterusnya"
};

// ==========================================
// 3) SENARAI PRODUK / HARGA DEFAULT
//    Harga sebenar payment tetap ikut Google Sheet.
//    Senarai ini untuk display fallback dan susunan produk.
// ==========================================
window.NUMO_PRODUCTS = [
  {
    name: "NETFLIX PREMIUM",
    display: "Netflix Premium",
    image: "netflix.jpg",
    category: "Streaming",
    desc: "Private profile dan warranty penuh.",
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
