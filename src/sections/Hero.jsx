import { hero } from '../data/hero.js';
import { waLink } from '../utils/whatsapp.js';

export default function Hero() {
  return (
    <section id="inicio" className="relative w-full overflow-hidden bg-surface-container-lowest">
      <div className="absolute -top-40 -left-40 w-[550px] h-[550px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-primary-container/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1240px] mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin py-space-2xl lg:py-space-3xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          <div className="lg:col-span-7 flex flex-col items-start space-y-space-lg">
            <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/90 shadow-sm">
              <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
              <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest">
                {hero.badge}
              </span>
            </div>

            <div className="space-y-space-sm">
              <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero text-on-surface tracking-tight">
                {hero.title}{' '}
                <br className="hidden sm:inline" />
                <span className="text-primary italic">{hero.titleAccent}</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                {hero.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-space-sm sm:gap-space-md w-full pt-space-xs">
              {hero.highlights.map((h) => (
                <div
                  key={h.text}
                  className="flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container rounded-lg shadow-sm"
                >
                  <span
                    className="material-symbols-outlined text-primary text-[20px] shrink-0"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {h.icon}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">
                    {h.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md pt-space-sm w-full sm:w-auto">
              <a
                href={waLink('Hola, quiero hacer una consulta laboral')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-space-sm px-space-xl py-space-md bg-primary text-on-primary font-button-text rounded-xl shadow-[0_0_24px_-2px_rgba(212,175,55,0.35)] hover:bg-primary-fixed hover:shadow-[0_0_32px_0px_rgba(212,175,55,0.45)] transition-all transform hover:-translate-y-0.5"
              >
                <span className="material-symbols-outlined text-[20px]">{hero.ctaPrimary.icon}</span>
                <span>{hero.ctaPrimary.label}</span>
              </a>
              <a
                href="#derecho-laboral"
                className="inline-flex items-center justify-center gap-space-xs px-space-lg py-space-md bg-surface-container hover:bg-surface-container-high text-on-surface font-button-text rounded-xl shadow-sm transition-colors"
              >
                <span>{hero.ctaSecondary.label}</span>
                <span className="material-symbols-outlined text-[18px]">
                  {hero.ctaSecondary.icon}
                </span>
              </a>
            </div>

            <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm">
              <span className="material-symbols-outlined text-tertiary text-[18px]">timer</span>
              <span>{hero.urgencyText}</span>
            </div>
          </div>

          <div className="lg:col-span-5 relative mt-space-lg lg:mt-0 flex justify-center">
            <div className="relative w-full max-w-[460px] aspect-[4/5] rounded-xl overflow-hidden shadow-2xl bg-surface-container-low group">
              {hero.image ? (
                <img
                  src={hero.image}
                  alt={hero.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-space-md bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-lowest">
                  <span
                    className="material-symbols-outlined text-primary/60 text-[88px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    balance
                  </span>
                  <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-widest text-center px-space-lg">
                    Foto pendiente
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 p-space-md bg-surface-container-high/95 backdrop-blur-md rounded-xl shadow-xl flex items-center justify-between gap-space-sm">
                <div className="flex items-center gap-space-sm min-w-0">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                    <span
                      className="material-symbols-outlined text-[22px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      balance
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-label-caps text-label-caps text-primary uppercase truncate">
                      {hero.badgeCard.label}
                    </p>
                    <p className="font-headline-sm text-on-surface font-bold text-sm truncate">
                      {hero.badgeCard.title}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-label-caps text-label-caps text-tertiary flex items-center gap-1 justify-end">
                    <span className="w-2 h-2 rounded-full bg-tertiary inline-block animate-pulse" />
                    {hero.badgeCard.status}
                  </span>
                  <span className="font-body-sm text-on-surface-variant">
                    {hero.badgeCard.statusSubtext}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
