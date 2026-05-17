// ── Types ─────────────────────────────────────────────────────────────────────

export interface AdminBooking {
  id: string;
  reference: string;
  status: 'pending' | 'confirmed' | 'paid' | 'completed' | 'cancelled';
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  offerTitle: string;
  offerType: string;
  destinations: string[];
  departureDate: string;
  adults: number;
  children: number;
  totalAmount: number;
  paymentMethod: string;
  createdAt: string;
}

export interface AdminClient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  wilaya: string;
  totalBookings: number;
  totalSpent: number;
  lastBookingDate?: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface DayStat {
  date: string;
  bookings: number;
  revenue: number;
}

// ── Stats globales ─────────────────────────────────────────────────────────────

export const ADMIN_STATS = {
  totalBookings: 127,
  bookingsThisMonth: 18,
  bookingsLastMonth: 14,
  pendingBookings: 5,
  confirmedBookings: 12,
  totalRevenue: 42_350_000,
  revenueThisMonth: 5_680_000,
  revenueLastMonth: 4_920_000,
  totalClients: 89,
  newClientsThisMonth: 12,
  occupancyRate: 73,
};

// ── Statistiques journalières (14 jours) ──────────────────────────────────────

export const DAILY_STATS: DayStat[] = [
  { date: '2026-05-04', bookings: 3, revenue: 780_000 },
  { date: '2026-05-05', bookings: 1, revenue: 245_000 },
  { date: '2026-05-06', bookings: 5, revenue: 1_420_000 },
  { date: '2026-05-07', bookings: 4, revenue: 980_000 },
  { date: '2026-05-08', bookings: 2, revenue: 510_000 },
  { date: '2026-05-09', bookings: 6, revenue: 1_780_000 },
  { date: '2026-05-10', bookings: 3, revenue: 870_000 },
  { date: '2026-05-11', bookings: 1, revenue: 185_000 },
  { date: '2026-05-12', bookings: 4, revenue: 1_120_000 },
  { date: '2026-05-13', bookings: 7, revenue: 2_040_000 },
  { date: '2026-05-14', bookings: 5, revenue: 1_350_000 },
  { date: '2026-05-15', bookings: 2, revenue: 620_000 },
  { date: '2026-05-16', bookings: 8, revenue: 2_260_000 },
  { date: '2026-05-17', bookings: 3, revenue: 945_000 },
];

// ── Réservations ───────────────────────────────────────────────────────────────

export const ADMIN_BOOKINGS: AdminBooking[] = [
  {
    id: 'ab1', reference: 'VG-ISTANBUL42', status: 'confirmed',
    clientName: 'Amina Benali', clientEmail: 'amina.benali@example.com', clientPhone: '+213 XXX',
    offerTitle: 'Istanbul — La Ville aux Deux Continents', offerType: 'package',
    destinations: ['Istanbul', 'Turquie'], departureDate: '2026-06-15',
    adults: 2, children: 0, totalAmount: 170_000, paymentMethod: 'cib', createdAt: '2026-05-10',
  },
  {
    id: 'ab2', reference: 'VG-OMRA2026', status: 'paid',
    clientName: 'Karim Benmalek', clientEmail: 'k.benmalek@example.com', clientPhone: '+213 XXX',
    offerTitle: 'Omra 2026 — Package Confort', offerType: 'omra',
    destinations: ['La Mecque', 'Médine'], departureDate: '2026-08-01',
    adults: 2, children: 1, totalAmount: 416_500, paymentMethod: 'bank_transfer', createdAt: '2026-04-22',
  },
  {
    id: 'ab3', reference: 'VG-DUBAI55', status: 'pending',
    clientName: 'Fatima Bouali', clientEmail: 'f.bouali@example.com', clientPhone: '+213 XXX',
    offerTitle: 'Dubai — Luxe et Merveilles', offerType: 'package',
    destinations: ['Dubai'], departureDate: '2026-07-20',
    adults: 2, children: 2, totalAmount: 195_000, paymentMethod: 'edahabia', createdAt: '2026-05-15',
  },
  {
    id: 'ab4', reference: 'VG-CAIRE33', status: 'confirmed',
    clientName: 'Youcef Driss', clientEmail: 'y.driss@example.com', clientPhone: '+213 XXX',
    offerTitle: "Le Caire — Cœur de l'Égypte", offerType: 'circuit',
    destinations: ['Le Caire', 'Égypte'], departureDate: '2026-06-28',
    adults: 2, children: 0, totalAmount: 70_000, paymentMethod: 'agency', createdAt: '2026-05-12',
  },
  {
    id: 'ab5', reference: 'VG-PARIS21', status: 'completed',
    clientName: 'Samira Ould Ali', clientEmail: 's.ouldali@example.com', clientPhone: '+213 XXX',
    offerTitle: 'Paris — La Ville Lumière', offerType: 'package',
    destinations: ['Paris', 'France'], departureDate: '2026-04-10',
    adults: 2, children: 0, totalAmount: 110_000, paymentMethod: 'cib', createdAt: '2026-03-05',
  },
  {
    id: 'ab6', reference: 'VG-BARCELONE77', status: 'cancelled',
    clientName: 'Hamid Zerrouki', clientEmail: 'h.zerrouki@example.com', clientPhone: '+213 XXX',
    offerTitle: 'Barcelone — Art et Gastronomie', offerType: 'package',
    destinations: ['Barcelone', 'Espagne'], departureDate: '2026-05-01',
    adults: 1, children: 0, totalAmount: 50_000, paymentMethod: 'edahabia', createdAt: '2026-04-01',
  },
  {
    id: 'ab7', reference: 'VG-TURQUIE90', status: 'confirmed',
    clientName: 'Nadia Messaoudi', clientEmail: 'n.messaoudi@example.com', clientPhone: '+213 XXX',
    offerTitle: 'Grand Circuit Turquie', offerType: 'circuit',
    destinations: ['Istanbul', 'Cappadoce', 'Turquie'], departureDate: '2026-09-10',
    adults: 4, children: 1, totalAmount: 540_000, paymentMethod: 'cib', createdAt: '2026-05-16',
  },
  {
    id: 'ab8', reference: 'VG-OMRA-LUX', status: 'pending',
    clientName: 'Omar Bouzid', clientEmail: 'o.bouzid@example.com', clientPhone: '+213 XXX',
    offerTitle: 'Omra 2026 — Package Luxe', offerType: 'omra',
    destinations: ['La Mecque', 'Médine'], departureDate: '2026-10-05',
    adults: 2, children: 0, totalAmount: 770_000, paymentMethod: 'bank_transfer', createdAt: '2026-05-17',
  },
];

