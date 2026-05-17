'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';
import { BookingStepper } from '@/components/booking/BookingStepper';
import { ROUTES } from '@/lib/constants/routes';

const HIDE_STEPPER_ON = ['/confirmation', '/echec'];

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showStepper = !HIDE_STEPPER_ON.some((p) => pathname.includes(p));

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Header simplifié */}
      <header className="bg-white border-b border-neutral-200 px-4 py-3 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href={ROUTES.home} className="font-display font-bold text-primary-500 text-lg">
            VoyagesApp
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-success-500" />
            <span>Réservation sécurisée</span>
          </div>
        </div>
      </header>

      {/* Stepper */}
      {showStepper && (
        <div className="bg-white border-b border-neutral-100 px-4 py-4">
          <div className="max-w-5xl mx-auto">
            <BookingStepper />
          </div>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 py-8">{children}</main>

      {/* Footer minimal */}
      <footer className="bg-white border-t border-neutral-200 py-4 text-center text-xs text-neutral-400">
        © 2026 VoyagesApp · Agréé Ministère des Affaires Religieuses
      </footer>
    </div>
  );
}
