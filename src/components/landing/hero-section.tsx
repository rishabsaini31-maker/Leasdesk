'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section aria-label="Introduction" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-emerald-50/50" aria-hidden="true" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-200/15 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium mb-8">
            <Zap className="w-4 h-4" aria-hidden="true" />
            Powerful Lead Management
          </div>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Capture Leads.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
            Grow Faster.
          </span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          LeadDesk Mini streamlines your lead pipeline from capture to conversion.
          Beautiful forms, instant tracking, and a powerful admin dashboard — all in one place.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button
            size="lg"
            onClick={scrollToForm}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg shadow-lg shadow-emerald-200 transition-all duration-200 hover:shadow-xl hover:shadow-emerald-200 hover:-translate-y-0.5"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-6 text-lg border-slate-300 hover:bg-slate-50 transition-all duration-200"
          >
            Learn More
          </Button>
        </motion.div>

        <motion.div
          className="mt-16 flex items-center justify-center gap-8 text-sm text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
            No credit card
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
            5-sec setup
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
            100% free
          </span>
        </motion.div>
      </div>
    </section>
  );
}
