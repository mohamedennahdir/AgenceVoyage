# 🔌 Spécifications des APIs

Ce document décrit toutes les APIs du projet : Cloud Functions Firebase, mini-backend SATIM, et endpoints Next.js API routes.

## Vue d'ensemble

```
┌─────────────────────────────────────────────┐
│              FRONTEND Next.js               │
└──────────┬──────────────────┬───────────────┘
           │                  │
           │ Direct           │ HTTPS
           ▼                  ▼
┌──────────────────┐   ┌─────────────────────┐
│   Firestore SDK  │   │  Mini Backend       │
│   (client direct)│   │  Node.js (SATIM)    │
└──────────────────┘   └─────────────────────┘
           │
           ▼
┌──────────────────┐
│ Cloud Functions  │
│ (triggers +      │
│  callables)      │
└──────────────────┘
```

## 🔥 Cloud Functions Firebase

### Callable Functions (appelables depuis le client)

#### `createBooking`
Crée une nouvelle réservation avec validation atomique.

**Input :**
```typescript
{
  offerId: string;
  travelDateId: string;
  travelers: Array<{
    type: 'adult' | 'child' | 'infant';
    firstName: string;
    lastName: string;
    birthDate: string; // ISO
    gender: 'M' | 'F';
    nationality: string;
    passport?: {
      number: string;
      expiryDate: string;
      issueCountry: string;
    };
  }>;
  primaryContact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  supplements?: Array<{
    id: string;
    quantity: number;
  }>;
  promoCode?: string;
  paymentMethod: 'cib' | 'edahabia' | 'agency' | 'bank_transfer';
  termsVersion: string;
}
```

**Output :**
```typescript
{
  success: boolean;
  bookingId: string;
  reference: string; // BK-2026-00001
  totalAmount: number;
  paymentUrl?: string; // Pour SATIM
  error?: {
    code: string;
    message: string;
  };
}
```

**Logique :**
1. Vérifier authentification
2. Charger l'offre et valider statut/disponibilité
3. Décrémenter le stock (transaction Firestore)
4. Valider le code promo si présent
5. Calculer le prix total
6. Créer le document booking avec status=pending
7. Si SATIM : appeler le mini-backend pour initier le paiement
8. Retourner les informations

**Sécurité :**
- `request.auth` requis
- Validation Zod stricte de tous les inputs
- Transaction Firestore pour atomicité stock
- Rate limit : 10 créations par utilisateur par heure

---

#### `cancelBooking`
Annule une réservation.

**Input :**
```typescript
{
  bookingId: string;
  reason: string;
}
```

**Output :**
```typescript
{
  success: boolean;
  refundAmount?: number;
  refundProcessing?: boolean;
}
```

**Logique :**
1. Vérifier que l'utilisateur est propriétaire OU agent
2. Charger la réservation
3. Vérifier que l'annulation est possible (selon politique)
4. Calculer le montant de remboursement selon les CGV
5. Mettre à jour le statut → cancelled
6. Réincrémenter le stock
7. Si paiement effectué : lancer le remboursement (manuel pour SATIM)
8. Envoyer email de confirmation

---

#### `applyPromoCode`
Valide un code promo.

**Input :**
```typescript
{
  code: string;
  offerId: string;
  travelersCount: number;
  subtotal: number;
}
```

**Output :**
```typescript
{
  valid: boolean;
  discountAmount?: number;
  discountType?: 'percentage' | 'fixed';
  discountValue?: number;
  error?: string;
}
```

---

#### `searchOffers`
Recherche d'offres avec filtres avancés (alternative à la requête Firestore directe pour les recherches complexes).

**Input :**
```typescript
{
  type?: string;
  destination?: string;
  departureDate?: string;
  returnDate?: string;
  travelers?: { adults: number; children: number; infants: number };
  filters?: {
    priceMin?: number;
    priceMax?: number;
    stars?: number[];
    airlines?: string[];
    stops?: number;
  };
  sort?: 'price_asc' | 'price_desc' | 'duration' | 'popularity';
  page?: number;
  pageSize?: number;
}
```

