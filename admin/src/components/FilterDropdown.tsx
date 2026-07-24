'use client';

import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LeadStatus } from '@/types/lead';

interface FilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}

export function FilterDropdown({ value, onChange, options }: FilterDropdownProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-slate-300 text-slate-700 text-sm rounded-lg px-4 py-2 pr-8 focus:border-blue-500 focus:ring-blue-500/20 outline-none cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" aria-hidden="true" />
    </div>
  );
}
