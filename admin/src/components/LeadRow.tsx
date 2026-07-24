'use client';

import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Lead, LeadStatus } from '@/types/lead';
import { StatusBadge } from '@/components/StatusBadge';
import { StatusDropdown } from '@/components/StatusDropdown';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface LeadRowProps {
  lead: Lead;
  onView: (lead: Lead) => void;
  onStatusChange: (leadId: string, status: LeadStatus) => Promise<void>;
}

export function LeadRow({ lead, onView, onStatusChange }: LeadRowProps) {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="group border-b border-slate-100 hover:bg-slate-50 transition-colors"
    >
      <td className="px-4 py-4">
        <div>
          <p className="font-medium text-slate-900">{lead.name}</p>
          <p className="text-sm text-slate-500 sm:hidden">{lead.email}</p>
        </div>
      </td>
      <td className="px-4 py-4 hidden sm:table-cell">
        <span className="text-sm text-slate-600">{lead.email}</span>
      </td>
      <td className="px-4 py-4 hidden sm:table-cell">
        <span className="text-sm text-slate-600">{lead.budget}</span>
      </td>
      <td className="px-4 py-4 hidden md:table-cell max-w-[200px]">
        <p className="text-sm text-slate-600 truncate" title={lead.message}>
          {lead.message}
        </p>
      </td>
      <td className="px-4 py-4">
        <StatusDropdown
          leadId={lead.id}
          currentStatus={lead.status}
          onUpdate={onStatusChange}
        />
      </td>
      <td className="px-4 py-4 hidden lg:table-cell">
        <span className="text-sm text-slate-500">
          {format(new Date(lead.createdAt), 'MMM dd, yyyy')}
        </span>
      </td>
      <td className="px-4 py-4 text-right">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onView(lead)}
          className="text-slate-600 hover:text-blue-600"
          aria-label={`View ${lead.name}`}
        >
          <Eye className="w-4 h-4" aria-hidden="true" />
        </Button>
      </td>
    </motion.tr>
  );
}
