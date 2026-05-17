import { Star } from 'lucide-react';
import { cn } from '@/lib/utils/classnames';

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function StarRating({ rating, count, size = 'md', className }: StarRatingProps) {
  const starSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              starSize,
              i < Math.round(rating)
                ? 'fill-warning-500 text-warning-500'
                : 'fill-neutral-200 text-neutral-200',
            )}
          />
        ))}
      </div>
      <span className={cn('font-medium text-neutral-900', size === 'sm' ? 'text-xs' : 'text-sm')}>
        {rating.toFixed(1)}
      </span>
      {count !== undefined && (
        <span className={cn('text-neutral-500', size === 'sm' ? 'text-xs' : 'text-sm')}>
          ({count})
        </span>
      )}
    </div>
  );
}
