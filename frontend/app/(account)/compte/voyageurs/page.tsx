'use client';

import { useState } from 'react';
import { User, Pencil, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_TRAVELERS, type MockTraveler } from '@/lib/data/mock-account';
import { cn } from '@/lib/utils/classnames';

export const dynamic = 'force-dynamic';

const RELATIONSHIP_LABELS: Record<string, string> = {
  self: 'Moi-même',
  spouse: 'Conjoint(e)',
  child: 'Enfant',
  parent: 'Parent',
  sibling: 'Frère/Sœur',
  other: 'Autre',
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-DZ', { day: '2-digit', month: 'long', year: 'numeric' });

export default function VoyageursPage() {
  const [travelers, setTravelers] = useState<MockTraveler[]>(MOCK_TRAVELERS);

  const removeTraveler = (id: string) =>
    setTravelers((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Carnet de voyageurs</h1>
          <p className="text-neutral-500 text-sm mt-1">
            {travelers.length} profil{travelers.length > 1 ? 's' : ''} sauvegardé{travelers.length > 1 ? 's' : ''}
          </p>
        </div>
        <Button variant="primary" size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Ajouter
        </Button>
      </div>

      <div className="space-y-4">
        {travelers.map((traveler) => (
          <div key={traveler.id} className="bg-white rounded-xl border border-neutral-200 p-5">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                <span className="text-primary-700 font-bold text-sm">
                  {traveler.firstName[0]}{traveler.lastName[0]}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-neutral-900">
                    {traveler.firstName} {traveler.lastName}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {RELATIONSHIP_LABELS[traveler.relationship] ?? traveler.relationship}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-neutral-600 mt-2">
                  <div>
                    <span className="text-xs text-neutral-400 block">Genre</span>
                    {traveler.gender === 'M' ? 'Masculin' : 'Féminin'}
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block">Nationalité</span>
                    {traveler.nationality}
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block">Date de naissance</span>
                    {formatDate(traveler.birthDate)}
                  </div>
                  {traveler.passportNumber && (
                    <div>
                      <span className="text-xs text-neutral-400 block">Passeport</span>
                      <span className="font-mono text-sm">{traveler.passportNumber}</span>
                      {traveler.passportExpiry && (
                        <span className="text-xs text-neutral-400 ml-1">
                          (exp. {formatDate(traveler.passportExpiry)})
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <button className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-primary-300 hover:text-primary-500 transition-colors">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => removeTraveler(traveler.id)}
                  className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-error-300 hover:text-error-500 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {travelers.length === 0 && (
        <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
          <User className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
          <p className="text-neutral-500 text-sm mb-4">Aucun voyageur sauvegardé.</p>
          <Button variant="primary" size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Ajouter un voyageur
          </Button>
        </div>
      )}
    </div>
  );
}
