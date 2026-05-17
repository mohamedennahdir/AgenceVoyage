'use client';

import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MAX_PRICE, OFFER_TYPE_LABELS } from '@/lib/data/offers';
import type { SearchState } from '@/lib/hooks/useSearch';

const TYPE_OPTIONS = ['package', 'circuit', 'omra', 'hotel', 'flight'] as const;
const STAR_OPTIONS = [5, 4, 3, 2] as const;
const DURATION_OPTIONS = [
  { label: 'Moins de 5 jours', max: 4 },
  { label: '5 à 7 jours', min: 5, max: 7 },
  { label: '8 à 10 jours', min: 8, max: 10 },
  { label: 'Plus de 10 jours', min: 11 },
] as const;

interface FiltersSidebarProps {
  filters: SearchState;
  onChange: (updates: Partial<SearchState>) => void;
  onReset: () => void;
  resultCount?: number;
}

function formatPrice(n: number) {
  return new Intl.NumberFormat('fr-DZ', { maximumFractionDigits: 0 }).format(n);
}

export function FiltersSidebar({ filters, onChange, onReset, resultCount }: FiltersSidebarProps) {
  const priceMin = filters.priceMin ?? 0;
  const priceMax = filters.priceMax && filters.priceMax > 0 ? filters.priceMax : MAX_PRICE;

  const toggleStar = (star: number) => {
    const current = filters.stars ?? [];
    const next = current.includes(star) ? current.filter((s) => s !== star) : [...current, star];
    onChange({ stars: next });
  };

  return (
    <aside className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-neutral-900 text-sm">Filtres</h2>
        <button
          onClick={onReset}
          className="text-xs text-primary-500 hover:text-primary-600 font-medium"
        >
          Tout effacer
        </button>
      </div>

      {resultCount !== undefined && (
        <p className="text-xs text-neutral-500 mb-4">
          {resultCount} offre{resultCount !== 1 ? 's' : ''} trouvée{resultCount !== 1 ? 's' : ''}
        </p>
      )}

      <Separator className="mb-4" />

      {/* Type */}
      {!filters.type && (
        <>
          <div className="mb-4">
            <p className="text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-3">
              Type d&apos;offre
            </p>
            <div className="space-y-2">
              {TYPE_OPTIONS.map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={filters.type === type}
                    onCheckedChange={(checked) => onChange({ type: checked ? type : '' })}
                  />
                  <Label htmlFor={`type-${type}`} className="text-sm font-normal cursor-pointer">
                    {OFFER_TYPE_LABELS[type]}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <Separator className="mb-4" />
        </>
      )}

      {/* Prix */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-3">
          Budget (DZD / pers.)
        </p>
        <Slider
          min={0}
          max={MAX_PRICE}
          value={[priceMin, priceMax]}
          onValueChange={(value) => {
            const vals = Array.isArray(value) ? value : [value, value];
            onChange({ priceMin: vals[0] as number, priceMax: vals[1] as number });
          }}
          className="mb-3"
        />
        <div className="flex justify-between text-xs text-neutral-500">
          <span>{formatPrice(priceMin)} DZD</span>
          <span>{formatPrice(priceMax)} DZD</span>
        </div>
      </div>

      <Separator className="mb-4" />

      {/* Étoiles */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-3">
          Classement hôtel
        </p>
        <div className="space-y-2">
          {STAR_OPTIONS.map((star) => (
            <div key={star} className="flex items-center gap-2">
              <Checkbox
                id={`star-${star}`}
                checked={(filters.stars ?? []).includes(star)}
                onCheckedChange={() => toggleStar(star)}
              />
              <Label htmlFor={`star-${star}`} className="text-sm font-normal cursor-pointer flex items-center gap-1">
                {'★'.repeat(star)}
                <span className="text-neutral-400 ml-1">{star} étoiles</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="mb-4" />

      {/* Durée */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-3">
          Durée du séjour
        </p>
        <div className="space-y-2">
          {DURATION_OPTIONS.map((opt) => (
            <div key={opt.label} className="flex items-center gap-2">
              <Checkbox id={`dur-${opt.label}`} />
              <Label htmlFor={`dur-${opt.label}`} className="text-sm font-normal cursor-pointer">
                {opt.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="primary"
        className="w-full mt-2"
        size="sm"
        onClick={() => {}}
      >
        Appliquer les filtres
      </Button>
    </aside>
  );
}
