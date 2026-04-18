# 🔍 Sygrineto - Σύγκριση Ασφαλειών & Υπηρεσιών

Ένα πλήρες demo ιστοσελίδας σύγκρισης τιμών, χτισμένο με Next.js 16, για τη Greek αγορά. Η εφαρμογή υποστηρίζει ελληνικά (κύρια γλώσσα) και αγγλικά.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🏠 **SEO-Optimized Landing Pages** - Static marketing pages with ISR support
- 📝 **Multi-Step Quote Wizard** - 5-step form with validation and progress tracking
- 📊 **Dynamic Results Dashboard** - Sortable, filterable comparison grid
- 💾 **Persistent State** - Form data saved to localStorage
- 🔍 **Helper Assistant** - Idle-triggered assistant with tips
- 🇬🇷 **Greek Localization** - Primary language Greek, English option available
- 🌐 **Internet & Phone** - Compare broadband and phone plans
- 📱 **Fully Responsive** - Mobile-first design

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [Zustand](https://zustand-demo.pmnd.rs/) | State management |
| [Zod](https://zod.dev/) | Schema validation |
| [React Hook Form](https://react-hook-form.com/) | Form handling |
| [Lucide React](https://lucide.dev/) | Icons |

## 📁 Project Structure

```
app/
├── (marketing)/              # Static SEO pages
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Marketing layout with nav/footer
│   └── insurance/[type]/     # Dynamic landing pages
├── (journey)/                # Quote funnel
│   └── quote/[vertical]/     # Multi-step wizard
├── (app)/                    # Application pages
│   └── results/              # Comparison dashboard
└── api/
    └── get-quotes/           # Mock API endpoint

components/
├── wizard/                   # Form wizard components
│   ├── wizard-form.tsx
│   └── steps/                # Individual form steps
├── results/                  # Results page components
│   ├── results-grid.tsx
│   └── quote-card.tsx
├── ui/                       # Shared UI components
└── mascot-helper.tsx         # Floating assistant

lib/
├── i18n.ts                   # Internationalization (Greek/English)
├── validation.ts             # Zod schemas (Greek validation)
├── mock-data.ts              # Greek providers & quotes
└── utils.ts                  # Utility functions (EUR/el-GR)

store/
└── quote-store.ts            # Zustand state management

types/
└── index.ts                  # TypeScript interfaces
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd comparison-demo

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, product grid, trust signals |
| `/insurance/[type]` | Landing pages for car, home, pet, travel, life, energy, internet, phone |
| `/quote/car` | Car insurance quote wizard |
| `/results` | Quote comparison dashboard |

## 🇬🇷 Localization

- **Primary Language**: Greek (el)
- **Secondary Language**: English (en)
- **Validation**: Greek postcodes (5 digits), Greek phone numbers (+30), Greek registration plates (ΑΒΓ-1234), Greek driving licenses
- **Currency**: EUR (€)
- **Regulatory**: Bank of Greece (Τράπεζα της Ελλάδος)
- **Providers**: Greek insurance companies (Εθνική, Interamerican, Eurolife, etc.)
- **i18n System**: Translation dictionary in `lib/i18n.ts`

## 🧩 Key Components

### WizardForm
Multi-step form wizard with 5 steps:
1. **Σχετικά με Εσάς** - Name, contact, address, occupation
2. **Οδήγηση** - License info, claims, convictions
3. **Αυτοκίνητο** - Registration, make/model, usage
4. **Κάλυψη** - Cover level, excess, payment frequency
5. **Ανασκόπηση** - Summary before submission

### ResultsGrid
- Animated loading with progress indicator
- Sort by price (low/high), rating, provider name
- Expandable quote cards with full details
- Rewards integration

### Helper Assistant
- Fixed position floating assistant
- Activates after 10 seconds of inactivity
- Displays helpful tips and hints in Greek
- "Απλά!" messaging

## 🔧 Configuration

### Environment Variables

No environment variables required for the demo. All data is mocked.

### Customization

- **Theme colors**: Edit CSS variables in `app/globals.css`
- **Providers**: Modify `lib/mock-data.ts` to add/change providers
- **Validation**: Update schemas in `lib/validation.ts`
- **Insurance types**: Add verticals in `lib/mock-data.ts`
- **Translations**: Edit `lib/i18n.ts` for language changes

## 📝 API Routes

### POST `/api/get-quotes`

Generate mock insurance quotes.

```typescript
// Request body
{
  coverLevel: 'comprehensive' | 'third_party_fire_theft' | 'third_party',
  count: number
}

// Response
{
  success: boolean,
  quotes: CarInsuranceQuote[],
  timestamp: string,
  searchId: string
}
```

### GET `/api/get-quotes`

Stream quotes using Server-Sent Events.

Query params: `coverLevel`, `count`

## 🎨 Design System

### Colors
- **Primary**: Teal (`#14b8a6`) to Emerald gradient
- **Secondary**: Amber (`#f59e0b`) to Orange accent
- **Background**: Slate grays with subtle gradients

### Typography
- Font: Geist Sans (via `next/font`)
- Headings: Bold/Black weights
- Body: Regular weight with muted colors

### Animations
- `animate-float` - Gentle floating effect
- `animate-bounce-slow` - Slow bounce for CTAs
- `animate-shimmer` - Skeleton loading effect
- `animate-slide-up` - Entry animations

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://docs.pmnd.rs/zustand)
- [Zod Documentation](https://zod.dev/)
- [React Hook Form Documentation](https://react-hook-form.com/docs)

## 🚢 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Other Platforms

```bash
npm run build
# Deploy the .next folder to your hosting provider
```

## 📄 License

This project is for demonstration purposes. See [LICENSE](LICENSE) for details.

---

Built with 💚 by athanasso | Sygrineto - Σύγκριση Τιμών
