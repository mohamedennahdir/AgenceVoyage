'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Plus, Pencil, Eye, ToggleLeft, ToggleRight, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ALL_OFFERS, OFFER_TYPE_LABELS } from '@/lib/data/offers';
import { cn } from '@/lib/utils/classnames';
import { ROUTES } from '@/lib/constants/routes';

type OfferStatus = 'published' | 'draft' | 'archived';
const INITIAL_STATUSES: Record<string, OfferStatus> = Object.fromEntries(
  ALL_OFFERS.map((o, i) => [o.id, i < 18 ? 'published' : i < 22 ? 'draft' : 'archived']),
);

const STATUS_CONFIG: Record<OfferStatus, { label: string; color: string }> = {
  published: { label: 'Publié', color: 'bg-success-100 text-success-700' },
  draft: { label: 'Brouillon', color: 'bg-warning-100 text-warning-700' },
  archived: { label: 'Archivé', color: 'bg-neutral-100 text-neutral-500' },
};

const TYPE_TABS = [
  { key: '', label: 'Tous' },
  { key: 'package', label: 'Packages' },
  { key: 'circuit', label: 'Circuits' },
  { key: 'omra', label: 'Omra' },
  { key: 'hotel', label: 'Hôtels' },
  { key: 'flight', label: 'Vols' },
] as const;

const formatPrice = (n: number) => new Intl.NumberFormat('fr-DZ').format(n);

export default function AdminOffresPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statuses, setStatuses] = useState<Record<string, OfferStatus>>(INITIAL_STATUSES);

  const toggleStatus = (id: string) => {
    setStatuses((prev) => ({
      ...prev,
      [id]: prev[id] === 'published' ? 'archived' : 'published',
    }));
  };

  const filtered = ALL_OFFERS.filter((o) => {
    const matchType = !typeFilter || o.type === typeFilter;
    const matchSearch =
      !search ||
      o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.destinations.some((d) => d.toLowerCase().includes(search.toLowerCase()));
    return matchType && matchSearch;
  });

  const counts = { published: 0, draft: 0, archived: 0 };
  ALL_OFFERS.forEach((o) => {
    const s = statuses[o.id] ?? 'draft';
    counts[s]++;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Offres</h1>
          <div className="flex gap-3 mt-1 text-xs text-neutral-500">
            <span className="text-success-600 font-medium">{counts.published} publiées</span>
            <span>·</span>
            <span className="text-warning-600 font-medium">{counts.draft} brouillons</span>
            <span>·</span>
            <span>{counts.archived} archivées</span>
          </div>
        </div>
        <Link href={ROUTES.adminNewOffer}>
          <Button variant="primary" size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Nouvelle offre
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input
            placeholder="Titre, destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {TYPE_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setTypeFilter(tab.key)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0',
                typeFilter === tab.key
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-400',
              )}
            >
              {tab.label}
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
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500">Offre</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 hidden md:table-cell">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 hidden lg:table-cell">Durée</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-neutral-500">Prix DZD</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500">Statut</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-neutral-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((offer) => {
                const offerStatus = statuses[offer.id] ?? 'draft';
                const statusCfg = STATUS_CONFIG[offerStatus];
                return (
                  <tr key={offer.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-9 rounded overflow-hidden shrink-0">
                          <Image src={offer.mainImage} alt={offer.title} fill sizes="48px" className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-neutral-900 truncate max-w-[200px]">{offer.title}</p>
                          <p className="text-xs text-neutral-400">{offer.destinations.join(', ')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <Badge variant="secondary" className="text-xs capitalize">
                        {OFFER_TYPE_LABELS[offer.type] ?? offer.type}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-neutral-600 hidden lg:table-cell whitespace-nowrap">
                      {offer.duration.days}J / {offer.duration.nights}N
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-neutral-800 whitespace-nowrap">
                      {formatPrice(offer.pricing.basePrice)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn('text-xs px-2 py-1 rounded-full font-medium', statusCfg.color)}>
                        {statusCfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <Link href={ROUTES.offer(offer.slug)}>
                          <button className="w-7 h-7 flex items-center justify-center rounded text-neutral-400 hover:text-primary-500 hover:bg-primary-50 transition-colors" title="Voir">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </Link>
                        <Link href={ROUTES.adminEditOffer(offer.id)}>
                          <button className="w-7 h-7 flex items-center justify-center rounded text-neutral-400 hover:text-warning-500 hover:bg-warning-50 transition-colors" title="Éditer">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                        </Link>
                        <button
                          onClick={() => toggleStatus(offer.id)}
                          className="w-7 h-7 flex items-center justify-center rounded text-neutral-400 hover:text-success-500 hover:bg-success-50 transition-colors"
                          title={offerStatus === 'published' ? 'Archiver' : 'Publier'}
                        >
                          {offerStatus === 'published' ? (
                            <ToggleRight className="w-3.5 h-3.5 text-success-500" />
                          ) : (
                            <ToggleLeft className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button className="w-7 h-7 flex items-center justify-center rounded text-neutral-400 hover:text-error-500 hover:bg-error-50 transition-colors" title="Supprimer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
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
