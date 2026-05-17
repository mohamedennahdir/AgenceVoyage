# 🗂️ Structure du projet

## Arborescence complète

```
voyages-app/
├── frontend/                        # Application Next.js
│   ├── app/                         # App Router Next.js 14
│   │   ├── (public)/                # Routes publiques
│   │   │   ├── layout.tsx           # Layout public (header/footer)
│   │   │   ├── page.tsx             # Page d'accueil
│   │   │   ├── recherche/
│   │   │   │   └── page.tsx         # Résultats recherche
│   │   │   ├── offres/
│   │   │   │   ├── page.tsx         # Liste offres
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx     # Détail offre
│   │   │   ├── omra/
│   │   │   │   └── page.tsx         # Page Omra dédiée
│   │   │   ├── destinations/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── a-propos/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── faq/page.tsx
│   │   │   ├── cgv/page.tsx
│   │   │   ├── confidentialite/page.tsx
│   │   │   └── mentions-legales/page.tsx
│   │   │
│   │   ├── (auth)/                  # Routes authentification
│   │   │   ├── layout.tsx
│   │   │   ├── connexion/page.tsx
│   │   │   ├── inscription/page.tsx
│   │   │   ├── mot-de-passe-oublie/page.tsx
│   │   │   └── verification-email/page.tsx
│   │   │
│   │   ├── (booking)/               # Tunnel de réservation
│   │   │   ├── layout.tsx           # Layout avec stepper
│   │   │   ├── reservation/
│   │   │   │   ├── [offerId]/
│   │   │   │   │   ├── options/page.tsx
│   │   │   │   │   ├── voyageurs/page.tsx
│   │   │   │   │   ├── recap/page.tsx
│   │   │   │   │   ├── paiement/page.tsx
│   │   │   │   │   └── confirmation/page.tsx
│   │   │   │   └── echec/page.tsx
│   │   │
│   │   ├── (account)/               # Espace client
│   │   │   ├── layout.tsx           # Layout avec sidebar
│   │   │   ├── compte/
│   │   │   │   ├── page.tsx         # Dashboard
│   │   │   │   ├── reservations/
│   │   │   │   │   ├── page.tsx     # Liste
│   │   │   │   │   └── [id]/page.tsx # Détail
│   │   │   │   ├── favoris/page.tsx
│   │   │   │   ├── voyageurs/page.tsx
│   │   │   │   ├── profil/page.tsx
│   │   │   │   ├── notifications/page.tsx
│   │   │   │   └── parametres/page.tsx
│   │   │
│   │   ├── admin/                   # Back-office
│   │   │   ├── layout.tsx           # Layout admin
│   │   │   ├── page.tsx             # Dashboard
│   │   │   ├── reservations/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── paiements/page.tsx
│   │   │   ├── offres/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── nouvelle/page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── edition/page.tsx
│   │   │   ├── clients/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── destinations/page.tsx
│   │   │   ├── blog/page.tsx
│   │   │   ├── promos/page.tsx
│   │   │   ├── pages/page.tsx
│   │   │   ├── utilisateurs/page.tsx
│   │   │   ├── parametres/page.tsx
│   │   │   └── audit/page.tsx
│   │   │
│   │   ├── api/                     # API routes Next.js
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   ├── webhooks/
│   │   │   │   ├── satim/route.ts
│   │   │   │   └── stripe/route.ts
│   │   │   ├── sitemap/route.ts
│   │   │   └── robots/route.ts
│   │   │
│   │   ├── layout.tsx               # Root layout
│   │   ├── globals.css              # Styles globaux
│   │   ├── not-found.tsx            # 404
│   │   └── error.tsx                # Error boundary
│   │
│   ├── components/                  # Composants React
│   │   ├── ui/                      # Composants shadcn/ui
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/                  # Composants layout
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   ├── AccountSidebar.tsx
│   │   │   ├── AdminSidebar.tsx
│   │   │   └── BookingStepper.tsx
│   │   │
│   │   ├── home/                    # Composants page d'accueil
│   │   │   ├── Hero.tsx
│   │   │   ├── SearchEngine.tsx
│   │   │   ├── PopularDestinations.tsx
│   │   │   ├── FeaturedOffers.tsx
│   │   │   ├── OmraSection.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── BlogTeaser.tsx
│   │   │   └── Newsletter.tsx
│   │   │
│   │   ├── search/                  # Recherche et filtres
│   │   │   ├── SearchForm.tsx
│   │   │   ├── DestinationPicker.tsx
│   │   │   ├── DateRangePicker.tsx
│   │   │   ├── TravelersSelector.tsx
│   │   │   ├── FiltersSidebar.tsx
│   │   │   ├── FiltersMobile.tsx
│   │   │   ├── SortDropdown.tsx
│   │   │   └── ResultsCount.tsx
│   │   │
│   │   ├── offers/                  # Offres
│   │   │   ├── OfferCard.tsx
│   │   │   ├── OfferCardLarge.tsx
│   │   │   ├── OfferGrid.tsx
│   │   │   ├── OfferList.tsx
│   │   │   ├── OfferGallery.tsx
│   │   │   ├── OfferDetails.tsx
│   │   │   ├── OfferProgram.tsx
│   │   │   ├── OfferInclusions.tsx
│   │   │   ├── OfferMap.tsx
│   │   │   ├── OfferReviews.tsx
│   │   │   └── BookingCard.tsx     # Card sticky réservation
│   │   │
│   │   ├── booking/                 # Tunnel réservation
│   │   │   ├── BookingStepper.tsx
│   │   │   ├── OptionsStep.tsx
│   │   │   ├── TravelersStep.tsx
│   │   │   ├── TravelerForm.tsx
│   │   │   ├── RecapStep.tsx
│   │   │   ├── PaymentStep.tsx
│   │   │   ├── PaymentMethodCard.tsx
│   │   │   ├── ConfirmationStep.tsx
│   │   │   ├── PromoCodeInput.tsx
│   │   │   └── PriceBreakdown.tsx
│   │   │
│   │   ├── account/                 # Espace client
│   │   │   ├── AccountDashboard.tsx
│   │   │   ├── BookingsList.tsx
│   │   │   ├── BookingDetails.tsx
│   │   │   ├── FavoritesList.tsx
│   │   │   ├── TravelersManager.tsx
│   │   │   ├── ProfileForm.tsx
│   │   │   ├── NotificationsList.tsx
│   │   │   └── SettingsForm.tsx
│   │   │
│   │   ├── admin/                   # Back-office
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── StatsCards.tsx
│   │   │   ├── BookingsTable.tsx
│   │   │   ├── BookingActions.tsx
│   │   │   ├── OffersTable.tsx
│   │   │   ├── OfferForm.tsx
│   │   │   ├── OfferImagesUploader.tsx
│   │   │   ├── ItineraryEditor.tsx
│   │   │   ├── CustomersTable.tsx
│   │   │   ├── CustomerDetails.tsx
│   │   │   ├── PromoCodeForm.tsx
│   │   │   ├── PageEditor.tsx
│   │   │   ├── ArticleEditor.tsx
│   │   │   └── AuditLogTable.tsx
│   │   │
│   │   ├── auth/                    # Authentification
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── ForgotPasswordForm.tsx
│   │   │   ├── SocialButtons.tsx
│   │   │   └── EmailVerificationBanner.tsx
│   │   │
│   │   └── shared/                  # Composants partagés
│   │       ├── PriceDisplay.tsx
│   │       ├── DateDisplay.tsx
│   │       ├── ImageGallery.tsx
│   │       ├── Lightbox.tsx
│   │       ├── EmptyState.tsx
│   │       ├── ErrorState.tsx
│   │       ├── LoadingSpinner.tsx
│   │       ├── Skeleton.tsx
│   │       ├── Pagination.tsx
│   │       ├── Breadcrumbs.tsx
│   │       ├── ShareButtons.tsx
│   │       ├── WhatsAppButton.tsx
│   │       ├── TrustBadges.tsx
│   │       ├── StarRating.tsx
│   │       └── ConfirmDialog.tsx
│   │
│   ├── lib/                         # Logique métier et utilitaires
│   │   ├── firebase/
│   │   │   ├── config.ts            # Initialisation Firebase
│   │   │   ├── auth.ts              # Auth helpers
│   │   │   ├── firestore.ts         # Firestore helpers
│   │   │   ├── storage.ts           # Storage helpers
│   │   │   └── admin.ts             # Firebase Admin SDK (server)
│   │   │
│   │   ├── api/                     # Appels API
│   │   │   ├── offers.ts
│   │   │   ├── bookings.ts
│   │   │   ├── users.ts
│   │   │   ├── reviews.ts
│   │   │   ├── payments.ts          # Calls vers mini-backend SATIM
│   │   │   └── search.ts
│   │   │
│   │   ├── validators/              # Schémas Zod
│   │   │   ├── auth.schema.ts
│   │   │   ├── booking.schema.ts
│   │   │   ├── traveler.schema.ts
│   │   │   ├── offer.schema.ts
│   │   │   └── user.schema.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── formatPrice.ts
│   │   │   ├── formatDate.ts
│   │   │   ├── slugify.ts
│   │   │   ├── classnames.ts        # cn() helper
│   │   │   ├── calculatePrice.ts
│   │   │   ├── generateReference.ts
│   │   │   └── validators.ts
│   │   │
│   │   ├── constants/
│   │   │   ├── routes.ts
│   │   │   ├── countries.ts         # Liste pays
│   │   │   ├── wilayas.ts           # 58 wilayas algériennes
│   │   │   ├── airlines.ts
│   │   │   ├── currencies.ts
│   │   │   └── config.ts
│   │   │
│   │   └── seo/
│   │       ├── metadata.ts          # Helpers SEO
│   │       ├── schema.ts            # Schema.org JSON-LD
│   │       └── sitemap.ts
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useUser.ts
│   │   ├── useOffers.ts
│   │   ├── useBooking.ts
│   │   ├── useFavorites.ts
│   │   ├── useSearch.ts
│   │   ├── useDebounce.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useInfiniteScroll.ts
│   │   └── useToast.ts
│   │
│   ├── store/                       # Zustand stores
│   │   ├── authStore.ts
│   │   ├── bookingStore.ts          # State du tunnel
│   │   ├── searchStore.ts
│   │   ├── cartStore.ts
│   │   ├── favoritesStore.ts
│   │   └── uiStore.ts               # UI globale (modals, etc.)
│   │
│   ├── types/                       # Types TypeScript
│   │   ├── user.types.ts
│   │   ├── offer.types.ts
│   │   ├── booking.types.ts
│   │   ├── payment.types.ts
│   │   ├── review.types.ts
│   │   └── common.types.ts
│   │
│   ├── styles/                      # Styles
│   │   ├── globals.css
│   │   └── theme.css
│   │
│   ├── public/                      # Assets statiques
│   │   ├── images/
│   │   │   ├── logo.svg
│   │   │   ├── logo-white.svg
│   │   │   └── placeholders/
│   │   ├── fonts/
│   │   ├── favicon.ico
│   │   ├── robots.txt
│   │   └── manifest.json
│   │
│   ├── messages/                    # Traductions i18n
│   │   ├── fr.json
│   │   └── ar.json
│   │
│   ├── middleware.ts                # Next.js middleware
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── package.json
│   ├── .env.local.example
│   ├── .eslintrc.json
│   ├── .prettierrc
│   └── README.md
│
├── backend-satim/                   # Mini-backend SATIM
│   ├── src/
│   │   ├── routes/
│   │   │   ├── payments.ts          # Init paiement, callback
│   │   │   ├── invoices.ts          # Génération factures
│   │   │   ├── webhooks.ts
│   │   │   └── health.ts
│   │   ├── services/
│   │   │   ├── satim.service.ts     # Intégration SATIM
│   │   │   ├── invoice.service.ts   # Génération PDF
│   │   │   ├── email.service.ts     # Brevo
│   │   │   ├── sms.service.ts
│   │   │   ├── whatsapp.service.ts
│   │   │   └── firebase.service.ts  # Admin SDK
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── error.middleware.ts
│   │   │   ├── rateLimit.middleware.ts
│   │   │   └── logger.middleware.ts
│   │   ├── utils/
│   │   │   ├── encryption.ts
│   │   │   ├── pdf.ts
│   │   │   └── logger.ts
│   │   ├── config/
│   │   │   ├── env.ts
│   │   │   └── constants.ts
│   │   ├── types/
│   │   └── server.ts                # Point d'entrée
│   ├── tests/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── README.md
│
├── functions/                       # Cloud Functions Firebase
│   ├── src/
│   │   ├── triggers/
│   │   │   ├── onBookingCreate.ts
│   │   │   ├── onPaymentSuccess.ts
│   │   │   ├── onOfferUpdate.ts
│   │   │   └── onUserCreate.ts
│   │   ├── callable/
│   │   │   ├── createBooking.ts
│   │   │   ├── cancelBooking.ts
│   │   │   ├── applyPromoCode.ts
│   │   │   ├── searchOffers.ts
│   │   │   └── sendNotification.ts
│   │   ├── scheduled/
│   │   │   ├── dailyReports.ts
│   │   │   ├── cleanupExpiredHolds.ts
│   │   │   └── travelReminders.ts
│   │   ├── http/
│   │   │   ├── sitemap.ts
│   │   │   └── healthCheck.ts
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
│
├── firestore.rules                  # Règles de sécurité
├── firestore.indexes.json           # Index composites
├── storage.rules                    # Règles Storage
├── firebase.json                    # Config Firebase
├── .firebaserc                      # Projet Firebase
│
├── docs/                            # Documentation
├── scripts/                         # Scripts utilitaires
│   ├── seed-data.ts                 # Données de démo
│   ├── deploy-staging.sh
│   └── deploy-prod.sh
│
├── .github/                         # GitHub Actions
│   └── workflows/
│       ├── test.yml
│       ├── deploy-staging.yml
│       └── deploy-prod.yml
│
├── .gitignore
├── README.md
└── package.json                     # Root pour scripts
```

