'use client';

import { Navbar } from '@/components/landing/navbar';
import { HeroSection } from '@/components/landing/hero-section';
import { TrustSection } from '@/components/landing/trust-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { WhyUsSection } from '@/components/landing/why-us-section';
import { CTASection } from '@/components/landing/cta-section';
import { LeadFormSection } from '@/components/landing/lead-form-section';
import { ContactSection } from '@/components/landing/contact-section';
import { Footer } from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg">
        Skip to main content
      </a>
      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <TrustSection />
        <FeaturesSection />
        <WhyUsSection />
        <CTASection />
        <LeadFormSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
