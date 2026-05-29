import { useState, useEffect, useRef } from "react";

// ─── STORAGE (localStorage for real deployment) ────────────────────────────
const KEYS = {
  menu: "mrschef_menu",
  gallery: "mrschef_gallery",
  settings: "mrschef_settings",
  orders: "mrschef_orders",
};

function lsGet(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}
function lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

// ─── DEFAULT DATA ──────────────────────────────────────────────────────────
const DEFAULT_SETTINGS = {
  businessName: "Mrs Chef",
  tagline: "Lovingly Cooked, Beautifully Served",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  facebook: "https://facebook.com/mrschef",
  instagram: "https://instagram.com/mrschef",
  email: "hello@mrschef.in",
  city: "Bangalore",
  adminPassword: "mrschef2025",
  heroSubtitle: "Home kitchen catering for birthdays, weddings, office parties & every celebration in between.",
  accentColor: "#C8593A",
};

const DEFAULT_MENU = [
  { id: 1, name: "Mrs Chef Box", emoji: "🍛", price: 299, unit: "person", desc: "Individual meal boxes with rice, curry, dal & dessert. Perfect for office lunches.", category: "Box Meals", popular: true, veg: true, photo: "" },
  { id: 2, name: "Home Buffet", emoji: "🥘", price: 699, unit: "person", desc: "Full buffet for 20–100 guests. 3 curries, dal, rice, roti, salad, dessert & drinks.", category: "Buffet", popular: true, veg: false, photo: "" },
  { id: 3, name: "Birthday Special", emoji: "🎂", price: 899, unit: "person", desc: "Customised birthday spread with cake, finger foods, snacks, mocktails & a dedicated chef.", category: "Special", popular: false, veg: false, photo: "" },
  { id: 4, name: "Snack Fiesta", emoji: "🍜", price: 349, unit: "person", desc: "High tea & snack packages — samosas, sandwiches, chaat, pakoras. Great for kitty parties.", category: "Snacks", popular: false, veg: true, photo: "" },
  { id: 5, name: "Wedding Package", emoji: "💍", price: 1299, unit: "person", desc: "Grand wedding menu with live counters, starters, mains, dessert spread & service staff.", category: "Special", popular: true, veg: false, photo: "" },
  { id: 6, name: "Corporate Lunch", emoji: "🍱", price: 249, unit: "person", desc: "Healthy, balanced meal plans for offices. Weekly subscription available.", category: "Box Meals", popular: false, veg: true, photo: "" },
];

