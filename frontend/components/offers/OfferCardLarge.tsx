'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Star, MapPin, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants/routes';
import { useFavoritesStore } from '@/store/favoritesStore';
import { cn } from '@/lib/utils/classnames';
import type { OfferCardData } from '@/components/offers/OfferCard';

interface OfferCardLargeProps {
  offer: OfferCardData;
  className?: string;
}

export function OfferCardLarge({ offer, className }: OfferCardLargeProps) {
  const { toggle, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(offer.id);
  const availabilityStatus = offer.availability?.dates?.[0]?.status;

  const formatPrice = (n: number) => new Intl.NumberFormat('fr-DZ').format(n);

  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        'group relative bg-white rounded-xl overflow-hidden shadow-sm',
        'hover:shadow-card-hover transition-shadow duration-300',
        'flex flex-col sm:flex-row',
        className,
      )}
    >
      {/* Image */}
      <Link
        href={ROUTES.offer(offer.slug)}
        className="relative sm:w-64 lg:w-72 shrink-0 aspect-[4/3] sm:aspect-auto overflow-hidden bg-neutral-100"
      >
        <Image
          src={offer.mainImage}
          alt={offer.title}
          fill
          sizes="(max-width: 640px) 100vw, 288px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {offer.promotion?.active && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-error-500 text-white border-0 shadow-sm text-xs font-semibold">
              -{offer.promotion.discountValue}
              {offer.promotion.discountType === 'percentage' ? '%' : ' DZD'}
            </Badge>
          </div>
        )}

        {availabilityStatus === 'few_left' && (
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-warning-500 text-white border-0 text-xs">Quelques places</Badge>
          </div>
        )}
      </Link>

      {/* Contenu */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1 text-xs text-neutral-500 mb-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{offer.destinations.join(' · ')}</span>
            </div>
            <Link href={ROUTES.offer(offer.slug)}>
              <h3 className="font-semibold text-neutral-900 line-clamp-2 group-hover:text-primary-500 transition-colors leading-snug text-base">
                {offer.title}
              </h3>
            </Link>
          </div>

          <button
            onClick={() => toggle(offer.id)}
            className={cn(
              'w-8 h-8 rounded-full shrink-0',
              'bg-neutral-100 hover:bg-neutral-200',
              'flex items-center justify-center',
              'hover:scale-110 transition-all',
            )}
            aria-label={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <Heart
              className={cn(
                'w-4 h-4 transition-colors',
                favorite ? 'fill-accent-500 text-accent-500' : 'text-neutral-500',
              )}
            />
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs text-neutral-500 mt-1 mb-auto">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{offer.duration.days}J / {offer.duration.nights}N</span>
          </div>
          {offer.stats.avgRating && (
            <div className="flex items-center gap-0.5">
              <Star className="w-3.5 h-3.5 fill-warning-500 text-warning-500" />
              <span className="font-medium text-neutral-700">{offer.stats.avgRating.toFixed(1)}</span>
              <span className="text-neutral-400">({offer.stats.reviewCount} avis)</span>
            </div>
          )}
        </div>

        {/* Prix + CTA */}
        <div className="flex items-end justify-between mt-4 pt-4 border-t border-neutral-100 gap-3">
          <div>
            <p className="text-xs text-neutral-400">À partir de</p>
            <div className="flex items-baseline gap-1.5">
              {offer.promotion?.active && (
                <span className="text-xs text-neutral-400 line-through">
                  {formatPrice(offer.promotion.originalPrice)}
                </span>
              )}
              <span className="text-xl font-bold text-accent-600">
                {formatPrice(offer.pricing.basePrice)}
              </span>
              <span className="text-xs font-medium text-accent-600/70">DZD / pers.</span>
            </div>
          </div>
          <Link href={ROUTES.offer(offer.slug)}>
            <Button size="sm" variant="primary" className="shrink-0">
              Voir l&apos;offre
            </Button>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
