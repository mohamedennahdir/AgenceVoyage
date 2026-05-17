'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, TrendingUp, Package, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ROUTES } from '@/lib/constants/routes';
import { MOCK_USER, MOCK_BOOKINGS } from '@/lib/data/mock-account';

const STATUS_CONFIG = {
  pending: { label: 'En attente', color: 'bg-warning-100 text-warning-700' },
  confirmed: { label: 'Confirmée', color: 'bg-primary-100 text-primary-700' },
  paid: { label: 'Payée', color: 'bg-success-100 text-success-700' },
  completed: { label: 'Terminée', color: 'bg-neutral-100 text-neutral-600' },
  cancelled: { label: 'Annulée', color: 'bg-error-100 text-error-700' },
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-DZ', { day: '2-digit', month: 'short', year: 'numeric' });

const formatPrice = (n: number) => new Intl.NumberFormat('fr-DZ').format(n);

export default function AccountDashboardPage() {
  const recentBookings = MOCK_BOOKINGS.slice(0, 3);
  const upcomingBookings = MOCK_BOOKINGS.filter(
    (b) => (b.status === 'confirmed' || b.status === 'paid') && new Date(b.departureDate) > new Date(),
  );

  return (
    <div className="space-y-6">
      {/* Welcome card */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white text-xl font-bold shrink-0">
            {MOCK_USER.firstName[0]}{MOCK_USER.lastName[0]}
          </div>
          <div>
            <p className="text-white/70 text-sm">Bienvenue,</p>
            <h1 className="text-xl font-bold">{MOCK_USER.firstName} {MOCK_USER.lastName}</h1>
            <p className="text-white/70 text-xs mt-0.5">Membre depuis {formatDate(MOCK_USER.memberSince)}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="flex items-center gap-2 text-neutral-500 text-xs mb-2">
            <Package className="w-4 h-4" />
            Total réservations
          </div>
          <p className="text-2xl font-bold text-neutral-900">{MOCK_USER.totalBookings}</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="flex items-center gap-2 text-neutral-500 text-xs mb-2">
            <TrendingUp className="w-4 h-4" />
            Total dépensé
          </div>
          <p className="text-lg font-bold text-accent-600">{formatPrice(MOCK_USER.totalSpent)}</p>
          <p className="text-xs text-neutral-400">DZD</p>
        </div>
        {upcomingBookings.length > 0 && (
          <div className="bg-white rounded-xl border border-neutral-200 p-4 col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 text-neutral-500 text-xs mb-2">
              <Clock className="w-4 h-4" />
              Prochain voyage
            </div>
            <p className="font-semibold text-neutral-900 text-sm line-clamp-1">
              {upcomingBookings[0]?.destinations[0]}
            </p>
            <p className="text-xs text-primary-600 font-medium mt-0.5">
              {formatDate(upcomingBookings[0]?.departureDate ?? '')}
            </p>
          </div>
        )}
      </div>

      {/* Réservations récentes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-neutral-900">Réservations récentes</h2>
          <Link href={ROUTES.bookings} className="text-sm text-primary-500 hover:text-primary-600 flex items-center gap-1">
            Voir tout <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {recentBookings.map((booking) => {
            const status = STATUS_CONFIG[booking.status];
            return (
              <Link
                key={booking.id}
                href={`/compte/reservations/${booking.id}`}
                className="flex items-center gap-4 bg-white rounded-xl border border-neutral-200 p-4 hover:border-primary-200 hover:shadow-sm transition-all group"
              >
                <div className="relative w-16 h-14 rounded-lg overflow-hidden shrink-0">
                  <Image src={booking.mainImage} alt={booking.offerTitle} fill sizes="64px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status.color}`}>
                      {status.label}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">{booking.reference}</span>
                  </div>
                  <p className="font-medium text-neutral-900 text-sm line-clamp-1 group-hover:text-primary-600 transition-colors">
                    {booking.offerTitle}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-neutral-500 mt-0.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />{booking.destinations[0]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />{formatDate(booking.departureDate)}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-accent-600 text-sm">{formatPrice(booking.totalAmount)}</p>
                  <p className="text-xs text-neutral-400">DZD</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-semibold text-neutral-900 mb-4">Actions rapides</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link href={ROUTES.offers}>
            <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3">
              <Package className="w-4 h-4 text-primary-500" />
              <span className="text-sm">Explorer les offres</span>
            </Button>
          </Link>
          <Link href={ROUTES.travelers}>
            <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3">
              <MapPin className="w-4 h-4 text-accent-500" />
              <span className="text-sm">Mes voyageurs</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
