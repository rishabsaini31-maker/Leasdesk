export type LeadStatus = 'NEW' | 'CONTACTED' | 'CLOSED';

export type BudgetValue = '₹10k–25k' | '₹25k–50k' | '₹50k–1L' | '₹1L+';

export const BUDGET_VALUES = ['₹10k–25k', '₹25k–50k', '₹50k–1L', '₹1L+'] as const;

export const BUDGET_OPTIONS: { label: string; value: BudgetValue }[] = [
  { label: '₹10k – ₹25k', value: '₹10k–25k' },
  { label: '₹25k – ₹50k', value: '₹25k–50k' },
  { label: '₹50k – ₹1L', value: '₹50k–1L' },
  { label: '₹1L+', value: '₹1L+' },
];

export const STATUS_OPTIONS: { label: string; value: LeadStatus }[] = [
  { label: 'New', value: 'NEW' },
  { label: 'Contacted', value: 'CONTACTED' },
  { label: 'Closed', value: 'CLOSED' },
];

export interface Lead {
  id: string;
  name: string;
  email: string;
  budget: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

export interface LeadStats {
  total: number;
  new: number;
  contacted: number;
  closed: number;
}