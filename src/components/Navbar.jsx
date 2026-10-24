import { useState } from 'react';
import { Link } from 'react-router-dom';
import { nav, site } from '../data/site.js';
import { testimonialsArePublishable } from '../data/testimonials.js';
import { waLink } from '../utils/whatsapp.js';

// La seccion de testimonios no se publica hasta que haya resenas reales
// autorizadas. Si no esta, el link del menu seria un ancla muerta.
const items = nav.filter((i) => i.to !== '/#testimonios' || testimonialsArePublishable());

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-surface-container-lowest text-on-surface-variant font-body-sm border-b border-surface-container-high/40">
        <div className="w-full max-w-[1240px] mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin h-10 flex items-center justify-between">
          <div className="flex items-center gap-space-lg overflow-hidden">
            <a
              href={`tel:${site.phone}`}
              className="flex items-center gap-space-xs hover:text-primary transition-colors whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[16px] text-primary">call</span>
              <span>{site.phoneDisplay}</span>
            </a>
            <span className="hidden md:inline text-secondary-container">|</span>
            <a
              href={`mailto:${site.email}`}
              className="hidden sm:flex items-center gap-space-xs hover:text-primary transition-colors truncate"
            >
              <span className="material-symbols-outlined text-[16px] text-primary">mail</span>
              <span className="truncate">{site.email}</span>
            </a>
            <span className="hidden lg:inline text-secondary-container">|</span>
            <div className="hidden lg:flex items-center gap-space-xs whitespace-nowrap">
              <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
              <span>{site.addressShort}</span>
            </div>
          </div>
          <span className="hidden sm:inline font-label-caps text-label-caps uppercase text-primary tracking-widest">
            Atencion urgente ART y despidos
          </span>
        </div>
      </div>

      <div className="bg-surface-container-low/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
        <div className="w-full max-w-[1240px] mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin h-20 flex items-center justify-between gap-space-md">
          <Link to="/" className="flex items-center gap-space-md group">
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">
                {site.name}
              </span>
              <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider">
                {site.tagline}
              </span>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-space-lg">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-space-sm sm:gap-space-md">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-space-xs px-space-md py-space-sm bg-primary text-on-primary hover:bg-primary-fixed font-button-text text-button-text rounded-xl shadow-[0_0_24px_-2px_rgba(212,175,55,0.28)] transition-all transform hover:-translate-y-0.5"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Pedi tu consulta</span>
            </a>

            <button
              type="button"
              aria-label="Abrir menu de navegacion"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="xl:hidden w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]">
                {open ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {open && (
          <div className="xl:hidden bg-surface-container-low border-t border-surface-container-high/60 px-gutter-mobile py-space-md">
            <nav className="flex flex-col space-y-space-sm font-body-md">
              {items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="py-space-xs px-space-sm rounded-lg text-on-surface-variant hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-space-sm">
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-space-xs px-space-md py-space-sm bg-primary text-on-primary font-button-text rounded-xl"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>WhatsApp directo</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
