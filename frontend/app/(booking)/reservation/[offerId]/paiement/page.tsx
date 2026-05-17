'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, CreditCard, Building2, Banknote, Smartphone, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PriceBreakdown } from '@/components/booking/PriceBreakdown';
import { PaymentMethodCard, type PaymentOption } from '@/components/booking/PaymentMethodCard';
import { useBookingStore } from '@/store/bookingStore';
import { ROUTES } from '@/lib/constants/routes';

const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: 'cib',
    label: 'Carte CIB',
    description: 'Paiement immédiat et sécurisé via SATIM. Confirmation instantanée.',
    badge: 'Recommandé',
    icon: CreditCard,
    iconColor: 'text-primary-600',
  },
  {
    id: 'edahabia',
    label: 'Carte Edahabia (CCP)',
    description: 'Paiement via votre carte postale Algérie Poste. Sécurisé via SATIM.',
    icon: Smartphone,
    iconColor: 'text-warning-600',
  },
  {
    id: 'agency',
    label: 'Paiement en agence',
    description: 'Réglez directement dans nos bureaux à Alger. Délai de confirmation : 24h.',
    icon: Building2,
    iconColor: 'text-success-600',
  },
  {
    id: 'bank_transfer',
    label: 'Virement bancaire',
    description: 'Virement vers notre compte BNA. Délai de traitement : 2–3 jours ouvrables.',
    icon: Banknote,
    iconColor: 'text-accent-600',
  },
];

const AGENCY_INFO = {
  address: '45 Rue Didouche Mourad, Alger-Centre 16000',
  phone: '+213 21 XX XX XX',
  hours: 'Dim–Jeu : 08h30–17h00 | Sam : 09h00–13h00',
};

const BANK_INFO = {
  bank: 'Banque Nationale d\'Algérie (BNA)',
  account: '00000 XXXXX XXXXXXXXXX XX',
  iban: 'DZ XXXX XXXX XXXX XXXX XXXX XXXX',
  reference: 'À mentionner : votre numéro de réservation',
};

export default function PaiementPage() {
  const params = useParams();
  const router = useRouter();
  const offerId = params.offerId as string;

  const { setPaymentMethod, offerSnapshot, totalAmount } = useBookingStore();
  const [selected, setSelected] = useState<PaymentOption['id'] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!offerSnapshot) {
    router.push(ROUTES.reservationOptions(offerId));
    return null;
  }

  const formatPrice = (n: number) => new Intl.NumberFormat('fr-DZ').format(n);

  const handlePay = async () => {
    if (!selected) return;
    setPaymentMethod(selected);
    setIsProcessing(true);

    // Mock processing delay
    await new Promise((r) => setTimeout(r, 1500));

    router.push(ROUTES.reservationConfirmation(offerId));
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Mode de paiement</h1>
            <p className="text-neutral-500 text-sm mt-1">
              Choisissez votre méthode de paiement pour valider la réservation.
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {PAYMENT_OPTIONS.map((opt) => (
              <PaymentMethodCard
                key={opt.id}
                option={opt}
                selected={selected === opt.id}
                onSelect={() => setSelected(opt.id)}
              />
            ))}
          </div>

          {/* Infos contextuelles */}
          {selected === 'agency' && (
            <div className="bg-success-50 border border-success-200 rounded-xl p-4 text-sm text-success-800">
              <p className="font-semibold mb-2">Informations agence</p>
              <p><strong>Adresse :</strong> {AGENCY_INFO.address}</p>
              <p><strong>Tél :</strong> {AGENCY_INFO.phone}</p>
              <p><strong>Horaires :</strong> {AGENCY_INFO.hours}</p>
              <p className="mt-2 text-xs text-success-700">
                Vous recevrez un email de pré-réservation. Votre place est réservée 48h en attendant votre paiement.
              </p>
            </div>
          )}

          {selected === 'bank_transfer' && (
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-sm text-neutral-700">
              <p className="font-semibold mb-2">Coordonnées bancaires</p>
              <p><strong>Banque :</strong> {BANK_INFO.bank}</p>
              <p><strong>N° compte :</strong> {BANK_INFO.account}</p>
              <p><strong>IBAN :</strong> {BANK_INFO.iban}</p>
              <p className="text-xs text-neutral-500 mt-2">{BANK_INFO.reference}</p>
            </div>
          )}

          {/* Total + CTA */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-neutral-900">Montant à payer</span>
              <span className="text-2xl font-bold text-accent-600">{formatPrice(totalAmount)} DZD</span>
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="gap-2"
                onClick={() => router.push(ROUTES.reservationRecap(offerId))}
                disabled={isProcessing}
              >
                <ArrowLeft className="w-4 h-4" />
                Retour
              </Button>
              <Button
                variant="accent"
                size="lg"
                className="flex-1 gap-2"
                disabled={!selected || isProcessing}
                onClick={handlePay}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Traitement en cours...
                  </>
                ) : (
                  <>
                    {selected === 'cib' || selected === 'edahabia'
                      ? `Payer ${formatPrice(totalAmount)} DZD`
                      : 'Confirmer la réservation'}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-80 shrink-0">
          <PriceBreakdown />
        </div>
      </div>
    </div>
  );
}
