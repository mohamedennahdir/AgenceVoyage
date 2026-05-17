'use client';

import { useBookingStore } from '@/store/bookingStore';
import { Separator } from '@/components/ui/separator';
import { ShieldCheck } from 'lucide-react';

export function PriceBreakdown() {
  const {
    offerSnapshot,
    adults,
    children,
    infants,
    selectedSupplements,
    promoCode,
    promoDiscount,
    totalAmount,
    departureDate,
    returnDate,
  } = useBookingStore();

  if (!offerSnapshot) return null;

  const basePrice = (offerSnapshot as { pricing?: { basePrice?: number } }).pricing?.basePrice ?? 0;
  const childRate = 0.7;

  const adultTotal = adults * basePrice;
  const childTotal = children * Math.round(basePrice * childRate);
  const supplementsTotal = selectedSupplements.reduce(
    (sum, s) => sum + s.price * s.quantity,
    0,
  );
  const subtotal = adultTotal + childTotal + supplementsTotal;
  const discount = promoDiscount;
  const total = Math.max(0, subtotal - discount);

  const formatPrice = (n: number) => new Intl.NumberFormat('fr-DZ').format(n);

  const formatDate = (iso: string | null) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('fr-DZ', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm sticky top-24">
      {/* Offre */}
      <h3 className="font-semibold text-neutral-900 text-sm mb-3 line-clamp-2">
        {(offerSnapshot as { title?: string }).title}
      </h3>

      {/* Dates */}
      {departureDate && (
        <div className="text-xs text-neutral-500 mb-4 space-y-1">
          <div className="flex justify-between">
            <span>Départ</span>
            <span className="font-medium text-neutral-700">{formatDate(departureDate)}</span>
          </div>
          {returnDate && (
            <div className="flex justify-between">
              <span>Retour</span>
              <span className="font-medium text-neutral-700">{formatDate(returnDate)}</span>
            </div>
          )}
        </div>
      )}

      <Separator className="mb-4" />

      {/* Détail prix */}
      <div className="space-y-2 text-sm mb-4">
        {adults > 0 && (
          <div className="flex justify-between text-neutral-600">
            <span>{adults} adulte{adults > 1 ? 's' : ''} × {formatPrice(basePrice)} DZD</span>
            <span>{formatPrice(adultTotal)} DZD</span>
          </div>
        )}
        {children > 0 && (
          <div className="flex justify-between text-neutral-600">
            <span>{children} enfant{children > 1 ? 's' : ''} (−30%)</span>
            <span>{formatPrice(childTotal)} DZD</span>
          </div>
        )}
        {infants > 0 && (
          <div className="flex justify-between text-neutral-500 text-xs">
            <span>{infants} bébé{infants > 1 ? 's' : ''}</span>
            <span>Gratuit</span>
          </div>
        )}
        {selectedSupplements.map((s) => (
          <div key={s.id} className="flex justify-between text-neutral-600">
            <span className="truncate pr-2">{s.name}</span>
            <span>{formatPrice(s.price * s.quantity)} DZD</span>
          </div>
        ))}
        {promoCode && discount > 0 && (
          <div className="flex justify-between text-success-600">
            <span>Promo ({promoCode})</span>
            <span>−{formatPrice(discount)} DZD</span>
          </div>
        )}
      </div>

      <Separator className="mb-4" />

      {/* Total */}
      <div className="flex justify-between items-baseline font-semibold text-neutral-900 mb-1">
        <span>Total</span>
        <span className="text-xl text-accent-600">{formatPrice(total > 0 ? total : subtotal)} DZD</span>
      </div>
      <p className="text-xs text-neutral-400 mb-4">Toutes taxes comprises</p>

      {/* Trust */}
      <div className="flex items-center gap-2 text-xs text-neutral-500 pt-3 border-t border-neutral-100">
        <ShieldCheck className="w-4 h-4 text-success-500 shrink-0" />
        <span>Paiement sécurisé SATIM</span>
      </div>
    </div>
  );
}
