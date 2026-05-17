import { cn } from '@/lib/utils/classnames';

interface PriceDisplayProps {
  amount: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  originalAmount?: number;
  showCurrency?: boolean;
  perPerson?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-4xl',
};

function formatNumber(num: number): string {
  return new Intl.NumberFormat('fr-DZ').format(num);
}

export function PriceDisplay({
  amount,
  currency = 'DZD',
  size = 'md',
  originalAmount,
  showCurrency = true,
  perPerson = false,
  className,
}: PriceDisplayProps) {
  return (
    <span className={cn('inline-flex items-baseline flex-wrap gap-x-1.5', className)}>
      {originalAmount && (
        <span className="text-neutral-400 line-through text-sm font-normal">
          {formatNumber(originalAmount)}
        </span>
      )}
      <span className={cn('font-bold text-accent-600', sizeClasses[size])}>
        {formatNumber(amount)}
        {showCurrency && (
          <span className="ml-1 text-sm font-semibold text-accent-700/80">{currency}</span>
        )}
      </span>
      {perPerson && <span className="text-xs text-neutral-500 font-normal">/ personne</span>}
    </span>
  );
}
