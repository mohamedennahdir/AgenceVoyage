'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { OfferCard, type OfferCardData } from '@/components/offers/OfferCard';
import { ROUTES } from '@/lib/constants/routes';

const MOCK_OFFERS: OfferCardData[] = [
  {
    id: '1',
    slug: 'istanbul-7-jours',
    title: 'Istanbul — La Ville aux Deux Continents',
    type: 'package',
    destinations: ['Istanbul', 'Turquie'],
    mainImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80',
    duration: { days: 7, nights: 6 },
    pricing: { basePrice: 85000 },
    promotion: { active: true, discountValue: 15, discountType: 'percentage', originalPrice: 100000 },
    availability: { dates: [{ status: 'few_left' }] },
    stats: { avgRating: 4.7, reviewCount: 124 },
  },
  {
    id: '2',
    slug: 'dubai-5-jours',
    title: 'Dubai — Luxe et Merveilles Modernes',
    type: 'package',
    destinations: ['Dubai', 'Emirats Arabes Unis'],
    mainImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
    duration: { days: 5, nights: 4 },
    pricing: { basePrice: 65000 },
    stats: { avgRating: 4.8, reviewCount: 89 },
  },
  {
    id: '3',
    slug: 'paris-6-jours',
    title: 'Paris — La Ville Lumiere',
    type: 'package',
    destinations: ['Paris', 'France'],
    mainImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',
    duration: { days: 6, nights: 5 },
    pricing: { basePrice: 55000 },
    stats: { avgRating: 4.6, reviewCount: 203 },
  },
  {
    id: '4',
    slug: 'le-caire-4-jours',
    title: "Le Caire — Au Coeur de l'Egypte Antique",
    type: 'circuit',
    destinations: ['Le Caire', 'Egypte'],
    mainImage: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=600&q=80',
    duration: { days: 4, nights: 3 },
    pricing: { basePrice: 35000 },
    promotion: { active: true, discountValue: 10000, discountType: 'fixed', originalPrice: 45000 },
    stats: { avgRating: 4.5, reviewCount: 67 },
  },
  {
    id: '5',
    slug: 'barcelone-5-jours',
    title: 'Barcelone — Art, Culture et Gastronomie',
    type: 'package',
    destinations: ['Barcelone', 'Espagne'],
    mainImage: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80',
    duration: { days: 5, nights: 4 },
    pricing: { basePrice: 50000 },
    stats: { avgRating: 4.4, reviewCount: 42 },
  },
  {
    id: '6',
    slug: 'kuala-lumpur-7-jours',
    title: 'Kuala Lumpur & Langkawi',
    type: 'circuit',
    destinations: ['Kuala Lumpur', 'Malaisie'],
    mainImage: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=80',
    duration: { days: 7, nights: 6 },
    pricing: { basePrice: 75000 },
    stats: { avgRating: 4.9, reviewCount: 38 },
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

export function FeaturedOffers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-accent-500 font-semibold text-sm uppercase tracking-wide mb-1">
            Selection du moment
          </p>
          <h2 className="text-3xl font-bold text-neutral-900">Nos offres phares</h2>
        </div>
        <Link
          href={ROUTES.offers}
          className="hidden sm:inline-flex text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors"
        >
          Voir toutes les offres →
        </Link>
      </div>

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {MOCK_OFFERS.map((offer) => (
          <motion.div key={offer.id} variants={item}>
            <OfferCard offer={offer} />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-8 text-center">
        <Link
          href={ROUTES.offers}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-primary-500 text-primary-500 font-semibold hover:bg-primary-50 transition-colors text-sm"
        >
          Voir toutes les offres
        </Link>
      </div>
    </div>
  );
}
