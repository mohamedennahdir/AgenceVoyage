import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { ALL_OFFERS } from '@/lib/data/offers';
import { ROUTES } from '@/lib/constants/routes';

export const metadata: Metadata = {
  title: 'Toutes nos destinations — Voyages depuis l\'Algérie',
  description:
    'Découvrez toutes nos destinations de voyage : Istanbul, Dubai, Paris, Barcelone, Marrakech, Le Caire et bien plus encore. Réservation en ligne depuis l\'Algérie.',
  keywords: ['destinations voyage algérie', 'istanbul algérie', 'dubai algérie', 'paris algérie', 'omra mecque'],
  openGraph: {
    title: 'Toutes nos destinations — Voyages Algérie',
    description: 'Partez à la découverte du monde depuis l\'Algérie.',
  },
};

// Group offers by destination country
function groupByCountry(offers: typeof ALL_OFFERS) {
  const grouped: Record<string, {
    country: string;
    city: string;
    image: string;
    count: number;
    minPrice: number;
    type: string;
  }> = {};

  for (const offer of offers) {
    const country = offer.destinations[offer.destinations.length - 1] ?? offer.destinations[0] ?? '';
    const city = offer.destinations[0] ?? country;
    if (!grouped[country]) {
      grouped[country] = {
        country,
        city,
        image: offer.mainImage,
        count: 0,
        minPrice: offer.pricing.basePrice,
        type: offer.type,
      };
    }
    grouped[country].count++;
    if (offer.pricing.basePrice < grouped[country].minPrice) {
      grouped[country].minPrice = offer.pricing.basePrice;
      grouped[country].image = offer.mainImage;
    }
  }

  return Object.values(grouped).sort((a, b) => b.count - a.count);
}

const DESTINATIONS_HIGHLIGHTED = [
  {
    country: 'Turquie',
    city: 'Istanbul',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80',
    tagline: 'Entre Europe et Asie',
  },
  {
    country: 'Emirats Arabes Unis',
    city: 'Dubai',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
    tagline: 'Luxe et modernité',
  },
  {
    country: 'Arabie Saoudite',
    city: 'La Mecque',
    image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80',
    tagline: 'Terre sainte',
  },
  {
    country: 'France',
    city: 'Paris',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',
    tagline: 'La Ville Lumière',
  },
  {
    country: 'Égypte',
    city: 'Le Caire',
    image: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=600&q=80',
    tagline: 'Civilisation millénaire',
  },
  {
    country: 'Maroc',
    city: 'Marrakech',
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d81f86?w=600&q=80',
    tagline: 'Joyau de l\'Orient',
  },
];

const formatPrice = (n: number) => new Intl.NumberFormat('fr-DZ', { notation: 'compact' }).format(n);

export default function DestinationsPage() {
  const destinations = groupByCountry(ALL_OFFERS);

  return (
    <>
      {/* Header */}
      <div className="bg-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary-300 text-sm font-semibold uppercase tracking-wide mb-2">Explorer le monde</p>
          <h1 className="text-4xl font-bold mb-3">Nos destinations</h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Découvrez {destinations.length}+ destinations disponibles depuis l&apos;Algérie,
            soigneusement sélectionnées pour vous offrir la meilleure expérience.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Destinations phares */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-neutral-900">Destinations phares</h2>
            <Link href={ROUTES.offers} className="text-sm text-primary-500 hover:text-primary-600 flex items-center gap-1">
              Voir toutes les offres <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {DESTINATIONS_HIGHLIGHTED.map((dest) => {
              const offersCount = ALL_OFFERS.filter(
                (o) => o.destinations.includes(dest.city) || o.destinations.includes(dest.country),
              ).length;
              return (
                <Link
                  key={dest.city}
                  href={`${ROUTES.offers}?destination=${encodeURIComponent(dest.city)}`}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] block"
                >
                  <Image
                    src={dest.image}
                    alt={`Voyage à ${dest.city}, ${dest.country}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-1 text-white/70 text-xs mb-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>{dest.country}</span>
                    </div>
                    <h3 className="text-white font-bold text-lg leading-tight">{dest.city}</h3>
                    <p className="text-white/70 text-xs">{dest.tagline}</p>
                    {offersCount > 0 && (
                      <p className="text-white/60 text-xs mt-1">
                        {offersCount} offre{offersCount > 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Toutes les destinations */}
        <section>
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            Toutes nos destinations ({destinations.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {destinations.map((dest) => (
              <Link
                key={dest.country}
                href={`${ROUTES.offers}?destination=${encodeURIComponent(dest.city)}`}
                className="group bg-white rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-sm transition-all p-4"
              >
                <div className="relative aspect-[3/2] rounded-lg overflow-hidden mb-3">
                  <Image
                    src={dest.image}
                    alt={dest.city}
                    fill
                    sizes="200px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-semibold text-neutral-900 text-sm truncate group-hover:text-primary-500 transition-colors">
                  {dest.city}
                </h3>
                <p className="text-xs text-neutral-400 truncate">{dest.country}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-neutral-500">
                    {dest.count} offre{dest.count > 1 ? 's' : ''}
                  </span>
                  <span className="text-xs font-semibold text-accent-600">
                    dès {formatPrice(dest.minPrice)} DZD
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-neutral-50 rounded-2xl border border-neutral-200 p-10">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Vous ne trouvez pas votre destination ?</h2>
          <p className="text-neutral-600 mb-6">Contactez notre équipe — nous organisons des voyages sur mesure.</p>
          <Link href={`${ROUTES.offers}`}>
            <button className="px-8 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors">
              Voir toutes les offres
            </button>
          </Link>
        </section>
      </div>
    </>
  );
}
