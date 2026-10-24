import { Helmet } from 'react-helmet-async';
import { site } from '../data/site.js';
import { author } from '../data/author.js';

export default function SchemaOrg({ type, article = null }) {
  let data = null;

  if (type === 'LegalService') {
    data = {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: site.name,
      description:
        'Estudio juridico laboralista en Rosario. Despidos, ART, diferencias salariales y otros reclamos laborales.',
      url: site.url,
      email: site.email,
      telephone: `+${site.whatsapp}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Balcarce 1651',
        postalCode: 'S2000QJR',
        addressLocality: 'Rosario',
        addressRegion: 'Santa Fe',
        addressCountry: 'AR',
      },
      areaServed: ['Rosario', 'Santa Fe', 'Argentina'],
      knowsLanguage: 'es-AR',
      priceRange: '$$',
      founder: {
        '@type': 'Person',
        name: author.name,
        jobTitle: 'Abogado Laboralista',
      },
    };
  }

  if (type === 'Article' && article) {
    data = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.excerpt,
      datePublished: article.date,
      author: { '@type': 'Person', name: article.author },
      publisher: { '@type': 'Organization', name: site.name, url: site.url },
      mainEntityOfPage: `${site.url}/blog/${article.slug}`,
      inLanguage: 'es-AR',
    };
  }

  if (!data) return null;

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}
