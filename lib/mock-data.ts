import type { CarInsuranceQuote, Provider, CoverLevel } from '@/types';

// ============================================
// Mock Provider Data
// ============================================
export const MOCK_PROVIDERS: Provider[] = [
  { name: 'Admiral', logoUrl: '/providers/admiral.svg', rating: 5, sponsored: false },
  { name: 'Direct Line', logoUrl: '/providers/directline.svg', rating: 5, sponsored: false },
  { name: 'Aviva', logoUrl: '/providers/aviva.svg', rating: 4, sponsored: false },
  { name: 'Churchill', logoUrl: '/providers/churchill.svg', rating: 4, sponsored: false },
  { name: 'Hastings Direct', logoUrl: '/providers/hastings.svg', rating: 4, sponsored: true },
  { name: 'LV=', logoUrl: '/providers/lv.svg', rating: 5, sponsored: false },
  { name: 'More Than', logoUrl: '/providers/morethan.svg', rating: 3, sponsored: false },
  { name: 'Esure', logoUrl: '/providers/esure.svg', rating: 4, sponsored: false },
  { name: 'Confused.com', logoUrl: '/providers/confused.svg', rating: 3, sponsored: false },
  { name: 'GoCompare', logoUrl: '/providers/gocompare.svg', rating: 4, sponsored: false },
  { name: 'RAC', logoUrl: '/providers/rac.svg', rating: 4, sponsored: false },
  { name: 'AA Insurance', logoUrl: '/providers/aa.svg', rating: 5, sponsored: false },
  { name: 'Swinton', logoUrl: '/providers/swinton.svg', rating: 3, sponsored: false },
  { name: 'Saga', logoUrl: '/providers/saga.svg', rating: 4, sponsored: false },
  { name: 'Co-op Insurance', logoUrl: '/providers/coop.svg', rating: 3, sponsored: false },
];

// ============================================
// Marketing Text Templates
// ============================================
const MARKETING_TEXTS = [
  'Cheapest for 17-24 year olds',
  'Best rated for customer service',
  'Includes free breakdown cover',
  'Most comprehensive cover',
  'Top pick for new drivers',
  '5-star Defaqto rated',
  'Award-winning claims service',
  'Multi-car discount available',
  'No claims discount protected',
  'Voted best value insurer 2024',
  'Family-friendly policies',
  'Low deposit options available',
  'Interest-free monthly payments',
  'Fast track claims process',
  'Named driver guarantee',
];

// ============================================
// Helper Functions
// ============================================
const randomBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateId = (): string => {
  return `quote_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const getRandomBoolean = (probability: number = 0.5): boolean => {
  return Math.random() < probability;
};

// ============================================
// Generate Single Quote
// ============================================
export const generateMockQuote = (
  provider: Provider,
  coverLevel: CoverLevel,
  basePrice: number
): CarInsuranceQuote => {
  // Adjust price based on cover level
  let priceMultiplier = 1;
  switch (coverLevel) {
    case 'third_party':
      priceMultiplier = 0.7;
      break;
    case 'third_party_fire_theft':
      priceMultiplier = 0.85;
      break;
    case 'comprehensive':
      priceMultiplier = 1;
      break;
  }

  const annualPrice = Math.round(basePrice * priceMultiplier * (0.9 + Math.random() * 0.2));
  const monthlyPrice = Math.round((annualPrice / 12) * 1.1); // 10% markup for monthly
  const deposit = Math.round(annualPrice * 0.15); // 15% deposit

  // Generate policy dates
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 1);
  
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 30);

  return {
    id: generateId(),
    provider,
    pricing: {
      annual: annualPrice,
      monthly: monthlyPrice,
      deposit,
      excess: {
        compulsory: randomBetween(100, 350),
        voluntary: randomBetween(0, 500),
      },
    },
    features: {
      breakdown_cover: getRandomBoolean(0.6),
      windscreen: getRandomBoolean(0.8),
      courtesy_car: getRandomBoolean(0.5),
      legal_protection: getRandomBoolean(0.4),
      personal_accident: getRandomBoolean(0.3),
      no_claims_discount: randomBetween(0, 9),
    },
    rewards: {
      meerkat_movies: getRandomBoolean(0.7),
      meerkat_meals: getRandomBoolean(0.6),
      cashback: getRandomBoolean(0.3) ? randomBetween(10, 50) : 0,
    },
    cover_level: coverLevel,
    marketing_text: MARKETING_TEXTS[Math.floor(Math.random() * MARKETING_TEXTS.length)],
    policy_start_date: startDate.toISOString(),
    quote_valid_until: validUntil.toISOString(),
  };
};

// ============================================
// Generate Multiple Quotes
// ============================================
export const generateMockQuotes = (
  coverLevel: CoverLevel = 'comprehensive',
  count: number = 10
): CarInsuranceQuote[] => {
  // Shuffle providers and pick `count` number
  const shuffled = [...MOCK_PROVIDERS].sort(() => Math.random() - 0.5);
  const selectedProviders = shuffled.slice(0, Math.min(count, shuffled.length));

  // Base price varies by random factors (would be user demographics in real app)
  const basePrice = randomBetween(350, 850);

  const quotes = selectedProviders.map((provider) => 
    generateMockQuote(provider, coverLevel, basePrice)
  );

  // Ensure sponsored quote is at the top
  return quotes.sort((a, b) => {
    if (a.provider.sponsored && !b.provider.sponsored) return -1;
    if (!a.provider.sponsored && b.provider.sponsored) return 1;
    return a.pricing.annual - b.pricing.annual;
  });
};

// ============================================
// Insurance Vertical Configs
// ============================================
export const INSURANCE_VERTICALS = [
  {
    slug: 'car' as const,
    title: 'Car Insurance',
    description: 'Compare cheap car insurance quotes from over 100 providers',
    icon: '🚗',
    color: '#00A5E0',
    features: ['Comprehensive cover', 'Third party only', 'Fire & theft', 'Breakdown cover'],
  },
  {
    slug: 'home' as const,
    title: 'Home Insurance',
    description: 'Protect your home and belongings with the right cover',
    icon: '🏠',
    color: '#7B68EE',
    features: ['Buildings insurance', 'Contents insurance', 'Combined policies', 'Accidental damage'],
  },
  {
    slug: 'pet' as const,
    title: 'Pet Insurance',
    description: 'Keep your furry friends protected with comprehensive pet cover',
    icon: '🐕',
    color: '#FF6B6B',
    features: ['Lifetime cover', 'Accident only', 'Vet fees', 'Third party liability'],
  },
  {
    slug: 'travel' as const,
    title: 'Travel Insurance',
    description: 'Travel worry-free with cover for the unexpected',
    icon: '✈️',
    color: '#4ECDC4',
    features: ['Single trip', 'Annual multi-trip', 'Medical cover', 'Cancellation protection'],
  },
  {
    slug: 'life' as const,
    title: 'Life Insurance',
    description: 'Protect your loved ones with life insurance cover',
    icon: '❤️',
    color: '#E91E63',
    features: ['Term life', 'Whole life', 'Critical illness', 'Income protection'],
  },
  {
    slug: 'energy' as const,
    title: 'Energy',
    description: 'Compare gas and electricity tariffs to save on your bills',
    icon: '⚡',
    color: '#FFC107',
    features: ['Fixed tariffs', 'Variable rates', 'Green energy', 'Dual fuel discounts'],
  },
];
