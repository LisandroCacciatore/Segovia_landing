export const hero = {
  badge: 'Especialistas en Derecho Laboral y ART',
  title: 'Defendemos tus',
  titleAccent: 'derechos laborales',
  subtitle:
    'Despidos injustificados o en negro, diferencias salariales, accidentes de trabajo y enfermedades profesionales en Rosario y la region.',
  highlights: [
    { icon: 'payments', text: 'Cobro a resultado: no pagas si no cobras' },
    { icon: 'gavel', text: 'Sede en Tribunales (Balcarce 1651)' },
  ],
  ctaPrimary: { label: 'Pedi tu Consulta por WhatsApp', icon: 'chat' },
  ctaSecondary: { label: 'Conoce nuestras areas', icon: 'arrow_downward' },
  urgencyText: 'Atencion de urgencia dentro de las 24 horas habiles.',
  image: '',
  imageAlt: 'Balanza de la justicia en despacho juridico de Rosario',
  badgeCard: {
    label: 'Segovia & Asoc.',
    title: 'Proteccion Laboral Activa',
    status: 'Guardia',
    statusSubtext: 'Online',
  },
};

// TODO: estas metricas son claims comerciales NO verificados en la auditoria.
// "+10 anos" y "+500 casos" hay que confirmarlos con Santiago o quitarlos:
// es publicidad de un abogado y tiene que ser comprobable.
export const metrics = [
  { value: '+10', title: 'Anos de Trayectoria', subtitle: 'En el fuero laboral de Rosario' },
  { value: '100%', title: 'A Resultado', subtitle: 'Sin adelanto de dinero previo' },
  { value: '+500', title: 'Casos y Reclamos ART', subtitle: 'Resueltos favorablemente' },
  { value: '24/48h', title: 'Respuesta Rapida', subtitle: 'Analisis pericial del caso' },
];
