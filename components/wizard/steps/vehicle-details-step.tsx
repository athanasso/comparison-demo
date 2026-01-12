'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuoteStore } from '@/store/quote-store';
import { vehicleDetailsSchema, type VehicleDetailsFormData } from '@/lib/validation';
import { ArrowRight, ArrowLeft, Car, Gauge, MapPin, Shield } from 'lucide-react';

export function VehicleDetailsStep() {
  const { vehicleDetails, updateVehicleDetails, goToNextStep, goToPreviousStep } = useQuoteStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VehicleDetailsFormData>({
    resolver: zodResolver(vehicleDetailsSchema),
    defaultValues: {
      registration: vehicleDetails.registration || '',
      make: vehicleDetails.make || '',
      model: vehicleDetails.model || '',
      year: vehicleDetails.year || new Date().getFullYear(),
      engineSize: vehicleDetails.engineSize || 1400,
      fuelType: vehicleDetails.fuelType || undefined,
      transmission: vehicleDetails.transmission || undefined,
      bodyType: vehicleDetails.bodyType || '',
      doors: vehicleDetails.doors || 5,
      seats: vehicleDetails.seats || 5,
      currentValue: vehicleDetails.currentValue || 10000,
      modifications: vehicleDetails.modifications ?? false,
      imported: vehicleDetails.imported ?? false,
      securityFeatures: vehicleDetails.securityFeatures || [],
      overnightLocation: vehicleDetails.overnightLocation || undefined,
      annualMileage: vehicleDetails.annualMileage || 8000,
      usage: vehicleDetails.usage || undefined,
    },
  });

  const onSubmit = (data: VehicleDetailsFormData) => {
    updateVehicleDetails(data);
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
          <h2 className="text-2xl font-bold text-slate-800">Your Vehicle</h2>
          <p className="text-slate-500">Tell us about your car</p>
        </div>
      </div>

      {/* Registration Lookup */}
      <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl">
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Vehicle Registration
        </label>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">GB</span>
            </div>
            <input
              {...register('registration')}
              className="w-full pl-16 pr-4 py-4 rounded-xl bg-amber-400 text-slate-900 font-mono font-bold text-2xl uppercase tracking-wider border-4 border-slate-600 focus:border-amber-300 outline-none"
              placeholder="AB12 CDE"
            />
          </div>
        </div>
        {errors.registration && <p className="text-red-400 text-sm mt-2">{errors.registration.message}</p>}
        <p className="text-slate-400 text-sm mt-2">Enter your reg to auto-fill vehicle details</p>
      </div>

      {/* Vehicle Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Make</label>
          <input
            {...register('make')}
            className={inputClass(!!errors.make)}
            placeholder="Ford"
          />
          {errors.make && <p className={errorClass}>{errors.make.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Model</label>
          <input
            {...register('model')}
            className={inputClass(!!errors.model)}
            placeholder="Focus"
          />
          {errors.model && <p className={errorClass}>{errors.model.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Year</label>
          <input
            type="number"
            {...register('year', { valueAsNumber: true })}
            className={inputClass(!!errors.year)}
            min="1900"
            max={new Date().getFullYear() + 1}
          />
          {errors.year && <p className={errorClass}>{errors.year.message}</p>}
        </div>
      </div>

      {/* Engine & Transmission */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>
            <span className="flex items-center gap-2">
              <Gauge className="w-4 h-4" /> Engine Size (cc)
            </span>
          </label>
          <input
            type="number"
            {...register('engineSize', { valueAsNumber: true })}
            className={inputClass(!!errors.engineSize)}
          />
          {errors.engineSize && <p className={errorClass}>{errors.engineSize.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Fuel Type</label>
          <select {...register('fuelType')} className={inputClass(!!errors.fuelType)}>
            <option value="">Select...</option>
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Electric</option>
            <option value="hybrid">Hybrid</option>
            <option value="lpg">LPG</option>
          </select>
          {errors.fuelType && <p className={errorClass}>{errors.fuelType.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Transmission</label>
          <select {...register('transmission')} className={inputClass(!!errors.transmission)}>
            <option value="">Select...</option>
            <option value="manual">Manual</option>
            <option value="automatic">Automatic</option>
          </select>
          {errors.transmission && <p className={errorClass}>{errors.transmission.message}</p>}
        </div>
      </div>

      {/* Body & Size */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className={labelClass}>Body Type</label>
          <input
            {...register('bodyType')}
            className={inputClass(!!errors.bodyType)}
            placeholder="Hatchback"
          />
          {errors.bodyType && <p className={errorClass}>{errors.bodyType.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Doors</label>
          <select {...register('doors', { valueAsNumber: true })} className={inputClass(!!errors.doors)}>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Seats</label>
          <select {...register('seats', { valueAsNumber: true })} className={inputClass(!!errors.seats)}>
            {[2, 4, 5, 6, 7, 8, 9].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Current Value (£)</label>
          <input
            type="number"
            {...register('currentValue', { valueAsNumber: true })}
            className={inputClass(!!errors.currentValue)}
          />
          {errors.currentValue && <p className={errorClass}>{errors.currentValue.message}</p>}
        </div>
      </div>

      {/* Security & Location */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-slate-700 font-semibold">
          <Shield className="w-4 h-4" /> Security & Storage
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Overnight Location
              </span>
            </label>
            <select
              {...register('overnightLocation')}
              className={inputClass(!!errors.overnightLocation)}
            >
              <option value="">Select...</option>
              <option value="garage">Locked Garage</option>
              <option value="driveway">Driveway</option>
              <option value="street">Street</option>
              <option value="car_park">Car Park</option>
            </select>
            {errors.overnightLocation && <p className={errorClass}>{errors.overnightLocation.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Annual Mileage</label>
            <input
              type="number"
              {...register('annualMileage', { valueAsNumber: true })}
              className={inputClass(!!errors.annualMileage)}
              step="1000"
            />
            {errors.annualMileage && <p className={errorClass}>{errors.annualMileage.message}</p>}
          </div>
        </div>
      </div>

      {/* Usage */}
      <div>
        <label className={labelClass}>How do you use your vehicle?</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { value: 'social', label: 'Social Only', desc: 'Leisure and domestic use' },
            { value: 'commuting', label: 'Commuting', desc: 'Driving to work/education' },
            { value: 'business', label: 'Business Use', desc: 'Work-related driving' },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-start gap-3 cursor-pointer p-4 bg-slate-50 rounded-xl border-2 border-slate-200 hover:border-teal-300 transition-colors"
            >
              <input
                type="radio"
                value={option.value}
                {...register('usage')}
                className="mt-1 w-5 h-5 text-teal-600 focus:ring-teal-500"
              />
              <div>
                <span className="font-medium text-slate-700">{option.label}</span>
                <span className="block text-sm text-slate-500">{option.desc}</span>
              </div>
            </label>
          ))}
        </div>
        {errors.usage && <p className={errorClass}>{errors.usage.message}</p>}
      </div>

      {/* Modifications & Import */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex items-center gap-3 cursor-pointer p-4 bg-slate-50 rounded-xl border-2 border-slate-200 hover:border-teal-300 transition-colors">
          <input
            type="checkbox"
            {...register('modifications')}
            className="w-5 h-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
          />
          <span className="font-medium text-slate-700">Vehicle has modifications</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer p-4 bg-slate-50 rounded-xl border-2 border-slate-200 hover:border-teal-300 transition-colors">
          <input
            type="checkbox"
            {...register('imported')}
            className="w-5 h-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
          />
          <span className="font-medium text-slate-700">Vehicle is an import</span>
        </label>
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
          Continue to Cover Options
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
