/**
 * Happi - Ana Layout
 * 
 * Tüm sayfaları saran kök layout bileşeni.
 * PWA meta etiketleri, Google Fonts (Inter) ve BottomNav içerir.
 * Mobil öncelikli tasarım ile max-width sınırlandırması yapar.
 */

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happi - Bebek Takip Uygulaması",
  description:
    "Hamilelikten 3 yaşına kadar bebeğinizin gelişimini günlük takip edin. Atak haftaları, beslenme, uyku ve çok daha fazlası.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Happi",
  },
  icons: {
    icon: "/icon-512x512.png",
    apple: "/icon-512x512.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#F97316",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} h-full`}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icon-512x512.png" />
      </head>
      <body className="min-h-full bg-background text-foreground antialiased">
        <div className="max-w-lg mx-auto min-h-screen relative">
          <main className="main-content">{children}</main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
