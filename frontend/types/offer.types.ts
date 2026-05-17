import type { Timestamp } from 'firebase/firestore';

export type OfferType = 'flight' | 'hotel' | 'package' | 'circuit' | 'omra' | 'hajj';
export type OfferStatus = 'draft' | 'published' | 'archived' | 'sold_out';
export type AvailabilityStatus = 'available' | 'few_left' | 'sold_out';

export interface OfferItinerary {
  day: number;
  title: string;
  description: string;
  meals?: ('breakfast' | 'lunch' | 'dinner')[];
  accommodation?: string;
}

export interface OfferAvailabilityDate {
  startDate: Timestamp;
  endDate: Timestamp;
  pricePerPerson: number;
  seatsTotal: number;
  seatsAvailable: number;
  status: AvailabilityStatus;
}

export interface OfferSupplement {
  id: string;
  name: string;
  description?: string;
  price: number;
  type: 'per_person' | 'per_booking';
  mandatory?: boolean;
}

export interface Offer {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  type: OfferType;
  destinations: string[];
  departure: { city: string; airport?: string; country: string };
  arrival: { city: string; airport?: string; country: string };
  description: string;
  shortDescription: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  conditions: string;
  itinerary?: OfferItinerary[];
  duration: { days: number; nights: number };
  hotels?: {
    name: string;
    stars: number;
    city: string;
    description?: string;
    images?: string[];
  }[];
  flights?: {
    airline: string;
    flightNumber?: string;
    departure: string;
    arrival: string;
    duration: number;
    stops: number;
  }[];
  images: string[];
  mainImage: string;
  videoUrl?: string;
  pricing: {
    basePrice: number;
    childPrice?: number;
    infantPrice?: number;
    currency: 'DZD';
    pricePerPerson: boolean;
    minPax?: number;
    maxPax?: number;
  };
  promotion?: {
    active: boolean;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    originalPrice: number;
    label?: string;
    endsAt?: Timestamp;
  };
  availability: {
    type: 'fixed_dates' | 'flexible' | 'on_demand';
    dates?: OfferAvailabilityDate[];
  };
  supplements?: OfferSupplement[];
  tags: string[];
  features: string[];
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  stats: {
    views: number;
    bookings: number;
    avgRating?: number;
    reviewCount: number;
  };
  status: OfferStatus;
  featured: boolean;
  popular: boolean;
  trending: boolean;
  category?: string;
  themes: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt?: Timestamp;
  createdBy: string;
}
