import Link from 'next/link';
import { ArrowLeft, Phone } from 'lucide-react';
import { MascotHelper } from '@/components/mascot-helper';

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Simplified Header for Quote Journey */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Back & Logo */}
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Πίσω στην αρχική</span>
              </Link>
              
              <div className="h-8 w-px bg-slate-200" />
              
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow">
                  <span className="text-lg">🔍</span>
                </div>
                <span className="text-lg font-black text-slate-800 hidden sm:inline">
                  Syg<span className="text-teal-600">rineto</span>
                </span>
              </Link>
            </div>

            {/* Help */}
            <div className="flex items-center gap-4">
              <a
                href="tel:210-123-4567"
                className="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">Βοήθεια; 210 123 4567</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Minimal Footer */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>© 2024 Sygrineto ΑΕ. Με επιφύλαξη παντός δικαιώματος.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-slate-700 transition-colors">Απόρρητο</Link>
              <Link href="#" className="hover:text-slate-700 transition-colors">Όροι</Link>
              <Link href="#" className="hover:text-slate-700 transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Mascot Helper - More aggressive during quote journey */}
      <MascotHelper showOnIdle={true} idleTimeMs={10000} />
    </div>
  );
}
