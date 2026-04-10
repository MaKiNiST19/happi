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
      <body className="min-h-full text-brand-text antialiased relative overflow-x-hidden">
        {/* Deep Space Background Decorations */}
        <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
          <div className="absolute top-0 right-0 w-[80%] h-[50%] rounded-full bg-brand-primary/20 blur-[100px] opacity-60 mix-blend-screen" />
          <div className="absolute bottom-[10%] -left-[20%] w-[60%] h-[60%] rounded-full bg-brand-blue/20 blur-[120px] opacity-50 mix-blend-screen" />
          <div className="absolute top-[40%] left-[20%] w-[50%] h-[50%] rounded-full bg-[#1E2D4A]/40 blur-[90px] opacity-70" />
        </div>
        
        <div className="max-w-lg mx-auto min-h-screen relative">
          <main className="main-content">{children}</main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
