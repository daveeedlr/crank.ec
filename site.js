/* ==========================================================================
   CRANK — JS compartido (multipágina, 100% estático)
   Única fuente de verdad: contacto, datos, header/footer, carrito y asesor.
   Cargar en TODAS las páginas: <script src="js/site.js" defer></script>
   ========================================================================== */

/* ====================== 1. CONFIGURACIÓN CENTRAL ========================= */
const CRANK = {
  whatsapp: '593995430561',          // +593 099 543 0561  (único lugar para cambiarlo)
  whatsappPretty: '+593 99 543 0561',
  instagram: 'crank.ec',
  email: 'hola@crank.ec',
  ciudad: 'Cuenca, Ecuador',
  bank: {
    banco: 'Banco Pichincha',
    tipo: 'Cuenta Corriente',
    numero: '2100XXXXXXXX',          // PLACEHOLDER — reemplazar por la cuenta real
    ruc: '0100000000001',            // PLACEHOLDER
    beneficiario: 'Crank EC'
  }
};
const wa = (text) => `https://wa.me/${CRANK.whatsapp}${text ? '?text=' + text : ''}`;

/* ====================== 2. CATÁLOGO Y EVENTOS =========================== */
const products = [
  { id: 1, name: 'Pinarello Dogma F', brand: 'Universal Colours', category: 'ruta', price: 12500, tag: 'PREMIUM', img: 'img/white-bike-mountain.jpg', attrs:['Carbono','Ruta','Avanzado'], ideal:'competición y subidas largas' },
  { id: 2, name: 'MTB Trail Series 29"', brand: 'Crank Editions', category: 'mtb', price: 3200, tag: 'TOP', img: 'img/mtb-detail.jpg', attrs:['29"','Trail','Intermedio'], ideal:'senderos y El Cajas' },
  { id: 3, name: 'Gravel Aventura', brand: 'Crank Editions', category: 'gravel', price: 3800, tag: 'NUEVO', img: 'img/bike-frame-detail.jpg', attrs:['All-road','Bikepacking','Versátil'], ideal:'trochas y viajes largos' },
  { id: 4, name: 'Bici Ruta Carbono', brand: 'Universal Colours', category: 'ruta', price: 4500, img: 'img/bike-road.jpg', attrs:['Carbono','Ruta','Intermedio'], ideal:'rodar rápido en asfalto' },
  { id: 5, name: 'Casco Pro Aero', brand: 'ProSafety', category: 'accesorios', price: 280, img: 'img/yellow-helmets.jpg', attrs:['Aero','Certificado'], ideal:'ruta y velocidad' },
  { id: 6, name: 'Gafas Performance', brand: 'Universal Colours', category: 'accesorios', price: 195, img: 'img/sunglasses-display.jpg', attrs:['UV400','Lente intercambiable'], ideal:'todo terreno' },
  { id: 7, name: 'Maillot Crank Long Ride', brand: 'Crank Editions', category: 'accesorios', price: 95, tag: 'EDICIÓN', tagLima: true, img: 'img/first-long-ride-1.jpg', attrs:['Edición','Técnico'], ideal:'salidas largas' },
  { id: 8, name: 'Bici Ruta Edición Pucará', brand: 'Crank Editions', category: 'ruta', price: 5200, tag: 'EDICIÓN', img: 'img/cyclist-photo.jpg', attrs:['Carbono','Edición limitada'], ideal:'coleccionistas y rodar fuerte' },
  { id: 9, name: 'Café Espresso 250g', brand: 'Crank Roast', category: 'cafe', price: 12, tag: 'FRESCO', tagLima: true, img: 'img/coffee-bike.jpg', attrs:['Ecuatoriano','Recién tostado'], ideal:'tu espresso de cada mañana' },
  { id: 10, name: 'Café Filtrado V60', brand: 'Crank Roast', category: 'cafe', price: 14, tag: 'NUEVO', img: 'img/celebration.jpg', attrs:['Origen único','Filtrado'], ideal:'métodos lentos' },
  { id: 11, name: 'Pack The Last Dance', brand: 'Crank Rides', category: 'accesorios', price: 65, tag: 'COLECCIÓN', tagMagenta: true, img: 'img/last-dance-1.jpg', attrs:['Colección','Ride'], ideal:'fans de los rides Crank' },
  { id: 12, name: 'Sesión Bike Fit Pro', brand: 'Crank Taller', category: 'accesorios', price: 120, img: 'img/cyclist-mid.jpg', attrs:['Ajuste pro','+Comodidad'], ideal:'evitar lesiones y rendir más' },
];

