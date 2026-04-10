/**
 * Happi - Ana Layout
 * 
 * Tüm sayfaları saran kök layout bileşeni.
 * PWA meta etiketleri, Google Fonts (Inter) ve BottomNav içerir.
 * Mobil öncelikli tasarım ile max-width sınırlandırması yapar.
 */

import type { Metadata, Viewport } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-sans",
  display: "swap",
});

const notoSerif = Noto_Serif({
  subsets: ["latin", "latin-ext"],
  variable: "--font-noto-serif",
  weight: ["400", "700", "900"],
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
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👶</text></svg>",
    apple: "/icon-192x192.png",
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
    <html lang="tr" className={`${inter.variable} ${notoSerif.variable} h-full`}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icon-512x512.png" />
      </head>
      <body className="min-h-full bg-brand-bg text-brand-text antialiased relative overflow-x-hidden">
        {/* Soft Organic Background Decorations */}
        <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
          <div className="absolute -top-[10%] -right-[15%] w-[60%] h-[40%] rounded-full bg-brand-blue/10 blur-[80px]" />
          <div className="absolute top-[30%] -left-[20%] w-[50%] h-[50%] rounded-full bg-brand-primary/10 blur-[80px]" />
          <div className="absolute -bottom-[10%] left-[20%] w-[70%] h-[40%] rounded-full bg-brand-mint/10 blur-[80px]" />
        </div>
        
        <div className="max-w-lg mx-auto min-h-screen relative">
          <main className="main-content">{children}</main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
