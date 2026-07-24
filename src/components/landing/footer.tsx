'use client';

import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-semibold text-lg">
            <span className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-sm font-bold">
              LD
            </span>
            LeadDesk Mini
          </div>
          <p className="text-sm text-center">
            Built for{' '}
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors underline underline-offset-4"
            >
              Digital Heroes Training Task
            </a>
          </p>
          <p className="text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Digital Heroes
          </p>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-xs">
          © {new Date().getFullYear()} LeadDesk Mini. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
