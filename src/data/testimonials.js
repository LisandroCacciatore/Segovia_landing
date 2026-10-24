// ATENCION - LEER ANTES DE PUBLICAR
// ---------------------------------------------------------------------------
// Estos tres testimonios NO son verificables. La auditoria del 14/10/2026
// encontro que los testimonios del sitio actual (Martin G, Carolina R,
// Daniel P) no coinciden con NINGUN resenante real de la ficha de Google, que
// son: Noee, Virginia Racca y sebastian flores.
//
// Publicar testimonios inventados en el sitio de un abogado es publicidad
// enganosa. Antes de publicar hay dos caminos:
//   a) Santiago autoriza publicar las resenas reales, con nombre y enlace.
//   b) Se quita la seccion (Testimonials.jsx no se renderiza).
//
// isPlaceholder: true marca el contenido como no publicable todavia.
export const testimonials = [
  {
    isPlaceholder: true,
    quote:
      'Me despidieron de un dia para el otro y no sabia que hacer ni cuanto me correspondia. Me acompanaron en todo el proceso y lograron que cobre la indemnizacion justa.',
    name: 'Martin G.',
    case: 'Reclamo por Despido Incausado',
    initials: 'MG',
  },
  {
    isPlaceholder: true,
    quote:
      'Sufri un accidente en el trabajo y ellos se ocuparon de todo el reclamo medico y legal contra la ART. Siempre me tuvieron al tanto y cobramos rapido.',
    name: 'Carolina R.',
    case: 'Accidente de Trayecto (ART)',
    initials: 'CR',
  },
  {
    isPlaceholder: true,
    quote:
      'Me ayudaron a salir del Veraz y del Banco Central por una deuda vieja que me seguia bloqueando. En pocos meses se limpio el historial.',
    name: 'Daniel P.',
    case: 'Baja de Informes Comerciales (Habeas Data)',
    initials: 'DP',
  },
];

// Se usa para decidir si la seccion se renderiza. Hoy devuelve false:
// mientras no haya un testimonio real autorizado, la seccion se muestra solo
// en desarrollo (ver Testimonials.jsx) para poder revisar el diseno.
export const testimonialsArePublishable = () =>
  testimonials.some((t) => !t.isPlaceholder);
