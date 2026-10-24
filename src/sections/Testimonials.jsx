import { testimonials, testimonialsArePublishable } from '../data/testimonials.js';
import { site } from '../data/site.js';

export default function Testimonials() {
  // Si no hay un solo testimonio autorizado (isPlaceholder: false), la seccion
  // no se publica. Se muestra solo en desarrollo para poder revisar el diseno.
  // Publicar testimonios inventados en el sitio de un abogado es publicidad
  // enganosa: ver el comentario en src/data/testimonials.js
  if (!testimonialsArePublishable() && !import.meta.env.DEV) return null;

  return (
    <section id="testimonios" className="w-full py-space-3xl bg-surface-container-lowest">
      <div className="w-full max-w-[1240px] mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin">
        {!testimonialsArePublishable() && (
          <div className="mb-space-lg p-space-md rounded-xl border border-primary/40 bg-surface-container text-on-surface font-body-sm">
            <strong className="text-primary">Vista de desarrollo.</strong> Estos testimonios son
            placeholder y NO se publican: no coinciden con ninguna resena real de Google. Antes de
            publicar hay que reemplazarlos por resenas verificables o quitar la seccion.
          </div>
        )}

        <div className="text-center max-w-2xl mx-auto mb-space-2xl space-y-space-xs">
          <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest">
            Opinan quienes confiaron en nosotros
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Testimonios reales</h2>
          <p className="font-body-md text-on-surface-variant">
            Historias de trabajadores y familias que recuperaron su tranquilidad e
            indemnizaciones correspondientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-space-xl bg-surface-container rounded-xl shadow-md flex flex-col justify-between relative"
            >
              <div className="space-y-space-md">
                <div className="flex items-center gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-md text-on-surface italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="pt-space-lg flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-primary shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="font-headline-sm text-on-surface text-sm font-semibold">{t.name}</p>
                  <p className="font-body-sm text-on-surface-variant">{t.case}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-space-2xl text-center">
          <a
            href={site.socials.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-body-sm font-medium shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined text-primary text-[18px]">reviews</span>
            <span>Ver comentarios en Google</span>
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </a>
        </div>
      </div>
    </section>
  );
}
