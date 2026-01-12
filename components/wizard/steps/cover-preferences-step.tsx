'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuoteStore } from '@/store/quote-store';
import { coverPreferencesSchema, type CoverPreferencesFormData } from '@/lib/validation';
import { ArrowRight, ArrowLeft, Shield, Calendar, Wallet, Check } from 'lucide-react';

export function CoverPreferencesStep() {
  const { coverPreferences, updateCoverPreferences, goToNextStep, goToPreviousStep } = useQuoteStore();

  // Get tomorrow's date for default start
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultStartDate = tomorrow.toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CoverPreferencesFormData>({
    resolver: zodResolver(coverPreferencesSchema),
    defaultValues: {
      coverLevel: coverPreferences.coverLevel || 'comprehensive',
      voluntaryExcess: coverPreferences.voluntaryExcess ?? 250,
      paymentFrequency: coverPreferences.paymentFrequency || 'annual',
      startDate: coverPreferences.startDate || defaultStartDate,
      additionalDrivers: coverPreferences.additionalDrivers ?? [],
    },
  });

  const selectedCoverLevel = watch('coverLevel');
  const selectedExcess = watch('voluntaryExcess');

  const onSubmit = (data: CoverPreferencesFormData) => {
    updateCoverPreferences(data);
    goToNextStep();
  };

  const coverOptions = [
    {
      value: 'comprehensive',
      title: 'Comprehensive',
      description: 'Full protection for your car and others',
      features: ['Accidental damage', 'Fire & theft', 'Third party liability', 'Personal injury'],
      recommended: true,
    },
    {
      value: 'third_party_fire_theft',
      title: 'Third Party, Fire & Theft',
      description: 'Protection against fire, theft, and third party claims',
      features: ['Fire damage', 'Theft protection', 'Third party liability'],
      recommended: false,
    },
    {
      value: 'third_party',
      title: 'Third Party Only',
      description: 'Basic legal requirement cover',
      features: ['Third party liability only'],
      recommended: false,
    },
  ];

  const excessOptions = [0, 100, 250, 500, 750, 1000];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl text-white">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Your Cover</h2>
          <p className="text-slate-500">Choose your level of protection</p>
        </div>
      </div>

      {/* Cover Level Selection */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-slate-700">Cover Level</label>
        <div className="grid gap-4">
          {coverOptions.map((option) => (
            <label
              key={option.value}
              className={`
                relative flex cursor-pointer rounded-2xl border-2 p-5 transition-all duration-200
                ${selectedCoverLevel === option.value
                  ? 'border-teal-500 bg-teal-50 shadow-lg shadow-teal-100'
                  : 'border-slate-200 bg-white hover:border-teal-300'
                }
              `}
            >
              <input
                type="radio"
                value={option.value}
                {...register('coverLevel')}
                className="sr-only"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${selectedCoverLevel === option.value
                      ? 'border-teal-500 bg-teal-500'
                      : 'border-slate-300'
                    }
                  `}>
                    {selectedCoverLevel === option.value && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </span>
                  <span className="font-bold text-lg text-slate-800">{option.title}</span>
                  {option.recommended && (
                    <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold rounded-full">
                      RECOMMENDED
                    </span>
                  )}
                </div>
                <p className="text-slate-500 mt-2 ml-9">{option.description}</p>
                <div className="flex flex-wrap gap-2 mt-3 ml-9">
                  {option.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </label>
          ))}
        </div>
        {errors.coverLevel && (
          <p className="text-red-500 text-sm">{errors.coverLevel.message}</p>
        )}
      </div>

      {/* Voluntary Excess */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold text-slate-700">
            <span className="flex items-center gap-2">
              <Wallet className="w-4 h-4" /> Voluntary Excess
            </span>
          </label>
          <span className="text-sm text-slate-500">
            Higher excess = Lower premium
          </span>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {excessOptions.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => setValue('voluntaryExcess', amount)}
              className={`
                py-3 px-4 rounded-xl font-bold transition-all duration-200
                ${selectedExcess === amount
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }
              `}
            >
              £{amount}
            </button>
          ))}
        </div>
        <p className="text-sm text-slate-500">
          You&apos;ll pay this amount towards any claim, plus any compulsory excess set by the insurer.
        </p>
      </div>

      {/* Payment Frequency */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-slate-700">Payment Frequency</label>
        <div className="grid grid-cols-2 gap-4">
          <label
            className={`
              flex items-center gap-3 cursor-pointer p-5 rounded-xl border-2 transition-all
              ${watch('paymentFrequency') === 'annual'
                ? 'border-teal-500 bg-teal-50'
                : 'border-slate-200 hover:border-teal-300'
              }
            `}
          >
            <input
              type="radio"
              value="annual"
              {...register('paymentFrequency')}
              className="sr-only"
            />
            <div className={`
              w-6 h-6 rounded-full border-2 flex items-center justify-center
              ${watch('paymentFrequency') === 'annual'
                ? 'border-teal-500 bg-teal-500'
                : 'border-slate-300'
              }
            `}>
              {watch('paymentFrequency') === 'annual' && (
                <Check className="w-4 h-4 text-white" />
              )}
            </div>
            <div>
              <span className="font-bold text-slate-800">Pay Annually</span>
              <span className="block text-sm text-slate-500">Save money with one payment</span>
            </div>
          </label>
          <label
            className={`
              flex items-center gap-3 cursor-pointer p-5 rounded-xl border-2 transition-all
              ${watch('paymentFrequency') === 'monthly'
                ? 'border-teal-500 bg-teal-50'
                : 'border-slate-200 hover:border-teal-300'
              }
            `}
          >
            <input
              type="radio"
              value="monthly"
              {...register('paymentFrequency')}
              className="sr-only"
            />
            <div className={`
              w-6 h-6 rounded-full border-2 flex items-center justify-center
              ${watch('paymentFrequency') === 'monthly'
                ? 'border-teal-500 bg-teal-500'
                : 'border-slate-300'
              }
            `}>
              {watch('paymentFrequency') === 'monthly' && (
                <Check className="w-4 h-4 text-white" />
              )}
            </div>
            <div>
              <span className="font-bold text-slate-800">Pay Monthly</span>
              <span className="block text-sm text-slate-500">Spread the cost (APR applies)</span>
            </div>
          </label>
        </div>
      </div>

      {/* Start Date */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Policy Start Date
          </span>
        </label>
        <input
          type="date"
          {...register('startDate')}
          min={defaultStartDate}
          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 focus:bg-white transition-all outline-none"
        />
        {errors.startDate && (
          <p className="text-red-500 text-sm">{errors.startDate.message}</p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={goToPreviousStep}
          className="
            flex-1 py-4 px-6 rounded-xl font-bold text-lg
            bg-slate-100 text-slate-700
            hover:bg-slate-200
            transition-all duration-200
            flex items-center justify-center gap-3
          "
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="
            flex-[2] py-4 px-6 rounded-xl font-bold text-lg
            bg-gradient-to-r from-teal-500 to-emerald-500 text-white
            hover:from-teal-600 hover:to-emerald-600
            transform hover:scale-[1.02] active:scale-[0.98]
            transition-all duration-200 shadow-lg shadow-teal-500/30
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            flex items-center justify-center gap-3
          "
        >
          Review Your Quote
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
