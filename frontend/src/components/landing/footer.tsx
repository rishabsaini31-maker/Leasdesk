import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold text-lg mb-3">LeadDesk Mini</h3>
            <p className="text-sm leading-relaxed">
              A modern lead management solution designed to capture, organize, and track customer inquiries with ease.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#main-content" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">Features</a>
              </li>
              <li>
                <a href="#lead-form" className="hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Get in Touch</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:support@leaddeskmini.com" className="hover:text-white transition-colors">support@leaddeskmini.com</a>
              </li>
              <li className="hover:text-white transition-colors">+91 XXXXX XXXXX</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 LeadDesk Mini. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" aria-hidden="true" /> for{' '}
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors underline underline-offset-4"
            >
              Digital Heroes Training Task
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
