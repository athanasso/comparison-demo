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
      title: 'Σχετικά με Εσάς',
      icon: User,
      items: [
        { label: 'Όνομα', value: `${personalDetails.title} ${personalDetails.firstName} ${personalDetails.lastName}` },
        { label: 'Ημερομηνία Γέννησης', value: personalDetails.dateOfBirth ? formatDate(personalDetails.dateOfBirth) : '-' },
        { label: 'Email', value: personalDetails.email },
        { label: 'Τηλέφωνο', value: personalDetails.phone },
        { label: 'Διεύθυνση', value: personalDetails.address ? `${personalDetails.address.line1}, ${personalDetails.address.city}, ${personalDetails.address.postcode}` : '-' },
        { label: 'Επάγγελμα', value: personalDetails.occupation },
        { label: 'Εργασία', value: personalDetails.employmentStatus?.replace('_', ' ') },
      ],
    },
    {
      id: 'driving',
      title: 'Η Οδήγησή σας',
      icon: FileText,
      items: [
        { label: 'Τύπος Διπλώματος', value: drivingDetails.licenseType?.replace('full_gr', 'Ελληνικό Κανονικό').replace('provisional', 'Προσωρινό').replace('eu', 'Ευρωπαϊκό').replace('international', 'Διεθνές') },
        { label: 'Αριθμός Διπλώματος', value: drivingDetails.licenseNumber },
        { label: 'Χρόνια Κατοχής', value: `${drivingDetails.yearsHeld} χρόνια` },
        { label: 'Πρόσθετα Μαθήματα', value: drivingDetails.passedPlus ? 'Ναι' : 'Όχι' },
        { label: 'Ιατρικές Καταστάσεις', value: drivingDetails.medicalConditions ? 'Ναι - η αρχή ενήμερη' : 'Καμία' },
      ],
    },
    {
      id: 'vehicle',
      title: 'Το Αυτοκίνητό σας',
      icon: Car,
      items: [
        { label: 'Αρ. Κυκλοφορίας', value: vehicleDetails.registration?.toUpperCase() },
        { label: 'Όχημα', value: `${vehicleDetails.year} ${vehicleDetails.make} ${vehicleDetails.model}` },
        { label: 'Κινητήρας', value: `${vehicleDetails.engineSize}cc ${vehicleDetails.fuelType} ${vehicleDetails.transmission}` },
        { label: 'Αξία', value: vehicleDetails.currentValue ? `€${vehicleDetails.currentValue.toLocaleString('el-GR')}` : '-' },
        { label: 'Ετήσια Χλμ', value: vehicleDetails.annualMileage ? `${vehicleDetails.annualMileage.toLocaleString('el-GR')} χλμ` : '-' },
        { label: 'Χρήση', value: vehicleDetails.usage },
        { label: 'Νυχτ. Στάθμευση', value: vehicleDetails.overnightLocation?.replace('_', ' ') },
      ],
    },
    {
      id: 'cover',
      title: 'Η Κάλυψή σας',
      icon: Shield,
      items: [
        { label: 'Επίπεδο Κάλυψης', value: coverPreferences.coverLevel?.replace('comprehensive', 'Μικτή (Πλήρης)').replace('third_party_fire_theft', 'Τρίτων, Πυρός & Κλοπής').replace('third_party', 'Μόνο Τρίτων') },
        { label: 'Προαιρετική Απαλλαγή', value: coverPreferences.voluntaryExcess !== undefined ? `€${coverPreferences.voluntaryExcess}` : '-' },
        { label: 'Πληρωμή', value: coverPreferences.paymentFrequency === 'annual' ? 'Ετήσια' : 'Μηνιαία' },
        { label: 'Ημ. Έναρξης', value: coverPreferences.startDate ? formatDate(coverPreferences.startDate) : '-' },
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
          <h2 className="text-2xl font-bold text-slate-800">Ανασκόπηση Στοιχείων</h2>
          <p className="text-slate-500">Ελέγξτε ότι όλα είναι σωστά πριν λάβετε προσφορές</p>
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
                Επεξεργασία
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
          Κάνοντας κλικ στο &quot;Λάβετε Προσφορές&quot;, επιβεβαιώνετε ότι τα στοιχεία είναι ακριβή. 
          Η παροχή ψευδών πληροφοριών μπορεί να ακυρώσει το ασφαλιστήριο.
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
          Πίσω
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
          Λάβετε Προσφορές
        </button>
      </div>
    </div>
  );
}
