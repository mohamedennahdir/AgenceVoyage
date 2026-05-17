// ── Types ─────────────────────────────────────────────────────────────────────

export interface AdminTransaction {
  id: string;
  bookingRef: string;
  clientName: string;
  method: 'cib' | 'edahabia' | 'agency' | 'bank_transfer';
  amount: number;
  status: 'pending' | 'awaiting' | 'paid' | 'partial' | 'refunded' | 'failed';
  satimRef?: string;
  processedAt?: string;
  createdAt: string;
}

export interface AdminBlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  author: string;
  status: 'draft' | 'published';
  publishedAt?: string;
  views: number;
  readTime: number;
  createdAt: string;
}

export interface AdminDestination {
  id: string;
  name: string;
  country: string;
  slug: string;
  image: string;
  description: string;
  featured: boolean;
  status: 'active' | 'inactive';
  offerCount: number;
}

export interface AdminPromoCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount: number;
  maxUses: number;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  status: 'active' | 'expired' | 'disabled';
  description?: string;
}

export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'agent' | 'super_admin';
  status: 'active' | 'inactive' | 'suspended';
  permissions: string[];
  lastLogin?: string;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  action: 'create' | 'update' | 'delete' | 'login' | 'logout' | 'export' | 'payment';
  resource: string;
  resourceId?: string;
  userId: string;
  userName: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}

// ── Transactions / Paiements ───────────────────────────────────────────────────

export const ADMIN_TRANSACTIONS: AdminTransaction[] = [
  { id: 'tx1', bookingRef: 'VG-ISTANBUL42', clientName: 'Amina Benali', method: 'cib', amount: 170_000, status: 'paid', satimRef: 'SAT-001234', processedAt: '2026-05-10T14:32:00', createdAt: '2026-05-10' },
  { id: 'tx2', bookingRef: 'VG-OMRA2026', clientName: 'Karim Benmalek', method: 'bank_transfer', amount: 416_500, status: 'awaiting', createdAt: '2026-04-22' },
  { id: 'tx3', bookingRef: 'VG-DUBAI55', clientName: 'Fatima Bouali', method: 'edahabia', amount: 195_000, status: 'pending', createdAt: '2026-05-15' },
  { id: 'tx4', bookingRef: 'VG-CAIRE33', clientName: 'Youcef Driss', method: 'agency', amount: 70_000, status: 'partial', processedAt: '2026-05-13T10:15:00', createdAt: '2026-05-12' },
  { id: 'tx5', bookingRef: 'VG-PARIS21', clientName: 'Samira Ould Ali', method: 'cib', amount: 110_000, status: 'paid', satimRef: 'SAT-000891', processedAt: '2026-03-06T09:00:00', createdAt: '2026-03-05' },
  { id: 'tx6', bookingRef: 'VG-BARCELONE77', clientName: 'Hamid Zerrouki', method: 'edahabia', amount: 50_000, status: 'refunded', satimRef: 'SAT-000712', processedAt: '2026-04-08T16:20:00', createdAt: '2026-04-01' },
  { id: 'tx7', bookingRef: 'VG-TURQUIE90', clientName: 'Nadia Messaoudi', method: 'cib', amount: 540_000, status: 'pending', createdAt: '2026-05-16' },
  { id: 'tx8', bookingRef: 'VG-OMRA-LUX', clientName: 'Omar Bouzid', method: 'bank_transfer', amount: 770_000, status: 'awaiting', createdAt: '2026-05-17' },
];

// ── Articles Blog ──────────────────────────────────────────────────────────────

