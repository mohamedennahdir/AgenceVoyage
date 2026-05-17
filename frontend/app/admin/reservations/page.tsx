'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, Calendar, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ADMIN_BOOKINGS, type AdminBooking } from '@/lib/data/mock-admin';
import { cn } from '@/lib/utils/classnames';

const STATUS_CONFIG: Record<AdminBooking['status'], { label: string; color: string }> = {
  pending: { label: 'En attente', color: 'bg-warning-100 text-warning-700' },
  confirmed: { label: 'Confirmée', color: 'bg-primary-100 text-primary-700' },
  paid: { label: 'Payée', color: 'bg-success-100 text-success-700' },
  completed: { label: 'Terminée', color: 'bg-neutral-100 text-neutral-500' },
  cancelled: { label: 'Annulée', color: 'bg-error-100 text-error-700' },
};

const TABS = [
  { key: 'all', label: 'Toutes' },
  { key: 'pending', label: 'En attente' },
  { key: 'confirmed', label: 'Confirmées' },
  { key: 'paid', label: 'Payées' },
  { key: 'completed', label: 'Terminées' },
  { key: 'cancelled', label: 'Annulées' },
] as const;

const formatPrice = (n: number) => new Intl.NumberFormat('fr-DZ').format(n);
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-DZ', { day: '2-digit', month: 'short', year: 'numeric' });

export default function AdminReservationsPage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<AdminBooking['status'] | 'all'>('all');

  const filtered = ADMIN_BOOKINGS.filter((b) => {
    const matchTab = activeTab === 'all' || b.status === activeTab;
    const matchSearch =
      !search ||
      b.reference.toLowerCase().includes(search.toLowerCase()) ||
      b.clientName.toLowerCase().includes(search.toLowerCase()) ||
      b.offerTitle.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-800">Réservations</h1>
        <span className="text-sm text-neutral-500">{ADMIN_BOOKINGS.length} au total</span>
      </div>

      {/* Search + Tabs */}
      <div className="space-y-3">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input
            placeholder="Référence, client, offre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0',
                activeTab === tab.key
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-400',
              )}
            >
              {tab.label}
              {tab.key !== 'all' && (
                <span className="ml-1 opacity-60">
                  ({ADMIN_BOOKINGS.filter((b) => b.status === tab.key).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                {['Référence', 'Client', 'Offre', 'Départ', 'Voyageurs', 'Montant DZD', 'Statut', ''].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-neutral-400 text-sm">
                    Aucune réservation trouvée.
                  </td>
                </tr>
              ) : (
                filtered.map((b) => {
                  const status = STATUS_CONFIG[b.status];
                  return (
                    <tr key={b.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-primary-500 font-medium">{b.reference}</span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-neutral-900 whitespace-nowrap">{b.clientName}</p>
                        <p className="text-xs text-neutral-400">{b.clientEmail}</p>
                      </td>
                      <td className="px-4 py-3 max-w-[160px]">
                        <p className="truncate text-neutral-700">{b.offerTitle}</p>
                        <p className="text-xs text-neutral-400 capitalize">{b.offerType}</p>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-neutral-600">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(b.departureDate)}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-neutral-600">
                          <Users className="w-3.5 h-3.5" />
                          {b.adults + b.children}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-neutral-900 whitespace-nowrap">
                        {formatPrice(b.totalAmount)}
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn('text-xs px-2 py-1 rounded-full font-medium', status.color)}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/reservations/${b.id}`}
                          className="text-xs text-primary-500 hover:text-primary-600 flex items-center gap-0.5 whitespace-nowrap"
                        >
                          Détail <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
