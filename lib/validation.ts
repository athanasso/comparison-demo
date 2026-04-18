import { z } from 'zod';

// ============================================
// Greece-Specific Validation Patterns
// ============================================
const GR_POSTCODE_REGEX = /^[0-9]{3}\s?[0-9]{2}$/;
const GR_PHONE_REGEX = /^(\+30|0)?(69\d{8}|2\d{9})$/;
const GR_DRIVING_LICENSE_REGEX = /^[A-ZΑ-Ω]{2,3}[0-9]{6,8}$/i;
const GR_REG_PLATE_REGEX = /^[A-ZΑ-Ω]{3}\s?-?\s?[0-9]{4}$/i;

// ============================================
// Personal Details Schema
// ============================================
export const personalDetailsSchema = z.object({
  title: z.enum(['Mr', 'Mrs', 'Ms', 'Miss', 'Dr', 'Other'], {
    message: 'Παρακαλώ επιλέξτε προσφώνηση',
  }),
  firstName: z
    .string()
    .min(2, 'Το όνομα πρέπει να έχει τουλάχιστον 2 χαρακτήρες')
    .max(50, 'Το όνομα πρέπει να έχει λιγότερους από 50 χαρακτήρες')
    .regex(/^[a-zA-Zα-ωΑ-Ωάέήίόύώϊϋΐΰ\s\-']+$/, 'Το όνομα μπορεί να περιέχει μόνο γράμματα, κενά, παύλες και αποστρόφους'),
  lastName: z
    .string()
    .min(2, 'Το επώνυμο πρέπει να έχει τουλάχιστον 2 χαρακτήρες')
    .max(50, 'Το επώνυμο πρέπει να έχει λιγότερους από 50 χαρακτήρες')
    .regex(/^[a-zA-Zα-ωΑ-Ωάέήίόύώϊϋΐΰ\s\-']+$/, 'Το επώνυμο μπορεί να περιέχει μόνο γράμματα, κενά, παύλες και αποστρόφους'),
  dateOfBirth: z
    .string()
    .refine((date) => {
      const dob = new Date(date);
      const age = Math.floor((Date.now() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
      return age >= 18;
    }, 'Πρέπει να είστε τουλάχιστον 18 ετών για ασφάλεια αυτοκινήτου')
    .refine((date) => {
      const dob = new Date(date);
      const age = Math.floor((Date.now() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
      return age <= 100;
    }, 'Παρακαλώ εισάγετε έγκυρη ημερομηνία γέννησης'),
  email: z
    .string()
    .email('Παρακαλώ εισάγετε έγκυρο email'),
  phone: z
    .string()
    .regex(GR_PHONE_REGEX, 'Παρακαλώ εισάγετε έγκυρο ελληνικό τηλέφωνο (π.χ. 6912345678)'),
  address: z.object({
    postcode: z
      .string()
      .regex(GR_POSTCODE_REGEX, 'Παρακαλώ εισάγετε έγκυρο ΤΚ (π.χ. 106 71)'),
    line1: z
      .string()
      .min(3, 'Η διεύθυνση είναι υποχρεωτική')
      .max(100, 'Η διεύθυνση πρέπει να έχει λιγότερους από 100 χαρακτήρες'),
    line2: z.string().max(100).optional(),
    city: z
      .string()
      .min(2, 'Η πόλη είναι υποχρεωτική')
      .max(50, 'Η πόλη πρέπει να έχει λιγότερους από 50 χαρακτήρες'),
    county: z.string().max(50).optional(),
  }),
  occupation: z
    .string()
    .min(2, 'Παρακαλώ εισάγετε το επάγγελμά σας')
    .max(100, 'Το επάγγελμα πρέπει να έχει λιγότερους από 100 χαρακτήρες'),
  employmentStatus: z.enum(['employed', 'self_employed', 'unemployed', 'student', 'retired'], {
    message: 'Παρακαλώ επιλέξτε εργασιακή κατάσταση',
  }),
  maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed', 'civil_partnership'], {
    message: 'Παρακαλώ επιλέξτε οικογενειακή κατάσταση',
  }),
  homeOwner: z.boolean(),
});

// ============================================
// Driving Details Schema
// ============================================
export const drivingDetailsSchema = z.object({
  licenseType: z.enum(['full_gr', 'provisional', 'eu', 'international'], {
    message: 'Παρακαλώ επιλέξτε τύπο διπλώματος',
  }),
  licenseNumber: z
    .string()
    .regex(GR_DRIVING_LICENSE_REGEX, 'Παρακαλώ εισάγετε έγκυρο αριθμό διπλώματος'),
  yearsHeld: z
    .number()
    .min(0, 'Τα χρόνια δεν μπορούν να είναι αρνητικά')
    .max(80, 'Παρακαλώ εισάγετε έγκυρο αριθμό χρόνων'),
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
    // If has medical conditions, authorities must be aware
    if (data.medicalConditions && data.dvlaAware === undefined) {
      return false;
    }
    return true;
  },
  {
    message: 'Παρακαλώ επιβεβαιώστε ότι οι αρμόδιες αρχές γνωρίζουν για τις ιατρικές καταστάσεις σας',
    path: ['dvlaAware'],
  }
);

// ============================================
// Vehicle Details Schema
// ============================================
export const vehicleDetailsSchema = z.object({
  registration: z
    .string()
    .regex(GR_REG_PLATE_REGEX, 'Παρακαλώ εισάγετε έγκυρο αριθμό κυκλοφορίας (π.χ. ΑΒΓ-1234)'),
  make: z
    .string()
    .min(2, 'Παρακαλώ εισάγετε τη μάρκα')
    .max(50, 'Η μάρκα πρέπει να έχει λιγότερους από 50 χαρακτήρες'),
  model: z
    .string()
    .min(1, 'Παρακαλώ εισάγετε το μοντέλο')
    .max(50, 'Το μοντέλο πρέπει να έχει λιγότερους από 50 χαρακτήρες'),
  year: z
    .number()
    .min(1900, 'Παρακαλώ εισάγετε έγκυρο έτος')
    .max(new Date().getFullYear() + 1, 'Το έτος δεν μπορεί να είναι στο μέλλον'),
  engineSize: z
    .number()
    .min(50, 'Ο κυβισμός πρέπει να είναι τουλάχιστον 50cc')
    .max(10000, 'Ο κυβισμός πρέπει να είναι λιγότερο από 10000cc'),
  fuelType: z.enum(['petrol', 'diesel', 'electric', 'hybrid', 'lpg'], {
    message: 'Παρακαλώ επιλέξτε καύσιμο',
  }),
  transmission: z.enum(['manual', 'automatic'], {
    message: 'Παρακαλώ επιλέξτε κιβώτιο',
  }),
  bodyType: z.string().min(2, 'Παρακαλώ εισάγετε τύπο αμαξώματος'),
  doors: z.number().min(1).max(6),
  seats: z.number().min(1).max(12),
  currentValue: z
    .number()
    .min(100, 'Η αξία πρέπει να είναι τουλάχιστον 100€')
    .max(500000, 'Η αξία πρέπει να είναι λιγότερο από 500.000€'),
  modifications: z.boolean(),
  imported: z.boolean(),
  securityFeatures: z.array(z.string()),
  overnightLocation: z.enum(['garage', 'driveway', 'street', 'car_park'], {
    message: 'Παρακαλώ επιλέξτε πού φυλάσσεται το όχημα τη νύχτα',
  }),
  annualMileage: z
    .number()
    .min(0, 'Τα ετήσια χιλιόμετρα δεν μπορούν να είναι αρνητικά')
    .max(200000, 'Τα ετήσια χιλιόμετρα φαίνονται πολύ υψηλά'),
  usage: z.enum(['social', 'commuting', 'business'], {
    message: 'Παρακαλώ επιλέξτε χρήση οχήματος',
  }),
});

// ============================================
// Cover Preferences Schema
// ============================================
export const coverPreferencesSchema = z.object({
  coverLevel: z.enum(['third_party', 'third_party_fire_theft', 'comprehensive'], {
    message: 'Παρακαλώ επιλέξτε επίπεδο κάλυψης',
  }),
  voluntaryExcess: z
    .number()
    .min(0, 'Η προαιρετική απαλλαγή δεν μπορεί να είναι αρνητική')
    .max(1000, 'Η προαιρετική απαλλαγή πρέπει να είναι 1000€ ή λιγότερο'),
  paymentFrequency: z.enum(['annual', 'monthly'], {
    message: 'Παρακαλώ επιλέξτε συχνότητα πληρωμής',
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