export const ADMIN_BLOG_POSTS: AdminBlogPost[] = [
  {
    id: 'blog1',
    title: 'Les meilleurs moments pour faire l\'Omra 2026',
    slug: 'meilleurs-moments-omra-2026',
    category: 'Omra & Hajj',
    excerpt: 'Choisir la bonne période pour votre pèlerinage peut transformer votre expérience spirituelle. Découvrez les saisons idéales.',
    content: 'L\'Omra peut être accomplie à n\'importe quelle période de l\'année, contrairement au Hajj. Cependant, certaines périodes offrent une expérience plus sereine...',
    thumbnail: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80',
    author: 'Ahmed Benali',
    status: 'published',
    publishedAt: '2026-05-01',
    views: 2840,
    readTime: 7,
    createdAt: '2026-04-28',
  },
  {
    id: 'blog2',
    title: 'Top 5 des incontournables à Istanbul',
    slug: 'top-5-incontournables-istanbul',
    category: 'Destinations',
    excerpt: 'Mosquée Bleue, Sainte-Sophie, Grand Bazar... Découvrez les 5 sites à absolument visiter lors de votre séjour à Istanbul.',
    content: 'Istanbul, ville à cheval sur deux continents, regorge de merveilles architecturales et culturelles...',
    thumbnail: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80',
    author: 'Sara Khelifi',
    status: 'published',
    publishedAt: '2026-04-15',
    views: 4120,
    readTime: 5,
    createdAt: '2026-04-12',
  },
  {
    id: 'blog3',
    title: 'Guide complet du voyage à Dubaï depuis l\'Algérie',
    slug: 'guide-voyage-dubai-algerie',
    category: 'Guides pratiques',
    excerpt: 'Visa, monnaie, transport, hébergement... Tout ce qu\'il faut savoir pour préparer votre voyage à Dubaï.',
    content: 'Dubaï accueille chaque année des milliers de touristes algériens. Voici notre guide complet pour préparer votre séjour...',
    thumbnail: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
    author: 'Ahmed Benali',
    status: 'published',
    publishedAt: '2026-03-20',
    views: 6890,
    readTime: 10,
    createdAt: '2026-03-17',
  },
  {
    id: 'blog4',
    title: 'Comment bien préparer ses documents de voyage',
    slug: 'preparer-documents-voyage',
    category: 'Guides pratiques',
    excerpt: 'Passeport, visa, assurance, vaccins... Le guide complet pour ne rien oublier avant votre départ.',
    content: 'Préparer un voyage depuis l\'Algérie nécessite une bonne organisation documentaire. Voici notre checklist complète...',
    thumbnail: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80',
    author: 'Sara Khelifi',
    status: 'draft',
    views: 0,
    readTime: 8,
    createdAt: '2026-05-10',
  },
  {
    id: 'blog5',
    title: 'Nos clients témoignent : Omra 2025',
    slug: 'temoignages-clients-omra-2025',
    category: 'Témoignages',
    excerpt: 'Découvrez les retours d\'expérience de nos pèlerins de l\'Omra 2025. Des témoignages touchants et sincères.',
    content: 'Chaque année, nous accompagnons des centaines de familles algériennes pour leur pèlerinage...',
    thumbnail: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80',
    author: 'Ahmed Benali',
    status: 'published',
    publishedAt: '2026-02-10',
    views: 3450,
    readTime: 6,
    createdAt: '2026-02-07',
  },
  {
    id: 'blog6',
    title: 'Ramadan à Dubaï : une expérience unique',
    slug: 'ramadan-dubai-experience',
    category: 'Destinations',
    excerpt: 'Voyager à Dubaï pendant le Ramadan offre une atmosphère unique. Découvrez les spécificités de cette période.',
    content: 'Le Ramadan transforme Dubaï en une ville à la fois festive et spirituelle...',
    thumbnail: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&q=80',
    author: 'Sara Khelifi',
    status: 'draft',
    views: 0,
    readTime: 5,
    createdAt: '2026-05-15',
  },
];

// ── Destinations ───────────────────────────────────────────────────────────────

