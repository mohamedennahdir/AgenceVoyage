'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { OfferCard } from '@/components/offers/OfferCard';
import { ALL_OFFERS } from '@/lib/data/offers';
import { useFavoritesStore } from '@/store/favoritesStore';
import { ROUTES } from '@/lib/constants/routes';

export const dynamic = 'force-dynamic';

export default function FavorisPage() {
  const { favoriteIds } = useFavoritesStore();
  const favoriteOffers = ALL_OFFERS.filter((o) => favoriteIds.includes(o.id));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Mes favoris</h1>
        <p className="text-neutral-500 text-sm mt-1">
          {favoriteOffers.length > 0
            ? `${favoriteOffers.length} offre${favoriteOffers.length > 1 ? 's' : ''} sauvegardée${favoriteOffers.length > 1 ? 's' : ''}`
            : 'Aucun favori pour l\'instant'}
        </p>
      </div>

      {favoriteOffers.length === 0 ? (
        <div className="bg-white rounded-xl border border-neutral-200 p-16 text-center">
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-neutral-300" />
          </div>
          <h3 className="font-semibold text-neutral-900 mb-2">Aucun favori</h3>
          <p className="text-neutral-500 text-sm mb-4">
            Explorez nos offres et cliquez sur le cœur pour sauvegarder vos préférées.
          </p>
          <Link href={ROUTES.offers} className="text-sm text-primary-500 hover:underline">
            Voir toutes les offres →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {favoriteOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      )}
    </div>
  );
}
