import { useState } from 'react';
import { site } from '../data/site.js';
import { contact } from '../data/contact.js';
import { waLink } from '../utils/whatsapp.js';

const EMPTY = {
  name: '',
  phone: '',
  email: '',
  service: 'despido',
  message: '',
  consent: false,
  honeypot: '',
};

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | ok | error

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const buildMessage = () => {
    const label = contact.services.find((s) => s.value === form.service)?.label || form.service;
    return [
      'Consulta desde la web del estudio',
      '',
      `Nombre: ${form.name}`,
      `Telefono: ${form.phone}`,
      form.email ? `Email: ${form.email}` : null,
      `Motivo: ${label}`,
      '',
      `Situacion: ${form.message}`,
    ]
      .filter(Boolean)
      .join('\n');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.consent) return;

    // Honeypot: if filled, simulate success without sending
    if (form.honeypot) {
      setStatus('ok');
      setForm(EMPTY);
      return;
    }

    const endpoint = import.meta.env.VITE_FORM_ENDPOINT;

    // Sin backend configurado, la consulta sale por WhatsApp: es el canal real
    // del estudio y no depende de que el correo funcione. Decir "enviado" sin
    // haber enviado nada seria mentirle al consultante.
    if (!endpoint) {
      window.open(waLink(buildMessage()), '_blank', 'noopener,noreferrer');
      setStatus('ok');
      setForm(EMPTY);
      return;
    }

    setStatus('sending');
    try {
      const { honeypot, ...datos } = form;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...datos, origen: 'landing', enviado: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('ok');
      setForm(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contacto" className="w-full py-space-3xl bg-surface relative">
      <div className="w-full max-w-[1240px] mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl">
          <div className="lg:col-span-7 bg-surface-container-low p-space-xl md:p-space-2xl rounded-xl shadow-xl flex flex-col justify-between">
            <div>
              <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest">
                {contact.formTag}
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
                {contact.formTitle}
              </h2>
              <p className="font-body-md text-on-surface-variant mt-space-xs">
                {contact.formDescription}
              </p>

              <form onSubmit={handleSubmit} className="mt-space-xl space-y-space-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div className="space-y-space-xs">
                    <label
                      htmlFor="name"
                      className="font-label-caps text-label-caps uppercase text-on-surface-variant"
                    >
                      Nombre y apellido *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Ej. Juan Perez"
                      className="w-full px-space-md py-space-sm bg-surface-container-lowest text-on-surface rounded-lg focus:outline-none focus:ring-1 focus:ring-primary shadow-sm font-body-md"
                    />
                  </div>
                  <div className="space-y-space-xs">
                    <label
                      htmlFor="phone"
                      className="font-label-caps text-label-caps uppercase text-on-surface-variant"
                    >
                      Telefono / WhatsApp *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Ej. 341 555-1234"
                      className="w-full px-space-md py-space-sm bg-surface-container-lowest text-on-surface rounded-lg focus:outline-none focus:ring-1 focus:ring-primary shadow-sm font-body-md"
                    />
                  </div>
                </div>

                <div className="space-y-space-xs">
                  <label
                    htmlFor="email"
                    className="font-label-caps text-label-caps uppercase text-on-surface-variant"
                  >
                    Correo electronico
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="ejemplo@correo.com"
                    className="w-full px-space-md py-space-sm bg-surface-container-lowest text-on-surface rounded-lg focus:outline-none focus:ring-1 focus:ring-primary shadow-sm font-body-md"
                  />
                </div>

                <div className="space-y-space-xs">
                  <label
                    htmlFor="service"
                    className="font-label-caps text-label-caps uppercase text-on-surface-variant"
                  >
                    Motivo principal del reclamo
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full px-space-md py-space-sm bg-surface-container-lowest text-on-surface rounded-lg focus:outline-none focus:ring-1 focus:ring-primary shadow-sm font-body-md"
                  >
                    {contact.services.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-space-xs">
                  <label
                    htmlFor="message"
                    className="font-label-caps text-label-caps uppercase text-on-surface-variant"
                  >
                    Detalle de tu situacion *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Contanos brevemente que paso, si recibiste telegrama o la fecha del accidente..."
                    className="w-full px-space-md py-space-sm bg-surface-container-lowest text-on-surface rounded-lg focus:outline-none focus:ring-1 focus:ring-primary shadow-sm font-body-md"
                  />
                </div>
                {/* Honeypot field - hidden from users */}
                <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                  <label htmlFor="honeypot" className="sr-only">Leave empty</label>
                  <input
                    id="honeypot"
                    name="honeypot"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.honeypot}
                    onChange={handleChange}
                  />
                </div>

                <label
                  htmlFor="consent"
                  className="flex items-start gap-space-sm cursor-pointer p-space-sm rounded-lg hover:bg-surface-container-high/40 transition-colors"
                >
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    required
                    checked={form.consent}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 shrink-0 accent-[#f2ca50]"
                  />
                  <span className="font-body-sm text-on-surface-variant">
                    {contact.formConsent}{' '}
                    <a href="/privacidad" className="text-primary hover:underline">
                      Ver politica
                    </a>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!form.consent || status === 'sending'}
                  className="w-full py-space-md px-space-xl bg-primary text-on-primary font-button-text rounded-xl shadow-[0_0_24px_-2px_rgba(212,175,55,0.35)] hover:bg-primary-fixed transition-all flex items-center justify-center gap-space-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-[20px]">send</span>
                  <span>{status === 'sending' ? 'Enviando...' : 'Enviar consulta gratuita'}</span>
                </button>
              </form>

              {status === 'ok' && (
                <div className="mt-space-md p-space-md bg-surface-container-high text-tertiary rounded-lg font-body-sm">
                  {contact.formSuccess}
                </div>
              )}
              {status === 'error' && (
                <div className="mt-space-md p-space-md bg-surface-container-high text-error rounded-lg font-body-sm">
                  {contact.formError}
                </div>
              )}
            </div>

            <div className="pt-space-lg text-center">
              <p className="font-body-sm text-on-surface-variant flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">lock</span>
                <span>{contact.formPrivacy}</span>
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-space-xl">
            <div className="space-y-space-lg">
              <div>
                <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest">
                  {contact.direct.tag}
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface mt-1">
                  {contact.direct.title}
                </h3>
                <p className="font-body-md text-on-surface-variant mt-space-xs">
                  {contact.direct.description}
                </p>
              </div>

              <div className="space-y-space-md">
                {contact.direct.items.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-space-md p-space-md bg-surface-container rounded-xl shadow-sm"
                  >
                    <span className="material-symbols-outlined text-primary text-[24px] shrink-0">
                      {item.icon}
                    </span>
                    <div>
                      <h4 className="font-headline-sm text-on-surface text-base">{item.title}</h4>
                      {item.phone ? (
                        <>
                          <a
                            href={`tel:${site.phone}`}
                            className="font-body-sm text-primary hover:underline font-bold"
                          >
                            {site.phoneDisplay}
                          </a>
                          <p className="font-body-sm text-on-surface-variant">{item.text}</p>
                        </>
                      ) : item.email ? (
                        <a
                          href={`mailto:${site.email}`}
                          className="font-body-sm text-on-surface-variant hover:text-primary transition-colors break-all"
                        >
                          {site.email}
                        </a>
                      ) : (
                        <p className="font-body-sm text-on-surface-variant">{item.text}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={site.socials.googleReviews}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[180px] rounded-xl shadow-lg relative overflow-hidden flex items-end p-space-md bg-gradient-to-br from-surface-container-high to-surface-container-lowest group"
            >
              <div className="relative z-10 bg-surface-container-high/90 backdrop-blur-md px-space-md py-space-xs rounded-lg shadow flex items-center gap-space-xs text-on-surface font-body-sm group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[18px]">domain</span>
                <span>{contact.map.label}</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
