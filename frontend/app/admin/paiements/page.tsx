'use client';

import { useState } from 'react';
import { Search, Download, CreditCard, Smartphone, Building2, Banknote } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ADMIN_TRANSACTIONS, type AdminTransaction } from '@/lib/data/mock-admin-extra';
import { ADMIN_STATS } from '@/lib/data/mock-admin';
import { cn } from '@/lib/utils/classnames';

const STATUS_CONFIG: Record<AdminTransaction['status'], { label: string; color: string }> = {
  pending:  { label: 'En attente', color: 'bg-warning-100 text-warning-700' },
  awaiting: { label: 'Virement attendu', color: 'bg-blue-100 text-blue-700' },
  paid:     { label: 'Payé', color: 'bg-success-100 text-success-700' },
  partial:  { label: 'Partiel', color: 'bg-orange-100 text-orange-700' },
  refunded: { label: 'Remboursé', color: 'bg-neutral-100 text-neutral-600' },
  failed:   { label: 'Échoué', color: 'bg-error-100 text-error-700' },
};

const METHOD_ICONS: Record<string, React.ElementType> = {
  cib: CreditCard,
  edahabia: Smartphone,
  agency: Building2,
  bank_transfer: Banknote,
};

const METHOD_LABELS: Record<string, string> = {
  cib: 'CIB',
  edahabia: 'Edahabia',
  agency: 'Agence',
  bank_transfer: 'Virement',
};

const formatPrice = (n: number) => new Intl.NumberFormat('fr-DZ').format(n);
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-DZ', { day: '2-digit', month: 'short', year: 'numeric' });

const TABS = ['Toutes', 'En attente', 'Payées', 'Remboursées'] as const;
const TAB_FILTERS: Record<(typeof TABS)[number], AdminTransaction['status'][]> = {
  'Toutes': [],
  'En attente': ['pending', 'awaiting', 'partial'],
  'Payées': ['paid'],
  'Remboursées': ['refunded', 'failed'],
};

export default function PaiementsPage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>('Toutes');

  const filtered = ADMIN_TRANSACTIONS.filter((tx) => {
    const statusMatch = TAB_FILTERS[activeTab].length === 0 || TAB_FILTERS[activeTab].includes(tx.status);
    const searchMatch = !search ||
      tx.bookingRef.toLowerCase().includes(search.toLowerCase()) ||
      tx.clientName.toLowerCase().includes(search.toLowerCase());
    return statusMatch && searchMatch;
  });

  const totalPaid = ADMIN_TRANSACTIONS.filter(t => t.status === 'paid').reduce((s, t) => s + t.amount, 0);
  const totalPending = ADMIN_TRANSACTIONS.filter(t => ['pending', 'awaiting', 'partial'].includes(t.status)).reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-800">Paiements & Transactions</h1>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'CA total (DZD)', value: formatPrice(ADMIN_STATS.totalRevenue), color: 'text-success-600' },
          { label: 'Payé ce mois', value: formatPrice(ADMIN_STATS.revenueThisMonth), color: 'text-primary-600' },
          { label: 'En attente (DZD)', value: formatPrice(totalPending), color: 'text-warning-600' },
          { label: 'Remboursements', value: formatPrice(50_000), color: 'text-error-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-neutral-200 p-4">
            <p className="text-xs text-neutral-500 mb-1">{s.label}</p>
            <p className={cn('text-xl font-bold', s.color)}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input placeholder="Référence, client..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-white" />
        </div>
        <div className="flex gap-1.5">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all',
                activeTab === tab ? 'bg-neutral-900 text-white' : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-400',
              )}
            >
              {tab}
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
                {['Réservation', 'Client', 'Mode', 'Montant DZD', 'Statut', 'Réf. SATIM', 'Date'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx) => {
                const status = STATUS_CONFIG[tx.status];
                const Icon = METHOD_ICONS[tx.method] ?? CreditCard;
                return (
                  <tr key={tx.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-primary-500 font-medium">{tx.bookingRef}</td>
                    <td className="px-4 py-3 font-medium text-neutral-900 whitespace-nowrap">{tx.clientName}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-neutral-600">
                        <Icon className="w-4 h-4" />
                        <span>{METHOD_LABELS[tx.method]}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-neutral-900">{formatPrice(tx.amount)}</td>
                    <td className="px-4 py-3">
                      <span className={cn('text-xs px-2 py-1 rounded-full font-medium', status.color)}>{status.label}</span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-neutral-400">{tx.satimRef ?? '—'}</td>
                    <td className="px-4 py-3 text-neutral-500 whitespace-nowrap">{formatDate(tx.processedAt ?? tx.createdAt)}</td>
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