## Dépendances principales

### Frontend `package.json`

```json
{
  "name": "voyages-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:e2e": "playwright test",
    "format": "prettier --write ."
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.4.0",
    
    "firebase": "^10.12.0",
    "firebase-admin": "^12.1.0",
    
    "tailwindcss": "^3.4.0",
    "tailwindcss-animate": "^1.0.7",
    "@tailwindcss/typography": "^0.5.0",
    
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-radio-group": "^1.1.3",
    "@radix-ui/react-slider": "^1.1.2",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-tooltip": "^1.0.7",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-label": "^2.0.2",
    
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0",
    
    "lucide-react": "^0.378.0",
    
    "framer-motion": "^11.2.0",
    
    "react-hook-form": "^7.51.0",
    "@hookform/resolvers": "^3.3.4",
    "zod": "^3.23.0",
    
    "zustand": "^4.5.0",
    "@tanstack/react-query": "^5.40.0",
    
    "date-fns": "^3.6.0",
    "react-day-picker": "^8.10.0",
    
    "sonner": "^1.4.0",
    
    "next-intl": "^3.15.0",
    
    "embla-carousel-react": "^8.0.0",
    
    "next-themes": "^0.3.0",
    
    "@vercel/analytics": "^1.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0",
    "@typescript-eslint/eslint-plugin": "^7.10.0",
    "@typescript-eslint/parser": "^7.10.0",
    
    "prettier": "^3.2.0",
    "prettier-plugin-tailwindcss": "^0.5.0",
    
    "vitest": "^1.6.0",
    "@testing-library/react": "^15.0.0",
    "@testing-library/jest-dom": "^6.4.0",
    "@playwright/test": "^1.44.0",
    
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

### Backend SATIM `package.json`

```json
{
  "name": "voyages-backend-satim",
  "version": "1.0.0",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "vitest"
  },
  "dependencies": {
    "express": "^4.19.0",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.2.0",
    "compression": "^1.7.4",
    "morgan": "^1.10.0",
    "winston": "^3.13.0",
    
    "firebase-admin": "^12.1.0",
    
    "zod": "^3.23.0",
    
    "pdfkit": "^0.15.0",
    "qrcode": "^1.5.3",
    
    "nodemailer": "^6.9.0",
    "@getbrevo/brevo": "^2.0.0",
    
    "axios": "^1.7.0",
    "crypto-js": "^4.2.0",
    
    "dotenv": "^16.4.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.0",
    "@types/cors": "^2.8.0",
    "@types/node": "^20.12.0",
    "@types/pdfkit": "^0.13.0",
    "typescript": "^5.4.0",
    "tsx": "^4.10.0",
    "vitest": "^1.6.0"
  }
}
```

### Cloud Functions `package.json`

```json
{
  "name": "voyages-functions",
  "engines": { "node": "20" },
  "main": "lib/index.js",
  "dependencies": {
    "firebase-admin": "^12.1.0",
    "firebase-functions": "^5.0.0",
    "zod": "^3.23.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^20.12.0"
  }
}
```

## Variables d'environnement

### Frontend `.env.local`

```bash
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Backend SATIM
NEXT_PUBLIC_API_URL=http://localhost:4000
API_SECRET_KEY=

# Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Site
NEXT_PUBLIC_SITE_URL=https://voyages.dz
NEXT_PUBLIC_WHATSAPP_NUMBER=+213...

# Images
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=
```

### Backend SATIM `.env`

```bash
# Server
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Firebase Admin
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# SATIM
SATIM_MERCHANT_ID=
SATIM_PASSWORD=
SATIM_TEST_MODE=true
SATIM_API_URL=https://test.satim.dz/payment/rest

# Brevo
BREVO_API_KEY=
BREVO_SENDER_EMAIL=noreply@voyages.dz
BREVO_SENDER_NAME=Voyages

# WhatsApp Business
WHATSAPP_PHONE_ID=
WHATSAPP_TOKEN=

# Security
JWT_SECRET=
ENCRYPTION_KEY=
```

## Configuration Tailwind

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        primary: {
          50: '#F0F7FF', 100: '#E0EFFF', 200: '#BAD9FF',
          300: '#7CB8FF', 400: '#3593FB', 500: '#0F4C81',
          600: '#0D3F6B', 700: '#0A3155', 800: '#082640', 900: '#051A2B',
          DEFAULT: '#0F4C81',
        },
        accent: {
          50: '#FFF5F5', 100: '#FFE8E8', 200: '#FFC7C7',
          300: '#FFA0A0', 400: '#FF7B7B', 500: '#FF6B6B',
          600: '#E55555', 700: '#B83F3F', 800: '#8C2C2C', 900: '#5F1E1E',
          DEFAULT: '#FF6B6B',
        },
        neutral: {
          50: '#FAFAF7', 100: '#F5F4EF', 200: '#E8E6DD',
          300: '#D4D1C4', 400: '#A8A498', 500: '#76736A',
          600: '#524F47', 700: '#3A3833', 800: '#25241F', 900: '#1A1916',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Monaco', 'monospace'],
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.25rem',
      },
      boxShadow: {
        'card-hover': '0 12px 24px rgba(15, 76, 129, 0.15)',
        'card-focus': '0 0 0 3px rgba(15, 76, 129, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'shimmer': 'shimmer 1.5s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
};

export default config;
```
