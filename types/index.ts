// ============================================
// Provider Types
// ============================================
export interface Provider {
  name: string;
  logoUrl: string;
  rating: number; // Defaqto rating 1-5
  sponsored: boolean;
}

// ============================================
// Pricing Types
// ============================================
export interface Pricing {
  annual: number;
  monthly: number;
  deposit: number;
  excess: {
    compulsory: number;
    voluntary: number;
  };
}

// ============================================
// Feature Types
// ============================================
export interface Features {
  breakdown_cover: boolean;
  windscreen: boolean;
  courtesy_car: boolean;
  legal_protection: boolean;
  personal_accident: boolean;
  no_claims_discount: number; // Years protected
}

// ============================================
// Rewards/Perks Types
// ============================================
export interface Rewards {
  meerkat_movies: boolean;
  meerkat_meals: boolean;
  cashback: number;
}

// ============================================
// Cover Level Types
// ============================================
export type CoverLevel = 'third_party' | 'third_party_fire_theft' | 'comprehensive';

// ============================================
// Car Insurance Quote Interface
// ============================================
export interface CarInsuranceQuote {
  id: string;


  provider: Provider;
  pricing: Pricing;
  features: Features;
  rewards: Rewards;
  cover_level: CoverLevel;
  marketing_text: string;
  
  // Metadata
  quote_valid_until: string;
  policy_start_date: string;
}

// ============================================
// User Form Data Types
// ============================================
export interface PersonalDetails {
  title: 'Mr' | 'Mrs' | 'Ms' | 'Miss' | 'Dr' | 'Other';
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: {
    postcode: string;
    line1: string;
    line2?: string;
    city: string;
    county?: string;
  };
  occupation: string;
  employmentStatus: 'employed' | 'self_employed' | 'unemployed' | 'student' | 'retired';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed' | 'civil_partnership';
  homeOwner: boolean;
}

export interface DrivingDetails {
  licenseType: 'full_uk' | 'provisional' | 'eu' | 'international';
  licenseNumber: string;
  yearsHeld: number;
  passedPlus: boolean;
  claims: ClaimHistory[];
  convictions: ConvictionHistory[];
  medicalConditions: boolean;
  dvlaAware: boolean;
}

export interface ClaimHistory {
  type: 'accident' | 'theft' | 'fire' | 'windscreen' | 'vandalism' | 'other';
  date: string;
  fault: boolean;
  settled: boolean;
  cost: number;
}

export interface ConvictionHistory {
  code: string;
  date: string;
  points: number;
  fine: number;
  ban: boolean;
  banLength?: number;
}

export interface VehicleDetails {
  registration: string;
  make: string;
  model: string;
  year: number;
  engineSize: number;
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid' | 'lpg';
  transmission: 'manual' | 'automatic';
  bodyType: string;
  doors: number;
  seats: number;
  currentValue: number;
  modifications: boolean;
  imported: boolean;
  securityFeatures: string[];
  overnightLocation: 'garage' | 'driveway' | 'street' | 'car_park';
  annualMileage: number;
  usage: 'social' | 'commuting' | 'business';
}

export interface CoverPreferences {
  coverLevel: CoverLevel;
  voluntaryExcess: number;
  paymentFrequency: 'annual' | 'monthly';
  startDate: string;
  additionalDrivers: AdditionalDriver[];
}

export interface AdditionalDriver {
  relationship: string;
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  licenseType: string;
  yearsHeld: number;
  occupation: string;
}

// ============================================
// Complete Quote Request
// ============================================
export interface QuoteRequest {
  personal: PersonalDetails;
  driving: DrivingDetails;
  vehicle: VehicleDetails;
  cover: CoverPreferences;
}

// ============================================
// API Response Types
// ============================================
export interface QuoteResponse {
  success: boolean;
  quotes: CarInsuranceQuote[];
  timestamp: string;
  searchId: string;
}

// ============================================
// Insurance Vertical Types
// ============================================
export type InsuranceVertical = 'car' | 'home' | 'pet' | 'travel' | 'life' | 'energy';

export interface InsuranceVerticalConfig {
  slug: InsuranceVertical;
  title: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
}

// ============================================
// Wizard Step Types
// ============================================
export interface WizardStep {
  id: string;
  title: string;
  description: string;
  fields: string[];
  isComplete: boolean;
}

export type WizardStepId = 'personal' | 'driving' | 'vehicle' | 'cover' | 'review';
