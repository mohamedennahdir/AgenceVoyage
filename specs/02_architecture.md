# 🏗️ Architecture technique

## Vue d'ensemble

Architecture hybride : Firebase pour le cœur de la plateforme + mini-backend Node.js pour SATIM et facturation.

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENTS (Web Browser)                   │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTPS
                ┌───────────┴───────────┐
                │                       │
┌───────────────▼─────────┐   ┌────────▼──────────────┐
│   Firebase Hosting      │   │  Mini Backend Node    │
│   (CDN mondial)         │   │  (VPS Hetzner)        │
│                         │   │                       │
│  - Next.js SSR/SSG      │   │  - SATIM integration  │
│  - Static assets        │   │  - Invoice generation │
└───────────┬─────────────┘   │  - WhatsApp API       │
            │                 │  - Future GDS         │
            │                 └─────────┬─────────────┘
            │                           │
            └───────────┬───────────────┘
                        │
        ┌───────────────▼───────────────────┐
        │      FIREBASE BACKEND             │
        │                                   │
        │  ┌─────────────────────────────┐  │
        │  │  Firestore (NoSQL DB)       │  │
        │  │  - users, offers, bookings  │  │
        │  └─────────────────────────────┘  │
        │                                   │
        │  ┌─────────────────────────────┐  │
        │  │  Firebase Auth              │  │
        │  │  - Email, Google, FB        │  │
        │  └─────────────────────────────┘  │
        │                                   │
        │  ┌─────────────────────────────┐  │
        │  │  Cloud Storage              │  │
        │  │  - Photos, PDFs             │  │
        │  └─────────────────────────────┘  │
        │                                   │
        │  ┌─────────────────────────────┐  │
        │  │  Cloud Functions            │  │
        │  │  - Business logic           │  │
        │  │  - Triggers                 │  │
        │  └─────────────────────────────┘  │
        │                                   │
        │  ┌─────────────────────────────┐  │
        │  │  Firebase Cloud Messaging   │  │
        │  │  - Push notifications       │  │
        │  └─────────────────────────────┘  │
        └───────────────────────────────────┘
                        │
            ┌───────────┴────────────┐
            │                        │
    ┌───────▼──────┐         ┌──────▼─────────┐
    │   SATIM      │         │  Services      │
    │  CIB/Edahabia│         │  - Brevo email │
    └──────────────┘         │  - SMS Algérie │
                             │  - WhatsApp    │
                             │  - Google Maps │
                             └────────────────┘
```

## Stack technologique complet

### Frontend (Next.js)

| Couche | Technologie | Version | Rôle |
|--------|-------------|---------|------|
| Framework | Next.js | 14+ | SSR/SSG, App Router |
| UI Library | React | 18+ | Composants |
| Language | TypeScript | 5+ | Type safety |
| Styling | Tailwind CSS | 3.4+ | Utility-first CSS |
| Components | shadcn/ui | latest | UI primitives |
| Icons | Lucide React | latest | Icônes |
| Animations | Framer Motion | 11+ | Animations |
| Forms | React Hook Form | 7+ | Gestion formulaires |
| Validation | Zod | 3+ | Schémas validation |
| State | Zustand | 4+ | State management |
| Data fetching | TanStack Query | 5+ | Cache/sync data |
| Date | date-fns | 3+ | Manipulation dates |
| Toast | Sonner | latest | Notifications |
| Images | next/image | - | Optimisation |
| i18n | next-intl | 3+ | Internationalisation |

### Backend Firebase

| Service | Usage |
|---------|-------|
| Firestore | Base de données principale (NoSQL) |
| Authentication | Gestion comptes utilisateurs |
| Cloud Storage | Images et documents |
| Cloud Functions | Logique métier serveur |
| Hosting | Déploiement frontend |
| FCM | Notifications push |
| Analytics | Tracking utilisateurs |
| Performance | Monitoring |

### Mini backend Node.js

| Couche | Technologie |
|--------|-------------|
| Runtime | Node.js 20 LTS |
| Framework | Express.js ou Fastify |
| Language | TypeScript |
| Validation | Zod |
| PDF | PDFKit ou Puppeteer |
| Logger | Winston |
| Process manager | PM2 |
| Reverse proxy | Nginx |
| SSL | Let's Encrypt |

## Flux de données

### Recherche d'offres
```
User ─► Next.js (search page)
         │
         ├─► Firestore query (offers collection)
         │   - filters: type, destination, dates
         │   - sort: price/popularity
         │
         └─► Returns paginated results
             ├─► Cached via TanStack Query
             └─► Rendered with SSR for first page
```

### Création d'une réservation
```
User ─► Next.js (booking flow)
         │
         ├─► Validate locally (Zod)
         │
         ├─► Cloud Function: createBooking
         │   ├─► Validate offer availability
         │   ├─► Calculate price
         │   ├─► Create booking doc (status: pending)
         │   └─► Return booking ID
         │
         ├─► User selects payment method
         │
         ├─► If SATIM:
         │   ├─► Mini Backend: initSatimPayment
         │   ├─► Redirect to SATIM
         │   ├─► User pays
         │   ├─► SATIM callback to Mini Backend
         │   ├─► Mini Backend updates booking via Firestore
         │   └─► User redirected to confirmation
         │
         └─► If agence:
             └─► Booking status: awaiting_payment
                 + Email + SMS sent
