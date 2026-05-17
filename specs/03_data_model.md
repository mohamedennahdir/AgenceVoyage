# 🗄️ Modèle de données Firestore

## Vue d'ensemble des collections

```
firestore/
├── users/                    # Utilisateurs (clients + agents)
├── offers/                   # Offres de voyage
├── bookings/                 # Réservations
├── travelers/                # Voyageurs (carnet famille)
├── reviews/                  # Avis clients
├── destinations/             # Destinations (CMS)
├── articles/                 # Blog
├── promoCodes/               # Codes promo
├── pages/                    # Pages éditoriales
├── settings/                 # Configuration globale
├── auditLogs/                # Journal d'audit
└── notifications/            # Notifications utilisateurs
```

## Collection : `users`

```typescript
// Document ID = Firebase Auth UID
interface User {
  id: string;
  
  // Identité
  email: string;
  firstName: string;
  lastName: string;
  phone: string;              // Format international +213...
  avatar?: string;            // URL Cloud Storage
  
  // Informations
  birthDate?: Timestamp;
  gender?: 'M' | 'F';
  nationality?: string;       // Code ISO (DZ, FR...)
  
  // Adresse (optionnelle)
  address?: {
    street: string;
    city: string;
    wilaya: string;          // Wilaya algérienne
    postalCode: string;
    country: string;
  };
  
  // Préférences
  preferences: {
    language: 'fr' | 'ar';
    currency: 'DZD' | 'EUR' | 'USD';
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
      whatsapp: boolean;
    };
    newsletter: boolean;
  };
  
  // Rôle et statut
  role: 'customer' | 'agent' | 'admin';
  status: 'active' | 'suspended' | 'deleted';
  emailVerified: boolean;
  phoneVerified: boolean;
  
  // Stats (denormalized pour perf)
  stats: {
    totalBookings: number;
    totalSpent: number;       // En DZD
    lastBookingDate?: Timestamp;
    memberSince: Timestamp;
  };
  
  // Métadonnées
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLoginAt?: Timestamp;
  
  // Marketing
  source?: string;            // utm_source du premier visit
  tags?: string[];            // 'vip', 'omra2024', etc.
}
```

## Collection : `offers`

```typescript
interface Offer {
  id: string;
  
  // Identification
  slug: string;               // URL friendly
  title: string;
  subtitle?: string;
  type: 'flight' | 'hotel' | 'package' | 'circuit' | 'omra' | 'hajj';
  
  // Destinations
  destinations: string[];     // ['turkey', 'istanbul']
  departure: {
    city: string;
    airport?: string;         // Code IATA
    country: string;
  };
  arrival: {
    city: string;
    airport?: string;
    country: string;
  };
  
  // Contenu marketing
  description: string;        // Markdown
  shortDescription: string;   // < 200 chars
  highlights: string[];       // Points forts
  inclusions: string[];       // Ce qui est inclus
  exclusions: string[];       // Non inclus
  conditions: string;         // Conditions particulières
  
  // Programme (pour circuits/Omra)
  itinerary?: {
    day: number;
    title: string;
    description: string;
    meals?: ('breakfast' | 'lunch' | 'dinner')[];
    accommodation?: string;
  }[];
  
  // Détails voyage
  duration: {
    days: number;
    nights: number;
  };
  
  // Hôtel (si applicable)
  hotels?: {
    name: string;
    stars: number;
    city: string;
    description?: string;
    images?: string[];
  }[];
  
  // Vol (si applicable)
  flights?: {
    airline: string;
    flightNumber?: string;
    departure: string;        // ISO date
    arrival: string;
    duration: number;         // minutes
    stops: number;
  }[];
  
  // Médias
  images: string[];           // URLs Cloud Storage
  mainImage: string;
  videoUrl?: string;
  
  // Prix
  pricing: {
    basePrice: number;        // Prix adulte en DZD
    childPrice?: number;      // 2-11 ans
    infantPrice?: number;     // 0-2 ans
    currency: 'DZD';
    
    // Pour calculs avancés
    pricePerPerson: boolean;
    minPax?: number;
    maxPax?: number;
  };
  
  // Promotions
  promotion?: {
    active: boolean;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    originalPrice: number;
    label?: string;           // "Black Friday"
    endsAt?: Timestamp;
  };
  
  // Disponibilités
  availability: {
    type: 'fixed_dates' | 'flexible' | 'on_demand';
    dates?: {
      startDate: Timestamp;
      endDate: Timestamp;
      pricePerPerson: number;
      seatsTotal: number;
      seatsAvailable: number;
      status: 'available' | 'few_left' | 'sold_out';
    }[];
  };
  
  // Suppléments optionnels
  supplements?: {
    id: string;
    name: string;
    description?: string;
    price: number;
    type: 'per_person' | 'per_booking';
    mandatory?: boolean;
  }[];
  
  // Tags et SEO
  tags: string[];             // Pour filtres
  features: string[];         // 'wifi', 'all_inclusive', etc.
  
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  
  // Stats (denormalized)
  stats: {
    views: number;
    bookings: number;
    avgRating?: number;
    reviewCount: number;
  };
  
  // Statut et flags
  status: 'draft' | 'published' | 'archived' | 'sold_out';
  featured: boolean;          // Mise en avant home
  popular: boolean;
  trending: boolean;
  
  // Catégorisation
  category?: string;
  themes: string[];           // 'family', 'romantic', 'adventure'
  
  // Métadonnées
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt?: Timestamp;
  createdBy: string;          // userId admin
}
```

