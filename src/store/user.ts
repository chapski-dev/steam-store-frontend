// store/userStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface UserStore {
  user: User | null;
  loginUser: (userData: User) => void;
  logoutUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      loginUser: (userData) => set({ user: userData }),
      logoutUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage', // Уникальное имя для localStorage
      storage: createJSONStorage(() => localStorage), // Используем localStorage
    }
  )
);