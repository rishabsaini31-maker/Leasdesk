'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { leadCreateSchema } from '@/lib/validation';
import { BUDGET_OPTIONS } from '@/types/lead';
import type { LeadCreateInput } from '@/lib/validation';

const nameId = 'lead-name';
const emailId = 'lead-email';
const budgetId = 'lead-budget';
const messageId = 'lead-message';
const nameErrId = 'lead-name-err';
const emailErrId = 'lead-email-err';
const budgetErrId = 'lead-budget-err';
const messageErrId = 'lead-message-err';

export function LeadFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<LeadCreateInput>({
    resolver: zodResolver(leadCreateSchema),
    defaultValues: {
      name: '',
      email: '',
      budget: undefined,
      message: '',
    },
  });

  const onSubmit = async (data: LeadCreateInput) => {
    setIsSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const res = await fetch(`${apiUrl}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        const fieldErrors = result.details as Record<string, string[]>;
        const firstError = Object.values(fieldErrors)[0]?.[0];
        toast.error(firstError || result.error || 'Something went wrong. Please try again.');
        return;
      }

      toast.success('Your request has been submitted successfully.');
      reset();
      setValue('budget', undefined);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="lead-form" className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Request a Free Consultation
          </h2>
          <p className="text-lg text-slate-600">
            Tell us about your project. We&apos;ll get back to you as soon as possible.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          noValidate
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor={nameId}>Full Name</Label>
              <Input
                id={nameId}
                placeholder="John Doe"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? nameErrId : undefined}
                {...register('name')}
                className="bg-white"
              />
              {errors.name && (
                <p id={nameErrId} className="text-sm text-red-500" role="alert">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={emailId}>Email Address</Label>
              <Input
                id={emailId}
                type="email"
                placeholder="john@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? emailErrId : undefined}
                {...register('email')}
                className="bg-white"
              />
              {errors.email && (
                <p id={emailErrId} className="text-sm text-red-500" role="alert">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={budgetId}>Budget Range</Label>
            <Select onValueChange={(value) => setValue('budget', value as LeadCreateInput['budget'], { shouldValidate: true })}>
              <SelectTrigger id={budgetId} aria-invalid={!!errors.budget} aria-describedby={errors.budget ? budgetErrId : undefined} className="bg-white">
                <SelectValue placeholder="Select your budget" />
              </SelectTrigger>
              <SelectContent>
                {BUDGET_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.budget && (
              <p id={budgetErrId} className="text-sm text-red-500" role="alert">{errors.budget.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor={messageId}>Project Details</Label>
            <Textarea
              id={messageId}
              placeholder="Tell us about your project..."
              rows={4}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? messageErrId : undefined}
              {...register('message')}
              className="bg-white resize-none"
            />
            {errors.message && (
              <p id={messageErrId} className="text-sm text-red-500" role="alert">{errors.message.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base shadow-lg shadow-blue-200"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" aria-hidden="true" />
                <span>Submit Request</span>
              </>
            )}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
