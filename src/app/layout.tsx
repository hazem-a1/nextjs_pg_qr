import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/providers/SessionProvider";
import { Suspense } from "react";
import GoogleAnalytics from "@/components/google-analytics/google-analytics";
import CookieBanner from "@/components/CookieBanner/cookie-banner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QR Star",
  description: "Generate a redirect url and qr code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Suspense fallback={null}>
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.GTM_ID || 'G-6W04137CJB'} />
      </Suspense>
      <body className={inter.className}>
        <CookieBanner />
        <SessionProvider>{children}</SessionProvider></body>
    </html>
  );
}
