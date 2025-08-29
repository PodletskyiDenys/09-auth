import { UserMe } from '@/types/user';
import { create } from 'zustand';


type AuthStore = {
  isAuthenticated: boolean;
  user: UserMe | null;
  setUser: (user: UserMe) => void;
  clearIsAuthenticated: () => void;
};
export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: UserMe) => {
    set(() => ({ user, isAuthenticated: true }));
  },
  clearIsAuthenticated: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },
}));