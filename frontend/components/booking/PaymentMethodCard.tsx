'use client';

import { cn } from '@/lib/utils/classnames';
import type { LucideIcon } from 'lucide-react';

export interface PaymentOption {
  id: 'cib' | 'edahabia' | 'agency' | 'bank_transfer';
  label: string;
  description: string;
  badge?: string;
  icon: LucideIcon;
  iconColor?: string;
}

interface PaymentMethodCardProps {
  option: PaymentOption;
  selected: boolean;
  onSelect: () => void;
}

export function PaymentMethodCard({ option, selected, onSelect }: PaymentMethodCardProps) {
  const Icon = option.icon;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all',
        selected
          ? 'border-primary-500 bg-primary-50 shadow-sm'
          : 'border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm',
      )}
    >
      {/* Radio circle */}
      <div
        className={cn(
          'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0',
          selected ? 'border-primary-500' : 'border-neutral-300',
        )}
      >
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />}
      </div>

      {/* Icon */}
      <div
        className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
          selected ? 'bg-primary-100' : 'bg-neutral-100',
        )}
      >
        <Icon className={cn('w-5 h-5', option.iconColor ?? 'text-neutral-600')} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-neutral-900 text-sm">{option.label}</span>
          {option.badge && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-success-100 text-success-700 font-semibold">
              {option.badge}
            </span>
          )}
        </div>
        <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">{option.description}</p>
      </div>
    </button>
  );
}
