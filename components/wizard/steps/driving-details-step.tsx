'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuoteStore } from '@/store/quote-store';
import { drivingDetailsSchema, type DrivingDetailsFormData } from '@/lib/validation';
import { ArrowRight, ArrowLeft, Car, Award, AlertTriangle } from 'lucide-react';

export function DrivingDetailsStep() {
  const { drivingDetails, updateDrivingDetails, goToNextStep, goToPreviousStep } = useQuoteStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DrivingDetailsFormData>({
    resolver: zodResolver(drivingDetailsSchema),
    defaultValues: {
      licenseType: drivingDetails.licenseType || undefined,
      licenseNumber: drivingDetails.licenseNumber || '',
      yearsHeld: drivingDetails.yearsHeld ?? 0,
      passedPlus: drivingDetails.passedPlus ?? false,
      claims: drivingDetails.claims ?? [],
      convictions: drivingDetails.convictions ?? [],
      medicalConditions: drivingDetails.medicalConditions ?? false,
      dvlaAware: drivingDetails.dvlaAware ?? false,
    },
  });

  const hasMedicalConditions = watch('medicalConditions');

  const onSubmit = (data: DrivingDetailsFormData) => {
    updateDrivingDetails(data);
    goToNextStep();
  };

  const inputClass = (hasError: boolean) => `
    w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none
    ${hasError 
      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
      : 'border-slate-200 bg-slate-50 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 focus:bg-white'
    }
  `;

  const labelClass = 'block text-sm font-semibold text-slate-700 mb-2';
  const errorClass = 'text-red-500 text-sm mt-1.5';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl text-white">
          <Car className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Your Driving History</h2>
          <p className="text-slate-500">Tell us about your driving experience</p>
        </div>
      </div>

      {/* License Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>License Type</label>
          <select
            {...register('licenseType')}
            className={inputClass(!!errors.licenseType)}
          >
            <option value="">Select...</option>
            <option value="full_uk">Full UK</option>
            <option value="provisional">Provisional UK</option>
            <option value="eu">EU License</option>
            <option value="international">International</option>
          </select>
          {errors.licenseType && <p className={errorClass}>{errors.licenseType.message}</p>}
        </div>
        <div>
          <label className={labelClass}>License Number</label>
          <input
            {...register('licenseNumber')}
            className={inputClass(!!errors.licenseNumber)}
            placeholder="MORGA753116SM9IJ 35"
          />
          {errors.licenseNumber && <p className={errorClass}>{errors.licenseNumber.message}</p>}
        </div>
      </div>

      {/* Years Held */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Years License Held</label>
          <input
            type="number"
            {...register('yearsHeld', { valueAsNumber: true })}
            className={inputClass(!!errors.yearsHeld)}
            min="0"
            max="80"
          />
          {errors.yearsHeld && <p className={errorClass}>{errors.yearsHeld.message}</p>}
        </div>
        <div className="flex items-center">
          <label className="flex items-center gap-3 cursor-pointer p-4 bg-slate-50 rounded-xl border-2 border-slate-200 hover:border-teal-300 transition-colors w-full">
            <input
              type="checkbox"
              {...register('passedPlus')}
              className="w-5 h-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            />
            <div>
              <span className="font-medium text-slate-700 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" /> Pass Plus Completed
              </span>
              <span className="text-sm text-slate-500">May reduce your premium</span>
            </div>
          </label>
        </div>
      </div>

      {/* Claims History Info */}
      <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-800">Claims & Convictions</h4>
            <p className="text-sm text-amber-700 mt-1">
              For this demo, we&apos;re assuming you have no previous claims or convictions.
              In a full implementation, you would be able to add these here.
            </p>
          </div>
        </div>
      </div>

      {/* Medical Conditions */}
      <div className="space-y-4">
        <label className="flex items-center gap-3 cursor-pointer p-4 bg-slate-50 rounded-xl border-2 border-slate-200 hover:border-teal-300 transition-colors">
          <input
            type="checkbox"
            {...register('medicalConditions')}
            className="w-5 h-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
          />
          <div>
            <span className="font-medium text-slate-700">
              Do you have any medical conditions that affect your driving?
            </span>
            <span className="block text-sm text-slate-500">
              E.g., epilepsy, diabetes, visual impairment
            </span>
          </div>
        </label>

        {hasMedicalConditions && (
          <div className="ml-8">
            <label className="flex items-center gap-3 cursor-pointer p-4 bg-teal-50 rounded-xl border-2 border-teal-200">
              <input
                type="checkbox"
                {...register('dvlaAware')}
                className="w-5 h-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="font-medium text-teal-700">
                I confirm the DVLA is aware of my medical condition(s)
              </span>
            </label>
            {errors.dvlaAware && <p className={errorClass}>{errors.dvlaAware.message}</p>}
          </div>
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
          Continue to Vehicle Details
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
