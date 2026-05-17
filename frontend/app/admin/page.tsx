'use client';

import Link from 'next/link';
import {
  Calendar, Users, TrendingUp, Clock,
  ArrowRight, AlertCircle,
} from 'lucide-react';
import { StatsCard } from '@/components/admin/StatsCard';
import { MiniBarChart } from '@/components/admin/MiniBarChart';
import { ADMIN_STATS, ADMIN_BOOKINGS, DAILY_STATS } from '@/lib/data/mock-admin';
import { ROUTES } from '@/lib/constants/routes';
import { cn } from '@/lib/utils/classnames';

const STATUS_CONFIG = {
  pending: { label: 'En attente', color: 'bg-warning-100 text-warning-700' },
  confirmed: { label: 'Confirmée', color: 'bg-primary-100 text-primary-700' },
  paid: { label: 'Payée', color: 'bg-success-100 text-success-700' },
  completed: { label: 'Terminée', color: 'bg-neutral-100 text-neutral-500' },
  cancelled: { label: 'Annulée', color: 'bg-error-100 text-error-700' },
};

const formatPrice = (n: number) =>
  new Intl.NumberFormat('fr-DZ', { notation: 'compact', maximumFractionDigits: 1 }).format(n);

const formatPriceFull = (n: number) => new Intl.NumberFormat('fr-DZ').format(n);

export default function AdminDashboardPage() {
  const revenueChange = Math.round(
    ((ADMIN_STATS.revenueThisMonth - ADMIN_STATS.revenueLastMonth) / ADMIN_STATS.revenueLastMonth) * 100,
  );
  const bookingChange = Math.round(
    ((ADMIN_STATS.bookingsThisMonth - ADMIN_STATS.bookingsLastMonth) / ADMIN_STATS.bookingsLastMonth) * 100,
  );

  const recentBookings = ADMIN_BOOKINGS.slice(0, 6);
  const pendingBookings = ADMIN_BOOKINGS.filter((b) => b.status === 'pending');

  const chartData = DAILY_STATS.map((d) => ({ date: d.date, value: d.bookings }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Tableau de bord</h1>
          <p className="text-sm text-neutral-500 mt-0.5">
            {new Date().toLocaleDateString('fr-DZ', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        {pendingBookings.length > 0 && (
          <div className="flex items-center gap-2 bg-warning-50 border border-warning-200 rounded-lg px-3 py-2">
            <AlertCircle className="w-4 h-4 text-warning-600" />
            <span className="text-sm text-warning-700 font-medium">
              {pendingBookings.length} réservation{pendingBookings.length > 1 ? 's' : ''} en attente
            </span>
          </div>
        )}
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          title="Réservations ce mois"
          value={ADMIN_STATS.bookingsThisMonth}
          change={bookingChange}
          icon={Calendar}
          iconColor="text-primary-600"
          iconBg="bg-primary-100"
        />
        <StatsCard
          title="CA ce mois (DZD)"
          value={formatPrice(ADMIN_STATS.revenueThisMonth)}
          change={revenueChange}
          icon={TrendingUp}
          iconColor="text-success-600"
          iconBg="bg-success-100"
        />
        <StatsCard
          title="En attente"
          value={ADMIN_STATS.pendingBookings}
          icon={Clock}
          iconColor="text-warning-600"
          iconBg="bg-warning-100"
        />
        <StatsCard
          title="Nouveaux clients"
          value={ADMIN_STATS.newClientsThisMonth}
          icon={Users}
          iconColor="text-accent-600"
          iconBg="bg-accent-100"
        />
      </div>

      {/* Chart + quick actions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Chart */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-neutral-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-neutral-800">Réservations — 14 derniers jours</h2>
            <span className="text-xs text-neutral-400">Total : {DAILY_STATS.reduce((s, d) => s + d.bookings, 0)} réservations</span>
          </div>
          <MiniBarChart data={chartData} />
        </div>

        {/* Métriques */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-4">
          <h2 className="font-semibold text-neutral-800">Métriques globales</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-neutral-100">
              <span className="text-sm text-neutral-600">Total réservations</span>
              <span className="font-bold text-neutral-900">{ADMIN_STATS.totalBookings}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-neutral-100">
              <span className="text-sm text-neutral-600">CA total (DZD)</span>
              <span className="font-bold text-success-600">{formatPrice(ADMIN_STATS.totalRevenue)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-neutral-100">
              <span className="text-sm text-neutral-600">Total clients</span>
              <span className="font-bold text-neutral-900">{ADMIN_STATS.totalClients}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-neutral-600">Taux occupation</span>
              <span className="font-bold text-primary-600">{ADMIN_STATS.occupancyRate}%</span>
            </div>
          </div>
          <div className="pt-2">
            <div className="w-full bg-neutral-100 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all"
                style={{ width: `${ADMIN_STATS.occupancyRate}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recent bookings */}
      <div className="bg-white rounded-xl border border-neutral-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
          <h2 className="font-semibold text-neutral-800">Dernières réservations</h2>
          <Link
            href={ROUTES.adminBookings}
            className="text-sm text-primary-500 hover:text-primary-600 flex items-center gap-1"
          >
            Voir tout <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100">
                <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 whitespace-nowrap">Référence</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 whitespace-nowrap">Client</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 whitespace-nowrap hidden md:table-cell">Offre</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 whitespace-nowrap hidden lg:table-cell">Date départ</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-neutral-500 whitespace-nowrap">Montant</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 whitespace-nowrap">Statut</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b) => {
                const status = STATUS_CONFIG[b.status];
                return (
                  <tr key={b.id} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                    <td className="px-5 py-3">
                      <Link href={`/admin/reservations/${b.id}`} className="font-mono text-xs text-primary-500 hover:underline">
                        {b.reference}
                      </Link>
                    </td>
                    <td className="px-5 py-3 font-medium text-neutral-900 whitespace-nowrap">{b.clientName}</td>
                    <td className="px-5 py-3 text-neutral-600 max-w-[180px] truncate hidden md:table-cell">{b.offerTitle}</td>
                    <td className="px-5 py-3 text-neutral-500 whitespace-nowrap hidden lg:table-cell">
                      {new Date(b.departureDate).toLocaleDateString('fr-DZ', { day: '2-digit', month: 'short' })}
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-neutral-900 whitespace-nowrap">
                      {formatPriceFull(b.totalAmount)}
                    </td>
                    <td className="px-5 py-3">
                      <span className={cn('text-xs px-2 py-1 rounded-full font-medium', status.color)}>
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
