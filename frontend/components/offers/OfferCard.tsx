'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Star, MapPin, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ROUTES } from '@/lib/constants/routes';
import { useFavoritesStore } from '@/store/favoritesStore';
import { cn } from '@/lib/utils/classnames';

export interface OfferCardData {
  id: string;
  slug: string;
  title: string;
  type: string;
  destinations: string[];
  mainImage: string;
  duration: { days: number; nights: number };
  pricing: { basePrice: number };
  promotion?: { active: boolean; discountValue: number; discountType: string; originalPrice: number };
  availability?: { dates?: { status: string }[] };
  stats: { avgRating?: number; reviewCount: number };
}

interface OfferCardProps {
  offer: OfferCardData;
  className?: string;
}

export function OfferCard({ offer, className }: OfferCardProps) {
  const { toggle, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(offer.id);
  const availabilityStatus = offer.availability?.dates?.[0]?.status;

  const formatPrice = (n: number) => new Intl.NumberFormat('fr-DZ').format(n);

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={cn(
        'group relative bg-white rounded-xl overflow-hidden shadow-sm',
        'hover:shadow-card-hover transition-shadow duration-300',
        className,
      )}
    >
      <Link href={ROUTES.offer(offer.slug)}>
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
          <Image
            src={offer.mainImage}
            alt={offer.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Badge promo */}
          {offer.promotion?.active && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-error-500 text-white border-0 shadow-sm text-xs font-semibold">
                -{offer.promotion.discountValue}
                {offer.promotion.discountType === 'percentage' ? '%' : ' DZD'}
              </Badge>
            </div>
          )}

          {/* Badge disponibilitÃ© */}
          {availabilityStatus === 'few_left' && (
            <div className="absolute bottom-3 left-3">
              <Badge className="bg-warning-500 text-white border-0 text-xs">Quelques places</Badge>
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="p-4 space-y-2.5">
          <div className="flex items-center gap-1 text-xs text-neutral-500">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{offer.destinations.join(' Â· ')}</span>
          </div>

          <h3 className="font-semibold text-neutral-900 line-clamp-2 group-hover:text-primary-500 transition-colors leading-snug">
            {offer.title}
          </h3>

          <div className="flex items-center justify-between text-xs text-neutral-500">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{offer.duration.days}J / {offer.duration.nights}N</span>
            </div>
            {offer.stats.avgRating && (
              <div className="flex items-center gap-0.5">
                <Star className="w-3.5 h-3.5 fill-warning-500 text-warning-500" />
                <span className="font-medium text-neutral-700">{offer.stats.avgRating.toFixed(1)}</span>
                <span className="text-neutral-400">({offer.stats.reviewCount})</span>
              </div>
            )}
          </div>

          {/* Prix */}
          <div className="pt-2 border-t border-neutral-100">
            <p className="text-xs text-neutral-400">Ã€ partir de</p>
            <div className="flex items-baseline gap-1.5">
              {offer.promotion?.active && (
                <span className="text-xs text-neutral-400 line-through">
                  {formatPrice(offer.promotion.originalPrice)}
                </span>
              )}
              <span className="text-lg font-bold text-accent-600">
                {formatPrice(offer.pricing.basePrice)}
                <span className="text-xs font-medium text-accent-600/70 ml-1">DZD</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400">/ personne</p>
          </div>
        </div>
      </Link>

      {/* Bouton favoris */}
      <button
        onClick={(e) => { e.preventDefault(); toggle(offer.id); }}
        className={cn(
          'absolute top-3 right-3 w-8 h-8 rounded-full',
          'bg-white/90 backdrop-blur-sm shadow-sm',
          'flex items-center justify-center',
          'hover:scale-110 transition-transform',
        )}
        aria-label={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      >
        <Heart
          className={cn(
            'w-4 h-4 transition-colors',
            favorite ? 'fill-accent-500 text-accent-500' : 'text-neutral-600',
          )}
        />
      </button>
    </motion.article>
  );
}