const events = [
  { day: 17, month: 'MAY', year: 2026, title: 'Crank Long Ride · Cajas', time: '06:00', distance: '85 km', type: 'ride', meta: 'Salida desde Crank · Nivel intermedio' },
  { day: 24, month: 'MAY', year: 2026, title: 'Female Ride · El Valle', time: '07:30', distance: '40 km', type: 'female', meta: 'Solo mujeres · Nivel principiante' },
  { day: 31, month: 'MAY', year: 2026, title: 'Clínica de Mecánica Básica', time: '15:00', type: 'evento', meta: 'En el taller · 8 cupos · $20' },
  { day: 7, month: 'JUN', year: 2026, title: 'Epic Ride · Pucará', time: '05:30', distance: '120 km', type: 'ride', meta: 'Reto avanzado · Inscripción $25' },
  { day: 14, month: 'JUN', year: 2026, title: 'Café & Cleats · Domingo', time: '08:00', distance: '50 km', type: 'evento', meta: 'Salida + café en la tienda' },
  { day: 21, month: 'JUN', year: 2026, title: 'The Last Dance · Ingapirca', time: '06:00', distance: '95 km', type: 'ride', meta: 'Edición limitada · Kit incluido' },
];

/* ====================== 3. HEADER / FOOTER COMPARTIDOS ================== */
const NAV_ITEMS = [
  { page: 'bicis',    label: 'Bicis',    href: 'bicis.html' },
  { page: 'taller',   label: 'Taller',   href: 'taller.html' },
  { page: 'cafe',     label: 'Café',     href: 'cafe.html' },
  { page: 'eventos',  label: 'Eventos',  href: 'eventos.html' },
  { page: 'contacto', label: 'Contacto', href: 'contacto.html' },
];

function currentPage() { return document.body.dataset.page || 'inicio'; }

function injectHeader() {
  const cur = currentPage();
  const links = NAV_ITEMS.map(i =>
    `<li><a href="${i.href}" class="${i.page === cur ? 'active' : ''}">${i.label}</a></li>`).join('');
  const mlinks = NAV_ITEMS.map(i =>
    `<a href="${i.href}" class="${i.page === cur ? 'active' : ''}">${i.label}</a>`).join('');

  const cartSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 01-8 0"/></svg>`;

  const nav = `
  <nav id="siteNav">
    <div class="nav-inner">
      <a href="index.html" class="logo"><span class="logo-dot"></span>CRANK</a>
      <ul class="nav-links">${links}</ul>
      <div class="nav-right">
        <button class="nav-cart" onclick="openCart()">${cartSvg} Carrito <span class="nav-cart-count" id="cartCount">0</span></button>
        <button class="nav-toggle" aria-label="Abrir menú" onclick="openMobileMenu()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>
    </div>
  </nav>
  <div class="mobile-overlay" id="mobileOverlay" onclick="closeMobileMenu()"></div>
  <aside class="mobile-panel" id="mobilePanel">
    <div class="mobile-panel-head">
      <a href="index.html" class="logo" style="font-size:22px;"><span class="logo-dot"></span>CRANK</a>
      <button class="cart-close" onclick="closeMobileMenu()" aria-label="Cerrar menú">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
    <a href="index.html" class="${cur === 'inicio' ? 'active' : ''}">Inicio</a>
    ${mlinks}
    <a href="${wa('Hola%20Crank!%20Tengo%20una%20consulta.')}" target="_blank" rel="noopener" class="btn btn-lima">Escríbenos por WhatsApp</a>
  </aside>`;

  const holder = document.getElementById('site-header');
  if (holder) holder.outerHTML = nav;
  else document.body.insertAdjacentHTML('afterbegin', nav);
}

