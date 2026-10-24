// Datos verificados contra la auditoria de presencia digital del 14/10/2026.
export const site = {
  name: 'Estudio Segovia & Asoc.',
  fullName: 'Estudio Juridico Segovia & Asoc.',
  tagline: 'Abogado Laboralista en Rosario',
  url: 'https://estudiosegoviayasoc.com.ar',
  email: 'santiago.estudiosegovia@gmail.com',
  phone: '3412752594',
  phoneDisplay: '341 2752594',
  phoneFormatted: '+54 341 275-2594',
  whatsapp: '5493412752594',
  // Direccion confirmada por Santiago: Balcarce 1651, la misma de la ficha de Google.
  address: 'Balcarce 1651, Rosario, Santa Fe',
  addressShort: 'Balcarce 1651 (Tribunales), Rosario',
  addressFull: 'Balcarce 1651, S2000QJR, Rosario, Santa Fe',
  // TODO: los horarios NO estan verificados. Confirmar con Santiago antes de publicar.
  hours: 'Lunes a Viernes de 8:00 a 18:00 hs (Urgencias 24 hs via WhatsApp)',
  socials: {
    // TODO: falta el handle real de Instagram y la URL de la pagina de Facebook.
    instagram: '',
    facebook: '',
    // TODO: reemplazar por la URL directa de la ficha de Maps. Hoy es una busqueda.
    googleReviews: 'https://www.google.com/maps/search/Estudio+Segovia+Rosario',
  },
};

export const nav = [
  { label: 'Inicio', to: '/#inicio' },
  { label: 'Derecho Laboral', to: '/#derecho-laboral' },
  { label: 'Otros Servicios', to: '/#otros-servicios' },
  { label: 'Por Que Elegirnos', to: '/#por-que-elegirnos' },
  { label: 'Testimonios', to: '/#testimonios' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contacto', to: '/#contacto' },
];
