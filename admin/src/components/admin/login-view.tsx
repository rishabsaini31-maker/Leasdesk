'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft, Lock, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginSchema } from '@/lib/validation';
import { useAuthStore } from '@/stores/auth-store';
import type { LoginInput } from '@/lib/validation';

const emailId = 'login-email';
const passwordId = 'login-password';
const emailErrId = 'login-email-err';
const passwordErrId = 'login-password-err';

export function LoginView() {
  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);
  const setView = useAuthStore((s) => s.setView);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || 'Login failed');
        return;
      }

      setAuth({ id: result.admin.id, email: result.admin.email });
      toast.success('Welcome back, Admin!');
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <a href="http://localhost:3000">
          <Button
            variant="ghost"
            className="mb-8 text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Back to Home
          </Button>
        </a>

        <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center mx-auto mb-4" aria-hidden="true">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 ref={headingRef} tabIndex={-1} className="text-2xl font-bold text-slate-900 outline-none">
              Admin Login
            </h1>
            <p className="text-slate-500 mt-1">Sign in to access the dashboard</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div className="space-y-2">
              <Label htmlFor={emailId} className="text-sm font-medium text-slate-700">
                <Mail className="w-4 h-4 inline mr-1.5" aria-hidden="true" />
                Email
              </Label>
              <Input
                id={emailId}
                type="email"
                placeholder="admin@leaddesk.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? emailErrId : undefined}
                {...register('email')}
                className="bg-slate-50 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20"
              />
              {errors.email && (
                <p id={emailErrId} className="text-sm text-red-500" role="alert">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={passwordId} className="text-sm font-medium text-slate-700">
                <Lock className="w-4 h-4 inline mr-1.5" aria-hidden="true" />
                Password
              </Label>
              <Input
                id={passwordId}
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? passwordErrId : undefined}
                {...register('password')}
                className="bg-slate-50 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20"
              />
              {errors.password && (
                <p id={passwordErrId} className="text-sm text-red-500" role="alert">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
