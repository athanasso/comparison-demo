import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CompareKat | Compare Insurance & Save",
    template: "%s | CompareKat",
  },
  description: "Compare prices from over 100 insurance providers. Car, home, pet, travel insurance and more. Get your quote in minutes!",
  keywords: ["insurance", "compare", "car insurance", "home insurance", "pet insurance", "travel insurance", "quotes"],
  authors: [{ name: "CompareKat" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://comparekat.com",
    siteName: "CompareKat",
    title: "CompareKat | Compare Insurance & Save",
    description: "Compare prices from over 100 insurance providers and save money today!",
  },
  twitter: {
    card: "summary_large_image",
    title: "CompareKat | Compare Insurance & Save",
    description: "Compare prices from over 100 insurance providers and save money today!",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
