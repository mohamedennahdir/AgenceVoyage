import type { Timestamp } from 'firebase/firestore';

export type UserRole = 'customer' | 'agent' | 'admin';
export type UserStatus = 'active' | 'suspended' | 'deleted';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar?: string;
  birthDate?: Timestamp;
  gender?: 'M' | 'F';
  nationality?: string;
  address?: {
    street: string;
    city: string;
    wilaya: string;
    postalCode: string;
    country: string;
  };
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
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  phoneVerified: boolean;
  stats: {
    totalBookings: number;
    totalSpent: number;
    lastBookingDate?: Timestamp;
    memberSince: Timestamp;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLoginAt?: Timestamp;
  source?: string;
  tags?: string[];
}

export interface Traveler {
  id: string;
  userId: string;
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
