'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, LayoutDashboard, GitBranch } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: 'Fast Setup',
    description: 'Get up and running in minutes with our simple and intuitive setup process.',
  },
  {
    icon: Shield,
    title: 'Secure Data',
    description: 'Your data is protected with enterprise-grade security and encryption.',
  },
  {
    icon: LayoutDashboard,
    title: 'Modern Dashboard',
    description: 'A clean, powerful dashboard built for productivity and ease of use.',
  },
  {
    icon: GitBranch,
    title: 'Easy Lead Tracking',
    description: 'Track every lead from first contact to final conversion effortlessly.',
  },
];

export function WhyUsSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Why Businesses Choose LeadDesk Mini
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            LeadDesk Mini is built to help businesses simplify lead management. From capturing inquiries to tracking customer progress, every feature is designed for productivity, security, and ease of use.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-4">
                <benefit.icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{benefit.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
