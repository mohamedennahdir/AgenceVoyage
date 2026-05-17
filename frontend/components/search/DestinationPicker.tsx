'use client';

import { useState, useRef, useEffect } from 'react';
import { MapPin, Plane, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils/classnames';

interface Suggestion {
  id: string;
  name: string;
  country: string;
  type: 'city' | 'airport';
  code?: string;
}

const POPULAR_DESTINATIONS: Suggestion[] = [
  { id: '1', name: 'Istanbul', country: 'Turquie', type: 'city' },
  { id: '2', name: 'Dubaï', country: 'Émirats Arabes Unis', type: 'city' },
  { id: '3', name: 'Paris', country: 'France', type: 'city' },
  { id: '4', name: 'Le Caire', country: 'Égypte', type: 'city' },
  { id: '5', name: 'Tunis', country: 'Tunisie', type: 'city' },
  { id: '6', name: 'Barcelone', country: 'Espagne', type: 'city' },
  { id: '7', name: 'Rome', country: 'Italie', type: 'city' },
  { id: '8', name: 'Kuala Lumpur', country: 'Malaisie', type: 'city' },
];

const ALL_DESTINATIONS: Suggestion[] = [
  ...POPULAR_DESTINATIONS,
  { id: '9', name: 'Istanbul — Aéroport (IST)', country: 'Turquie', type: 'airport', code: 'IST' },
  { id: '10', name: 'Dubaï — DXB', country: 'Émirats Arabes Unis', type: 'airport', code: 'DXB' },
  { id: '11', name: 'Paris — CDG', country: 'France', type: 'airport', code: 'CDG' },
  { id: '12', name: 'Alger — Houari Boumediene', country: 'Algérie', type: 'airport', code: 'ALG' },
  { id: '13', name: 'Oran — Ahmed Ben Bella', country: 'Algérie', type: 'airport', code: 'ORN' },
];

interface DestinationPickerProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  className?: string;
}

export function DestinationPicker({
  placeholder = 'Où voulez-vous aller ?',
  value,
  onChange,
  name,
  className,
}: DestinationPickerProps) {
  const [query, setQuery] = useState(value ?? '');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length >= 2) {
      const filtered = ALL_DESTINATIONS.filter(
        (d) =>
          d.name.toLowerCase().includes(query.toLowerCase()) ||
          d.country.toLowerCase().includes(query.toLowerCase()) ||
          (d.code?.toLowerCase().includes(query.toLowerCase()) ?? false),
      );
      setSuggestions(filtered.slice(0, 6));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (dest: Suggestion) => {
    const val = dest.name;
    setQuery(val);
    onChange?.(val);
    setIsOpen(false);
  };

  const showPopular = isOpen && query.length < 2;
  const showSuggestions = isOpen && suggestions.length > 0;

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input
          ref={inputRef}
          type="text"
          name={name}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange?.(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={cn(
            'w-full pl-9 pr-4 py-3 bg-white border border-neutral-200 rounded-lg',
            'text-sm text-neutral-900 placeholder:text-neutral-400',
            'focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100',
            'transition-all',
          )}
          autoComplete="off"
        />
      </div>

      {/* Dropdown */}
      {(showPopular || showSuggestions) && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-neutral-200 rounded-xl shadow-xl overflow-hidden">
          {showPopular && (
            <>
              <p className="px-4 py-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider border-b border-neutral-100">
                Destinations populaires
              </p>
              {POPULAR_DESTINATIONS.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => handleSelect(dest)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{dest.name}</p>
                    <p className="text-xs text-neutral-500">{dest.country}</p>
                  </div>
                </button>
              ))}
            </>
          )}

          {showSuggestions &&
            suggestions.map((dest) => {
              const Icon = dest.type === 'airport' ? Plane : Building2;
              return (
                <button
                  key={dest.id}
                  onClick={() => handleSelect(dest)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-neutral-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 truncate">
                      {dest.name}
                      {dest.code && (
                        <span className="ml-2 text-xs text-neutral-400 font-mono">{dest.code}</span>
                      )}
                    </p>
                    <p className="text-xs text-neutral-500">{dest.country}</p>
                  </div>
                </button>
              );
            })}
        </div>
      )}
    </div>
  );
}
