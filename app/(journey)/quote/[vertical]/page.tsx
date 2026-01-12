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
  const verticalName = vertical.charAt(0).toUpperCase() + vertical.slice(1);
  
  return {
    title: `${verticalName} Insurance Quote | CompareKat`,
    description: `Get your ${vertical} insurance quote in minutes. Compare prices from over 100 providers.`,
  };
}

export default async function QuoteWizardPage({ params }: PageProps) {
  const { vertical } = await params;
  
  if (!SUPPORTED_VERTICALS.includes(vertical)) {
    notFound();
  }

  const verticalName = vertical.charAt(0).toUpperCase() + vertical.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-teal-50 py-8 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <span className="text-5xl mb-4 block">
          {vertical === 'car' ? '🚗' : vertical === 'home' ? '🏠' : vertical === 'pet' ? '🐕' : '✈️'}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
          {verticalName} Insurance Quote
        </h1>
        <p className="text-slate-500 text-lg">
          Tell us about yourself to get personalized quotes from 100+ providers
        </p>
      </div>

      {/* Wizard Form */}
      <WizardForm />

      {/* Trust Signals */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span className="text-green-500">🔒</span>
            <span>256-bit SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⭐</span>
            <span>4.8/5 Trustpilot Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🏛️</span>
            <span>FCA Regulated</span>
          </div>
        </div>
      </div>
    </div>
  );
}
