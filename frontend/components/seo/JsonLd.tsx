interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ── Factories ─────────────────────────────────────────────────────────────────

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://voyages.dz';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Voyages Algérie',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: 'Agence de voyages agréée — Catégorie A. Spécialiste Omra, Hajj, circuits et packages depuis l\'Algérie.',
    telephone: '+213-XX-XX-XX-XX',
    email: 'contact@voyages.dz',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '45 Rue Didouche Mourad',
      addressLocality: 'Alger',
      postalCode: '16000',
      addressCountry: 'DZ',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+213-XX-XX-XX-XX',
      contactType: 'customer service',
      availableLanguage: ['fr', 'ar'],
      contactOption: 'TollFree',
    },
    sameAs: [
      'https://www.facebook.com/voyagesalgerie',
      'https://www.instagram.com/voyagesalgerie',
    ],
    openingHours: ['Mo-Th 08:30-17:00', 'Sa 09:00-13:00'],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Voyages Algérie',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/recherche?destination={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function offerSchema(offer: {
  title: string;
  description: string;
  slug: string;
  mainImage: string;
  basePrice: number;
  avgRating?: number;
  reviewCount?: number;
  availability?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: offer.title,
    description: offer.description,
    image: [offer.mainImage],
    url: `${BASE_URL}/offres/${offer.slug}`,
    offers: {
      '@type': 'Offer',
      price: offer.basePrice.toString(),
      priceCurrency: 'DZD',
      availability: offer.availability === 'sold_out'
        ? 'https://schema.org/SoldOut'
        : 'https://schema.org/InStock',
      url: `${BASE_URL}/offres/${offer.slug}`,
      seller: {
        '@type': 'Organization',
        name: 'Voyages Algérie',
      },
    },
    ...(offer.avgRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: offer.avgRating.toFixed(1),
        reviewCount: offer.reviewCount ?? 0,
        bestRating: '5',
        worstRating: '1',
      },
    }),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}
