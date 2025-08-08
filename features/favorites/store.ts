import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type FavoritesState = {
  favorites: Record<string, true>;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearAll: () => void;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: {},
      toggleFavorite: (id: string) =>
        set((state) => {
          const next = { ...state.favorites };
          if (next[id]) delete next[id];
          else next[id] = true;
          return { favorites: next };
        }),
      isFavorite: (id: string) => !!get().favorites[id],
      clearAll: () => set({ favorites: {} }),
    }),
    {
      name: 'favorites-store',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    }
  )
);
