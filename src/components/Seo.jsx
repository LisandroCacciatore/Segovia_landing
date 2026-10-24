import { Helmet } from 'react-helmet-async';
import { site } from '../data/site.js';

export default function Seo({
  title,
  description,
  path = '/',
  image = '',
  type = 'website',
  noindex = false,
  article = null,
}) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`;
  const canonical = `${site.url}${path}`;
  const ogImage = image ? (image.startsWith('http') ? image : `${site.url}${image}`) : '';

  return (
    <Helmet>
      <html lang="es" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:locale" content="es_AR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {article && (
        <>
          <meta property="article:published_time" content={article.date} />
          <meta property="article:author" content={site.name} />
          <meta property="article:section" content={article.categoryLabel} />
        </>
      )}
    </Helmet>
  );
}
