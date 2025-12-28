"use client";

import { useAuth } from "@/providers/AuthProvider";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

/**
 * Dashboard Layout
 *
 * Wraps all dashboard pages with:
 * - DashboardShell for layout (sidebar, header)
 *
 * AuthProvider is at root level (providers.tsx).
 * Redirects to /login if not authenticated (handled by AuthProvider).
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isInitializing, isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking auth
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  // AuthProvider will redirect if not authenticated
  // But we still render nothing while redirecting
  if (!isAuthenticated && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-500">Redirecting...</p>
        </div>
      </div>
    );
  }

  return <DashboardShell>{children}</DashboardShell>;
}
