'use client';

import { HeroSection } from '@/components/landing/hero-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { WhyUsSection } from '@/components/landing/why-us-section';
import { LeadFormSection } from '@/components/landing/lead-form-section';
import { Footer } from '@/components/landing/footer';

function LandingPage() {
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
          <a
            href="http://localhost:3001"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            Admin Login
          </a>
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

export default function Home() {
  return <LandingPage />;
}
