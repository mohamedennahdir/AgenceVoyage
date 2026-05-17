'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowRight, Tag, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { DateRangePicker } from '@/components/search/DateRangePicker';
import { TravelersSelector } from '@/components/search/TravelersSelector';
import { PriceBreakdown } from '@/components/booking/PriceBreakdown';
import { ALL_OFFERS } from '@/lib/data/offers';
import { useBookingStore } from '@/store/bookingStore';
import { ROUTES } from '@/lib/constants/routes';

const SUPPLEMENTS = [
  { id: 'assurance-annulation', name: 'Assurance annulation', price: 5000, description: 'Remboursement intégral en cas d\'annulation pour raison médicale' },
  { id: 'guide-prive', name: 'Guide privé exclusif', price: 15000, description: 'Guide dédié uniquement à votre groupe pour plus de flexibilité' },
  { id: 'transfert-vip', name: 'Transferts VIP', price: 8000, description: 'Véhicule luxueux et chauffeur privé pour tous vos transferts' },
];

const PROMO_CODES: Record<string, { type: 'percentage' | 'fixed'; value: number }> = {
  WELCOME10: { type: 'percentage', value: 10 },
  ETE2026: { type: 'fixed', value: 5000 },
};

interface TravelerCounts {
  adults: number;
  children: number;
  infants: number;
}

export default function OptionsPage() {
  const params = useParams();
  const router = useRouter();
  const offerId = params.offerId as string;
  const offer = ALL_OFFERS.find((o) => o.id === offerId);

  const { setOffer, setTravelers, setDepartureDates, setSupplements, setPromoCode, setTotalAmount } =
    useBookingStore();

  const [departureDate, setDepartureDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [travelers, setTravelersLocal] = useState<TravelerCounts>({ adults: 2, children: 0, infants: 0 });
  const [selectedSupps, setSelectedSupps] = useState<Set<string>>(new Set());
  const [promoInput, setPromoInput] = useState('');
  const [promoResult, setPromoResult] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!offer) {
    return (
      <div className="max-w-5xl mx-auto px-4 text-center py-20">
        <p className="text-neutral-500">Offre introuvable.</p>
        <Button variant="primary" className="mt-4" onClick={() => router.push(ROUTES.offers)}>
          Voir toutes les offres
        </Button>
      </div>
    );
  }

  const formatPrice = (n: number) => new Intl.NumberFormat('fr-DZ').format(n);

  const toggleSupp = (id: string) => {
    setSelectedSupps((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    const promo = PROMO_CODES[code];
    if (!promo) {
      setPromoError('Code promo invalide ou expiré.');
      setPromoResult(null);
      return;
    }
    const basePrice = offer.pricing.basePrice;
    const subtotal = basePrice * (travelers.adults + travelers.children * 0.7);
    const discount =
      promo.type === 'percentage'
        ? Math.round(subtotal * (promo.value / 100))
        : promo.value;
    setPromoResult({ code, discount });
    setPromoError('');
  };

  const handleContinue = () => {
    if (!departureDate) return;

    setOffer(offer.id, offer as Parameters<typeof setOffer>[1]);
    setTravelers(travelers.adults, travelers.children, travelers.infants);
    setDepartureDates(
      departureDate.toISOString().split('T')[0] ?? null,
      returnDate ? (returnDate.toISOString().split('T')[0] ?? null) : null,
    );

    const supps = SUPPLEMENTS.filter((s) => selectedSupps.has(s.id)).map((s) => ({
      id: s.id,
      name: s.name,
      price: s.price,
      quantity: 1,
    }));
    setSupplements(supps);

    if (promoResult) {
      setPromoCode(promoResult.code, promoResult.discount);
    }

    const basePrice = offer.pricing.basePrice;
    const total =
      basePrice * travelers.adults +
      basePrice * 0.7 * travelers.children +
      supps.reduce((s, x) => s + x.price, 0) -
      (promoResult?.discount ?? 0);
    setTotalAmount(Math.max(0, total));

    router.push(ROUTES.reservationTravelers(offerId));
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main form */}
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Vos options de voyage</h1>
            <p className="text-neutral-500 text-sm mt-1">
              Personnalisez votre réservation — {offer.title}
            </p>
          </div>

          {/* Dates */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5">
            <h2 className="font-semibold text-neutral-900 mb-4">Dates de voyage</h2>
            <DateRangePicker
              from={departureDate}
              to={returnDate}
              onChange={(from, to) => {
                setDepartureDate(from);
                setReturnDate(to);
              }}
              placeholder="Sélectionnez vos dates"
            />
            {!departureDate && (
              <p className="text-xs text-neutral-400 mt-2">
                Sélectionnez au minimum une date de départ
              </p>
            )}
          </div>

          {/* Voyageurs */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5">
            <h2 className="font-semibold text-neutral-900 mb-4">Nombre de voyageurs</h2>
            <TravelersSelector
              value={travelers}
              onChange={setTravelersLocal}
            />
          </div>

          {/* Suppléments */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5">
            <h2 className="font-semibold text-neutral-900 mb-4">
              Suppléments optionnels
            </h2>
            <div className="space-y-3">
              {SUPPLEMENTS.map((supp) => (
                <button
                  key={supp.id}
                  type="button"
                  onClick={() => toggleSupp(supp.id)}
                  className={`w-full flex items-start gap-3 p-3 rounded-lg border-2 text-left transition-all ${
                    selectedSupps.has(supp.id)
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                    selectedSupps.has(supp.id)
                      ? 'bg-primary-500 border-primary-500'
                      : 'border-neutral-300'
                  }`}>
                    {selectedSupps.has(supp.id) && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-neutral-900 text-sm">{supp.name}</span>
                      <Badge variant="secondary" className="text-xs shrink-0">
                        +{formatPrice(supp.price)} DZD/pers.
                      </Badge>
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5">{supp.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Code promo */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5">
            <h2 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <Tag className="w-4 h-4 text-accent-500" />
              Code promo
            </h2>
            <div className="flex gap-2">
              <Input
                placeholder="ex: WELCOME10"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && applyPromo()}
                className="flex-1"
              />
              <Button variant="outline" size="sm" onClick={applyPromo}>
                Appliquer
              </Button>
            </div>
            {promoError && <p className="text-xs text-error-600 mt-2">{promoError}</p>}
            {promoResult && (
              <p className="text-xs text-success-600 mt-2 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                Code <strong>{promoResult.code}</strong> appliqué — économie de {formatPrice(promoResult.discount)} DZD
              </p>
            )}
          </div>

          {/* CTA */}
          <Button
            variant="accent"
            size="lg"
            className="w-full gap-2"
            disabled={!departureDate}
            onClick={handleContinue}
          >
            Continuer — Informations voyageurs
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Price breakdown sidebar */}
        <div className="hidden lg:block w-80 shrink-0">
          <PriceBreakdown />
        </div>
      </div>
    </div>
  );
}
