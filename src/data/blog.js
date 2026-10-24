export const blogCategories = [
  { id: 'all', label: 'Todos' },
  { id: 'despidos', label: 'Despidos' },
  { id: 'art', label: 'ART' },
  { id: 'salarios', label: 'Salarios' },
  { id: 'familia', label: 'Familia' },
  { id: 'sucesiones', label: 'Sucesiones' },
  { id: 'otros', label: 'Otros' },
];

// Todos los articulos son PLACEHOLDER: tienen titulo, extracto y categoria,
// pero no tienen cuerpo redactado. Ver el campo isPlaceholder de cada uno.
// Ninguno se publica sin aprobacion explicita de Santiago: lleva su nombre y
// su matricula, y la responsabilidad profesional es suya.
export const blogPosts = [
  {
    slug: 'que-indemnizacion-me-corresponde-si-me-despiden-sin-causa',
    title: 'Que indemnizacion me corresponde si me despiden sin causa?',
    excerpt:
      'Calculo del art. 245 LCT, preaviso omitido, integracion de mes y rubros adeudados en despidos directos.',
    category: 'despidos',
    categoryLabel: 'Despidos',
    readingTime: '5 min',
    date: '2025-05-14',
    author: 'Santiago Segovia',
    isPlaceholder: true,
  },
  {
    slug: 'trabajo-en-negro-como-reclamar',
    title: 'Trabajo en negro: como reclamar y que derechos tenes',
    excerpt:
      'Intimacion por telegrama laboral gratuito, multas por falta de registracion y cobro integral retroactivo.',
    category: 'despidos',
    categoryLabel: 'Despidos',
    readingTime: '7 min',
    date: '2025-05-10',
    author: 'Santiago Segovia',
    isPlaceholder: true,
  },
  {
    slug: 'accidente-in-itinere',
    title: 'Accidente in itinere: que cubre la ART y como reclamar',
    excerpt:
      'Que hacer ante accidentes en el trayecto de ida o vuelta al trabajo, plazos de denuncia y cobertura medica.',
    category: 'art',
    categoryLabel: 'ART',
    readingTime: '6 min',
    date: '2025-05-02',
    author: 'Santiago Segovia',
    isPlaceholder: true,
  },
  {
    slug: 'enfermedad-profesional-art',
    title: 'Enfermedad profesional: pasos para reclamar ante la ART',
    excerpt:
      'Hernias de disco, varices, hipoacusia y tendinitis: como probar el origen laboral y exigir indemnizacion.',
    category: 'art',
    categoryLabel: 'ART',
    readingTime: '8 min',
    date: '2025-04-26',
    author: 'Santiago Segovia',
    isPlaceholder: true,
  },
  {
    slug: 'recibi-telegrama-laboral-48-horas',
    title: 'Recibi un telegrama laboral: como responder en 48 horas',
    excerpt:
      'El silencio o una respuesta tardia pueden validar un despido con causa. Pautas para rechazarlo de inmediato.',
    category: 'despidos',
    categoryLabel: 'Despidos',
    readingTime: '4 min',
    date: '2025-04-19',
    author: 'Santiago Segovia',
    isPlaceholder: true,
  },
  {
    slug: 'diferencias-salariales-recibo-sueldo',
    title: 'Diferencias salariales: como revisar tu recibo de sueldo',
    excerpt:
      'Items no remunerativos, horas extras al 50% y 100%, y adicionales de convenio no liquidados correctamente.',
    category: 'salarios',
    categoryLabel: 'Salarios',
    readingTime: '6 min',
    date: '2025-04-12',
    author: 'Santiago Segovia',
    isPlaceholder: true,
  },
  {
    slug: 'salir-veraz-nosis-bcra-habeas-data',
    title: 'Como salir del Veraz, Nosis o BCRA con Habeas Data',
    excerpt:
      'Supresion y rectificacion de datos crediticios caducos, deudas prescriptas y errores de reporte comercial.',
    category: 'otros',
    categoryLabel: 'Otros',
    readingTime: '5 min',
    date: '2025-04-05',
    author: 'Santiago Segovia',
    isPlaceholder: true,
  },
  {
    slug: 'divorcio-santa-fe-pasos-requisitos',
    title: 'Divorcio en Santa Fe: pasos, requisitos y costos',
    excerpt:
      'Propuesta reguladora, convenio de bienes, alimentos para hijos menores y tiempos judiciales en Tribunales.',
    category: 'familia',
    categoryLabel: 'Familia',
    readingTime: '6 min',
    date: '2025-03-28',
    author: 'Santiago Segovia',
    isPlaceholder: true,
  },
  {
    slug: 'sucesion-santa-fe-pasos',
    title: 'Sucesion en Santa Fe: que pasos seguir y cuanto demora',
    excerpt:
      'Publicacion de edictos, declaratoria de herederos, avaluo fiscal e inscripcion registral en el Registro de la Propiedad.',
    category: 'sucesiones',
    categoryLabel: 'Sucesiones',
    readingTime: '7 min',
    date: '2025-03-20',
    author: 'Santiago Segovia',
    isPlaceholder: true,
  },
];

export const getPostBySlug = (slug) => blogPosts.find((p) => p.slug === slug);

export const getPostsByCategory = (categoryId) =>
  categoryId === 'all' ? blogPosts : blogPosts.filter((p) => p.category === categoryId);

export const getRelatedPosts = (currentSlug, category, limit = 3) =>
  blogPosts.filter((p) => p.slug !== currentSlug && p.category === category).slice(0, limit);

export const getSortedPosts = () =>
  [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
