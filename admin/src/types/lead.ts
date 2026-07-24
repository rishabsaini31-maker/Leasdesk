export type LeadStatus = 'NEW' | 'CONTACTED' | 'CLOSED';

export type BudgetValue = '₹10,000–25,000' | '₹25,000–50,000' | '₹50,000–1,00,000' | 'Above ₹1,00,000';

export const BUDGET_VALUES = ['₹10,000–25,000', '₹25,000–50,000', '₹50,000–1,00,000', 'Above ₹1,00,000'] as const;

export const BUDGET_OPTIONS: { label: string; value: BudgetValue }[] = [
  { label: '₹10,000 – ₹25,000', value: '₹10,000–25,000' },
  { label: '₹25,000 – ₹50,000', value: '₹25,000–50,000' },
  { label: '₹50,000 – ₹1,00,000', value: '₹50,000–1,00,000' },
  { label: 'Above ₹1,00,000', value: 'Above ₹1,00,000' },
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
