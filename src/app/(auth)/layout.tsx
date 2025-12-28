import { Metadata } from 'next';

// Force dynamic rendering for all auth pages - they depend on runtime auth state
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    template: '%s | Kameleon',
    default: 'Authentication | Kameleon',
  },
  description: 'Sign in or create an account to access Kameleon PRD Assistant',
};

/**
 * Auth Layout
 *
 * Layout wrapper for authentication pages (login, register, etc.)
 * Provides a centered card design with consistent styling
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/50">
      {children}
    </div>
  );
}
