# 🎨 Design System - Voyages

## Philosophie design

### Vision
Une plateforme **moderne**, **épurée** et **immersive**. Inspirée des meilleures pratiques de Booking, Airbnb et Tripadvisor, adaptée au goût méditerranéen et nord-africain. Le voyage est une expérience émotionnelle : nos visuels et notre design doivent **faire rêver** tout en restant **professionnels et fiables**.

### Principes
1. **Photo first** : les images sont au cœur, généreuses et haute qualité
2. **Espace généreux** : white space pour respirer
3. **Hiérarchie claire** : un seul focus par écran
4. **Mobile first** : conçu d'abord pour mobile (70% du trafic)
5. **Micro-interactions** : animations subtiles, jamais gadgets
6. **Confiance** : codes visuels rassurants (sceau, avis, agréments)

## 🎨 Palette de couleurs

### Couleurs primaires

```css
/* Bleu profond Méditerranée - couleur principale */
--primary-50:  #F0F7FF;
--primary-100: #E0EFFF;
--primary-200: #BAD9FF;
--primary-300: #7CB8FF;
--primary-400: #3593FB;
--primary-500: #0F4C81;  /* ⭐ Couleur principale */
--primary-600: #0D3F6B;
--primary-700: #0A3155;
--primary-800: #082640;
--primary-900: #051A2B;

/* Corail - couleur accent */
--accent-50:  #FFF5F5;
--accent-100: #FFE8E8;
--accent-200: #FFC7C7;
--accent-300: #FFA0A0;
--accent-400: #FF7B7B;
--accent-500: #FF6B6B;  /* ⭐ Couleur accent */
--accent-600: #E55555;
--accent-700: #B83F3F;
--accent-800: #8C2C2C;
--accent-900: #5F1E1E;
```

### Couleurs neutres (chaudes)

```css
/* Sable - neutres chauds */
--neutral-50:  #FAFAF7;  /* Background pages */
--neutral-100: #F5F4EF;  /* Background cards */
--neutral-200: #E8E6DD;
--neutral-300: #D4D1C4;
--neutral-400: #A8A498;
--neutral-500: #76736A;
--neutral-600: #524F47;
--neutral-700: #3A3833;
--neutral-800: #25241F;
--neutral-900: #1A1916;  /* Texte principal */
```

### Couleurs sémantiques

```css
/* Success - vert nature */
--success-50:  #F0FDF4;
--success-500: #16A34A;
--success-700: #15803D;

/* Warning - ambre */
--warning-50:  #FFFBEB;
--warning-500: #F59E0B;
--warning-700: #B45309;

/* Error - rouge */
--error-50:  #FEF2F2;
--error-500: #EF4444;
--error-700: #B91C1C;

/* Info - bleu clair */
--info-50:  #EFF6FF;
--info-500: #3B82F6;
--info-700: #1D4ED8;
```

### Usage des couleurs

| Élément | Couleur |
|---------|---------|
| CTAs principaux | `primary-500` |
| CTAs secondaires | `accent-500` |
| Texte principal | `neutral-900` |
| Texte secondaire | `neutral-600` |
| Texte muted | `neutral-400` |
| Borders | `neutral-200` |
| Background | `neutral-50` |
| Cards | `white` ou `neutral-100` |
| Hover primary | `primary-600` |
| Hover accent | `accent-600` |
| Prix | `accent-600` |
| Promotions | `error-500` |
| Disponible | `success-500` |
| Quelques places | `warning-500` |
| Complet | `error-500` |

## ✍️ Typographie

### Familles de polices

```css
/* UI et corps de texte */
font-family: 'Inter', system-ui, -apple-system, sans-serif;

/* Titres éditoriaux et marketing */
font-family: 'Playfair Display', Georgia, serif;

/* Code et données techniques */
font-family: 'JetBrains Mono', 'Monaco', monospace;
```

### Échelle typographique

