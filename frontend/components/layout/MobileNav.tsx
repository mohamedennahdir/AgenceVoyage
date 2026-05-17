'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { User, LogIn, UserPlus, Heart } from 'lucide-react';
import { cn } from '@/lib/utils/classnames';
import { ROUTES } from '@/lib/constants/routes';

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
}

interface MobileNavProps {
  items: NavItem[];
  isAuthenticated: boolean;
  onClose: () => void;
}

export function MobileNav({ items, isAuthenticated, onClose }: MobileNavProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="lg:hidden fixed inset-0 top-16 z-40 bg-white overflow-y-auto"
    >
      <nav className="px-4 py-6 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-neutral-50 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors shrink-0">
                <Icon className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900">{item.label}</p>
                <p className="text-sm text-neutral-500">{item.description}</p>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-neutral-200 px-4 py-6 space-y-3">
        {isAuthenticated ? (
          <>
            <Link
              href={ROUTES.account}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-50 text-primary-600 font-semibold"
            >
              <User className="w-5 h-5" />
              Mon espace client
            </Link>
            <Link
              href={ROUTES.favorites}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-50 text-neutral-700"
            >
              <Heart className="w-5 h-5" />
              Mes favoris
            </Link>
          </>
        ) : (
          <>
            <Link
              href={ROUTES.login}
              onClick={onClose}
              className={cn(
                'flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl',
                'border-2 border-primary-500 text-primary-500 font-semibold',
                'hover:bg-primary-50 transition-colors',
              )}
            >
              <LogIn className="w-5 h-5" />
              Se connecter
            </Link>
            <Link
              href={ROUTES.register}
              onClick={onClose}
              className={cn(
                'flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl',
                'bg-accent-500 text-white font-semibold',
                'hover:bg-accent-600 transition-colors',
              )}
            >
              <UserPlus className="w-5 h-5" />
              Créer un compte
            </Link>
          </>
        )}
      </div>
    </motion.div>
  );
}
