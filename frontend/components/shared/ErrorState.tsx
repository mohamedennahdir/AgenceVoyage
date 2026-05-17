import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  title?: string;
  description?: string;
  action?: () => void;
  actionLabel?: string;
}

export function ErrorState({
  title = 'Une erreur est survenue',
  description = 'Impossible de charger les données. Veuillez réessayer.',
  action,
  actionLabel = 'Réessayer',
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="w-16 h-16 rounded-2xl bg-error-50 flex items-center justify-center mb-4">
        <AlertTriangle className="w-8 h-8 text-error-500" />
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-500 text-sm max-w-sm mb-6">{description}</p>
      {action && (
        <Button onClick={action} variant="outline" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
