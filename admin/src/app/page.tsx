'use client';

import { useEffect, useState, useRef } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { LoginView } from '@/components/admin/login-view';
import { DashboardView } from '@/components/admin/dashboard-view';

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50" role="status" aria-label="Loading">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-[3px] border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
        <p className="text-sm text-slate-500">Loading...</p>
      </div>
    </div>
  );
}

export default function Home() {
  const view = useAuthStore((s) => s.view);
  const setAuth = useAuthStore((s) => s.setAuth);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`);
        if (res.ok) {
          const data = await res.json();
          setAuth({ id: data.admin.id, email: data.admin.email });
        }
      } catch {
        // Not authenticated
      } finally {
        setChecking(false);
      }
    }
    checkAuth();
  }, [setAuth]);

  if (checking) return <LoadingScreen />;

  if (view === 'login') return <LoginView />;
  if (view === 'dashboard') return <DashboardView />;
  return <LoginView />;
}
