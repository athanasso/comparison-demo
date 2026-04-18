import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sygrineto | Συγκρίνετε Ασφάλειες & Εξοικονομήστε",
    template: "%s | Sygrineto",
  },
  description: "Συγκρίνετε τιμές από πάνω από 100 ασφαλιστικούς παρόχους. Αυτοκίνητο, κατοικία, κατοικίδια, ταξίδι και πολλά ακόμα. Λάβετε προσφορά σε λίγα λεπτά!",
  keywords: ["ασφάλεια", "σύγκριση", "ασφάλεια αυτοκινήτου", "ασφάλεια κατοικίας", "ασφάλεια κατοικιδίων", "ασφάλεια ταξιδιού", "προσφορές", "insurance", "compare"],
  authors: [{ name: "Sygrineto" }],
  openGraph: {
    type: "website",
    locale: "el_GR",
    url: "https://sygrineto.gr",
    siteName: "Sygrineto",
    title: "Sygrineto | Συγκρίνετε Ασφάλειες & Εξοικονομήστε",
    description: "Συγκρίνετε τιμές από πάνω από 100 ασφαλιστικούς παρόχους και εξοικονομήστε σήμερα!",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sygrineto | Συγκρίνετε Ασφάλειες & Εξοικονομήστε",
    description: "Συγκρίνετε τιμές από πάνω από 100 ασφαλιστικούς παρόχους και εξοικονομήστε σήμερα!",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