const DEFAULT_GALLERY = [
  { id: 1, url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80", caption: "Home Cooked Curries" },
  { id: 2, url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80", caption: "Biryani Feast" },
  { id: 3, url: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600&q=80", caption: "Dessert Spread" },
  { id: 4, url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80", caption: "Grand Buffet" },
  { id: 5, url: "https://images.unsplash.com/photo-1606787364406-a3cdf06c6d0c?w=600&q=80", caption: "Birthday Celebration" },
  { id: 6, url: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80", caption: "Wedding Catering" },
];

// ─── INJECT STYLES ─────────────────────────────────────────────────────────
function injectStyles(accent) {
  const id = "mrschef-styles";
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  const s = document.createElement("style");
  s.id = id;
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');
    *{margin:0;padding:0;box-sizing:border-box}
    :root{
      --a:${accent};--cream:#FDF6EE;--warm:#FFFBF5;--char:#1E1610;
      --brown:#5C3D2E;--muted:#9A8472;--border:#E8D8C4;
      --gold:#D4A853;--card:#fff;
      --sh:0 4px 24px rgba(30,22,16,.09);
      --shh:0 12px 48px rgba(30,22,16,.18);
    }
    html{scroll-behavior:smooth}
    body{font-family:'Outfit',sans-serif;background:var(--cream);color:var(--char);overflow-x:hidden}
    ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:var(--cream)}::-webkit-scrollbar-thumb{background:var(--a);border-radius:3px}
    /* NAV */
    .nav{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:15px 56px;background:rgba(253,246,238,.94);backdrop-filter:blur(14px);border-bottom:1px solid var(--border)}
    .logo{font-family:'Cormorant Garamond',serif;font-size:1.75rem;font-weight:700;color:var(--a);cursor:pointer}
    .logo span{color:var(--char)}
    .nav-links{display:flex;gap:26px;list-style:none;align-items:center}
    .nav-links a{text-decoration:none;color:var(--brown);font-size:.87rem;font-weight:500;transition:color .2s;cursor:pointer}
    .nav-links a:hover{color:var(--a)}
    .nav-cta{background:var(--a)!important;color:#fff!important;padding:9px 20px;border-radius:50px;font-weight:600!important}
    .hamburger{display:none;background:none;border:none;font-size:1.4rem;cursor:pointer;color:var(--char)}
    /* HERO */
    .hero{min-height:100vh;display:flex;align-items:center;padding:100px 56px 72px;background:var(--warm);position:relative;overflow:hidden}
    .blob1{position:absolute;right:-100px;top:-80px;width:650px;height:650px;border-radius:50%;background:radial-gradient(circle,#F5D9C840,#FDF0E620 55%,transparent 75%);animation:blob 7s ease-in-out infinite}
    .blob2{position:absolute;left:-80px;bottom:0;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,#D4A85320,transparent 70%);animation:blob 9s ease-in-out infinite reverse}
    @keyframes blob{0%,100%{transform:scale(1) translate(0,0)}50%{transform:scale(1.07) translate(10px,-10px)}}
    .hero-content{max-width:620px;position:relative;z-index:2}
    .badge{display:inline-flex;align-items:center;gap:7px;background:linear-gradient(135deg,#F0C875,#D4A853);color:var(--brown);font-size:.71rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:6px 15px;border-radius:50px;margin-bottom:22px;animation:fadeUp .6s ease both}
    .hero h1{font-family:'Cormorant Garamond',serif;font-size:clamp(3rem,5.5vw,5.2rem);font-weight:700;line-height:1.06;margin-bottom:20px;animation:fadeUp .6s .1s ease both}
    .hero h1 em{color:var(--a);font-style:italic}
    .hero p{font-size:1.06rem;line-height:1.75;color:var(--muted);max-width:490px;margin-bottom:34px;animation:fadeUp .6s .2s ease both}
    .hero-actions{display:flex;gap:12px;flex-wrap:wrap;animation:fadeUp .6s .3s ease both}
    .btn-p{background:var(--a);color:#fff;padding:14px 30px;border-radius:50px;font-size:.93rem;font-weight:600;border:none;cursor:pointer;transition:opacity .2s,transform .15s,box-shadow .2s;box-shadow:0 4px 18px rgba(200,89,58,.28);font-family:'Outfit',sans-serif;text-decoration:none;display:inline-block}
    .btn-p:hover{opacity:.87;transform:translateY(-2px);box-shadow:0 8px 26px rgba(200,89,58,.38)}
    .btn-g{background:transparent;color:var(--brown);padding:13px 28px;border-radius:50px;font-size:.93rem;font-weight:600;border:2px solid var(--border);cursor:pointer;transition:border-color .2s,color .2s;font-family:'Outfit',sans-serif}
    .btn-g:hover{border-color:var(--a);color:var(--a)}
    .btn-wa{display:inline-flex;align-items:center;gap:8px;background:#25D366;color:#fff;padding:13px 22px;border-radius:50px;font-size:.88rem;font-weight:600;text-decoration:none;transition:opacity .2s}
    .btn-wa:hover{opacity:.88}
    .hero-stats{display:flex;gap:40px;margin-top:48px;animation:fadeUp .6s .4s ease both}
    .snum{font-family:'Cormorant Garamond',serif;font-size:2.1rem;font-weight:700;color:var(--a);display:block}
    .slabel{font-size:.77rem;color:var(--muted);margin-top:2px}
    .food-grid{position:absolute;right:80px;top:50%;transform:translateY(-50%);z-index:2;display:grid;grid-template-columns:repeat(3,1fr);gap:13px;animation:fadeUp .9s .5s ease both}
    .food-pill{width:105px;height:105px;background:var(--card);border-radius:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:var(--sh);border:1px solid var(--border);font-size:2.1rem;transition:transform .3s;cursor:default}
    .food-pill p{font-size:.61rem;color:var(--muted);margin-top:4px;font-weight:600}
    .food-pill:hover{transform:translateY(-5px) rotate(-2deg)}
    .food-pill:nth-child(even){margin-top:16px}
    @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    /* SECTIONS */
    .sec{padding:88px 56px}
    .sec-label{font-size:.71rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--a);margin-bottom:8px}
    .sec-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,3.5vw,3rem);font-weight:700;color:var(--char);line-height:1.15;margin-bottom:10px}
    .sec-sub{font-size:.93rem;color:var(--muted);max-width:460px;line-height:1.75}
    .sec-hdr{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:48px;flex-wrap:wrap;gap:14px}
    /* HOW */
    .how-bg{background:var(--char)}
    .how-bg .sec-title{color:#fff}
    .how-bg .sec-sub{color:#b09a88}
    .how-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
    .how-card{padding:32px 26px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);border-radius:18px;position:relative;transition:background .3s}
    .how-card:hover{background:rgba(255,255,255,.09)}
    .how-n{font-family:'Cormorant Garamond',serif;font-size:4.5rem;font-weight:700;color:rgba(212,168,83,.15);position:absolute;top:12px;right:18px;line-height:1}
    .how-icon{font-size:2rem;margin-bottom:16px}
    .how-card h3{font-family:'Cormorant Garamond',serif;font-size:1.22rem;font-weight:700;color:#fff;margin-bottom:7px}
    .how-card p{font-size:.84rem;color:#b09a88;line-height:1.7}
    /* MENU */
    .menu-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
    .mc{background:var(--card);border-radius:20px;overflow:hidden;border:1px solid var(--border);box-shadow:var(--sh);transition:transform .3s,box-shadow .3s;cursor:pointer;position:relative}
    .mc:hover{transform:translateY(-6px);box-shadow:var(--shh)}
    .mc.feat{border:2px solid var(--a)}
    .m-photo{height:175px;object-fit:cover;width:100%;display:block}
    .m-emoji{height:175px;display:flex;align-items:center;justify-content:center;font-size:4.5rem}
    .bg1{background:linear-gradient(135deg,#FDEBD0,#FAD7A0)}
    .bg2{background:linear-gradient(135deg,#D5F5E3,#A9DFBF)}
    .bg3{background:linear-gradient(135deg,#FDEDEC,#F5B7B1)}
    .bg4{background:linear-gradient(135deg,#EAF2FF,#AED6F1)}
    .bg5{background:linear-gradient(135deg,#F5EEF8,#C39BD3)}
    .bg6{background:linear-gradient(135deg,#FEF9E7,#F9E79F)}
    .m-badges{position:absolute;top:11px;left:11px;display:flex;gap:5px;flex-wrap:wrap}
    .bt{padding:4px 10px;border-radius:50px;font-size:.63rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em}
    .bt-pop{background:var(--a);color:#fff}
    .bt-veg{background:#27AE60;color:#fff}
    .bt-nv{background:#E74C3C;color:#fff}
    .m-body{padding:18px}
    .m-body h3{font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:700;margin-bottom:3px}
    .m-cat{font-size:.68rem;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.07em;margin-bottom:5px}
    .m-body p{font-size:.81rem;color:var(--muted);line-height:1.6;margin-bottom:12px}
    .m-foot{display:flex;align-items:center;justify-content:space-between}
    .price{font-family:'Cormorant Garamond',serif;font-size:1.45rem;font-weight:700;color:var(--a)}
    .price span{font-size:.74rem;color:var(--muted);font-family:'Outfit',sans-serif;font-weight:400}
    .btn-sm{background:var(--a);color:#fff;border:none;padding:8px 17px;border-radius:50px;font-size:.79rem;font-weight:600;cursor:pointer;transition:opacity .2s;font-family:'Outfit',sans-serif}
    .btn-sm:hover{opacity:.84}
    /* GALLERY */
    .gallery-bg{background:var(--char)}
    .gallery-bg .sec-title{color:#fff}
    .gallery-bg .sec-sub{color:#b09a88}
    .gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
    .gi{position:relative;border-radius:16px;overflow:hidden;aspect-ratio:4/3;cursor:pointer}
    .gi img{width:100%;height:100%;object-fit:cover;transition:transform .4s}
    .gi:hover img{transform:scale(1.06)}
    .gi-cap{position:absolute;bottom:0;left:0;right:0;padding:14px;background:linear-gradient(transparent,rgba(0,0,0,.62));color:#fff;font-size:.78rem;font-weight:600;opacity:0;transition:opacity .3s}
    .gi:hover .gi-cap{opacity:1}
    .social-row{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:28px}
    /* OCCASIONS */
    .occ-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
    .occ{padding:26px 18px;background:var(--card);border-radius:16px;text-align:center;border:1px solid var(--border);transition:transform .3s,background .3s,box-shadow .3s;cursor:pointer}
    .occ:hover{transform:translateY(-5px);background:var(--a);box-shadow:var(--sh)}
    .occ:hover h4,.occ:hover p{color:#fff}
    .occ-ic{font-size:2.1rem;margin-bottom:10px}
    .occ h4{font-family:'Cormorant Garamond',serif;font-size:.97rem;font-weight:700;color:var(--char);margin-bottom:4px;transition:color .3s}
    .occ p{font-size:.74rem;color:var(--muted);line-height:1.5;transition:color .3s}
    /* TESTIMONIALS */
    .testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
    .tc{padding:26px;background:var(--card);border-radius:16px;border:1px solid var(--border);box-shadow:var(--sh);position:relative}
    .tc::before{content:'"';font-family:'Cormorant Garamond',serif;font-size:5.5rem;line-height:1;color:#F0C87555;position:absolute;top:8px;right:18px}
    .stars{color:var(--gold);font-size:.83rem;margin-bottom:10px;letter-spacing:2px}
    .tc p{font-size:.83rem;color:var(--brown);line-height:1.7;margin-bottom:16px;font-style:italic}
    .tu{display:flex;align-items:center;gap:9px}
    .tav{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.95rem;font-weight:700;color:#fff}
    .av1{background:linear-gradient(135deg,var(--a),#E07555)}
    .av2{background:linear-gradient(135deg,#5C3D2E,#8B6355)}
    .av3{background:linear-gradient(135deg,var(--gold),#E0C070)}
    .tu div strong{font-size:.84rem;font-weight:600}
    .tu div span{font-size:.73rem;color:var(--muted)}
    /* ORDER */
    .order-bg{background:var(--a);padding:88px 56px;position:relative;overflow:hidden}
    .order-bg::before{content:'';position:absolute;right:-100px;bottom:-100px;width:480px;height:480px;border-radius:50%;background:rgba(255,255,255,.055)}
    .order-grid{display:grid;grid-template-columns:1fr 1fr;gap:68px;align-items:center}
    .order-text .sec-label{color:#F0C875}
    .order-text .sec-title{color:#fff}
    .order-text .sec-sub{color:rgba(255,255,255,.75);max-width:390px}
    .perks{margin-top:24px;display:flex;flex-direction:column;gap:11px}
    .perk{display:flex;align-items:center;gap:10px;color:rgba(255,255,255,.88);font-size:.87rem;font-weight:500}
    .perk-ic{background:rgba(255,255,255,.18);width:25px;height:25px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:.73rem;font-weight:700;color:#fff}
    .order-social{display:flex;gap:10px;flex-wrap:wrap;margin-top:24px}
    .f-card{background:var(--card);border-radius:20px;padding:32px;box-shadow:0 22px 60px rgba(0,0,0,.14)}
    .f-card h3{font-family:'Cormorant Garamond',serif;font-size:1.42rem;font-weight:700;color:var(--char);margin-bottom:20px}
    .f-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}
    .fg{margin-bottom:12px}
    .fg label{display:block;font-size:.77rem;font-weight:600;color:var(--brown);margin-bottom:5px}
    .fg input,.fg select,.fg textarea{width:100%;padding:10px 13px;border:1.5px solid var(--border);border-radius:10px;font-family:'Outfit',sans-serif;font-size:.87rem;color:var(--char);background:var(--cream);outline:none;transition:border-color .2s,box-shadow .2s}
    .fg input:focus,.fg select:focus,.fg textarea:focus{border-color:var(--a);box-shadow:0 0 0 3px rgba(200,89,58,.11)}
    .fg textarea{resize:vertical;min-height:68px}
    .btn-sub{width:100%;padding:14px;background:var(--a);color:#fff;border:none;border-radius:50px;font-family:'Outfit',sans-serif;font-size:.93rem;font-weight:700;cursor:pointer;transition:opacity .2s,transform .15s}
    .btn-sub:hover{opacity:.87;transform:translateY(-1px)}
    /* FLOATING */
    .float-btns{position:fixed;bottom:26px;right:26px;display:flex;flex-direction:column;gap:11px;z-index:300}
    .fb-btn{width:50px;height:50px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.35rem;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,.18);transition:transform .2s,box-shadow .2s}
    .fb-btn:hover{transform:translateY(-3px) scale(1.07);box-shadow:0 8px 22px rgba(0,0,0,.24)}
    .fb-wa{background:#25D366}
    .fb-fb{background:#1877F2}
    /* FOOTER */
    footer{background:var(--char);padding:56px 56px 28px}
    .ft{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:36px;padding-bottom:36px;border-bottom:1px solid rgba(255,255,255,.07)}
    .flogo{font-family:'Cormorant Garamond',serif;font-size:1.7rem;font-weight:700;color:var(--a)}
    .flogo span{color:#fff}
    .fdesc{font-size:.81rem;line-height:1.7;color:rgba(255,255,255,.42);margin-top:9px}
    .fcol h4{font-size:.73rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#fff;margin-bottom:13px}
        .fcol ul{list-style:none}
    .fcol ul li{margin-bottom:8px}
    .fcol ul li a{color:rgba(255,255,255,.48);font-size:.83rem;text-decoration:none;transition:color .2s;cursor:pointer}
    .fcol ul li a:hover{color:var(--a)}
    .f-socs{display:flex;gap:9px;margin-top:16px}
    .f-soc{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;font-size:.82rem;text-decoration:none;transition:background .2s;cursor:pointer}
    .f-soc:hover{background:var(--a)}
    .fb-bot{display:flex;align-items:center;justify-content:space-between;padding-top:22px;flex-wrap:wrap;gap:12px}
    .fb-bot p{font-size:.74rem;color:rgba(255,255,255,.28)}
    .admin-link{background:none;border:none;color:rgba(255,255,255,.22);font-size:.73rem;cursor:pointer;font-family:'Outfit',sans-serif;transition:color .2s}
    .admin-link:hover{color:rgba(255,255,255,.6)}
    /* TOAST */
    .toast{position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(80px);background:var(--char);color:#fff;padding:13px 22px;border-radius:12px;font-size:.86rem;font-weight:500;box-shadow:0 8px 30px rgba(0,0,0,.2);transition:all .4s cubic-bezier(.34,1.56,.64,1);z-index:999;white-space:nowrap;pointer-events:none}
    .toast.show{transform:translateX(-50%) translateY(0)}
    /* MODAL */
    .modal-ov{position:fixed;inset:0;background:rgba(0,0,0,.58);z-index:500;display:flex;align-items:center;justify-content:center;padding:18px;animation:fi .2s ease}
    @keyframes fi{from{opacity:0}to{opacity:1}}
    .modal{background:var(--card);border-radius:22px;width:100%;max-width:520px;max-height:90vh;overflow-y:auto;box-shadow:0 30px 80px rgba(0,0,0,.28);animation:su .28s ease}
    @keyframes su{from{transform:translateY(36px);opacity:0}to{transform:translateY(0);opacity:1}}
    .modal-hdr{display:flex;align-items:center;justify-content:space-between;padding:22px 26px;border-bottom:1px solid var(--border)}
    .modal-hdr h2{font-family:'Cormorant Garamond',serif;font-size:1.42rem;font-weight:700}
    .modal-close{background:none;border:none;font-size:1.3rem;cursor:pointer;color:var(--muted);line-height:1}
    .modal-body{padding:26px}
    /* MOBILE NAV */
    .mob-nav{position:fixed;top:54px;left:0;right:0;background:var(--warm);border-bottom:1px solid var(--border);z-index:190;padding:14px 18px;display:flex;flex-direction:column;gap:2px}
    .mob-nav button{background:none;border:none;text-align:left;padding:9px 6px;font-size:.9rem;color:var(--brown);cursor:pointer;font-family:'Outfit',sans-serif;font-weight:500}
    /* ──── ADMIN ──── */
    .adm-wrap{position:fixed;inset:0;background:var(--char);z-index:1000;display:flex;flex-direction:column;overflow:hidden}
    .adm-nav{display:flex;align-items:center;justify-content:space-between;padding:16px 28px;background:rgba(255,255,255,.035);border-bottom:1px solid rgba(255,255,255,.07);flex-shrink:0}
    .adm-logo{font-family:'Cormorant Garamond',serif;font-size:1.35rem;color:#fff;font-weight:700}
    .adm-logo span{color:var(--a)}
    .adm-body{display:flex;flex:1;overflow:hidden}
    .adm-side{width:210px;background:rgba(255,255,255,.025);border-right:1px solid rgba(255,255,255,.06);padding:20px 13px;display:flex;flex-direction:column;gap:5px;overflow-y:auto;flex-shrink:0}
    .adm-side button{display:flex;align-items:center;gap:9px;padding:10px 13px;border-radius:11px;background:none;border:none;color:rgba(255,255,255,.55);font-family:'Outfit',sans-serif;font-size:.83rem;font-weight:500;cursor:pointer;text-align:left;transition:background .2s,color .2s;width:100%}
    .adm-side button.on{background:var(--a);color:#fff}
    .adm-side button:hover:not(.on){background:rgba(255,255,255,.06);color:#fff}
    .adm-main{flex:1;overflow-y:auto;padding:28px}
    .adm-main h2{font-family:'Cormorant Garamond',serif;font-size:1.7rem;font-weight:700;color:#fff;margin-bottom:20px}
    .stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:24px}
    .sc{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:20px}
    .sc .l{font-size:.7rem;color:rgba(255,255,255,.45);text-transform:uppercase;letter-spacing:.07em;margin-bottom:7px}
    .sc .v{font-family:'Cormorant Garamond',serif;font-size:1.9rem;font-weight:700;color:#fff}
    .sc .s{font-size:.73rem;color:rgba(255,255,255,.3);margin-top:3px}
    .panel{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:22px;margin-bottom:18px}
    .panel h3{font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:700;color:#fff;margin-bottom:16px}
    .adm-table{width:100%;border-collapse:collapse}
    .adm-table th{text-align:left;padding:9px 12px;font-size:.7rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:rgba(255,255,255,.35);border-bottom:1px solid rgba(255,255,255,.06)}
    .adm-table td{padding:11px 12px;font-size:.83rem;color:rgba(255,255,255,.78);border-bottom:1px solid rgba(255,255,255,.045);vertical-align:middle}
    .adm-table tr:hover td{background:rgba(255,255,255,.025)}
    .adm-form{display:grid;grid-template-columns:1fr 1fr;gap:14px}
    .afg{display:flex;flex-direction:column;gap:4px}
    .afg label{font-size:.72rem;font-weight:600;color:rgba(255,255,255,.42);text-transform:uppercase;letter-spacing:.06em}
    .afg input,.afg select,.afg textarea{padding:9px 12px;border:1.5px solid rgba(255,255,255,.09);border-radius:9px;background:rgba(255,255,255,.055);color:#fff;font-family:'Outfit',sans-serif;font-size:.86rem;outline:none;transition:border-color .2s}
    .afg input:focus,.afg textarea:focus{border-color:var(--a)}
    .afg select{color:#fff}
    .afg select option{background:#2c2418}
    .afg textarea{resize:vertical;min-height:65px}
    .afg.full{grid-column:1/-1}
    .btn-a{background:var(--a);color:#fff;border:none;padding:9px 18px;border-radius:9px;font-family:'Outfit',sans-serif;font-size:.82rem;font-weight:600;cursor:pointer;transition:opacity .2s}
    .btn-a:hover{opacity:.84}
    .btn-e{background:rgba(255,255,255,.07);color:rgba(255,255,255,.77);border:1px solid rgba(255,255,255,.09);padding:5px 12px;border-radius:7px;font-family:'Outfit',sans-serif;font-size:.76rem;font-weight:600;cursor:pointer;transition:background .2s;margin-right:5px}
    .btn-e:hover{background:rgba(255,255,255,.14)}
    .btn-d{background:rgba(231,76,60,.18);color:#E74C3C;border:1px solid rgba(231,76,60,.28);padding:5px 12px;border-radius:7px;font-family:'Outfit',sans-serif;font-size:.76rem;font-weight:600;cursor:pointer;transition:background .2s}
    .btn-d:hover{background:rgba(231,76,60,.3)}
    .toggle{position:relative;display:inline-block;width:38px;height:20px}
    .toggle input{opacity:0;width:0;height:0}
    .tslider{position:absolute;cursor:pointer;inset:0;background:rgba(255,255,255,.14);border-radius:20px;transition:.3s}
    .tslider:before{position:absolute;content:'';height:14px;width:14px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:.3s}
    input:checked+.tslider{background:var(--a)}
    input:checked+.tslider:before{transform:translateX(18px)}
    .gag{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
    .gai{position:relative;border-radius:10px;overflow:hidden;aspect-ratio:4/3}
    .gai img{width:100%;height:100%;object-fit:cover}
    .gai .del{position:absolute;top:5px;right:5px;background:rgba(231,76,60,.82);color:#fff;border:none;width:24px;height:24px;border-radius:50%;cursor:pointer;font-size:.85rem;display:flex;align-items:center;justify-content:center}
    .cswatch{width:34px;height:34px;border-radius:50%;cursor:pointer;border:3px solid transparent;transition:transform .2s}
    .cswatch.sel{border-color:#fff;transform:scale(1.15)}
    .pill-status{padding:3px 9px;border-radius:50px;font-size:.7rem;font-weight:700}
    .ps-new{background:rgba(212,168,83,.18);color:#D4A853}
    .ps-conf{background:rgba(39,174,96,.18);color:#27AE60}
    .ps-can{background:rgba(231,76,60,.18);color:#E74C3C}
    /* ── RESPONSIVE ── */
    @media(max-width:1024px){
      .nav,.hero,.sec,.order-bg,footer{padding-left:28px;padding-right:28px}
      .food-grid{display:none}
      .how-grid,.menu-grid{grid-template-columns:1fr 1fr}
      .occ-grid{grid-template-columns:1fr 1fr}
      .testi-grid{grid-template-columns:1fr 1fr}
      .order-grid{grid-template-columns:1fr}
      .ft{grid-template-columns:1fr 1fr}
      .stat-row{grid-template-columns:1fr 1fr}
      .gallery-grid{grid-template-columns:1fr 1fr}
    }
    @media(max-width:640px){
      .nav{padding:12px 16px}
      .nav-links{display:none}
      .hamburger{display:block}
      .hero{padding:88px 16px 52px}
      .hero h1{font-size:2.5rem}
      .hero-stats{gap:20px}
      .sec{padding:56px 16px}
      .how-grid,.menu-grid,.occ-grid,.testi-grid,.gallery-grid{grid-template-columns:1fr}
      .f-row{grid-template-columns:1fr}
      .order-bg{padding:56px 16px}
      footer{padding:42px 16px 26px}
      .ft{grid-template-columns:1fr;gap:24px}
      .fb-bot{flex-direction:column;text-align:center}
      .stat-row{grid-template-columns:1fr 1fr}
      .adm-side{width:170px}
      .adm-form{grid-template-columns:1fr}
      .gag{grid-template-columns:repeat(2,1fr)}
    }
  `;
  document.head.appendChild(s);
}

// ─── APP ───────────────────────────────────────────────────────────────────
export default function App() {
  const [menu, setMenu] = useState(() => lsGet(KEYS.menu, DEFAULT_MENU));
  const [gallery, setGallery] = useState(() => lsGet(KEYS.gallery, DEFAULT_GALLERY));
  const [settings, setSettings] = useState(() => lsGet(KEYS.settings, DEFAULT_SETTINGS));
  const [orders, setOrders] = useState(() => lsGet(KEYS.orders, []));

  const [screen, setScreen] = useState("site"); // site | login | admin
  const [adminTab, setAdminTab] = useState("dashboard");
  const [loginPw, setLoginPw] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [toast, setToast] = useState("");
  const [toastOn, setToastOn] = useState(false);
  const [orderModal, setOrderModal] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [newItem, setNewItem] = useState({ name:"",emoji:"🍛",price:299,unit:"person",desc:"",category:"Buffet",popular:false,veg:true,photo:"" });
  const [newGal, setNewGal] = useState({ url:"",caption:"" });
  const [mobMenu, setMobMenu] = useState(false);
  const [oForm, setOForm] = useState({ name:"",phone:"",email:"",date:"",guests:"",package:"",notes:"" });

  useEffect(() => { injectStyles(settings.accentColor); }, [settings.accentColor]);

  const showToast = (msg) => {
    setToast(msg); setToastOn(true);
    setTimeout(() => setToastOn(false), 3400);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
    setMobMenu(false);
  };

  // Persist helpers
  const updateMenu = (v) => { setMenu(v); lsSet(KEYS.menu, v); };
  const updateGallery = (v) => { setGallery(v); lsSet(KEYS.gallery, v); };
  const updateSettings = (v) => { setSettings(v); lsSet(KEYS.settings, v); };
  const updateOrders = (v) => { setOrders(v); lsSet(KEYS.orders, v); };

  // Order submit → WhatsApp
  const submitOrder = () => {
    if (!oForm.name || !oForm.phone || !oForm.date || !oForm.guests) {
      showToast("⚠️ Please fill all required fields"); return;
    }
    const o = { ...oForm, id: Date.now(), status:"New", created: new Date().toLocaleString() };
    updateOrders([o, ...orders]);
    const wa = settings.whatsapp.replace(/\D/g,"");
    const msg = encodeURIComponent(`Hi Mrs Chef! I'd like to book catering.\n👤 Name: ${o.name}\n📞 Phone: ${o.phone}\n📅 Date: ${o.date}\n👥 Guests: ${o.guests}\n🍽️ Package: ${o.package||"Not selected"}\n📝 Notes: ${o.notes||"None"}`);
    window.open(`https://wa.me/${wa}?text=${msg}`, "_blank");
    setOForm({ name:"",phone:"",email:"",date:"",guests:"",package:"",notes:"" });
    showToast("✅ Redirecting to WhatsApp…");
  };

  // Admin menu CRUD
  const saveMenuItem = (item, isNew) => {
    const updated = isNew ? [...menu, { ...item, id: Date.now() }] : menu.map(m => m.id === item.id ? item : m);
    updateMenu(updated);
    setEditItem(null);
    setNewItem({ name:"",emoji:"🍛",price:299,unit:"person",desc:"",category:"Buffet",popular:false,veg:true,photo:"" });
    showToast(isNew ? "✅ Item added!" : "✅ Item updated!");
  };
  const deleteMenuItem = (id) => { updateMenu(menu.filter(m => m.id !== id)); showToast("🗑️ Item removed"); };

  const addGallery = () => {
    if (!newGal.url) { showToast("⚠️ Please enter an image URL"); return; }
    updateGallery([...gallery, { ...newGal, id: Date.now() }]);
    setNewGal({ url:"",caption:"" });
    showToast("✅ Photo added!");
  };
  const delGallery = (id) => { updateGallery(gallery.filter(g => g.id !== id)); showToast("🗑️ Photo removed"); };

  const updateOrderStatus = (id, status) => {
    updateOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  const bgs = ["bg1","bg2","bg3","bg4","bg5","bg6"];
  const ACCENTS = ["#C8593A","#2E7D32","#1565C0","#6A1B9A","#E65100","#880E4F","#00695C","#D4A853"];

  // ── LOGIN ──────────────────────────────────────────────────────────────────
  if (screen === "login") return (
    <div style={{ position:"fixed",inset:0,background:"#1E1610",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:18,padding:20 }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",color:settings.accentColor,fontWeight:700 }}>Mrs<span style={{color:"#fff"}}>Chef</span></div>
        <div style={{ color:"rgba(255,255,255,.4)",fontSize:".82rem",marginTop:3 }}>Admin Login</div>
      </div>
      <div style={{ background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,padding:32,width:"100%",maxWidth:360 }}>
        <div className="afg" style={{ marginBottom:14 }}>
          <label>Password</label>
          <input type="password" value={loginPw} autoFocus placeholder="Enter admin password"
            onChange={e => setLoginPw(e.target.value)}
            onKeyDown={e => { if(e.key==="Enter") { if(loginPw===settings.adminPassword){setScreen("admin");setLoginErr("");}else{setLoginErr("Incorrect password");setLoginPw("");} }}} />
        </div>
        {loginErr && <div style={{ color:"#E74C3C",fontSize:".8rem",marginBottom:10 }}>{loginErr}</div>}
        <button className="btn-a" style={{ width:"100%",padding:"11px",fontSize:".9rem" }}
          onClick={() => { if(loginPw===settings.adminPassword){setScreen("admin");setLoginErr("");}else{setLoginErr("Incorrect password");setLoginPw("");} }}>
          Login
        </button>
        <button style={{ width:"100%",marginTop:9,background:"none",border:"none",color:"rgba(255,255,255,.3)",fontSize:".78rem",cursor:"pointer",fontFamily:"'Outfit',sans-serif" }} onClick={()=>setScreen("site")}>← Back to site</button>
      </div>
    </div>
  );

  // ── ADMIN ──────────────────────────────────────────────────────────────────
  if (screen === "admin") {
    const curItem = editItem || newItem;
    const setCur = editItem ? setEditItem : setNewItem;
     return (
      <div className="adm-wrap">
        <div className="adm-nav">
          <div className="adm-logo">Mrs<span>Chef</span> <span style={{fontSize:".72rem",color:"rgba(255,255,255,.28)",fontFamily:"'Outfit',sans-serif",fontWeight:400}}>Admin Panel</span></div>
          <div style={{display:"flex",gap:10}}>
            <button className="btn-a" onClick={()=>setScreen("site")}>View Site</button>
            <button className="btn-e" onClick={()=>setScreen("site")}>Logout</button>
          </div>
        </div>
        <div className="adm-body">
          <div className="adm-side">
            {[["📊","Dashboard","dashboard"],["🍽️","Menu Items","menu"],["🖼️","Gallery","gallery"],["📦","Orders","orders"],["⚙️","Settings","settings"]].map(([ic,lb,tab])=>(
              <button key={tab} className={adminTab===tab?"on":""} onClick={()=>setAdminTab(tab)}>{ic} {lb}</button>
            ))}
          </div>
          <div className="adm-main">

            {/* DASHBOARD */}
            {adminTab==="dashboard" && <>
              <h2>Dashboard</h2>
              <div className="stat-row">
                {[["Total Orders",orders.length,"All time"],["New",orders.filter(o=>o.status==="New").length,"Pending"],["Menu Items",menu.length,"Active"],["Photos",gallery.length,"Gallery"]].map(([l,v,s])=>(
                  <div key={l} className="sc"><div className="l">{l}</div><div className="v">{v}</div><div className="s">{s}</div></div>
                ))}
              </div>
              <div className="panel">
                <h3>Recent Orders</h3>
                {orders.length===0 ? <p style={{color:"rgba(255,255,255,.3)",fontSize:".82rem"}}>No orders yet.</p> :
                <div style={{overflowX:"auto"}}>
                <table className="adm-table"><thead><tr><th>Name</th><th>Date</th><th>Guests</th><th>Package</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>{orders.slice(0,8).map(o=>(
                  <tr key={o.id}>
                    <td>{o.name}</td><td>{o.date}</td><td>{o.guests}</td><td>{o.package||"—"}</td>
                    <td><span className={`pill-status ${o.status==="New"?"ps-new":o.status==="Confirmed"?"ps-conf":"ps-can"}`}>{o.status}</span></td>
                    <td style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                      <button className="btn-e" onClick={()=>updateOrderStatus(o.id,"Confirmed")}>✓</button>
                      <button className="btn-d" onClick={()=>updateOrderStatus(o.id,"Cancelled")}>✗</button>
                      <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g,"")}?text=${encodeURIComponent(`Hi ${o.name}, your Mrs Chef catering booking for ${o.date} is confirmed! 🍽️`)}`} target="_blank" rel="noopener noreferrer" style={{background:"rgba(37,211,102,.13)",color:"#25D366",border:"1px solid rgba(37,211,102,.22)",padding:"5px 9px",borderRadius:7,fontSize:".72rem",fontWeight:600,textDecoration:"none"}}>WhatsApp</a>
                    </td>
                  </tr>
                ))}</tbody></table></div>}
              </div>
            </>}

            {/* MENU */}
            {adminTab==="menu" && <>
              <h2>Menu Items</h2>
              <div className="panel">
                <h3>{editItem?"Edit Item":"Add New Item"}</h3>
                <div className="adm-form">
                  {[["name","Name","text"],["emoji","Emoji","text"],["price","Price (₹)","number"],["unit","Unit","text"]].map(([k,l,t])=>(
                    <div key={k} className="afg">
                      <label>{l}</label>
                      <input type={t} value={curItem[k]} onChange={e=>setCur({...curItem,[k]:t==="number"?Number(e.target.value):e.target.value})} />
                    </div>
                  ))}
                  <div className="afg">
                    <label>Category</label>
                    <select value={curItem.category} onChange={e=>setCur({...curItem,category:e.target.value})}>
                      {["Box Meals","Buffet","Special","Snacks"].map(c=><option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="afg" style={{display:"flex",flexDirection:"row",alignItems:"center",gap:14,paddingTop:20}}>
                    <label>Popular</label>
                    <label className="toggle"><input type="checkbox" checked={curItem.popular} onChange={e=>setCur({...curItem,popular:e.target.checked})}/><span className="tslider"/></label>
                    <label style={{marginLeft:6}}>Veg</label>
                    <label className="toggle"><input type="checkbox" checked={curItem.veg} onChange={e=>setCur({...curItem,veg:e.target.checked})}/><span className="tslider"/></label>
                  </div>
                  <div className="afg full">
                    <label>Photo URL (optional)</label>
                    <input type="text" placeholder="https://..." value={curItem.photo} onChange={e=>setCur({...curItem,photo:e.target.value})} />
                  </div>
                  <div className="afg full">
                    <label>Description</label>
                    <textarea value={curItem.desc} onChange={e=>setCur({...curItem,desc:e.target.value})} />
                  </div>
                </div>
                <div style={{display:"flex",gap:9,marginTop:16}}>
                  <button className="btn-a" onClick={()=>saveMenuItem(curItem,!editItem)}>{editItem?"Save Changes":"Add Item"}</button>
                  {editItem && <button className="btn-e" onClick={()=>setEditItem(null)}>Cancel</button>}
                </div>
              </div>
              <div className="panel">
                <h3>All Items ({menu.length})</h3>
                <div style={{overflowX:"auto"}}>
                <table className="adm-table"><thead><tr><th>Item</th><th>Category</th><th>Price</th><th>Popular</th><th>Veg</th><th>Actions</th></tr></thead>
                <tbody>{menu.map(m=>(
                  <tr key={m.id}>
                    <td>{m.emoji} {m.name}</td><td>{m.category}</td><td>₹{m.price}/{m.unit}</td>
                    <td>{m.popular?"⭐":""}</td><td>{m.veg?"🟢":"🔴"}</td>
                    <td><button className="btn-e" onClick={()=>setEditItem({...m})}>Edit</button><button className="btn-d" onClick={()=>deleteMenuItem(m.id)}>Delete</button></td>
                  </tr>
                ))}</tbody></table></div>
              </div>
            </>}

            {/* GALLERY */}
            {adminTab==="gallery" && <>
              <h2>Gallery</h2>
              <div className="panel">
                <h3>Add Photo</h3>
                <div className="adm-form">
                  <div className="afg full"><label>Image URL</label><input type="text" placeholder="https://images.unsplash.com/..." value={newGal.url} onChange={e=>setNewGal({...newGal,url:e.target.value})} /></div>
                  <div className="afg full"><label>Caption</label><input type="text" placeholder="e.g. Wedding Buffet 2024" value={newGal.caption} onChange={e=>setNewGal({...newGal,caption:e.target.value})} /></div>
                </div>
                {newGal.url && <img src={newGal.url} alt="preview" style={{width:160,height:110,objectFit:"cover",borderRadius:9,marginTop:10}} onError={e=>e.target.style.display="none"} />}
                <button className="btn-a" style={{marginTop:13}} onClick={addGallery}>Add Photo</button>
              </div>
              <div className="panel">
                <h3>Gallery ({gallery.length} photos)</h3>
                <div className="gag">
                  {gallery.map(g=>(
                    <div key={g.id} className="gai">
                      <img src={g.url} alt={g.caption} onError={e=>e.target.src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=60"} />
                      <button className="del" onClick={()=>delGallery(g.id)}>✕</button>
                      <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"5px 7px",background:"rgba(0,0,0,.5)",color:"#fff",fontSize:".65rem",fontWeight:600}}>{g.caption}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>}

            {/* ORDERS */}
            {adminTab==="orders" && <>
              <h2>All Orders ({orders.length})</h2>
              <div className="panel">
                {orders.length===0 ? <p style={{color:"rgba(255,255,255,.3)"}}>No orders yet.</p> :
                <div style={{overflowX:"auto"}}>
                <table className="adm-table">
                  <thead><tr><th>Name</th><th>Phone</th><th>Date</th><th>Guests</th><th>Package</th><th>Notes</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>{orders.map(o=>(
                    <tr key={o.id}>
                      <td>{o.name}</td><td>{o.phone}</td><td>{o.date}</td><td>{o.guests}</td><td>{o.package||"—"}</td><td style={{maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{o.notes||"—"}</td>
                      <td><span className={`pill-status ${o.status==="New"?"ps-new":o.status==="Confirmed"?"ps-conf":"ps-can"}`}>{o.status}</span></td>
                      <td style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                        <button className="btn-e" onClick={()=>updateOrderStatus(o.id,"Confirmed")}>Confirm</button>
                        <button className="btn-d" onClick={()=>updateOrderStatus(o.id,"Cancelled")}>Cancel</button>
                        <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g,"")}?text=${encodeURIComponent(`Hi ${o.name}! Your Mrs Chef catering for ${o.date} (${o.guests} guests) is confirmed! We'll see you then 🍽️`)}`} target="_blank" rel="noopener noreferrer" style={{background:"rgba(37,211,102,.13)",color:"#25D366",border:"1px solid rgba(37,211,102,.22)",padding:"5px 9px",borderRadius:7,fontSize:".72rem",fontWeight:600,textDecoration:"none"}}>WhatsApp</a>
                      </td>
                    </tr>
                  ))}</tbody>
                </table></div>}
              </div>
            </>}

            {/* SETTINGS */}
            {adminTab==="settings" && <>
              <h2>Settings</h2>
              <div className="panel">
                <h3>Business Info</h3>
                <div className="adm-form">
                  {[["businessName","Business Name"],["tagline","Tagline"],["phone","Phone Number"],["whatsapp","WhatsApp (country code + number, no +)"],["email","Email"],["city","City"]].map(([k,l])=>(
                    <div key={k} className="afg"><label>{l}</label><input type="text" value={settings[k]} onChange={e=>setSettings({...settings,[k]:e.target.value})} /></div>
                  ))}
                  <div className="afg full"><label>Hero Subtitle</label><textarea value={settings.heroSubtitle} onChange={e=>setSettings({...settings,heroSubtitle:e.target.value})} /></div>
                  <div className="afg full"><label>Facebook Page URL</label><input type="text" value={settings.facebook} onChange={e=>setSettings({...settings,facebook:e.target.value})} /></div>
                  <div className="afg full"><label>Instagram URL</label><input type="text" value={settings.instagram} onChange={e=>setSettings({...settings,instagram:e.target.value})} /></div>
                </div>
              </div>
              <div className="panel">
                <h3>Brand Color</h3>
                <p style={{color:"rgba(255,255,255,.38)",fontSize:".8rem",marginBottom:10}}>Choose your accent color</p>
                <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                  {ACCENTS.map(c=>(
                    <div key={c} className={`cswatch${settings.accentColor===c?" sel":""}`} style={{background:c}}
                      onClick={()=>{ const s={...settings,accentColor:c}; setSettings(s); injectStyles(c); }} />
                  ))}
                </div>
              </div>
              <div className="panel">
                <h3>Admin Password</h3>
                <div className="afg" style={{maxWidth:300}}>
                  <label>New Password</label>
                  <input type="password" value={settings.adminPassword} onChange={e=>setSettings({...settings,adminPassword:e.target.value})} />
                </div>
              </div>
              <button className="btn-a" style={{padding:"12px 26px",fontSize:".9rem"}} onClick={()=>{ updateSettings(settings); injectStyles(settings.accentColor); showToast("✅ Settings saved!"); }}>Save All Settings</button>
            </>}

          </div>
        </div>
        <div className={`toast${toastOn?" show":""}`}>{toast}</div>
      </div>
    );
  }

  // ── PUBLIC SITE ────────────────────────────────────────────────────────────
  const wa = settings.whatsapp.replace(/\D/g,"");

  return (
    <div>
      {/* NAV */}
      <nav className="nav">
        <div className="logo" onClick={()=>scrollTo("home")}>Mrs<span>Chef</span></div>
        <ul className="nav-links">
          {[["How it Works","how"],["Menu","menu"],["Gallery","gallery"],["Occasions","occasions"],["Reviews","reviews"]].map(([l,id])=>(
            <li key={id}><a onClick={()=>scrollTo(id)}>{l}</a></li>
          ))}
          <li><a className="nav-cta" onClick={()=>scrollTo("order")}>Order Now</a></li>
          <li><a style={{fontSize:".76rem",color:"var(--muted)"}} onClick={()=>setScreen("login")}>Admin</a></li>
        </ul>
        <button className="hamburger" onClick={()=>setMobMenu(!mobMenu)}>☰</button>
      </nav>

      {mobMenu && (
        <div className="mob-nav">
          {[["How it Works","how"],["Menu","menu"],["Gallery","gallery"],["Occasions","occasions"],["Reviews","reviews"],["📋 Order Now","order"]].map(([l,id])=>(
            <button key={id} onClick={()=>scrollTo(id)}>{l}</button>
          ))}
          <button style={{color:"var(--muted)",fontSize:".8rem"}} onClick={()=>setScreen("login")}>Admin Login</button>
        </div>
      )}

      {/* HERO */}
      <section id="home" className="hero">
        <div className="blob1"/><div className="blob2"/>
        <div className="hero-content">
          <div className="badge">✦ Home Kitchen Catering</div>
          <h1>Lovingly Cooked,<br/><em>Beautifully Served</em></h1>
          <p>{settings.heroSubtitle}</p>
           <div className="hero-actions">
            <button className="btn-p" onClick={()=>scrollTo("order")}>Book Your Catering</button>
            <button className="btn-g" onClick={()=>scrollTo("menu")}>Browse Menu</button>
            <a className="btn-wa" href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer">💬 WhatsApp Us</a>
          </div>
          <div className="hero-stats">
            <div><span className="snum">500+</span><div className="slabel">Events Catered</div></div>
            <div><span className="snum">4.9★</span><div className="slabel">Avg. Rating</div></div>
            <div><span className="snum">50+</span><div className="slabel">Dishes Available</div></div>
          </div>
        </div>
        <div className="food-grid">
          {["🍛 Biryani","🥗 Salads","🍰 Desserts","🥘 Curries","🫓 Snacks","🍜 Noodles"].map((f,i)=>(
            <div key={i} className="food-pill">{f.split(" ")[0]}<p>{f.split(" ")[1]}</p></div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="sec how-bg">
        <div className="sec-hdr">
          <div><div className="sec-label">Simple & Easy</div><div className="sec-title" style={{color:"#fff"}}>How It Works</div><div className="sec-sub" style={{color:"#b09a88"}}>Order home-cooked catering in 3 simple steps.</div></div>
        </div>
        <div className="how-grid">
          {[["📋","Choose Your Menu","Browse our packages — from intimate dinners to grand buffets. Mix cuisines to suit your guests.","01"],
            ["📅","Pick Date & Details","Tell us your event date, guest count and dietary preferences. We confirm within 2 hours.","02"],
            ["🚀","Sit Back & Enjoy","We prep, cook, deliver and set up. You focus on guests, we handle everything else.","03"]].map(([ic,h,p,n])=>(
            <div key={n} className="how-card"><div className="how-n">{n}</div><div className="how-icon">{ic}</div><h3>{h}</h3><p>{p}</p></div>
          ))}
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="sec" style={{background:"var(--cream)"}}>
        <div className="sec-hdr">
          <div><div className="sec-label">Our Packages</div><div className="sec-title">Choose Your Feast</div><div className="sec-sub">A package for every occasion and budget.</div></div>
          <a href={`https://wa.me/${wa}?text=${encodeURIComponent("Hi! I'd like to know more about your catering packages.")}`} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:7,background:"#25D366",color:"#fff",padding:"11px 20px",borderRadius:50,fontSize:".82rem",fontWeight:600,textDecoration:"none",flexShrink:0}}>💬 Ask on WhatsApp</a>
        </div>
        <div className="menu-grid">
          {menu.map((item,i)=>(
            <div key={item.id} className={`mc${item.popular?" feat":""}`} onClick={()=>setOrderModal(item)}>
              {item.photo
                ? <img src={item.photo} alt={item.name} className="m-photo" onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}} />
                : null}
              <div className={`m-emoji ${bgs[i%6]}`} style={item.photo?{display:"none"}:{}}>{item.emoji}</div>
              <div className="m-badges">
                {item.popular && <span className="bt bt-pop">Popular</span>}
                <span className={`bt ${item.veg?"bt-veg":"bt-nv"}`}>{item.veg?"Veg":"Non-Veg"}</span>
              </div>
              <div className="m-body">
                <div className="m-cat">{item.category}</div>
                <h3>{item.emoji} {item.name}</h3>
                <p>{item.desc}</p>
                <div className="m-foot">
                  <div className="price">₹{item.price.toLocaleString()} <span>/ {item.unit}</span></div>
                  <button className="btn-sm" onClick={e=>{e.stopPropagation();setOrderModal(item);}}>Order</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="sec gallery-bg">
        <div className="sec-hdr">
          <div><div className="sec-label">Our Work</div><div className="sec-title" style={{color:"#fff"}}>Food Gallery</div><div className="sec-sub" style={{color:"#b09a88"}}>A peek into our kitchen and events.</div></div>
          <a href={settings.facebook} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:7,background:"#1877F2",color:"#fff",padding:"11px 20px",borderRadius:50,fontSize:".82rem",fontWeight:600,textDecoration:"none",flexShrink:0}}>👥 Follow on Facebook</a>
        </div>
        <div className="gallery-grid">
          {gallery.map(g=>(
            <div key={g.id} className="gi">
              <img src={g.url} alt={g.caption} onError={e=>e.target.src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80"} />
              <div className="gi-cap">{g.caption}</div>
            </div>
          ))}
        </div>
        <div className="social-row">
          <a href={settings.facebook} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:7,background:"#1877F2",color:"#fff",padding:"11px 22px",borderRadius:50,fontSize:".86rem",fontWeight:600,textDecoration:"none"}}>👥 Facebook</a>
          <a href={settings.instagram} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:7,background:"linear-gradient(135deg,#833AB4,#FD1D1D,#FCB045)",color:"#fff",padding:"11px 22px",borderRadius:50,fontSize:".86rem",fontWeight:600,textDecoration:"none"}}>📸 Instagram</a>
        </div>
      </section>

      {/* OCCASIONS */}
      <section id="occasions" className="sec" style={{background:"var(--warm)"}}>
        <div className="sec-hdr"><div><div className="sec-label">We Cater For</div><div className="sec-title">Every Occasion</div><div className="sec-sub">From cozy gatherings to 500-person weddings.</div></div></div>
        <div className="occ-grid">
          {[["🎂","Birthdays","Custom menus & cakes"],["💍","Weddings","Grand spreads for your big day"],["🏢","Corporate","Meetings, seminars & parties"],["🏠","House Parties","Impress without the stress"],["🕌","Puja & Festivals","Traditional festive food"],["🎓","Graduations","Celebrate with flair"],["💼","Launches","Canapes for brand events"],["🌸","Baby Showers","Sweet & savory bites"]].map(([ic,h,p])=>(
            <div key={h} className="occ" onClick={()=>scrollTo("order")}><div className="occ-ic">{ic}</div><h4>{h}</h4><p>{p}</p></div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="reviews" className="sec" style={{background:"var(--cream)"}}>
        <div className="sec-hdr"><div><div className="sec-label">Happy Guests</div><div className="sec-title">What People Say</div></div></div>
        <div className="testi-grid">
          {[{s:"★★★★★",t:"Mrs Chef made our daughter's birthday magical. Fresh, generous and tasted exactly like homemade. Everyone kept asking for the recipe!",n:"Priya Menon",l:"Birthday Party, Bangalore",a:"P",c:"av1"},
            {s:"★★★★★",t:"Used the corporate lunch plan for 45 people. Always on time, hot and healthy. Best decision we made for our team.",n:"Rahul Sharma",l:"Office Catering, Mumbai",a:"R",c:"av2"},
            {s:"★★★★★",t:"The wedding package exceeded our expectations. Live counters, amazing biryani, desserts galore — guests were thoroughly impressed!",n:"Ananya & Rohan",l:"Wedding, Delhi",a:"A",c:"av3"}].map((t,i)=>(
            <div key={i} className="tc"><div className="stars">{t.s}</div><p>{t.t}</p><div className="tu"><div className={`tav ${t.c}`}>{t.a}</div><div><strong>{t.n}</strong><span>{t.l}</span></div></div></div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:28}}>
          <a href={settings.facebook} target="_blank" rel="noopener noreferrer" style={{color:"#1877F2",fontWeight:600,fontSize:".88rem",textDecoration:"none"}}>Read more reviews on Facebook →</a>
        </div>
      </section>

      {/* ORDER FORM */}
      <section id="order" className="order-bg">
        <div className="order-grid">
          <div className="order-text">
            <div className="sec-label">Get Started</div>
            <div className="sec-title">Book Your Catering Today</div>
            <div className="sec-sub">Fill in your details and we'll confirm within 2 hours.</div>
            <div className="perks">
              {["Free customisation for dietary needs","Home delivery & setup included","No hidden charges","Dedicated WhatsApp support"].map(p=>(
                <div key={p} className="perk"><div className="perk-ic">✓</div>{p}</div>
              ))}
            </div>
            <div className="order-social">
              <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="btn-wa">💬 WhatsApp Us Directly</a>
              <a href={settings.facebook} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:7,background:"#1877F2",color:"#fff",padding:"12px 20px",borderRadius:50,fontSize:".86rem",fontWeight:600,textDecoration:"none"}}>👥 Facebook Page</a>
            </div>
          </div>
          <div className="f-card">
            <h3>Request a Quote</h3>
            <div className="f-row">
              <div className="fg"><label>Your Name *</label><input placeholder="e.g. Priya Sharma" value={oForm.name} onChange={e=>setOForm({...oForm,name:e.target.value})} /></div>
              <div className="fg"><label>Phone *</label><input placeholder="+91 98765 43210" value={oForm.phone} onChange={e=>setOForm({...oForm,phone:e.target.value})} /></div>
            </div>
            <div className="fg"><label>Email</label><input type="email" placeholder="you@email.com" value={oForm.email} onChange={e=>setOForm({...oForm,email:e.target.value})} /></div>
            <div className="f-row">
              <div className="fg"><label>Event Date *</label><input type="date" value={oForm.date} onChange={e=>setOForm({...oForm,date:e.target.value})} /></div>
              <div className="fg"><label>No. of Guests *</label><input type="number" placeholder="e.g. 50" value={oForm.guests} onChange={e=>setOForm({...oForm,guests:e.target.value})} /></div>
            </div>
            <div className="fg"><label>Package</label>
              <select value={oForm.package} onChange={e=>setOForm({...oForm,package:e.target.value})}>
                <option value="">Select a package</option>
                {menu.map(m=><option key={m.id}>{m.name} (₹{m.price}/{m.unit})</option>)}
              </select>
            </div>
            <div className="fg"><label>Special Requests</label><textarea placeholder="Dietary needs, preferences, occasion details…" value={oForm.notes} onChange={e=>setOForm({...oForm,notes:e.target.value})} /></div>
            <button className="btn-sub" onClick={submitOrder}>🍽️ Get My Free Quote via WhatsApp</button>
            <p style={{textAlign:"center",marginTop:9,fontSize:".72rem",color:"var(--muted)"}}>You'll be taken to WhatsApp to confirm. We respond within 2 hours.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="ft">
          <div>
            <div className="flogo">Mrs<span>Chef</span></div>
            <p className="fdesc">Home kitchen catering that feels like family. Bringing love and flavour to every event across {settings.city}.</p>
            <div className="f-socs">
              <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="f-soc">👥</a>
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="f-soc">📸</a>
              <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="f-soc">💬</a>
              <a href={`mailto:${settings.email}`} className="f-soc">✉️</a>
            </div>
          </div>
          <div className="fcol"><h4>Services</h4><ul>{["Home Catering","Corporate Meals","Wedding Packages","Birthday Events","Snack Platters"].map(l=><li key={l}><a onClick={()=>scrollTo("menu")}>{l}</a></li>)}</ul></div>
          <div className="fcol"><h4>Company</h4><ul>{["About Us","Our Kitchen","Gallery","Reviews","Contact"].map(l=><li key={l}><a onClick={()=>scrollTo("gallery")}>{l}</a></li>)}</ul></div>
          <div className="fcol"><h4>Contact</h4><ul>
            <li><a href={`tel:${settings.phone}`}>📞 {settings.phone}</a></li>
            <li><a href={`mailto:${settings.email}`}>✉️ {settings.email}</a></li>
            <li><a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer">💬 WhatsApp</a></li>
            <li><a href={settings.facebook} target="_blank" rel="noopener noreferrer">👥 Facebook</a></li>
          </ul></div>
        </div>
        <div className="fb-bot">
          <p>© {new Date().getFullYear()} {settings.businessName}. Made with ❤️ and lots of spice.</p>
          <button className="admin-link" onClick={()=>setScreen("login")}>Admin Panel</button>
        </div>
      </footer>

      {/* FLOATING SOCIAL */}
      <div className="float-btns">
        <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="fb-btn fb-wa" title="WhatsApp">💬</a>
        <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="fb-btn fb-fb" title="Facebook">👥</a>
      </div>

      {/* MENU ITEM MODAL */}
      {orderModal && (
        <div className="modal-ov" onClick={()=>setOrderModal(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-hdr">
              <h2>{orderModal.emoji} {orderModal.name}</h2>
              <button className="modal-close" onClick={()=>setOrderModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              {orderModal.photo && <img src={orderModal.photo} alt={orderModal.name} style={{width:"100%",height:190,objectFit:"cover",borderRadius:12,marginBottom:14}} onError={e=>e.target.style.display="none"} />}
              <p style={{color:"var(--muted)",lineHeight:1.72,marginBottom:14}}>{orderModal.desc}</p>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 0",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)",marginBottom:18}}>
                <div>
                  <div style={{fontSize:".72rem",color:"var(--muted)",fontWeight:600,textTransform:"uppercase",marginBottom:2}}>Price</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.75rem",fontWeight:700,color:"var(--a)"}}>₹{orderModal.price.toLocaleString()} <span style={{fontSize:".82rem",color:"var(--muted)",fontFamily:"'Outfit',sans-serif",fontWeight:400}}>/ {orderModal.unit}</span></div>
                </div>
                <div style={{display:"flex",gap:6}}>
                  <span className={`bt ${orderModal.veg?"bt-veg":"bt-nv"}`}>{orderModal.veg?"Veg":"Non-Veg"}</span>
                  {orderModal.popular && <span className="bt bt-pop">Popular</span>}
                </div>
              </div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                <button className="btn-p" style={{flex:1}} onClick={()=>{ setOrderModal(null); setOForm({...oForm,package:`${orderModal.name} (₹${orderModal.price}/${orderModal.unit})`}); scrollTo("order"); }}>Book This Package</button>
                <a href={`https://wa.me/${wa}?text=${encodeURIComponent(`Hi! I'm interested in the ${orderModal.name} package (₹${orderModal.price}/${orderModal.unit}). Can you share more details?`)}`} target="_blank" rel="noopener noreferrer" style={{flex:1,background:"#25D366",color:"#fff",padding:"14px 18px",borderRadius:50,fontWeight:600,textDecoration:"none",textAlign:"center",fontSize:".88rem"}}>💬 Ask on WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`toast${toastOn?" show":""}`}>{toast}</div>
    </div>
  );
}
                              
