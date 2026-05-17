import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowRight, Phone, MessageCircle, Star, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OfferCard } from '@/components/offers/OfferCard';
import { ALL_OFFERS } from '@/lib/data/offers';
import { JsonLd, organizationSchema } from '@/components/seo/JsonLd';
import { ROUTES } from '@/lib/constants/routes';

export const metadata: Metadata = {
  title: 'Packages Omra & Hajj 2026 — Agréé Ministère',
  description:
    'Réservez votre Omra 2026 depuis l\'Algérie. Packages Économique, Confort et Luxe. Vols directs, hôtels 4★/5★ près des lieux saints. Visa pris en charge. Agréé par le Ministère des Affaires Religieuses.',
  keywords: ['omra algérie', 'omra 2026', 'hajj algérie', 'package omra', 'visa omra', 'la mecque'],
  openGraph: {
    title: 'Packages Omra & Hajj 2026 — Voyages Algérie',
    description: 'Pèlerinage organisé depuis l\'Algérie. Agréé Ministère des Affaires Religieuses.',
    images: [{ url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&q=80' }],
  },
};

const omraOffers = ALL_OFFERS.filter((o) => o.type === 'omra' || o.type === 'hajj');

const FEATURES = [
  'Vol direct depuis Alger, Oran, Constantine et Annaba',
  'Hébergements 3★ à 5★ à La Mecque et Médine',
  'Visa Omra entièrement pris en charge par l\'agence',
  'Encadrement par un guide islamique agréé',
  'Transferts La Mecque ↔ Médine inclus',
  'Assurance voyage et médicale incluse',
  'Accompagnement administratif complet',
  'Assistance 24h/24 sur place',
];

const PACKAGES_INFO = [
  {
    name: 'Économique',
    price: 185_000,
    stars: 3,
    nights: 9,
    features: ['Hôtel 3★', 'Chambre quadruple', 'Petit-déjeuner inclus', 'Transferts inclus'],
    popular: false,
  },
  {
    name: 'Confort',
    price: 245_000,
    stars: 4,
    nights: 11,
    features: ['Hôtel 4★', 'Chambre double/triple', 'Demi-pension', 'Transferts VIP'],
    popular: true,
  },
  {
    name: 'Luxe',
    price: 385_000,
    stars: 5,
    nights: 13,
    features: ['Hôtel 5★', 'Chambre double', 'Pension complète', 'Guide exclusif'],
    popular: false,
  },
];

const FAQ = [
  {
    q: 'Quand doit-on réserver le package Omra ?',
    a: 'Nous recommandons de réserver au minimum 3 mois à l\'avance pour garantir la disponibilité et les meilleurs tarifs. Le dossier visa doit être soumis 45 jours avant le départ.',
  },
  {
    q: 'Quels documents sont nécessaires pour l\'Omra ?',
    a: 'Passeport valide au minimum 6 mois après le retour, photos d\'identité, carnet de vaccination (méningite obligatoire), acte de naissance et extrait de mariage (pour les femmes).',
  },
  {
    q: 'Le visa Omra est-il inclus dans le prix ?',
    a: 'Oui, le visa Omra est entièrement pris en charge par notre agence pour tous nos packages.',
  },
  {
    q: 'Depuis quelles villes partent les vols ?',
    a: 'Nous organisons des départs depuis Alger (Houari Boumédiène), Oran (Ahmed Ben Bella), Constantine (Mohamed Boudiaf) et Annaba (Rabah Bitat).',
  },
];

const formatPrice = (n: number) => new Intl.NumberFormat('fr-DZ').format(n);

export default function OmraPage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1920&q=80"
            alt="La Mecque — Masjid Al-Haram"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-primary-900/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
            <ShieldCheck className="w-4 h-4 text-success-400" />
            <span className="text-white/90 text-sm font-medium">Agréé Ministère des Affaires Religieuses</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Omra & Hajj 2026
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto mb-8">
            Vivez votre pèlerinage en toute sérénité. Packages organisés depuis l&apos;Algérie,
            vol direct, hôtels proches des lieux saints.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#packages">
              <Button size="lg" variant="accent" className="gap-2">
                Voir les packages
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <a href="https://wa.me/213XXXXXXXXX" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

        {/* Ce qui est inclus */}
        <section>
          <div className="text-center mb-10">
            <p className="text-accent-500 font-semibold text-sm uppercase tracking-wide mb-1">Nos engagements</p>
            <h2 className="text-3xl font-bold text-neutral-900">Tout est inclus</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((feat) => (
              <div key={feat} className="flex items-start gap-3 bg-white rounded-xl border border-neutral-200 p-4">
                <div className="w-6 h-6 rounded-full bg-success-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-success-600" />
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed">{feat}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Packages */}
        <section id="packages">
          <div className="text-center mb-10">
            <p className="text-accent-500 font-semibold text-sm uppercase tracking-wide mb-1">Nos formules</p>
            <h2 className="text-3xl font-bold text-neutral-900">Choisissez votre package</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKAGES_INFO.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative bg-white rounded-2xl border-2 p-6 ${
                  pkg.popular ? 'border-primary-500 shadow-lg' : 'border-neutral-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-500 text-white text-xs font-bold rounded-full">
                    Populaire
                  </div>
                )}
                <h3 className="text-xl font-bold text-neutral-900 mb-1">{pkg.name}</h3>
                <div className="flex">
                  {Array.from({ length: pkg.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warning-500 text-warning-500" />
                  ))}
                </div>
                <div className="mt-4 mb-6">
                  <p className="text-xs text-neutral-400">À partir de</p>
                  <p className="text-3xl font-bold text-accent-600">{formatPrice(pkg.price)}</p>
                  <p className="text-sm text-neutral-400">DZD / personne · {pkg.nights} nuits</p>
                </div>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-neutral-700">
                      <Check className="w-4 h-4 text-success-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={`${ROUTES.offers}?type=omra`}>
                  <Button
                    variant={pkg.popular ? 'primary' : 'outline'}
                    size="md"
                    className="w-full"
                  >
                    Réserver ce package
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Nos offres Omra */}
        {omraOffers.length > 0 && (
          <section>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-neutral-900">Nos packages disponibles</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {omraOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-neutral-900">Questions fréquentes</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-xl border border-neutral-200 p-5">
                <h3 className="font-semibold text-neutral-900 mb-2">{q}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA contact */}
        <section className="bg-primary-50 rounded-2xl border border-primary-100 p-8 text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Besoin d&apos;un conseil personnalisé ?</h2>
          <p className="text-neutral-600 mb-6">
            Notre équipe est disponible pour répondre à toutes vos questions sur le pèlerinage.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+213XXXXXXXXX">
              <Button variant="primary" size="lg" className="gap-2">
                <Phone className="w-4 h-4" />
                Appeler l&apos;agence
              </Button>
            </a>
            <a href="https://wa.me/213XXXXXXXXX" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="gap-2 border-success-500 text-success-600 hover:bg-success-50">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
