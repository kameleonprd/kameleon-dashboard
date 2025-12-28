'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}

/**
 * AuthCard - Reusable card wrapper for auth forms
 *
 * Provides consistent styling for authentication pages with:
 * - Logo at top
 * - Title and optional description
 * - Content area for forms
 * - Link back to home
 */
export function AuthCard({
  children,
  title,
  description,
  className,
}: AuthCardProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <Link href="/" className="flex justify-center">
          <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-xl font-bold">K</span>
          </div>
        </Link>

        {/* Title */}
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {/* Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div
          className={cn(
            'bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-border',
            className
          )}
        >
          {children}
        </div>

        {/* Back to home link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
