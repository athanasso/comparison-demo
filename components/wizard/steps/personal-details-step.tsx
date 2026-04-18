'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuoteStore } from '@/store/quote-store';
import { personalDetailsSchema, type PersonalDetailsFormData } from '@/lib/validation';
import { ArrowRight, User, Mail, Phone, MapPin, Briefcase } from 'lucide-react';

export function PersonalDetailsStep() {
  const { personalDetails, updatePersonalDetails, goToNextStep } = useQuoteStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PersonalDetailsFormData>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      title: personalDetails.title || undefined,
      firstName: personalDetails.firstName || '',
      lastName: personalDetails.lastName || '',
      dateOfBirth: personalDetails.dateOfBirth || '',
      email: personalDetails.email || '',
      phone: personalDetails.phone || '',
      address: {
        postcode: personalDetails.address?.postcode || '',
        line1: personalDetails.address?.line1 || '',
        line2: personalDetails.address?.line2 || '',
        city: personalDetails.address?.city || '',
        county: personalDetails.address?.county || '',
      },
      occupation: personalDetails.occupation || '',
      employmentStatus: personalDetails.employmentStatus || undefined,
      maritalStatus: personalDetails.maritalStatus || undefined,
      homeOwner: personalDetails.homeOwner ?? false,
    },
  });

  const onSubmit = (data: PersonalDetailsFormData) => {
    updatePersonalDetails(data);
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
  const errorClass = 'text-red-500 text-sm mt-1.5 flex items-center gap-1';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl text-white">
          <User className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Σχετικά με Εσάς</h2>
          <p className="text-slate-500">Πείτε μας λίγα λόγια για εσάς</p>
        </div>
      </div>

      {/* Title and Name */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className={labelClass}>Προσφώνηση</label>
          <select {...register('title')} className={inputClass(!!errors.title)}>
            <option value="">Επιλέξτε...</option>
            <option value="Mr">Κος</option>
            <option value="Mrs">Κα</option>
            <option value="Ms">Κα</option>
            <option value="Miss">Δνίδα</option>
            <option value="Dr">Δρ</option>
            <option value="Other">Άλλο</option>
          </select>
          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>
        <div className="md:col-span-1">
          <label className={labelClass}>Όνομα</label>
          <input
            {...register('firstName')}
            className={inputClass(!!errors.firstName)}
            placeholder="Γιάννης"
          />
          {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Επώνυμο</label>
          <input
            {...register('lastName')}
            className={inputClass(!!errors.lastName)}
            placeholder="Παπαδόπουλος"
          />
          {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
        </div>
      </div>

      {/* Date of Birth */}
      <div>
        <label className={labelClass}>Ημερομηνία Γέννησης</label>
        <input
          type="date"
          {...register('dateOfBirth')}
          className={inputClass(!!errors.dateOfBirth)}
        />
        {errors.dateOfBirth && <p className={errorClass}>{errors.dateOfBirth.message}</p>}
      </div>

      {/* Contact Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email
            </span>
          </label>
          <input
            type="email"
            {...register('email')}
            className={inputClass(!!errors.email)}
            placeholder="giannis@example.com"
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelClass}>
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> Τηλέφωνο
            </span>
          </label>
          <input
            {...register('phone')}
            className={inputClass(!!errors.phone)}
            placeholder="6912345678"
          />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
      </div>

      {/* Address */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-slate-700 font-semibold">
          <MapPin className="w-4 h-4" /> Διεύθυνση
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Ταχυδρομικός Κώδικας</label>
            <input
              {...register('address.postcode')}
              className={inputClass(!!errors.address?.postcode)}
              placeholder="106 71"
            />
            {errors.address?.postcode && (
              <p className={errorClass}>{errors.address.postcode.message}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Διεύθυνση - Γραμμή 1</label>
            <input
              {...register('address.line1')}
              className={inputClass(!!errors.address?.line1)}
              placeholder="Λεωφ. Βασ. Σοφίας 1"
            />
            {errors.address?.line1 && (
              <p className={errorClass}>{errors.address.line1.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Διεύθυνση - Γραμμή 2 (Προαιρετικό)</label>
            <input
              {...register('address.line2')}
              className={inputClass(false)}
              placeholder="Όροφος 3"
            />
          </div>
          <div>
            <label className={labelClass}>Πόλη</label>
            <input
              {...register('address.city')}
              className={inputClass(!!errors.address?.city)}
              placeholder="Αθήνα"
            />
            {errors.address?.city && (
              <p className={errorClass}>{errors.address.city.message}</p>
            )}
          </div>
          <div>
            <label className={labelClass}>Νομός (Προαιρετικό)</label>
            <input
              {...register('address.county')}
              className={inputClass(false)}
              placeholder="Αττικής"
            />
          </div>
        </div>
      </div>

      {/* Employment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            <span className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Επάγγελμα
            </span>
          </label>
          <input
            {...register('occupation')}
            className={inputClass(!!errors.occupation)}
            placeholder="Μηχανικός Λογισμικού"
          />
          {errors.occupation && <p className={errorClass}>{errors.occupation.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Εργασιακή Κατάσταση</label>
          <select
            {...register('employmentStatus')}
            className={inputClass(!!errors.employmentStatus)}
          >
            <option value="">Επιλέξτε...</option>
            <option value="employed">Εργαζόμενος/η</option>
            <option value="self_employed">Ελεύθερος/η Επαγγελματίας</option>
            <option value="unemployed">Άνεργος/η</option>
            <option value="student">Φοιτητής/τρια</option>
            <option value="retired">Συνταξιούχος</option>
          </select>
          {errors.employmentStatus && (
            <p className={errorClass}>{errors.employmentStatus.message}</p>
          )}
        </div>
      </div>

      {/* Marital Status & Home Owner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Οικογενειακή Κατάσταση</label>
          <select
            {...register('maritalStatus')}
            className={inputClass(!!errors.maritalStatus)}
          >
            <option value="">Επιλέξτε...</option>
            <option value="single">Άγαμος/η</option>
            <option value="married">Έγγαμος/η</option>
            <option value="divorced">Διαζευγμένος/η</option>
            <option value="widowed">Χήρος/α</option>
            <option value="civil_partnership">Σύμφωνο Συμβίωσης</option>
          </select>
          {errors.maritalStatus && (
            <p className={errorClass}>{errors.maritalStatus.message}</p>
          )}
        </div>
        <div className="flex items-center">
          <label className="flex items-center gap-3 cursor-pointer p-4 bg-slate-50 rounded-xl border-2 border-slate-200 hover:border-teal-300 transition-colors w-full">
            <input
              type="checkbox"
              {...register('homeOwner')}
              className="w-5 h-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            />
            <span className="font-medium text-slate-700">Έχω ιδιόκτητη κατοικία</span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full py-4 px-6 rounded-xl font-bold text-lg
          bg-gradient-to-r from-teal-500 to-emerald-500 text-white
          hover:from-teal-600 hover:to-emerald-600
          transform hover:scale-[1.02] active:scale-[0.98]
          transition-all duration-200 shadow-lg shadow-teal-500/30
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          flex items-center justify-center gap-3
        "
      >
        Συνέχεια στην Οδήγηση
        <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  );
}
