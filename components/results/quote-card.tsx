'use client';

import { useState } from 'react';
import { Star, Check, X, ChevronDown, ChevronUp, ExternalLink, Award } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import type { CarInsuranceQuote } from '@/types';

interface QuoteCardProps {
  quote: CarInsuranceQuote;
  featured?: boolean;
  rank?: number;
}

export function QuoteCard({ quote, featured = false, rank }: QuoteCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { provider, pricing, features, rewards, cover_level, marketing_text } = quote;

  const coverLevelLabel = {
    third_party: 'Third Party',
    third_party_fire_theft: 'Third Party F&T',
    comprehensive: 'Comprehensive',
  }[cover_level];

  return (
    <div
      className={`
        bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 overflow-hidden
        hover:shadow-xl hover:-translate-y-1
        ${featured 
          ? 'border-amber-400 ring-4 ring-amber-100' 
          : 'border-slate-100 hover:border-teal-300'
        }
      `}
    >
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-start gap-4">
          {/* Provider Logo Placeholder */}
          <div className={`
            w-16 h-16 rounded-xl flex items-center justify-center font-bold text-white text-xl
            ${featured 
              ? 'bg-gradient-to-br from-amber-500 to-orange-500' 
              : 'bg-gradient-to-br from-slate-600 to-slate-800'
            }
          `}>
            {provider.name.charAt(0)}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-slate-800">{provider.name}</h3>
              {rank && rank <= 3 && (
                <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs font-bold rounded-full">
                  #{rank}
                </span>
              )}
            </div>
            
            {/* Star Rating */}
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < provider.rating
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-slate-200 text-slate-200'
                  }`}
                />
              ))}
              <span className="text-sm text-slate-500 ml-1">Defaqto {provider.rating} Star</span>
            </div>
          </div>
        </div>

        {/* Marketing Text */}
        {marketing_text && (
          <div className="mt-3 px-3 py-1.5 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-lg">
            <p className="text-sm text-teal-700 font-medium flex items-center gap-2">
              <Award className="w-4 h-4" />
              {marketing_text}
            </p>
          </div>
        )}
      </div>

      {/* Pricing */}
      <div className="p-5 bg-gradient-to-br from-slate-50 to-white">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-slate-500 mb-1">Annual price</p>
            <p className="text-3xl font-black text-slate-800">
              {formatCurrency(pricing.annual)}
            </p>
            <p className="text-sm text-slate-500">
              or {formatCurrency(pricing.monthly)}/month
            </p>
          </div>
          <div className="text-right">
            <span className={`
              inline-block px-3 py-1 rounded-full text-sm font-bold
              ${cover_level === 'comprehensive' 
                ? 'bg-teal-100 text-teal-700' 
                : cover_level === 'third_party_fire_theft'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-slate-100 text-slate-700'
              }
            `}>
              {coverLevelLabel}
            </span>
          </div>
        </div>

        {/* Excess Info */}
        <div className="flex gap-4 mt-4 pt-4 border-t border-slate-200">
          <div>
            <p className="text-xs text-slate-500">Compulsory Excess</p>
            <p className="font-bold text-slate-700">{formatCurrency(pricing.excess.compulsory)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Voluntary Excess</p>
            <p className="font-bold text-slate-700">{formatCurrency(pricing.excess.voluntary)}</p>
          </div>
          {pricing.deposit > 0 && (
            <div>
              <p className="text-xs text-slate-500">Deposit</p>
              <p className="font-bold text-slate-700">{formatCurrency(pricing.deposit)}</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Features */}
      <div className="px-5 py-4 border-t border-slate-100">
        <div className="grid grid-cols-2 gap-2">
          <FeatureItem included={features.breakdown_cover} label="Breakdown cover" />
          <FeatureItem included={features.windscreen} label="Windscreen" />
          <FeatureItem included={features.courtesy_car} label="Courtesy car" />
          <FeatureItem included={features.legal_protection} label="Legal protection" />
        </div>
      </div>

      {/* Expandable Details */}
      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-5 py-4 bg-slate-50 border-t border-slate-200">
          <h4 className="font-bold text-slate-700 mb-3">All Features</h4>
          <div className="grid grid-cols-2 gap-2">
            <FeatureItem included={features.personal_accident} label="Personal accident" />
            <FeatureItem included={features.no_claims_discount > 0} label={`NCD: ${features.no_claims_discount} years`} />
          </div>

          {/* Rewards Section */}
          {(rewards.meerkat_movies || rewards.meerkat_meals || rewards.cashback > 0) && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <h4 className="font-bold text-slate-700 mb-3">🎁 Bonus Rewards</h4>
              <div className="space-y-2">
                {rewards.meerkat_movies && (
                  <p className="text-sm text-slate-600 flex items-center gap-2">
                    <span className="text-lg">🎬</span> Meerkat Movies - 2-for-1 cinema tickets
                  </p>
                )}
                {rewards.meerkat_meals && (
                  <p className="text-sm text-slate-600 flex items-center gap-2">
                    <span className="text-lg">🍽️</span> Meerkat Meals - 2-for-1 dining
                  </p>
                )}
                {rewards.cashback > 0 && (
                  <p className="text-sm text-slate-600 flex items-center gap-2">
                    <span className="text-lg">💰</span> £{rewards.cashback} cashback
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="p-5 border-t border-slate-100 space-y-3">
        <button
          className={`
            w-full py-3.5 px-6 rounded-xl font-bold text-lg
            transform hover:scale-[1.02] active:scale-[0.98]
            transition-all duration-200 flex items-center justify-center gap-2
            ${featured
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 hover:from-amber-600 hover:to-orange-600'
              : 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/30 hover:from-teal-600 hover:to-emerald-600'
            }
          `}
        >
          Go to {provider.name}
          <ExternalLink className="w-5 h-5" />
        </button>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-2 text-slate-600 font-medium text-sm flex items-center justify-center gap-1 hover:text-teal-600 transition-colors"
        >
          {isExpanded ? (
            <>
              Less details <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              More details <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function FeatureItem({ included, label }: { included: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2">
      {included ? (
        <Check className="w-4 h-4 text-teal-500" />
      ) : (
        <X className="w-4 h-4 text-slate-300" />
      )}
      <span className={`text-sm ${included ? 'text-slate-700' : 'text-slate-400'}`}>
        {label}
      </span>
    </div>
  );
}
