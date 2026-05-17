'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ADMIN_DESTINATIONS } from '@/lib/data/mock-admin-extra';
import { cn } from '@/lib/utils/classnames';

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState(ADMIN_DESTINATIONS);

  const toggleFeatured = (id: string) => {
    setDestinations(prev => prev.map(d => d.id === id ? { ...d, featured: !d.featured } : d));
  };

  const toggleStatus = (id: string) => {
    setDestinations(prev => prev.map(d =>
      d.id === id ? { ...d, status: d.status === 'active' ? 'inactive' as const : 'active' as const } : d
    ));
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Destinations</h1>
          <p className="text-xs text-neutral-500 mt-0.5">{destinations.length} destinations · {destinations.filter(d => d.featured).length} mises en avant</p>
        </div>
        <Button variant="primary" size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Nouvelle destination
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {destinations.map(dest => (
          <div key={dest.id} className={cn(
            'bg-white rounded-xl border overflow-hidden transition-all',
            dest.status === 'active' ? 'border-neutral-200' : 'border-neutral-200 opacity-60'
          )}>
            <div className="relative aspect-[16/9]">
              <Image src={dest.image} alt={dest.name} fill sizes="300px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              {dest.featured && (
                <div className="absolute top-2 left-2">
                  <Badge className="bg-warning-500 text-white border-0 text-xs gap-1">
                    <Star className="w-3 h-3" />
                    Mis en avant
                  </Badge>
                </div>
              )}
              <div className="absolute top-2 right-2">
                <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium',
                  dest.status === 'active' ? 'bg-success-100 text-success-700' : 'bg-neutral-100 text-neutral-600'
                )}>
                  {dest.status === 'active' ? 'Actif' : 'Inactif'}
                </span>
              </div>
              <div className="absolute bottom-2 left-2 text-white">
                <p className="font-bold">{dest.name}</p>
                <p className="text-xs text-white/70">{dest.country}</p>
              </div>
            </div>
            <div className="p-3">
              <p className="text-xs text-neutral-500 line-clamp-2 mb-3">{dest.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">{dest.offerCount} offre{dest.offerCount > 1 ? 's' : ''}</span>
                <div className="flex gap-1">
                  <button onClick={() => toggleFeatured(dest.id)}
                    className="w-7 h-7 flex items-center justify-center rounded text-neutral-400 hover:text-warning-500 hover:bg-warning-50 transition-colors"
                    title={dest.featured ? 'Retirer des favoris' : 'Mettre en avant'}
                  >
                    <Star className={cn('w-3.5 h-3.5', dest.featured ? 'fill-warning-500 text-warning-500' : '')} />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded text-neutral-400 hover:text-warning-500 hover:bg-warning-50 transition-colors" title="Éditer">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => toggleStatus(dest.id)}
                    className="w-7 h-7 flex items-center justify-center rounded text-neutral-400 hover:text-error-500 hover:bg-error-50 transition-colors"
                    title={dest.status === 'active' ? 'Désactiver' : 'Activer'}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
