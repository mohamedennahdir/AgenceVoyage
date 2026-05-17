'use client';

import Link from 'next/link';
import { AlertTriangle, RefreshCcw, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants/routes';
import { useBookingStore } from '@/store/bookingStore';

export default function EchecPage() {
  const { offerId, reset } = useBookingStore();

  const retryUrl = offerId ? ROUTES.reservationOptions(offerId) : ROUTES.offers;

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-error-100 flex items-center justify-center mx-auto mb-6">
        <AlertTriangle className="w-10 h-10 text-error-500" />
      </div>

      <h1 className="text-2xl font-bold text-neutral-900 mb-3">
        Paiement non abouti
      </h1>
      <p className="text-neutral-500 mb-8 leading-relaxed">
        Votre paiement n&apos;a pas pu être traité. Aucun montant n&apos;a été débité de votre compte.
        Vous pouvez réessayer ou contacter notre support.
      </p>

      <div className="space-y-3">
        <Link href={retryUrl} onClick={reset}>
          <Button variant="primary" size="lg" className="w-full gap-2">
            <RefreshCcw className="w-4 h-4" />
            Réessayer la réservation
          </Button>
        </Link>
        <a href="https://wa.me/213XXXXXXXXX" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="lg" className="w-full gap-2 border-success-500 text-success-600 hover:bg-success-50">
            <MessageCircle className="w-4 h-4" />
            Contacter le support WhatsApp
          </Button>
        </a>
        <Link href={ROUTES.home}>
          <Button variant="ghost" size="md" className="w-full text-neutral-500">
            Retour à l&apos;accueil
          </Button>
        </Link>
      </div>

      <p className="text-xs text-neutral-400 mt-8">
        Si le problème persiste, appelez-nous au <strong>+213 XX XX XX XX</strong>
      </p>
    </div>
  );
}