function injectFooter() {
  const igSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`;
  const waSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>`;
  const mailSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`;

  const footer = `
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <a href="index.html" class="logo"><span class="logo-dot"></span>CRANK</a>
          <p class="footer-tagline">Bicis, café y mecánica multimarca en el corazón de Cuenca, Ecuador.</p>
          <div class="footer-social">
            <a href="https://instagram.com/${CRANK.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${igSvg}</a>
            <a href="${wa()}" target="_blank" rel="noopener" aria-label="WhatsApp">${waSvg}</a>
            <a href="mailto:${CRANK.email}" aria-label="Email">${mailSvg}</a>
          </div>
        </div>
        <div class="footer-col">
          <h5>Tienda</h5>
          <ul>
            <li><a href="bicis.html#tienda">Bicis de Ruta</a></li>
            <li><a href="bicis.html#tienda">Bicis MTB</a></li>
            <li><a href="bicis.html#tienda">Bicis Gravel</a></li>
            <li><a href="bicis.html#tienda">Accesorios</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Servicios</h5>
          <ul>
            <li><a href="taller.html#taller">Taller</a></li>
            <li><a href="taller.html#taller">Bike Fit</a></li>
            <li><a href="cafe.html#cafe">Café</a></li>
            <li><a href="cafe.html#rewards">Crank Pass</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Información</h5>
          <ul>
            <li><a href="eventos.html#calendario">Calendario</a></li>
            <li><a href="contacto.html#marcas">Marcas</a></li>
            <li><a href="contacto.html#contacto">Contacto</a></li>
            <li><a href="brand-manual.pdf" target="_blank">Manual de marca</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div>© 2026 CRANK EC // CUENCA, ECUADOR</div>
        <div>HECHO CON ☕ Y 🚲 EN LOS ANDES</div>
      </div>
    </div>
  </footer>`;

  const holder = document.getElementById('site-footer');
  if (holder) holder.outerHTML = footer;
  else document.body.insertAdjacentHTML('beforeend', footer);
}

/* ====================== 4. ELEMENTOS GLOBALES (drawer/modal/toast/wa) === */
function injectGlobals() {
  const waSvg = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

  const html = `
  <div class="cart-overlay" id="cartOverlay" onclick="closeCart()"></div>
  <aside class="cart-drawer" id="cartDrawer">
    <div class="cart-header">
      <h3>Tu Carrito</h3>
      <button class="cart-close" onclick="closeCart()" aria-label="Cerrar carrito">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="cart-items" id="cartItems"></div>
    <div class="cart-footer" id="cartFooter" style="display:none">
      <div class="cart-total"><span>Total</span><span class="amount" id="cartTotal">$0</span></div>
      <div class="pay-options">
        <button class="pay-btn whatsapp" onclick="checkoutWhatsApp()">${waSvg} WhatsApp <span class="pay-btn-label">Confirmamos al instante</span></button>
        <button class="pay-btn bank" onclick="openBankModal()">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg>
          Transferencia <span class="pay-btn-label">Banco Pichincha / Pacífico</span>
        </button>
      </div>
      <p class="checkout-note">Al confirmar, te contactaremos para coordinar entrega o retiro en tienda.</p>
    </div>
  </aside>

  <div class="modal-overlay" id="bankModal">
    <div class="modal">
      <h3>Transferencia bancaria</h3>
      <p class="sub">Realiza la transferencia y envíanos el comprobante por WhatsApp para confirmar tu pedido.</p>
      <div class="bank-row"><span>Banco</span><span>${CRANK.bank.banco}</span><button class="copy" onclick="copyText('${CRANK.bank.banco}')" title="Copiar">⧉</button></div>
      <div class="bank-row"><span>Tipo</span><span>${CRANK.bank.tipo}</span><button class="copy" onclick="copyText('${CRANK.bank.tipo}')" title="Copiar">⧉</button></div>
      <div class="bank-row"><span>Número</span><span>${CRANK.bank.numero}</span><button class="copy" onclick="copyText('${CRANK.bank.numero}')" title="Copiar">⧉</button></div>
      <div class="bank-row"><span>RUC / CI</span><span>${CRANK.bank.ruc}</span><button class="copy" onclick="copyText('${CRANK.bank.ruc}')" title="Copiar">⧉</button></div>
      <div class="bank-row"><span>Beneficiario</span><span>${CRANK.bank.beneficiario}</span><button class="copy" onclick="copyText('${CRANK.bank.beneficiario}')" title="Copiar">⧉</button></div>
      <div class="bank-row"><span>Email</span><span>${CRANK.email}</span><button class="copy" onclick="copyText('${CRANK.email}')" title="Copiar">⧉</button></div>
      <div class="modal-cta">
        <button class="cancel" onclick="closeBankModal()">Cerrar</button>
        <button class="confirm" onclick="sendBankReceipt()">Enviar comprobante</button>
      </div>
    </div>
  </div>

  <div class="advisor-overlay" id="advisorOverlay"></div>

  <div class="toast" id="toast"></div>

  <a class="wa-float" href="${wa('Hola%20Crank!%20Tengo%20una%20consulta.')}" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp">${waSvg}</a>`;

  document.body.insertAdjacentHTML('beforeend', html);
}

