'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Clock, HeadphonesIcon, TrendingUp } from 'lucide-react';

const reasons = [
  {
    icon: TrendingUp,
    title: 'Increase Conversions',
    description: 'Optimized forms and instant follow-up workflows help convert more visitors into paying customers.',
  },
  {
    icon: Clock,
    title: 'Save 10+ Hours/Week',
    description: 'Automate lead tracking and status management. No more spreadsheets or lost follow-ups.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Never Miss a Lead',
    description: 'Real-time notifications and a centralized dashboard ensure every lead gets attention.',
  },
  {
    icon: CheckCircle2,
    title: 'Production Ready',
    description: 'Built with Next.js, TypeScript, and Prisma. Clean architecture that scales with your business.',
  },
];

export function WhyUsSection() {
  return (
    <section aria-labelledby="why-us-heading" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="why-us-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Why Choose LeadDesk Mini?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Trusted by teams who want a simple, powerful, and beautiful lead management system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              className="flex gap-5 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-200" aria-hidden="true">
                <reason.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">{reason.title}</h3>
                <p className="text-slate-600 leading-relaxed">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
