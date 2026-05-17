'use client';

import { useState } from 'react';
import { Save, CheckCircle, Building2, CreditCard, Bell, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils/classnames';

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button type="button" onClick={onChange}
      className={cn('relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors',
        enabled ? 'bg-primary-500' : 'bg-neutral-200'
      )}
    >
      <span className={cn('inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform',
        enabled ? 'translate-x-5' : 'translate-x-0'
      )} />
    </button>
  );
}

export default function AdminParametresPage() {
  const [saved, setSaved] = useState(false);
  const [satimMode, setSatimMode] = useState<'test' | 'production'>('test');
  const [notifications, setNotifications] = useState({
    newBooking: true,
    paymentReceived: true,
    bookingCancelled: true,
    lowStock: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-neutral-800">Paramètres</h1>
        <p className="text-sm text-neutral-500 mt-0.5">Configuration de l&apos;agence et de l&apos;application.</p>
      </div>

      {/* Infos agence */}
      <section className="bg-white rounded-xl border border-neutral-200 p-5">
        <h2 className="font-semibold text-neutral-800 mb-4 flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          Informations de l&apos;agence
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-medium mb-1.5 block">Nom de l&apos;agence</Label>
              <Input defaultValue="Voyages Algérie" />
            </div>
            <div>
              <Label className="text-xs font-medium mb-1.5 block">N° Agrément</Label>
              <Input defaultValue="AG-2024-001234-A" />
            </div>
          </div>
          <div>
            <Label className="text-xs font-medium mb-1.5 block">Adresse</Label>
            <Input defaultValue="45 Rue Didouche Mourad, Alger-Centre 16000" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-medium mb-1.5 block">Téléphone</Label>
              <Input defaultValue="+213 21 XX XX XX" />
            </div>
            <div>
              <Label className="text-xs font-medium mb-1.5 block">WhatsApp</Label>
              <Input defaultValue="+213 XX XX XX XX" />
            </div>
          </div>
          <div>
            <Label className="text-xs font-medium mb-1.5 block">Email de contact</Label>
            <Input type="email" defaultValue="contact@voyages.dz" />
          </div>
        </div>
      </section>

      {/* SATIM */}
      <section className="bg-white rounded-xl border border-neutral-200 p-5">
        <h2 className="font-semibold text-neutral-800 mb-4 flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          Paiement SATIM
        </h2>
        <div className="space-y-4">
          <div>
            <Label className="text-xs font-medium mb-2 block">Mode</Label>
            <div className="flex gap-3">
              {(['test', 'production'] as const).map(mode => (
                <button key={mode} type="button" onClick={() => setSatimMode(mode)}
                  className={cn('px-4 py-2 rounded-lg border text-sm font-medium transition-all',
                    satimMode === mode
                      ? mode === 'production' ? 'border-success-500 bg-success-50 text-success-700' : 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                  )}
                >
                  {mode === 'test' ? '🔧 Test' : '🚀 Production'}
                </button>
              ))}
            </div>
            {satimMode === 'production' && (
              <p className="text-xs text-warning-600 mt-2">⚠️ Mode production — les paiements réels seront traités.</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-medium mb-1.5 block">Terminal ID</Label>
              <Input defaultValue="e{merchantId}dz" />
            </div>
            <div>
              <Label className="text-xs font-medium mb-1.5 block">Username SATIM</Label>
              <Input defaultValue="voyages_test" />
            </div>
          </div>
          <div>
            <Label className="text-xs font-medium mb-1.5 block">URL de callback</Label>
            <Input defaultValue="https://voyages.dz/api/payments/satim/callback" className="font-mono text-sm" readOnly />
          </div>
        </div>
      </section>

      {/* Notifications admin */}
      <section className="bg-white rounded-xl border border-neutral-200 p-5">
        <h2 className="font-semibold text-neutral-800 mb-4 flex items-center gap-2">
          <Bell className="w-4 h-4" />
          Notifications admin
        </h2>
        <div className="space-y-4">
          {Object.entries({
            newBooking: 'Nouvelle réservation',
            paymentReceived: 'Paiement reçu',
            bookingCancelled: 'Annulation de réservation',
            lowStock: 'Stock limité (< 3 places)',
          }).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between">
              <p className="text-sm text-neutral-700">{label}</p>
              <Toggle
                enabled={notifications[key as keyof typeof notifications]}
                onChange={() => setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof notifications] }))}
              />
            </div>
          ))}
        </div>
      </section>

      {/* SEO global */}
      <section className="bg-white rounded-xl border border-neutral-200 p-5">
        <h2 className="font-semibold text-neutral-800 mb-4 flex items-center gap-2">
          <Globe className="w-4 h-4" />
          SEO global
        </h2>
        <div className="space-y-4">
          <div>
            <Label className="text-xs font-medium mb-1.5 block">URL du site</Label>
            <Input defaultValue="https://voyages.dz" className="font-mono text-sm" />
          </div>
          <div>
            <Label className="text-xs font-medium mb-1.5 block">Google Analytics ID</Label>
            <Input defaultValue="G-XXXXXXXXXX" className="font-mono text-sm" />
          </div>
        </div>
      </section>

      <Separator />

      <Button variant="primary" size="lg" className="gap-2" onClick={handleSave}>
        {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
        {saved ? 'Paramètres enregistrés !' : 'Enregistrer les paramètres'}
      </Button>
    </div>
  );
}
