import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  PersonalDetails,
  DrivingDetails,
  VehicleDetails,
  CoverPreferences,
  CarInsuranceQuote,
  WizardStepId,
} from '@/types';

// ============================================
// Quote Store State Interface
// ============================================
interface QuoteState {
  // Current step in the wizard
  currentStep: WizardStepId;
  completedSteps: WizardStepId[];
  
  // Form data
  personalDetails: Partial<PersonalDetails>;
  drivingDetails: Partial<DrivingDetails>;
  vehicleDetails: Partial<VehicleDetails>;
  coverPreferences: Partial<CoverPreferences>;
  
  // Results
  quotes: CarInsuranceQuote[];
  isLoading: boolean;
  searchId: string | null;
  
  // Sorting/Filtering
  sortBy: 'price_low' | 'price_high' | 'rating' | 'provider';
  filterBy: {
    maxPrice?: number;
    minRating?: number;
    coverLevel?: string;
    features?: string[];
  };
}

// ============================================
// Quote Store Actions Interface
// ============================================
interface QuoteActions {
  // Step navigation
  setCurrentStep: (step: WizardStepId) => void;
  completeStep: (step: WizardStepId) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  
  // Form data updates
  updatePersonalDetails: (data: Partial<PersonalDetails>) => void;
  updateDrivingDetails: (data: Partial<DrivingDetails>) => void;
  updateVehicleDetails: (data: Partial<VehicleDetails>) => void;
  updateCoverPreferences: (data: Partial<CoverPreferences>) => void;
  
  // Results management
  setQuotes: (quotes: CarInsuranceQuote[]) => void;
  setLoading: (loading: boolean) => void;
  setSearchId: (id: string) => void;
  
  // Sorting/Filtering
  setSortBy: (sort: QuoteState['sortBy']) => void;
  setFilterBy: (filter: QuoteState['filterBy']) => void;
  
  // Reset
  resetQuote: () => void;
  clearResults: () => void;
}

// ============================================
// Step Order Configuration
// ============================================
const STEP_ORDER: WizardStepId[] = ['personal', 'driving', 'vehicle', 'cover', 'review'];

// ============================================
// Initial State
// ============================================
const initialState: QuoteState = {
  currentStep: 'personal',
  completedSteps: [],
  personalDetails: {},
  drivingDetails: {},
  vehicleDetails: {},
  coverPreferences: {
    coverLevel: 'comprehensive',
    voluntaryExcess: 250,
    paymentFrequency: 'annual',
    additionalDrivers: [],
  },
  quotes: [],
  isLoading: false,
  searchId: null,
  sortBy: 'price_low',
  filterBy: {},
};

// ============================================
// Create the Store
// ============================================
export const useQuoteStore = create<QuoteState & QuoteActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Step Navigation
      setCurrentStep: (step) => set({ currentStep: step }),
      
      completeStep: (step) => {
        const { completedSteps } = get();
        if (!completedSteps.includes(step)) {
          set({ completedSteps: [...completedSteps, step] });
        }
      },
      
      goToNextStep: () => {
        const { currentStep, completedSteps } = get();
        const currentIndex = STEP_ORDER.indexOf(currentStep);
        
        if (currentIndex < STEP_ORDER.length - 1) {
          const nextStep = STEP_ORDER[currentIndex + 1];
          
          // Mark current as complete
          if (!completedSteps.includes(currentStep)) {
            set({
              completedSteps: [...completedSteps, currentStep],
              currentStep: nextStep,
            });
          } else {
            set({ currentStep: nextStep });
          }
        }
      },
      
      goToPreviousStep: () => {
        const { currentStep } = get();
        const currentIndex = STEP_ORDER.indexOf(currentStep);
        
        if (currentIndex > 0) {
          set({ currentStep: STEP_ORDER[currentIndex - 1] });
        }
      },

      // Form Data Updates
      updatePersonalDetails: (data) =>
        set((state) => ({
          personalDetails: { ...state.personalDetails, ...data },
        })),
        
      updateDrivingDetails: (data) =>
        set((state) => ({
          drivingDetails: { ...state.drivingDetails, ...data },
        })),
        
      updateVehicleDetails: (data) =>
        set((state) => ({
          vehicleDetails: { ...state.vehicleDetails, ...data },
        })),
        
      updateCoverPreferences: (data) =>
        set((state) => ({
          coverPreferences: { ...state.coverPreferences, ...data },
        })),

      // Results Management
      setQuotes: (quotes) => set({ quotes }),
      setLoading: (isLoading) => set({ isLoading }),
      setSearchId: (searchId) => set({ searchId }),

      // Sorting/Filtering
      setSortBy: (sortBy) => set({ sortBy }),
      setFilterBy: (filterBy) => set({ filterBy }),

      // Reset Functions
      resetQuote: () => set(initialState),
      
      clearResults: () => set({ quotes: [], searchId: null }),
    }),
    {
      name: 'compare-quote-storage',
      partialize: (state) => ({
        personalDetails: state.personalDetails,
        drivingDetails: state.drivingDetails,
        vehicleDetails: state.vehicleDetails,
        coverPreferences: state.coverPreferences,
        completedSteps: state.completedSteps,
        currentStep: state.currentStep,
      }),
    }
  )
);

// ============================================
// Selector Hooks
// ============================================
export const useCurrentStep = () => useQuoteStore((state) => state.currentStep);
export const useCompletedSteps = () => useQuoteStore((state) => state.completedSteps);
export const useQuotes = () => useQuoteStore((state) => state.quotes);
export const useIsLoading = () => useQuoteStore((state) => state.isLoading);

// Get sorted quotes
export const useSortedQuotes = () => {
  const quotes = useQuoteStore((state) => state.quotes);
  const sortBy = useQuoteStore((state) => state.sortBy);
  const filterBy = useQuoteStore((state) => state.filterBy);
  
  let filtered = [...quotes];
  
  // Apply filters
  if (filterBy.maxPrice) {
    filtered = filtered.filter((q) => q.pricing.annual <= filterBy.maxPrice!);
  }
  if (filterBy.minRating) {
    filtered = filtered.filter((q) => q.provider.rating >= filterBy.minRating!);
  }
  if (filterBy.coverLevel) {
    filtered = filtered.filter((q) => q.cover_level === filterBy.coverLevel);
  }
  
  // Apply sorting
  switch (sortBy) {
    case 'price_low':
      return filtered.sort((a, b) => a.pricing.annual - b.pricing.annual);
    case 'price_high':
      return filtered.sort((a, b) => b.pricing.annual - a.pricing.annual);
    case 'rating':
      return filtered.sort((a, b) => b.provider.rating - a.provider.rating);
    case 'provider':
      return filtered.sort((a, b) => a.provider.name.localeCompare(b.provider.name));
    default:
      return filtered;
  }
};

// Check if wizard is complete
export const useIsWizardComplete = () => {
  const completedSteps = useQuoteStore((state) => state.completedSteps);
  return STEP_ORDER.slice(0, -1).every((step) => completedSteps.includes(step));
};
