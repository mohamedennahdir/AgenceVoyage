'use client';

import { usePathname } from 'next/navigation';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils/classnames';

const STEPS = [
  { key: 'options', label: 'Options' },
  { key: 'voyageurs', label: 'Voyageurs' },
  { key: 'recap', label: 'Récapitulatif' },
  { key: 'paiement', label: 'Paiement' },
];

function getCurrentStep(pathname: string): number {
  if (pathname.includes('/paiement')) return 3;
  if (pathname.includes('/recap')) return 2;
  if (pathname.includes('/voyageurs')) return 1;
  return 0;
}

export function BookingStepper() {
  const pathname = usePathname();
  const current = getCurrentStep(pathname);

  return (
    <div className="flex items-center justify-center gap-0 w-full max-w-lg mx-auto">
      {STEPS.map((step, index) => {
        const done = index < current;
        const active = index === current;

        return (
          <div key={step.key} className="flex items-center flex-1 min-w-0">
            {/* Circle */}
            <div className="flex flex-col items-center shrink-0">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                  done && 'bg-success-500 text-white',
                  active && 'bg-primary-500 text-white ring-4 ring-primary-100',
                  !done && !active && 'bg-neutral-200 text-neutral-500',
                )}
              >
                {done ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span
                className={cn(
                  'text-[10px] mt-1 font-medium whitespace-nowrap hidden sm:block',
                  active ? 'text-primary-600' : done ? 'text-success-600' : 'text-neutral-400',
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector */}
            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  'h-0.5 flex-1 mx-1 transition-colors',
                  index < current ? 'bg-success-400' : 'bg-neutral-200',
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