**Output :**
```typescript
{
  offers: Offer[];
  total: number;
  page: number;
  totalPages: number;
}
```

---

#### `sendContactMessage`
Envoie un message via le formulaire de contact.

**Input :**
```typescript
{
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  recaptchaToken: string;
}
```

**Output :**
```typescript
{
  success: boolean;
  ticketId?: string;
}
```

---

#### `subscribeNewsletter`
Inscription à la newsletter.

**Input :**
```typescript
{
  email: string;
  source?: string;
}
```

---

### Trigger Functions (déclenchées automatiquement)

#### `onUserCreate`
Trigger : `auth.user().onCreate`

Quand un utilisateur est créé via Firebase Auth :
1. Créer le document `users/{uid}` avec valeurs par défaut
2. Envoyer email de bienvenue
3. Logger événement Analytics

---

#### `onBookingCreate`
Trigger : `firestore.document('bookings/{id}').onCreate`

1. Générer la référence (BK-YYYY-NNNNN)
2. Créer le timeline initial
3. Envoyer email de confirmation au client
4. Notifier les agents par email (Slack/WhatsApp en option)
5. Créer une notification in-app
6. Update stats utilisateur

---

#### `onBookingStatusChange`
Trigger : `firestore.document('bookings/{id}').onUpdate`

Si `status` change :
- `confirmed` → email + SMS confirmation
- `paid` → générer facture PDF + email
- `cancelled` → email annulation + traiter remboursement
- `completed` → demander avis client (J+3 après retour)

---

#### `onOfferUpdate`
Trigger : `firestore.document('offers/{id}').onUpdate`

1. Si `status` passe à `published` : générer le sitemap
2. Mettre à jour le cache des destinations populaires
3. Audit log

---

#### `onReviewCreate`
Trigger : `firestore.document('reviews/{id}').onCreate`

1. Modération automatique (filtres de base)
2. Si auto-approuvé : update stats de l'offre
3. Sinon : créer tâche modération admin

---

### Scheduled Functions (Cron)

#### `cleanupExpiredHolds`
Cron : Toutes les 30 minutes

Annule les réservations en `pending` depuis plus de 30 minutes (paiement non effectué).

---

#### `travelReminders`
Cron : Tous les jours à 09h00 Algeria time

Envoie un rappel 7 jours, 3 jours et 1 jour avant un voyage :
- Email avec récap + check-list
- SMS le J-1

---

#### `dailyReports`
Cron : Tous les jours à 08h00

Envoie un email aux admins avec :
- Ventes de la veille
- Réservations en attente d'action
- Anomalies détectées

---

#### `weeklyAnalytics`
Cron : Tous les lundis à 09h00

Rapport hebdomadaire avec graphiques.

---

### HTTP Functions

#### `sitemap.xml`
GET `/sitemap.xml`

Génère dynamiquement le sitemap avec toutes les offres publiées, destinations, articles.

---

#### `health`
GET `/health`

Endpoint de monitoring : retourne `{ status: 'ok', timestamp: ... }`.

---

## 🖥️ Mini Backend Node.js (SATIM)

Base URL : `https://api.voyages.dz` (production) / `http://localhost:4000` (dev)

### Authentification

Toutes les routes (sauf `/health` et webhooks) requièrent un header :
```
Authorization: Bearer <FIREBASE_ID_TOKEN>
```

Le backend vérifie le token via Firebase Admin SDK.

---

### Routes Paiement

#### `POST /api/payments/init`
Initialise un paiement SATIM.

**Body :**
```json
{
  "bookingId": "bk_abc123",
  "amount": 165000,
  "currency": "DZD",
  "method": "cib"
}
```

