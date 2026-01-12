import Link from 'next/link';
import { ArrowLeft, Phone, Edit } from 'lucide-react';
import { MascotHelper } from '@/components/mascot-helper';

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Back */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow">
                  <span className="text-lg">🦡</span>
                </div>
                <span className="text-lg font-black text-slate-800 hidden sm:inline">
                  Compare<span className="text-teal-600">Kat</span>
                </span>
              </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link
                href="/quote/car"
                className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-teal-600 font-medium transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span className="hidden sm:inline">Edit Details</span>
              </Link>
              
              <div className="h-6 w-px bg-slate-200" />
              
              <a
                href="tel:0800-123-4567"
                className="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">0800 123 4567</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-lg">🦡</span>
              </div>
              <span className="text-lg font-black">Compare<span className="text-teal-400">Kat</span></span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Complaints</Link>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-800 text-center md:text-left">
            <p className="text-xs text-slate-500">
              CompareKat Ltd is authorised and regulated by the Financial Conduct Authority (FCA). 
              Registered office: 1 Compare Street, London, EC1A 1AA. Company registration number: 12345678.
            </p>
          </div>
        </div>
      </footer>

      {/* Mascot Helper */}
      <MascotHelper showOnIdle={true} idleTimeMs={20000} />
    </div>
  );
}
