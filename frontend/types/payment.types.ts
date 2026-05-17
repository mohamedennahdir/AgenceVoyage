export type PaymentMethod = 'cib' | 'edahabia' | 'agency' | 'bank_transfer';

export interface PaymentInitRequest {
  bookingId: string;
  amount: number;
  currency: 'DZD';
  method: PaymentMethod;
}

export interface PaymentInitResponse {
  success: boolean;
  paymentId: string;
  redirectUrl: string;
  expiresAt: string;
}

export interface SatimCallbackPayload {
  orderId: string;
  status: string;
  amount: number;
  orderNumber: string;
}
