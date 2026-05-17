export const SITE_CONFIG = {
  name: 'Voyages',
  fullName: 'Voyages Algérie',
  description: 'Votre agence de voyages en ligne en Algérie — vols, hôtels, Omra, circuits',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://voyages.dz',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+213XXXXXXXXX',
  defaultCurrency: 'DZD' as const,
  defaultLanguage: 'fr' as const,
};

export const OFFER_TYPES = {
  flight: 'Vol',
  hotel: 'Hôtel',
  package: 'Package',
  circuit: 'Circuit',
  omra: 'Omra',
  hajj: 'Hajj',
} as const;

export const BOOKING_STATUS_LABELS: Record<string, string> = {
  draft: 'Brouillon',
  pending: 'En attente',
  confirmed: 'Confirmée',
  paid: 'Payée',
  in_progress: 'En cours',
  completed: 'Terminée',
  cancelled: 'Annulée',
  refunded: 'Remboursée',
};

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  cib: 'Carte CIB',
  edahabia: 'Edahabia',
  agency: 'Paiement en agence',
  bank_transfer: 'Virement bancaire',
};

export const PAGINATION_SIZE = 20;
export const TERMS_VERSION = '1.0';