## Collection : `bookings`

```typescript
interface Booking {
  id: string;
  
  // Référence
  reference: string;          // Format: BK-2026-00001
  
  // Lien utilisateur
  userId: string;
  userEmail: string;          // Denormalized pour search
  userName: string;
  userPhone: string;
  
  // Offre réservée (snapshot au moment de la réservation)
  offerId: string;
  offerSnapshot: {
    title: string;
    type: string;
    mainImage: string;
    duration: { days: number; nights: number };
    destinations: string[];
  };
  
  // Dates voyage
  travelDates: {
    departure: Timestamp;
    return: Timestamp;
  };
  
  // Voyageurs
  travelers: {
    type: 'adult' | 'child' | 'infant';
    firstName: string;
    lastName: string;
    birthDate: Timestamp;
    gender: 'M' | 'F';
    nationality: string;
    passport?: {
      number: string;
      issueDate?: Timestamp;
      expiryDate: Timestamp;
      issueCountry: string;
    };
    specialNeeds?: string;
  }[];
  
  // Contact principal
  primaryContact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  
  // Suppléments choisis
  supplements?: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  
  // Pricing
  pricing: {
    basePrice: number;
    adultPrice: number;
    childPrice: number;
    infantPrice: number;
    supplementsTotal: number;
    
    subtotal: number;
    discount: number;
    promoCode?: string;
    
    taxAmount: number;        // Si TVA applicable
    taxRate: number;
    
    totalAmount: number;
    currency: 'DZD';
    
    paidAmount: number;
    remainingAmount: number;
  };
  
  // Paiement
  payment: {
    method: 'cib' | 'edahabia' | 'agency' | 'bank_transfer';
    status: 'pending' | 'awaiting' | 'partial' | 'paid' | 'refunded' | 'failed';
    transactions: {
      id: string;
      method: string;
      amount: number;
      status: 'pending' | 'success' | 'failed' | 'refunded';
      satimRef?: string;
      processedAt?: Timestamp;
      processedBy?: string;
      notes?: string;
    }[];
  };
  
  // Documents
  documents: {
    type: 'invoice' | 'voucher' | 'ticket' | 'visa' | 'insurance';
    name: string;
    url: string;
    uploadedAt: Timestamp;
  }[];
  
  // Statut booking
  status: 'draft' | 'pending' | 'confirmed' | 'paid' | 'in_progress' | 'completed' | 'cancelled' | 'refunded';
  
  // Historique
  history: {
    timestamp: Timestamp;
    action: string;
    userId?: string;
    userName?: string;
    details?: string;
  }[];
  
  // Notes
  customerNotes?: string;     // Notes du client
  internalNotes?: string;     // Notes agents
  
  // Annulation
  cancellation?: {
    requestedAt: Timestamp;
    requestedBy: string;
    reason: string;
    refundAmount?: number;
    refundedAt?: Timestamp;
    notes?: string;
  };
  
  // Métadonnées
  createdAt: Timestamp;
  updatedAt: Timestamp;
  confirmedAt?: Timestamp;
  completedAt?: Timestamp;
  
  // Agent assigné (si paiement agence)
  assignedAgentId?: string;
  assignedAgentName?: string;
  
  // CGV
  termsAcceptedAt: Timestamp;
  termsVersion: string;
}
```

