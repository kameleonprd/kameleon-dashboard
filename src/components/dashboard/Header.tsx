"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { User, Settings, LogOut, Globe, ChevronDown } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { navItems } from "./Sidebar";

type Locale = "en" | "es";

interface HeaderProps {
  locale?: Locale;
  onLocaleChange?: (locale: Locale) => void;
}

// Route to title mapping
const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/documents": "Documents",
  "/dashboard/personas": "Personas",
  "/dashboard/templates": "Templates",
  "/dashboard/axioms": "Axioms",
  "/dashboard/settings": "Settings",
};

// Get page title from pathname
function getPageTitle(pathname: string): string {
  // Check for exact match first
  if (routeTitles[pathname]) {
    return routeTitles[pathname];
  }

  // Check for parent route match
  for (const route of Object.keys(routeTitles).sort(
    (a, b) => b.length - a.length
  )) {
    if (pathname.startsWith(route)) {
      return routeTitles[route];
    }
  }

  return "Dashboard";
}

export function Header({ locale = "en", onLocaleChange }: HeaderProps) {
  const pathname = usePathname();
  const { user, signOut, isLoading } = useAuth();
  const pageTitle = getPageTitle(pathname);

  const handleLocaleChange = (newLocale: Locale) => {
    onLocaleChange?.(newLocale);
  };

  const localeLabels: Record<Locale, string> = {
    en: "English",
    es: "Espanol",
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 px-4 lg:px-8">
      <div className="flex items-center justify-between h-full">
        {/* Page Title */}
        <div className="flex items-center">
          {/* Spacer for mobile menu button */}
          <div className="w-12 lg:hidden" />
          <h1 className="text-xl font-semibold text-slate-900">{pageTitle}</h1>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{localeLabels[locale]}</span>
                <ChevronDown className="h-3 w-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => handleLocaleChange("en")}
                className={locale === "en" ? "bg-slate-100" : ""}
              >
                English
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleLocaleChange("es")}
                className={locale === "es" ? "bg-slate-100" : ""}
              >
                Espanol
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-indigo-600" />
                </div>
                <span className="hidden sm:inline max-w-[120px] truncate">
                  {user?.name || user?.email || "User"}
                </span>
                <ChevronDown className="h-3 w-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">
                    {user?.name || "User"}
                  </span>
                  <span className="text-xs text-slate-500 truncate">
                    {user?.email}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut()}
                disabled={isLoading}
                className="flex items-center gap-2 text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
