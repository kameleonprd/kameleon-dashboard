import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-violet-700 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">Kameleon</span>
            </Link>
            <p className="text-sm text-gray-600 max-w-xs">
              Adapt your PRDs to reviewer preferences automatically. Reduce revision
              cycles by encoding stakeholder expectations into reusable profiles.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#features"
                  className="text-sm text-gray-600 hover:text-violet-600 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="text-sm text-gray-600 hover:text-violet-600 transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-sm text-gray-600 hover:text-violet-600 transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-sm text-gray-400 cursor-not-allowed">
                  About (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-sm text-gray-400 cursor-not-allowed">
                  Privacy (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-sm text-gray-400 cursor-not-allowed">
                  Terms (Coming Soon)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            &copy; {currentYear} Kameleon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