```css
/* Display - usage rare (hero, splash) */
--text-display-2xl: 4.5rem;   /* 72px */
--text-display-xl:  3.75rem;  /* 60px */
--text-display-lg:  3rem;     /* 48px */

/* Headings */
--text-h1: 2.25rem;  /* 36px - Page titles */
--text-h2: 1.875rem; /* 30px - Section titles */
--text-h3: 1.5rem;   /* 24px - Sub-sections */
--text-h4: 1.25rem;  /* 20px - Card titles */
--text-h5: 1.125rem; /* 18px */
--text-h6: 1rem;     /* 16px */

/* Body */
--text-lg:   1.125rem; /* 18px - Lead paragraphs */
--text-base: 1rem;     /* 16px - Body */
--text-sm:   0.875rem; /* 14px - Secondary */
--text-xs:   0.75rem;  /* 12px - Captions, labels */
```

### Poids des polices

```css
--font-light:    300;
--font-regular:  400;
--font-medium:   500;
--font-semibold: 600;
--font-bold:     700;
```

### Hauteurs de ligne

```css
--leading-tight:    1.25;
--leading-snug:     1.375;
--leading-normal:   1.5;   /* Default body */
--leading-relaxed:  1.625;
--leading-loose:    1.75;  /* Articles long-form */
```

### Usage typographique

```html
<!-- Hero marketing -->
<h1 class="font-display text-display-xl font-bold text-neutral-900 leading-tight">
  Votre prochaine aventure commence ici
</h1>

<!-- Page title -->
<h1 class="font-sans text-h1 font-bold text-neutral-900">
  Voyages organisés
</h1>

<!-- Section -->
<h2 class="font-sans text-h2 font-semibold text-neutral-900">
  Destinations populaires
</h2>

<!-- Card title -->
<h3 class="font-sans text-h4 font-semibold text-neutral-900">
  Istanbul - 7 jours
</h3>

<!-- Body -->
<p class="text-base text-neutral-700 leading-normal">
  Découvrez la ville où l'Orient et l'Occident se rencontrent...
</p>

<!-- Caption -->
<span class="text-sm text-neutral-500">
  À partir de
</span>
```

## 📏 Espacements

Échelle basée sur 4px.

```css
--space-0:   0;
--space-1:   0.25rem; /* 4px */
--space-2:   0.5rem;  /* 8px */
--space-3:   0.75rem; /* 12px */
--space-4:   1rem;    /* 16px */
--space-5:   1.25rem; /* 20px */
--space-6:   1.5rem;  /* 24px */
--space-8:   2rem;    /* 32px */
--space-10:  2.5rem;  /* 40px */
--space-12:  3rem;    /* 48px */
--space-16:  4rem;    /* 64px */
--space-20:  5rem;    /* 80px */
--space-24:  6rem;    /* 96px */
--space-32:  8rem;    /* 128px */
```

### Espacements composants

| Usage | Valeur |
|-------|--------|
| Padding boutons | `px-6 py-3` (md), `px-8 py-4` (lg) |
| Padding cards | `p-6` (mobile), `p-8` (desktop) |
| Gap entre cards | `gap-4` (mobile), `gap-6` (desktop) |
| Padding sections | `py-12` (mobile), `py-20` (desktop) |
| Container padding | `px-4` (mobile), `px-8` (desktop) |
| Max container | `max-w-7xl` (1280px) |

## 🔲 Border radius

```css
--radius-none: 0;
--radius-sm:   0.25rem;  /* 4px - badges, tags */
--radius-md:   0.5rem;   /* 8px - inputs, small cards */
--radius-lg:   0.75rem;  /* 12px - cards */
--radius-xl:   1rem;     /* 16px - large cards */
--radius-2xl:  1.5rem;   /* 24px - hero elements */
--radius-3xl:  2rem;     /* 32px - special */
--radius-full: 9999px;   /* pills, avatars */
```

