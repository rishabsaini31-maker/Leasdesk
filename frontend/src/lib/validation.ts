import { z } from 'zod';
import { BUDGET_VALUES } from '@/types/lead';

export const leadCreateSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters')
    .trim(),
  email: z.string().email('Please enter a valid email address').toLowerCase().trim(),
  budget: z.enum(BUDGET_VALUES, { message: 'Please select a valid budget range' }),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must be at most 500 characters')
    .trim(),
});

export const leadStatusSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'CLOSED']),
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email').toLowerCase().trim(),
  password: z.string().min(1, 'Password is required'),
});

export type LeadCreateInput = z.infer<typeof leadCreateSchema>;
export type LeadStatusInput = z.infer<typeof leadStatusSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
