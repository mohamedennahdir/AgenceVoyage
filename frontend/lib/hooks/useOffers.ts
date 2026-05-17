'use client';

import { useQuery } from '@tanstack/react-query';
import { ALL_OFFERS, type SearchableOffer } from '@/lib/data/offers';

export type SortOption = 'recommended' | 'price_asc' | 'price_desc' | 'duration' | 'popularity';

export interface OfferFilters {
  type?: string;
  destination?: string;
  priceMin?: number;
  priceMax?: number;
  stars?: number[];
  sort?: SortOption;
}

function applyFilters(filters: OfferFilters): SearchableOffer[] {
  let result = [...ALL_OFFERS];

  if (filters.type && filters.type !== 'all') {
    if (filters.type === 'omra') {
      result = result.filter((o) => o.type === 'omra' || o.type === 'hajj');
    } else {
      result = result.filter((o) => o.type === filters.type);
    }
  }

  if (filters.destination) {
    const q = filters.destination.toLowerCase();
    result = result.filter((o) =>
      o.destinations.some((d) => d.toLowerCase().includes(q)) ||
      o.title.toLowerCase().includes(q),
    );
  }

  if (filters.priceMin && filters.priceMin > 0) {
    result = result.filter((o) => o.pricing.basePrice >= filters.priceMin!);
  }

  if (filters.priceMax && filters.priceMax > 0) {
    result = result.filter((o) => o.pricing.basePrice <= filters.priceMax!);
  }

  if (filters.stars && filters.stars.length > 0) {
    result = result.filter((o) => filters.stars!.includes(o.stars ?? 0));
  }

  switch (filters.sort) {
    case 'price_asc':
      result.sort((a, b) => a.pricing.basePrice - b.pricing.basePrice);
      break;
    case 'price_desc':
      result.sort((a, b) => b.pricing.basePrice - a.pricing.basePrice);
      break;
    case 'duration':
      result.sort((a, b) => a.duration.days - b.duration.days);
      break;
    case 'popularity':
      result.sort((a, b) => (b.stats.reviewCount ?? 0) - (a.stats.reviewCount ?? 0));
      break;
    default:
      // recommended: featured first, then by rating
      result.sort((a, b) => (b.stats.avgRating ?? 0) - (a.stats.avgRating ?? 0));
  }

  return result;
}

export function useOffers(filters: OfferFilters = {}) {
  return useQuery({
    queryKey: ['offers', filters],
    queryFn: () => applyFilters(filters),
    staleTime: 5 * 60 * 1000,
  });
}
