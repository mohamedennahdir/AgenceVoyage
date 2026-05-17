'use client';

import { Suspense, useState } from 'react';
import { useOffers } from '@/lib/hooks/useOffers';
import { useSearch } from '@/lib/hooks/useSearch';
import { OfferCard } from '@/components/offers/OfferCard';
import { OfferCardLarge } from '@/components/offers/OfferCardLarge';
import { FiltersSidebar } from '@/components/search/FiltersSidebar';
import { FiltersMobile } from '@/components/search/FiltersMobile';
import { SortDropdown } from '@/components/search/SortDropdown';
import { Skeleton } from '@/components/ui/skeleton';
import { LayoutGrid, List } from 'lucide-react';
import { cn } from '@/lib/utils/classnames';
import type { SortOption } from '@/lib/hooks/useOffers';

const TYPE_TABS = [
  { value: '', label: 'Tout voir' },
  { value: 'package', label: 'Packages' },
  { value: 'circuit', label: 'Circuits' },
  { value: 'omra', label: 'Omra/Hajj' },
  { value: 'hotel', label: 'Hôtels' },
  { value: 'flight', label: 'Vols' },
];

function OfferSkeletons({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="aspect-[4/3] rounded-xl" />
      ))}
    </div>
  );
}

function OffersContent() {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-accent-500 font-semibold text-sm uppercase tracking-wide mb-1">
          Catalogue
        </p>
        <h1 className="text-3xl font-bold text-neutral-900">Toutes nos offres</h1>
        <p className="text-neutral-500 mt-2">
          Découvrez notre sélection de voyages, circuits et pèlerinages.
        </p>
      </div>

      {/* Tabs */}
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
        <div className="lg:hidden">
          <FiltersMobile
            filters={filters}
            onChange={updateFilters}
            onReset={resetFilters}
            resultCount={offers.length}
            activeFilterCount={activeFilterCount}
          />
        </div>

        {!isLoading && (
          <p className="text-sm text-neutral-500 hidden lg:block">
            {offers.length} offre{offers.length !== 1 ? 's' : ''}
          </p>
        )}

        <div className="flex items-center gap-2 ml-auto">
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
            onChange={(sort: SortOption) => updateFilters({ sort })}
          />
        </div>
      </div>

      {/* Layout */}
      <div className="flex gap-8">
        {/* Sidebar */}
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

        {/* Grille */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <OfferSkeletons count={6} />
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

export default function OffersPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Skeleton className="h-8 w-48 mb-6" />
          <OfferSkeletons count={6} />
        </div>
      }
    >
      <OffersContent />
    </Suspense>
  );
}
