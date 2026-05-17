import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Clock, Star, Heart, Share2, ChevronRight } from 'lucide-react';
import { ALL_OFFERS } from '@/lib/data/offers';
import { getOfferDetail } from '@/lib/data/offer-details';
import { ROUTES } from '@/lib/constants/routes';
import { ImageGallery } from '@/components/offers/ImageGallery';
import { BookingCard, BookingBar } from '@/components/offers/BookingCard';
import { OfferContent } from '@/components/offers/OfferContent';
import { SimilarOffers } from '@/components/offers/SimilarOffers';
import { Badge } from '@/components/ui/badge';
import { JsonLd, offerSchema, breadcrumbSchema } from '@/components/seo/JsonLd';

// ── Static paths ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return ALL_OFFERS.map((o) => ({ slug: o.slug }));
}

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const offer = ALL_OFFERS.find((o) => o.slug === params.slug);
  if (!offer) return { title: 'Offre introuvable' };

  const detail = getOfferDetail(params.slug);

  return {
    title: `${offer.title} | ${offer.duration.days}J/${offer.duration.nights}N`,
    description: detail.description.slice(0, 160),
    openGraph: {
      title: offer.title,
      description: detail.subtitle,
      images: [{ url: offer.mainImage }],
    },
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────

const OFFER_TYPE_LABELS: Record<string, string> = {
  package: 'Package',
  circuit: 'Circuit',
  omra: 'Omra / Hajj',
  hajj: 'Hajj',
  hotel: 'Hôtel',
  flight: 'Vol',
};

export default function OfferDetailPage({ params }: { params: { slug: string } }) {
  const offer = ALL_OFFERS.find((o) => o.slug === params.slug);
  if (!offer) notFound();

  const detail = getOfferDetail(params.slug);
  const availabilityStatus = offer.availability?.dates?.[0]?.status;

  return (
    <>
      <JsonLd data={offerSchema({
        title: offer.title,
        description: detail.description.slice(0, 300),
        slug: offer.slug,
        mainImage: offer.mainImage,
        basePrice: offer.pricing.basePrice,
        avgRating: offer.stats.avgRating,
        reviewCount: offer.stats.reviewCount,
        availability: availabilityStatus,
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: 'Accueil', url: '/' },
        { name: 'Offres', url: '/offres' },
        { name: offer.title, url: `/offres/${offer.slug}` },
      ])} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-neutral-500 mb-5">
          <Link href={ROUTES.home} className="hover:text-neutral-700 transition-colors">
            Accueil
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={ROUTES.offers} className="hover:text-neutral-700 transition-colors">
            Offres
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-neutral-900 font-medium truncate max-w-[200px]">
            {offer.title}
          </span>
        </nav>

        {/* Title section */}
        <div className="mb-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant="secondary" className="text-xs capitalize">
                  {OFFER_TYPE_LABELS[offer.type] ?? offer.type}
                </Badge>
                {availabilityStatus === 'few_left' && (
                  <Badge className="bg-warning-100 text-warning-700 border-0 text-xs">
                    Quelques places restantes
                  </Badge>
                )}
                {offer.promotion?.active && (
                  <Badge className="bg-error-100 text-error-700 border-0 text-xs">
                    -{offer.promotion.discountValue}
                    {offer.promotion.discountType === 'percentage' ? '%' : ' DZD'}
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight">
                {offer.title}
              </h1>
              <p className="text-neutral-500 mt-1">{detail.subtitle}</p>
            </div>

            {/* Share & Favorite */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-primary-300 hover:text-primary-500 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-accent-300 hover:text-accent-500 transition-colors">
                <Heart className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Meta info */}
          <div className="flex items-center gap-4 text-sm text-neutral-600 flex-wrap">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-neutral-400" />
              <span>{offer.destinations.join(', ')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-neutral-400" />
              <span>{offer.duration.days} jours / {offer.duration.nights} nuits</span>
            </div>
            {offer.stats.avgRating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-warning-500 text-warning-500" />
                <span className="font-semibold">{offer.stats.avgRating.toFixed(1)}</span>
                <span className="text-neutral-400">({offer.stats.reviewCount} avis)</span>
              </div>
            )}
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-8">
          <ImageGallery images={detail.images} title={offer.title} />
        </div>

        {/* Main layout: content + booking card */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Content */}
          <div className="flex-1 min-w-0">
            <OfferContent detail={detail} offerType={offer.type} />
          </div>

          {/* Booking card — sticky on desktop */}
          <div className="hidden md:block w-full lg:w-96 shrink-0">
            <div className="sticky top-24">
              <BookingCard offer={offer} />
            </div>
          </div>
        </div>

        {/* Similar offers */}
        <div className="mt-16">
          <SimilarOffers currentSlug={offer.slug} currentType={offer.type} />
        </div>
      </div>

      {/* Mobile sticky booking bar */}
      <BookingBar offer={offer} />
    </>
  );
}
