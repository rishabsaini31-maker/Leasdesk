import { create } from 'zustand';

export type AppView = 'landing' | 'login' | 'dashboard';

interface AdminUser {
  id: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  admin: AdminUser | null;
  view: AppView;
  setView: (view: AppView) => void;
  setAuth: (admin: AdminUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isAdmin: false,
  admin: null,
  view: 'landing',
  setView: (view) => set({ view }),
  setAuth: (admin) => set({ isAuthenticated: true, isAdmin: true, admin, view: 'dashboard' }),
  logout: () => set({ isAuthenticated: false, isAdmin: false, admin: null, view: 'landing' }),
}));
