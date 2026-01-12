'use client';

import { useQuoteStore } from '@/store/quote-store';
import { Check } from 'lucide-react';
import type { WizardStepId } from '@/types';

const STEPS: { id: WizardStepId; label: string }[] = [
  { id: 'personal', label: 'About You' },
  { id: 'driving', label: 'Your Driving' },
  { id: 'vehicle', label: 'Your Car' },
  { id: 'cover', label: 'Your Cover' },
  { id: 'review', label: 'Review' },
];

export function ProgressBar() {
  const currentStep = useQuoteStore((state) => state.currentStep);
  const completedSteps = useQuoteStore((state) => state.completedSteps);
  const setCurrentStep = useQuoteStore((state) => state.setCurrentStep);

  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);

  const handleStepClick = (stepId: WizardStepId, index: number) => {
    // Only allow clicking on completed steps or the current step
    if (completedSteps.includes(stepId) || index <= currentStepIndex) {
      setCurrentStep(stepId);
    }
  };

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        {/* Progress Line Background */}
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-slate-200 -translate-y-1/2 rounded-full" />
        
        {/* Progress Line Fill */}
        <div
          className="absolute left-0 top-1/2 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 -translate-y-1/2 rounded-full transition-all duration-500"
          style={{
            width: `${(currentStepIndex / (STEPS.length - 1)) * 100}%`,
          }}
        />

        {/* Step Indicators */}
        {STEPS.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;
          const isClickable = isCompleted || index <= currentStepIndex;

          return (
            <button
              key={step.id}
              onClick={() => handleStepClick(step.id, index)}
              disabled={!isClickable}
              className={`
                relative z-10 flex flex-col items-center gap-2
                ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}
              `}
            >
              {/* Step Circle */}
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  font-bold text-lg transition-all duration-300
                  ${
                    isCompleted
                      ? 'bg-gradient-to-br from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/30'
                      : isCurrent
                      ? 'bg-white border-4 border-teal-500 text-teal-600 shadow-lg'
                      : 'bg-slate-100 text-slate-400 border-2 border-slate-200'
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6" strokeWidth={3} />
                ) : (
                  index + 1
                )}
              </div>

              {/* Step Label */}
              <span
                className={`
                  text-sm font-medium whitespace-nowrap
                  ${
                    isCurrent
                      ? 'text-teal-600'
                      : isCompleted
                      ? 'text-slate-700'
                      : 'text-slate-400'
                  }
                `}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
