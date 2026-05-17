import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils/classnames';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  suffix?: string;
}

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'text-primary-600',
  iconBg = 'bg-primary-100',
  suffix,
}: StatsCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-neutral-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-neutral-900 truncate">
            {value}
            {suffix && <span className="text-sm font-normal text-neutral-400 ml-1">{suffix}</span>}
          </p>
        </div>
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ml-3', iconBg)}>
          <Icon className={cn('w-5 h-5', iconColor)} />
        </div>
      </div>

      {change !== undefined && (
        <div className="mt-3 flex items-center gap-1">
          {isPositive ? (
            <TrendingUp className="w-3.5 h-3.5 text-success-500" />
          ) : isNegative ? (
            <TrendingDown className="w-3.5 h-3.5 text-error-500" />
          ) : (
            <Minus className="w-3.5 h-3.5 text-neutral-400" />
          )}
          <span className={cn(
            'text-xs font-medium',
            isPositive ? 'text-success-600' : isNegative ? 'text-error-600' : 'text-neutral-500',
          )}>
            {isPositive ? '+' : ''}{change}% vs mois dernier
          </span>
        </div>
      )}
    </div>
  );
}
