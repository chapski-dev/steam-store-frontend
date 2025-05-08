import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FavoriteItem = {
  id: string;
  name: string;
  price: number;
  image: string
};

type FavoriteStore = {
  favorites: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (id: string) => void;
};

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addToFavorites: (product) => {
        const favorites = get().favorites;
        if (!favorites.some((item) => item.id === product.id)) {
          set({ favorites: [...favorites, product] });
        }
      },
      removeFromFavorites: (id) => {
        set({
          favorites: get().favorites.filter((i) => i.id !== id),
        });
      },
    }),
    {
      name: 'favorite-storage',
    }
  )
);