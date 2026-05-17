'use client';

import { useState } from 'react';
import { Users, Minus, Plus } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/classnames';

interface TravelerCounts {
  adults: number;
  children: number;
  infants: number;
}

interface TravelersSelectorProps {
  value?: TravelerCounts;
  onChange?: (value: TravelerCounts) => void;
  className?: string;
}

const TRAVELER_TYPES = [
  { key: 'adults' as const, label: 'Adultes', sub: '18 ans et plus', min: 1, max: 9 },
  { key: 'children' as const, label: 'Enfants', sub: '2 à 11 ans', min: 0, max: 6 },
  { key: 'infants' as const, label: 'Bébés', sub: 'Moins de 2 ans', min: 0, max: 4 },
];

export function TravelersSelector({ value, onChange, className }: TravelersSelectorProps) {
  const [counts, setCounts] = useState<TravelerCounts>(
    value ?? { adults: 2, children: 0, infants: 0 },
  );
  const [open, setOpen] = useState(false);

  const total = counts.adults + counts.children + counts.infants;

  const getSummary = () => {
    const parts: string[] = [];
    if (counts.adults > 0) parts.push(`${counts.adults} adulte${counts.adults > 1 ? 's' : ''}`);
    if (counts.children > 0) parts.push(`${counts.children} enfant${counts.children > 1 ? 's' : ''}`);
    if (counts.infants > 0) parts.push(`${counts.infants} bébé${counts.infants > 1 ? 's' : ''}`);
    return parts.join(', ') || '1 adulte';
  };

  const update = (key: keyof TravelerCounts, delta: number) => {
    const type = TRAVELER_TYPES.find((t) => t.key === key)!;
    const next = Math.min(Math.max(counts[key] + delta, type.min), type.max);
    const updated = { ...counts, [key]: next };
    setCounts(updated);
    onChange?.(updated);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={cn(
        'flex items-center gap-2 w-full px-3 py-3 bg-white border border-neutral-200 rounded-lg',
        'text-sm text-neutral-700 hover:border-primary-400 transition-colors text-left',
        className,
      )}>
        <Users className="w-4 h-4 text-neutral-400 shrink-0" />
        <span className="flex-1 truncate">{getSummary()}</span>
        <span className="text-xs text-neutral-400 shrink-0">{total} voyageur{total > 1 ? 's' : ''}</span>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4" align="start">
        <div className="space-y-4">
          {TRAVELER_TYPES.map(({ key, label, sub, min, max }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-900">{label}</p>
                <p className="text-xs text-neutral-500">{sub}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => update(key, -1)}
                  disabled={counts[key] <= min}
                  className={cn(
                    'w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors',
                    counts[key] <= min
                      ? 'border-neutral-200 text-neutral-300 cursor-not-allowed'
                      : 'border-primary-500 text-primary-500 hover:bg-primary-50',
                  )}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-5 text-center font-semibold text-neutral-900">
                  {counts[key]}
                </span>
                <button
                  onClick={() => update(key, 1)}
                  disabled={counts[key] >= max || total >= 9}
                  className={cn(
                    'w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors',
                    counts[key] >= max || total >= 9
                      ? 'border-neutral-200 text-neutral-300 cursor-not-allowed'
                      : 'border-primary-500 text-primary-500 hover:bg-primary-50',
                  )}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <Button
          size="sm"
          className="w-full mt-4"
          onClick={() => setOpen(false)}
        >
          Confirmer
        </Button>
      </PopoverContent>
    </Popover>
  );
}
