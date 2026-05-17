import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Offer } from '@/types/offer.types';

interface TravelerInput {
  type: 'adult' | 'child' | 'infant';
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: 'M' | 'F';
  nationality: string;
  passport?: {
    number: string;
    expiryDate: string;
    issueCountry: string;
  };
}

interface BookingState {
  offerId: string | null;
  offerSnapshot: Partial<Offer> | null;
  selectedDateId: string | null;
  departureDate: string | null;
  returnDate: string | null;
  adults: number;
  children: number;
  infants: number;
  selectedSupplements: { id: string; name: string; price: number; quantity: number }[];
  promoCode: string | null;
  promoDiscount: number;
  travelers: TravelerInput[];
  termsAccepted: boolean;
  paymentMethod: 'cib' | 'edahabia' | 'agency' | 'bank_transfer' | null;
  totalAmount: number;

  setOffer: (offerId: string, offer: Partial<Offer>) => void;
  setDates: (dateId: string) => void;
  setDepartureDates: (departure: string | null, returnDate: string | null) => void;
  setTravelers: (adults: number, children: number, infants: number) => void;
  setSupplements: (supplements: BookingState['selectedSupplements']) => void;
  setPromoCode: (code: string | null, discount: number) => void;
  setTravelerData: (travelers: TravelerInput[]) => void;
  setTermsAccepted: (accepted: boolean) => void;
  setPaymentMethod: (method: BookingState['paymentMethod']) => void;
  setTotalAmount: (amount: number) => void;
  reset: () => void;
}

const initialState = {
  offerId: null,
  offerSnapshot: null,
  selectedDateId: null,
  departureDate: null,
  returnDate: null,
  adults: 2,
  children: 0,
  infants: 0,
  selectedSupplements: [],
  promoCode: null,
  promoDiscount: 0,
  travelers: [],
  termsAccepted: false,
  paymentMethod: null,
  totalAmount: 0,
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      ...initialState,
      setOffer: (offerId, offer) => set({ offerId, offerSnapshot: offer }),
      setDates: (dateId) => set({ selectedDateId: dateId }),
      setDepartureDates: (departure, returnDate) =>
        set({ departureDate: departure, returnDate }),
      setTravelers: (adults, children, infants) =>
        set({ adults, children, infants }),
      setSupplements: (supplements) => set({ selectedSupplements: supplements }),
      setPromoCode: (code, discount) => set({ promoCode: code, promoDiscount: discount }),
      setTravelerData: (travelers) => set({ travelers }),
      setTermsAccepted: (accepted) => set({ termsAccepted: accepted }),
      setPaymentMethod: (method) => set({ paymentMethod: method }),
      setTotalAmount: (amount) => set({ totalAmount: amount }),
      reset: () => set(initialState),
    }),
    {
      name: 'booking-store',
    },
  ),
);
