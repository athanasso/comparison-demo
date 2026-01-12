'use client';

import { useState, useEffect } from 'react';
import { useQuoteStore, useSortedQuotes } from '@/store/quote-store';
import { QuoteCard } from './quote-card';
import { ResultsGridSkeleton } from '@/components/ui/skeleton';
import { generateMockQuotes } from '@/lib/mock-data';
import { ArrowUpDown, Filter, RefreshCw } from 'lucide-react';
import type { CoverLevel } from '@/types';

export function ResultsGrid() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchProgress, setSearchProgress] = useState(0);
  const { setQuotes, sortBy, setSortBy, coverPreferences } = useQuoteStore();
  const sortedQuotes = useSortedQuotes();

  useEffect(() => {
    const fetchQuotes = async () => {
      setIsLoading(true);
      setSearchProgress(0);

      // Simulate progressive loading like the real Compare the Market
      const intervals = [
        { progress: 15, delay: 400 },
        { progress: 35, delay: 600 },
        { progress: 55, delay: 500 },
        { progress: 75, delay: 400 },
        { progress: 90, delay: 300 },
        { progress: 100, delay: 200 },
      ];

      for (const { progress, delay } of intervals) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        setSearchProgress(progress);
      }

      // Generate mock quotes
      const coverLevel = (coverPreferences.coverLevel || 'comprehensive') as CoverLevel;
      const quotes = generateMockQuotes(coverLevel, 12);
      
      setQuotes(quotes);
      setIsLoading(false);
    };

    fetchQuotes();
  }, [setQuotes, coverPreferences.coverLevel]);

  const handleRefresh = () => {
    const coverLevel = (coverPreferences.coverLevel || 'comprehensive') as CoverLevel;
    setQuotes(generateMockQuotes(coverLevel, 12));
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Loading Progress */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 mb-6">
              {/* Animated meerkat-style loader */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 animate-pulse" />
              <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                <span className="text-4xl animate-bounce">🔍</span>
              </div>
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="8"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${searchProgress * 3.77} 377`}
                  className="transition-all duration-300"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Searching {searchProgress < 100 ? `${Math.floor(searchProgress / 2)}` : '50'} insurers...
            </h3>
            <p className="text-slate-500 text-center max-w-md">
              We&apos;re comparing quotes from over 100 insurance providers to find you the best deal.
              <span className="font-semibold text-teal-600"> Simples!</span>
            </p>
            <div className="w-full max-w-md mt-6">
              <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${searchProgress}%` }}
                />
              </div>
              <p className="text-center text-sm text-slate-400 mt-2">{searchProgress}% complete</p>
            </div>
          </div>
        </div>

        {/* Skeleton Grid */}
        <ResultsGridSkeleton count={6} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              We found {sortedQuotes.length} quotes for you
            </h2>
            <p className="text-slate-500">
              From {new Set(sortedQuotes.map(q => q.provider.name)).size} different providers
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="appearance-none pl-10 pr-8 py-3 rounded-xl border-2 border-slate-200 bg-white font-medium text-slate-700 cursor-pointer hover:border-teal-300 transition-colors focus:outline-none focus:border-teal-500"
              >
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="provider">Provider A-Z</option>
              </select>
              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>

            {/* Filter Button */}
            <button className="p-3 rounded-xl border-2 border-slate-200 bg-white hover:border-teal-300 transition-colors">
              <Filter className="w-5 h-5 text-slate-600" />
            </button>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              className="p-3 rounded-xl border-2 border-slate-200 bg-white hover:border-teal-300 transition-colors"
              title="Refresh quotes"
            >
              <RefreshCw className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Sponsored Result Callout */}
      {sortedQuotes[0]?.provider.sponsored && (
        <div className="relative">
          <div className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full z-10">
            FEATURED DEAL
          </div>
          <QuoteCard quote={sortedQuotes[0]} featured />
        </div>
      )}

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedQuotes.slice(sortedQuotes[0]?.provider.sponsored ? 1 : 0).map((quote, index) => (
          <QuoteCard
            key={quote.id}
            quote={quote}
            rank={index + (sortedQuotes[0]?.provider.sponsored ? 2 : 1)}
          />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-4">
        <button className="px-8 py-3 rounded-xl border-2 border-teal-500 text-teal-600 font-bold hover:bg-teal-50 transition-colors">
          Show More Quotes
        </button>
      </div>
    </div>
  );
}
