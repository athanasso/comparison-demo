import { Suspense } from 'react';
import { ResultsGrid } from '@/components/results/results-grid';
import { ResultsGridSkeleton } from '@/components/ui/skeleton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Insurance Quotes | CompareKat',
  description: 'Compare your personalized insurance quotes from over 100 providers.',
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
              Your Quotes Are Ready!
            </h1>
          </div>
          <p className="text-slate-500 text-lg ml-14">
            We&apos;ve compared prices from over 100 insurance providers to find you the best deals.
          </p>
        </div>

        {/* Meerkat Rewards Banner */}
        <div className="mb-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg shadow-amber-500/30">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <span className="text-6xl">🦡</span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold mb-1">
                Buy through us and get Meerkat Rewards!
              </h3>
              <p className="opacity-90">
                🎬 2-for-1 cinema tickets every Tuesday & Wednesday
                <span className="mx-2">•</span>
                🍽️ 2-for-1 meals at restaurants
              </p>
            </div>
            <button className="flex-shrink-0 px-6 py-3 bg-white text-amber-600 font-bold rounded-xl hover:bg-amber-50 transition-colors">
              Learn More
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
            <h3 className="font-bold text-slate-800 mb-2">Compare Features</h3>
            <p className="text-slate-500 text-sm">
              Don&apos;t just look at price. Check what&apos;s included in each policy to make sure you&apos;re getting the right cover.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <span className="text-3xl mb-3 block">⏰</span>
            <h3 className="font-bold text-slate-800 mb-2">Quotes Valid for 30 Days</h3>
            <p className="text-slate-500 text-sm">
              These quotes are valid for the next 30 days. Prices may change, so don&apos;t wait too long!
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <span className="text-3xl mb-3 block">📞</span>
            <h3 className="font-bold text-slate-800 mb-2">Need Help?</h3>
            <p className="text-slate-500 text-sm">
              Our UK-based team is here to help. Call us free on 0800 123 4567, Monday to Friday 9am-6pm.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
