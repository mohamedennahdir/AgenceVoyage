'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plane,
  Hotel,
  Moon,
  MapPin,
  BookOpen,
  User,
  Heart,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Settings,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils/classnames';
import { ROUTES } from '@/lib/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { logout } from '@/lib/firebase/auth';
import { useFavoritesStore } from '@/store/favoritesStore';
import { MobileNav } from './MobileNav';

const NAV_ITEMS = [
  {
    label: 'Vols',
    href: `${ROUTES.search}?type=flights`,
    icon: Plane,
    description: 'Billets d\'avion au meilleur prix',
  },
  {
    label: 'Hôtels',
    href: `${ROUTES.search}?type=hotels`,
    icon: Hotel,
    description: 'Hébergements de qualité',
  },
  {
    label: 'Omra & Hajj',
    href: ROUTES.omra,
    icon: Moon,
    description: 'Packages pèlerinage agréés',
  },
  {
    label: 'Circuits',
    href: `${ROUTES.search}?type=circuits`,
    icon: MapPin,
    description: 'Voyages organisés clé en main',
  },
  {
    label: 'Blog',
    href: ROUTES.blog,
    icon: BookOpen,
    description: 'Guides et inspirations de voyage',
  },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, userProfile, firebaseUser } = useAuth();
  const favoriteCount = useFavoritesStore((s) => s.favoriteIds.length);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const isHomePage = pathname === '/';

  const handleLogout = async () => {
    await logout();
  };

  const getInitials = () => {
    if (userProfile) {
      return `${userProfile.firstName[0] ?? ''}${userProfile.lastName[0] ?? ''}`.toUpperCase();
    }
    return firebaseUser?.email?.[0]?.toUpperCase() ?? 'U';
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          isScrolled || !isHomePage
            ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm'
            : 'bg-gradient-to-b from-black/55 to-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href={ROUTES.home} className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-9 h-9 rounded-xl bg-primary-500 flex items-center justify-center transition-transform group-hover:scale-105">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-5 h-5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span
                className={cn(
                  'font-display font-bold text-xl transition-colors',
                  isScrolled || !isHomePage ? 'text-primary-500' : 'text-white',
                )}
              >
                Voyages
              </span>
            </Link>

            {/* Navigation desktop */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href.split('?')[0] ?? '');
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                      isActive
                        ? 'text-primary-500 bg-primary-50'
                        : isScrolled || !isHomePage
                          ? 'text-neutral-700 hover:text-primary-500 hover:bg-primary-50'
                          : 'text-white/90 hover:text-white hover:bg-white/10',
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Actions droite */}
            <div className="flex items-center gap-2">
              {/* Favoris (connecté seulement) */}
              {isAuthenticated && (
                <Link
                  href={ROUTES.favorites}
                  className={cn(
                    'relative hidden lg:flex items-center justify-center w-9 h-9 rounded-lg transition-colors',
                    isScrolled || !isHomePage
                      ? 'text-neutral-600 hover:text-accent-500 hover:bg-accent-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10',
                  )}
                  aria-label="Mes favoris"
                >
                  <Heart className="w-5 h-5" />
                  {favoriteCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {favoriteCount}
                    </span>
                  )}
                </Link>
              )}

              {/* Compte */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-neutral-100 transition-colors">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={userProfile?.avatar} />
                      <AvatarFallback className="bg-primary-500 text-white text-xs font-bold">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 hidden lg:block',
                        isScrolled || !isHomePage ? 'text-neutral-500' : 'text-white/80',
                      )}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <div className="px-3 py-2 border-b border-neutral-100">
                      <p className="text-sm font-semibold text-neutral-900">
                        {userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : 'Mon compte'}
                      </p>
                      <p className="text-xs text-neutral-500 truncate">{firebaseUser?.email}</p>
                    </div>
                    <DropdownMenuItem onClick={() => router.push(ROUTES.account)} className="flex items-center gap-2 cursor-pointer">
                      <User className="w-4 h-4" /> Mon espace
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(ROUTES.bookings)} className="flex items-center gap-2 cursor-pointer">
                      <Calendar className="w-4 h-4" /> Mes réservations
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(ROUTES.profile)} className="flex items-center gap-2 cursor-pointer">
                      <Settings className="w-4 h-4" /> Mon profil
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-error-600 focus:text-error-600 focus:bg-error-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Déconnexion
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href={ROUTES.login}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        'hidden lg:inline-flex',
                        !isScrolled && isHomePage && 'text-white hover:bg-white/10 hover:text-white',
                      )}
                    >
                      Connexion
                    </Button>
                  </Link>
                  <Link href={ROUTES.register}>
                    <Button
                      size="sm"
                      className="hidden lg:inline-flex bg-accent-500 hover:bg-accent-600 text-white"
                    >
                      S&apos;inscrire
                    </Button>
                  </Link>
                </div>
              )}

              {/* Hamburger mobile */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className={cn(
                  'lg:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors',
                  isScrolled || !isHomePage
                    ? 'text-neutral-700 hover:bg-neutral-100'
                    : 'text-white hover:bg-white/10',
                )}
                aria-label={isMobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              >
                {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile nav */}
      <AnimatePresence>
        {isMobileOpen && (
          <MobileNav
            items={NAV_ITEMS}
            isAuthenticated={isAuthenticated}
            onClose={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
