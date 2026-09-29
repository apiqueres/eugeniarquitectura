/* =====================================================================
   CONTENIDO DE LA WEB — Arquitectura Eugenio Moreno
   ---------------------------------------------------------------------
   Todos los textos visibles de la web viven en este objeto.
   Para cambiar un texto, edita aquí; el HTML se genera a partir de esto.
   Las imágenes de /assets/img son renders generados (Higgsfield) a modo de
   placeholder realista. Sustituye los archivos por las fotos reales (WebP,
   800×600 y opcionalmente 1600×1200 como nombre@2x.webp) manteniendo el
   nombre, o cambia la ruta aquí.
   ===================================================================== */

window.CONTENT = {

  /* ---------- Datos generales del estudio ---------- */
  site: {
    name: 'Arquitectura Eugenio Moreno',
    logoShort: 'ARQ',
    logoName: 'Eugenio Moreno',
    tagline: 'Gestión integral de proyectos de arquitectura y construcción',
    year: 2026,
    url: 'https://www.arquitecturaeugeniomoreno.es', // EDITAR: dominio definitivo
    linkedin: 'https://www.linkedin.com/',            // EDITAR: URL del perfil de LinkedIn
    phone: '654 39 43 40',
    phoneHref: '+34654394340',
    whatsapp: '34654394340',
    whatsappText: 'Hola, me gustaría pedir presupuesto para un proyecto.',
    email: 'jmgrau@caatvalencia.es',
    address: 'Carrer del Sequial, 71 b, puerta 7 — 46410 Sueca (Valencia)',
    addressLines: ['Carrer del Sequial, 71 b, puerta 7', '46410 Sueca (Valencia)'],
    coords: { lat: 39.2036, lng: -0.3106 },
    coordsLabel: '39.20°N 0.31°W',
  },

  /* ---------- Navegación ---------- */
  nav: [
    { id: 'inicio',         label: 'Inicio' },
    { id: 'eugenio-moreno', label: 'Eugenio Moreno' },
    { id: 'servicios',      label: 'Servicios' },
    { id: 'proyectos',      label: 'Proyectos' },
    { id: 'contacto',       label: 'Contacto' },
  ],

  cta: {
    primary:   'Pedir presupuesto',
    secondary: 'Ver proyectos',
  },

  /* ---------- Preloader de obra ---------- */
  preloader: {
    steps: [
      'ESTUDIO PREVIO',
      'LEVANTAMIENTO',
      'ANTEPROYECTO',
      'PROYECTO BÁSICO',
      'PROYECTO DE EJECUCIÓN',
      'LICENCIA',
      'REPLANTEO',
      'DIRECCIÓN DE OBRA',
      'CERTIFICADO FINAL',
      'ENTREGA',
    ],
  },

  /* ---------- [01] INICIO ---------- */
  hero: {
    label: 'ESTUDIO DE ARQUITECTURA — SUECA, VALENCIA — 39.20°N 0.31°W',
    titleLines: ['PROYECTAMOS,', 'DIRIGIMOS Y', 'CUIDAMOS EDIFICIOS.'],
    subtitle: 'Gestión integral de proyectos de arquitectura y construcción. Más de 25 años proyectando, dirigiendo obras y rehabilitando edificios en la costa mediterránea y Valencia.',
    inspectHint: '[Desliza para inspeccionar el edificio]',
    inspectLabel: 'INSPECCIÓN TÉCNICA · FACHADA PRINCIPAL',
    inspectCounterLabel: 'ANOTACIONES',
    // Imagen de la portada (render generado; sustituir por foto real si se desea).
    scene: { src: 'assets/img/fachada.webp', alt: 'Fachada de un edificio residencial mediterráneo de cinco plantas con patologías visibles: desprendimiento de revestimiento, humedades en planta baja, grietas y barandillas oxidadas.' },
    // Anotaciones de la inspección técnica. x / y en % de la imagen (0,0 = esquina superior izquierda).
    // Aparecen en este orden al hacer scroll. `up: true` coloca la caja por encima del punto.
    annotations: [
      { id: 'ite',  x: 69,   y: 10.5, up: true, code: 'ITE · Cubierta', text: 'Manchas de escorrentía bajo el peto: revisión de impermeabilización' },
      { id: 'iee',  x: 84,   y: 19,   code: 'IEE · Fachada',      text: 'Desprendimiento de revestimiento con ladrillo visto' },
      { id: 'se',   x: 31.5, y: 44,   code: 'DB-SE · Estructura', text: 'Grieta diagonal en cerramiento: evaluación estructural' },
      { id: 'sua1', x: 75,   y: 65,   code: 'DB-SUA 1',           text: 'Barandilla oxidada y por debajo de 1,00 m' },
      { id: 'he',   x: 50,   y: 41,   code: 'DB-HE · Envolvente', text: 'Sin aislamiento: mejora de calificación E → B' },
      { id: 'hs1',  x: 19,   y: 90,   code: 'DB-HS 1',            text: 'Humedad por capilaridad y eflorescencias en planta baja' },
    ],
    benefits: ['DIAGNÓSTICO RIGUROSO', 'TRAMITACIÓN COMPLETA', 'DIRECCIÓN HASTA LA ENTREGA'],
  },

  manifesto: 'UN EDIFICIO NECESITA ALGUIEN QUE LO CONOZCA. DESDE EL PRIMER PLANO HASTA SU MANTENIMIENTO DÉCADAS DESPUÉS.',

  stats: [
    { value: 25,   prefix: '+',   suffix: '',  label: 'AÑOS DE EXPERIENCIA' },
    { value: 3648, prefix: 'Nº ', suffix: '',  label: 'COLEGIADO' },
    { value: 8,    prefix: '',    suffix: '',  label: 'ÁREAS DE SERVICIO' },
    { value: 10,   prefix: '',    suffix: '+', label: 'OBRAS DESTACADAS' },
  ],

  /* ---------- [02] EUGENIO MORENO ---------- */
  about: {
    label: '[02] — FICHA TÉCNICA',
    titleLines: ['EUGENIO', 'MORENO'],
    portrait: { src: 'assets/img/retrato.webp', alt: 'Retrato en blanco y negro de José Eugenio Moreno Grau, arquitecto técnico, en su estudio de Sueca' },
    sheet: [
      { k: 'NOMBRE',      v: 'José Eugenio Moreno Grau' },
      { k: 'TITULACIÓN',  v: 'Arquitecto Técnico / Ingeniero en Edificación' },
      { k: 'COLEGIADO',   v: 'Nº 3648 — COAATIE Valencia' },
      { k: 'EXPERIENCIA', v: '+25 años' },
      { k: 'ESTUDIO',     v: 'Sueca, Valencia' },
    ],
    paragraphs: [
      'Fundador y director del despacho, con más de 25 años como proyectista y en dirección facultativa de obras y coordinación de seguridad y salud en obras de edificación y rehabilitación.',
      'Ha intervenido en numerosas rehabilitaciones integrales, promociones de obra nueva y complejos residenciales, tanto en el casco antiguo de Valencia como en primera línea de la costa mediterránea. También presta asesoramiento senior a empresas del sector.',
    ],
    linkedinLabel: '[ LINKEDIN ↗ ]',
    timelineLabel: 'FORMACIÓN Y ACREDITACIONES',
    timelineHint: '[Desliza para continuar]',
    timeline: [
      { title: 'Ingeniero en Edificación', org: 'Universidad Politécnica de Valencia' },
      { title: 'Arquitecto Técnico en Ejecución de Obras', org: 'Universidad Politécnica de Valencia' },
      { title: 'Técnico Superior en Prevención de Riesgos Laborales', org: '' },
      { title: 'Coordinador de Seguridad y Salud en la Construcción', org: '200 h' },
      { title: 'Tasador de inmuebles', org: 'Sociedad Española de Valoradores' },
      { title: 'Inspector acreditado para evaluación de daños en edificios por inundación', org: '' },
      { title: 'Perito judicial y de parte', org: '' },
      { title: 'Profesor de prevención de riesgos laborales', org: 'Fundación Laboral de la Construcción y del Metal' },
    ],
  },

  /* ---------- [03] SERVICIOS ---------- */
  services: {
    label: '[03] — SERVICIOS',
    titleLines: ['SERVICIOS'],
    intro: 'Una amplia gama de servicios para responder a todas las necesidades de arquitectura y construcción.',
    items: [
      {
        id: 'edificacion', tag: 'EDIFICACIÓN',
        titleLines: ['Proyectos de', 'edificación'],
        desc: 'Redacción del proyecto y dirección de obra hasta su finalización.',
        list: ['Obra nueva', 'Viviendas unifamiliares y chalets', 'Piscinas', 'Garajes', 'Locales y oficinas'],
      },
      {
        id: 'rehabilitacion', tag: 'REHABILITACIÓN',
        titleLines: ['Reforma y', 'rehabilitación'],
        desc: 'Reforma de viviendas y locales; rehabilitación de edificios, fachadas y cubiertas.',
        list: ['Reforma de viviendas', 'Reforma de locales', 'Rehabilitación de edificios', 'Fachadas', 'Cubiertas'],
      },
      {
        id: 'urbanismo', tag: 'URBANISMO',
        titleLines: ['Licencias', 'y cédulas'],
        desc: 'Tramitación completa ante la administración, de principio a fin.',
        list: ['Licencia de apertura', 'Licencia de actividad', 'Cédula de habitabilidad', 'Cédula turística'],
      },
      {
        id: 'comunidades', tag: 'COMUNIDADES',
        titleLines: ['Técnico de', 'cabecera'],
        desc: 'Para comunidades de propietarios: mantenimiento, normativa y accesibilidad.',
        quote: '“Es como el médico de la salud de un edificio.”',
        list: ['IEE — Informe de Evaluación del Edificio', 'ITE — Inspección Técnica de Edificios', 'Mantenimiento preventivo y correctivo', 'Adecuación normativa', 'Accesibilidad'],
      },
      {
        id: 'interiorismo', tag: 'INTERIORISMO',
        titleLines: ['Diseño', 'interior'],
        desc: 'Diseño interior de viviendas y decoración de restaurantes, locales y negocios.',
        list: ['Diseño interior de viviendas', 'Decoración de restaurantes', 'Locales y negocios'],
      },
      {
        id: 'peritajes', tag: 'PERITAJES',
        titleLines: ['Informes', 'periciales'],
        desc: 'Humedades, daños estructurales y patologías, válidos como prueba judicial.',
        list: ['Humedades', 'Daños estructurales', 'Patologías de la edificación', 'Prueba judicial'],
      },
      {
        id: 'tasaciones', tag: 'TASACIONES',
        titleLines: ['Tasación de', 'inmuebles'],
        desc: 'Para abogados, notarios, empresas y particulares.',
        list: ['Inmuebles rústicos y urbanos', 'Bienes muebles', 'Tasación pericial contradictoria'],
      },
      {
        id: 'energia', tag: 'ENERGÍA',
        titleLines: ['Eficiencia', 'energética'],
        desc: 'Certificados, estudios de eficiencia y gestión energética.',
        list: ['Certificados energéticos', 'Estudios de eficiencia', 'Gestión energética'],
      },
    ],
    listToggle: 'VER DETALLE',
  },

  /* ---------- Cómo trabajamos ---------- */
  process: {
    label: 'CÓMO TRABAJAMOS',
    titleLines: ['CUATRO', 'FASES.'],
    hint: '[Desliza para continuar]',
    steps: [
      { id: 'observar',     word: 'OBSERVAR',     text: 'Visita y levantamiento del inmueble. Medimos, fotografiamos y escuchamos.' },
      { id: 'diagnosticar', word: 'DIAGNOSTICAR', text: 'Informe claro, sin tecnicismos: qué pasa, por qué y qué opciones hay.' },
      { id: 'proyectar',    word: 'PROYECTAR',    text: 'Documentación técnica completa y tramitación de licencias y permisos.' },
      { id: 'dirigir',      word: 'DIRIGIR',      text: 'Control de cada fase de obra, con visitas y certificaciones, hasta la entrega.' },
    ],
  },

  /* ---------- [04] PROYECTOS ---------- */
  projects: {
    label: '[04] — ÍNDICE DE OBRA',
    titleLines: ['PROYECTOS'],
    filters: [
      { id: 'todos',  label: 'TODOS' },
      { id: 'nueva',  label: 'OBRA NUEVA' },
      { id: 'rehab',  label: 'REHABILITACIÓN' },
      { id: 'asesor', label: 'ASESORAMIENTO SENIOR' },
    ],
    typeLabels: { nueva: 'Obra nueva', rehab: 'Rehabilitación', asesor: 'Asesoramiento senior' },
    columns: ['Nº', 'PROYECTO', 'TIPO', 'UBICACIÓN'],
    // year y area son placeholders editables.
    items: [
      { n: '01', name: 'Edificio Panoramic',          type: 'nueva',  place: 'Sueca',                    year: '20XX', area: '— m²', desc: 'Edificio residencial plurifamiliar de nueva planta. Redacción de proyecto y dirección de ejecución de obra.' },
      { n: '02', name: 'Hort de Palmera',             type: 'nueva',  place: 'Sueca',                    year: '20XX', area: '— m²', desc: 'Promoción de viviendas de obra nueva. Dirección de ejecución y coordinación de seguridad y salud.' },
      { n: '03', name: 'Edificio plurifamiliar',      type: 'nueva',  place: 'Sueca',                    year: '20XX', area: '— m²', desc: 'Edificio de viviendas con garaje y locales en planta baja. Proyecto y dirección de obra.' },
      { n: '04', name: 'Tavernes Beach',              type: 'nueva',  place: 'Tavernes de la Valldigna', year: '20XX', area: '— m²', desc: 'Complejo residencial en primera línea de playa. Dirección de ejecución de obra.' },
      { n: '05', name: 'Edificio Orión',              type: 'rehab',  place: 'Cullera',                  year: '20XX', area: '— m²', desc: 'Rehabilitación integral de fachadas y cubierta en edificio residencial de costa.', beforeAfter: true },
      { n: '06', name: 'Edificio La Goleta',          type: 'rehab',  place: 'Cullera',                  year: '20XX', area: '— m²', desc: 'Rehabilitación de envolvente y adecuación normativa de zonas comunes.' },
      { n: '07', name: 'Edificio París',              type: 'rehab',  place: 'Cullera',                  year: '20XX', area: '— m²', desc: 'Reparación de patologías estructurales y rehabilitación de fachadas.' },
      { n: '08', name: 'Residencia Universitaria',    type: 'rehab',  place: 'Cartagena',                year: '20XX', area: '— m²', desc: 'Rehabilitación y reforma interior de residencia universitaria.' },
      { n: '09', name: 'Residencial Sky Homes',       type: 'asesor', place: 'Valencia',                 year: '20XX', area: '— m²', desc: 'Asesoramiento técnico senior a la promotora durante el proceso de proyecto y obra.' },
      { n: '10', name: 'Residencial Habitat Malilla', type: 'asesor', place: 'Valencia',                 year: '20XX', area: '— m²', desc: 'Asesoramiento técnico senior en complejo residencial de gran escala.' },
    ],
    panel: {
      typeLabel: 'TIPO',
      placeLabel: 'UBICACIÓN',
      yearLabel: 'AÑO',
      areaLabel: 'SUPERFICIE',
      close: 'CERRAR',
      beforeLabel: 'ANTES',
      afterLabel: 'DESPUÉS',
      galleryLabel: 'GALERÍA',
      compareLabel: 'ANTES / DESPUÉS — ARRASTRA EL DIVISOR',
    },
    hint: '[Pasa el cursor sobre una fila · Clic para abrir la ficha]',
  },

  /* ---------- [05] CONTACTO ---------- */
  contact: {
    label: '[05] — CONTACTO',
    titleLines: ['PONGA EN', 'MARCHA SU', 'PROYECTO.'],
    subtitle: 'Asesoramiento y presupuesto sin compromiso.',
    // Si rellenas endpoint, el formulario hará POST (JSON) a esa URL (p. ej. Formspree).
    // Vacío = simulación local del envío.
    endpoint: '',
    form: {
      name:     { label: 'NOMBRE',                 placeholder: 'Nombre y apellidos' },
      phone:    { label: 'TELÉFONO',               placeholder: '600 000 000' },
      email:    { label: 'EMAIL',                  placeholder: 'nombre@correo.es' },
      service:  { label: 'TIPO DE SERVICIO',       placeholder: 'Selecciona un servicio' },
      location: { label: 'UBICACIÓN DEL INMUEBLE', placeholder: 'Municipio / dirección' },
      message:  { label: 'MENSAJE',                placeholder: 'Cuéntenos brevemente qué necesita' },
      privacy:  { label: 'He leído y acepto la <a href="legal.html#privacidad">política de privacidad</a> (RGPD).' },
      submit:   'Enviar solicitud',
      sending:  'Enviando…',
      errors: {
        required: 'Campo obligatorio',
        email:    'Introduce un email válido',
        phone:    'Introduce un teléfono válido',
        privacy:  'Debes aceptar la política de privacidad',
        server:   'No se ha podido enviar. Inténtelo de nuevo o llámenos.',
      },
      success: {
        title: 'SOLICITUD RECIBIDA',
        text:  'Gracias. Le contestaremos en un plazo máximo de 48 horas laborables.',
        again: 'Enviar otra solicitud',
      },
    },
    dataLabel: 'DATOS DE CONTACTO',
    data: [
      { k: 'TEL',       v: '654 39 43 40',            href: 'tel:+34654394340' },
      { k: 'EMAIL',     v: 'jmgrau@caatvalencia.es',  href: 'mailto:jmgrau@caatvalencia.es' },
      { k: 'DIRECCIÓN', v: 'Carrer del Sequial, 71 b, puerta 7 — 46410 Sueca (Valencia)' },
      { k: 'COORD.',    v: '39.2036 N / 0.3106 W' },
    ],
    whatsapp: 'WhatsApp',
    call: 'Llamar',
    mapLabel: 'PLANO DE SITUACIÓN — SUECA',
  },

  /* ---------- Footer ---------- */
  footer: {
    servicesLabel: 'SERVICIOS',
    contactLabel:  'CONTACTO',
    legalLabel:    'LEGAL',
    legal: [
      { label: 'Aviso legal', href: 'legal.html#aviso-legal' },
      { label: 'Privacidad',  href: 'legal.html#privacidad' },
      { label: 'Cookies',     href: 'legal.html#cookies' },
    ],
    copyright: '© 2026 Arquitectura Eugenio Moreno',
    top: 'VOLVER ARRIBA ↑',
  },
};
