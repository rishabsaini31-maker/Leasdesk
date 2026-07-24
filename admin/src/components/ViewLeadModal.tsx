'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, IndianRupee, Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { LeadStatus, STATUS_OPTIONS } from '@/types/lead';
import { StatusBadge } from '@/components/StatusBadge';

interface ViewLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: {
    id: string;
    name: string;
    email: string;
    budget: string;
    message: string;
    status: LeadStatus;
    createdAt: string;
  } | null;
}

export function ViewLeadModal({ isOpen, onClose, lead }: ViewLeadModalProps) {
  if (!lead) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg max-h-[90vh] overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-semibold text-slate-900">Lead Details</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-slate-500" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                    <User className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-500">Full Name</p>
                    <p className="font-medium text-slate-900">{lead.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-500">Email Address</p>
                    <a href={`mailto:${lead.email}`} className="font-medium text-blue-600 hover:underline">
                      {lead.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                    <IndianRupee className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-500">Budget Range</p>
                    <p className="font-medium text-slate-900">{lead.budget}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                    <Calendar className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-500">Created Date</p>
                    <p className="font-medium text-slate-900">{formatDate(lead.createdAt)}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <p className="text-sm text-slate-500 mb-2">Project Details</p>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{lead.message}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-sm text-slate-500">Status</span>
                  <StatusBadge status={lead.status} />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <Button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700">
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
