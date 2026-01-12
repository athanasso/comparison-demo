import { z } from 'zod';

// ============================================
// UK-Specific Validation Patterns
// ============================================
const UK_POSTCODE_REGEX = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
const UK_PHONE_REGEX = /^(\+44|0)7\d{9}$/;
const UK_DRIVING_LICENSE_REGEX = /^[A-Z]{2}[0-9]{6}[A-Z]{2}[0-9A-Z]{5}$/i;
const UK_REG_PLATE_REGEX = /^[A-Z]{2}[0-9]{2}\s?[A-Z]{3}$|^[A-Z][0-9]{1,3}\s?[A-Z]{3}$|^[A-Z]{3}\s?[0-9]{1,3}[A-Z]$|^[0-9]{1,4}\s?[A-Z]{1,3}$|^[A-Z]{1,3}\s?[0-9]{1,4}$/i;

// ============================================
// Personal Details Schema
// ============================================
export const personalDetailsSchema = z.object({
  title: z.enum(['Mr', 'Mrs', 'Ms', 'Miss', 'Dr', 'Other'], {
    message: 'Please select a title',
  }),
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s-']+$/, 'First name can only contain letters, spaces, hyphens and apostrophes'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s-']+$/, 'Last name can only contain letters, spaces, hyphens and apostrophes'),
  dateOfBirth: z
    .string()
    .refine((date) => {
      const dob = new Date(date);
      const age = Math.floor((Date.now() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
      return age >= 17;
    }, 'You must be at least 17 years old to get car insurance')
    .refine((date) => {
      const dob = new Date(date);
      const age = Math.floor((Date.now() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
      return age <= 100;
    }, 'Please enter a valid date of birth'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(UK_PHONE_REGEX, 'Please enter a valid UK mobile number (e.g., 07123456789)'),
  address: z.object({
    postcode: z
      .string()
      .regex(UK_POSTCODE_REGEX, 'Please enter a valid UK postcode'),
    line1: z
      .string()
      .min(3, 'Address line 1 is required')
      .max(100, 'Address line 1 must be less than 100 characters'),
    line2: z.string().max(100).optional(),
    city: z
      .string()
      .min(2, 'City is required')
      .max(50, 'City must be less than 50 characters'),
    county: z.string().max(50).optional(),
  }),
  occupation: z
    .string()
    .min(2, 'Please enter your occupation')
    .max(100, 'Occupation must be less than 100 characters'),
  employmentStatus: z.enum(['employed', 'self_employed', 'unemployed', 'student', 'retired'], {
    message: 'Please select your employment status',
  }),
  maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed', 'civil_partnership'], {
    message: 'Please select your marital status',
  }),
  homeOwner: z.boolean(),
});

// ============================================
// Driving Details Schema
// ============================================
export const drivingDetailsSchema = z.object({
  licenseType: z.enum(['full_uk', 'provisional', 'eu', 'international'], {
    message: 'Please select your license type',
  }),
  licenseNumber: z
    .string()
    .regex(UK_DRIVING_LICENSE_REGEX, 'Please enter a valid UK driving license number'),
  yearsHeld: z
    .number()
    .min(0, 'Years held cannot be negative')
    .max(80, 'Please enter a valid number of years'),
  passedPlus: z.boolean(),
  claims: z.array(
    z.object({
      type: z.enum(['accident', 'theft', 'fire', 'windscreen', 'vandalism', 'other']),
      date: z.string(),
      fault: z.boolean(),
      settled: z.boolean(),
      cost: z.number().min(0),
    })
  ),
  convictions: z.array(
    z.object({
      code: z.string().min(2).max(10),
      date: z.string(),
      points: z.number().min(0).max(12),
      fine: z.number().min(0),
      ban: z.boolean(),
      banLength: z.number().optional(),
    })
  ),
  medicalConditions: z.boolean(),
  dvlaAware: z.boolean().optional(),
}).refine(
  (data) => {
    // If has medical conditions, DVLA must be aware
    if (data.medicalConditions && data.dvlaAware === undefined) {
      return false;
    }
    return true;
  },
  {
    message: 'Please confirm whether the DVLA is aware of your medical conditions',
    path: ['dvlaAware'],
  }
);

// ============================================
// Vehicle Details Schema
// ============================================
export const vehicleDetailsSchema = z.object({
  registration: z
    .string()
    .regex(UK_REG_PLATE_REGEX, 'Please enter a valid UK registration number'),
  make: z
    .string()
    .min(2, 'Please enter the vehicle make')
    .max(50, 'Make must be less than 50 characters'),
  model: z
    .string()
    .min(1, 'Please enter the vehicle model')
    .max(50, 'Model must be less than 50 characters'),
  year: z
    .number()
    .min(1900, 'Please enter a valid year')
    .max(new Date().getFullYear() + 1, 'Year cannot be in the future'),
  engineSize: z
    .number()
    .min(50, 'Engine size must be at least 50cc')
    .max(10000, 'Engine size must be less than 10000cc'),
  fuelType: z.enum(['petrol', 'diesel', 'electric', 'hybrid', 'lpg'], {
    message: 'Please select fuel type',
  }),
  transmission: z.enum(['manual', 'automatic'], {
    message: 'Please select transmission type',
  }),
  bodyType: z.string().min(2, 'Please enter body type'),
  doors: z.number().min(1).max(6),
  seats: z.number().min(1).max(12),
  currentValue: z
    .number()
    .min(100, 'Vehicle value must be at least £100')
    .max(500000, 'Vehicle value must be less than £500,000'),
  modifications: z.boolean(),
  imported: z.boolean(),
  securityFeatures: z.array(z.string()),
  overnightLocation: z.enum(['garage', 'driveway', 'street', 'car_park'], {
    message: 'Please select where the vehicle is kept overnight',
  }),
  annualMileage: z
    .number()
    .min(0, 'Annual mileage cannot be negative')
    .max(200000, 'Annual mileage seems too high'),
  usage: z.enum(['social', 'commuting', 'business'], {
    message: 'Please select how you use the vehicle',
  }),
});

// ============================================
// Cover Preferences Schema
// ============================================
export const coverPreferencesSchema = z.object({
  coverLevel: z.enum(['third_party', 'third_party_fire_theft', 'comprehensive'], {
    message: 'Please select your cover level',
  }),
  voluntaryExcess: z
    .number()
    .min(0, 'Voluntary excess cannot be negative')
    .max(1000, 'Voluntary excess must be £1000 or less'),
  paymentFrequency: z.enum(['annual', 'monthly'], {
    message: 'Please select payment frequency',
  }),
  startDate: z.string(),
  additionalDrivers: z.array(
    z.object({
      relationship: z.string().min(2),
      title: z.string().min(2),
      firstName: z.string().min(2).max(50),
      lastName: z.string().min(2).max(50),
      dateOfBirth: z.string(),
      licenseType: z.string(),
      yearsHeld: z.number().min(0),
      occupation: z.string().min(2),
    })
  ),
});

// ============================================
// Export Types
// ============================================
export type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;
export type DrivingDetailsFormData = z.infer<typeof drivingDetailsSchema>;
export type VehicleDetailsFormData = z.infer<typeof vehicleDetailsSchema>;
export type CoverPreferencesFormData = z.infer<typeof coverPreferencesSchema>;
