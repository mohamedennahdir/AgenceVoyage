'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Heart,
  Users,
  User,
  Bell,
  Settings,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils/classnames';
import { ROUTES } from '@/lib/constants/routes';
import { logout } from '@/lib/firebase/auth';

const ACCOUNT_NAV = [
  { label: 'Tableau de bord', href: ROUTES.account, icon: LayoutDashboard, exact: true },
  { label: 'Réservations', href: ROUTES.bookings, icon: Calendar },
  { label: 'Favoris', href: ROUTES.favorites, icon: Heart },
  { label: 'Voyageurs', href: ROUTES.travelers, icon: Users },
  { label: 'Profil', href: ROUTES.profile, icon: User },
  { label: 'Notifications', href: ROUTES.notifications, icon: Bell },
  { label: 'Paramètres', href: ROUTES.settings, icon: Settings },
];

export function AccountSidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <>
      {/* Mobile — onglets horizontaux */}
      <div className="lg:hidden flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {ACCOUNT_NAV.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-[11px] font-medium whitespace-nowrap shrink-0 transition-all',
                active
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:border-primary-300 hover:text-primary-600',
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Desktop — sidebar verticale */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0">
        <nav className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          {ACCOUNT_NAV.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 text-sm transition-colors border-l-2',
                  active
                    ? 'border-primary-500 bg-primary-50 text-primary-600 font-semibold'
                    : 'border-transparent text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900',
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-error-600 hover:bg-error-50 transition-colors border-l-2 border-transparent"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Déconnexion
          </button>
        </nav>
      </aside>
    </>
  );
}