## Collection : `travelers`

Carnet d'adresses des voyageurs fréquents du client.

```typescript
interface Traveler {
  id: string;
  userId: string;             // Propriétaire du carnet
  
  firstName: string;
  lastName: string;
  birthDate: Timestamp;
  gender: 'M' | 'F';
  nationality: string;
  
  relationship?: 'self' | 'spouse' | 'child' | 'parent' | 'sibling' | 'other';
  
  passport?: {
    number: string;
    issueDate?: Timestamp;
    expiryDate: Timestamp;
    issueCountry: string;
  };
  
  specialNeeds?: string;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## Collection : `reviews`

```typescript
interface Review {
  id: string;
  
  userId: string;
  userName: string;           // Affichage
  userAvatar?: string;
  
  offerId: string;
  offerTitle: string;
  bookingId: string;          // Pour vérification "verified buyer"
  
  rating: number;             // 1-5
  title?: string;
  comment: string;
  
  // Notes détaillées
  ratings?: {
    accommodation?: number;
    transport?: number;
    program?: number;
    valueForMoney?: number;
    organization?: number;
  };
  
  // Modération
  status: 'pending' | 'published' | 'rejected';
  moderatedBy?: string;
  moderatedAt?: Timestamp;
  
  helpful: number;            // Compteur "utile"
  
  // Réponse agence
  response?: {
    text: string;
    respondedAt: Timestamp;
    respondedBy: string;
  };
  
  travelDate: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## Collection : `destinations`

```typescript
interface Destination {
  id: string;
  slug: string;
  
  name: string;               // "Istanbul"
  country: string;            // "Turquie"
  countryCode: string;        // "TR"
  region: string;             // "Europe"
  
  description: string;        // Markdown
  shortDescription: string;
  
  images: string[];
  mainImage: string;
  
  // Infos utiles
  bestTime?: string;
  currency?: string;
  language?: string;
  visa?: {
    required: boolean;
    notes?: string;
  };
  
  // SEO
  seo: {
    metaTitle?: string;
    metaDescription?: string;
  };
  
  // Stats
  offerCount: number;
  popularity: number;
  
  featured: boolean;
  status: 'active' | 'inactive';
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## Collection : `articles` (Blog)

```typescript
interface Article {
  id: string;
  slug: string;
  
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;            // Markdown
  
  coverImage: string;
  images?: string[];
  
  author: {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
  };
  
  category: string;
  tags: string[];
  
  // Liens
  relatedDestinations?: string[]; // IDs destinations
  relatedOffers?: string[];       // IDs offers
  
  // SEO
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  
  // Stats
  stats: {
    views: number;
    likes: number;
    shares: number;
  };
  
  readTime: number;           // minutes
  
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  
  publishedAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## Collection : `promoCodes`

```typescript
interface PromoCode {
  id: string;
  code: string;               // "OMRA2026" (uppercase)
  
  description?: string;
  
  // Type de réduction
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxDiscount?: number;       // Cap pour percentage
  
  // Conditions
  minPurchase?: number;
  maxUses?: number;
  maxUsesPerUser?: number;
  
  // Applicabilité
  applicableTo: {
    types?: string[];         // ['omra', 'package']
    offerIds?: string[];      // Offres spécifiques
    minTravelers?: number;
    firstTimeOnly?: boolean;
  };
  
  // Validité
  validFrom: Timestamp;
  validUntil: Timestamp;
  
  // Stats
  usageCount: number;
  
  active: boolean;
  
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## Collection : `pages` (CMS)

Pages éditoriales gérables depuis l'admin.

```typescript
interface Page {
  id: string;
  slug: string;               // 'a-propos', 'cgv', 'mentions-legales'
  
  title: string;
  content: string;            // Markdown
  
  seo: {
    metaTitle?: string;
    metaDescription?: string;
  };
  
  status: 'draft' | 'published';
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
  updatedBy: string;
}
```

## Collection : `settings`

Configuration globale (singleton documents).

```typescript
// Document: /settings/general
interface GeneralSettings {
  companyName: string;
  legalName: string;
  