## 🌑 Ombres

```css
--shadow-xs:  0 1px 2px rgba(15, 76, 129, 0.05);
--shadow-sm:  0 2px 4px rgba(15, 76, 129, 0.06);
--shadow-md:  0 4px 8px rgba(15, 76, 129, 0.08);
--shadow-lg:  0 10px 20px rgba(15, 76, 129, 0.10);
--shadow-xl:  0 20px 40px rgba(15, 76, 129, 0.12);
--shadow-2xl: 0 30px 60px rgba(15, 76, 129, 0.15);

/* Spéciales */
--shadow-card-hover: 0 12px 24px rgba(15, 76, 129, 0.15);
--shadow-card-focus: 0 0 0 3px rgba(15, 76, 129, 0.2);
```

## 🎭 Composants UI

### Buttons

```tsx
// Primary - actions principales
<Button variant="primary" size="md">
  Réserver maintenant
</Button>
// Style: bg-primary-500 hover:bg-primary-600 text-white
//        rounded-lg px-6 py-3 font-semibold
//        shadow-sm hover:shadow-md transition-all

// Accent - CTAs marketing
<Button variant="accent" size="lg">
  Découvrir les offres
</Button>
// Style: bg-accent-500 hover:bg-accent-600 text-white

// Secondary - actions secondaires
<Button variant="secondary" size="md">
  Voir plus
</Button>
// Style: bg-white border-2 border-primary-500
//        text-primary-500 hover:bg-primary-50

// Ghost - actions tertiaires
<Button variant="ghost" size="md">
  Annuler
</Button>
// Style: text-neutral-700 hover:bg-neutral-100

// Outline - neutre
<Button variant="outline" size="md">
  En savoir plus
</Button>
// Style: border border-neutral-300 hover:border-primary-500
//        text-neutral-700 hover:text-primary-500
```

#### Tailles
- `sm` : `px-4 py-2 text-sm`
- `md` : `px-6 py-3 text-base`
- `lg` : `px-8 py-4 text-lg`
- `xl` : `px-10 py-5 text-xl`

### Cards

```tsx
// Offer Card - carte d'offre
<Card className="
  bg-white 
  rounded-xl 
  overflow-hidden 
  shadow-sm 
  hover:shadow-card-hover 
  transition-all duration-300
  hover:-translate-y-1
">
  <Image className="aspect-[4/3] object-cover" />
  <div className="p-6">
    <Badge variant="accent">Promo -20%</Badge>
    <h3 className="text-h4 font-semibold mt-3">{title}</h3>
    <p className="text-sm text-neutral-600 mt-2">{location}</p>
    <div className="flex items-baseline mt-4">
      <span className="text-sm text-neutral-500">À partir de</span>
      <span className="text-2xl font-bold text-accent-600 ml-2">
        {price} DZD
      </span>
    </div>
  </div>
</Card>
```

### Inputs

```tsx
// Input texte
<Input
  className="
    w-full
    px-4 py-3
    bg-white
    border border-neutral-300
    rounded-lg
    text-base
    placeholder:text-neutral-400
    focus:border-primary-500
    focus:ring-2 focus:ring-primary-100
    transition-all
  "
/>

// Avec label
<div>
  <label className="block text-sm font-medium text-neutral-700 mb-2">
    Destination
  </label>
  <Input placeholder="Où voulez-vous aller ?" />
</div>

// État erreur
<Input className="border-error-500 focus:ring-error-100" />
<p className="text-sm text-error-600 mt-1">Champ requis</p>
```

### Badges

```tsx
// Variantes
<Badge variant="success">Disponible</Badge>      // bg-success-50 text-success-700
<Badge variant="warning">Quelques places</Badge> // bg-warning-50 text-warning-700
<Badge variant="error">Complet</Badge>           // bg-error-50 text-error-700
<Badge variant="accent">Promo -20%</Badge>       // bg-accent-50 text-accent-700
<Badge variant="primary">Nouveauté</Badge>       // bg-primary-50 text-primary-700
<Badge variant="neutral">Économique</Badge>      // bg-neutral-100 text-neutral-700

// Style général
// px-2.5 py-1 rounded-full text-xs font-medium
```

