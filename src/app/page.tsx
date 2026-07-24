'use client';

import { useEffect, useState, useRef } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { HeroSection } from '@/components/landing/hero-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { WhyUsSection } from '@/components/landing/why-us-section';
import { LeadFormSection } from '@/components/landing/lead-form-section';
import { Footer } from '@/components/landing/footer';
import { LoginView } from '@/components/admin/login-view';
import { DashboardView } from '@/components/admin/dashboard-view';
import { Shield } from 'lucide-react';

function LandingPage() {
  const setView = useAuthStore((s) => s.setView);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-lg">
        Skip to main content
      </a>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-xs font-bold" aria-hidden="true">
              LD
            </div>
            <span className="font-bold text-slate-900">LeadDesk Mini</span>
          </div>
          <button
            onClick={() => setView('login')}
            aria-label="Admin login"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <Shield className="w-4 h-4" aria-hidden="true" />
            Admin
          </button>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <FeaturesSection />
        <WhyUsSection />
        <LeadFormSection />
      </main>

      <Footer />
    </div>
  );
}

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
  const prevView = useRef(view);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setAuth({ id: data.admin.id, email: data.admin.email });
        }
      } catch {
        // Not authenticated, stay on landing
      } finally {
        setChecking(false);
      }
    }
    checkAuth();
  }, [setAuth]);

  // Focus management on view change
  useEffect(() => {
    if (prevView.current !== view && !checking) {
      const main = document.getElementById('main-content');
      main?.focus({ preventScroll: true });
      prevView.current = view;
    }
  }, [view, checking]);

  if (checking) return <LoadingScreen />;

  if (view === 'login') return <LoginView />;
  if (view === 'dashboard') return <DashboardView />;
  return <LandingPage />;
}
