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
    return { title: 'Δεν Βρέθηκε' };
  }

  return {
    title: `Σύγκριση ${vertical.title} | Sygrineto`,
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
                Σύγκριση{' '}
                <span 
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: `linear-gradient(135deg, ${vertical.color}, ${vertical.color}cc)` }}
                >
                  {vertical.title}
                </span>
              </h1>

              <p className="text-xl text-slate-600 max-w-lg">
                {vertical.description}. Συγκρίνετε τιμές από κορυφαίους Ελληνικούς παρόχους και εξοικονομήστε σήμερα!
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
                Πάρτε Προσφορά
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
                    <span className="text-slate-600">Πάροχοι σύγκρισης</span>
                    <span className="font-bold text-slate-800">100+</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <span className="text-slate-600">Μέση εξοικονόμηση</span>
                    <span className="font-bold" style={{ color: vertical.color }}>€279</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <span className="text-slate-600">Χρόνος προσφοράς</span>
                    <span className="font-bold text-slate-800">~5 λεπτά</span>
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
              Γιατί να συγκρίνετε μαζί μας;
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Κάνουμε την εύρεση σωστής {vertical.title.toLowerCase()} απλή, γρήγορη και δωρεάν
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Αξιόπιστοι & Ασφαλείς',
                description: 'Εποπτευόμενοι με τραπεζική ασφάλεια δεδομένων',
              },
              {
                icon: Clock,
                title: 'Γρήγορες Προσφορές',
                description: 'Λάβετε προσφορές σε λεπτά, όχι ώρες.',
              },
              {
                icon: Award,
                title: 'Καλύτερες Τιμές',
                description: 'Ψάχνουμε 100+ παρόχους για την καλύτερη προσφορά.',
              },
              {
                icon: Users,
                title: 'Ειδική Υποστήριξη',
                description: 'Η ομάδα μας στην Ελλάδα είναι εδώ όταν χρειάζεστε βοήθεια.',
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
              Συχνές Ερωτήσεις
            </h2>
            <p className="text-lg text-slate-500">
              Έχετε ερωτήσεις; Έχουμε απαντήσεις.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: `Πώς λειτουργεί η σύγκριση ${vertical.title.toLowerCase()};`,
                a: `Συγκρίνουμε τιμές από πάνω από 100 κορυφαίους Ελληνικούς παρόχους ${vertical.title.toLowerCase()}. Πείτε μας τι κάλυψη χρειάζεστε και θα σας δείξουμε τις καλύτερες διαθέσιμες προσφορές.`,
              },
              {
                q: 'Είναι δωρεάν η υπηρεσία;',
                a: 'Ναι! Η υπηρεσία σύγκρισης είναι εντελώς δωρεάν. Κερδίζουμε μια μικρή προμήθεια από τους παρόχους, χωρίς αυτό να επηρεάζει την τιμή σας.',
              },
              {
                q: 'Πόσο χρόνο χρειάζεται;',
                a: 'Οι περισσότερες προσφορές χρειάζονται μόλις 5 λεπτά. Οι φόρμες μας είναι σχεδιασμένες να είναι γρήγορες και εύκολες.',
              },
              {
                q: 'Είναι ακριβείς οι προσφορές;',
                a: 'Ναι, οι προσφορές είναι πραγματικές τιμές από παρόχους. Η τελική τιμή μπορεί να διαφέρει ελαφρώς βάσει πρόσθετων ελέγχων.',
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
              Αξιολόγηση Άριστα
            </h2>
            <p className="text-slate-500">Βασισμένη σε 50.000+ κριτικές</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Μαρία Π.',
                text: `Εξοικονόμησα €200 στην ${vertical.title.toLowerCase()} μου! Πολύ εύκολο στη χρήση και η διαδικασία κράτησε λιγότερο από 10 λεπτά.`,
                rating: 5,
              },
              {
                name: 'Γιάννης Κ.',
                text: 'Εξαιρετική υπηρεσία. Βρήκα πολύ καλύτερη προσφορά από την ανανέωσή μου. Το συνιστώ ανεπιφύλακτα!',
                rating: 5,
              },
              {
                name: 'Ελένη Δ.',
                text: 'Πολύ απλή σύγκριση. Τα αποτελέσματα ήταν ξεκάθαρα και ήταν εύκολο να επιλέξω τη σωστή ασφάλεια.',
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
            Έτοιμοι να συγκρίνετε {vertical.title.toLowerCase()};
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Γίνετε μέλος σε εκατομμύρια πελάτες που εξοικονόμησαν με τη Sygrineto
          </p>
          <Link
            href={isCarInsurance ? '/quote/car' : '/quote/car'}
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-800 font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Δωρεάν Προσφορά
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}
