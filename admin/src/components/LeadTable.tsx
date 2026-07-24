'use client';

import { Lead, LeadStatus } from '@/types/lead';
import { LeadRow } from '@/components/LeadRow';
import { Pagination } from '@/components/Pagination';
import { EmptyState } from '@/components/EmptyState';

interface LeadTableProps {
  leads: Lead[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onView: (lead: Lead) => void;
  onStatusChange: (leadId: string, status: LeadStatus) => Promise<void>;
}

export function LeadTable({
  leads,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  onView,
  onStatusChange,
}: LeadTableProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-slate-100 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (leads.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Name</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700 hidden sm:table-cell">Email</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700 hidden sm:table-cell">Budget</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700 hidden md:table-cell">Message</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700 hidden lg:table-cell">Created</th>
              <th className="text-right px-4 py-3 text-sm font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <LeadRow
                key={lead.id}
                lead={lead}
                onView={onView}
                onStatusChange={onStatusChange}
              />
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="p-4 border-t border-slate-100">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
