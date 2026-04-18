import type { CarInsuranceQuote, Provider, CoverLevel } from '@/types';

// ============================================
// Mock Provider Data (Greek Insurance Companies)
// ============================================
export const MOCK_PROVIDERS: Provider[] = [
  { name: 'Εθνική Ασφαλιστική', logoUrl: '/providers/ethniki.svg', rating: 5, sponsored: false },
  { name: 'Interamerican', logoUrl: '/providers/interamerican.svg', rating: 5, sponsored: false },
  { name: 'Eurolife FFH', logoUrl: '/providers/eurolife.svg', rating: 4, sponsored: false },
  { name: 'ΝΝ Hellas', logoUrl: '/providers/nnhellas.svg', rating: 4, sponsored: false },
  { name: 'Generali Greece', logoUrl: '/providers/generali.svg', rating: 4, sponsored: true },
  { name: 'Groupama Ασφαλιστική', logoUrl: '/providers/groupama.svg', rating: 5, sponsored: false },
  { name: 'Ευρωπαϊκή Πίστη', logoUrl: '/providers/europisti.svg', rating: 4, sponsored: false },
  { name: 'Allianz', logoUrl: '/providers/allianz.svg', rating: 4, sponsored: false },
  { name: 'AXA Ασφάλειες', logoUrl: '/providers/axa.svg', rating: 5, sponsored: false },
  { name: 'Ergo Ασφαλιστική', logoUrl: '/providers/ergo.svg', rating: 4, sponsored: false },
  { name: 'Minetta', logoUrl: '/providers/minetta.svg', rating: 3, sponsored: false },
  { name: 'Anytime', logoUrl: '/providers/anytime.svg', rating: 4, sponsored: false },
  { name: 'Hellas Direct', logoUrl: '/providers/hellasdirect.svg', rating: 4, sponsored: false },
  { name: 'INTERLIFE', logoUrl: '/providers/interlife.svg', rating: 3, sponsored: false },
  { name: 'Ατλαντική Ένωση', logoUrl: '/providers/atlantiki.svg', rating: 3, sponsored: false },
];

// ============================================
// Marketing Text Templates (Greek)
// ============================================
const MARKETING_TEXTS = [
  'Φθηνότερη για νέους οδηγούς 18-24',
  'Κορυφαία εξυπηρέτηση πελατών',
  'Δωρεάν οδική βοήθεια',
  'Πιο ολοκληρωμένη κάλυψη',
  'Ιδανική για νέους οδηγούς',
  'Βραβευμένη εξυπηρέτηση αξιώσεων',
  'Έκπτωση πολλαπλών οχημάτων',
  'Bonus-Malus προστασία',
  'Ψηφίστηκε καλύτερη αξία 2024',
  'Φιλικές πολιτικές για οικογένειες',
  'Χαμηλή προκαταβολή',
  'Άτοκες μηνιαίες δόσεις',
  'Γρήγορη διαδικασία αξιώσεων',
  'Εγγύηση επώνυμου οδηγού',
  'Online έκπτωση',
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
  const basePrice = randomBetween(250, 650);

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
    slug: 'internet' as const,
    title: 'Ίντερνετ',
    description: 'Συγκρίνετε παρόχους ίντερνετ και πακέτα ευρυζωνικότητας',
    icon: '🌐',
    color: '#2196F3',
    features: ['Οπτική ίνα', 'VDSL', 'Δορυφορικό', 'Πακέτα TV+Internet'],
  },
  {
    slug: 'phone' as const,
    title: 'Τηλεφωνία',
    description: 'Συγκρίνετε προγράμματα κινητής και σταθερής τηλεφωνίας',
    icon: '📱',
    color: '#9C27B0',
    features: ['Κινητή τηλεφωνία', 'Σταθερή', 'Πακέτα data', 'Οικογενειακά πακέτα'],
  },
  {
    slug: 'car' as const,
    title: 'Ασφάλεια Αυτοκινήτου',
    description: 'Συγκρίνετε φθηνές ασφάλειες αυτοκινήτου από πάνω από 100 παρόχους',
    icon: '🚗',
    color: '#00A5E0',
    features: ['Μικτή κάλυψη', 'Μόνο τρίτων', 'Πυρός & κλοπής', 'Οδική βοήθεια'],
  },
  {
    slug: 'home' as const,
    title: 'Ασφάλεια Κατοικίας',
    description: 'Προστατέψτε το σπίτι και τα υπάρχοντά σας με τη σωστή κάλυψη',
    icon: '🏠',
    color: '#7B68EE',
    features: ['Ασφάλεια κτιρίου', 'Ασφάλεια περιεχομένου', 'Συνδυασμένες', 'Τυχαία ζημιά'],
  },
  {
    slug: 'pet' as const,
    title: 'Ασφάλεια Κατοικιδίων',
    description: 'Κρατήστε τα κατοικίδιά σας προστατευμένα',
    icon: '🐕',
    color: '#FF6B6B',
    features: ['Ισόβια κάλυψη', 'Μόνο ατύχημα', 'Κτηνιατρικά', 'Αστική ευθύνη'],
  },
  {
    slug: 'travel' as const,
    title: 'Ασφάλεια Ταξιδιού',
    description: 'Ταξιδέψτε ξένοιαστα με κάλυψη για το αναπάντεχο',
    icon: '✈️',
    color: '#4ECDC4',
    features: ['Μεμονωμένο ταξίδι', 'Ετήσια πολλαπλή', 'Ιατρική κάλυψη', 'Ακύρωση'],
  },
  {
    slug: 'life' as const,
    title: 'Ασφάλεια Ζωής',
    description: 'Προστατέψτε τους αγαπημένους σας με ασφάλεια ζωής',
    icon: '❤️',
    color: '#E91E63',
    features: ['Προθεσμιακή', 'Ισόβια', 'Σοβαρή ασθένεια', 'Προστασία εισοδήματος'],
  },
  {
    slug: 'energy' as const,
    title: 'Ενέργεια',
    description: 'Συγκρίνετε τιμολόγια ρεύματος και φυσικού αερίου',
    icon: '⚡',
    color: '#FFC107',
    features: ['Σταθερά τιμολόγια', 'Κυμαινόμενα', 'Πράσινη ενέργεια', 'Διπλό καύσιμο'],
  },
];
