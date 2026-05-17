'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ChevronLeft, MapPin, Calendar, Users, CreditCard,
  Mail, Phone, Save, CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { ADMIN_BOOKINGS, type AdminBooking } from '@/lib/data/mock-admin';
import { cn } from '@/lib/utils/classnames';

const ALL_STATUSES: { value: AdminBooking['status']; label: string; color: string }[] = [
  { value: 'pending', label: 'En attente', color: 'text-warning-600' },
  { value: 'confirmed', label: 'Confirmée', color: 'text-primary-600' },
  { value: 'paid', label: 'Payée', color: 'text-success-600' },
  { value: 'completed', label: 'Terminée', color: 'text-neutral-600' },
  { value: 'cancelled', label: 'Annulée', color: 'text-error-600' },
];

const PAYMENT_LABELS: Record<string, string> = {
  cib: 'Carte CIB (SATIM)',
  edahabia: 'Carte Edahabia',
  agency: 'Paiement en agence',
  bank_transfer: 'Virement bancaire',
};

const formatPrice = (n: number) => new Intl.NumberFormat('fr-DZ').format(n);
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-DZ', { day: '2-digit', month: 'long', year: 'numeric' });

export default function AdminReservationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const booking = ADMIN_BOOKINGS.find((b) => b.id === params.id);

  const [status, setStatus] = useState<AdminBooking['status']>(booking?.status ?? 'pending');
  const [saved, setSaved] = useState(false);

  if (!booking) {
    return (
      <div className="text-center py-16">
        <p className="text-neutral-500 mb-4">Réservation introuvable.</p>
        <Button variant="outline" onClick={() => router.push('/admin/reservations')}>
          Retour
        </Button>
      </div>
    );
  }

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const currentStatusConfig = ALL_STATUSES.find((s) => s.value === status);

  return (
    <div className="space-y-5 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push('/admin/reservations')}
          className="text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-neutral-800">{booking.reference}</h1>
          <p className="text-xs text-neutral-500">Réservé le {formatDate(booking.createdAt)}</p>
        </div>
        <Button variant="primary" size="sm" className="gap-2" onClick={handleSave}>
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Enregistré' : 'Enregistrer'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-5">
          {/* Voyage */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5">
            <h2 className="font-semibold text-neutral-800 mb-4">Voyage</h2>
            <h3 className="font-medium text-neutral-900 mb-3">{booking.offerTitle}</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-neutral-600">
                <MapPin className="w-4 h-4 text-neutral-400" />
                {booking.destinations.join(', ')}
              </div>
              <div className="flex items-center gap-2 text-neutral-600">
                <Calendar className="w-4 h-4 text-neutral-400" />
                Départ : {formatDate(booking.departureDate)}
              </div>
              <div className="flex items-center gap-2 text-neutral-600">
                <Users className="w-4 h-4 text-neutral-400" />
                {booking.adults} adulte{booking.adults > 1 ? 's' : ''}
                {booking.children > 0 && `, ${booking.children} enfant${booking.children > 1 ? 's' : ''}`}
              </div>
              <div className="text-neutral-600 capitalize">
                Type : {booking.offerType}
              </div>
            </div>
          </div>

          {/* Client */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5">
            <h2 className="font-semibold text-neutral-800 mb-4">Client</h2>
            <p className="font-medium text-neutral-900 mb-3">{booking.clientName}</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-neutral-600">
                <Mail className="w-4 h-4 text-neutral-400" />
                <a href={`mailto:${booking.clientEmail}`} className="hover:text-primary-500">
                  {booking.clientEmail}
                </a>
              </div>
              <div className="flex items-center gap-2 text-neutral-600">
                <Phone className="w-4 h-4 text-neutral-400" />
                {booking.clientPhone}
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                Email
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                Appeler
              </Button>
            </div>
          </div>

          {/* Paiement */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5">
            <h2 className="font-semibold text-neutral-800 mb-4 flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Paiement
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Mode</span>
                <span className="font-medium text-neutral-800">{PAYMENT_LABELS[booking.paymentMethod] ?? booking.paymentMethod}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base">
                <span className="font-semibold text-neutral-800">Total</span>
                <span className="font-bold text-success-600">{formatPrice(booking.totalAmount)} DZD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: statut */}
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-neutral-200 p-5">
            <h2 className="font-semibold text-neutral-800 mb-4">Statut de la réservation</h2>
            <div className="mb-4">
              <span className={cn('text-sm font-medium', currentStatusConfig?.color)}>
                {currentStatusConfig?.label}
              </span>
            </div>
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as AdminBooking['status'])}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Changer le statut" />
              </SelectTrigger>
              <SelectContent>
                {ALL_STATUSES.map((s) => (
                  <SelectItem key={s.value} value={s.value} className={s.color}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5">
            <h2 className="font-semibold text-neutral-800 mb-3">Actions</h2>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                Envoyer confirmation
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Générer facture PDF
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Générer voucher PDF
              </Button>
              {status !== 'cancelled' && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-error-300 text-error-600 hover:bg-error-50"
                  onClick={() => setStatus('cancelled')}
                >
                  Annuler la réservation
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
