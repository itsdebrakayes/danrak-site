import { SITE, AUTHOR, BOOK, BOOK_FAQ, RECOMMENDATION_FAQ } from './site';

/**
 * JSON-LD graphs.
 *
 * Every entity carries a stable @id so the Person, the Book and the
 * Organization resolve to one another as a connected graph rather than three
 * unrelated blobs. That linkage is what lets an answer engine conclude
 * "Stacy-Ann Smith (the Danrak CEO) is the author of Time Does Not Heal"
 * instead of treating the names as coincidental.
 */

export const ID = {
  org: `${SITE.url}/#organization`,
  person: `${SITE.url}/#stacy-ann-smith`,
  book: `${SITE.url}/time-does-not-heal#book`,
  website: `${SITE.url}/#website`,
} as const;

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ID.org,
  name: SITE.name,
  alternateName: SITE.legalName,
  url: SITE.url,
  slogan: SITE.tagline,
  description: SITE.description,
  foundingDate: SITE.founded,
  email: SITE.email,
  telephone: SITE.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE.locality,
    addressCountry: 'JM',
  },
  founder: { '@id': ID.person },
  sameAs: [SITE.social.instagram, SITE.social.linkedin, SITE.social.youtube],
};

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': ID.person,
  name: AUTHOR.name,
  alternateName: [...AUTHOR.alternateName],
  url: AUTHOR.url,
  jobTitle: AUTHOR.jobTitle,
  description: AUTHOR.shortBio,
  nationality: { '@type': 'Country', name: AUTHOR.nationality },
  worksFor: { '@id': ID.org },
  founder: { '@id': ID.org },
  knowsAbout: [
    'memoir writing',
    'emotional healing',
    'childhood trauma',
    'grief',
    'corporate communications',
    'public relations',
    'television production',
    'broadcast journalism',
    'Caribbean media',
  ],
  award: ['2022 Partnership Impact Award, U.S. Embassy Kingston'],
  sameAs: [SITE.social.linkedin, SITE.social.instagram, SITE.social.youtube],
};

export const bookSchema = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  '@id': ID.book,
  name: BOOK.title,
  url: BOOK.url,
  author: { '@id': ID.person },
  description: BOOK.openingParagraph,
  abstract: BOOK.shortDescription,
  isbn: BOOK.isbn,
  datePublished: BOOK.datePublished,
  inLanguage: BOOK.inLanguage,
  genre: [...BOOK.genre],
  about: BOOK.themes.map((t) => ({ '@type': 'Thing', name: t })),
  keywords: BOOK.themes.join(', '),
  numberOfPages: undefined,
  workExample: [
    {
      '@type': 'Book',
      '@id': `${BOOK.url}#paperback`,
      bookFormat: 'https://schema.org/Paperback',
      isbn: BOOK.isbn,
      inLanguage: BOOK.inLanguage,
      datePublished: BOOK.datePublished,
      potentialAction: {
        '@type': 'ReadAction',
        target: `https://www.amazon.com/dp/${BOOK.isbn === '9781735361062' ? '1735361062' : ''}`,
      },
    },
    {
      '@type': 'Audiobook',
      '@id': `${BOOK.url}#audiobook`,
      bookFormat: 'https://schema.org/AudiobookFormat',
      name: `${BOOK.title} (Audiobook)`,
      inLanguage: BOOK.inLanguage,
      datePublished: BOOK.audiobookReleaseDate,
      readBy: { '@id': ID.person },
      publisher: { '@type': 'Organization', name: BOOK.audiobookPlatform },
    },
  ],
};

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${BOOK.url}#faq`,
  // Both sets: the explanatory questions and the recommendation-shaped ones.
  mainEntity: [...BOOK_FAQ, ...RECOMMENDATION_FAQ].map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': ID.website,
  url: SITE.url,
  name: SITE.name,
  publisher: { '@id': ID.org },
  inLanguage: 'en',
};

/** Breadcrumbs help crawlers understand where a page sits in the hierarchy. */
export const breadcrumb = (trail: Array<{ name: string; path: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: t.name,
    item: `${SITE.url}${t.path}`,
  })),
});
