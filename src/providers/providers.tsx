"use client";

import { QueryProvider } from "./QueryProvider";

/**
 * Root Providers
 *
 * Wraps the application with global context providers.
 *
 * Note: AuthProvider is applied at the (dashboard) layout level
 * to allow public routes (login, register, etc.) to render
 * without authentication checks.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
