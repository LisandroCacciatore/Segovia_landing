import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate.js';

export default function BlogCard({ post }) {
  return (
    <article className="group relative flex flex-col justify-between p-space-xl bg-surface-container rounded-xl shadow-md hover:-translate-y-1.5 transition-all duration-300 border border-surface-container-high/30">
      <div className="space-y-space-md">
        <div className="flex items-center justify-between gap-space-sm">
          <Link
            to={`/blog#${post.category}`}
            className="font-label-caps text-label-caps uppercase text-primary tracking-wider bg-surface-container-high hover:bg-primary hover:text-on-primary transition-colors px-space-sm py-1 rounded"
          >
            {post.categoryLabel}
          </Link>
          <div className="flex items-center gap-1 text-on-surface-variant font-body-sm shrink-0">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors leading-snug">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between pt-space-xs border-t border-surface-container-high/40 text-on-surface-variant font-body-sm gap-space-sm">
          <span className="truncate">{post.author}</span>
          <span className="shrink-0">{formatDate(post.date)}</span>
        </div>
      </div>
      <div className="pt-space-lg">
        <Link
          to={`/blog/${post.slug}`}
          className="w-full inline-flex items-center justify-between py-space-sm px-space-md bg-surface-container-high hover:bg-primary hover:text-on-primary text-primary font-button-text rounded-lg transition-colors"
        >
          <span>Leer articulo</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
    </article>
  );
}