  // Coordonnées
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
  };
  
  // Réseaux sociaux
  social: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
  };
  
  // Légal
  legal: {
    nif: string;
    nis: string;
    rc: string;
    license: string;          // Licence agence voyages
    omraLicense?: string;
  };
  
  // Configuration
  defaultCurrency: 'DZD';
  defaultLanguage: 'fr';
  supportedLanguages: ('fr' | 'ar')[];
  
  // Maintenance
  maintenance: {
    enabled: boolean;
    message?: string;
  };
}

// Document: /settings/payment
interface PaymentSettings {
  satim: {
    enabled: boolean;
    testMode: boolean;
    merchantId?: string;      // Stocké sécurisé
  };
  agencyPayment: {
    enabled: boolean;
    deadline: number;         // Heures pour payer
  };
  bankTransfer: {
    enabled: boolean;
    rib?: string;
  };
}

// Document: /settings/homepage
interface HomepageSettings {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    cta: {
      text: string;
      link: string;
    };
  };
  
  featuredOffers: string[];   // IDs
  featuredDestinations: string[];
  
  sections: {
    id: string;
    type: 'offers' | 'destinations' | 'banner' | 'testimonials';
    title?: string;
    enabled: boolean;
    config: Record<string, any>;
  }[];
}
```

## Collection : `auditLogs`

Journal d'audit pour les actions sensibles.

```typescript
interface AuditLog {
  id: string;
  
  timestamp: Timestamp;
  
  // Acteur
  userId: string;
  userName: string;
  userRole: string;
  ipAddress?: string;
  
  // Action
  action: string;             // 'booking.cancel', 'offer.update'
  entity: string;             // 'booking', 'offer', 'user'
  entityId: string;
  
  // Détails
  changes?: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  
  reason?: string;
  metadata?: Record<string, any>;
}
```

## Collection : `notifications`

```typescript
interface Notification {
  id: string;
  userId: string;
  
  type: 'booking_confirmed' | 'payment_received' | 'travel_reminder' | 'promo' | 'system';
  
  title: string;
  message: string;
  icon?: string;
  
  // Action
  actionUrl?: string;
  actionLabel?: string;
  
  // Lien
  relatedEntity?: {
    type: 'booking' | 'offer';
    id: string;
  };
  
  // Statut
  read: boolean;
  readAt?: Timestamp;
  
  // Canaux envoyés
  channels: {
    inApp: boolean;
    email: { sent: boolean; sentAt?: Timestamp };
    sms: { sent: boolean; sentAt?: Timestamp };
    push: { sent: boolean; sentAt?: Timestamp };
  };
  
  createdAt: Timestamp;
  expiresAt?: Timestamp;
}
```

## Index Firestore recommandés

```javascript
// Offers
- offers: status (asc) + featured (desc) + createdAt (desc)
- offers: type (asc) + status (asc) + pricing.basePrice (asc)
- offers: destinations (array) + status (asc) + popularity (desc)
- offers: status (asc) + trending (desc) + stats.views (desc)

// Bookings
- bookings: userId (asc) + createdAt (desc)
- bookings: status (asc) + createdAt (desc)
- bookings: status (asc) + payment.status (asc) + createdAt (desc)

// Reviews
- reviews: offerId (asc) + status (asc) + createdAt (desc)
- reviews: userId (asc) + createdAt (desc)

// Articles
- articles: status (asc) + publishedAt (desc)
- articles: category (asc) + status (asc) + publishedAt (desc)

// Notifications
- notifications: userId (asc) + read (asc) + createdAt (desc)
```

## Bonnes pratiques

### Denormalization
- Stocker `userName`, `userEmail` dans booking pour éviter jointures
- Stocker `offerSnapshot` dans booking (immutable au moment de la réservation)
- Calculer `stats` côté serveur via Cloud Functions

### Atomicité
- Utiliser `runTransaction` pour : décrémentation des stocks, calculs financiers
- Utiliser `batch writes` pour : créer booking + traveler + notification

### Performance
- Limiter les requêtes : pagination obligatoire (max 20 par page)
- Composite indexes pour filtres + tri
- Subcollections pour données rarement accédées
- Field masks pour ne récupérer que les champs nécessaires
