'use client';

import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, Mail, Phone, MapPin, Calendar, TrendingUp, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ADMIN_CLIENTS, ADMIN_BOOKINGS } from '@/lib/data/mock-admin';
import { cn } from '@/lib/utils/classnames';

const STATUS_COLORS = {
  pending: 'bg-warning-100 text-warning-700',
  confirmed: 'bg-primary-100 text-primary-700',
  paid: 'bg-success-100 text-success-700',
  completed: 'bg-neutral-100 text-neutral-500',
  cancelled: 'bg-error-100 text-error-700',
} as const;

const STATUS_LABELS = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  paid: 'Payée',
  completed: 'Terminée',
  cancelled: 'Annulée',
} as const;

const formatPrice = (n: number) => new Intl.NumberFormat('fr-DZ').format(n);
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-DZ', { day: '2-digit', month: 'long', year: 'numeric' });

export default function AdminClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const client = ADMIN_CLIENTS.find((c) => c.id === params.id);

  if (!client) {
    return (
      <div className="text-center py-16">
        <p className="text-neutral-500 mb-4">Client introuvable.</p>
        <Button variant="outline" onClick={() => router.push('/admin/clients')}>Retour</Button>
      </div>
    );
  }

  const clientBookings = ADMIN_BOOKINGS.filter((b) => b.clientEmail === client.email);

  return (
    <div className="space-y-5 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => router.push('/admin/clients')} className="text-neutral-400 hover:text-neutral-600">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-neutral-800">{client.firstName} {client.lastName}</h1>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={cn(
              'text-xs px-2 py-0.5 rounded-full font-medium',
              client.status === 'active' ? 'bg-success-100 text-success-700' : 'bg-neutral-100 text-neutral-500',
            )}>
              {client.status === 'active' ? 'Actif' : 'Inactif'}
            </span>
            <span className="text-xs text-neutral-400">Client depuis {formatDate(client.createdAt)}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <a href={`mailto:${client.email}`}>
            <Button variant="outline" size="sm" className="gap-2">
              <Mail className="w-4 h-4" />
              Email
            </Button>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Profile */}
        <div className="lg:col-span-2 space-y-5">
          {/* Info */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                <span className="text-primary-700 font-bold text-lg">
                  {client.firstName[0]}{client.lastName[0]}
                </span>
              </div>
              <div>
                <h2 className="font-semibold text-neutral-900">{client.firstName} {client.lastName}</h2>
                <p className="text-sm text-neutral-500">ID: {client.id}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-neutral-600">
                <Mail className="w-4 h-4 text-neutral-400" />
                {client.email}
              </div>
              <div className="flex items-center gap-2 text-neutral-600">
                <Phone className="w-4 h-4 text-neutral-400" />
                {client.phone}
              </div>
              <div className="flex items-center gap-2 text-neutral-600">
                <MapPin className="w-4 h-4 text-neutral-400" />
                {client.wilaya}
              </div>
            </div>
          </div>

          {/* Reservations */}
          {clientBookings.length > 0 && (
            <div className="bg-white rounded-xl border border-neutral-200">
              <div className="px-5 py-4 border-b border-neutral-100">
                <h2 className="font-semibold text-neutral-800">Réservations ({clientBookings.length})</h2>
              </div>
              <div className="divide-y divide-neutral-100">
                {clientBookings.map((b) => (
                  <div key={b.id} className="px-5 py-3 flex items-center justify-between">
                    <div>
                      <p className="font-mono text-xs text-primary-500 font-medium">{b.reference}</p>
                      <p className="text-sm text-neutral-800 mt-0.5">{b.offerTitle}</p>
                      <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        {formatDate(b.departureDate)}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={cn('text-xs px-2 py-1 rounded-full font-medium', STATUS_COLORS[b.status])}>
                        {STATUS_LABELS[b.status]}
                      </span>
                      <p className="text-sm font-semibold text-neutral-800 mt-1">{formatPrice(b.totalAmount)} DZD</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Stats sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-neutral-200 p-5">
            <h2 className="font-semibold text-neutral-800 mb-4">Statistiques</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                  <Package className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400">Réservations</p>
                  <p className="font-bold text-neutral-900">{client.totalBookings}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-success-100 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-success-600" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400">Total dépensé</p>
                  <p className="font-bold text-success-600">{formatPrice(client.totalSpent)}</p>
                  <p className="text-xs text-neutral-400">DZD</p>
                </div>
              </div>
              {client.lastBookingDate && (
                <>
                  <Separator />
                  <div>
                    <p className="text-xs text-neutral-400">Dernier achat</p>
                    <p className="text-sm font-medium text-neutral-800">{formatDate(client.lastBookingDate)}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5">
            <h2 className="font-semibold text-neutral-800 mb-3">Actions</h2>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                <Mail className="w-3.5 h-3.5" />
                Envoyer un email
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start gap-2 border-error-300 text-error-600 hover:bg-error-50"
              >
                Suspendre le compte
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
