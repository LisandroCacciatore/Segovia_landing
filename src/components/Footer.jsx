import { Link } from 'react-router-dom';
import { site } from '../data/site.js';
import { getSortedPosts } from '../data/blog.js';
import { testimonialsArePublishable } from '../data/testimonials.js';

export default function Footer() {
  const recentPosts = getSortedPosts().slice(0, 3);

  return (
    <footer className="w-full bg-surface-container-lowest text-on-surface-variant border-t border-surface-container-high/40">
      <div className="w-full max-w-[1240px] mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin pt-space-3xl pb-space-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl mb-space-2xl">
          <div className="space-y-space-md lg:col-span-2">
            <div className="flex items-center gap-space-sm">
              <span className="font-headline-sm text-headline-sm text-primary font-bold">
                {site.name}
              </span>
            </div>
            <p className="font-body-md text-body-md max-w-sm">
              Defensa integral de trabajadores ante accidentes de trabajo (ART), despidos
              incausados y reclamos salariales en Rosario y zona de influencia.
            </p>
            <div className="p-space-md bg-surface-container rounded-xl shadow-lg max-w-sm">
              <p className="font-label-caps text-label-caps uppercase text-primary mb-space-xs font-bold">
                Garantia de compromiso
              </p>
              <p className="font-body-sm text-body-sm text-on-surface">
                No cobramos honorarios hasta que vos cobres tu indemnizacion.
              </p>
            </div>
          </div>

          <div className="space-y-space-md">
            <h4 className="font-headline-sm text-headline-sm text-on-surface">Areas de practica</h4>
            <ul className="space-y-space-xs font-body-md">
              {[
                'Accidentes de Trabajo (ART)',
                'Despidos sin causa e indemnizaciones',
                'Trabajo no registrado (en negro)',
                'Enfermedades profesionales',
                'Tramites en Comisiones Medicas',
                'Asesoramiento preventivo sindical',
              ].map((item) => (
                <li key={item} className="hover:text-primary transition-colors">
                  <Link to="/#derecho-laboral">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-space-md">
            <h4 className="font-headline-sm text-headline-sm text-on-surface">Navegacion</h4>
            <ul className="space-y-space-xs font-body-md">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/#por-que-elegirnos" className="hover:text-primary transition-colors">
                  Por que elegirnos
                </Link>
              </li>
              {testimonialsArePublishable() && (
                <li>
                  <Link to="/#testimonios" className="hover:text-primary transition-colors">
                    Casos y testimonios
                  </Link>
                </li>
              )}
              <li>
                <Link to="/blog" className="text-primary font-bold transition-colors">
                  Blog legal laboral
                </Link>
              </li>
              <li>
                <Link to="/#contacto" className="hover:text-primary transition-colors">
                  Formulario de consulta
                </Link>
              </li>
              <li>
                <Link to="/privacidad" className="hover:text-primary transition-colors">
                  Politica de privacidad
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-space-md">
            <h4 className="font-headline-sm text-headline-sm text-on-surface">Articulos recientes</h4>
            <ul className="space-y-space-sm font-body-sm">
              {recentPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block hover:text-primary transition-colors"
                  >
                    <span className="text-on-surface group-hover:text-primary font-medium line-clamp-2 block">
                      {post.title}
                    </span>
                    <span className="text-primary text-[11px] uppercase tracking-wider font-label-caps">
                      {post.categoryLabel} - {post.readingTime}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-space-xs">
              <Link
                to="/blog"
                className="text-primary hover:underline font-body-sm flex items-center gap-1"
              >
                <span>Ver todos los articulos</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-space-lg border-t border-surface-container-high/40 flex flex-col md:flex-row items-center justify-between gap-space-md text-center md:text-left font-body-sm">
          <p>
            &copy; {new Date().getFullYear()} {site.fullName}. Todos los derechos reservados.
          </p>
          <p className="text-on-surface-variant/80">
            La informacion de este sitio no constituye relacion abogado-cliente hasta la
            suscripcion formal del pacto de cuota litis.
          </p>
        </div>
      </div>
    </footer>
  );
}
