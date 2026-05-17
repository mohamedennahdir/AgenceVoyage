import { create } from 'zustand';

interface SearchFilters {
  priceMin?: number;
  priceMax?: number;
  stars?: number[];
  airlines?: string[];
  stops?: number;
  duration?: number;
}

interface SearchState {
  type: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  children: number;
  infants: number;
  filters: SearchFilters;
  sort: 'recommended' | 'price_asc' | 'price_desc' | 'duration' | 'popularity';

  setSearch: (params: Partial<Omit<SearchState, 'setSearch' | 'setFilters' | 'setSort' | 'reset'>>) => void;
  setFilters: (filters: SearchFilters) => void;
  setSort: (sort: SearchState['sort']) => void;
  reset: () => void;
}

const initialSearch = {
  type: 'packages',
  destination: '',
  departureDate: '',
  returnDate: '',
  adults: 2,
  children: 0,
  infants: 0,
  filters: {},
  sort: 'recommended' as const,
};

export const useSearchStore = create<SearchState>()((set) => ({
  ...initialSearch,
  setSearch: (params) => set((state) => ({ ...state, ...params })),
  setFilters: (filters) => set({ filters }),
  setSort: (sort) => set({ sort }),
  reset: () => set(initialSearch),
}));
