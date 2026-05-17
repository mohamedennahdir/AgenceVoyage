'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  CreditCard,
  Tag,
  Users,
  FileText,
  Globe,
  Ticket,
  BookOpen,
  Settings,
  UserCog,
  ClipboardList,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils/classnames';
import { ROUTES } from '@/lib/constants/routes';
import { logout } from '@/lib/firebase/auth';

const ADMIN_NAV = [
  { label: 'Tableau de bord', href: ROUTES.admin, icon: LayoutDashboard, exact: true },
  { label: 'Réservations', href: ROUTES.adminBookings, icon: Calendar },
  { label: 'Paiements', href: ROUTES.adminPayments, icon: CreditCard },
  { label: 'Offres', href: ROUTES.adminOffers, icon: Tag },
  { label: 'Clients', href: ROUTES.adminClients, icon: Users },
  { label: 'Blog', href: ROUTES.adminBlog, icon: BookOpen },
  { label: 'Destinations', href: ROUTES.adminDestinations, icon: Globe },
  { label: 'Promotions', href: ROUTES.adminPromos, icon: Ticket },
  { label: 'Pages', href: ROUTES.adminPages, icon: FileText },
  { label: 'Utilisateurs', href: ROUTES.adminUsers, icon: UserCog },
  { label: 'Paramètres', href: ROUTES.adminSettings, icon: Settings },
  { label: 'Audit', href: ROUTES.adminAudit, icon: ClipboardList },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="w-56 shrink-0 bg-neutral-900 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-neutral-700">
        <Link href={ROUTES.home} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-4.5 h-4.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <span className="font-display font-bold text-white text-sm">Voyages</span>
            <span className="block text-[10px] text-neutral-500 uppercase tracking-widest">Admin</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {ADMIN_NAV.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                active
                  ? 'bg-primary-500 text-white font-medium'
                  : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100',
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-2 py-4 border-t border-neutral-700">
        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-400 hover:bg-neutral-800 hover:text-error-400 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
