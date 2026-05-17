import { ShieldCheck, Clock, CreditCard } from 'lucide-react';

export function TrustBadges() {
  const badges = [
    { icon: ShieldCheck, label: 'Annulation gratuite', color: 'text-success-600' },
    { icon: CreditCard, label: 'Paiement sécurisé', color: 'text-primary-600' },
    { icon: Clock, label: 'Support 24/7', color: 'text-accent-600' },
  ];

  return (
    <div className="space-y-2 pt-3 border-t border-neutral-100">
      {badges.map(({ icon: Icon, label, color }) => (
        <div key={label} className="flex items-center gap-2 text-sm text-neutral-600">
          <Icon className={`w-4 h-4 shrink-0 ${color}`} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
