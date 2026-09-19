/* ===== Athithi Homestay — Scripts (CMS-driven) ===== */

/* ---------- Sticky header ---------- */
const header = document.getElementById('header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 60));

/* ---------- Mobile menu close ---------- */
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
  const t = document.getElementById('nav-toggle'); if (t) t.checked = false;
}));

/* ---------- Footer year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Reveal on scroll ---------- */
function initReveal(){
  const els = document.querySelectorAll('.section-head,.about-text,.about-media,.room-card,.amenity,.visit-grid article,.gitem,.contact-form,.contact-info,.feature-text,.ex-card,.review-card,.theyyam-text');
  els.forEach(el => { if(!el.classList.contains('reveal')) el.classList.add('reveal'); });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

/* ---------- Helpers ---------- */
function esc(s){ return (s==null?'':String(s)).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function setText(sel, val){ const el=document.querySelector(sel); if(el && val!=null) el.textContent = val; }
function setBg(sel, val){ const el=document.querySelector(sel); if(el && val) el.style.backgroundImage = `url('${val}')`; }

/* ================================================================
   LOAD CONTENT FROM CMS  (content/site.json + content/gallery/*)
   Falls back silently to the built-in HTML if files are missing
   (e.g. when opened directly from disk without a server).
   ================================================================ */
async function loadContent(){
  try {
    const res = await fetch('content/site.json', {cache:'no-store'});
    if (res.ok){
      const data = await res.json();
      applyContent(data);
      if (Array.isArray(data.gallery) && data.gallery.length){
        renderGallery(data.gallery.map((g,i)=>({image:g.image, title:g.caption, big:i===0})));
      } else {
        renderGallery(DEFAULT_GALLERY);
      }
      initReveal();
      return;
    }
  } catch(e){ /* keep built-in defaults */ }
  renderGallery(DEFAULT_GALLERY);
  initReveal();
}

function applyContent(c){
  setText('.hero-eyebrow', c.hero_eyebrow);
  setText('.hero h1', c.hero_title);
  setText('.hero-sub', c.hero_sub);
  setBg('.hero-bg', c.hero_image);

  // About
  const aboutH = document.querySelector('.about-text h2'); if (aboutH && c.about_title) aboutH.textContent = c.about_title;
  if (Array.isArray(c.about_paragraphs)){
    const host = document.querySelector('.about-text');
    if (host){
      host.querySelectorAll('p').forEach(p=>p.remove());
      c.about_paragraphs.forEach(par => {
        const p=document.createElement('p'); p.innerHTML = esc(par.text); host.appendChild(p);
      });
    }
  }
  setBg('.about-img-1', c.about_image1);
  setBg('.about-img-2', c.about_image2);

  // Rooms
  if (Array.isArray(c.rooms)){
    const cards = document.querySelectorAll('.rooms-grid .room-card');
    c.rooms.forEach((r,i) => {
      const card = cards[i]; if(!card) return;
      const img=card.querySelector('.room-img'); if(img && r.image) img.style.backgroundImage=`url('${r.image}')`;
      const tag=card.querySelector('.tag'); if(tag && r.tag) tag.textContent=r.tag;
      const h=card.querySelector('h3'); if(h && r.title) h.textContent=r.title;
      const p=card.querySelector('.room-body>p'); if(p && r.desc) p.textContent=r.desc;
    });
  }

  // Attractions
  if (Array.isArray(c.attractions)){
    const grid = document.querySelector('.explore-grid');
    if (grid){
      grid.innerHTML = c.attractions.map(a => `
        <article class="ex-card">
          <div class="ex-img" style="background-image:url('${a.image||''}')"></div>
          <div class="ex-body"><h3>${esc(a.title)}</h3><p>${esc(a.desc)}</p></div>
        </article>`).join('');
    }
  }

  // Reviews
  if (Array.isArray(c.reviews)){
    const rg = document.querySelector('.reviews-grid');
    if (rg){
      rg.innerHTML = c.reviews.map(r => `
        <div class="review-card">
          <div class="stars">★★★★★</div>
          <p>"${esc(r.text)}"</p>
          <div class="reviewer"><span class="rv-avatar">${esc((r.name||'G').trim().charAt(0))}</span><div><strong>${esc(r.name)}</strong><small>Google review</small></div></div>
        </div>`).join('');
    }
  }

  // Contact
  if (c.phone){
    document.querySelectorAll('a[href^="tel:"]').forEach(a=>{ a.href='tel:'+c.phone.replace(/\s+/g,''); });
  }
  if (c.email){
    document.querySelectorAll('a[href^="mailto:"]').forEach(a=>{ a.href='mailto:'+c.email; a.textContent=c.email; });
  }
}

/* ---------- Gallery from CMS folder (with graceful fallback) ---------- */
const DEFAULT_GALLERY = [
  {image:'images/hero.jpg', title:'Athithi Homestay exterior', big:true},
  {image:'images/ed-g1.jpg'},{image:'images/ed-g2.jpg'},{image:'images/ed-g3.jpg'},
  {image:'images/ed-g4.jpg'},{image:'images/ed-g5.jpg'},{image:'images/ed-g6.jpg'},
  {image:'images/g05.jpg'},{image:'images/photo16572.jpg'},{image:'images/room1.jpg'},
  {image:'images/living.jpg'},{image:'images/g09.jpg'}
];

function renderGallery(photos){
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  grid.innerHTML = '';
  photos.forEach((p,i) => {
    const item = document.createElement('div');
    item.className = 'gitem';
    if (p.big) item.classList.add('gbig');
    const img = document.createElement('img');
    img.src = p.image; img.alt = p.title || 'Athithi Homestay photo'; img.loading='lazy';
    item.appendChild(img);
    grid.appendChild(item);
  });
}

/* ================================================================
   BOOKING ENQUIRY -> WhatsApp
   ================================================================ */
function handleEnquiry(e){
  e.preventDefault();
  const v = id => (document.getElementById(id).value || '').trim();
  const text =
    `Hello Athithi Homestay! I'd like to enquire about a stay.%0A%0A` +
    `Name: ${v('f-name')}%0A` +
    `Phone: ${v('f-phone')}%0A` +
    (v('f-email') ? `Email: ${v('f-email')}%0A` : '') +
    (v('f-adults') ? `Adults: ${v('f-adults')}%0A` : '') +
    (v('f-kids') ? `Kids: ${v('f-kids')}%0A` : '') +
    (v('f-checkin') ? `Check-in: ${v('f-checkin')}%0A` : '') +
    (v('f-checkout') ? `Check-out: ${v('f-checkout')}%0A` : '') +
    (v('f-msg') ? `Details: ${v('f-msg')}` : '');
  document.getElementById('form-note').textContent = 'Opening WhatsApp to send your enquiry…';
  window.open(`https://wa.me/917025500164?text=${text}`, '_blank');
  return false;
}

/* ---------- Init ---------- */
loadContent();
