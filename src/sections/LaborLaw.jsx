import { services, telegramBanner } from '../data/services.js';
import { waLink } from '../utils/whatsapp.js';

export default function LaborLaw() {
  return (
    <section id="derecho-laboral" className="w-full py-space-3xl bg-surface relative">
      <div className="w-full max-w-[1240px] mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin">
        <div className="max-w-3xl mb-space-2xl space-y-space-sm">
          <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest">
            Especialidad troncal
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Derecho laboral y accidentes de trabajo
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Estamos para defender tu trabajo y tu salud. Si sufriste un{' '}
            <strong className="text-on-surface font-semibold">despido</strong> o un{' '}
            <strong className="text-on-surface font-semibold">accidente laboral</strong>, no
            esperes: los plazos corren y tus derechos prescriben. Nos encargamos de todo el
            reclamo para que recibas la indemnizacion o reparacion correspondiente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative flex flex-col justify-between p-space-xl bg-surface-container rounded-xl shadow-md hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="space-y-space-md">
                <div className="w-14 h-14 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors shadow-sm">
                  <span
                    className="material-symbols-outlined text-[30px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {service.icon}
                  </span>
                </div>
                <div>
                  <span className="font-label-caps text-label-caps uppercase text-primary tracking-wider">
                    {service.tag}
                  </span>
                  <h3 className="font-headline-md text-headline-md text-on-surface mt-1">
                    {service.title}
                  </h3>
                </div>
                <p className="font-body-md text-on-surface-variant">{service.description}</p>
                <ul className="space-y-space-xs pt-space-xs font-body-sm text-on-surface">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-space-lg">
                <a
                  href={waLink(service.whatsappText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-space-xs py-space-sm px-space-md bg-surface-container-high hover:bg-primary hover:text-on-primary text-primary font-button-text rounded-lg transition-colors"
                >
                  <span>{service.ctaLabel}</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-space-2xl p-space-lg md:p-space-xl bg-surface-container-high rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-space-lg">
          <div className="flex items-start md:items-center gap-space-md">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[28px]">{telegramBanner.icon}</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-on-surface">{telegramBanner.title}</h4>
              <p className="font-body-md text-on-surface-variant">{telegramBanner.description}</p>
            </div>
          </div>
          <a
            href={waLink(telegramBanner.whatsappText)}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap px-space-xl py-space-md bg-primary text-on-primary font-button-text rounded-xl hover:bg-primary-fixed shadow-[0_0_24px_-2px_rgba(212,175,55,0.3)] transition-all"
          >
            {telegramBanner.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
