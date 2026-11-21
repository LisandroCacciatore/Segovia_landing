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
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '16:00',
        },
      ],
      founder: {
        '@type': 'Person',
        name: author.name,
        jobTitle: 'Abogado Laboralista',
        identifier: author.matricula || undefined,
      },
    };
  }

  if (type === 'Article' && article) {
    const posting = {
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.excerpt,
      datePublished: article.date,
      author: { '@type': 'Person', name: article.author },
      publisher: { '@type': 'Organization', name: site.name, url: site.url },
      mainEntityOfPage: `${site.url}/blog/${article.slug}`,
      inLanguage: 'es-AR',
    };

    // FAQPage: es lo que permite que un motor de respuestas (AEO) cite el
    // articulo pregunta por pregunta en lugar de resumir el cuerpo entero.
    const faq = article.faq || [];
    if (faq.length > 0) {
      data = {
        '@context': 'https://schema.org',
        '@graph': [
          posting,
          {
            '@type': 'FAQPage',
            mainEntity: faq.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
        ],
      };
    } else {
      data = { '@context': 'https://schema.org', ...posting };
    }
  }

  if (!data) return null;

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}