/* ====================== 5. CARRITO (persistente) ======================== */
let cart = {};
try { cart = JSON.parse(localStorage.getItem('crank_cart') || '{}'); } catch (e) { cart = {}; }
function saveCart() { try { localStorage.setItem('crank_cart', JSON.stringify(cart)); } catch (e) {} }

function renderProducts(filter = 'todo') {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  const filtered = filter === 'todo' ? products : products.filter(p => p.category === filter);
  grid.innerHTML = filtered.map(p => `
    <div class="product reveal" data-category="${p.category}">
      <div class="product-image">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        ${p.tag ? `<span class="product-tag${p.tagLima ? ' lima' : ''}${p.tagMagenta ? ' magenta' : ''}">${p.tag}</span>` : ''}
      </div>
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        ${p.attrs ? `<div class="product-pills">${p.attrs.map((a,i)=>`<span class="pill${i===0?' accent':''}">${a}</span>`).join('')}</div>` : ''}
        ${p.ideal ? `<div class="product-ideal"><strong>Ideal para:</strong> ${p.ideal}</div>` : ''}
        <div class="product-bottom">
          <span class="product-price">$${p.price.toLocaleString()}</span>
          <button class="add-cart-btn" onclick="addToCart(${p.id})">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 5v14M5 12h14"/></svg>
            Añadir
          </button>
        </div>
      </div>
    </div>`).join('');
  observeReveals();
}

