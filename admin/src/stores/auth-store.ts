import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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

const storage = createJSONStorage(() => {
  if (typeof window !== 'undefined') {
    return sessionStorage;
  }
  return {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  };
});

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isAdmin: false,
      admin: null,
      view: 'landing',
      setView: (view) => set({ view }),
      setAuth: (admin) => set({ isAuthenticated: true, isAdmin: true, admin, view: 'dashboard' }),
      logout: () => set({ isAuthenticated: false, isAdmin: false, admin: null, view: 'landing' }),
    }),
    {
      name: 'auth-storage',
      storage,
    }
  )
);

export const validateSession = async (): Promise<boolean> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const res = await fetch(`${apiUrl}/api/auth/me`, {
      credentials: 'include',
    });
    if (res.ok) {
      const data = await res.json();
      useAuthStore.getState().setAuth({ id: data.admin.id, email: data.admin.email });
      return true;
    }
    return false;
  } catch {
    return false;
  }
};
