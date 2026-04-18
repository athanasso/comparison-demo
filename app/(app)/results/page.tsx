import { Suspense } from 'react';
import { ResultsGrid } from '@/components/results/results-grid';
import { ResultsGridSkeleton } from '@/components/ui/skeleton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Οι Προσφορές σας | Sygrineto',
  description: 'Συγκρίνετε τις εξατομικευμένες προσφορές ασφάλισης από πάνω από 100 παρόχους.',
};

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-teal-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">🎉</span>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
              Οι Προσφορές σας είναι Έτοιμες!
            </h1>
          </div>
          <p className="text-slate-500 text-lg ml-14">
            Συγκρίναμε τιμές από πάνω από 100 ασφαλιστικούς παρόχους για να βρούμε τις καλύτερες προσφορές.
          </p>
        </div>

        {/* Rewards Banner */}
        <div className="mb-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg shadow-teal-500/30">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <span className="text-6xl">🎁</span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold mb-1">
                Αγοράστε μέσω μας και κερδίστε ανταμοιβές!
              </h3>
              <p className="opacity-90">
                🎬 2-σε-1 εισιτήρια σινεμά κάθε Τρίτη & Τετάρτη
                <span className="mx-2">•</span>
                🍽️ 2-σε-1 γεύματα σε εστιατόρια
              </p>
            </div>
            <button className="flex-shrink-0 px-6 py-3 bg-white text-teal-600 font-bold rounded-xl hover:bg-teal-50 transition-colors">
              Μάθετε Περισσότερα
            </button>
          </div>
        </div>

        {/* Results Grid with Suspense */}
        <Suspense fallback={<ResultsGridSkeleton count={6} />}>
          <ResultsGrid />
        </Suspense>

        {/* Additional Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <span className="text-3xl mb-3 block">💡</span>
            <h3 className="font-bold text-slate-800 mb-2">Σύγκριση Χαρακτηριστικών</h3>
            <p className="text-slate-500 text-sm">
              Μην κοιτάτε μόνο την τιμή. Ελέγξτε τι περιλαμβάνεται σε κάθε ασφαλιστήριο για σωστή κάλυψη.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <span className="text-3xl mb-3 block">⏰</span>
            <h3 className="font-bold text-slate-800 mb-2">Ισχύς Προσφορών 30 Ημέρες</h3>
            <p className="text-slate-500 text-sm">
              Οι προσφορές ισχύουν για 30 ημέρες. Οι τιμές μπορεί να αλλάξουν, μην αργείτε!
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <span className="text-3xl mb-3 block">📞</span>
            <h3 className="font-bold text-slate-800 mb-2">Χρειάζεστε Βοήθεια;</h3>
            <p className="text-slate-500 text-sm">
              Η ομάδα μας είναι εδώ για εσάς. Καλέστε μας στο 210 123 4567, Δευτέρα-Παρασκευή 9πμ-6μμ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
