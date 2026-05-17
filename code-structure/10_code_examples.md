# 💡 Exemples de code - Référence design

Ce fichier contient des exemples concrets de composants pour aider Claude Code à implémenter le design system de façon cohérente.

## 1. OfferCard - Carte d'offre moderne

```tsx
// components/offers/OfferCard.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Star, MapPin, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils/formatPrice';
import { cn } from '@/lib/utils/classnames';
import type { Offer } from '@/types/offer.types';

interface OfferCardProps {
  offer: Offer;
  variant?: 'default' | 'compact' | 'large';
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
  className?: string;
}

export function OfferCard({
  offer,
  variant = 'default',
  isFavorite,
  onFavoriteToggle,
  className,
}: OfferCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
      className={cn(
        'group relative overflow-hidden rounded-xl bg-white shadow-sm',
        'hover:shadow-card-hover transition-shadow duration-300',
        className
      )}
    >
      <Link href={`/offres/${offer.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
          <Image
            src={offer.mainImage}
            alt={offer.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Badge promo */}
          {offer.promotion?.active && (
            <div className="absolute top-4 left-4">
              <Badge variant="accent" className="shadow-md">
                -{offer.promotion.discountValue}
                {offer.promotion.discountType === 'percentage' ? '%' : ' DZD'}
              </Badge>
            </div>
          )}

          {/* Badge "Quelques places" */}
          {offer.availability.dates?.[0]?.status === 'few_left' && (
            <div className="absolute bottom-4 left-4">
              <Badge variant="warning" className="shadow-md">
                Quelques places
              </Badge>
            </div>
          )}

          {/* Bouton favoris */}
          {onFavoriteToggle && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onFavoriteToggle(offer.id);
              }}
              className={cn(
                'absolute top-4 right-4 p-2.5 rounded-full',
                'bg-white/95 backdrop-blur-sm shadow-md',
                'hover:scale-110 transition-transform',
                'focus:outline-none focus:ring-2 focus:ring-primary-500'
              )}
              aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            >
              <Heart
                className={cn(
                  'w-5 h-5 transition-colors',
                  isFavorite
                    ? 'fill-accent-500 text-accent-500'
                    : 'text-neutral-700'
                )}
              />
            </button>
          )}
        </div>

        {/* Contenu */}
        <div className="p-5 space-y-3">
          {/* Localisation */}
          <div className="flex items-center gap-1.5 text-sm text-neutral-500">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="line-clamp-1">{offer.destinations.join(', ')}</span>
          </div>

          {/* Titre */}
          <h3 className="font-semibold text-h5 text-neutral-900 line-clamp-2 group-hover:text-primary-500 transition-colors">
            {offer.title}
          </h3>

          {/* Durée + Étoiles */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5 text-neutral-600">
              <Clock className="w-4 h-4" />
              <span>
                {offer.duration.days}J / {offer.duration.nights}N
              </span>
            </div>

            {offer.stats.avgRating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-warning-500 text-warning-500" />
                <span className="font-medium text-neutral-900">
                  {offer.stats.avgRating.toFixed(1)}
                </span>
                <span className="text-neutral-500">
                  ({offer.stats.reviewCount})
                </span>
              </div>
            )}
          </div>

          {/* Prix */}
          <div className="pt-2 border-t border-neutral-100">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-neutral-500">À partir de</span>
                <div className="flex items-baseline gap-2">
                  {offer.promotion?.active && (
                    <span className="text-sm text-neutral-400 line-through">
                      {formatPrice(offer.promotion.originalPrice)}
                    </span>
                  )}
                  <span className="text-xl font-bold text-accent-600">
                    {formatPrice(offer.pricing.basePrice)}
                  </span>
                </div>
                <span className="text-xs text-neutral-500">/ personne</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
```

## 2. Hero section moderne

```tsx
// components/home/Hero.tsx
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SearchEngine } from './SearchEngine';

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0, 0, 0.2, 1] },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0, 0, 0.2, 1], delay: 0.3 },
  },
};

const searchVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0, 0, 0.2, 1], delay: 0.5 },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-[700px] lg:min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background avec overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-istanbul.jpg"
          alt=""
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/40 via-neutral-900/30 to-neutral-900/60" />
      </div>

      {/* Contenu */}
      <div className="container relative z-10 px-4 py-20 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="show"
            className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6"
          >
            Votre prochaine aventure
            <br />
            <span className="text-accent-400">commence ici</span>
          </motion.h1>

          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate="show"
            className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
          >
            Découvrez nos destinations soigneusement sélectionnées et
            réservez en toute sérénité depuis l'Algérie.
          </motion.p>
        </div>

        {/* Moteur de recherche */}
        <motion.div
          variants={searchVariants}
          initial="hidden"
          animate="show"
        >
          <SearchEngine />
        </motion.div>

        {/* Indicateurs de confiance */}
        <motion.div
          variants={subtitleVariants}
          initial="hidden"
          animate="show"
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/90 text-sm"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <span>Agréé Ministère du Tourisme</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <span>+5000 clients satisfaits</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">💳</span>
            <span>Paiement CIB/Edahabia sécurisé</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

