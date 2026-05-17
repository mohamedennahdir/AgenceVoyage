'use client';

import { useState } from 'react';
import { Search, Download, LogIn, LogOut, Plus, Pencil, Trash2, Download as DownloadIcon, CreditCard, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AUDIT_LOG, type AuditLogEntry } from '@/lib/data/mock-admin-extra';
import { cn } from '@/lib/utils/classnames';

const ACTION_CONFIG: Record<AuditLogEntry['action'], { label: string; icon: React.ElementType; color: string }> = {
  create:  { label: 'Création', icon: Plus, color: 'bg-success-100 text-success-600' },
  update:  { label: 'Modification', icon: Pencil, color: 'bg-primary-100 text-primary-600' },
  delete:  { label: 'Suppression', icon: Trash2, color: 'bg-error-100 text-error-600' },
  login:   { label: 'Connexion', icon: LogIn, color: 'bg-neutral-100 text-neutral-600' },
  logout:  { label: 'Déconnexion', icon: LogOut, color: 'bg-neutral-100 text-neutral-500' },
  export:  { label: 'Export', icon: DownloadIcon, color: 'bg-warning-100 text-warning-600' },
  payment: { label: 'Paiement', icon: CreditCard, color: 'bg-accent-100 text-accent-600' },
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('fr-DZ', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });

export default function AdminAuditPage() {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState<AuditLogEntry['action'] | 'all'>('all');

  const filtered = AUDIT_LOG.filter(entry => {
    const matchAction = actionFilter === 'all' || entry.action === actionFilter;
    const matchSearch = !search ||
      entry.userName.toLowerCase().includes(search.toLowerCase()) ||
      entry.details.toLowerCase().includes(search.toLowerCase()) ||
      entry.resource.toLowerCase().includes(search.toLowerCase());
    return matchAction && matchSearch;
  });

  const actionKeys = Object.keys(ACTION_CONFIG) as AuditLogEntry['action'][];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Journal d&apos;audit</h1>
          <p className="text-xs text-neutral-500 mt-0.5">{AUDIT_LOG.length} événements enregistrés</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input placeholder="Utilisateur, action, ressource..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-white" />
        </div>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActionFilter('all')}
            className={cn('px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-all',
              actionFilter === 'all' ? 'bg-neutral-900 text-white' : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-400'
            )}
          >
            Tous
          </button>
          {actionKeys.map(action => {
            const cfg = ACTION_CONFIG[action];
            return (
              <button
                key={action}
                onClick={() => setActionFilter(action)}
                className={cn('px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-all',
                  actionFilter === action ? 'bg-neutral-900 text-white' : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-400'
                )}
              >
                {cfg.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Log */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="divide-y divide-neutral-100">
          {filtered.map(entry => {
            const cfg = ACTION_CONFIG[entry.action];
            const Icon = cfg.icon;
            return (
              <div key={entry.id} className="flex items-start gap-4 px-5 py-4 hover:bg-neutral-50 transition-colors">
                {/* Action icon */}
                <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5', cfg.color)}>
                  <Icon className="w-4 h-4" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm text-neutral-900 leading-relaxed">{entry.details}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-neutral-400">
                        <span className="font-medium text-neutral-600">{entry.userName}</span>
                        <span>·</span>
                        <span className="capitalize">{entry.resource}</span>
                        {entry.resourceId && <span className="font-mono">#{entry.resourceId}</span>}
                        <span>·</span>
                        <span>{entry.ipAddress}</span>
                      </div>
                    </div>
                    <span className="text-xs text-neutral-400 whitespace-nowrap shrink-0">{formatDate(entry.timestamp)}</span>
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center py-12 text-neutral-400">
              <AlertCircle className="w-10 h-10 mb-2" />
              <p className="text-sm">Aucun événement trouvé.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