**Response :**
```json
{
  "success": true,
  "paymentId": "pay_xyz",
  "redirectUrl": "https://test.satim.dz/payment/merchants/...",
  "expiresAt": "2026-05-16T15:30:00Z"
}
```

**Logique :**
1. Valider le token Firebase
2. Vérifier que la réservation existe et appartient au user
3. Appeler l'API SATIM `registerOrder` :
```javascript
POST https://test.satim.dz/payment/rest/register.do
{
  "amount": 16500000,        // En centimes
  "currency": 12,            // DZD = 12
  "orderNumber": "BK-2026-00001",
  "returnUrl": "https://voyages.dz/reservation/.../confirmation",
  "failUrl": "https://voyages.dz/reservation/echec",
  "language": "fr",
  "description": "Réservation Istanbul..."
}
```
4. Stocker la transaction dans Firestore
5. Retourner l'URL de redirection

---

#### `POST /api/payments/satim/callback`
Webhook appelé par SATIM après paiement.

**Body (envoyé par SATIM) :**
```json
{
  "orderId": "...",
  "status": "DEPOSITED",
  "amount": 16500000,
  "orderNumber": "BK-2026-00001"
}
```

**Logique :**
1. Vérifier la signature SATIM
2. Appeler `getOrderStatus` SATIM pour confirmer
3. Mettre à jour la transaction Firestore
4. Si `DEPOSITED` :
   - Update booking → status=paid
   - Trigger Cloud Function pour facture + emails
5. Si erreur :
   - Update booking → payment.status=failed
   - Notifier le client

---

#### `POST /api/payments/refund`
Initie un remboursement (admin only).

**Body :**
```json
{
  "bookingId": "bk_abc",
  "amount": 50000,
  "reason": "Annulation client"
}
```

**Note :** SATIM ne supporte pas le remboursement automatique. Cette route crée une demande à traiter manuellement par la banque + envoie email au comptable.

---

### Routes Factures

#### `GET /api/invoices/:bookingId`
Récupère ou génère la facture PDF.

**Headers :**
```
Authorization: Bearer <token>
```

**Response :** PDF stream ou JSON avec URL Cloud Storage.

**Logique :**
1. Vérifier accès (propriétaire ou agent)
2. Si facture existe en Storage : retourner l'URL
3. Sinon : générer via PDFKit avec :
   - Logo + infos entreprise
   - Numéro NIF, NIS, RC
   - Numéro de facture séquentiel
   - Détails de la réservation
   - Calcul TVA si applicable
   - Total TTC en lettres et chiffres
4. Uploader sur Cloud Storage
5. Stocker l'URL dans le booking
6. Retourner l'URL

---

#### `GET /api/vouchers/:bookingId`
Génère le bon de voyage (voucher).

Format PDF avec :
- Réf réservation + QR code
- Programme du voyage
- Coordonnées d'urgence
- CGV résumées

---

### Routes Communications

#### `POST /api/email/send`
Envoie un email transactionnel (interne).

**Body :**
```json
{
  "to": "client@email.com",
  "template": "booking_confirmation",
  "data": { ... }
}
```

Templates disponibles :
- `welcome` : bienvenue après inscription
- `email_verification` : vérification email
- `password_reset` : réinitialisation
- `booking_confirmation` : confirmation réservation
- `payment_received` : paiement confirmé
- `booking_cancelled` : annulation
- `travel_reminder` : rappel voyage
- `review_request` : demande d'avis
- `contact_response` : réponse au formulaire contact

---

#### `POST /api/sms/send`
Envoie un SMS via fournisseur algérien.

**Body :**
```json
{
  "to": "+213551234567",
  "message": "Votre réservation BK-2026-00001 est confirmée..."
}
```

---

#### `POST /api/whatsapp/send`
Envoie un message WhatsApp Business.

**Body :**
```json
{
  "to": "+213551234567",
  "template": "booking_confirmation",
  "data": { ... }
}
```

---

### Routes utilitaires

