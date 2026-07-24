'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 mb-6">
            <Mail className="w-7 h-7" aria-hidden="true" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Let&apos;s Build Something Great Together
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Have questions or a project in mind? We&apos;d love to hear from you.
          </p>
          <a
            href="#lead-form"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
