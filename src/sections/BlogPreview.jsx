import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard.jsx';
import { getSortedPosts } from '../data/blog.js';

export default function BlogPreview() {
  const posts = getSortedPosts().slice(0, 6);

  return (
    <section id="blog" className="w-full py-space-3xl bg-surface relative">
      <div className="w-full max-w-[1240px] mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-space-md">
          <div>
            <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest">
              Recursos para trabajadores
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
              Blog legal laboral
            </h2>
            <p className="font-body-md text-on-surface-variant max-w-2xl mt-space-xs">
              Guias practicas sobre despidos, ART, trabajo en negro y reclamos laborales en
              Rosario.
            </p>
          </div>
          <div className="hidden sm:block">
            <Link
              to="/blog"
              className="inline-flex items-center gap-space-xs px-space-lg py-space-sm bg-surface-container hover:bg-surface-container-high text-primary font-button-text rounded-xl shadow-sm transition-colors"
            >
              <span>Ver todos los articulos</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-space-2xl text-center">
          <Link
            to="/blog"
            className="inline-flex items-center justify-center gap-space-xs px-space-xl py-space-md bg-primary text-on-primary font-button-text rounded-xl shadow-[0_0_24px_-2px_rgba(212,175,55,0.35)] hover:bg-primary-fixed hover:shadow-[0_0_32px_0px_rgba(212,175,55,0.45)] transition-all transform hover:-translate-y-0.5"
          >
            <span>Ver todos los articulos</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
