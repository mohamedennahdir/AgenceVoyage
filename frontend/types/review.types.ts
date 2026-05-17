import type { Timestamp } from 'firebase/firestore';

export type ReviewStatus = 'pending' | 'published' | 'rejected';

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  offerId: string;
  offerTitle: string;
  bookingId: string;
  rating: number;
  title?: string;
  comment: string;
  ratings?: {
    accommodation?: number;
    transport?: number;
    program?: number;
    valueForMoney?: number;
    organization?: number;
  };
  status: ReviewStatus;
  moderatedBy?: string;
  moderatedAt?: Timestamp;
  helpful: number;
  response?: {
    text: string;
    respondedAt: Timestamp;
    respondedBy: string;
  };
  travelDate: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