```

### Authentication flow
```
User ─► Login form
         │
         ├─► Firebase Auth (signInWithEmail / Google)
         │
         ├─► Returns ID token
         │
         ├─► Token attached to all Firestore requests
         │
         └─► Firestore rules verify access:
             - Users can only read/write own data
             - Admins can access all (custom claim)
```

## Sécurité

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helpers
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    function isAdmin() {
      return request.auth.token.role == 'admin';
    }
    
    function isAgent() {
      return request.auth.token.role in ['admin', 'agent'];
    }
    
    // Users : utilisateur lit/écrit ses propres données
    match /users/{userId} {
      allow read: if isOwner(userId) || isAgent();
      allow create: if isOwner(userId);
      allow update: if isOwner(userId) || isAdmin();
      allow delete: if isAdmin();
    }
    
    // Offers : lecture publique des offres publiées
    match /offers/{offerId} {
      allow read: if resource.data.status == 'published' || isAgent();
      allow write: if isAgent();
    }
    
    // Bookings : propriétaire + agents
    match /bookings/{bookingId} {
      allow read: if isOwner(resource.data.userId) || isAgent();
      allow create: if isSignedIn();
      allow update: if isAgent();
      allow delete: if isAdmin();
    }
    
    // Reviews : public en lecture, owner en écriture
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if isSignedIn();
      allow update, delete: if isOwner(resource.data.userId) || isAdmin();
    }
    
    // Settings : admin uniquement
    match /settings/{document=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

### Storage Security Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Photos publiques (offres)
    match /offers/{offerId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth.token.role in ['admin', 'agent'];
    }
    
    // Documents utilisateurs (factures, vouchers)
    match /users/{userId}/{allPaths=**} {
      allow read: if request.auth.uid == userId 
                  || request.auth.token.role in ['admin', 'agent'];
      allow write: if request.auth.token.role in ['admin', 'agent'];
    }
    
    // Avatars
    match /avatars/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth.uid == userId;
    }
  }
}
```

## Performance

### Optimisations frontend
- **Server Components** par défaut (Next.js App Router)
- **Streaming SSR** avec Suspense
- **Image optimization** via next/image (WebP, lazy, responsive)
- **Code splitting** automatique par route
- **Prefetching** intelligent des liens
- **Cache** avec TanStack Query (stale-while-revalidate)

### Optimisations Firestore
- **Indexes composites** pour les requêtes complexes
- **Pagination** avec cursor (limit + startAfter)
- **Denormalization** stratégique pour éviter les jointures
- **Offline persistence** activée
- **Bundle queries** côté serveur pour SSR

### CDN
- Firebase Hosting inclut Cloudflare-like CDN
- Cache statique : 1 an pour assets
- Cache HTML : revalidation à chaque requête
- Stale-while-revalidate pour les pages dynamiques

## Monitoring

### Outils
- **Firebase Performance** : Core Web Vitals
- **Firebase Analytics** : comportement utilisateur
- **Sentry** : tracking d'erreurs
- **UptimeRobot** : disponibilité (gratuit)
- **Google Search Console** : SEO

### KPIs à suivre
- Taux de conversion (visiteur → réservation)
- Temps de chargement P75 et P95
- Taux d'erreur 4xx et 5xx
- Taux d'abandon du tunnel de réservation
- Performance des Cloud Functions

## Environnements

### Local (développement)
- Firebase Emulator Suite
- Next.js dev server (localhost:3000)
- Mini backend local (localhost:4000)

### Staging
- Firebase preview channel
- Sous-domaine : staging.voyages.dz
- Base Firestore séparée
- SATIM test environment

### Production
- voyages.dz (domaine principal)
- Firestore production
- SATIM live
- Sauvegardes automatiques quotidiennes

## Plan de scalabilité

### Phase 1 (0-1000 visiteurs/jour)
- Tout sur Firebase plan Spark (gratuit)
- Mini backend sur VPS €10/mois
- Coût total : < €15/mois

### Phase 2 (1000-10000 visiteurs/jour)
- Migration Firebase plan Blaze (pay-as-you-go)
- Optimisation requêtes Firestore
- Ajout cache Redis sur mini backend
- Coût estimé : €50-150/mois

### Phase 3 (10000+ visiteurs/jour)
- Considérer migration partielle vers Cloud Run
- Base données dédiée (PostgreSQL sur Cloud SQL)
- CDN dédié (Cloudflare Pro)
- Coût estimé : €300-800/mois

## Backup et disaster recovery

### Backups
- **Firestore** : export quotidien automatisé vers Cloud Storage
- **Storage** : versioning activé
- **Mini backend** : snapshot quotidien VPS
- **Rétention** : 30 jours rolling

### Disaster recovery
- RTO (Recovery Time Objective) : 4 heures
- RPO (Recovery Point Objective) : 24 heures
- Procédure de restoration documentée
- Test de restoration trimestriel
