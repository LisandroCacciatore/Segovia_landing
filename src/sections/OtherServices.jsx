import { otherServices } from '../data/otherServices.js';
import { waLink } from '../utils/whatsapp.js';

export default function OtherServices() {
  return (
    <section id="otros-servicios" className="w-full py-space-3xl bg-surface-container-lowest">
      <div className="w-full max-w-[1240px] mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-space-md">
          <div>
            <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest">
              Asesoria complementaria
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
              Otros servicios legales
            </h2>
          </div>
          <p className="font-body-md text-on-surface-variant max-w-md">
            Ademas de nuestra especializacion laboral, te acompanamos con solvencia tecnica en
            gestiones civiles y comerciales.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {otherServices.map((service) => (
            <div
              key={service.title}
              className="p-space-lg bg-surface-container rounded-xl shadow-sm hover:bg-surface-container-high transition-colors flex flex-col justify-between"
            >
              <div className="space-y-space-sm">
                <span className="material-symbols-outlined text-primary text-[32px]">
                  {service.icon}
                </span>
                <h4 className="font-headline-sm text-on-surface">{service.title}</h4>
                <p className="font-body-sm text-on-surface-variant">{service.description}</p>
              </div>
              <div className="pt-space-md">
                <a
                  href={waLink(service.whatsappText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-button-text text-primary flex items-center gap-1 hover:underline"
                >
                  <span>{service.ctaLabel}</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
