'use client';

import { motion } from 'framer-motion';
import { Target, BarChart3, Shield, Zap, Users, Globe } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Smart Lead Capture',
    description: 'Beautiful, validated forms that convert visitors into qualified leads with minimal friction.',
  },
  {
    icon: BarChart3,
    title: 'Real-time Dashboard',
    description: 'Track every lead with a powerful admin dashboard. Search, filter, and update statuses instantly.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'JWT authentication, bcrypt hashing, HttpOnly cookies, and input validation at every layer.',
  },
  {
    icon: Zap,
    title: 'Blazing Fast',
    description: 'Built on Next.js with server-side rendering, optimized for speed and SEO out of the box.',
  },
  {
    icon: Users,
    title: 'Status Management',
    description: 'Track leads through NEW → CONTACTED → CLOSED pipeline with one-click status updates.',
  },
  {
    icon: Globe,
    title: 'Deployment Ready',
    description: 'One-click deploy to Vercel, Render, and Supabase. Production-ready from day one.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FeaturesSection() {
  return (
    <section id="features" aria-labelledby="features-heading" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A complete lead management system with every feature you need to capture, track, and convert leads.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative p-6 rounded-2xl border border-slate-200 bg-white hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors duration-300" aria-hidden="true">
                <feature.icon className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
