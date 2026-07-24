import { z } from 'zod'

export const BUDGET_VALUES = ['₹10,000–25,000', '₹25,000–50,000', '₹50,000–1,00,000', 'Above ₹1,00,000'] as const
export type BudgetValue = typeof BUDGET_VALUES[number]

export const BUDGET_OPTIONS: { label: string; value: BudgetValue }[] = [
  { label: '₹10,000 – ₹25,000', value: '₹10,000–25,000' },
  { label: '₹25,000 – ₹50,000', value: '₹25,000–50,000' },
  { label: '₹50,000 – ₹1,00,000', value: '₹50,000–1,00,000' },
  { label: 'Above ₹1,00,000', value: 'Above ₹1,00,000' },
]

export const STATUS_OPTIONS: { label: string; value: string }[] = [
  { label: 'New', value: 'NEW' },
  { label: 'Contacted', value: 'CONTACTED' },
  { label: 'Closed', value: 'CLOSED' },
]

export type LeadStatus = 'NEW' | 'CONTACTED' | 'CLOSED'

export interface Lead {
  id: string
  name: string
  email: string
  budget: string
  message: string
  status: LeadStatus
  createdAt: string
  updatedAt: string
}

export interface LeadStats {
  total: number
  new: number
  contacted: number
  closed: number
}

export const leadCreateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be at most 100 characters').trim(),
  email: z.string().email('Please enter a valid email address').toLowerCase().trim(),
  budget: z.enum(BUDGET_VALUES, { message: 'Please select a valid budget range' }),
  message: z.string().min(10, 'Message must be at least 10 characters').max(500, 'Message must be at most 500 characters').trim(),
})

export const leadStatusSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'CLOSED']),
})

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email').toLowerCase().trim(),
  password: z.string().min(1, 'Password is required'),
})

export type LeadCreateInput = z.infer<typeof leadCreateSchema>
export type LeadStatusInput = z.infer<typeof leadStatusSchema>
export type LoginInput = z.infer<typeof loginSchema>
