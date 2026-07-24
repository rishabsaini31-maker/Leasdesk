import { Badge } from '@/components/ui/badge';
import { LeadStatus, STATUS_OPTIONS } from '@/types/lead';

const STATUS_STYLES: Record<LeadStatus, string> = {
  NEW: 'bg-blue-50 text-blue-700 border-blue-200',
  CONTACTED: 'bg-amber-50 text-amber-700 border-amber-200',
  CLOSED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  const label = STATUS_OPTIONS.find((s) => s.value === status)?.label || status;
  return (
    <Badge variant="outline" className={`${STATUS_STYLES[status]} font-medium`}>
      {label}
    </Badge>
  );
}
