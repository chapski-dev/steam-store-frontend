import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string
};

type CartStore = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find(i => i.id === item.id);
        if (existing) {
          set({
            items: get().items.map(i =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, quantity: 1 }] });
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter(i => i.id !== id) });
      },
      clearCart: () => {
        set({ items: [] });
      },
      increment: (id) => {
        set({
          items: get().items.map(i =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        });
      },
      decrement: (id) => {
        set({
          items: get().items
            .map(i =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            )
            .filter(i => i.quantity > 0),
        });
      },
    }),
    {
      name: 'cart-storage', // localStorage key
    }
  )
);
