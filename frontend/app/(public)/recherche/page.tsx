'use client';

import { Suspense } from 'react';
import { useSearch } from '@/lib/hooks/useSearch';
import { useOffers } from '@/lib/hooks/useOffers';
import { OfferCard } from '@/components/offers/OfferCard';
import { OfferCardLarge } from '@/components/offers/OfferCardLarge';
import { FiltersSidebar } from '@/components/search/FiltersSidebar';
import { FiltersMobile } from '@/components/search/FiltersMobile';
import { SortDropdown } from '@/components/search/SortDropdown';
import { Skeleton } from '@/components/ui/skeleton';
import { LayoutGrid, List, SearchX } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils/classnames';
import { OFFER_TYPE_LABELS } from '@/lib/data/offers';
import type { SortOption } from '@/lib/hooks/useOffers';

const TYPE_TABS = [
  { value: '', label: 'Tous' },
  { value: 'package', label: 'Packages' },
  { value: 'circuit', label: 'Circuits' },
  { value: 'omra', label: 'Omra/Hajj' },
  { value: 'hotel', label: 'Hôtels' },
  { value: 'flight', label: 'Vols' },
];

function OfferSkeletons({ count = 6, grid = true }: { count?: number; grid?: boolean }) {
  return (
    <div className={grid ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5' : 'space-y-4'}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={grid ? 'rounded-xl overflow-hidden' : 'flex gap-4 rounded-xl overflow-hidden'}>
          <Skeleton className={grid ? 'aspect-[4/3] w-full' : 'w-64 h-48 shrink-0'} />
          {!grid && (
            <div className="flex-1 p-5 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function EmptyState({ destination }: { destination?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <SearchX className="w-16 h-16 text-neutral-300 mb-4" />
      <h3 className="text-xl font-semibold text-neutral-900 mb-2">Aucune offre trouvée</h3>
      <p className="text-neutral-500 text-sm max-w-sm">
        {destination
          ? `Aucune offre pour "${destination}". Essayez une autre destination ou modifiez vos filtres.`
          : 'Aucune offre ne correspond à vos critères. Modifiez les filtres pour voir plus de résultats.'}
      </p>
    </div>
  );
}

function SearchContent() {
  const { filters, updateFilters, resetFilters } = useSearch();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data: offers = [], isLoading } = useOffers({
    type: filters.type,
    destination: filters.destination,
    priceMin: filters.priceMin,
    priceMax: filters.priceMax,
    stars: filters.stars,
    sort: filters.sort,
  });

  const activeFilterCount = [
    filters.priceMin && filters.priceMin > 0,
    filters.priceMax && filters.priceMax > 0,
    filters.stars && filters.stars.length > 0,
  ].filter(Boolean).length;

  const pageTitle = filters.destination
    ? `Résultats pour "${filters.destination}"`
    : filters.type
      ? `${OFFER_TYPE_LABELS[filters.type] ?? filters.type}`
      : 'Toutes nos offres';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Titre */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">{pageTitle}</h1>
        {!isLoading && (
          <p className="text-neutral-500 text-sm mt-1">
            {offers.length} offre{offers.length !== 1 ? 's' : ''} disponible{offers.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Tabs type */}
      <div className="flex gap-1 overflow-x-auto pb-1 mb-6 no-scrollbar">
        {TYPE_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => updateFilters({ type: tab.value })}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0',
              filters.type === tab.value
                ? 'bg-primary-500 text-white shadow-sm'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          {/* Mobile filter button */}
          <div className="lg:hidden">
            <FiltersMobile
              filters={filters}
              onChange={updateFilters}
              onReset={resetFilters}
              resultCount={offers.length}
              activeFilterCount={activeFilterCount}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {/* View toggle desktop */}
          <div className="hidden sm:flex items-center gap-1 border border-neutral-200 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-1.5 rounded-md transition-colors',
                viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-neutral-500 hover:text-neutral-700',
              )}
              aria-label="Vue grille"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-1.5 rounded-md transition-colors',
                viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-neutral-500 hover:text-neutral-700',
              )}
              aria-label="Vue liste"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <SortDropdown
            value={filters.sort}
            onChange={(sort) => updateFilters({ sort })}
          />
        </div>
      </div>

      {/* Layout principal */}
      <div className="flex gap-8">
        {/* Sidebar desktop */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <FiltersSidebar
              filters={filters}
              onChange={updateFilters}
              onReset={resetFilters}
              resultCount={offers.length}
            />
          </div>
        </div>

        {/* Résultats */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <OfferSkeletons count={6} grid={viewMode === 'grid'} />
          ) : offers.length === 0 ? (
            <EmptyState destination={filters.destination} />
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {offers.map((offer) => (
                <OfferCardLarge key={offer.id} offer={offer} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Skeleton className="h-8 w-64 mb-6" />
          <OfferSkeletons count={6} grid />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
