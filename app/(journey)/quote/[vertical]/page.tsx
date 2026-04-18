import { notFound } from 'next/navigation';
import { WizardForm } from '@/components/wizard/wizard-form';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ vertical: string }>;
}

const SUPPORTED_VERTICALS = ['car', 'home', 'pet', 'travel'];

export async function generateStaticParams() {
  return SUPPORTED_VERTICALS.map((vertical) => ({ vertical }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { vertical } = await params;
  const verticalNames: Record<string, string> = {
    car: 'Αυτοκινήτου',
    home: 'Κατοικίας',
    pet: 'Κατοικιδίων',
    travel: 'Ταξιδιού',
  };
  const verticalName = verticalNames[vertical] || vertical;
  
  return {
    title: `Προσφορά Ασφάλειας ${verticalName} | Sygrineto`,
    description: `Λάβετε προσφορά ασφάλειας ${verticalName.toLowerCase()} σε λίγα λεπτά. Συγκρίνετε τιμές από πάνω από 100 παρόχους.`,
  };
}

export default async function QuoteWizardPage({ params }: PageProps) {
  const { vertical } = await params;
  
  if (!SUPPORTED_VERTICALS.includes(vertical)) {
    notFound();
  }

  const verticalNames: Record<string, string> = {
    car: 'Αυτοκινήτου',
    home: 'Κατοικίας',
    pet: 'Κατοικιδίων',
    travel: 'Ταξιδιού',
  };
  const verticalName = verticalNames[vertical] || vertical;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-teal-50 py-8 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <span className="text-5xl mb-4 block">
          {vertical === 'car' ? '🚗' : vertical === 'home' ? '🏠' : vertical === 'pet' ? '🐕' : '✈️'}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
          Προσφορά Ασφάλειας {verticalName}
        </h1>
        <p className="text-slate-500 text-lg">
          Πείτε μας για εσάς για εξατομικευμένες προσφορές από 100+ παρόχους
        </p>
      </div>

      {/* Wizard Form */}
      <WizardForm />

      {/* Trust Signals */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span className="text-green-500">🔒</span>
            <span>Κρυπτογράφηση SSL 256-bit</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⭐</span>
            <span>4.8/5 Βαθμολογία</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🏛️</span>
            <span>Εποπτευόμενη Υπηρεσία</span>
          </div>
        </div>
      </div>
    </div>
  );
}
