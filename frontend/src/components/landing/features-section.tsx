'use client';

import { motion } from 'framer-motion';
import { UserPlus, LayoutDashboard, Activity, Search, ShieldCheck, MonitorSmartphone } from 'lucide-react';
import { FeatureCard } from './feature-card';

const features = [
  {
    icon: UserPlus,
    title: 'Lead Capture',
    description: 'Collect customer inquiries through an intuitive and secure lead form.',
  },
  {
    icon: LayoutDashboard,
    title: 'Lead Dashboard',
    description: 'Manage all submitted leads from one centralized dashboard.',
  },
  {
    icon: Activity,
    title: 'Real-Time Status Tracking',
    description: 'Track lead progress using New, Contacted, and Closed statuses.',
  },
  {
    icon: Search,
    title: 'Fast Search',
    description: 'Instantly search leads by name or email.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Authentication',
    description: 'Protect your admin dashboard using secure login and authentication.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Responsive Experience',
    description: 'Optimized for desktop, tablet, and mobile devices.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Everything You Need to Manage Your Leads
          </h2>
          <p className="text-lg text-slate-600">
            Powerful features designed to simplify lead management and improve your sales workflow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
