import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Visit Bishkek — Safe, Green & Beautiful",
  description: "Your complete guide to Bishkek, Kyrgyzstan. Safety info, local routes, food guide and more.",
  keywords: "Bishkek, Kyrgyzstan, travel, tourism, safe, guide",
  openGraph: {
    title: "Visit Bishkek",
    description: "Everything you need to know before visiting Bishkek",
    url: "https://visitbishkek.vercel.app",
    siteName: "Visit Bishkek",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "ru_KG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visit Bishkek",
    description: "Your complete guide to Bishkek, Kyrgyzstan",
    images: ["/og-image.png"],
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