function renderEvents() {
  const list = document.getElementById('eventsList');
  if (!list) return;
  list.innerHTML = events.map(e => `
    <div class="event reveal">
      <div class="event-date"><div class="day">${e.day}</div><div class="month">${e.month}</div></div>
      <div class="event-info">
        <h4>${e.title}</h4>
        <div class="meta">
          <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>${e.time}</span>
          ${e.distance ? `<span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h4l3-9 4 18 3-9h4"/></svg>${e.distance}</span>` : ''}
          <span><span class="event-tag ${e.type}">${e.type === 'ride' ? 'Ride' : (e.type === 'female' ? 'Female' : 'Evento')}</span></span>
        </div>
        <div style="font-size:13px;color:var(--text-muted);margin-top:8px;">${e.meta}</div>
      </div>
      <div class="event-cta">
        <a href="${wa(encodeURIComponent('Hola Crank! Quiero apuntarme a: ' + e.title + ' (' + e.day + '/' + e.month + ')'))}" target="_blank" rel="noopener">
          Apuntarme
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>`).join('');
  observeReveals();
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart(); updateCart(); showToast('Añadido al carrito');
}
function changeQty(id, delta) {
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  saveCart(); updateCart();
}
function updateCart() {
  const items = Object.entries(cart);
  const count = items.reduce((s, [, q]) => s + q, 0);
  const total = items.reduce((s, [id, q]) => { const p = products.find(x => x.id === +id); return s + (p ? p.price * q : 0); }, 0);
  const countEl = document.getElementById('cartCount');
  if (countEl) countEl.textContent = count;
  const totalEl = document.getElementById('cartTotal');
  if (totalEl) totalEl.textContent = '$' + total.toLocaleString();
  const footer = document.getElementById('cartFooter');
  if (footer) footer.style.display = count > 0 ? 'block' : 'none';

  const el = document.getElementById('cartItems');
  if (!el) return;
  if (items.length === 0) { el.innerHTML = '<div class="cart-empty">Tu carrito está vacío.<br>Agrega algunos productos.</div>'; return; }
  el.innerHTML = items.map(([id, q]) => {
    const p = products.find(x => x.id === +id); if (!p) return '';
    return `<div class="cart-item">
        <div class="cart-item-image"><img src="${p.img}" alt="${p.name}" /></div>
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">$${(p.price * q).toLocaleString()}</div>
          <div class="cart-qty">
            <button onclick="changeQty(${p.id}, -1)" aria-label="Quitar uno">−</button>
            <span>${q}</span>
            <button onclick="changeQty(${p.id}, 1)" aria-label="Agregar uno">+</button>
          </div>
        </div>
      </div>`;
  }).join('');
}
function openCart() { document.getElementById('cartOverlay').classList.add('open'); document.getElementById('cartDrawer').classList.add('open'); }
function closeCart() { document.getElementById('cartOverlay').classList.remove('open'); document.getElementById('cartDrawer').classList.remove('open'); }

function buildOrderMessage() {
  const items = Object.entries(cart);
  if (items.length === 0) return null;
  let msg = 'Hola Crank! Quiero pedir:%0A%0A'; let total = 0;
  items.forEach(([id, q]) => { const p = products.find(x => x.id === +id); if (p) { msg += `• ${q}x ${p.name} - $${(p.price * q).toLocaleString()}%0A`; total += p.price * q; } });
  msg += `%0ATotal: $${total.toLocaleString()}`;
  return { msg, total };
}
function checkoutWhatsApp() { const o = buildOrderMessage(); if (!o) return; window.open(wa(o.msg), '_blank'); }
function openBankModal() { if (Object.keys(cart).length === 0) return; document.getElementById('bankModal').classList.add('open'); }
function closeBankModal() { document.getElementById('bankModal').classList.remove('open'); }
function sendBankReceipt() {
  const o = buildOrderMessage(); if (!o) return;
  const msg = `Hola Crank! Voy a hacer transferencia para mi pedido:%0A%0A${o.msg.replace('Hola Crank! Quiero pedir:%0A%0A', '')}%0A%0AEnviaré el comprobante por aquí.`;
  window.open(wa(msg), '_blank'); closeBankModal();
}
function copyText(text) { navigator.clipboard.writeText(text).then(() => showToast('Copiado: ' + text)).catch(() => showToast('Copiado: ' + text)); }
function showToast(msg) { const t = document.getElementById('toast'); if (!t) return; t.textContent = msg; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2000); }

/* ====================== 6. FORMULARIOS DE RESERVA → WHATSAPP ============ */
function submitForm(e, type) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  let msg = '';
  if (type === 'compra') {
    msg = `Hola Crank! Quiero comprar:%0A%0ANombre: ${data.nombre}%0ATeléfono: ${data.telefono}%0AEmail: ${data.email}%0AInterés: ${data.interes}`;
    if (data.mensaje) msg += `%0AMensaje: ${data.mensaje}`;
  } else {
    msg = `Hola Crank! Quiero agendar taller:%0A%0ANombre: ${data.nombre}%0ATeléfono: ${data.telefono}%0AServicio: ${data.servicio}%0AFecha: ${data.fecha}`;
    if (data.marca) msg += `%0AMarca: ${data.marca}`;
    if (data.modelo) msg += `%0AModelo: ${data.modelo}`;
    if (data.mensaje) msg += `%0ADetalles: ${data.mensaje}`;
  }
  window.open(wa(msg), '_blank');
  e.target.reset(); showToast('Abriendo WhatsApp...');
}

/* ====================== 7. MENÚ MÓVIL + SCROLL + REVEAL ================= */
function openMobileMenu() { document.getElementById('mobileOverlay').classList.add('open'); document.getElementById('mobilePanel').classList.add('open'); }
function closeMobileMenu() { document.getElementById('mobileOverlay').classList.remove('open'); document.getElementById('mobilePanel').classList.remove('open'); }

function initScrollHeader() {
  const nav = document.getElementById('siteNav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

let _revealObs = null;
function observeReveals() {
  const els = document.querySelectorAll('.reveal:not(.in)');
  if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
  if (!_revealObs) {
    _revealObs = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); _revealObs.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  }
  els.forEach(el => _revealObs.observe(el));
}

/* ====================== 8. FAQ ACORDEÓN ================================ */
function initFaq() {
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const open = item.classList.contains('open');
      item.classList.toggle('open');
      const a = item.querySelector('.faq-a');
      a.style.maxHeight = open ? null : a.scrollHeight + 'px';
    });
  });
}

/* ====================== 9. SLIDER ANTES / DESPUÉS ====================== */
function initBeforeAfter() {
  document.querySelectorAll('.ba-slider').forEach(slider => {
    const after = slider.querySelector('.ba-after');
    const handle = slider.querySelector('.ba-handle');
    let dragging = false;
    const setPos = (clientX) => {
      const r = slider.getBoundingClientRect();
      let pct = ((clientX - r.left) / r.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      after.style.clipPath = `inset(0 0 0 ${pct}%)`;
      handle.style.left = pct + '%';
    };
    const start = () => dragging = true;
    const end = () => dragging = false;
    const move = (x) => { if (dragging) setPos(x); };
    handle.addEventListener('mousedown', start);
    window.addEventListener('mouseup', end);
    window.addEventListener('mousemove', e => move(e.clientX));
    handle.addEventListener('touchstart', start, { passive: true });
    window.addEventListener('touchend', end);
    window.addEventListener('touchmove', e => { if (dragging && e.touches[0]) move(e.touches[0].clientX); }, { passive: true });
    slider.addEventListener('click', e => setPos(e.clientX));
  });
}

/* ====================== 10. FILTROS / TABS ============================= */
function initShopFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(btn.dataset.filter);
    });
  });
}
function initFormTabs() {
  document.querySelectorAll('.form-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.pane;
      document.querySelectorAll('.form-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.form-pane').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const pane = document.querySelector(`.form-pane[data-pane="${target}"]`);
      if (pane) pane.classList.add('active');
    });
  });
}
/* Galería filtrable (opcional) */
function initGalleryFilters() {
  const btns = document.querySelectorAll('[data-gallery-filter]');
  if (!btns.length) return;
  btns.forEach(b => b.addEventListener('click', () => {
    btns.forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    const f = b.dataset.galleryFilter;
    document.querySelectorAll('.gallery-grid > div').forEach(item => {
      item.classList.toggle('hide', f !== 'todo' && item.dataset.cat !== f);
    });
  }));
}

/* ====================== 11. REDIRECCIÓN DE ANCLAS ANTIGUAS ============= */
const LEGACY_HASH = {
  '#disciplinas': 'bicis.html#disciplinas',
  '#tienda': 'bicis.html#tienda',
  '#rewards': 'cafe.html#rewards',
  '#cafe': 'cafe.html#cafe',
  '#taller': 'taller.html#taller',
  '#calendario': 'eventos.html#calendario',
  '#marcas': 'contacto.html#marcas',
  '#galeria': 'cafe.html#galeria',
  '#formulario': 'contacto.html#formulario',
  '#contacto': 'contacto.html#contacto'
};
function handleLegacyHash() {
  if (currentPage() !== 'inicio') return;       // solo en la home antigua
  const h = window.location.hash;
  if (h && LEGACY_HASH[h] && !document.querySelector(h)) {
    window.location.replace(LEGACY_HASH[h]);
  }
}

/* ====================== 12. ASESOR GUIADO ============================== */
const ADVISOR_FLOWS = {
  compra: {
    title: 'Encuentra tu bici',
    sub: 'Responde unas preguntas rápidas y te armamos una recomendación por WhatsApp.',
    steps: [
      { key: 'estilo', q: '¿Qué terreno o estilo te interesa?', type: 'options',
        options: ['Ruta', 'MTB', 'Gravel', 'Urbano / Commuter', 'Bikepacking', 'Niños'] },
      { key: 'nivel', q: '¿Cuál es tu nivel?', type: 'options',
        options: ['Principiante', 'Intermedio', 'Avanzado / Competición'] },
      { key: 'presupuesto', q: '¿Presupuesto aproximado?', type: 'options',
        options: ['Hasta $1.500', '$1.500 – $3.500', '$3.500 – $6.000', '$6.000 o más'] },
      { key: 'uso', q: '¿Para qué la vas a usar?', type: 'options',
        options: ['Fitness / salir a rodar', 'Competir', 'Aventura y viajes', 'Transporte diario'] },
      { key: 'contacto', q: '¿Cómo te contactamos?', type: 'fields',
        fields: [
          { name: 'nombre', label: 'Nombre', type: 'text', required: true, ph: 'Tu nombre' },
          { name: 'telefono', label: 'Teléfono / WhatsApp', type: 'tel', required: true, ph: '+593 99 999 9999' }
        ] }
    ],
    build: (a) => 'Hola Crank! Busqué mi bici con el asesor 🚲%0A%0A'
      + `Estilo/terreno: ${a.estilo || '-'}%0A`
      + `Nivel: ${a.nivel || '-'}%0A`
      + `Presupuesto: ${a.presupuesto || '-'}%0A`
      + `Uso: ${a.uso || '-'}%0A`
      + (a.intencion ? `Motivo: ${a.intencion}%0A` : '')
      + `%0ANombre: ${a.nombre || ''}%0ATeléfono: ${a.telefono || ''}`
  },
  taller: {
    title: 'Agenda tu taller',
    sub: 'Cuéntanos qué necesita tu bici y coordinamos por WhatsApp.',
    steps: [
      { key: 'servicio', q: '¿Qué servicio necesitas?', type: 'options',
        options: ['Mantenimiento básico', 'Mantenimiento completo', 'Servicio de suspensión', 'Bike fit', 'Tubeless setup', 'Armado de bici', 'No estoy seguro'] },
      { key: 'bici', q: '¿Marca y modelo de tu bici?', type: 'fields',
        fields: [
          { name: 'marca', label: 'Marca', type: 'text', required: false, ph: 'Ej: Specialized, Trek...' },
          { name: 'modelo', label: 'Modelo / año', type: 'text', required: false, ph: 'Ej: Tarmac SL7, 2024' }
        ] },
      { key: 'sintoma', q: '¿Qué notas o qué necesita?', type: 'options',
        options: ['Cambios desajustados', 'Frenos', 'Ruido raro', 'Suspensión', 'Revisión general', 'Otro'] },
      { key: 'fecha', q: '¿Fecha preferida?', type: 'fields',
        fields: [{ name: 'fecha', label: 'Fecha', type: 'date', required: true }] },
      { key: 'contacto', q: '¿Cómo te contactamos?', type: 'fields',
        fields: [
          { name: 'nombre', label: 'Nombre', type: 'text', required: true, ph: 'Tu nombre' },
          { name: 'telefono', label: 'Teléfono / WhatsApp', type: 'tel', required: true, ph: '+593 99 999 9999' }
        ] }
    ],
    build: (a) => 'Hola Crank! Quiero agendar taller 🔧%0A%0A'
      + `Servicio: ${a.servicio || '-'}%0A`
      + (a.marca ? `Marca: ${a.marca}%0A` : '')
      + (a.modelo ? `Modelo: ${a.modelo}%0A` : '')
      + `Síntoma: ${a.sintoma || '-'}%0A`
      + `Fecha preferida: ${a.fecha || '-'}%0A`
      + `%0ANombre: ${a.nombre || ''}%0ATeléfono: ${a.telefono || ''}`
  }
};

let _adv = { flow: null, step: 0, answers: {} };

function normalize(s) { return (s || '').toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }

function openAdvisor(mode, prefill) {
  const flow = ADVISOR_FLOWS[mode] || ADVISOR_FLOWS.compra;
  _adv = { flow: mode in ADVISOR_FLOWS ? mode : 'compra', step: 0, answers: Object.assign({}, prefill || {}) };
  renderAdvisor();
  document.getElementById('advisorOverlay').classList.add('open');
}
function closeAdvisor() { document.getElementById('advisorOverlay').classList.remove('open'); }

function renderAdvisor() {
  const flow = ADVISOR_FLOWS[_adv.flow];
  const steps = flow.steps;
  const i = _adv.step;
  const step = steps[i];
  const pct = Math.round(((i) / steps.length) * 100);

  let body = `<div class="q">${step.q}</div>`;
  if (step.type === 'options') {
    body += `<div class="opt-grid">` + step.options.map(o =>
      `<button type="button" class="opt ${_adv.answers[step.key] === o ? 'selected' : ''}" onclick="advisorPick('${step.key}', this)">${o}</button>`).join('') + `</div>`;
  } else {
    body += step.fields.map(f =>
      `<div class="form-field">
        <label>${f.label}${f.required ? ' *' : ''}</label>
        <input type="${f.type}" name="${f.name}" ${f.required ? 'required' : ''} placeholder="${f.ph || ''}" value="${_adv.answers[f.name] || ''}" oninput="advisorField('${f.name}', this.value)">
      </div>`).join('');
  }

  const isLast = i === steps.length - 1;
  const overlay = document.getElementById('advisorOverlay');
  overlay.innerHTML = `
    <div class="advisor" role="dialog" aria-modal="true" aria-label="${flow.title}">
      <div class="advisor-head">
        <div>
          <div class="section-eyebrow" style="margin-bottom:8px;">Asesor Crank · Paso ${i + 1}/${steps.length}</div>
          <h3>${flow.title}</h3>
        </div>
        <button class="cart-close" onclick="closeAdvisor()" aria-label="Cerrar asesor">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="advisor-progress"><span style="width:${pct}%"></span></div>
      <div class="advisor-step active">${body}</div>
      <div class="advisor-nav">
        ${i > 0 ? `<button type="button" class="back" onclick="advisorBack()">← Atrás</button>` : ''}
        <button type="button" class="next" onclick="advisorNext()">${isLast ? 'Enviar por WhatsApp' : 'Siguiente →'}</button>
      </div>
    </div>`;
  updateAdvisorNext();
}

function advisorPick(key, btn) {
  _adv.answers[key] = btn.textContent;
  btn.parentElement.querySelectorAll('.opt').forEach(o => o.classList.remove('selected'));
  btn.classList.add('selected');
  updateAdvisorNext();
}
function advisorField(name, val) { _adv.answers[name] = val; updateAdvisorNext(); }

function stepSatisfied() {
  const step = ADVISOR_FLOWS[_adv.flow].steps[_adv.step];
  if (step.type === 'options') return !!_adv.answers[step.key];
  return step.fields.every(f => !f.required || (_adv.answers[f.name] && _adv.answers[f.name].trim()));
}
function updateAdvisorNext() {
  const btn = document.querySelector('#advisorOverlay .next');
  if (btn) btn.disabled = !stepSatisfied();
}
function advisorBack() { if (_adv.step > 0) { _adv.step--; renderAdvisor(); } }
function advisorNext() {
  if (!stepSatisfied()) return;
  const steps = ADVISOR_FLOWS[_adv.flow].steps;
  if (_adv.step < steps.length - 1) { _adv.step++; renderAdvisor(); }
  else {
    const msg = ADVISOR_FLOWS[_adv.flow].build(_adv.answers);
    window.open(wa(msg), '_blank');
    closeAdvisor();
    showToast('Abriendo WhatsApp...');
  }
}

/* Disparadores / triggers que abren el asesor (data-advisor / data-estilo / data-intencion / data-servicio) */
let _pendingPrefill = {};   // se completa con ?estilo= para pre-cargar el asesor
function initAdvisorTriggers() {
  document.querySelectorAll('[data-advisor]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const mode = el.dataset.advisor;
      const prefill = Object.assign({}, mode === 'compra' ? _pendingPrefill : {});
      if (el.dataset.estilo) prefill.estilo = matchOption('compra', 'estilo', el.dataset.estilo);
      if (el.dataset.servicio) prefill.servicio = matchOption('taller', 'servicio', el.dataset.servicio);
      if (el.dataset.intencion) prefill.intencion = el.dataset.intencion;
      openAdvisor(mode, prefill);
    });
  });
}
/* Empareja un valor de URL/data-attr con una opción real del flujo */
function matchOption(flow, key, raw) {
  const step = ADVISOR_FLOWS[flow].steps.find(s => s.key === key);
  if (!step) return raw;
  const found = step.options.find(o => normalize(o).includes(normalize(raw)) || normalize(raw).includes(normalize(o.split(' ')[0])));
  return found || raw;
}

/* Preselección por parámetros de URL: ?estilo= / ?intencion= / ?servicio= / ?asesor= */
function applyShopEstilo(estilo) {
  // Pre-filtra la tienda si el estilo coincide con una categoría existente
  const cat = normalize(estilo);
  const map = { ruta: 'ruta', mtb: 'mtb', gravel: 'gravel' };
  const target = map[cat];
  if (!target) return;
  const btn = document.querySelector(`.filter-btn[data-filter="${target}"]`);
  if (btn) btn.click();
}
function handleAdvisorParams() {
  const p = new URLSearchParams(window.location.search);
  const estilo = p.get('estilo'), intencion = p.get('intencion'), servicio = p.get('servicio'), asesor = p.get('asesor');
  if (servicio || asesor === 'taller') {
    openAdvisor('taller', servicio ? { servicio: matchOption('taller', 'servicio', servicio) } : {});
  } else if (intencion || asesor === 'compra') {
    const pre = {};
    if (estilo) pre.estilo = matchOption('compra', 'estilo', estilo);
    if (intencion) pre.intencion = intencion;
    openAdvisor('compra', pre);
  } else if (estilo) {
    // Solo estilo: pre-filtra la tienda y deja el asesor pre-cargado (sin abrirlo)
    _pendingPrefill = { estilo: matchOption('compra', 'estilo', estilo) };
    applyShopEstilo(estilo);
  }
}

/* ====================== 13. INIT ====================================== */
document.addEventListener('DOMContentLoaded', () => {
  handleLegacyHash();
  injectHeader();
  injectFooter();
  injectGlobals();
  renderProducts();
  renderEvents();
  updateCart();
  initScrollHeader();
  initShopFilters();
  initFormTabs();
  initGalleryFilters();
  initFaq();
  initBeforeAfter();
  initAdvisorTriggers();
  observeReveals();
  handleAdvisorParams();
});
