'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CheckCircle, Calendar, MapPin, Users, FileText, Home, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useBookingStore } from '@/store/bookingStore';
import { ROUTES } from '@/lib/constants/routes';

function generateReference() {
  return 'VG-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function ConfirmationPage() {
  const params = useParams();
  const [reference] = useState(generateReference);

  const {
    offerSnapshot,
    departureDate,
    returnDate,
    adults,
    children,
    infants,
    totalAmount,
    paymentMethod,
    reset,
  } = useBookingStore();

  const offer = offerSnapshot as {
    title?: string;
    destinations?: string[];
    duration?: { days: number; nights: number };
  } | null;

  const formatPrice = (n: number) => new Intl.NumberFormat('fr-DZ').format(n);
  const formatDate = (iso: string | null) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('fr-DZ', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const methodLabel: Record<string, string> = {
    cib: 'Carte CIB (SATIM)',
    edahabia: 'Carte Edahabia (CCP)',
    agency: 'Paiement en agence',
    bank_transfer: 'Virement bancaire',
  };

  const whatsappMsg = encodeURIComponent(
    `Bonjour, j'ai effectué une réservation avec le numéro ${reference}. Pouvez-vous me confirmer ma réservation ?`,
  );

  // Reset store after displaying confirmation (on unmount)
  useEffect(() => {
    return () => { /* keep store for user reference */ };
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Success header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-12 h-12 text-success-500" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
          Réservation confirmée !
        </h1>
        <p className="text-neutral-500 text-sm">
          Un email de confirmation a été envoyé à votre adresse.
        </p>

        {/* Reference */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-xl">
          <FileText className="w-4 h-4 text-primary-500" />
          <span className="text-sm text-neutral-600">Numéro de réservation :</span>
          <span className="font-bold text-primary-700 text-base tracking-wider">{reference}</span>
        </div>
      </div>

      {/* Summary card */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6 space-y-4">
        <h2 className="font-semibold text-neutral-900">Récapitulatif</h2>

        {offer?.title && (
          <div>
            <p className="text-xs text-neutral-400 mb-1">Voyage</p>
            <p className="font-medium text-neutral-900">{offer.title}</p>
          </div>
        )}

        <Separator />

        <div className="grid grid-cols-2 gap-4 text-sm">
          {departureDate && (
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-neutral-400">Départ</p>
                <p className="font-medium text-neutral-800">{formatDate(departureDate)}</p>
              </div>
            </div>
          )}
          {offer?.destinations && (
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-neutral-400">Destination</p>
                <p className="font-medium text-neutral-800">{offer.destinations[0]}</p>
              </div>
            </div>
          )}
          <div className="flex items-start gap-2">
            <Users className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-neutral-400">Voyageurs</p>
              <p className="font-medium text-neutral-800">
                {adults + children + infants} personne{adults + children + infants > 1 ? 's' : ''}
              </p>
            </div>
          </div>
          {totalAmount > 0 && (
            <div>
              <p className="text-xs text-neutral-400">Total payé</p>
              <p className="font-bold text-accent-600">{formatPrice(totalAmount)} DZD</p>
            </div>
          )}
        </div>

        {paymentMethod && (
          <>
            <Separator />
            <div className="text-sm">
              <p className="text-xs text-neutral-400 mb-1">Mode de paiement</p>
              <p className="font-medium text-neutral-800">{methodLabel[paymentMethod] ?? paymentMethod}</p>
              {paymentMethod === 'agency' && (
                <p className="text-xs text-warning-600 mt-1">
                  ⚠️ Votre réservation est maintenue 48h. Présentez-vous en agence avec votre numéro {reference}.
                </p>
              )}
              {paymentMethod === 'bank_transfer' && (
                <p className="text-xs text-warning-600 mt-1">
                  ⚠️ Mentionnez le numéro {reference} comme référence de virement. Délai de traitement : 2–3 jours ouvrables.
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Next steps */}
      <div className="bg-primary-50 rounded-xl p-5 mb-6">
        <h3 className="font-semibold text-primary-800 mb-3">Prochaines étapes</h3>
        <ol className="space-y-2 text-sm text-primary-700">
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-primary-200 text-primary-800 text-xs font-bold flex items-center justify-center shrink-0">1</span>
            Vérifiez votre boîte email — confirmation et détails envoyés
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-primary-200 text-primary-800 text-xs font-bold flex items-center justify-center shrink-0">2</span>
            Préparez vos documents (passeport, visa si nécessaire)
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-primary-200 text-primary-800 text-xs font-bold flex items-center justify-center shrink-0">3</span>
            Notre équipe vous contactera 7 jours avant le départ
          </li>
        </ol>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Link href={ROUTES.bookings}>
          <Button variant="primary" size="lg" className="w-full gap-2">
            <FileText className="w-4 h-4" />
            Voir mes réservations
          </Button>
        </Link>
        <a href={`https://wa.me/213XXXXXXXXX?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="lg" className="w-full gap-2 border-success-500 text-success-600 hover:bg-success-50">
            <MessageCircle className="w-4 h-4" />
            Contacter l&apos;agence via WhatsApp
          </Button>
        </a>
        <Link href={ROUTES.home}>
          <Button variant="ghost" size="md" className="w-full text-neutral-500 gap-2" onClick={reset}>
            <Home className="w-4 h-4" />
            Retour à l&apos;accueil
          </Button>
        </Link>
      </div>
    </div>
  );
}
