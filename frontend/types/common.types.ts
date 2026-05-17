import type { Timestamp } from 'firebase/firestore';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

export interface ApiResponse<T = undefined> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export type FirestoreTimestamp = Timestamp;

export interface SelectOption {
  value: string;
  label: string;
}

export type Language = 'fr' | 'ar';
export type Currency = 'DZD' | 'EUR' | 'USD';