## 3. Search Engine - Moteur de recherche

```tsx
// components/home/SearchEngine.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plane, Hotel, Package, MapPin, Sparkles, Search } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/classnames';

const searchTypes = [
  { id: 'flights', label: 'Vols', icon: Plane },
  { id: 'hotels', label: 'Hôtels', icon: Hotel },
  { id: 'packages', label: 'Packages', icon: Package },
  { id: 'omra', label: 'Omra/Hajj', icon: Sparkles },
  { id: 'circuits', label: 'Circuits', icon: MapPin },
];

export function SearchEngine() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('packages');

  const handleSearch = (formData: FormData) => {
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      if (value) params.append(key, value.toString());
    });
    router.push(`/recherche?${params.toString()}`);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start rounded-none bg-neutral-50 px-4 py-0 h-auto border-b border-neutral-200">
          {searchTypes.map((type) => {
            const Icon = type.icon;
            return (
              <TabsTrigger
                key={type.id}
                value={type.id}
                className={cn(
                  'flex items-center gap-2 px-5 py-4',
                  'data-[state=active]:bg-white',
                  'data-[state=active]:shadow-none',
                  'data-[state=active]:border-b-2',
                  'data-[state=active]:border-primary-500',
                  'data-[state=active]:text-primary-500',
                  'rounded-none font-medium transition-colors'
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{type.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Contenu Packages (exemple) */}
        <TabsContent value="packages" className="p-6 m-0">
          <form action={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4">
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-2">
                  Destination
                </label>
                <DestinationPicker name="destination" />
              </div>

              <div className="md:col-span-4">
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-2">
                  Dates
                </label>
                <DateRangePicker name="dates" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-2">
                  Voyageurs
                </label>
                <TravelersSelector name="travelers" />
              </div>

              <div className="md:col-span-2 flex items-end">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-accent-500 hover:bg-accent-600 text-white shadow-lg hover:shadow-xl transition-all h-14"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Rechercher
                </Button>
              </div>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

## 4. Button (variations design system)

```tsx
// components/ui/button.tsx (extension shadcn)
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/classnames';

const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-2',
    'rounded-lg font-semibold',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-4',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-[0.98]'
  ),
  {
    variants: {
      variant: {
        primary: cn(
          'bg-primary-500 text-white shadow-sm',
          'hover:bg-primary-600 hover:shadow-md',
          'focus-visible:ring-primary-100'
        ),
        accent: cn(
          'bg-accent-500 text-white shadow-sm',
          'hover:bg-accent-600 hover:shadow-md',
          'focus-visible:ring-accent-100'
        ),
        secondary: cn(
          'bg-white text-primary-500 border-2 border-primary-500',
          'hover:bg-primary-50',
          'focus-visible:ring-primary-100'
        ),
        ghost: cn(
          'text-neutral-700 bg-transparent',
          'hover:bg-neutral-100',
          'focus-visible:ring-neutral-200'
        ),
        outline: cn(
          'bg-white text-neutral-700 border border-neutral-300',
          'hover:border-primary-500 hover:text-primary-500',
          'focus-visible:ring-primary-100'
        ),
        destructive: cn(
          'bg-error-500 text-white',
          'hover:bg-error-700',
          'focus-visible:ring-error-100'
        ),
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <>
            <Spinner className="w-4 h-4" />
            <span>Chargement...</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
```

## 5. Loader / Skeleton

```tsx
// components/shared/Skeleton.tsx
import { cn } from '@/lib/utils/classnames';

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-shimmer bg-[length:200%_100%] rounded-md',
        'bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-100',
        className
      )}
    />
  );
}

// Exemple: OfferCardSkeleton
export function OfferCardSkeleton() {
  return (
    <div className="rounded-xl bg-white shadow-sm overflow-hidden">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-3/4" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-8 w-32" />
      </div>
    </div>
  );
}
```

## 6. PriceDisplay - Formatage prix

```tsx
// components/shared/PriceDisplay.tsx
import { cn } from '@/lib/utils/classnames';

interface PriceDisplayProps {
  amount: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  originalAmount?: number;
  showCurrency?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-2xl',
  xl: 'text-4xl',
};

