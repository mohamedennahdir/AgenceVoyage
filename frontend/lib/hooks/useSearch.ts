'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import type { OfferFilters, SortOption } from '@/lib/hooks/useOffers';

export interface SearchState extends OfferFilters {
  sort: SortOption;
  page: number;
}

export function useSearch(): {
  filters: SearchState;
  updateFilters: (updates: Partial<SearchState>) => void;
  resetFilters: () => void;
} {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const starsRaw = searchParams.get('stars');
  const filters: SearchState = {
    type: searchParams.get('type') ?? '',
    destination: searchParams.get('destination') ?? '',
    priceMin: Number(searchParams.get('priceMin')) || 0,
    priceMax: Number(searchParams.get('priceMax')) || 0,
    stars: starsRaw ? starsRaw.split(',').map(Number).filter(Boolean) : [],
    sort: (searchParams.get('sort') as SortOption) || 'recommended',
    page: Number(searchParams.get('page')) || 1,
  };

  const updateFilters = useCallback(
    (updates: Partial<SearchState>) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(updates)) {
        if (
          value === undefined ||
          value === '' ||
          value === 0 ||
          (Array.isArray(value) && value.length === 0)
        ) {
          params.delete(key);
        } else if (Array.isArray(value)) {
          params.set(key, value.join(','));
        } else {
          params.set(key, String(value));
        }
      }

      // Reset page on filter change unless explicitly setting page
      if (!('page' in updates)) {
        params.delete('page');
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const resetFilters = useCallback(() => {
    const params = new URLSearchParams();
    const type = searchParams.get('type');
    if (type) params.set('type', type);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  return { filters, updateFilters, resetFilters };
}