// ── Clients ────────────────────────────────────────────────────────────────────

export const ADMIN_CLIENTS: AdminClient[] = [
  { id: 'c1', firstName: 'Amina', lastName: 'Benali', email: 'amina.benali@example.com', phone: '+213 555 01 02', wilaya: 'Alger', totalBookings: 4, totalSpent: 345_000, lastBookingDate: '2026-05-10', status: 'active', createdAt: '2024-01-10' },
  { id: 'c2', firstName: 'Karim', lastName: 'Benmalek', email: 'k.benmalek@example.com', phone: '+213 555 03 04', wilaya: 'Oran', totalBookings: 3, totalSpent: 710_000, lastBookingDate: '2026-04-22', status: 'active', createdAt: '2024-03-15' },
  { id: 'c3', firstName: 'Fatima Zahra', lastName: 'Bouali', email: 'f.bouali@example.com', phone: '+213 555 05 06', wilaya: 'Constantine', totalBookings: 2, totalSpent: 195_000, lastBookingDate: '2026-05-15', status: 'active', createdAt: '2025-01-20' },
  { id: 'c4', firstName: 'Youcef', lastName: 'Driss', email: 'y.driss@example.com', phone: '+213 555 07 08', wilaya: 'Annaba', totalBookings: 1, totalSpent: 70_000, lastBookingDate: '2026-05-12', status: 'active', createdAt: '2026-04-01' },
  { id: 'c5', firstName: 'Samira', lastName: 'Ould Ali', email: 's.ouldali@example.com', phone: '+213 555 09 10', wilaya: 'Alger', totalBookings: 5, totalSpent: 520_000, lastBookingDate: '2026-04-10', status: 'active', createdAt: '2023-11-05' },
  { id: 'c6', firstName: 'Hamid', lastName: 'Zerrouki', email: 'h.zerrouki@example.com', phone: '+213 555 11 12', wilaya: 'Blida', totalBookings: 1, totalSpent: 0, lastBookingDate: '2026-05-01', status: 'inactive', createdAt: '2026-03-20' },
  { id: 'c7', firstName: 'Nadia', lastName: 'Messaoudi', email: 'n.messaoudi@example.com', phone: '+213 555 13 14', wilaya: 'Sétif', totalBookings: 2, totalSpent: 540_000, lastBookingDate: '2026-05-16', status: 'active', createdAt: '2025-06-10' },
  { id: 'c8', firstName: 'Omar', lastName: 'Bouzid', email: 'o.bouzid@example.com', phone: '+213 555 15 16', wilaya: 'Tlemcen', totalBookings: 1, totalSpent: 770_000, lastBookingDate: '2026-05-17', status: 'active', createdAt: '2026-05-01' },
];
