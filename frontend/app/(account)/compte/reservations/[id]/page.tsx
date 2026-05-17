'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar, MapPin, Users, CreditCard, FileText,
  ChevronLeft, Phone, MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MOCK_BOOKINGS } from '@/lib/data/mock-account';
import { cn } from '@/lib/utils/classnames';

export const dynamic = 'force-dynamic';

const STATUS_CONFIG = {
  pending: { label: 'En attente de confirmation', color: 'bg-warning-100 text-warning-700' },
  confirmed: { label: 'Confirmée', color: 'bg-primary-100 text-primary-700' },
  paid: { label: 'Payée', color: 'bg-success-100 text-success-700' },
  completed: { label: 'Voyage terminé', color: 'bg-neutral-100 text-neutral-600' },
  cancelled: { label: 'Annulée', color: 'bg-error-100 text-error-700' },
};

const PAYMENT_LABELS: Record<string, string> = {
  cib: 'Carte CIB (SATIM)',
  edahabia: 'Carte Edahabia',
  agency: 'Paiement en agence',
  bank_transfer: 'Virement bancaire',
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-DZ', { day: '2-digit', month: 'long', year: 'numeric' });

const formatPrice = (n: number) => new Intl.NumberFormat('fr-DZ').format(n);

export default function ReservationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const booking = MOCK_BOOKINGS.find((b) => b.id === params.id);

  if (!booking) {
    return (
      <div className="text-center py-16">
        <p className="text-neutral-500 mb-4">Réservation introuvable.</p>
        <Button variant="outline" onClick={() => router.push('/compte/reservations')}>
          Retour aux réservations
        </Button>
      </div>
    );
  }

  const status = STATUS_CONFIG[booking.status];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push('/compte/reservations')}
          className="text-neutral-500 hover:text-neutral-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-neutral-900">Réservation {booking.reference}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', status.color)}>
              {status.label}
            </span>
            <span className="text-xs text-neutral-400">Réservé le {formatDate(booking.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Voyage */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="flex gap-4 p-5">
          <div className="relative w-24 h-20 rounded-lg overflow-hidden shrink-0">
            <Image src={booking.mainImage} alt={booking.offerTitle} fill sizes="96px" className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-neutral-900 mb-3 line-clamp-2">{booking.offerTitle}</h2>
            <div className="space-y-1.5 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>{booking.destinations.join(', ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>
                  Départ : {formatDate(booking.departureDate)}
                  {booking.returnDate && ` · Retour : ${formatDate(booking.returnDate)}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>
                  {booking.adults > 0 && `${booking.adults} adulte${booking.adults > 1 ? 's' : ''}`}
                  {booking.children > 0 && `, ${booking.children} enfant${booking.children > 1 ? 's' : ''}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Paiement */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <h3 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          Paiement
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-neutral-600">
            <span>Mode de paiement</span>
            <span className="font-medium">{PAYMENT_LABELS[booking.paymentMethod]}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold text-neutral-900">
            <span>Total payé</span>
            <span className="text-accent-600 text-lg">{formatPrice(booking.totalAmount)} DZD</span>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <h3 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Documents
        </h3>
        {booking.status === 'completed' || booking.status === 'paid' || booking.status === 'confirmed' ? (
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-colors text-sm text-left">
              <FileText className="w-4 h-4 text-primary-500" />
              <span>Facture — {booking.reference}.pdf</span>
              <span className="ml-auto text-xs text-primary-500">Télécharger</span>
            </button>
            {(booking.status === 'paid' || booking.status === 'confirmed') && (
              <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-colors text-sm text-left">
                <FileText className="w-4 h-4 text-success-500" />
                <span>Voucher de voyage — {booking.reference}.pdf</span>
                <span className="ml-auto text-xs text-primary-500">Télécharger</span>
              </button>
            )}
          </div>
        ) : (
          <p className="text-sm text-neutral-400">Documents disponibles après confirmation du paiement.</p>
        )}
      </div>

      {/* Support */}
      <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-4">
        <h3 className="font-semibold text-neutral-900 mb-3 text-sm">Besoin d&apos;aide ?</h3>
        <div className="flex gap-2">
          <a href="tel:+213XXXXXXXXX">
            <Button variant="outline" size="sm" className="gap-2">
              <Phone className="w-4 h-4" />
              Appeler
            </Button>
          </a>
          <a href="https://wa.me/213XXXXXXXXX" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="gap-2 border-success-400 text-success-600 hover:bg-success-50">
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
