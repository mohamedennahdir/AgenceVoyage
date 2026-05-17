'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plane, Hotel, Package, MapPin, Sparkles, Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DestinationPicker } from '@/components/search/DestinationPicker';
import { DateRangePicker } from '@/components/search/DateRangePicker';
import { TravelersSelector } from '@/components/search/TravelersSelector';
import { cn } from '@/lib/utils/classnames';
import { ROUTES } from '@/lib/constants/routes';

const TABS = [
  { id: 'packages', label: 'Packages', icon: Package },
  { id: 'flights', label: 'Vols', icon: Plane },
  { id: 'hotels', label: 'Hôtels', icon: Hotel },
  { id: 'omra', label: 'Omra & Hajj', icon: Sparkles },
  { id: 'circuits', label: 'Circuits', icon: MapPin },
] as const;

type TabId = (typeof TABS)[number]['id'];

export function SearchEngine() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>('packages');
  const [destination, setDestination] = useState('');
  const [from, setFrom] = useState<Date>();
  const [to, setTo] = useState<Date>();
  const [travelers, setTravelers] = useState({ adults: 2, children: 0, infants: 0 });

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set('type', activeTab);
    if (destination) params.set('destination', destination);
    if (from) params.set('from', from.toISOString().split('T')[0] ?? '');
    if (to) params.set('to', to.toISOString().split('T')[0] ?? '');
    params.set('adults', String(travelers.adults));
    if (travelers.children > 0) params.set('children', String(travelers.children));
    if (travelers.infants > 0) params.set('infants', String(travelers.infants));
    router.push(`${ROUTES.search}?${params.toString()}`);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide border-b border-neutral-100 bg-neutral-50/50">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={cn(
              'flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap',
              'transition-colors border-b-2 -mb-px',
              activeTab === id
                ? 'border-primary-500 text-primary-600 bg-white'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50',
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Formulaire */}
      <div className="p-4 sm:p-6">
        {/* Packages & Circuits */}
        {(activeTab === 'packages' || activeTab === 'circuits') && (
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-4">
              <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">
                Destination
              </label>
              <DestinationPicker
                placeholder="Istanbul, Dubaï, Paris..."
                onChange={setDestination}
              />
            </div>
            <div className="sm:col-span-4">
              <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">
                Dates
              </label>
              <DateRangePicker
                from={from}
                to={to}
                onChange={(f, t) => { setFrom(f); setTo(t); }}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">
                Voyageurs
              </label>
              <TravelersSelector value={travelers} onChange={setTravelers} />
            </div>
            <div className="sm:col-span-2 flex items-end">
              <Button
                onClick={handleSearch}
                size="lg"
                variant="accent"
                className="w-full h-[46px] gap-2"
              >
                <Search className="w-4 h-4" />
                Rechercher
              </Button>
            </div>
          </div>
        )}

        {/* Vols */}
        {activeTab === 'flights' && (
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">
                Départ
              </label>
              <DestinationPicker placeholder="Alger (ALG)" onChange={() => {}} />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">
                Arrivée
              </label>
              <DestinationPicker placeholder="Istanbul (IST)" onChange={setDestination} />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">
                Dates
              </label>
              <DateRangePicker
                from={from}
                to={to}
                onChange={(f, t) => { setFrom(f); setTo(t); }}
              />
            </div>
            <div className="sm:col-span-1">
              <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">
                Passagers
              </label>
              <TravelersSelector value={travelers} onChange={setTravelers} />
            </div>
            <div className="sm:col-span-2 flex items-end">
              <Button onClick={handleSearch} size="lg" variant="accent" className="w-full h-[46px]">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Hôtels */}
        {activeTab === 'hotels' && (
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-4">
              <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">
                Destination
              </label>
              <DestinationPicker placeholder="Istanbul, Dubaï..." onChange={setDestination} />
            </div>
            <div className="sm:col-span-4">
              <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">
                Check-in / Check-out
              </label>
              <DateRangePicker
                from={from}
                to={to}
                placeholder="Choisir les dates"
                onChange={(f, t) => { setFrom(f); setTo(t); }}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">
                Voyageurs
              </label>
              <TravelersSelector value={travelers} onChange={setTravelers} />
            </div>
            <div className="sm:col-span-2 flex items-end">
              <Button onClick={handleSearch} size="lg" variant="accent" className="w-full h-[46px]">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Omra & Hajj */}
        {activeTab === 'omra' && (
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">
                Période
              </label>
              <DateRangePicker
                from={from}
                to={to}
                placeholder="Choisir la période"
                onChange={(f, t) => { setFrom(f); setTo(t); }}
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">
                Voyageurs
              </label>
              <TravelersSelector value={travelers} onChange={setTravelers} />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">
                Type de package
              </label>
              <select className="w-full px-3 py-3 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-700 focus:outline-none focus:border-primary-500">
                <option>Tous les types</option>
                <option>Économique</option>
                <option>Confort</option>
                <option>Luxe</option>
              </select>
            </div>
            <div className="sm:col-span-3">
              <Button
                onClick={handleSearch}
                size="lg"
                variant="accent"
                className="w-full h-[46px] gap-2"
              >
                <Search className="w-4 h-4" />
                Voir les packages
              </Button>
            </div>
          </div>
        )}

        {/* Lien rapide pour Omra */}
        {activeTab === 'omra' && (
          <div className="mt-3 flex items-center gap-2 text-sm text-primary-600">
            <ArrowRight className="w-3.5 h-3.5" />
            <a href={ROUTES.omra} className="hover:underline">
              Voir tous nos packages Omra &amp; Hajj
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