## 🎬 Animations

### Durées et easings

```css
--duration-fast:    150ms;
--duration-normal:  250ms;
--duration-slow:    400ms;
--duration-slower:  600ms;

--ease-in:       cubic-bezier(0.4, 0, 1, 1);
--ease-out:      cubic-bezier(0, 0, 0.2, 1);
--ease-in-out:   cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Animations Framer Motion

```tsx
// Fade in stagger pour listes
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0, 0, 0.2, 1] }
  }
};

// Hero text reveal
const heroText = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0, 0, 0.2, 1] }
  }
};

// Hover cards
const cardHover = {
  rest: { y: 0, boxShadow: 'var(--shadow-sm)' },
  hover: { 
    y: -4, 
    boxShadow: 'var(--shadow-lg)',
    transition: { duration: 0.25 }
  }
};

// Slide in panels
const slidePanel = {
  hidden: { x: '100%' },
  show: { 
    x: 0,
    transition: { type: 'spring', damping: 30, stiffness: 300 }
  }
};
```

### Micro-interactions

| Action | Animation |
|--------|-----------|
| Hover card | Lift `-4px` + shadow increase |
| Hover button | Background darken + slight scale `1.02` |
| Click button | Scale `0.98` |
| Focus input | Border color + ring shadow |
| Loading | Skeleton pulse |
| Success | Check icon scale + fade in |
| Error | Shake horizontal |
| Page transition | Fade + slight slide |

## 📐 Grilles et layouts

### Breakpoints

```css
--bp-sm:  640px;   /* Petit mobile à tablette */
--bp-md:  768px;   /* Tablette */
--bp-lg:  1024px;  /* Desktop */
--bp-xl:  1280px;  /* Large desktop */
--bp-2xl: 1536px;  /* Très large */
```

### Container

```tsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
  {/* Content */}
</div>
```

### Grilles courantes

```tsx
// Grille d'offres
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {offers.map(...)}
</div>

// Layout 2 colonnes
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <main className="lg:col-span-2">{/* Content */}</main>
  <aside className="lg:col-span-1">{/* Sidebar */}</aside>
</div>

// Layout admin
<div className="flex">
  <Sidebar className="w-64 shrink-0" />
  <main className="flex-1 p-8">{/* Content */}</main>
</div>
```

## 🌅 Imagerie

### Standards photos
- **Formats** : WebP en priorité, JPEG fallback
- **Compression** : Qualité 80-85
- **Tailles** :
  - Hero : 1920x1080 (16:9)
  - Card grande : 800x600 (4:3)
  - Card standard : 600x450 (4:3)
  - Thumbnail : 200x200 (1:1)
  - Avatar : 80x80 (1:1)

### Ratios standard
```tsx
<div className="aspect-[16/9]">  {/* Hero */}
<div className="aspect-[4/3]">   {/* Cards */}
<div className="aspect-[3/4]">   {/* Portrait */}
<div className="aspect-square">  {/* Square */}
```

### Sources pour dev
- **Unsplash API** : photos haute qualité gratuites
- **Pexels** : alternative
- Toujours optimiser via `next/image`

### Style photo
- **Lumière naturelle** privilégiée
- **Vraies destinations** (pas de stock générique)
- **Émotions humaines** : sourires, contemplations
- **Couleurs vibrantes** : ciel, mer, architecture
- **Composition** : règle des tiers, profondeur

## 🎯 États visuels

### Boutons

```css
/* Default */ → /* Hover */ → /* Active */ → /* Disabled */ → /* Loading */

