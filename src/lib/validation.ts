import { z } from 'zod';

export const leadCreateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be at most 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  budget: z.string().min(1, 'Please select a budget range'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(500, 'Message must be at most 500 characters'),
});

export const leadStatusSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'CLOSED']),
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

export type LeadCreateInput = z.infer<typeof leadCreateSchema>;
export type LeadStatusInput = z.infer<typeof leadStatusSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
