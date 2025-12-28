'use client';

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, CheckCircle } from 'lucide-react';
import { z } from 'zod';
import { confirmSignUp, resendConfirmationCode } from '@/lib/auth';
import { AuthCard } from '@/components/auth/AuthCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Validation schema
const verifySchema = z.object({
  code: z
    .string()
    .length(6, 'Verification code must be 6 digits')
    .regex(/^\d+$/, 'Code must contain only numbers'),
});

/**
 * Verify Email Content
 *
 * Internal component that uses useSearchParams
 */
function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email');

  const [email, setEmail] = useState(emailParam || '');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  // Update email if param changes
  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [emailParam]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits and limit to 6 characters
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(value);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResendMessage('');

    // Validate
    const result = verifySchema.safeParse({ code });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    if (!email) {
      setError('Email is required');
      return;
    }

    setIsLoading(true);

    try {
      const response = await confirmSignUp(email, code);

      if (response.success) {
        setSuccess(true);
        // Redirect to login after a short delay
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(response.error || 'Invalid verification code');
        setIsLoading(false);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError('Email is required to resend code');
      return;
    }

    setIsResending(true);
    setError('');
    setResendMessage('');

    try {
      const response = await resendConfirmationCode(email);

      if (response.success) {
        setResendMessage('Verification code sent! Check your email.');
      } else {
        setError(response.error || 'Failed to resend code');
      }
    } catch (err) {
      setError('Failed to resend verification code');
    } finally {
      setIsResending(false);
    }
  };

  // Success state
  if (success) {
    return (
      <AuthCard title="Email Verified" description="Your email has been confirmed">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <p className="mb-6 text-muted-foreground">
            Your email has been verified successfully. Redirecting to login...
          </p>
          <Button asChild className="w-full">
            <Link href="/login">Go to Login</Link>
          </Button>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Verify Your Email"
      description="Enter the verification code sent to your email"
    >
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        {email && (
          <p className="text-sm text-muted-foreground">
            We sent a code to <span className="font-medium text-foreground">{email}</span>
          </p>
        )}
      </div>

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

      <form className="space-y-6" onSubmit={handleSubmit}>
        {!emailParam && (
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            value={code}
            onChange={handleCodeChange}
            placeholder="123456"
            disabled={isLoading}
            className="text-center text-2xl tracking-widest"
            maxLength={6}
          />
        </div>

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Verify Email
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Didn't receive the code?{' '}
          <button
            onClick={handleResend}
            disabled={isResending}
            className="font-medium text-primary hover:text-primary/80 disabled:opacity-50"
          >
            {isResending ? 'Sending...' : 'Resend code'}
          </button>
        </p>
      </div>

      <div className="mt-4 text-center">
        <Link
          href="/login"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Back to Sign In
        </Link>
      </div>
    </AuthCard>
  );
}

/**
 * Verify Email Page
 *
 * Allows users to verify their email with a 6-digit code.
 * Features:
 * - Shows email from query param
 * - 6-digit code input
 * - Resend code functionality
 * - Redirects to login on success
 */
export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <AuthCard title="Verify Your Email" description="Loading...">
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        </AuthCard>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
