import Link from 'next/link';
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';


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
            <a href="tel:210-123-4567" className="flex items-center gap-2 hover:text-teal-400 transition-colors">
              <Phone className="w-4 h-4" />
              210 123 4567
            </a>
            <a href="mailto:info@sygrineto.gr" className="hidden sm:flex items-center gap-2 hover:text-teal-400 transition-colors">
              <Mail className="w-4 h-4" />
              info@sygrineto.gr
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hover:text-teal-400 transition-colors">Σύνδεση</Link>
            <Link href="/register" className="px-4 py-1 bg-teal-600 rounded-full hover:bg-teal-700 transition-colors">Εγγραφή</Link>
            <span className="text-slate-400">|</span>
            <Link href="#" className="text-slate-300 hover:text-white transition-colors text-xs">EN</Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🔍</span>
              </div>
              <div>
                <span className="text-xl font-black text-slate-800">Syg<span className="text-teal-600">rineto</span></span>
                <span className="block text-xs text-slate-500">Απλά!</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="relative group">
                <button className="flex items-center gap-1 text-slate-700 font-medium hover:text-teal-600 transition-colors py-2">
                  Υπηρεσίες
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                  <div className="p-4 space-y-1">
                    <Link href="/insurance/internet" className="block px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-teal-600 transition-colors">
                      🌐 Ίντερνετ
                    </Link>
                    <Link href="/insurance/phone" className="block px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-teal-600 transition-colors">
                      📱 Τηλεφωνία
                    </Link>
                    <Link href="/insurance/energy" className="block px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-teal-600 transition-colors">
                      ⚡ Ενέργεια
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center gap-1 text-slate-700 font-medium hover:text-teal-600 transition-colors py-2">
                  Ασφάλειες
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                  <div className="p-4 space-y-1">
                    <Link href="/quote/car" className="block px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-teal-600 transition-colors">
                      🚗 Ασφάλεια Αυτοκινήτου
                    </Link>
                    <Link href="/insurance/home" className="block px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-teal-600 transition-colors">
                      🏠 Ασφάλεια Κατοικίας
                    </Link>
                    <Link href="/insurance/pet" className="block px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-teal-600 transition-colors">
                      🐕 Ασφάλεια Κατοικιδίων
                    </Link>
                    <Link href="/insurance/travel" className="block px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-teal-600 transition-colors">
                      ✈️ Ασφάλεια Ταξιδιού
                    </Link>
                    <Link href="/insurance/life" className="block px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-teal-600 transition-colors">
                      ❤️ Ασφάλεια Ζωής
                    </Link>
                  </div>
                </div>
              </div>

              <Link href="/about" className="text-slate-700 font-medium hover:text-teal-600 transition-colors">
                Σχετικά
              </Link>
              <Link href="/help" className="text-slate-700 font-medium hover:text-teal-600 transition-colors">
                Βοήθεια
              </Link>
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-4">
              <Link
                href="/quote/car"
                className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 transform hover:scale-105 transition-all duration-300"
              >
                Λάβετε Προσφορά
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
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🔍</span>
                </div>
                <span className="text-lg font-black">Syg<span className="text-teal-400">rineto</span></span>
              </Link>
            </div>

            {/* Services - Top Priority */}
            <div>
              <h4 className="font-bold mb-4">Υπηρεσίες</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/insurance/internet" className="hover:text-white transition-colors">Ίντερνετ</Link></li>
                <li><Link href="/insurance/phone" className="hover:text-white transition-colors">Τηλεφωνία</Link></li>
                <li><Link href="/insurance/energy" className="hover:text-white transition-colors">Ενέργεια</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Πιστωτικές Κάρτες</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Στεγαστικά Δάνεια</Link></li>
              </ul>
            </div>

            {/* Insurance Links */}
            <div>
              <h4 className="font-bold mb-4">Ασφάλειες</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/quote/car" className="hover:text-white transition-colors">Ασφάλεια Αυτοκινήτου</Link></li>
                <li><Link href="/insurance/home" className="hover:text-white transition-colors">Ασφάλεια Κατοικίας</Link></li>
                <li><Link href="/insurance/pet" className="hover:text-white transition-colors">Ασφάλεια Κατοικιδίων</Link></li>
                <li><Link href="/insurance/travel" className="hover:text-white transition-colors">Ασφάλεια Ταξιδιού</Link></li>
                <li><Link href="/insurance/life" className="hover:text-white transition-colors">Ασφάλεια Ζωής</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold mb-4">Εταιρεία</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/about" className="hover:text-white transition-colors">Σχετικά</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Καριέρα</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Τύπος</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold mb-4">Υποστήριξη</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Κέντρο Βοήθειας</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Επικοινωνία</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Παράπονα</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Προσβασιμότητα</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-slate-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-400">
                © 2024 Sygrineto ΑΕ. Με επιφύλαξη παντός δικαιώματος.
              </p>
              <div className="flex items-center gap-6 text-sm text-slate-400">
                <Link href="#" className="hover:text-white transition-colors">Πολιτική Απορρήτου</Link>
                <Link href="#" className="hover:text-white transition-colors">Όροι Χρήσης</Link>
                <Link href="#" className="hover:text-white transition-colors">Πολιτική Cookies</Link>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 text-center md:text-left">
              Η Sygrineto ΑΕ εποπτεύεται από την Τράπεζα της Ελλάδος και την Επιτροπή Κεφαλαιαγοράς. Έδρα: Λεωφ. Βασ. Σοφίας 1, 106 71 Αθήνα. ΑΡ.Μ.Α.Ε.: 12345678000.
            </p>
          </div>
        </div>
      </footer>

      {/* Mascot Helper */}

    </div>
  );
}
