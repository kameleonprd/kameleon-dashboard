'use client';

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, ArrowLeft, CheckCircle, Check, X } from 'lucide-react';
import { z } from 'zod';
import { confirmForgotPassword, forgotPassword } from '@/lib/auth';
import { AuthCard } from '@/components/auth/AuthCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Password requirements
const passwordRequirements = {
  length: { regex: /.{8,}/, label: 'At least 8 characters' },
  uppercase: { regex: /[A-Z]/, label: 'One uppercase letter' },
  lowercase: { regex: /[a-z]/, label: 'One lowercase letter' },
  number: { regex: /[0-9]/, label: 'One number' },
  special: { regex: /[!@#$%^&*(),.?":{}|<>]/, label: 'One special character' },
};

// Validation schema
const resetPasswordSchema = z
  .object({
    email: z.string().email('Please enter a valid email address'),
    code: z
      .string()
      .length(6, 'Verification code must be 6 digits')
      .regex(/^\d+$/, 'Code must contain only numbers'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain an uppercase letter')
      .regex(/[a-z]/, 'Password must contain a lowercase letter')
      .regex(/[0-9]/, 'Password must contain a number')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain a special character'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

/**
 * Reset Password Content
 *
 * Internal component that uses useSearchParams
 */
function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email');

  const [formData, setFormData] = useState({
    email: emailParam || '',
    code: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  // Password validation state
  const passwordValidation = {
    length: passwordRequirements.length.regex.test(formData.newPassword),
    uppercase: passwordRequirements.uppercase.regex.test(formData.newPassword),
    lowercase: passwordRequirements.lowercase.regex.test(formData.newPassword),
    number: passwordRequirements.number.regex.test(formData.newPassword),
    special: passwordRequirements.special.regex.test(formData.newPassword),
  };

  const allPasswordRequirementsMet = Object.values(passwordValidation).every(
    (v) => v
  );
  const passwordsMatch =
    formData.newPassword === formData.confirmPassword &&
    formData.confirmPassword.length > 0;

  // Update email if param changes
  useEffect(() => {
    if (emailParam) {
      setFormData((prev) => ({ ...prev, email: emailParam }));
    }
  }, [emailParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Handle code input - only allow digits
    if (name === 'code') {
      const digits = value.replace(/\D/g, '').slice(0, 6);
      setFormData((prev) => ({ ...prev, code: digits }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResendMessage('');

    // Validate
    const result = resetPasswordSchema.safeParse(formData);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    try {
      const response = await confirmForgotPassword(
        formData.email,
        formData.code,
        formData.newPassword
      );

      if (response.success) {
        setSuccess(true);
      } else {
        setError(response.error || 'Failed to reset password');
        setIsLoading(false);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!formData.email) {
      setError('Email is required to resend code');
      return;
    }

    setIsResending(true);
    setError('');
    setResendMessage('');

    try {
      const response = await forgotPassword(formData.email);

      if (response.success) {
        setResendMessage('New code sent! Check your email.');
      } else {
        setError(response.error || 'Failed to resend code');
      }
    } catch (err) {
      setError('Failed to resend code');
    } finally {
      setIsResending(false);
    }
  };

  // Success state
  if (success) {
    return (
      <AuthCard
        title="Password Reset"
        description="Your password has been updated"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <p className="mb-6 text-muted-foreground">
            Your password has been reset successfully. You can now sign in with
            your new password.
          </p>
          <Button asChild className="w-full">
            <Link href="/login">Go to Sign In</Link>
          </Button>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Reset Password"
      description="Enter the code and your new password"
    >
      {error && (
        <div className="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {resendMessage && (
        <div className="mb-4 rounded-md bg-green-100 p-3 text-sm text-green-800">
          {resendMessage}
        </div>
      )}

      {formData.email && (
        <div className="mb-6 rounded-md bg-muted p-3 text-center">
          <p className="text-sm text-muted-foreground">
            Enter the code sent to{' '}
            <span className="font-medium text-foreground">{formData.email}</span>
          </p>
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        {!emailParam && (
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              disabled={isLoading}
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="code">Verification Code</Label>
          <Input
            id="code"
            name="code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            value={formData.code}
            onChange={handleChange}
            placeholder="123456"
            disabled={isLoading}
            className="text-center text-xl tracking-widest"
            maxLength={6}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <div className="relative">
            <Input
              id="newPassword"
              name="newPassword"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              disabled={isLoading}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Password requirements */}
          {formData.newPassword && (
            <div className="mt-2 rounded-md bg-muted p-3">
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Password requirements:
              </p>
              <div className="grid grid-cols-2 gap-1">
                {Object.entries(passwordRequirements).map(([key, { label }]) => {
                  const isValid =
                    passwordValidation[key as keyof typeof passwordValidation];
                  return (
                    <div
                      key={key}
                      className="flex items-center gap-1 text-xs"
                    >
                      {isValid ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <X className="h-3 w-3 text-muted-foreground" />
                      )}
                      <span
                        className={
                          isValid ? 'text-green-600' : 'text-muted-foreground'
                        }
                      >
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              disabled={isLoading}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
              disabled={isLoading}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {formData.confirmPassword && !passwordsMatch && (
            <p className="mt-1 text-xs text-destructive">
              Passwords do not match
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
          disabled={!allPasswordRequirementsMet || !passwordsMatch}
        >
          Reset Password
        </Button>
      </form>

      <div className="mt-6 flex flex-col items-center gap-2 text-sm">
        <button
          type="button"
          onClick={handleResendCode}
          disabled={isResending}
          className="font-medium text-primary hover:text-primary/80 disabled:opacity-50"
        >
          {isResending ? 'Sending...' : 'Resend code'}
        </button>
        <Link
          href="/login"
          className="inline-flex items-center text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Sign In
        </Link>
      </div>
    </AuthCard>
  );
}

/**
 * Reset Password Page
 *
 * Allows users to reset their password with a verification code.
 * Features:
 * - Email from query param or input
 * - Verification code input
 * - New password with requirements
 * - Confirm password validation
 * - Resend code option
 * - Redirects to login on success
 */
export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <AuthCard title="Reset Password" description="Loading...">
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        </AuthCard>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