export const ADMIN_DESTINATIONS: AdminDestination[] = [
  { id: 'd1', name: 'Istanbul', country: 'Turquie', slug: 'istanbul', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&q=80', description: 'Ville à cheval sur deux continents, Istanbul allie histoire ottomane et modernité.', featured: true, status: 'active', offerCount: 3 },
  { id: 'd2', name: 'Dubai', country: 'Émirats Arabes Unis', slug: 'dubai', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80', description: 'Métropole futuriste du désert, Dubai offre une expérience unique entre tradition et ultra-modernité.', featured: true, status: 'active', offerCount: 3 },
  { id: 'd3', name: 'La Mecque', country: 'Arabie Saoudite', slug: 'la-mecque', image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&q=80', description: 'Ville sainte de l\'Islam, destination de pèlerinage pour l\'Omra et le Hajj.', featured: true, status: 'active', offerCount: 4 },
  { id: 'd4', name: 'Paris', country: 'France', slug: 'paris', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80', description: 'La Ville Lumière, capitale mondiale de la culture, de la mode et de la gastronomie.', featured: true, status: 'active', offerCount: 2 },
  { id: 'd5', name: 'Le Caire', country: 'Égypte', slug: 'le-caire', image: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=400&q=80', description: 'Porte d\'entrée des merveilles pharaoniques — pyramides, sphinx et trésors des musées.', featured: true, status: 'active', offerCount: 2 },
  { id: 'd6', name: 'Marrakech', country: 'Maroc', slug: 'marrakech', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d81f86?w=400&q=80', description: 'La ville ocre, carrefour de cultures berbère, arabe et africaine.', featured: false, status: 'active', offerCount: 2 },
  { id: 'd7', name: 'Barcelone', country: 'Espagne', slug: 'barcelone', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&q=80', description: 'Capitale de la Catalogne, Barcelone séduit par son architecture, sa gastronomie et sa vie nocturne.', featured: false, status: 'active', offerCount: 1 },
  { id: 'd8', name: 'New York', country: 'États-Unis', slug: 'new-york', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80', description: 'La Grande Pomme, ville de tous les records, entre gratte-ciels et culture mondiale.', featured: false, status: 'active', offerCount: 1 },
];

// ── Codes promo ────────────────────────────────────────────────────────────────

export const ADMIN_PROMO_CODES: AdminPromoCode[] = [
  { id: 'p1', code: 'WELCOME10', type: 'percentage', value: 10, minOrderAmount: 50_000, maxUses: 100, usedCount: 34, validFrom: '2026-01-01', validUntil: '2026-12-31', status: 'active', description: 'Réduction de bienvenue pour nouveaux clients' },
  { id: 'p2', code: 'ETE2026', type: 'fixed', value: 5_000, minOrderAmount: 80_000, maxUses: 50, usedCount: 12, validFrom: '2026-06-01', validUntil: '2026-08-31', status: 'active', description: 'Promotion spéciale été 2026' },
  { id: 'p3', code: 'RAMADAN15', type: 'percentage', value: 15, minOrderAmount: 100_000, maxUses: 200, usedCount: 187, validFrom: '2026-03-01', validUntil: '2026-04-30', status: 'expired', description: 'Promotion Ramadan 2026' },
  { id: 'p4', code: 'VIP50K', type: 'fixed', value: 50_000, minOrderAmount: 300_000, maxUses: 10, usedCount: 3, validFrom: '2026-05-01', validUntil: '2026-07-31', status: 'active', description: 'Code exclusif clients VIP' },
  { id: 'p5', code: 'PREMIER8', type: 'percentage', value: 8, minOrderAmount: 0, maxUses: 500, usedCount: 89, validFrom: '2026-01-01', validUntil: '2026-12-31', status: 'active', description: 'Remise premier voyage' },
  { id: 'p6', code: 'ISTANBUL20', type: 'percentage', value: 20, minOrderAmount: 60_000, maxUses: 30, usedCount: 30, validFrom: '2026-04-01', validUntil: '2026-05-15', status: 'disabled', description: 'Promo flash Istanbul terminée' },
];

// ── Utilisateurs internes ──────────────────────────────────────────────────────

export const ADMIN_USERS: AdminUser[] = [
  { id: 'u1', firstName: 'Mohamed', lastName: 'Khelifi', email: 'admin@voyages.dz', role: 'super_admin', status: 'active', permissions: ['all'], lastLogin: '2026-05-17T09:15:00', createdAt: '2024-01-01' },
  { id: 'u2', firstName: 'Sara', lastName: 'Benali', email: 'sara@voyages.dz', role: 'admin', status: 'active', permissions: ['bookings', 'clients', 'offers', 'blog'], lastLogin: '2026-05-17T08:30:00', createdAt: '2024-03-15' },
  { id: 'u3', firstName: 'Rachid', lastName: 'Driss', email: 'rachid@voyages.dz', role: 'agent', status: 'active', permissions: ['bookings', 'clients'], lastLogin: '2026-05-16T17:00:00', createdAt: '2025-01-10' },
  { id: 'u4', firstName: 'Amira', lastName: 'Messaoudi', email: 'amira@voyages.dz', role: 'agent', status: 'inactive', permissions: ['bookings'], lastLogin: '2026-03-01T10:00:00', createdAt: '2025-06-01' },
];

// ── Journal d'audit ────────────────────────────────────────────────────────────

export const AUDIT_LOG: AuditLogEntry[] = [
  { id: 'a1', action: 'login', resource: 'auth', userId: 'u1', userName: 'Mohamed Khelifi', details: 'Connexion réussie depuis Chrome/Windows', ipAddress: '41.XXX.XX.XX', timestamp: '2026-05-17T09:15:00' },
  { id: 'a2', action: 'update', resource: 'booking', resourceId: 'ab3', userId: 'u2', userName: 'Sara Benali', details: 'Statut changé : pending → confirmed', ipAddress: '41.XXX.XX.XX', timestamp: '2026-05-17T09:05:00' },
  { id: 'a3', action: 'create', resource: 'promo', resourceId: 'p2', userId: 'u1', userName: 'Mohamed Khelifi', details: 'Code promo ETE2026 créé (−5000 DZD)', ipAddress: '41.XXX.XX.XX', timestamp: '2026-05-16T16:30:00' },
  { id: 'a4', action: 'export', resource: 'clients', userId: 'u2', userName: 'Sara Benali', details: 'Export CSV de 89 clients', ipAddress: '41.XXX.XX.XX', timestamp: '2026-05-16T15:00:00' },
  { id: 'a5', action: 'payment', resource: 'transaction', resourceId: 'tx4', userId: 'u3', userName: 'Rachid Driss', details: 'Paiement agence enregistré — VG-CAIRE33 — 35 000 DZD (partiel)', ipAddress: '41.XXX.XX.XX', timestamp: '2026-05-13T10:15:00' },
  { id: 'a6', action: 'create', resource: 'offer', resourceId: '1', userId: 'u1', userName: 'Mohamed Khelifi', details: 'Nouvelle offre créée : Istanbul 7J (publié)', ipAddress: '41.XXX.XX.XX', timestamp: '2026-05-12T11:00:00' },
  { id: 'a7', action: 'update', resource: 'offer', resourceId: '3', userId: 'u2', userName: 'Sara Benali', details: 'Prix mis à jour : 55 000 → 52 000 DZD', ipAddress: '41.XXX.XX.XX', timestamp: '2026-05-11T14:20:00' },
  { id: 'a8', action: 'delete', resource: 'promo', resourceId: 'p6', userId: 'u1', userName: 'Mohamed Khelifi', details: 'Code promo ISTANBUL20 désactivé (quota atteint)', ipAddress: '41.XXX.XX.XX', timestamp: '2026-05-10T09:00:00' },
  { id: 'a9', action: 'login', resource: 'auth', userId: 'u3', userName: 'Rachid Driss', details: 'Connexion réussie depuis Firefox/Android', ipAddress: '41.YYY.XX.XX', timestamp: '2026-05-09T08:45:00' },
  { id: 'a10', action: 'update', resource: 'booking', resourceId: 'ab6', userId: 'u2', userName: 'Sara Benali', details: 'Annulation traitée — remboursement initié : VG-BARCELONE77', ipAddress: '41.XXX.XX.XX', timestamp: '2026-05-08T16:30:00' },
  { id: 'a11', action: 'create', resource: 'blog', resourceId: 'blog1', userId: 'u2', userName: 'Sara Benali', details: 'Article publié : "Les meilleurs moments pour faire l\'Omra 2026"', ipAddress: '41.XXX.XX.XX', timestamp: '2026-05-01T10:00:00' },
  { id: 'a12', action: 'export', resource: 'bookings', userId: 'u1', userName: 'Mohamed Khelifi', details: 'Export CSV de 127 réservations (comptabilité)', ipAddress: '41.XXX.XX.XX', timestamp: '2026-04-30T17:00:00' },
  { id: 'a13', action: 'update', resource: 'user', resourceId: 'u4', userId: 'u1', userName: 'Mohamed Khelifi', details: 'Compte suspendu : Amira Messaoudi', ipAddress: '41.XXX.XX.XX', timestamp: '2026-04-15T09:00:00' },
  { id: 'a14', action: 'create', resource: 'destination', resourceId: 'd8', userId: 'u2', userName: 'Sara Benali', details: 'Nouvelle destination ajoutée : New York, États-Unis', ipAddress: '41.XXX.XX.XX', timestamp: '2026-04-10T11:30:00' },
  { id: 'a15', action: 'payment', resource: 'transaction', resourceId: 'tx5', userId: 'u3', userName: 'Rachid Driss', details: 'Paiement CIB confirmé — VG-PARIS21 — 110 000 DZD', ipAddress: '41.XXX.XX.XX', timestamp: '2026-03-06T09:00:00' },
];
