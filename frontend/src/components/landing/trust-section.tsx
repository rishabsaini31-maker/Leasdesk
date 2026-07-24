'use client';

import { motion } from 'framer-motion';
import { TrendingUp, ShieldCheck, Headphones, Lock } from 'lucide-react';

const stats = [
  { label: 'Leads Managed', value: '500+', icon: TrendingUp },
  { label: 'System Uptime', value: '99.9%', icon: ShieldCheck },
  { label: 'Support', value: '24/7', icon: Headphones },
  { label: 'Secure Platform', value: '100%', icon: Lock },
];

export function TrustSection() {
  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 mb-4">
                <stat.icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
