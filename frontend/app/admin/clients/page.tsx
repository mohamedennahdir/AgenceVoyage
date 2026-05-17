'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ADMIN_CLIENTS } from '@/lib/data/mock-admin';
import { cn } from '@/lib/utils/classnames';

const formatPrice = (n: number) => new Intl.NumberFormat('fr-DZ').format(n);
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-DZ', { day: '2-digit', month: 'short', year: 'numeric' });

export default function AdminClientsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filtered = ADMIN_CLIENTS.filter((c) => {
    const matchFilter = filter === 'all' || c.status === filter;
    const matchSearch =
      !search ||
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.wilaya.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Clients</h1>
          <p className="text-sm text-neutral-500 mt-0.5">{ADMIN_CLIENTS.length} clients au total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input
            placeholder="Nom, email, wilaya..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white"
          />
        </div>
        <div className="flex gap-1.5">
          {(['all', 'active', 'inactive'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                filter === f
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-400',
              )}
            >
              {f === 'all' ? 'Tous' : f === 'active' ? 'Actifs' : 'Inactifs'}
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
                {['Client', 'Wilaya', 'Réservations', 'Total dépensé', 'Dernier achat', 'Statut', ''].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                        <span className="text-primary-700 text-xs font-bold">
                          {c.firstName[0]}{c.lastName[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">{c.firstName} {c.lastName}</p>
                        <p className="text-xs text-neutral-400">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{c.wilaya}</td>
                  <td className="px-4 py-3 font-medium text-neutral-900">{c.totalBookings}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-success-500" />
                      <span className="font-medium text-neutral-900">{formatPrice(c.totalSpent)}</span>
                      <span className="text-xs text-neutral-400">DZD</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-500 whitespace-nowrap">
                    {c.lastBookingDate ? formatDate(c.lastBookingDate) : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      'text-xs px-2 py-1 rounded-full font-medium',
                      c.status === 'active'
                        ? 'bg-success-100 text-success-700'
                        : 'bg-neutral-100 text-neutral-500',
                    )}>
                      {c.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/clients/${c.id}`}
                      className="text-xs text-primary-500 hover:text-primary-600 flex items-center gap-0.5"
                    >
                      Voir <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
