'use client';

import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LeadStatus, STATUS_OPTIONS } from '@/types/lead';
import { StatusBadge } from '@/components/StatusBadge';
import { toast } from 'sonner';

interface StatusDropdownProps {
  leadId: string;
  currentStatus: LeadStatus;
  onUpdate: (leadId: string, status: LeadStatus) => Promise<void>;
}

export function StatusDropdown({ leadId, currentStatus, onUpdate }: StatusDropdownProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = async (newStatus: LeadStatus) => {
    if (newStatus === currentStatus) {
      setOpen(false);
      return;
    }

    setLoading(true);
    try {
      await onUpdate(leadId, newStatus);
      toast.success('Lead status updated successfully');
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(!open)}
        disabled={loading}
        className="h-8 px-2 gap-1"
      >
        {loading ? (
          <Loader2 className="w-3 h-3 animate-spin" aria-hidden="true" />
        ) : (
          <StatusBadge status={currentStatus} />
        )}
      </Button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute z-50 mt-1 w-40 bg-white rounded-lg border border-slate-200 shadow-lg py-1">
            {STATUS_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleChange(option.value as LeadStatus)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-slate-50 transition-colors"
              >
                <StatusBadge status={option.value as LeadStatus} />
                {option.value === currentStatus && (
                  <Check className="w-3 h-3 text-slate-400 ml-auto" aria-hidden="true" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
