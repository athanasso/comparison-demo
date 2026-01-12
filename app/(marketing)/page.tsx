import Link from 'next/link';
import { INSURANCE_VERTICALS } from '@/lib/mock-data';
import { ArrowRight, Shield, Star, Zap, Award, Users, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Compare Insurance & Save | CompareKat',
  description: 'Compare prices from over 100 insurance providers. Car, home, pet, travel insurance and more. Get your quote in minutes!',
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                Trusted by 10 million+ customers
              </div>

              <h1 className="text-5xl lg:text-6xl font-black leading-tight">
                Compare prices.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                  Save money.
                </span>
                <br />
                <span className="text-amber-400">Simples!</span>
              </h1>

              <p className="text-xl text-slate-300 max-w-lg">
                Compare prices from over 100 insurance providers and find the best deal for you. 
                It only takes a few minutes!
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/quote/car"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transform hover:scale-105 transition-all duration-300"
                >
                  Get Car Insurance Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/insurance/home"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-2xl hover:bg-white/20 transition-all duration-300"
                >
                  View All Products
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
                <div>
                  <p className="text-3xl font-bold text-white">100+</p>
                  <p className="text-sm text-slate-400">Insurance providers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">£279</p>
                  <p className="text-sm text-slate-400">Average savings</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">4.8★</p>
                  <p className="text-sm text-slate-400">Trustpilot rating</p>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Mascot */}
                <div className="absolute -top-8 -right-8 w-48 h-48 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl z-10">
                  <span className="text-8xl">🦡</span>
                </div>
                
                {/* Floating Cards */}
                <div className="space-y-4 animate-float">
                  <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm ml-auto">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold">A</div>
                      <div>
                        <p className="font-bold text-slate-800">Admiral</p>
                        <div className="flex">
                          {[1,2,3,4,5].map((i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-2xl font-black text-slate-800">£324.00<span className="text-sm font-normal text-slate-500">/year</span></p>
                  </div>
                  
                  <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-5 max-w-xs">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">DL</div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">Direct Line</p>
                        <div className="flex">
                          {[1,2,3,4,5].map((i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-xl font-black text-slate-800">£298.50<span className="text-xs font-normal text-slate-500">/year</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Products Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">What would you like to compare?</h2>
            <p className="text-lg text-slate-500">Choose from our range of comparison services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INSURANCE_VERTICALS.map((vertical) => (
              <Link
                key={vertical.slug}
                href={vertical.slug === 'car' ? '/quote/car' : `/insurance/${vertical.slug}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-teal-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                      style={{ backgroundColor: `${vertical.color}20` }}
                    >
                      {vertical.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-teal-600 transition-colors">
                        {vertical.title}
                      </h3>
                      <p className="text-slate-500 text-sm mt-1">{vertical.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {vertical.features.slice(0, 3).map((feature) => (
                      <span 
                        key={feature}
                        className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-medium text-teal-600">Compare now</span>
                  <ArrowRight className="w-4 h-4 text-teal-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">How it works</h2>
            <p className="text-lg text-slate-500">Get your quote in just 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                icon: Users,
                title: 'Tell us about you',
                description: 'Fill in your details in our quick and easy form. It only takes a few minutes.',
              },
              {
                step: 2,
                icon: Zap,
                title: 'We compare prices',
                description: 'We search over 100 insurance providers to find you the best deals.',
              },
              {
                step: 3,
                icon: Award,
                title: 'Pick your policy',
                description: 'Choose the cover that\'s right for you and complete your purchase.',
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                {/* Connector Line */}
                {item.step < 3 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-teal-500 to-emerald-500" />
                )}
                
                <div className="relative bg-white rounded-2xl p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 text-white font-bold text-2xl mb-6 shadow-lg shadow-teal-500/30">
                    {item.step}
                  </div>
                  <item.icon className="w-8 h-8 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                  <p className="text-slate-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Shield, label: 'FCA Regulated', value: '100%' },
              { icon: Users, label: 'Happy Customers', value: '10M+' },
              { icon: Star, label: 'Trustpilot Rating', value: '4.8/5' },
              { icon: CheckCircle, label: 'Quotes Generated', value: '50M+' },
            ].map((stat) => (
              <div key={stat.label}>
                <stat.icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="text-6xl mb-6 block">🦡</span>
          <h2 className="text-4xl font-bold mb-4">Ready to save money?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join over 10 million customers who have found better deals with CompareKat. Start your quote today!
          </p>
          <Link
            href="/quote/car"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xl rounded-2xl shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transform hover:scale-105 transition-all duration-300"
          >
            Get Started - It&apos;s Free!
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}
