'use client';

import { useQuoteStore } from '@/store/quote-store';
import { PersonalDetailsStep } from './steps/personal-details-step';
import { DrivingDetailsStep } from './steps/driving-details-step';
import { VehicleDetailsStep } from './steps/vehicle-details-step';
import { CoverPreferencesStep } from './steps/cover-preferences-step';
import { ReviewStep } from './steps/review-step';
import { ProgressBar } from '@/components/ui/progress-bar';

export function WizardForm() {
  const currentStep = useQuoteStore((state) => state.currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 'personal':
        return <PersonalDetailsStep />;
      case 'driving':
        return <DrivingDetailsStep />;
      case 'vehicle':
        return <VehicleDetailsStep />;
      case 'cover':
        return <CoverPreferencesStep />;
      case 'review':
        return <ReviewStep />;
      default:
        return <PersonalDetailsStep />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ProgressBar />
      <div className="mt-8 bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        {renderStep()}
      </div>
    </div>
  );
}
