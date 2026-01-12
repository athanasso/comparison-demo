'use client';

import { useRouter } from 'next/navigation';
import { useQuoteStore } from '@/store/quote-store';
import { ArrowLeft, Search, User, Car, Shield, FileText, Edit2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export function ReviewStep() {
  const router = useRouter();
  const {
    personalDetails,
    drivingDetails,
    vehicleDetails,
    coverPreferences,
    goToPreviousStep,
    setCurrentStep,
    completeStep,
  } = useQuoteStore();

  const handleGetQuotes = () => {
    completeStep('review');
    router.push('/results');
  };

  const sections = [
    {
      id: 'personal',
      title: 'About You',
      icon: User,
      items: [
        { label: 'Name', value: `${personalDetails.title} ${personalDetails.firstName} ${personalDetails.lastName}` },
        { label: 'Date of Birth', value: personalDetails.dateOfBirth ? formatDate(personalDetails.dateOfBirth) : '-' },
        { label: 'Email', value: personalDetails.email },
        { label: 'Phone', value: personalDetails.phone },
        { label: 'Address', value: personalDetails.address ? `${personalDetails.address.line1}, ${personalDetails.address.city}, ${personalDetails.address.postcode}` : '-' },
        { label: 'Occupation', value: personalDetails.occupation },
        { label: 'Employment', value: personalDetails.employmentStatus?.replace('_', ' ') },
      ],
    },
    {
      id: 'driving',
      title: 'Your Driving',
      icon: FileText,
      items: [
        { label: 'License Type', value: drivingDetails.licenseType?.replace('_', ' ').toUpperCase() },
        { label: 'License Number', value: drivingDetails.licenseNumber },
        { label: 'Years Held', value: `${drivingDetails.yearsHeld} years` },
        { label: 'Pass Plus', value: drivingDetails.passedPlus ? 'Yes' : 'No' },
        { label: 'Medical Conditions', value: drivingDetails.medicalConditions ? 'Yes - DVLA aware' : 'None' },
      ],
    },
    {
      id: 'vehicle',
      title: 'Your Vehicle',
      icon: Car,
      items: [
        { label: 'Registration', value: vehicleDetails.registration?.toUpperCase() },
        { label: 'Vehicle', value: `${vehicleDetails.year} ${vehicleDetails.make} ${vehicleDetails.model}` },
        { label: 'Engine', value: `${vehicleDetails.engineSize}cc ${vehicleDetails.fuelType} ${vehicleDetails.transmission}` },
        { label: 'Value', value: vehicleDetails.currentValue ? `£${vehicleDetails.currentValue.toLocaleString()}` : '-' },
        { label: 'Annual Mileage', value: vehicleDetails.annualMileage ? `${vehicleDetails.annualMileage.toLocaleString()} miles` : '-' },
        { label: 'Usage', value: vehicleDetails.usage },
        { label: 'Kept Overnight', value: vehicleDetails.overnightLocation?.replace('_', ' ') },
      ],
    },
    {
      id: 'cover',
      title: 'Your Cover',
      icon: Shield,
      items: [
        { label: 'Cover Level', value: coverPreferences.coverLevel?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) },
        { label: 'Voluntary Excess', value: coverPreferences.voluntaryExcess !== undefined ? `£${coverPreferences.voluntaryExcess}` : '-' },
        { label: 'Payment', value: coverPreferences.paymentFrequency === 'annual' ? 'Pay Annually' : 'Pay Monthly' },
        { label: 'Start Date', value: coverPreferences.startDate ? formatDate(coverPreferences.startDate) : '-' },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl text-white">
          <Search className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Review Your Details</h2>
          <p className="text-slate-500">Check everything is correct before getting quotes</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6">
        {sections.map((section) => (
          <div
            key={section.id}
            className="bg-slate-50 rounded-2xl p-6 border border-slate-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl shadow-sm">
                  <section.icon className="w-5 h-5 text-teal-600" />
                </div>
                <h3 className="font-bold text-lg text-slate-800">{section.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(section.id as 'personal' | 'driving' | 'vehicle' | 'cover')}
                className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {section.items.map((item) => (
                <div key={item.label} className="flex justify-between py-2 border-b border-slate-200 last:border-0">
                  <span className="text-slate-500 text-sm">{item.label}</span>
                  <span className="font-medium text-slate-800 text-sm text-right capitalize">
                    {item.value || '-'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Terms Notice */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <p className="text-sm text-amber-800">
          By clicking &quot;Get My Quotes&quot;, you confirm that the information provided is accurate. 
          Providing false information may invalidate your insurance policy.
        </p>
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
          type="button"
          onClick={handleGetQuotes}
          className="
            flex-[2] py-4 px-6 rounded-xl font-bold text-lg
            bg-gradient-to-r from-amber-500 to-orange-500 text-white
            hover:from-amber-600 hover:to-orange-600
            transform hover:scale-[1.02] active:scale-[0.98]
            transition-all duration-200 shadow-lg shadow-amber-500/30
            flex items-center justify-center gap-3
          "
        >
          <Search className="w-5 h-5" />
          Get My Quotes
        </button>
      </div>
    </div>
  );
}
