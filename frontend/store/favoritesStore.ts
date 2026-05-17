import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favoriteIds: string[];
  toggle: (offerId: string) => void;
  isFavorite: (offerId: string) => boolean;
  setFavorites: (ids: string[]) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      toggle: (offerId) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(offerId)
            ? state.favoriteIds.filter((id) => id !== offerId)
            : [...state.favoriteIds, offerId],
        })),
      isFavorite: (offerId) => get().favoriteIds.includes(offerId),
      setFavorites: (ids) => set({ favoriteIds: ids }),
    }),
    {
      name: 'favorites-store',
    },
  ),
);
