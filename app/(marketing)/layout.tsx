import Link from 'next/link';
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import { MascotHelper } from '@/components/mascot-helper';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-slate-900 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:0800-123-4567" className="flex items-center gap-2 hover:text-teal-400 transition-colors">
              <Phone className="w-4 h-4" />
              0800 123 4567
            </a>
            <a href="mailto:help@compareket.com" className="hidden sm:flex items-center gap-2 hover:text-teal-400 transition-colors">
              <Mail className="w-4 h-4" />
              help@comparekat.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hover:text-teal-400 transition-colors">Sign In</Link>
            <Link href="/register" className="px-4 py-1 bg-teal-600 rounded-full hover:bg-teal-700 transition-colors">Register</Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🦡</span>
              </div>
              <div>
                <span className="text-xl font-black text-slate-800">Compare<span className="text-teal-600">Kat</span></span>
                <span className="block text-xs text-slate-500">Simples!</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="relative group">
                <button className="flex items-center gap-1 text-slate-700 font-medium hover:text-teal-600 transition-colors py-2">
                  Insurance
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                  <div className="p-4 space-y-1">
                    <Link href="/quote/car" className="block px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-teal-600 transition-colors">
                      🚗 Car Insurance
                    </Link>
                    <Link href="/insurance/home" className="block px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-teal-600 transition-colors">
                      🏠 Home Insurance
                    </Link>
                    <Link href="/insurance/pet" className="block px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-teal-600 transition-colors">
                      🐕 Pet Insurance
                    </Link>
                    <Link href="/insurance/travel" className="block px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-teal-600 transition-colors">
                      ✈️ Travel Insurance
                    </Link>
                    <Link href="/insurance/life" className="block px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-teal-600 transition-colors">
                      ❤️ Life Insurance
                    </Link>
                  </div>
                </div>
              </div>
              
              <Link href="/insurance/energy" className="text-slate-700 font-medium hover:text-teal-600 transition-colors">
                Energy
              </Link>
              <Link href="/about" className="text-slate-700 font-medium hover:text-teal-600 transition-colors">
                About Us
              </Link>
              <Link href="/help" className="text-slate-700 font-medium hover:text-teal-600 transition-colors">
                Help
              </Link>
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-4">
              <Link
                href="/quote/car"
                className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 transform hover:scale-105 transition-all duration-300"
              >
                Get a Quote
              </Link>
              
              {/* Mobile Menu Button */}
              <button className="lg:hidden p-2 text-slate-600 hover:text-slate-800">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🦡</span>
                </div>
                <span className="text-lg font-black">Compare<span className="text-teal-400">Kat</span></span>
              </Link>
              <p className="text-slate-400 text-sm mb-4">
                Helping millions of customers compare and save on insurance since 2006.
              </p>
            </div>

            {/* Insurance Links */}
            <div>
              <h4 className="font-bold mb-4">Insurance</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/quote/car" className="hover:text-white transition-colors">Car Insurance</Link></li>
                <li><Link href="/insurance/home" className="hover:text-white transition-colors">Home Insurance</Link></li>
                <li><Link href="/insurance/pet" className="hover:text-white transition-colors">Pet Insurance</Link></li>
                <li><Link href="/insurance/travel" className="hover:text-white transition-colors">Travel Insurance</Link></li>
                <li><Link href="/insurance/life" className="hover:text-white transition-colors">Life Insurance</Link></li>
              </ul>
            </div>

            {/* More Services */}
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/insurance/energy" className="hover:text-white transition-colors">Energy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Broadband</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Credit Cards</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Mortgages</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Press</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Centre</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Complaints</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Accessibility</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-slate-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-400">
                © 2024 CompareKat Ltd. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm text-slate-400">
                <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
                <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 text-center md:text-left">
              CompareKat Ltd is authorised and regulated by the Financial Conduct Authority (FCA). Registered office: 1 Compare Street, London, EC1A 1AA. Company registration number: 12345678.
            </p>
          </div>
        </div>
      </footer>

      {/* Mascot Helper */}
      <MascotHelper showOnIdle={true} idleTimeMs={15000} />
    </div>
  );
}
