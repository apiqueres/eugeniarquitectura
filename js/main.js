/* =====================================================================
   ARQUITECTURA EUGENIO MORENO — main.js
   ---------------------------------------------------------------------
   1. Utilidades y detección de capacidades
   2. Ilustraciones SVG inline (fachada, rayos X, iconos, fases, skyline)
   3. Render de secciones a partir de window.CONTENT
   4. Sistemas: Lenis, cabecera, menú, cursor, preloader, reveals,
      inspección, manifiesto, contadores, timeline, proceso, proyectos,
      panel, formulario, footer
   5. Arranque
   ===================================================================== */
(() => {
  'use strict';

  const C = window.CONTENT;
  if (!C) { console.error('Falta js/content.js'); return; }

  /* ------------------------------------------------------------------
     1. Utilidades
  ------------------------------------------------------------------ */
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = (n, l = 2) => String(n).padStart(l, '0');

  const reduced     = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isDesktop   = () => window.innerWidth >= 900;
  let hasGSAP = false; // se resuelve cuando las librerías (async) han cargado

  if (reduced) document.body.classList.add('no-motion');

  /** Titular partido en líneas con máscara. */
  const lines = (el, arr) => {
    el.innerHTML = arr.map((l) => `<span class="line"><span>${esc(l)}</span></span>`).join('');
  };
  /** Crucetas de replanteo en las 4 esquinas. */
  const corners = (el) => {
    ['tl', 'tr', 'bl', 'br'].forEach((p) => {
      const i = document.createElement('i');
      i.className = `crs crs--${p}`;
      el.appendChild(i);
    });
  };
  /** Botón con texto "rodillo". */
  const roll = (text) => `<span class="btn__roll"><span>${esc(text)}</span><span aria-hidden="true">${esc(text)}</span></span>`;

  /* ------------------------------------------------------------------
     2. Ilustraciones SVG
  ------------------------------------------------------------------ */
  const SVG = {};

  /** Mini-ilustraciones de servicios (64×64). */
  SVG.icons = {
    edificacion:    '<path d="M12 56V20l20-10 20 10v36M12 56h40"/><rect x="24" y="40" width="16" height="16"/><rect x="18" y="26" width="8" height="8"/><rect x="38" y="26" width="8" height="8"/>',
    rehabilitacion: '<rect x="14" y="12" width="36" height="44"/><path d="M8 56h48"/><path d="M32 12l-4 10 6 8-5 9 4 8 -3 9"/><rect x="18" y="18" width="7" height="8"/><rect x="39" y="18" width="7" height="8"/><rect x="18" y="34" width="7" height="8"/><rect x="39" y="34" width="7" height="8"/>',
    urbanismo:      '<path d="M18 8h20l10 10v38H18z"/><path d="M38 8v10h10"/><path d="M24 30h16M24 36h16"/><circle cx="32" cy="46" r="7"/><path d="M28.5 46l2.5 2.5 4.5-5"/>',
    comunidades:    '<path d="M10 56V20h44v36M10 56h44M22 20v-8h20v8"/><path d="M4 40h10l4-8 6 16 4-10 3 4h29"/>',
    interiorismo:   '<rect x="10" y="10" width="44" height="44"/><path d="M32 10v18M10 32h22"/><path d="M32 28a10 10 0 0 1 10 10"/><rect x="15" y="38" width="12" height="9"/><circle cx="44" cy="44" r="5"/>',
    peritajes:      '<circle cx="27" cy="27" r="15"/><path d="M38 38l16 16"/><path d="M20 20l5 6-3 5 5 6"/>',
    tasaciones:     '<path d="M32 10v44M22 54h20M14 20h36"/><path d="M14 20l-8 16h16zM50 20l-8 16h16z"/>',
    energia:        '<path d="M10 14h16l4 4-4 4H10zM10 26h22l4 4-4 4H10zM10 38h28l4 4-4 4H10z"/><path d="M52 50V16M48 20l4-4 4 4"/>',
  };

  /** Dibujos de las 4 fases (400×400), con pathLength=1 para animar el trazo. */
  const P = (d, cls = '') => `<path d="${d}"${cls ? ` class="${cls}"` : ''} pathLength="1"/>`;
  SVG.stages = {
    observar: [
      P('M60 80h200v240H60z'), P('M60 140h200M60 200h200M60 260h200'),
      P('M90 100h40v28H90zM170 100h40v28h-40zM90 160h40v28H90zM170 160h40v28h-40zM90 220h40v28H90zM170 220h40v28h-40z'),
      P('M60 340h200M60 334v12M260 334v12'), '<text x="160" y="358" text-anchor="middle">8,40</text>',
      `<circle cx="290" cy="230" r="58" class="acc" pathLength="1"/>`, P('M332 272l40 40', 'acc'), P('M272 214l10 14-8 12 10 14', 'acc'),
    ].join(''),
    diagnosticar: [
      P('M80 60h160l40 40v240H80z'), P('M240 60v40h40'), P('M110 130h140M110 150h100'),
      P('M110 190h14v14h-14zM110 220h14v14h-14zM110 250h14v14h-14z'), P('M114 197l4 4 6-8M114 227l4 4 6-8M114 257l4 4 6-8', 'acc'),
      P('M134 197h100M134 227h80M134 257h110'), P('M110 300l40 0 10-14 10 14 8-8 6 8h56', 'acc'),
    ].join(''),
    proyectar: [
      P('M60 60h280v280H60z'), P('M200 60v130M60 190h140M200 190h140M200 260v80'),
      P('M200 120a32 32 0 0 1 32 32', 'acc'), P('M150 190a32 32 0 0 0-32-32', 'acc'), P('M200 300a32 32 0 0 0-32 32', 'acc'),
      P('M100 60v8M140 60v8M260 60v8M300 60v8M340 100h-8M340 140h-8M340 240h-8M340 280h-8'),
      P('M60 360h280M60 354v12M340 354v12'), '<text x="200" y="378" text-anchor="middle">14,00</text>',
      '<text x="120" y="130">EST.</text><text x="255" y="130">DORM.</text><text x="120" y="280">SALÓN</text><text x="255" y="280">COC.</text>',
    ].join(''),
    dirigir: [
      P('M60 180h180v160H60z'), P('M60 240h180M60 300h180'), P('M90 200h30v24H90zM150 200h30v24h-30zM90 260h30v24H90zM150 260h30v24h-30z'),
      P('M248 340V150M278 340V150M248 150h30M248 200h30M248 250h30M248 300h30M248 200l30-50M248 250l30-50M248 300l30-50'),
      P('M330 340V60M200 60h190M330 60l-30-30 90 30M360 60h24v14h-24z'),
      P('M230 60v70', 'acc'), P('M224 130h12l-6 10z', 'acc'), P('M30 340h360'),
    ].join(''),
  };

  /** Skyline del footer (1440×220). */
  SVG.skyline = `<svg viewBox="0 0 1440 220" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <path pathLength="1" d="M0 200H80V120H140V90H170V120H230V200H280V60H300V40H360V60H380V200H440V140H520V200H580V100H600V80H700V100H720V200H800V130H860V110H900V130H960V200H1020V70H1040V50H1110V70H1130V200H1200V150H1280V200H1340V120H1400V200H1440"/>
    <path pathLength="1" class="acc" d="M330 40V12M322 20h16"/>
    <path pathLength="1" d="M0 208H1440" opacity=".4"/>
  </svg>`;

  SVG.wa = `<svg viewBox="0 0 24 24" aria-hidden="true" style="fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round"><path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.9-1.3A9.5 9.5 0 1 0 12 2.5z"/><path d="M8.6 7.8c.3-.4.9-.4 1.2 0l1 1.6c.2.3.1.7-.1 1l-.6.6c.6 1.3 1.6 2.3 2.9 2.9l.6-.6c.3-.2.7-.3 1-.1l1.6 1c.4.3.4.9 0 1.2l-.8.8c-.5.5-1.3.7-2 .4a10 10 0 0 1-5.5-5.5c-.3-.7-.1-1.5.4-2z"/></svg>`;

  /* ------------------------------------------------------------------
     3. Render de secciones
  ------------------------------------------------------------------ */
  const imgFor = (p) => (p.images && p.images[0]) || `assets/img/proyecto-${p.n}.webp`;
  const galleryFor = (p) => p.images || [imgFor(p), imgFor(p), imgFor(p)];
  /** srcset 1x/2x si existe la variante @2x (convención nombre@2x.webp). */
  const srcset = (src) => src.endsWith('.webp') && !src.includes('@2x') ? ` srcset="${esc(src)} 1x, ${esc(src.replace('.webp', '@2x.webp'))} 2x"` : '';

  function renderNav() {
    $('#nav').innerHTML = C.nav.map((n, i) => `<a href="#${n.id}" data-scroll data-section="${n.id}"><b>[${pad(i + 1)}]</b>${esc(n.label)}</a>`).join('');
    $('#menu-list').innerHTML = C.nav.map((n, i) => `<li><a href="#${n.id}" data-scroll><b>[${pad(i + 1)}]</b>${esc(n.label)}</a></li>`).join('');
    $('#menu-foot').innerHTML = `<a href="tel:${esc(C.site.phoneHref)}">${esc(C.site.phone)}</a><a href="mailto:${esc(C.site.email)}">${esc(C.site.email)}</a><span>${esc(C.site.coordsLabel)}</span>`;
    $('#pre-steps').innerHTML = C.preloader.steps.map((s, i) => `<li>${pad(i + 1, 3)} ${esc(s)}</li>`).join('');
  }

  function renderHero() {
    const h = C.hero;
    $('#hero-label').textContent = h.label;
    lines($('#hero-title'), h.titleLines);
    $('#hero-sub').textContent = h.subtitle;
    $('#cta-primary-1').textContent = $('#cta-primary-2').textContent = C.cta.primary;
    $('#cta-secondary-1').textContent = $('#cta-secondary-2').textContent = C.cta.secondary;
    $('#hero-benefits').innerHTML = h.benefits.map((b) => `<li>${esc(b)}</li>`).join('');
    const img = $('#scene-img');
    img.src = h.scene.src; img.alt = h.scene.alt;
    if (h.scene.src.endsWith('.webp')) {
      img.setAttribute('srcset', `${h.scene.src} 1200w, ${h.scene.src.replace('.webp', '@2x.webp')} 2000w`);
      img.setAttribute('sizes', '100vw');
    }
    $('#scene').setAttribute('aria-label', h.scene.alt);
    $('#scene-label').textContent = h.inspectLabel;
    $('#inspect-hint').textContent = h.inspectHint;
    $('#inspect-count-label').textContent = h.inspectCounterLabel;
    $('#inspect-count').textContent = `0/${h.annotations.length}`;
    $('#inspect-notes').innerHTML = h.annotations.map((a) => {
      const cls = ['note', a.x > 55 ? 'note--left' : '', (a.up || a.y > 78) ? 'note--up' : ''].filter(Boolean).join(' ');
      return `<div class="${cls}" data-id="${a.id}" data-x="${a.x}" data-y="${a.y}"><span class="note__dot"></span><span class="note__line"></span><span class="note__box"><b>${esc(a.code)}</b>${esc(a.text)}</span></div>`;
    }).join('');
    $('#inspect-notes-a11y').innerHTML = h.annotations.map((a) => `<li>${esc(a.code)}: ${esc(a.text)}</li>`).join('');
  }

  function renderManifesto() {
    $('#manifesto').innerHTML = C.manifesto.split(' ').map((w) => `<span class="w">${esc(w)}</span>`).join(' ');
    $('#stats').innerHTML = C.stats.map((s) => `<li><div class="stats__num"><i>${esc(s.prefix)}</i><span data-count="${s.value}">0</span><i>${esc(s.suffix)}</i></div><div class="mono label">${esc(s.label)}</div></li>`).join('');
  }

  function renderAbout() {
    const a = C.about;
    $('#about-label').textContent = a.label;
    lines($('#about-title'), a.titleLines);
    $('#about-photo').innerHTML = `<img src="${esc(a.portrait.src)}"${srcset(a.portrait.src)} alt="${esc(a.portrait.alt)}" width="600" height="800" loading="lazy" decoding="async">`;
    $('#about-sheet').innerHTML = a.sheet.map((r) => `<dt>${esc(r.k)}</dt><dd>${esc(r.v)}</dd>`).join('');
    $('#about-text').innerHTML = a.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('');
    const li = $('#about-linkedin'); li.href = C.site.linkedin; li.textContent = a.linkedinLabel;
    $('#timeline-label').textContent = a.timelineLabel;
    $('#timeline-hint').textContent = a.timelineHint;
    $('#timeline-list').innerHTML = a.timeline.map((t, i) => `<li><span class="n">${pad(i + 1)}</span><span class="t">${esc(t.title)}${t.org ? `<span class="o">${esc(t.org)}</span>` : ''}</span></li>`).join('');
  }

  function renderServices() {
    const s = C.services;
    $('#services-label').textContent = s.label;
    lines($('#services-title'), s.titleLines);
    $('#services-intro').textContent = s.intro;
    $('#services-grid').innerHTML = s.items.map((it, i) => `
      <article class="card" id="srv-${esc(it.id)}">
        <div class="card__top"><span class="mono card__tag">${esc(it.tag)}</span><span class="card__n">[${pad(i + 1)}]</span></div>
        <h3 class="card__title">${it.titleLines.map((l) => `<span>${esc(l)}</span>`).join('')}</h3>
        <p class="card__desc">${esc(it.desc)}</p>
        ${it.quote ? `<p class="card__quote">${esc(it.quote)}</p>` : ''}
        <details><summary>${esc(s.listToggle)}</summary><ul>${it.list.map((l) => `<li>${esc(l)}</li>`).join('')}</ul></details>
        <div class="card__ico" aria-hidden="true"><svg viewBox="0 0 64 64">${SVG.icons[it.id] || ''}</svg></div>
      </article>`).join('');

    const p = C.process;
    $('#process-label').textContent = p.label;
    lines($('#process-title'), p.titleLines);
    $('#process-hint').textContent = p.hint;
    $('#process-steps').innerHTML = p.steps.map((st, i) => `<li data-step="${i}"><span class="n">${pad(i + 1)}</span><span><span class="w">${esc(st.word)}</span><span class="d">${esc(st.text)}</span></span></li>`).join('');
    $('#process-stage').innerHTML = p.steps.map((st, i) => `<svg viewBox="0 0 400 400" data-stage="${i}" aria-hidden="true">${SVG.stages[st.id] || ''}</svg>`).join('') + `<div class="stage__label"><i id="stage-n">01</i> / ${pad(p.steps.length)} — <span id="stage-w">${esc(p.steps[0].word)}</span></div>`;
  }

  function renderProjects() {
    const p = C.projects;
    $('#projects-label').textContent = p.label;
    lines($('#projects-title'), p.titleLines);
    $('#filters').innerHTML = p.filters.map((f) => {
      const count = f.id === 'todos' ? p.items.length : p.items.filter((x) => x.type === f.id).length;
      return `<button type="button" data-filter="${f.id}" aria-pressed="${f.id === 'todos'}">${esc(f.label)}<span class="count">${pad(count)}</span></button>`;
    }).join('');
    $('#index-head').innerHTML = p.columns.map((c) => `<span>${esc(c)}</span>`).join('');
    $('#index-list').innerHTML = p.items.map((it, i) => `
      <li class="row" data-type="${esc(it.type)}" data-index="${i}">
        <button type="button" data-cursor="ver" aria-haspopup="dialog">
          <span class="n">${esc(it.n)}</span>
          <span class="t">${esc(it.name)}</span>
          <span class="m m--type">${esc(p.typeLabels[it.type])}</span>
          <span class="m m--place">${esc(it.place)}</span>
          <span class="thumb"><img src="${esc(imgFor(it))}"${srcset(imgFor(it))} alt="${esc(it.name)}, ${esc(p.typeLabels[it.type])} en ${esc(it.place)}" width="800" height="600" loading="lazy" decoding="async"></span>
          <span class="arrow" aria-hidden="true">VER ↗</span>
        </button>
      </li>`).join('');
    $('#projects-hint').textContent = p.hint;
  }

  function renderContact() {
    const c = C.contact, f = c.form;
    $('#contact-label').textContent = c.label;
    lines($('#contact-title'), c.titleLines);
    $('#contact-sub').textContent = c.subtitle;
    const field = (name, type, extra = '', full = false) => `
      <div class="field${full ? ' field--full' : ''}" data-field="${name}">
        <label for="f-${name}">${esc(f[name].label)} <i aria-hidden="true">*</i></label>
        ${type === 'textarea'
          ? `<textarea id="f-${name}" name="${name}" placeholder="${esc(f[name].placeholder)}" required></textarea>`
          : `<input id="f-${name}" name="${name}" type="${type}" placeholder="${esc(f[name].placeholder)}" ${extra} required>`}
        <span class="field__err" aria-live="polite"></span>
      </div>`;
    $('#form').innerHTML = `
      ${field('name', 'text', 'autocomplete="name"')}
      ${field('phone', 'tel', 'autocomplete="tel" inputmode="tel"')}
      ${field('email', 'email', 'autocomplete="email" inputmode="email"')}
      <div class="field" data-field="service">
        <label for="f-service">${esc(f.service.label)} <i aria-hidden="true">*</i></label>
        <select id="f-service" name="service" required>
          <option value="" disabled selected>${esc(f.service.placeholder)}</option>
          ${C.services.items.map((s) => `<option value="${esc(s.tag)}">${esc(s.tag)} — ${esc(s.titleLines.join(' '))}</option>`).join('')}
        </select>
        <span class="field__err" aria-live="polite"></span>
      </div>
      <div class="field field--full" data-field="location">
        <label for="f-location">${esc(f.location.label)}</label>
        <input id="f-location" name="location" type="text" placeholder="${esc(f.location.placeholder)}" autocomplete="address-level2">
        <span class="field__err"></span>
      </div>
      ${field('message', 'textarea', '', true)}
      <div class="field field--check" data-field="privacy">
        <input id="f-privacy" name="privacy" type="checkbox" required>
        <label for="f-privacy">${f.privacy.label}</label>
        <span class="field__err" aria-live="polite"></span>
      </div>
      <div class="form__actions">
        <button class="btn btn--primary" type="submit">${roll(f.submit)}</button>
        <span class="form__server" aria-live="polite" id="form-server"></span>
      </div>
      <div class="form__success" aria-live="polite">
        <svg viewBox="0 0 72 72" aria-hidden="true"><path pathLength="1" d="M8 8h56v56H8z"/><path pathLength="1" d="M22 37l10 10 20-22"/></svg>
        <h3>${esc(f.success.title)}</h3>
        <p>${esc(f.success.text)}</p>
        <button class="btn" type="button" id="form-again">${roll(f.success.again)}</button>
      </div>`;

    $('#contact-data-label').textContent = c.dataLabel;
    $('#contact-data').innerHTML = c.data.map((d) => `<dt>${esc(d.k)}</dt><dd>${d.href ? `<a href="${esc(d.href)}">${esc(d.v)}</a>` : esc(d.v)}</dd>`).join('');
    const wa = $('#wa-link');
    wa.href = `https://wa.me/${C.site.whatsapp}?text=${encodeURIComponent(C.site.whatsappText)}`;
    wa.innerHTML = `${SVG.wa}${roll(c.whatsapp)}`;
    const tel = $('#tel-link');
    tel.href = `tel:${C.site.phoneHref}`;
    tel.innerHTML = roll(`${c.call} · ${C.site.phone}`);
    $('#map-label').textContent = c.mapLabel;
    const { lat, lng } = C.site.coords;
    $('#map').src = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.006},${lat - 0.004},${lng + 0.006},${lat + 0.004}&layer=mapnik`;
  }

  function renderFooter() {
    const f = C.footer;
    $('#footer-tagline').textContent = C.site.tagline;
    $('#footer-services-label').textContent = f.servicesLabel;
    $('#footer-services').innerHTML = C.services.items.map((s) => `<li><a href="#srv-${esc(s.id)}" data-scroll>${esc(s.titleLines.join(' '))}</a></li>`).join('');
    $('#footer-contact-label').textContent = f.contactLabel;
    $('#footer-contact').innerHTML = `
      <li><a href="tel:${esc(C.site.phoneHref)}">${esc(C.site.phone)}</a></li>
      <li><a href="mailto:${esc(C.site.email)}">${esc(C.site.email)}</a></li>
      ${C.site.addressLines.map((l) => `<li>${esc(l)}</li>`).join('')}
      <li><a href="${esc(C.site.linkedin)}" target="_blank" rel="noopener">LinkedIn ↗</a></li>`;
    $('#footer-legal-label').textContent = f.legalLabel;
    $('#footer-legal').innerHTML = f.legal.map((l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`).join('');
    $('#skyline').innerHTML = SVG.skyline;
    $('#footer-copy').textContent = f.copyright;
    $('#footer-top').textContent = f.top;
  }

  /* ------------------------------------------------------------------
     4. Sistemas
  ------------------------------------------------------------------ */
  let lenis = null;

  /** Smooth scroll (Lenis) sincronizado con GSAP. */
  function initLenis() {
    if (reduced || typeof Lenis === 'undefined' || !hasGSAP) return;
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /** Navegación por anclas. */
  function scrollTo(target) {
    const el = typeof target === 'string' ? $(target) : target;
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 });
    else el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }
  function initAnchors() {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[data-scroll]');
      if (!a) return;
      const hash = a.getAttribute('href');
      if (!hash || !hash.startsWith('#')) return;
      e.preventDefault();
      closeMenu();
      scrollTo(hash);
      history.replaceState(null, '', hash);
    });
  }

  /** Cabecera: se oculta al bajar, aparece al subir; cambia de color sobre papel. */
  function initHeader() {
    const header = $('#header');
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 40);
      if (y > 200 && y > last + 4) header.classList.add('is-hidden');
      else if (y < last - 4) header.classList.remove('is-hidden');
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    if (!hasGSAP) return;
    // Ancla activa
    const links = $$('#nav a');
    C.nav.forEach((n) => {
      const sec = $(`#${n.id}`);
      if (!sec) return;
      ScrollTrigger.create({
        trigger: sec, start: 'top 50%', end: 'bottom 50%',
        onToggle: (self) => links.forEach((l) => l.classList.toggle('is-active', self.isActive && l.dataset.section === n.id)),
      });
    });
  }

  /** Menú móvil a pantalla completa. */
  let menuOpen = false;
  function closeMenu() {
    if (!menuOpen) return;
    menuOpen = false;
    $('#menu').classList.remove('is-open');
    $('#menu').setAttribute('aria-hidden', 'true');
    $('#burger').setAttribute('aria-expanded', 'false');
    $('#burger').setAttribute('aria-label', 'Abrir menú');
    document.body.classList.remove('is-locked');
    if (lenis) lenis.start();
  }
  function initMenu() {
    const burger = $('#burger');
    burger.addEventListener('click', () => {
      if (menuOpen) return closeMenu();
      menuOpen = true;
      $('#menu').classList.add('is-open');
      $('#menu').setAttribute('aria-hidden', 'false');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Cerrar menú');
      document.body.classList.add('is-locked');
      if (lenis) lenis.stop();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (window.innerWidth >= 1024) closeMenu(); });
  }

  /** Cursor técnico con lectura X/Y y estado "VER" sobre enlaces. */
  function initCursor() {
    if (!finePointer || reduced || !hasGSAP) return;
    const cur = $('.cursor'), xy = $('.cursor__xy');
    document.body.classList.add('has-cursor');
    const pos = { x: innerWidth / 2, y: innerHeight / 2 }, target = { ...pos };
    let shown = false;
    window.addEventListener('mousemove', (e) => {
      target.x = e.clientX; target.y = e.clientY;
      if (!shown) { shown = true; pos.x = target.x; pos.y = target.y; }
      cur.classList.remove('is-hidden');
    }, { passive: true });
    document.documentElement.addEventListener('mouseleave', () => cur.classList.add('is-hidden'));
    gsap.ticker.add(() => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      cur.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      xy.textContent = `X: ${pad(Math.round(pos.x), 4)} / Y: ${pad(Math.round(pos.y + window.scrollY), 4)}`;
    });
    const isLink = (el) => el.closest && el.closest('a, button, summary, [data-cursor], input[type="range"], label');
    document.addEventListener('mouseover', (e) => { if (isLink(e.target)) cur.classList.add('is-link'); });
    document.addEventListener('mouseout', (e) => { if (isLink(e.target)) cur.classList.remove('is-link'); });
  }

  /** Preloader de obra: contador 000–100 % + lista de fases. Solo primera visita. */
  let showPreloader = false;
  /** Se ejecuta en el render (antes de las librerías) para que el preloader cubra la página desde el primer frame. */
  function preparePreloader() {
    let seen = false;
    try { seen = sessionStorage.getItem('arq-pre') === '1'; } catch (e) { /* almacenamiento bloqueado */ }
    showPreloader = !seen && !reduced;
    if (!showPreloader) { $('#preloader').remove(); return; }
    try { sessionStorage.setItem('arq-pre', '1'); } catch (e) { /* ignorar */ }
    $('#preloader').classList.add('is-active');
    document.body.classList.add('is-locked');
  }
  function initPreloader(onDone) {
    const pre = $('#preloader');
    if (!showPreloader || !hasGSAP) {
      if (pre) pre.remove();
      document.body.classList.remove('is-locked');
      onDone();
      return;
    }
    if (lenis) lenis.stop();
    const count = $('#pre-count'), steps = $$('#pre-steps li'), curtain = $('.preloader__curtain');
    const obj = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        pre.remove();
        document.body.classList.remove('is-locked');
        if (lenis) lenis.start();
        onDone();
      },
    });
    tl.to(obj, {
      v: 100, duration: 1.7, ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(obj.v);
        count.textContent = pad(v, 3);
        steps.forEach((li, i) => li.classList.toggle('is-done', v >= ((i + 1) / steps.length) * 100 - 1));
      },
    })
      .to(curtain, { scaleY: 1, transformOrigin: 'bottom', duration: 0.35, ease: 'power3.in' })
      .to(pre, { yPercent: -100, duration: 0.45, ease: 'power3.inOut' });
  }

  /** Reveals: titulares línea a línea, etiquetas con tecleo, contadores. */
  function playLines(el) {
    const spans = $$('.line > span', el);
    if (!hasGSAP || reduced) { spans.forEach((s) => (s.style.transform = 'none')); return; }
    gsap.to(spans, { y: 0, duration: 1, ease: 'power4.out', stagger: 0.09, overwrite: true });
  }
  function typeIn(el) {
    const text = el.dataset.text ?? el.textContent;
    el.dataset.text = text;
    if (reduced) { el.textContent = text; return; }
    const w = el.getBoundingClientRect().width;
    if (w) el.style.minWidth = `${Math.min(w, el.parentElement.clientWidth)}px`;
    el.textContent = '';
    let i = 0;
    const step = () => {
      el.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(step, 14);
    };
    step();
  }
  function initReveals() {
    // Hero se lanza tras el preloader (ver boot); el resto al entrar en viewport.
    $$('[data-lines]').forEach((el) => {
      if (el.id === 'hero-title') return;
      if (!hasGSAP || reduced) return playLines(el);
      ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => playLines(el) });
    });
    $$('[data-typing]').forEach((el) => {
      if (el.id === 'hero-label') return;
      if (!hasGSAP || reduced) return;
      ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => typeIn(el) });
    });
    $$('[data-count]').forEach((el) => {
      const end = Number(el.dataset.count);
      if (!hasGSAP || reduced) { el.textContent = end; return; }
      const o = { v: 0 };
      ScrollTrigger.create({
        trigger: el, start: 'top 90%', once: true,
        onEnter: () => gsap.to(o, { v: end, duration: 1.6, ease: 'power3.out', onUpdate: () => (el.textContent = Math.round(o.v)) }),
      });
    });
    // Tarjetas de servicio, filas y cifras: entrada suave
    if (hasGSAP && !reduced) {
      gsap.utils.toArray('.card, .row, .stats__list li').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
      });
    }
  }

  /** Portada: al hacer scroll el texto desaparece, la fachada crece hasta llenar la pantalla
      y las anotaciones técnicas se van identificando una a una. */
  function initHeroScene() {
    const pin = $('#hero-pin'), scene = $('#scene'), copy = $('#hero-copy'), ui = $('#scene-ui'), hint = $('#inspect-hint');
    const notes = $$('#inspect-notes .note'), count = $('#inspect-count'), bar = $('#scene-progress');
    const total = notes.length;
    // En desktop las anotaciones se acumulan; en móvil solo se muestra la actual (una cada vez).
    const setFound = (n, all = false) => {
      const solo = !all && !isDesktop();
      notes.forEach((el, i) => el.classList.toggle('is-found', solo ? i === n - 1 : i < n));
      count.textContent = `${n}/${total}`;
    };
    // Coloca cada anotación sobre la imagen según su rectángulo actual (píxeles enteros: sin desenfoque).
    const place = () => {
      const r = scene.getBoundingClientRect(), pr = pin.getBoundingClientRect();
      notes.forEach((n) => {
        const x = Math.round(r.left - pr.left + (+n.dataset.x / 100) * r.width);
        const y = Math.round(r.top - pr.top + (+n.dataset.y / 100) * r.height);
        n.style.transform = `translate(${x}px, ${y}px)`;
      });
    };
    window.addEventListener('resize', place);
    $('#scene-img').addEventListener('load', place);
    if (!hasGSAP || reduced) {
      scene.classList.add('is-static', 'is-open');
      setFound(total, true);
      ui.style.opacity = 1; bar.style.width = '100%';
      place(); requestAnimationFrame(place);
      return;
    }
    const HEAD = 72; // alto de la cabecera, para centrar la escena bajo ella
    // Transformación que lleva la caja 4:3 a ocupar la pantalla (ajuste "contain" con leve sobreescala en desktop).
    const cover = () => {
      const w = scene.offsetWidth, h = scene.offsetHeight, W = pin.clientWidth, H = pin.clientHeight - HEAD;
      const s = Math.min(W / w, H / h) * (isDesktop() ? 1.04 : 1);
      const cx = scene.offsetLeft + w / 2, cy = scene.offsetTop + h / 2 + yStart();
      return { s, x: W / 2 - cx, y: HEAD + H / 2 - cy };
    };
    // En desktop la caja parte centrada verticalmente (equivalente a translateY(-50%)).
    const yStart = () => (isDesktop() ? -scene.offsetHeight / 2 : 0);
    gsap.set(scene, { y: yStart });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#inicio', start: 'top top', end: () => `+=${window.innerHeight * 3.2}`,
        pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true,
        onRefresh: () => { gsap.set(scene, { y: yStart() }); place(); },
        onUpdate: (self) => {
          const p = self.progress;
          place();
          scene.classList.toggle('is-open', p > 0.22);
          // Anotaciones: se revelan entre el 32 % y el 95 % del recorrido
          const n = Math.max(0, Math.min(total, Math.floor(((p - 0.32) / 0.63) * total + 1)));
          setFound(n);
          bar.style.width = `${Math.max(0, Math.min(1, (p - 0.3) / 0.7)) * 100}%`;
          hint.style.opacity = p > 0.9 ? 0 : 1;
        },
      },
    });
    tl.to(copy, { opacity: 0, y: -60, duration: 1, ease: 'power2.in', force3D: false }, 0)
      .to(scene, { scale: () => cover().s, x: () => cover().x, y: () => yStart() + cover().y, duration: 1.3, ease: 'power2.inOut' }, 0)
      .to(ui, { opacity: 1, duration: 0.4 }, 1.0)
      .to({}, { duration: 3 }); // recorrido reservado para las anotaciones
    setFound(0);
    place(); requestAnimationFrame(place);
  }

  /** Manifiesto: las palabras se encienden con el scroll. */
  function initManifesto() {
    const words = $$('#manifesto .w');
    if (!hasGSAP || reduced) { words.forEach((w) => w.classList.add('is-on')); return; }
    ScrollTrigger.create({
      trigger: '#manifesto', start: 'top 80%', end: 'bottom 45%', scrub: true,
      onUpdate: (self) => {
        const n = Math.round(self.progress * words.length);
        words.forEach((w, i) => w.classList.toggle('is-on', i < n));
      },
    });
  }

  /** Timeline de formación: las credenciales entran una a una desde los bordes exteriores
      (impares desde la izquierda, pares desde la derecha). En desktop la sección queda fijada. */
  function initTimeline() {
    const wrap = $('#timeline'), items = $$('#timeline-list li'), bar = $('#timeline-progress');
    if (!hasGSAP || reduced) { items.forEach((li) => li.classList.add('is-in')); bar.style.width = '100%'; return; }
    if (!isDesktop()) {
      // Móvil: cada credencial entra desde su lado al llegar a pantalla.
      items.forEach((li) => ScrollTrigger.create({ trigger: li, start: 'top 90%', once: true, onEnter: () => li.classList.add('is-in') }));
      bar.style.width = '100%';
      return;
    }
    wrap.classList.add('is-pinned');
    const setActive = (p) => {
      const idx = Math.min(items.length - 1, Math.floor(p * items.length));
      items.forEach((li, i) => { li.classList.toggle('is-in', i <= idx); li.classList.toggle('is-active', i === idx); });
      bar.style.width = `${p * 100}%`;
    };
    setActive(0);
    ScrollTrigger.create({
      trigger: wrap, start: 'top top', end: `+=${items.length * 220}`, pin: true, scrub: 0.4, anticipatePin: 1,
      onUpdate: (self) => setActive(self.progress),
    });
  }

  /** Cómo trabajamos: 4 fases fijadas con dibujo que se transforma. */
  function initProcess() {
    const steps = $$('#process-steps li'), stages = $$('#process-stage svg');
    const nEl = $('#stage-n'), wEl = $('#stage-w');
    const setStep = (i) => {
      steps.forEach((li, k) => li.classList.toggle('is-active', k === i));
      stages.forEach((s, k) => s.classList.toggle('is-active', k === i));
      nEl.textContent = pad(i + 1); wEl.textContent = C.process.steps[i].word;
    };
    setStep(0);
    if (!hasGSAP || reduced || !isDesktop()) {
      // Móvil / sin animación: todas las fases visibles y el dibujo rota al entrar en pantalla.
      steps.forEach((li) => li.classList.add('is-active'));
      let i = 0, timer = null;
      const io = new IntersectionObserver(([en]) => {
        if (en.isIntersecting && !reduced) {
          timer = setInterval(() => { i = (i + 1) % stages.length; setStep(i); steps.forEach((li) => li.classList.add('is-active')); }, 2600);
        } else clearInterval(timer);
      }, { threshold: 0.4 });
      io.observe($('#process-stage'));
      return;
    }
    ScrollTrigger.create({
      trigger: '#process', start: 'top top', end: `+=${steps.length * 420}`, pin: true, scrub: 0.4, anticipatePin: 1,
      onUpdate: (self) => setStep(Math.min(steps.length - 1, Math.floor(self.progress * steps.length))),
    });
  }

  /** Proyectos: filtros FLIP, imagen flotante y panel lateral. */
  function initProjects() {
    const list = $('#index-list'), rows = $$('.row', list), preview = $('#preview'), pimg = $('#preview-img');

    // Filtros
    $$('#filters button').forEach((btn) => btn.addEventListener('click', () => {
      const id = btn.dataset.filter;
      $$('#filters button').forEach((b) => { b.classList.toggle('is-active', b === btn); b.setAttribute('aria-pressed', b === btn); });
      const useFlip = hasGSAP && !reduced && typeof Flip !== 'undefined';
      const state = useFlip ? Flip.getState(rows) : null;
      rows.forEach((r) => r.classList.toggle('is-hidden', id !== 'todos' && r.dataset.type !== id));
      if (useFlip) {
        Flip.from(state, {
          duration: 0.6, ease: 'power2.inOut', stagger: 0.03, absolute: true,
          onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }),
          onLeave: (els) => gsap.to(els, { opacity: 0, y: -10, duration: 0.3 }),
          onComplete: () => ScrollTrigger.refresh(),
        });
      } else if (hasGSAP) ScrollTrigger.refresh();
    }));
    $('#filters button').classList.add('is-active');

    // Imagen flotante (desktop)
    if (finePointer && hasGSAP && !reduced) {
      const qx = gsap.quickTo(preview, 'x', { duration: 0.5, ease: 'power3' });
      const qy = gsap.quickTo(preview, 'y', { duration: 0.5, ease: 'power3' });
      list.addEventListener('mousemove', (e) => { qx(e.clientX + 28); qy(e.clientY - 120); });
      rows.forEach((r) => r.addEventListener('mouseenter', () => {
        const it = C.projects.items[+r.dataset.index];
        pimg.src = imgFor(it);
        preview.classList.add('is-on');
      }));
      list.addEventListener('mouseleave', () => preview.classList.remove('is-on'));
    }

    // Panel
    rows.forEach((r) => $('button', r).addEventListener('click', () => openPanel(C.projects.items[+r.dataset.index], $('button', r))));
  }

  let lastFocus = null;
  function openPanel(it, opener) {
    const p = C.projects, t = p.panel, panel = $('#panel'), inner = $('#panel-inner');
    lastFocus = opener;
    const gal = galleryFor(it);
    inner.innerHTML = `
      <div class="panel__bar"><span class="mono label no-mark">[${esc(it.n)}] — ${esc(p.typeLabels[it.type])}</span><button class="panel__close" type="button" id="panel-close">${esc(t.close)}</button></div>
      <h3 class="display panel__title" id="panel-title">${esc(it.name)}</h3>
      <dl class="sheet mono">
        <dt>${esc(t.typeLabel)}</dt><dd>${esc(p.typeLabels[it.type])}</dd>
        <dt>${esc(t.placeLabel)}</dt><dd>${esc(it.place)}</dd>
        <dt>${esc(t.yearLabel)}</dt><dd>${esc(it.year)}</dd>
        <dt>${esc(t.areaLabel)}</dt><dd>${esc(it.area)}</dd>
      </dl>
      <p class="panel__desc">${esc(it.desc)}</p>
      ${it.beforeAfter ? `
        <p class="mono label">${esc(t.compareLabel)}</p>
        <div class="compare" id="compare">
          <img class="compare__before" src="${esc(it.before || 'assets/img/antes.webp')}"${srcset(it.before || 'assets/img/antes.webp')} alt="${esc(it.name)} antes de la rehabilitación" width="800" height="600" loading="lazy">
          <img class="compare__after" src="${esc(it.after || 'assets/img/despues.webp')}"${srcset(it.after || 'assets/img/despues.webp')} alt="${esc(it.name)} después de la rehabilitación" width="800" height="600" loading="lazy">
          <span class="compare__tag compare__tag--before">${esc(t.beforeLabel)}</span>
          <span class="compare__tag compare__tag--after">${esc(t.afterLabel)}</span>
          <div class="compare__handle"></div>
          <input type="range" min="0" max="100" value="50" aria-label="Comparar antes y después">
        </div>` : ''}
      <p class="mono label">${esc(t.galleryLabel)}</p>
      <div class="panel__gallery">${gal.map((src, i) => `<figure><img src="${esc(src)}"${srcset(src)} alt="${esc(it.name)}, imagen ${i + 1}" width="800" height="600" loading="lazy" decoding="async"></figure>`).join('')}</div>`;
    panel.classList.add('is-open'); $('#panel-overlay').classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
    if (lenis) lenis.stop();
    $('#panel-close').addEventListener('click', closePanel);
    $('#panel-close').focus();
    const cmp = $('#compare');
    if (cmp) {
      const range = $('input', cmp);
      const set = (v) => cmp.style.setProperty('--pos', `${v}%`);
      range.addEventListener('input', () => set(range.value));
    }
  }
  function closePanel() {
    const panel = $('#panel');
    if (!panel.classList.contains('is-open')) return;
    panel.classList.remove('is-open'); $('#panel-overlay').classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
    if (lenis) lenis.start();
    if (lastFocus) lastFocus.focus();
  }
  function initPanel() {
    $('#panel-overlay').addEventListener('click', closePanel);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePanel(); });
  }

  /** Formulario: validación en cliente y estado de éxito. */
  function initForm() {
    const form = $('#form'), f = C.contact.form, server = $('#form-server');
    const fields = () => $$('.field', form);
    const setErr = (field, msg) => { field.classList.toggle('is-invalid', !!msg); $('.field__err', field).textContent = msg || ''; };
    const validate = () => {
      let ok = true, first = null;
      fields().forEach((field) => {
        const name = field.dataset.field, input = $('input, select, textarea', field);
        let msg = '';
        const v = input.type === 'checkbox' ? input.checked : input.value.trim();
        if (name === 'privacy' && !v) msg = f.errors.privacy;
        else if (input.required && !v) msg = f.errors.required;
        else if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = f.errors.email;
        else if (name === 'phone' && !/^\+?[\d\s.-]{9,}$/.test(v)) msg = f.errors.phone;
        setErr(field, msg);
        if (msg) { ok = false; first = first || input; }
      });
      if (first) first.focus();
      return ok;
    };
    form.addEventListener('input', (e) => { const field = e.target.closest('.field'); if (field && field.classList.contains('is-invalid')) setErr(field, ''); });
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      server.textContent = '';
      if (!validate()) return;
      form.classList.add('is-sending');
      const btnText = $$('button[type="submit"] .btn__roll span', form);
      btnText.forEach((s) => (s.textContent = f.sending));
      const data = Object.fromEntries(new FormData(form).entries());
      try {
        if (C.contact.endpoint) {
          const res = await fetch(C.contact.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
          if (!res.ok) throw new Error(String(res.status));
        } else {
          await new Promise((r) => setTimeout(r, 900)); // simulación local
        }
        form.classList.add('is-success');
        const h = $('.form__success h3', form);
        h.setAttribute('tabindex', '-1');
        setTimeout(() => h.focus(), 550); // tras la transición de visibilidad
      } catch (err) {
        server.textContent = f.errors.server;
      } finally {
        form.classList.remove('is-sending');
        btnText.forEach((s) => (s.textContent = f.submit));
      }
    });
    $('#form-again').addEventListener('click', () => { form.reset(); form.classList.remove('is-success'); $('#f-name').focus(); });
  }

  /** Footer: el skyline se dibuja al llegar al final. */
  function initFooter() {
    const paths = $$('#skyline path');
    if (!hasGSAP || reduced) return;
    gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });
    ScrollTrigger.create({
      trigger: '#skyline', start: 'top 95%', once: true,
      onEnter: () => gsap.to(paths, { strokeDashoffset: 0, duration: 2.4, ease: 'power2.inOut', stagger: 0.25 }),
    });
  }

  /* ------------------------------------------------------------------
     5. Arranque
  ------------------------------------------------------------------ */
  /** Fase 1: render inmediato del contenido (no depende de las librerías). */
  function render() {
    renderNav(); renderHero(); renderManifesto(); renderAbout(); renderServices(); renderProjects(); renderContact(); renderFooter();
    $$('.corners').forEach(corners);
    preparePreloader();
    document.documentElement.classList.remove('js-loading');
  }

  /** Fase 2: animaciones e interacciones, cuando GSAP / Lenis están disponibles. */
  function initAll() {
    hasGSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
    if (hasGSAP) {
      gsap.registerPlugin(ScrollTrigger);
      if (typeof Flip !== 'undefined') gsap.registerPlugin(Flip);
    }
    initLenis(); initAnchors(); initHeader(); initMenu(); initCursor();
    initReveals(); initHeroScene(); initManifesto(); initTimeline(); initProcess(); initProjects(); initPanel(); initForm(); initFooter();

    const playHero = () => { playLines($('#hero-title')); typeIn($('#hero-label')); if (hasGSAP && !reduced) gsap.fromTo('#scene', { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.3, clearProps: 'opacity' }); };
    initPreloader(playHero);

    if (hasGSAP) {
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
      window.addEventListener('load', () => ScrollTrigger.refresh());
    }
  }

  render();
  (window.__libs || Promise.resolve()).then(initAll);
})();
