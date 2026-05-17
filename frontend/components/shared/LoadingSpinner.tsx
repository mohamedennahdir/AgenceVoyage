import { cn } from '@/lib/utils/classnames';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-3',
};

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Chargement..."
      className={cn(
        'rounded-full border-neutral-200 border-t-primary-500 animate-spin',
        sizes[size],
        className,
      )}
    />
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <LoadingSpinner size="lg" />
    </div>
  );
}
