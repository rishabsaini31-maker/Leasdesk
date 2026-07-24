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
  token: string | null;
  view: AppView;
  setView: (view: AppView) => void;
  setAuth: (admin: AdminUser, token?: string) => void;
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
      token: null,
      view: 'landing',
      setView: (view) => set({ view }),
      setAuth: (admin, token) => set({ isAuthenticated: true, isAdmin: true, admin, token: token || null, view: 'dashboard' }),
      logout: () => set({ isAuthenticated: false, isAdmin: false, admin: null, token: null, view: 'landing' }),
    }),
    {
      name: 'auth-storage',
      storage,
    }
  )
);

export const getAuthHeaders = (): Record<string, string> => {
  const token = useAuthStore.getState().token;
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

export const validateSession = async (): Promise<boolean> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const headers = getAuthHeaders();
    if (!headers.Authorization) {
      return false;
    }
    const res = await fetch(`${apiUrl}/api/auth/me`, {
      headers,
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
