// ── Types ────────────────────────────────────────────────────────────────────

export interface MockBooking {
  id: string;
  reference: string;
  status: 'pending' | 'confirmed' | 'paid' | 'completed' | 'cancelled';
  offerTitle: string;
  offerType: string;
  destinations: string[];
  mainImage: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  totalAmount: number;
  paymentMethod: 'cib' | 'edahabia' | 'agency' | 'bank_transfer';
  createdAt: string;
}

export interface MockTraveler {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: 'M' | 'F';
  nationality: string;
  relationship: 'self' | 'spouse' | 'child' | 'parent' | 'sibling' | 'other';
  passportNumber?: string;
  passportExpiry?: string;
}

export interface MockNotification {
  id: string;
  type: 'booking_confirmed' | 'booking_cancelled' | 'promo' | 'reminder' | 'document';
  title: string;
  message: string;
  read: boolean;
  date: string;
  link?: string;
}

// ── Profil utilisateur ───────────────────────────────────────────────────────

export const MOCK_USER = {
  id: 'user123',
  firstName: 'Amina',
  lastName: 'Benali',
  email: 'amina.benali@example.com',
  phone: '+213 XXX XXX XXX',
  gender: 'F' as const,
  birthDate: '1990-03-15',
  nationality: 'Algérienne',
  wilaya: 'Alger',
  memberSince: '2024-01-10',
  totalBookings: 4,
  totalSpent: 345000,
};

// ── Réservations ─────────────────────────────────────────────────────────────

export const MOCK_BOOKINGS: MockBooking[] = [
  {
    id: 'bk1',
    reference: 'VG-ISTANBUL42',
    status: 'confirmed',
    offerTitle: 'Istanbul — La Ville aux Deux Continents',
    offerType: 'package',
    destinations: ['Istanbul', 'Turquie'],
    mainImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&q=80',
    departureDate: '2026-06-15',
    returnDate: '2026-06-22',
    adults: 2,
    children: 0,
    totalAmount: 170000,
    paymentMethod: 'cib',
    createdAt: '2026-05-10',
  },
  {
    id: 'bk2',
    reference: 'VG-OMRA2026',
    status: 'paid',
    offerTitle: 'Omra 2026 — Package Confort ★★★★',
    offerType: 'omra',
    destinations: ['La Mecque', 'Médine'],
    mainImage: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&q=80',
    departureDate: '2026-08-01',
    returnDate: '2026-08-13',
    adults: 2,
    children: 1,
    totalAmount: 416500,
    paymentMethod: 'bank_transfer',
    createdAt: '2026-04-22',
  },
  {
    id: 'bk3',
    reference: 'VG-DUBAI21',
    status: 'completed',
    offerTitle: 'Dubai — Luxe et Merveilles Modernes',
    offerType: 'package',
    destinations: ['Dubai', 'Emirats Arabes Unis'],
    mainImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80',
    departureDate: '2025-12-20',
    returnDate: '2025-12-25',
    adults: 2,
    children: 0,
    totalAmount: 130000,
    paymentMethod: 'cib',
    createdAt: '2025-11-15',
  },
  {
    id: 'bk4',
    reference: 'VG-PARIS19',
    status: 'cancelled',
    offerTitle: 'Paris — La Ville Lumière',
    offerType: 'package',
    destinations: ['Paris', 'France'],
    mainImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80',
    departureDate: '2025-07-10',
    returnDate: '2025-07-16',
    adults: 2,
    children: 2,
    totalAmount: 154000,
    paymentMethod: 'edahabia',
    createdAt: '2025-06-01',
  },
];

// ── Voyageurs sauvegardés ─────────────────────────────────────────────────────

export const MOCK_TRAVELERS: MockTraveler[] = [
  {
    id: 'tr1',
    firstName: 'Amina',
    lastName: 'Benali',
    birthDate: '1990-03-15',
    gender: 'F',
    nationality: 'Algérienne',
    relationship: 'self',
    passportNumber: 'A1234567',
    passportExpiry: '2029-05-20',
  },
  {
    id: 'tr2',
    firstName: 'Karim',
    lastName: 'Benali',
    birthDate: '1988-07-22',
    gender: 'M',
    nationality: 'Algérien',
    relationship: 'spouse',
    passportNumber: 'B9876543',
    passportExpiry: '2028-11-10',
  },
  {
    id: 'tr3',
    firstName: 'Yasmine',
    lastName: 'Benali',
    birthDate: '2015-02-08',
    gender: 'F',
    nationality: 'Algérienne',
    relationship: 'child',
  },
];

// ── Notifications ─────────────────────────────────────────────────────────────

export const MOCK_NOTIFICATIONS: MockNotification[] = [
  {
    id: 'n1',
    type: 'booking_confirmed',
    title: 'Réservation confirmée',
    message: 'Votre réservation VG-ISTANBUL42 pour Istanbul est confirmée. Bon voyage !',
    read: false,
    date: '2026-05-10',
    link: '/compte/reservations/bk1',
  },
  {
    id: 'n2',
    type: 'document',
    title: 'Facture disponible',
    message: 'La facture de votre réservation VG-OMRA2026 est disponible en téléchargement.',
    read: false,
    date: '2026-04-23',
    link: '/compte/reservations/bk2',
  },
  {
    id: 'n3',
    type: 'reminder',
    title: 'Rappel : Votre départ approche',
    message: 'Votre voyage à Istanbul part dans 30 jours. Pensez à vérifier vos documents.',
    read: true,
    date: '2026-05-16',
    link: '/compte/reservations/bk1',
  },
  {
    id: 'n4',
    type: 'promo',
    title: 'Offre spéciale été 2026',
    message: 'Profitez de -15% sur nos packages Turquie avec le code SUMMER15. Valable jusqu\'au 31 mai.',
    read: true,
    date: '2026-05-01',
    link: '/offres?type=package',
  },
  {
    id: 'n5',
    type: 'booking_cancelled',
    title: 'Annulation remboursée',
    message: 'L\'annulation de VG-PARIS19 a été traitée. Le remboursement a été initié.',
    read: true,
    date: '2025-06-08',
  },
];
