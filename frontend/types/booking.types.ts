import type { Timestamp } from 'firebase/firestore';

export type BookingStatus =
  | 'draft'
  | 'pending'
  | 'confirmed'
  | 'paid'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'refunded';

export type PaymentMethod = 'cib' | 'edahabia' | 'agency' | 'bank_transfer';
export type PaymentStatus = 'pending' | 'awaiting' | 'partial' | 'paid' | 'refunded' | 'failed';

export interface BookingTraveler {
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
}

export interface Booking {
  id: string;
  reference: string;
  userId: string;
  userEmail: string;
  userName: string;
  userPhone: string;
  offerId: string;
  offerSnapshot: {
    title: string;
    type: string;
    mainImage: string;
    duration: { days: number; nights: number };
    destinations: string[];
  };
  travelDates: {
    departure: Timestamp;
    return: Timestamp;
  };
  travelers: BookingTraveler[];
  primaryContact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  supplements?: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  pricing: {
    basePrice: number;
    adultPrice: number;
    childPrice: number;
    infantPrice: number;
    supplementsTotal: number;
    subtotal: number;
    discount: number;
    promoCode?: string;
    taxAmount: number;
    taxRate: number;
    totalAmount: number;
    currency: 'DZD';
    paidAmount: number;
    remainingAmount: number;
  };
  payment: {
    method: PaymentMethod;
    status: PaymentStatus;
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
  documents: {
    type: 'invoice' | 'voucher' | 'ticket' | 'visa' | 'insurance';
    name: string;
    url: string;
    uploadedAt: Timestamp;
  }[];
  status: BookingStatus;
  history: {
    timestamp: Timestamp;
    action: string;
    userId?: string;
    userName?: string;
    details?: string;
  }[];
  customerNotes?: string;
  internalNotes?: string;
  cancellation?: {
    requestedAt: Timestamp;
    requestedBy: string;
    reason: string;
    refundAmount?: number;
    refundedAt?: Timestamp;
    notes?: string;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
  confirmedAt?: Timestamp;
  completedAt?: Timestamp;
  assignedAgentId?: string;
  assignedAgentName?: string;
  termsAcceptedAt: Timestamp;
  termsVersion: string;
}