/* Primary button states */
.btn-primary {
  /* default */
  @apply bg-primary-500 text-white shadow-sm;
  
  /* hover */
  @apply hover:bg-primary-600 hover:shadow-md;
  
  /* active */
  @apply active:bg-primary-700 active:scale-[0.98];
  
  /* disabled */
  @apply disabled:bg-neutral-300 disabled:cursor-not-allowed;
  
  /* focus */
  @apply focus:ring-4 focus:ring-primary-100;
}
```

### Cards

```tsx
// État vide
<EmptyState 
  icon={SearchIcon}
  title="Aucune offre trouvée"
  description="Essayez d'ajuster vos filtres"
  action={<Button>Réinitialiser</Button>}
/>

// État loading (skeleton)
<div className="space-y-4">
  <div className="aspect-[4/3] bg-neutral-200 rounded-xl animate-pulse" />
  <div className="h-4 bg-neutral-200 rounded w-3/4 animate-pulse" />
  <div className="h-4 bg-neutral-200 rounded w-1/2 animate-pulse" />
</div>

// État erreur
<ErrorState 
  title="Une erreur est survenue"
  description="Impossible de charger les offres"
  action={<Button onClick={retry}>Réessayer</Button>}
/>
```

## ♿ Accessibilité

### Contraste minimum
- **Texte normal** : 4.5:1 (WCAG AA)
- **Texte large** (18px+) : 3:1
- **Composants UI** : 3:1

### Focus visible
```css
.focus-visible {
  @apply outline-none ring-4 ring-primary-100 ring-offset-2;
}
```

### Labels et ARIA
- Tous les inputs ont des labels
- Boutons icon-only ont `aria-label`
- États dynamiques utilisent `aria-live`
- Navigation au clavier complète

## 📱 Mobile-first patterns

### Sticky bottom CTA (mobile)
```tsx
<div className="
  lg:hidden 
  fixed bottom-0 left-0 right-0 
  bg-white border-t border-neutral-200
  p-4 z-50
  shadow-2xl
">
  <Button variant="primary" size="lg" className="w-full">
    Réserver - 45 000 DZD
  </Button>
</div>
```

### Bottom navigation (app-like)
```tsx
<nav className="
  lg:hidden 
  fixed bottom-0 left-0 right-0 
  bg-white border-t 
  flex justify-around py-2
">
  <NavItem icon={Home} label="Accueil" />
  <NavItem icon={Search} label="Rechercher" />
  <NavItem icon={Heart} label="Favoris" />
  <NavItem icon={User} label="Compte" />
</nav>
```

### Swipeable galleries
- Utiliser `Embla Carousel` pour les galleries photos
- Indicateurs visuels (dots)
- Support swipe gestures

## 🎨 Tokens à utiliser dans Tailwind config

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { 50: '#F0F7FF', /* ... */ 900: '#051A2B' },
        accent: { 50: '#FFF5F5', /* ... */ 900: '#5F1E1E' },
        neutral: { 50: '#FAFAF7', /* ... */ 900: '#1A1916' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'card-hover': '0 12px 24px rgba(15, 76, 129, 0.15)',
        'card-focus': '0 0 0 3px rgba(15, 76, 129, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'shimmer': 'shimmer 1.5s infinite',
      },
    },
  },
};
```

## ✅ Checklist design

Avant de valider un écran, vérifier :

- [ ] Mobile + tablette + desktop OK
- [ ] Contraste WCAG AA respecté
- [ ] Tous les états gérés (loading, error, empty)
- [ ] Animations subtiles et performantes
- [ ] Hiérarchie visuelle claire
- [ ] CTAs principal identifiable instantanément
- [ ] Espacements respectent le système 4px
- [ ] Photos optimisées et de qualité
- [ ] Typographie respecte l'échelle
- [ ] Couleurs uniquement du design system
- [ ] Focus visible sur tous les interactifs
- [ ] Labels et ARIA complets
- [ ] Tests sur 3G simulé OK
