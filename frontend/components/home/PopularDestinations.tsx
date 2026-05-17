'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ROUTES } from '@/lib/constants/routes';

const DESTINATIONS = [
  {
    id: '1',
    name: 'Istanbul',
    country: 'Turquie',
    slug: 'istanbul',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80',
    price: 45000,
  },
  {
    id: '2',
    name: 'Dubai',
    country: 'Emirats Arabes Unis',
    slug: 'dubai',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
    price: 65000,
  },
  {
    id: '3',
    name: 'Paris',
    country: 'France',
    slug: 'paris',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',
    price: 55000,
  },
  {
    id: '4',
    name: 'Le Caire',
    country: 'Egypte',
    slug: 'le-caire',
    image: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=600&q=80',
    price: 35000,
  },
  {
    id: '5',
    name: 'Barcelone',
    country: 'Espagne',
    slug: 'barcelone',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80',
    price: 50000,
  },
  {
    id: '6',
    name: 'Rome',
    country: 'Italie',
    slug: 'rome',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80',
    price: 48000,
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

function DestinationCard({ dest }: { dest: (typeof DESTINATIONS)[0] }) {
  return (
    <motion.div variants={item}>
      <Link
        href={ROUTES.destination(dest.slug)}
        className="group block relative rounded-2xl overflow-hidden aspect-[3/4] bg-neutral-200"
      >
        <Image
          src={dest.image}
          alt={dest.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="font-bold text-white text-lg leading-tight">{dest.name}</p>
          <p className="text-white/70 text-sm">{dest.country}</p>
          <p className="text-accent-300 text-sm font-semibold mt-1">
            A partir de {new Intl.NumberFormat('fr-DZ').format(dest.price)} DZD
          </p>
        </div>

        <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-2xl transition-colors duration-300" />
      </Link>
    </motion.div>
  );
}

export function PopularDestinations() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-accent-500 font-semibold text-sm uppercase tracking-wide mb-1">
            Explorez le monde
          </p>
          <h2 className="text-3xl font-bold text-neutral-900">Destinations populaires</h2>
        </div>
        <Link
          href={ROUTES.destinations}
          className="hidden sm:inline-flex text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors"
        >
          Voir toutes →
        </Link>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {DESTINATIONS.map((dest) => (
          <DestinationCard key={dest.id} dest={dest} />
        ))}
      </motion.div>

      <div className="mt-6 text-center sm:hidden">
        <Link href={ROUTES.destinations} className="text-sm font-semibold text-primary-500">
          Voir toutes les destinations →
        </Link>
      </div>
    </div>
  );
}
