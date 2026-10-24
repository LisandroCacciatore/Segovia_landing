import { whyUs } from '../data/whyUs.js';
import { waLink } from '../utils/whatsapp.js';

export default function WhyChooseUs() {
  return (
    <section id="por-que-elegirnos" className="w-full py-space-3xl bg-surface relative">
      <div className="w-full max-w-[1240px] mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center">
          <div className="lg:col-span-5 relative">
            <div className="w-full aspect-[3/4] rounded-xl overflow-hidden shadow-2xl bg-surface-container relative">
              {whyUs.image ? (
                <img src={whyUs.image} alt={whyUs.imageAlt} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-space-md bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-lowest">
                  <span className="material-symbols-outlined text-primary/60 text-[72px]">
                    gavel
                  </span>
                  <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-widest">
                    Foto pendiente
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 p-space-md bg-surface-container-high/90 backdrop-blur-md rounded-lg shadow-lg">
                <p className="font-headline-sm text-primary">{whyUs.imageCaption.title}</p>
                <p className="font-body-sm text-on-surface-variant">{whyUs.imageCaption.subtitle}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col space-y-space-lg">
            <div>
              <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest">
                {whyUs.tag}
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
                {whyUs.title}
              </h2>
              <p className="font-body-md text-on-surface-variant mt-space-xs">{whyUs.description}</p>
            </div>

            <div className="space-y-space-md">
              {whyUs.pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="flex items-start gap-space-md p-space-md bg-surface-container rounded-xl shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[22px]">{pillar.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-on-surface text-base">{pillar.title}</h4>
                    <p className="font-body-sm text-on-surface-variant">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-space-xs">
              <a
                href={waLink('Hola, quiero coordinar una entrevista en el estudio')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-space-xs px-space-xl py-space-md bg-primary text-on-primary font-button-text rounded-xl shadow-[0_0_24px_-2px_rgba(212,175,55,0.3)] hover:bg-primary-fixed transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                <span>{whyUs.ctaLabel}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
