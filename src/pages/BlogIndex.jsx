import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import BlogCard from '../components/BlogCard.jsx';
import { blogCategories, getPostsByCategory, getSortedPosts } from '../data/blog.js';

export default function BlogIndex() {
  const location = useLocation();
  const navigate = useNavigate();

  // La URL es la unica fuente de verdad de la categoria activa. Antes esto era
  // un useState que ademas escribia window.location.hash a mano: eso dispara
  // una navegacion del navegador (y en algunos entornos recarga la pagina), con
  // lo cual el filtro se perdia. Con el router, el click, el deep link
  // (/blog#art) y el boton de atras dicen todos lo mismo.
  const activeCategory = useMemo(() => {
    const hash = location.hash.replace('#', '').toLowerCase();
    return blogCategories.some((c) => c.id === hash) ? hash : 'all';
  }, [location.hash]);

  const posts = useMemo(() => {
    const filtered = getPostsByCategory(activeCategory);
    return [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [activeCategory]);

  const handleCategoryChange = (categoryId) => {
    navigate(categoryId === 'all' ? '/blog' : `/blog#${categoryId}`);
  };

  return (
    <div className="bg-background min-h-screen">
      <Seo
        title="Blog legal laboral"
        description="Informacion clara y de utilidad practica para trabajadores de Rosario y la region sobre despidos, accidentes laborales, ART y reclamos salariales."
        path="/blog"
      />

      <section className="relative w-full overflow-hidden bg-surface-container-lowest border-b border-surface-container-high/30">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-primary-container/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-[1240px] mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin py-space-2xl relative z-10">
          <div className="max-w-3xl space-y-space-sm">
            <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container-high text-primary font-label-caps text-label-caps uppercase tracking-widest">
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              <span>Articulos y guias practicas</span>
            </div>
            <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero text-on-surface">
              Blog <span className="text-primary italic">legal laboral</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Informacion clara y de utilidad practica para trabajadores de Rosario y la region
              sobre despidos, accidentes laborales, ART y reclamos salariales.
            </p>
          </div>

          <div className="mt-space-xl flex items-center gap-2 overflow-x-auto pb-2">
            {blogCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === 'all' ? getSortedPosts().length : getPostsByCategory(cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={
                    'px-space-md py-1.5 rounded-full font-button-text text-xs whitespace-nowrap transition-all border ' +
                    (isActive
                      ? 'bg-primary text-on-primary font-bold shadow-md border-primary'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface border-surface-container-high/40')
                  }
                >
                  {cat.label}
                  {cat.id === 'all' && ` (${count})`}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full py-space-3xl bg-surface">
        <div className="w-full max-w-[1240px] mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin">
          <p className="font-body-sm text-on-surface-variant mb-space-md" aria-live="polite">
            {posts.length} {posts.length === 1 ? 'articulo' : 'articulos'}
            {activeCategory !== 'all' ? ' en esta categoria' : ''}
          </p>

          {posts.length === 0 ? (
            <div className="text-center py-space-3xl px-space-md bg-surface-container rounded-xl border border-surface-container-high/30">
              <span className="material-symbols-outlined text-[48px] text-primary mb-space-sm">
                search_off
              </span>
              <h3 className="font-headline-sm text-on-surface mb-2">
                Todavia no hay articulos en esta categoria.
              </h3>
              <p className="font-body-md text-on-surface-variant mb-space-lg">
                Estamos preparando el contenido. Mientras tanto podes consultarnos directamente.
              </p>
              <button
                type="button"
                onClick={() => handleCategoryChange('all')}
                className="inline-flex items-center gap-space-xs px-space-md py-space-sm bg-primary text-on-primary font-button-text rounded-xl shadow-md hover:bg-primary-fixed transition-colors"
              >
                Ver todos los articulos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
