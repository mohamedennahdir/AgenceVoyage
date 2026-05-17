'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { OfferCard } from '@/components/offers/OfferCard';
import { ALL_OFFERS } from '@/lib/data/offers';
import { cn } from '@/lib/utils/classnames';

interface SimilarOffersProps {
  currentSlug: string;
  currentType: string;
}

export function SimilarOffers({ currentSlug, currentType }: SimilarOffersProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const similar = ALL_OFFERS.filter(
    (o) => o.slug !== currentSlug && (o.type === currentType),
  ).slice(0, 6);

  if (similar.length === 0) return null;

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-neutral-900">Offres similaires</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className={cn(
              'w-8 h-8 rounded-full border border-neutral-200 bg-white',
              'flex items-center justify-center text-neutral-600',
              'hover:border-primary-400 hover:text-primary-500 transition-colors',
            )}
            aria-label="Défiler à gauche"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className={cn(
              'w-8 h-8 rounded-full border border-neutral-200 bg-white',
              'flex items-center justify-center text-neutral-600',
              'hover:border-primary-400 hover:text-primary-500 transition-colors',
            )}
            aria-label="Défiler à droite"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory no-scrollbar"
      >
        {similar.map((offer) => (
          <div key={offer.id} className="w-72 shrink-0 snap-start">
            <OfferCard offer={offer} />
          </div>
        ))}
      </div>
    </section>
  );
}