#### `GET /health`
Health check (pas d'auth).

---

#### `POST /api/upload/sign-url`
Génère une URL signée Cloud Storage pour upload direct depuis le client (évite de passer par le serveur).

**Body :**
```json
{
  "fileName": "photo.jpg",
  "contentType": "image/jpeg",
  "path": "offers/abc/"
}
```

---

## 📡 API Routes Next.js (`/api`)

### Webhooks

#### `POST /api/webhooks/satim`
Webhook SATIM (relayé vers le mini-backend pour traitement).

---

### SEO

#### `GET /api/sitemap`
Génère le sitemap.xml dynamique.

#### `GET /api/robots`
Génère robots.txt avec règles selon environnement.

---

### Server Actions (Next.js 14)

Préférer les Server Actions aux API Routes quand possible :

```typescript
'use server';

export async function addToFavorites(offerId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');
  
  await firestore.collection('users')
    .doc(user.uid)
    .update({
      favorites: FieldValue.arrayUnion(offerId)
    });
  
  revalidatePath('/compte/favoris');
}
```

---

## 🔒 Sécurité globale des APIs

### Rate limiting

| Endpoint | Limite |
|----------|--------|
| `createBooking` | 10/heure par user |
| `applyPromoCode` | 30/heure par user |
| `searchOffers` | 100/heure par IP |
| `sendContactMessage` | 5/heure par IP |
| `/api/payments/*` | 30/heure par user |
| Login attempts | 5/15min par email |

### Validation

- **Toujours valider avec Zod** côté serveur
- **Ne jamais faire confiance** aux données client
- **Sanitiser** les inputs HTML/Markdown
- **Échapper** les caractères spéciaux pour Firestore queries

### Headers de sécurité

```typescript
// next.config.js
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; img-src 'self' https: data:; ..."
  },
];
```

### CORS (Mini-backend)

```typescript
app.use(cors({
  origin: [
    'https://voyages.dz',
    'https://www.voyages.dz',
    /^https:\/\/.*\.voyages\.dz$/,
    process.env.NODE_ENV === 'development' && 'http://localhost:3000',
  ].filter(Boolean),
  credentials: true,
}));
```

---

## 📊 Codes d'erreur standardisés

```typescript
enum ErrorCode {
  // Auth
  UNAUTHORIZED = 'AUTH_001',
  FORBIDDEN = 'AUTH_002',
  TOKEN_EXPIRED = 'AUTH_003',
  EMAIL_NOT_VERIFIED = 'AUTH_004',
  
  // Validation
  INVALID_INPUT = 'VAL_001',
  MISSING_FIELD = 'VAL_002',
  
  // Business
  OFFER_NOT_FOUND = 'BIZ_001',
  OFFER_SOLD_OUT = 'BIZ_002',
  INVALID_PROMO = 'BIZ_003',
  BOOKING_NOT_FOUND = 'BIZ_004',
  CANNOT_CANCEL = 'BIZ_005',
  
  // Payment
  PAYMENT_FAILED = 'PAY_001',
  PAYMENT_TIMEOUT = 'PAY_002',
  REFUND_FAILED = 'PAY_003',
  
  // System
  INTERNAL_ERROR = 'SYS_001',
  RATE_LIMITED = 'SYS_002',
  SERVICE_UNAVAILABLE = 'SYS_003',
}
```

Format de réponse d'erreur :
```json
{
  "success": false,
  "error": {
    "code": "BIZ_002",
    "message": "Cette offre est complète pour ces dates",
    "details": { ... }
  }
}
```

---

## 🧪 Documentation et tests

### OpenAPI / Swagger

Le mini-backend expose `/api/docs` avec la doc Swagger interactive en développement.

### Tests d'API

- **Unit** : Vitest pour les services
- **Integration** : Supertest pour les routes
- **E2E** : Playwright pour les flux complets (booking → payment → confirmation)

### Postman / Bruno

Collection partagée dans `/docs/api-collection.json` pour tests manuels.
