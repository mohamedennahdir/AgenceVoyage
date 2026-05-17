'use client';

import { useState } from 'react';
import { Bell, Mail, Smartphone, MessageCircle, Globe, DollarSign, Lock, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils/classnames';

export const dynamic = 'force-dynamic';

interface Toggle {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  enabled: boolean;
}

function ToggleSwitch({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors',
        enabled ? 'bg-primary-500' : 'bg-neutral-200',
      )}
    >
      <span
        className={cn(
          'inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform',
          enabled ? 'translate-x-5' : 'translate-x-0',
        )}
      />
    </button>
  );
}

export default function ParametresPage() {
  const [notifications, setNotifications] = useState<Toggle[]>([
    { id: 'email', label: 'Email', description: 'Confirmations, rappels et offres par email', icon: Mail, enabled: true },
    { id: 'sms', label: 'SMS', description: 'Alertes importantes par SMS', icon: Smartphone, enabled: true },
    { id: 'whatsapp', label: 'WhatsApp', description: 'Mises à jour de réservation sur WhatsApp', icon: MessageCircle, enabled: false },
    { id: 'newsletter', label: 'Newsletter', description: 'Offres spéciales et nouveautés (1 email / semaine)', icon: Bell, enabled: true },
  ]);

  const [language, setLanguage] = useState<'fr' | 'ar'>('fr');
  const [currency, setCurrency] = useState<'DZD' | 'EUR'>('DZD');
  const [saved, setSaved] = useState(false);

  const toggleNotif = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n)),
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Paramètres</h1>
        <p className="text-neutral-500 text-sm mt-1">Gérez vos préférences et votre compte.</p>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <h2 className="font-semibold text-neutral-900 mb-1">Notifications</h2>
        <p className="text-xs text-neutral-500 mb-4">Choisissez comment vous souhaitez être informé.</p>
        <div className="space-y-4">
          {notifications.map((notif) => {
            const Icon = notif.icon;
            return (
              <div key={notif.id} className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-neutral-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{notif.label}</p>
                    <p className="text-xs text-neutral-500">{notif.description}</p>
                  </div>
                </div>
                <ToggleSwitch enabled={notif.enabled} onChange={() => toggleNotif(notif.id)} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Langue & Devise */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <h2 className="font-semibold text-neutral-900 mb-4">Langue et devise</h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-neutral-600 flex items-center gap-1.5 mb-2">
              <Globe className="w-3.5 h-3.5" />
              Langue de l&apos;interface
            </label>
            <div className="flex gap-2">
              {(['fr', 'ar'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={cn(
                    'px-4 py-2 rounded-lg border text-sm font-medium transition-all',
                    language === lang
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-neutral-200 text-neutral-600 hover:border-neutral-300',
                  )}
                >
                  {lang === 'fr' ? '🇫🇷 Français' : '🇩🇿 العربية'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-600 flex items-center gap-1.5 mb-2">
              <DollarSign className="w-3.5 h-3.5" />
              Devise préférée
            </label>
            <div className="flex gap-2">
              {(['DZD', 'EUR'] as const).map((cur) => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className={cn(
                    'px-4 py-2 rounded-lg border text-sm font-medium transition-all',
                    currency === cur
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-neutral-200 text-neutral-600 hover:border-neutral-300',
                  )}
                >
                  {cur}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sécurité */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <h2 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
          <Lock className="w-4 h-4" />
          Sécurité
        </h2>
        <Button variant="outline" size="sm">
          Changer le mot de passe
        </Button>
      </div>

      {/* Save */}
      <Button variant="primary" size="md" className="gap-2" onClick={handleSave}>
        <Save className="w-4 h-4" />
        {saved ? 'Enregistré !' : 'Enregistrer les préférences'}
      </Button>

      <Separator />

      {/* Danger zone */}
      <div className="bg-error-50 rounded-xl border border-error-200 p-5">
        <h2 className="font-semibold text-error-700 mb-1 flex items-center gap-2">
          <Trash2 className="w-4 h-4" />
          Zone de danger
        </h2>
        <p className="text-sm text-error-600 mb-4">
          La suppression de votre compte est définitive et irréversible.
        </p>
        <Button variant="outline" size="sm" className="border-error-400 text-error-600 hover:bg-error-50">
          Supprimer mon compte
        </Button>
      </div>
    </div>
  );
}
