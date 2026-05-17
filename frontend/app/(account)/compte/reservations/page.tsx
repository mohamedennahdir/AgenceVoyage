'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/classnames';
import { MOCK_BOOKINGS, type MockBooking } from '@/lib/data/mock-account';

export const dynamic = 'force-dynamic';

const STATUS_CONFIG: Record<MockBooking['status'], { label: string; color: string }> = {
  pending: { label: 'En attente', color: 'bg-warning-100 text-warning-700 border-warning-200' },
  confirmed: { label: 'Confirmée', color: 'bg-primary-100 text-primary-700 border-primary-200' },
  paid: { label: 'Payée', color: 'bg-success-100 text-success-700 border-success-200' },
  completed: { label: 'Terminée', color: 'bg-neutral-100 text-neutral-600 border-neutral-200' },
  cancelled: { label: 'Annulée', color: 'bg-error-100 text-error-700 border-error-200' },
};

const TABS = [
  { key: 'all', label: 'Toutes' },
  { key: 'upcoming', label: 'À venir' },
  { key: 'completed', label: 'Terminées' },
  { key: 'cancelled', label: 'Annulées' },
] as const;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-DZ', { day: '2-digit', month: 'long', year: 'numeric' });

const formatPrice = (n: number) => new Intl.NumberFormat('fr-DZ').format(n);

export default function ReservationsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');

  const now = new Date();
  const filtered = MOCK_BOOKINGS.filter((b) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return (b.status === 'confirmed' || b.status === 'paid') && new Date(b.departureDate) > now;
    if (activeTab === 'completed') return b.status === 'completed';
    if (activeTab === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Mes réservations</h1>
        <p className="text-neutral-500 text-sm mt-1">{MOCK_BOOKINGS.length} réservation{MOCK_BOOKINGS.length > 1 ? 's' : ''} au total</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0',
              activeTab === tab.key
                ? 'bg-primary-500 text-white shadow-sm'
                : 'bg-white border border-neutral-200 text-neutral-600 hover:border-primary-300',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
          <p className="text-neutral-400 text-sm">Aucune réservation dans cette catégorie.</p>
          <Link href="/offres" className="text-sm text-primary-500 hover:underline mt-2 inline-block">
            Explorer les offres →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((booking) => {
            const status = STATUS_CONFIG[booking.status];
            return (
              <div key={booking.id} className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-sm transition-shadow">
                <div className="flex gap-4 p-4">
                  {/* Image */}
                  <div className="relative w-24 h-20 rounded-lg overflow-hidden shrink-0">
                    <Image src={booking.mainImage} alt={booking.offerTitle} fill sizes="96px" className="object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium border', status.color)}>
                        {status.label}
                      </span>
                      <span className="text-xs text-neutral-400 font-mono">{booking.reference}</span>
                    </div>
                    <h3 className="font-semibold text-neutral-900 text-sm mb-2 line-clamp-1">
                      {booking.offerTitle}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-xs text-neutral-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {booking.destinations.join(', ')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(booking.departureDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {booking.adults + booking.children} pers.
                      </span>
                    </div>
                  </div>

                  {/* Prix */}
                  <div className="text-right shrink-0 hidden sm:block">
                    <p className="font-bold text-accent-600 text-base">{formatPrice(booking.totalAmount)}</p>
                    <p className="text-xs text-neutral-400">DZD</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 border-t border-neutral-100">
                  <span className="text-xs text-neutral-400">
                    Réservé le {formatDate(booking.createdAt)}
                  </span>
                  <Link
                    href={`/compte/reservations/${booking.id}`}
                    className="flex items-center gap-1 text-sm text-primary-500 hover:text-primary-600 font-medium"
                  >
                    Voir le détail <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