export function PriceDisplay({
  amount,
  currency = 'DZD',
  size = 'md',
  originalAmount,
  showCurrency = true,
  className,
}: PriceDisplayProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-DZ').format(num);
  };

  return (
    <span className={cn('inline-flex items-baseline gap-2', className)}>
      {originalAmount && (
        <span className="text-neutral-400 line-through text-sm">
          {formatNumber(originalAmount)}
        </span>
      )}
      <span className={cn('font-bold text-accent-600', sizeClasses[size])}>
        {formatNumber(amount)}
        {showCurrency && (
          <span className="ml-1 text-sm font-medium text-accent-700/80">
            {currency}
          </span>
        )}
      </span>
    </span>
  );
}
```

## 7. Toast notifications

```tsx
// lib/utils/toast.ts
import { toast } from 'sonner';

export const showToast = {
  success: (message: string, description?: string) => {
    toast.success(message, {
      description,
      style: {
        background: 'rgb(240 253 244)',
        color: 'rgb(21 128 61)',
        border: '1px solid rgb(187 247 208)',
      },
    });
  },
  
  error: (message: string, description?: string) => {
    toast.error(message, {
      description,
      style: {
        background: 'rgb(254 242 242)',
        color: 'rgb(185 28 28)',
        border: '1px solid rgb(254 202 202)',
      },
    });
  },
  
  info: (message: string, description?: string) => {
    toast.info(message, { description });
  },
  
  loading: (message: string) => {
    return toast.loading(message);
  },
};
```

## 8. Configuration globals.css

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 30 14% 10%;
    --primary: 209 79% 28%;
    --accent: 0 100% 71%;
  }

  * {
    @apply border-neutral-200;
  }

  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    @apply bg-neutral-50 text-neutral-900 font-sans;
    font-feature-settings: 'rlig' 1, 'calt' 1;
  }

  /* Selection */
  ::selection {
    @apply bg-primary-200 text-primary-900;
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    @apply w-2 h-2;
  }

  ::-webkit-scrollbar-track {
    @apply bg-neutral-100;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-neutral-300 rounded-full;
  }

  ::-webkit-scrollbar-thumb:hover {
    @apply bg-neutral-400;
  }

  /* Focus visible */
  :focus-visible {
    @apply outline-none ring-4 ring-primary-100 ring-offset-2 ring-offset-white;
  }
}

@layer components {
  .container-tight {
    @apply mx-auto max-w-4xl px-4 sm:px-6 lg:px-8;
  }

  .section-padding {
    @apply py-12 sm:py-16 lg:py-20;
  }

  /* Gradient text */
  .text-gradient {
    @apply bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent;
  }

  /* Glass effect */
  .glass {
    @apply bg-white/80 backdrop-blur-md border border-white/20;
  }
}

@layer utilities {
  /* Hide scrollbar but allow scrolling */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

## 9. Animations utiles

```tsx
// lib/utils/animations.ts
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0, 0, 0.2, 1] },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0, 0, 0.2, 1] },
  },
};

export const slideInRight = {
  hidden: { x: '100%' },
  show: {
    x: 0,
    transition: { type: 'spring', damping: 30, stiffness: 300 },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.3 },
  },
};
```

## 10. Layout page d'accueil complète

```tsx
// app/(public)/page.tsx
import { Hero } from '@/components/home/Hero';
import { PopularDestinations } from '@/components/home/PopularDestinations';
import { FeaturedOffers } from '@/components/home/FeaturedOffers';
import { OmraSection } from '@/components/home/OmraSection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { Testimonials } from '@/components/home/Testimonials';
import { BlogTeaser } from '@/components/home/BlogTeaser';
import { Newsletter } from '@/components/home/Newsletter';

export default async function HomePage() {
  // Fetch data côté serveur
  const [featuredOffers, popularDestinations, articles] = await Promise.all([
    getFeaturedOffers(),
    getPopularDestinations(),
    getRecentArticles(3),
  ]);

  return (
    <>
      <Hero />
      
      <section className="section-padding bg-neutral-50">
        <PopularDestinations destinations={popularDestinations} />
      </section>

      <section className="section-padding bg-white">
        <FeaturedOffers offers={featuredOffers} />
      </section>

      <section className="section-padding bg-primary-500 text-white">
        <OmraSection />
      </section>

      <section className="section-padding bg-neutral-50">
        <WhyChooseUs />
      </section>

      <section className="section-padding bg-white">
        <Testimonials />
      </section>

      <section className="section-padding bg-neutral-50">
        <BlogTeaser articles={articles} />
      </section>

      <section className="section-padding bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <Newsletter />
      </section>
    </>
  );
}
```

---

Ces exemples illustrent les patterns à suivre. Claude Code doit s'en inspirer pour maintenir la cohérence du design system à travers toute l'application.
