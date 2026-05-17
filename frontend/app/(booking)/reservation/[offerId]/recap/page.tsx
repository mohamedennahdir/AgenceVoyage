'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, MapPin, Clock, Users, Calendar, Pencil, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PriceBreakdown } from '@/components/booking/PriceBreakdown';
import { useBookingStore } from '@/store/bookingStore';
import { ROUTES } from '@/lib/constants/routes';

const CGV_TEXT = `CONDITIONS GÉNÉRALES DE VENTE

1. RÉSERVATION
La réservation est confirmée après réception du paiement ou de l'acompte. Un numéro de réservation vous sera communiqué par email et SMS.

2. PAIEMENT
Le paiement peut s'effectuer par carte CIB ou Edahabia via SATIM, par virement bancaire ou en agence. Le solde doit être réglé au plus tard 30 jours avant le départ.

3. ANNULATION
- Annulation jusqu'à 30 jours avant le départ : remboursement intégral moins frais de dossier (2000 DZD)
- Annulation entre 30 et 15 jours : remboursement de 50% du montant payé
- Annulation à moins de 15 jours : aucun remboursement

4. MODIFICATION
Toute modification de réservation est soumise à des frais administratifs de 1500 DZD et à la disponibilité.

5. RESPONSABILITÉ
L'agence est agréée par le Ministère du Tourisme et des Artisanats. Nos prestations sont couvertes par une assurance responsabilité civile professionnelle.`;

export default function RecapPage() {
  const params = useParams();
  const router = useRouter();
  const offerId = params.offerId as string;

  const {
    offerSnapshot,
    departureDate,
    returnDate,
    adults,
    children,
    infants,
    travelers,
    selectedSupplements,
    promoCode,
    promoDiscount,
    totalAmount,
    termsAccepted,
    setTermsAccepted,
  } = useBookingStore();

  const [cgvOpen, setCgvOpen] = useState(false);

  if (!offerSnapshot) {
    router.push(ROUTES.reservationOptions(offerId));
    return null;
  }

  const formatPrice = (n: number) => new Intl.NumberFormat('fr-DZ').format(n);
  const formatDate = (iso: string | null) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('fr-DZ', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const offer = offerSnapshot as { title?: string; duration?: { days: number; nights: number }; destinations?: string[] };
  const totalPassengers = adults + children + infants;

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-5">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Récapitulatif de votre réservation</h1>
            <p className="text-neutral-500 text-sm mt-1">Vérifiez les informations avant de passer au paiement.</p>
          </div>

          {/* Offre */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-neutral-900">Votre voyage</h2>
              <button
                onClick={() => router.push(ROUTES.reservationOptions(offerId))}
                className="text-xs text-primary-500 hover:text-primary-600 flex items-center gap-1"
              >
                <Pencil className="w-3 h-3" /> Modifier
              </button>
            </div>
            <h3 className="font-semibold text-neutral-800 mb-3">{offer.title}</h3>
            <div className="space-y-2 text-sm text-neutral-600">
              {offer.destinations && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>{offer.destinations.join(', ')}</span>
                </div>
              )}
              {offer.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>{offer.duration.days} jours / {offer.duration.nights} nuits</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>Départ : {formatDate(departureDate)} {returnDate && `→ Retour : ${formatDate(returnDate)}`}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>
                  {adults > 0 && `${adults} adulte${adults > 1 ? 's' : ''}`}
                  {children > 0 && `, ${children} enfant${children > 1 ? 's' : ''}`}
                  {infants > 0 && `, ${infants} bébé${infants > 1 ? 's' : ''}`}
                </span>
              </div>
            </div>
          </div>

          {/* Voyageurs */}
          {travelers.length > 0 && (
            <div className="bg-white rounded-xl border border-neutral-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-neutral-900">Voyageurs ({totalPassengers})</h2>
                <button
                  onClick={() => router.push(ROUTES.reservationTravelers(offerId))}
                  className="text-xs text-primary-500 hover:text-primary-600 flex items-center gap-1"
                >
                  <Pencil className="w-3 h-3" /> Modifier
                </button>
              </div>
              <div className="space-y-3">
                {travelers.map((t, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-medium text-neutral-900">
                        {t.firstName} {t.lastName}
                      </span>
                      <span className="text-neutral-400 ml-2 text-xs">
                        {t.type === 'adult' ? 'Adulte' : t.type === 'child' ? 'Enfant' : 'Bébé'}
                      </span>
                    </div>
                    <span className="text-neutral-500 text-xs">
                      {t.gender === 'M' ? 'M.' : 'Mme'} · {t.nationality}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prix */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5">
            <h2 className="font-semibold text-neutral-900 mb-4">Détail du prix</h2>
            <div className="space-y-2 text-sm">
              {selectedSupplements.map((s) => (
                <div key={s.id} className="flex justify-between text-neutral-600">
                  <span>{s.name}</span>
                  <span>{formatPrice(s.price)} DZD</span>
                </div>
              ))}
              {promoCode && promoDiscount > 0 && (
                <div className="flex justify-between text-success-600">
                  <span>Promo ({promoCode})</span>
                  <span>−{formatPrice(promoDiscount)} DZD</span>
                </div>
              )}
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between font-bold text-neutral-900">
              <span>Total à payer</span>
              <span className="text-xl text-accent-600">{formatPrice(totalAmount)} DZD</span>
            </div>
          </div>

          {/* CGV */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5">
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => setTermsAccepted(!termsAccepted)}
                className={`w-5 h-5 rounded border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                  termsAccepted ? 'bg-primary-500 border-primary-500' : 'border-neutral-300'
                }`}
              >
                {termsAccepted && (
                  <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5" className="w-3 h-3">
                    <path d="M2 6l3 3 5-5" />
                  </svg>
                )}
              </button>
              <p className="text-sm text-neutral-700">
                J&apos;ai lu et j&apos;accepte les{' '}
                <Dialog open={cgvOpen} onOpenChange={setCgvOpen}>
                  <DialogTrigger
                    render={<button type="button" className="text-primary-500 hover:underline font-medium" />}
                  >
                    Conditions Générales de Vente
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Conditions Générales de Vente</DialogTitle>
                    </DialogHeader>
                    <pre className="text-xs text-neutral-600 whitespace-pre-wrap leading-relaxed font-sans mt-4">
                      {CGV_TEXT}
                    </pre>
                  </DialogContent>
                </Dialog>
                {' '}de VoyagesApp.
              </p>
            </div>
            {!termsAccepted && (
              <p className="text-xs text-neutral-400 mt-2 ml-8">
                Vous devez accepter les CGV pour continuer.
              </p>
            )}
          </div>

          {/* Trust */}
          <div className="flex items-center gap-2 text-xs text-neutral-500 px-1">
            <ShieldCheck className="w-4 h-4 text-success-500 shrink-0" />
            <span>Vos données sont protégées et sécurisées. Aucun paiement n&apos;est effectué à cette étape.</span>
          </div>

          {/* Navigation */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() => router.push(ROUTES.reservationTravelers(offerId))}
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
            <Button
              variant="accent"
              size="lg"
              className="flex-1 gap-2"
              disabled={!termsAccepted}
              onClick={() => router.push(ROUTES.reservationPayment(offerId))}
            >
              Continuer — Paiement
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="hidden lg:block w-80 shrink-0">
          <PriceBreakdown />
        </div>
      </div>
    </div>
  );
}
