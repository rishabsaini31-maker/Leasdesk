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
      budget: '',
      message: '',
    },
  });

  const onSubmit = async (data: LeadCreateInput) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.details) {
          // Show first validation error
          const firstError = Object.values(result.details)[0]?.[0];
          toast.error(firstError || 'Validation failed');
        } else {
          toast.error(result.error || 'Something went wrong');
        }
        return;
      }

      toast.success('🎉 Lead submitted successfully! We\'ll be in touch soon.');
      reset();
      setValue('budget', '');
    } catch {
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="lead-form" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Get Started Today
          </h2>
          <p className="text-lg text-slate-600">
            Fill out the form below and our team will reach out within 24 hours.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 p-6 sm:p-8 rounded-2xl border border-slate-200 bg-slate-50/50 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-slate-700">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              {...register('name')}
              className="bg-white border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-slate-700">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register('email')}
              className="bg-white border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">
              Budget Range <span className="text-red-500">*</span>
            </Label>
            <Select onValueChange={(value) => setValue('budget', value, { shouldValidate: true })}>
              <SelectTrigger className="bg-white border-slate-300">
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
              <p className="text-sm text-red-500">{errors.budget.message}</p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium text-slate-700">
              Message <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              placeholder="Tell us about your project..."
              rows={4}
              {...register('message')}
              className="bg-white border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20 resize-none"
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message.message}</p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-base shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-200 transition-all duration-200"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Submit Inquiry
              </>
            )}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
