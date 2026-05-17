'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ADMIN_PROMO_CODES, type AdminPromoCode } from '@/lib/data/mock-admin-extra';
import { cn } from '@/lib/utils/classnames';

const STATUS_CONFIG: Record<AdminPromoCode['status'], { label: string; color: string }> = {
  active:  { label: 'Actif', color: 'bg-success-100 text-success-700' },
  expired: { label: 'Expiré', color: 'bg-neutral-100 text-neutral-500' },
  disabled:{ label: 'Désactivé', color: 'bg-error-100 text-error-700' },
};

const formatPrice = (n: number) => new Intl.NumberFormat('fr-DZ').format(n);
const formatDate = (iso: string) => new Date(iso).toLocaleDateString('fr-DZ', { day: '2-digit', month: 'short', year: 'numeric' });

function UsageBar({ used, max }: { used: number; max: number }) {
  const pct = max > 0 ? Math.round((used / max) * 100) : 0;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-neutral-100 rounded-full h-1.5">
        <div
          className={cn('h-1.5 rounded-full transition-all', pct >= 90 ? 'bg-error-500' : pct >= 60 ? 'bg-warning-500' : 'bg-success-500')}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-neutral-500 whitespace-nowrap">{used}/{max}</span>
    </div>
  );
}

export default function AdminPromosPage() {
  const [codes, setCodes] = useState(ADMIN_PROMO_CODES);

  const disableCode = (id: string) => {
    setCodes(prev => prev.map(c => c.id === id ? { ...c, status: 'disabled' as const } : c));
  };

  const activeCount = codes.filter(c => c.status === 'active').length;
  const totalUses = codes.reduce((s, c) => s + c.usedCount, 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Codes promo</h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            <span className="text-success-600 font-medium">{activeCount} actifs</span>
            {' · '}
            <span className="text-neutral-600">{totalUses} utilisations au total</span>
          </p>
        </div>
        <Button variant="primary" size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Nouveau code
        </Button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {codes.map(code => {
          const status = STATUS_CONFIG[code.status];
          return (
            <div key={code.id} className={cn(
              'bg-white rounded-xl border border-neutral-200 p-5 transition-all',
              code.status !== 'active' && 'opacity-60'
            )}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-1.5 bg-neutral-900 text-white px-3 py-1 rounded-lg font-mono font-bold text-sm">
                      <Tag className="w-3.5 h-3.5" />
                      {code.code}
                    </div>
                    <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', status.color)}>
                      {status.label}
                    </span>
                  </div>
                  {code.description && <p className="text-xs text-neutral-500">{code.description}</p>}
                </div>
                <div className="flex gap-1 shrink-0">
                  <button className="w-7 h-7 flex items-center justify-center rounded text-neutral-400 hover:text-warning-500 hover:bg-warning-50 transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  {code.status === 'active' && (
                    <button onClick={() => disableCode(code.id)} className="w-7 h-7 flex items-center justify-center rounded text-neutral-400 hover:text-error-500 hover:bg-error-50 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div>
                  <p className="text-xs text-neutral-400">Réduction</p>
                  <p className="font-bold text-neutral-900">
                    {code.type === 'percentage' ? `−${code.value}%` : `−${formatPrice(code.value)} DZD`}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-400">Commande min.</p>
                  <p className="font-medium text-neutral-700">
                    {code.minOrderAmount > 0 ? `${formatPrice(code.minOrderAmount)} DZD` : 'Aucun'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-400">Validité</p>
                  <p className="font-medium text-neutral-700 text-xs">
                    {formatDate(code.validFrom)} → {formatDate(code.validUntil)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-400 mb-1">Utilisation</p>
                  <UsageBar used={code.usedCount} max={code.maxUses} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
