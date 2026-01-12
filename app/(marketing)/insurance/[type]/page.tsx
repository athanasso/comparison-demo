import Link from 'next/link';
import { notFound } from 'next/navigation';
import { INSURANCE_VERTICALS } from '@/lib/mock-data';
import { ArrowRight, Check, Shield, Star, Clock, Award, Users } from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  return INSURANCE_VERTICALS.map((v) => ({
    type: v.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params;
  const vertical = INSURANCE_VERTICALS.find((v) => v.slug === type);
  
  if (!vertical) {
    return { title: 'Not Found' };
  }

  return {
    title: `Compare ${vertical.title} | CompareKat`,
    description: vertical.description,
  };
}

export default async function InsuranceLandingPage({ params }: PageProps) {
  const { type } = await params;
  const vertical = INSURANCE_VERTICALS.find((v) => v.slug === type);

  if (!vertical) {
    notFound();
  }

  const isCarInsurance = vertical.slug === 'car';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative overflow-hidden py-20 lg:py-28"
        style={{ 
          background: `linear-gradient(135deg, ${vertical.color}15 0%, white 50%, ${vertical.color}10 100%)` 
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Badge */}
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                style={{ backgroundColor: `${vertical.color}20`, color: vertical.color }}
              >
                <span className="text-xl">{vertical.icon}</span>
                {vertical.title}
              </div>

              <h1 className="text-5xl lg:text-6xl font-black text-slate-800 leading-tight">
                Compare{' '}
                <span 
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: `linear-gradient(135deg, ${vertical.color}, ${vertical.color}cc)` }}
                >
                  {vertical.title}
                </span>{' '}
                Quotes
              </h1>

              <p className="text-xl text-slate-600 max-w-lg">
                {vertical.description}. Compare prices from leading UK providers and save money today!
              </p>

              <div className="space-y-4">
                {vertical.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${vertical.color}20` }}
                    >
                      <Check className="w-4 h-4" style={{ color: vertical.color }} />
                    </div>
                    <span className="text-slate-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href={isCarInsurance ? '/quote/car' : '/quote/car'}
                className="inline-flex items-center gap-3 px-8 py-4 text-white font-bold text-lg rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
                style={{ 
                  background: `linear-gradient(135deg, ${vertical.color}, ${vertical.color}dd)`,
                  boxShadow: `0 10px 40px ${vertical.color}40`
                }}
              >
                Get Your Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Visual */}
            <div className="relative hidden lg:flex items-center justify-center">
              <div 
                className="absolute w-80 h-80 rounded-full opacity-20 blur-3xl"
                style={{ backgroundColor: vertical.color }}
              />
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-sm">
                <div className="text-center mb-6">
                  <span className="text-7xl">{vertical.icon}</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <span className="text-slate-600">Providers compared</span>
                    <span className="font-bold text-slate-800">100+</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <span className="text-slate-600">Average savings</span>
                    <span className="font-bold" style={{ color: vertical.color }}>£279</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <span className="text-slate-600">Quote time</span>
                    <span className="font-bold text-slate-800">~5 mins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Why compare with us?
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              We make finding the right {vertical.title.toLowerCase()} simple, fast, and free
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Trusted & Secure',
                description: 'FCA regulated with bank-grade security for your data',
              },
              {
                icon: Clock,
                title: 'Quick Quotes',
                description: 'Get quotes in minutes, not hours. Fast and efficient.',
              },
              {
                icon: Award,
                title: 'Best Prices',
                description: 'We search 100+ providers to find you the best deal.',
              },
              {
                icon: Users,
                title: 'Expert Support',
                description: 'Our UK-based team is here to help when you need it.',
              },
            ].map((benefit) => (
              <div 
                key={benefit.title}
                className="text-center p-6 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${vertical.color}15` }}
                >
                  <benefit.icon className="w-8 h-8" style={{ color: vertical.color }} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{benefit.title}</h3>
                <p className="text-slate-500 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-500">
              Got questions? We&apos;ve got answers.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: `How does ${vertical.title.toLowerCase()} comparison work?`,
                a: `We compare prices from over 100 leading UK ${vertical.title.toLowerCase()} providers. Simply tell us about yourself and what cover you need, and we'll show you the best deals available.`,
              },
              {
                q: 'Is this service free to use?',
                a: 'Yes! Our comparison service is completely free. We earn a small commission from providers when you buy through us, but this doesn\'t affect your price.',
              },
              {
                q: 'How long does it take to get a quote?',
                a: 'Most quotes take just 5 minutes to complete. We\'ve designed our forms to be as quick and easy as possible.',
              },
              {
                q: 'Are the quotes accurate?',
                a: 'Yes, the quotes we show are real prices from providers. However, the final price may vary slightly based on additional checks.',
              },
            ].map((faq, i) => (
              <div 
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
              >
                <h3 className="text-lg font-bold text-slate-800 mb-2">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-1 mb-4">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className="w-8 h-8 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <h2 className="text-4xl font-bold text-slate-800 mb-2">
              Rated Excellent
            </h2>
            <p className="text-slate-500">Based on 50,000+ reviews on Trustpilot</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah M.',
                text: `Saved £200 on my ${vertical.title.toLowerCase()}! So easy to use and the whole process took less than 10 minutes.`,
                rating: 5,
              },
              {
                name: 'James T.',
                text: 'Great service. Found a much better deal than my renewal quote. Highly recommend!',
                rating: 5,
              },
              {
                name: 'Emily R.',
                text: 'Very straightforward comparison. The results were clear and it was easy to choose the right policy.',
                rating: 4,
              },
            ].map((review, i) => (
              <div 
                key={i}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4">&ldquo;{review.text}&rdquo;</p>
                <p className="font-bold text-slate-800">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section 
        className="py-20 text-white"
        style={{ background: `linear-gradient(135deg, ${vertical.color}, ${vertical.color}cc)` }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-6xl mb-6 block">{vertical.icon}</span>
          <h2 className="text-4xl font-bold mb-4">
            Ready to compare {vertical.title.toLowerCase()}?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join millions of customers who&apos;ve saved money with CompareKat
          </p>
          <Link
            href={isCarInsurance ? '/quote/car' : '/quote/car'}
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-800 font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Get Your Free Quote
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}
