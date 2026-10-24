export const contact = {
  formTitle: 'Consultenos su Caso',
  formTag: 'Consulta Gratuita y Confidencial',
  formDescription:
    'Completa el formulario y un abogado laboralista evaluara tu situacion dentro del dia laboral sin compromiso economico.',
  formPrivacy: 'Absoluta reserva y confidencialidad protegida por secreto profesional.',
  formConsent:
    'Autorizo el tratamiento de mis datos personales para que el estudio responda mi consulta, conforme a la Ley 25.326.',
  formSuccess:
    'Listo. Te abrimos WhatsApp con tu consulta ya escrita: apreta enviar y te respondemos a la brevedad.',
  formError:
    'No pudimos enviar la consulta. Escribinos directamente por WhatsApp o al correo del estudio.',
  services: [
    { value: 'despido', label: 'Despido injustificado o trabajo no registrado' },
    { value: 'art', label: 'Accidente de trabajo o enfermedad profesional (ART)' },
    { value: 'sueldo', label: 'Diferencias salariales o sueldo mal liquidado' },
    { value: 'veraz', label: 'Salir de Veraz / Nosis / BCRA' },
    { value: 'otro', label: 'Familia, Sucesiones o Transito' },
  ],
  direct: {
    tag: 'Contacto Directo',
    title: 'No Dejes Pasar el Tiempo',
    description:
      'Si sufriste un despido o un accidente laboral, dejate ayudar por profesionales con experiencia en el fuero de Rosario.',
    items: [
      {
        icon: 'location_on',
        title: 'Atendemos en Tribunales',
        text: 'Balcarce 1651 (frente al Palacio de Justicia), Rosario, Santa Fe',
      },
      {
        icon: 'phone_iphone',
        title: 'Linea Telefonica Directa',
        phone: true,
        text: 'Llamadas y WhatsApp habilitados',
      },
      { icon: 'mail', title: 'Correo Oficial', email: true },
      {
        icon: 'schedule',
        title: 'Horarios de Atencion',
        text: 'Lunes a Viernes de 8:00 a 18:00 hs (Urgencias 24 hs via WhatsApp)',
      },
    ],
  },
  map: { label: 'Distrito Judicial Rosario - Balcarce 1651' },
};
