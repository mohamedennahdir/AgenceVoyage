'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Clock, MessageCircle, CalendarDays, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DateRangePicker } from '@/components/search/DateRangePicker';
import { TravelersSelector } from '@/components/search/TravelersSelector';
import { ROUTES } from '@/lib/constants/routes';
import { cn } from '@/lib/utils/classnames';
import type { OfferCardData } from '@/components/offers/OfferCard';

interface TravelerCounts {
  adults: number;
  children: number;
  infants: number;
}

interface BookingCardProps {
  offer: OfferCardData;
  className?: string;
}

const WHATSAPP_NUMBER = '213XXXXXXXXX';

export function BookingCard({ offer, className }: BookingCardProps) {
  const [departureDate, setDepartureDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [travelers, setTravelers] = useState<TravelerCounts>({
    adults: 2,
    children: 0,
    infants: 0,
  });

  const formatPrice = (n: number) => new Intl.NumberFormat('fr-DZ').format(n);

  const basePrice = offer.pricing.basePrice;
  const totalPassengers = travelers.adults + travelers.children;
  const childDiscount = 0.3;
  const adultTotal = travelers.adults * basePrice;
  const childTotal = travelers.children * Math.round(basePrice * (1 - childDiscount));
  const totalPrice = adultTotal + childTotal;

  const whatsappMsg = encodeURIComponent(
    `Bonjour, je suis intéressé par l'offre "${offer.title}" (${offer.duration.days}J/${offer.duration.nights}N). Pouvez-vous me donner plus d'informations ?`,
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;

  const canBook = !!departureDate;

  return (
    <div className={cn('bg-white rounded-2xl border border-neutral-200 shadow-lg p-5', className)}>
      {/* Prix */}
      <div className="mb-4">
        <p className="text-xs text-neutral-500">À partir de</p>
        <div className="flex items-baseline gap-2">
          {offer.promotion?.active && (
            <span className="text-sm text-neutral-400 line-through">
              {formatPrice(offer.promotion.originalPrice)} DZD
            </span>
          )}
          <span className="text-3xl font-bold text-accent-600">
            {formatPrice(basePrice)}
          </span>
          <span className="text-sm text-neutral-500">DZD / pers.</span>
        </div>
        {offer.promotion?.active && (
          <span className="inline-block mt-1 text-xs text-success-600 bg-success-50 px-2 py-0.5 rounded-full font-medium">
            Économisez {offer.promotion.discountType === 'percentage'
              ? `${offer.promotion.discountValue}%`
              : `${formatPrice(offer.promotion.discountValue)} DZD`}
          </span>
        )}
      </div>

      <Separator className="mb-4" />

      {/* Sélecteurs */}
      <div className="space-y-3 mb-4">
        <div>
          <label className="text-xs font-medium text-neutral-600 flex items-center gap-1.5 mb-1.5">
            <CalendarDays className="w-3.5 h-3.5" />
            Dates de voyage
          </label>
          <DateRangePicker
            from={departureDate}
            to={returnDate}
            onChange={(from, to) => {
              setDepartureDate(from);
              setReturnDate(to);
            }}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-neutral-600 flex items-center gap-1.5 mb-1.5">
            <Users className="w-3.5 h-3.5" />
            Voyageurs
          </label>
          <TravelersSelector
            value={travelers}
            onChange={setTravelers}
          />
        </div>
      </div>

      {/* Calcul du prix */}
      {totalPassengers > 0 && (
        <div className="bg-neutral-50 rounded-xl p-3 mb-4 space-y-2 text-sm">
          <div className="flex justify-between text-neutral-600">
            <span>{travelers.adults} adulte{travelers.adults > 1 ? 's' : ''}</span>
            <span>{formatPrice(adultTotal)} DZD</span>
          </div>
          {travelers.children > 0 && (
            <div className="flex justify-between text-neutral-600">
              <span>{travelers.children} enfant{travelers.children > 1 ? 's' : ''} (−30%)</span>
              <span>{formatPrice(childTotal)} DZD</span>
            </div>
          )}
          {travelers.infants > 0 && (
            <div className="flex justify-between text-neutral-500 text-xs">
              <span>{travelers.infants} bébé{travelers.infants > 1 ? 's' : ''}</span>
              <span>Gratuit</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-semibold text-neutral-900">
            <span>Total estimé</span>
            <span className="text-accent-600">{formatPrice(totalPrice)} DZD</span>
          </div>
        </div>
      )}

      {/* CTA principal */}
      <Link
        href={canBook ? ROUTES.reservationOptions(offer.id) : '#'}
        onClick={!canBook ? (e) => e.preventDefault() : undefined}
      >
        <Button
          variant="accent"
          size="lg"
          className="w-full mb-3"
          disabled={!canBook}
        >
          {canBook ? 'Réserver maintenant' : 'Sélectionnez une date'}
        </Button>
      </Link>

      {/* WhatsApp */}
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="md" className="w-full gap-2 border-success-500 text-success-600 hover:bg-success-50">
          <MessageCircle className="w-4 h-4" />
          Demander par WhatsApp
        </Button>
      </a>

      {/* Trust badges */}
      <div className="mt-4 pt-4 border-t border-neutral-100 space-y-2">
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <ShieldCheck className="w-4 h-4 text-success-500 shrink-0" />
          <span>Paiement 100% sécurisé via SATIM (CIB / Edahabia)</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <Clock className="w-4 h-4 text-primary-400 shrink-0" />
          <span>Confirmation immédiate par email et SMS</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <MessageCircle className="w-4 h-4 text-accent-400 shrink-0" />
          <span>Support 7j/7 par téléphone et WhatsApp</span>
        </div>
      </div>
    </div>
  );
}

// ── Sticky mobile bottom bar ─────────────────────────────────────────────────

interface BookingBarProps {
  offer: OfferCardData;
}

export function BookingBar({ offer }: BookingBarProps) {
  const formatPrice = (n: number) => new Intl.NumberFormat('fr-DZ').format(n);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-neutral-200 px-4 py-3 flex items-center justify-between gap-3 shadow-lg">
      <div>
        <p className="text-xs text-neutral-500">À partir de</p>
        <p className="text-lg font-bold text-accent-600">
          {formatPrice(offer.pricing.basePrice)}
          <span className="text-xs font-medium text-neutral-500 ml-1">DZD</span>
        </p>
      </div>
      <Link href={ROUTES.reservationOptions(offer.id)} className="flex-1 max-w-48">
        <Button variant="accent" size="md" className="w-full">
          Réserver
        </Button>
      </Link>
    </div>
  );
}
