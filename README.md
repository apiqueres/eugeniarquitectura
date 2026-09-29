# Arquitectura Eugenio Moreno — web one-page

Web estática en HTML + CSS + JavaScript vanilla con estética de "plano técnico interactivo".
Animaciones con GSAP + ScrollTrigger + Flip, smooth scroll con Lenis (todo por CDN, sin build).

## Estructura

```
index.html          Página principal (secciones [01]–[05] + footer + panel de proyecto)
legal.html          Aviso legal, privacidad y cookies (textos orientativos)
css/styles.css      Sistema visual completo (comentado por bloques)
js/content.js       TODOS los textos, datos y rutas de imagen. Edita aquí.
js/main.js          Render de secciones + animaciones e interacciones
assets/img/         Placeholders SVG (sustituir por fotos reales)
assets/favicon.svg
```

## Cómo verla en local

Abre la carpeta con cualquier servidor estático (el mapa y las fuentes necesitan `http://`):

```bash
npx serve .
```

o bien:

```bash
python -m http.server 8080
```

## Editar contenido

Todo está en `js/content.js`:

- `site`: nombre, teléfono, email, dirección, coordenadas, LinkedIn, WhatsApp.
- `hero`, `about`, `services`, `process`, `projects`, `contact`, `footer`: textos de cada sección.
- `hero.scene`: imagen de la portada (render de fachada con patologías). Si la cambias, actualiza
  también la etiqueta `<link rel="preload" as="image">` de `index.html`.
- `hero.annotations`: las anotaciones de la inspección técnica, en el orden en que aparecen al hacer
  scroll; `x` / `y` en % de la imagen (0,0 = esquina superior izquierda).
- `projects.items[]`: cada obra. Campos editables `year`, `area`, `desc`.
  Para fotos reales añade `images: ['assets/img/panoramic-1.webp', 'assets/img/panoramic-2.webp']`.
  Para el slider antes/después: `beforeAfter: true`, `before: '...'`, `after: '...'`.
- `contact.endpoint`: URL para el envío del formulario (p. ej. Formspree). Vacío = envío simulado.

## Imágenes

Las imágenes de `assets/img/` son renders generados con Higgsfield (GPT Image 2.5) como
placeholders realistas: edificios ficticios inspirados en cada proyecto y la fachada con patologías
de la portada (`fachada.webp`). Sustitúyelas por las fotos reales respetando las proporciones:

- Proyectos: 4:3, `proyecto-NN.webp` (800 × 600) y `proyecto-NN@2x.webp` (1600 × 1200) para pantallas retina.
- Retrato: 3:4, `retrato.webp` (600 × 800) y `retrato@2x.webp` (foto real del cliente, recortada).
- Antes / después: 4:3, `antes.webp` / `despues.webp` (+ `@2x`).

Las fotos se muestran en blanco y negro y recuperan el color en hover (filtro CSS), así que
súbelas en color.

## Pendientes antes de publicar

- URL definitiva en `content.js` (`site.url`), en el `<link rel="canonical">` y en las etiquetas
  Open Graph / JSON-LD de `index.html`.
- Imagen Open Graph `assets/img/og.jpg` (1200 × 630): render generado, sustituir por foto real si se desea.
- URL real de LinkedIn (`site.linkedin`).
- Endpoint del formulario y revisión de los textos legales con asesoría.

## Accesibilidad y rendimiento

Lighthouse 12 (móvil, servidor local sin gzip): rendimiento 96, accesibilidad 100,
buenas prácticas 100, SEO 100. En hosting con compresión y caché los avisos restantes desaparecen.

- Las librerías (GSAP, ScrollTrigger, Flip, Lenis) cargan `async`; `main.js` renderiza el contenido
  al instante y activa las animaciones cuando resuelve `window.__libs`. Si un CDN falla, la web
  funciona sin animaciones.

- `prefers-reduced-motion`: sin preloader, sin secciones fijadas, sin cursor ni smooth scroll.
- Foco visible en terracota, skip link, panel de proyecto con `role="dialog"` y cierre con Esc.
- El preloader solo aparece en la primera visita de la sesión (`sessionStorage`).
- Imágenes con `loading="lazy"`, dimensiones declaradas y `alt` descriptivo.
