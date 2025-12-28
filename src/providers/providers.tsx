"use client";

import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";

/**
 * Root Providers
 *
 * Wraps the application with global context providers.
 * AuthProvider is at root level so all pages (including auth pages) can use useAuth().
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
}
