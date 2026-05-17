import type { MetadataRoute } from 'next';
import { ALL_OFFERS } from '@/lib/data/offers';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://voyages.dz';

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
  { url: `${BASE_URL}/offres`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  { url: `${BASE_URL}/omra`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/recherche`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
  { url: `${BASE_URL}/destinations`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
  { url: `${BASE_URL}/a-propos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE_URL}/cgv`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  { url: `${BASE_URL}/confidentialite`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  { url: `${BASE_URL}/mentions-legales`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const offerRoutes: MetadataRoute.Sitemap = ALL_OFFERS.map((offer) => ({
    url: `${BASE_URL}/offres/${offer.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...STATIC_ROUTES, ...offerRoutes];
}
