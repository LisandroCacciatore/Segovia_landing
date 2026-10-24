import { Link, useParams } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import SchemaOrg from '../components/SchemaOrg.jsx';
import { formatDate } from '../utils/formatDate.js';
import { site } from '../data/site.js';
import { author } from '../data/author.js';
import { getPostBySlug, getRelatedPosts } from '../data/blog.js';
import { waLink } from '../utils/whatsapp.js';

// Convierte **texto** en <strong>, sin meter HTML en los datos.
function renderInline(text) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={idx} className="font-semibold text-on-surface">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="bg-background min-h-screen py-40 text-center">
        <Seo
          title="Artículo no encontrado"
          description="El artículo que buscas no existe."
          path={`/blog/${slug}`}
          noindex
        />
        <div className="max-w-[600px] mx-auto px-6">
          <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest">
            404
          </span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mt-4 mb-6">
            Ese artículo no existe.
          </h1>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary hover:underline font-body-md"
          >
            <span className="material-symbols-outlined text-[18px]">
              arrow_back
            </span>
            <span>Volver al blog</span>
          </Link>
        </div>
      </div>
    );
  }

  const related = getRelatedPosts(post.slug, post.category);

  return (
    <article className="bg-background min-h-screen">
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        article={{ date: post.date, categoryLabel: post.categoryLabel }}
      />
      <SchemaOrg type="Article" article={post} />

      {/* Breadcrumbs */}
      <div className="w-full bg-surface-container-lowest border-b border-surface-container-high/30 py-space-sm">
        <div className="w-full max-w-[1240px] mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin flex items-center justify-between">
          <nav aria-label="Migas de pan" className="flex items-center gap-space-xs font-body-sm text-on-surface-variant overflow-hidden">
            <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1 shrink-0">
              <span className="material-symbols-outlined text-[16px]">
                home
              </span>
              <span>Inicio</span>
            </Link>
            <span className="text-secondary-container">/</span>
            <Link to="/blog" className="hover:text-primary transition-colors shrink-0">
              Blog
            </Link>
            <span className="text-secondary-container">/</span>
            <span className="text-on-surface truncate max-w-[160px] sm:max-w-md">
              {post.title}
            </span>
          </nav>
          <Link
            to="/blog"
            className="hidden sm:inline-flex items-center gap-1 text-primary hover:underline font-body-sm shrink-0 ml-4"
          >
            <span className="material-symbols-outlined text-[16px]">
              arrow_back
            </span>
            <span>Volver al Blog</span>
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="w-full py-space-2xl bg-surface relative border-b border-surface-container-high/30">
        <div className="w-full max-w-[960px] mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin space-y-space-md">
          <div className="flex flex-wrap items-center gap-space-sm">
            <Link
              to={`/blog#${post.category}`}
              className="font-label-caps text-label-caps uppercase text-primary tracking-widest bg-surface-container-high hover:bg-primary hover:text-on-primary transition-colors px-space-sm py-1 rounded"
            >
              {post.categoryLabel}
            </Link>
            <span className="text-on-surface-variant text-body-sm">
              Actualizado a {new Date(post.date).toLocaleDateString('es-AR', {
                month: 'long',
                year: 'numeric',
              })}</span>
          </div>

          <h1 className="font-display-hero text-display-hero-mobile md:text-headline-lg text-on-surface leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-space-lg text-on-surface-variant font-body-sm pt-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="w-7 h-7 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-xs">
                {author.initials}
              </span>
              <span className="text-on-surface font-medium">
                Por {post.author}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">
                calendar_month
              </span>
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">
                schedule
              </span>
              <span>Tiempo de lectura: {post.readingTime}</span>
            </div>
          </div>

          <div className="mt-space-lg w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden bg-surface-container-high relative border border-surface-container-highest flex items-center justify-center">
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
              Imagen del artículo
            </span>
            <span className="absolute bottom-4 left-4 right-4 text-xs font-body-sm text-on-surface-variant/90 italic flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">
                photo_camera
              </span>
              <span>Foto ilustrativa: contenido del artículo.</span>
            </span>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="w-full py-space-3xl bg-surface">
        <div className="w-full max-w-[1240px] mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl">
            <article className="lg:col-span-8 space-y-space-xl">
              <div className="p-space-lg bg-surface-container rounded-xl border-l-4 border-primary shadow-md space-y-space-xs">
                <div className="flex items-center gap-space-xs text-primary font-bold font-headline-sm text-base">
                  <span className="material-symbols-outlined text-[22px]">
                    quick_reference
                  </span>
                  <span>Respuesta Rápida</span>
                </div>
                <p className="font-body-md text-on-surface leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="space-y-space-lg text-on-surface leading-relaxed font-body-md">
                {post.content.map((block, i) => {
                  if (block.startsWith('## ')) {
                    return (
                      <h2
                        key={i}
                        className="font-headline-md text-headline-md text-on-surface font-serif pt-space-sm border-b border-surface-container-high/50 pb-space-xs"
                      >
                        {renderInline(block.replace('## ', ''))}
                      </h2>
                    );
                  }
                  if (block.startsWith('### ')) {
                    return (
                      <h3
                        key={i}
                        className="font-headline-sm text-headline-sm text-on-surface font-semibold pt-space-xs"
                      >
                        {renderInline(block.replace('### ', ''))}
                      </h3>
                    );
                  }
                  if (block.startsWith('> ')) {
                    return (
                      <blockquote
                        key={i}
                        className="p-space-md bg-surface-container-high/60 rounded-lg border-l-4 border-primary text-on-surface italic font-body-sm"
                      >
                        {renderInline(block.replace('> ', ''))}
                      </blockquote>
                    );
                  }
                  if (/^\d+\. /.test(block)) {
                    return (
                      <p key={i} className="pl-space-md">
                        {renderInline(block)}
                      </p>
                    );
                  }
                  if (block.startsWith('- ')) {
                    return (
                      <p key={i} className="pl-space-md text-on-surface-variant">
                        • {renderInline(block.replace('- ', ''))}
                      </p>
                    );
                  }
                  return (
                    <p key={i} className="text-on-surface-variant">
                      {renderInline(block)}
                    </p>
                  );
                })}
              </div>

              <div className="p-space-xl bg-surface-container rounded-xl border border-primary/30 shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-space-lg shadow-md">
                <div className="w-20 h-20 rounded-full bg-primary/20 text-primary font-headline-lg font-bold flex items-center justify-center shrink-0 border-2 border-primary/40">
                  {author.initials}
                </div>
                <div className="text-center sm:text-left space-y-space-xs">
                  <span className="font-label-caps text-label-caps uppercase text-primary tracking-wider">
                    Autor del Artículo
                  </span>
                  <h4 className="font-headline-sm text-on-surface font-bold">
                    {author.name}
                  </h4>
                  <p className="text-primary text-body-sm font-medium">
                    {author.role}
                  </p>
                  <p className="font-body-sm text-on-surface-variant leading-relaxed pt-space-xs">
                    {author.bio}
                  </p>
                </div>
              </div>

              <div className="p-space-xl bg-surface-container-high rounded-xl border border-primary/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-space-lg">
                <div className="space-y-space-xs text-center md:text-left">
                  <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest font-bold">
                    Asesoramiento Urgente
                  </span>
                  <h4 className="font-headline-sm text-on-surface">
                    Te despidieron o tenés un problema laboral?
                  </h4>
                  <p className="font-body-sm text-on-surface-variant">
                    Escribinos al WhatsApp oficial del estudio para auditar tu caso sin cargo.
                  </p>
                </div>
                <a
                  href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Hola, leí el artículo y necesito asesoramiento para mi caso')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap px-space-xl py-space-md bg-primary text-on-primary font-button-text rounded-xl shadow-[0_0_24px_-2px_rgba(212,175,55,0.4)] hover:bg-primary-fixed transition-all flex items-center gap-space-xs"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    chat
                  </span>
                  <span>Pedir Consulta</span>
                </a>
              </div>
            </article>

            <aside className="lg:col-span-4 space-y-space-xl">
              <div className="p-space-lg bg-surface-container rounded-xl border border-surface-container-high/60 shadow-md sticky top-32 space-y-space-md">
                <div className="flex items-center gap-space-xs text-primary font-bold">
                  <span className="material-symbols-outlined text-[20px]">
                    format_list_bulleted
                  </span>
                  <span className="font-label-caps text-label-caps uppercase tracking-wider">
                    Índice del Artículo
                  </span>
                </div>
                <p className="font-body-sm text-on-surface-variant">
                  Contenido en preparación.
                </p>
                <div className="pt-space-md border-t border-surface-container-high/60 space-y-space-sm">
                  <div className="flex items-center gap-space-xs text-tertiary font-body-sm">
                    <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                    <span className="font-bold">Guardia Activa</span>
                  </div>
                  <a
                    href={`https://wa.me/${site.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-space-xs px-space-md py-space-sm bg-primary text-on-primary font-button-text rounded-lg hover:bg-primary-fixed transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      chat
                    </span>
                    <span>WhatsApp: {site.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="w-full py-space-3xl bg-surface-container-lowest border-t border-surface-container-high/30">
          <div className="w-full max-w-[1240px] mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin space-y-space-xl">
            <div className="flex items-center justify-between">
              <div className="space-y-space-xs">
                <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest">
                  Seguí Leyendo
                </span>
                <h3 className="font-headline-md text-on-surface">
                  Artículos relacionados
                </h3>
              </div>
              <Link
                to="/blog"
                className="text-primary hover:underline font-body-sm flex items-center gap-1"
              >
                <span>Ver todo el blog</span>
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
              {related.map((r) => (
                <article
                  key={r.slug}
                  className="p-space-lg bg-surface-container rounded-xl shadow-sm hover:-translate-y-1 transition-transform border border-surface-container-high/30 flex flex-col justify-between"
                >
                  <div className="space-y-space-sm">
                    <Link
                      to={`/blog#${r.category}`}
                      className="inline-block font-label-caps text-label-caps uppercase text-primary bg-surface-container-high hover:bg-primary hover:text-on-primary transition-colors px-space-xs py-0.5 rounded"
                    >
                      {r.categoryLabel}
                    </Link>
                    <h4 className="font-headline-sm text-base text-on-surface hover:text-primary transition-colors font-semibold">
                      <Link to={`/blog/${r.slug}`}>{r.title}</Link>
                    </h4>
                    <p className="font-body-sm text-on-surface-variant line-clamp-2">
                      {r.excerpt}
                    </p>
                  </div>
                  <div className="pt-space-md flex items-center justify-between text-xs text-on-surface-variant">
                    <span>{r.author}</span>
                    <Link
                      to={`/blog/${r.slug}`}
                      className="text-primary font-medium hover:underline"
                    >
                      Leer artículo →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}