// Testimonios REALES de la ficha de Google del estudio.
//
// Textos copiados tal cual los escribieron los autores, sin corregir ortografía
// ni resumir: son citas textuales y cualquier "mejora" las convierte en otra cosa.
// El nombre va como figura en Google.
//
// isPlaceholder: false los marca como publicables y activa la sección
// (ver testimonialsArePublishable). Los enlaces a la ficha están en
// site.socials.googleReviews.
export const testimonials = [
  {
    isPlaceholder: false,
    quote:
      'Un abogado dio mi canso por perdido, me contacté con el Dr Segovia y dos Meses lo saco adelante sin dudar que iba a ganar!!! Su ocupación fue excelente, lo recomiendo!!!!',
    name: 'Virginia Racca',
    case: 'Hace 4 meses · Google',
    initials: 'VR',
  },
  {
    isPlaceholder: false,
    quote:
      'Excelente servicio, santiago muy buen profesional,me asesoro, me acompaño en el proceso, y resolvimos el pago de una empresa, sino aun estaría esperando.',
    name: 'Noee',
    case: 'Hace 5 meses · Google',
    initials: 'N',
  },
  {
    isPlaceholder: false,
    quote:
      'Muy amable y muy buen asesoramiento, ademas super atento a las dudas y nesecidades. Muy Recomendable',
    name: 'sebastian flores',
    case: 'Hace 5 meses · Google',
    initials: 'SF',
  },
];

export const testimonialsArePublishable = () =>
  testimonials.some((t) => !t.isPlaceholder);
