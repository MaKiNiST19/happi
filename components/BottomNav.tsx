/**
 * BottomNav Bileşeni
 * 
 * Mobil cihazlarda ekranın altında sabit duran navigasyon çubuğu.
 * 4 ana bölümü içerir: Ana Sayfa, Zaman Tüneli, Keşfet, Ayarlar.
 * Aktif sayfayı vurgular ve yumuşak geçiş animasyonları sunar.
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/",
    label: "Ana Sayfa",
    icon: (active: boolean) => (
      <svg
        className={`w-6 h-6 transition-colors ${active ? "text-brand-primary drop-shadow-[0_0_8px_rgba(133,82,242,0.8)]" : "text-brand-gray"}`}
        fill={active ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={active ? 0 : 1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    href: "/timeline",
    label: "Zaman Tüneli",
    icon: (active: boolean) => (
      <svg
        className={`w-6 h-6 transition-colors ${active ? "text-brand-primary drop-shadow-[0_0_8px_rgba(133,82,242,0.8)]" : "text-brand-gray"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
         <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
         {active && <circle cx="12" cy="12" r="3" fill="currentColor" />}
      </svg>
    ),
  },
  // Spacer for the center floating button
  {
     href: "#",
     label: "",
     isSpacer: true,
     icon: () => null
  },
  {
    href: "/explore",
    label: "Keşfet",
    icon: (active: boolean) => (
      <svg
        className={`w-6 h-6 transition-colors ${active ? "text-brand-primary drop-shadow-[0_0_8px_rgba(133,82,242,0.8)]" : "text-brand-gray"}`}
        fill={active ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={active ? 0 : 1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    href: "/settings",
    label: "Ayarlar",
    icon: (active: boolean) => (
      <svg
        className={`w-6 h-6 transition-colors ${active ? "text-brand-primary drop-shadow-[0_0_8px_rgba(133,82,242,0.8)]" : "text-brand-gray"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-6 left-0 right-0 z-40 pointer-events-none safe-area-bottom">
      <div className="max-w-md mx-auto pointer-events-auto px-4 relative">
        
        {/* Float Action Button in Center */}
        <div className="absolute left-1/2 -top-6 -translate-x-1/2 z-50">
          <button className="w-16 h-16 rounded-full bg-gradient-to-r from-brand-blue to-brand-primary flex items-center justify-center shadow-[0_10px_30px_rgba(133,82,242,0.6)] border border-white/20 transition-transform active:scale-95 group">
             <div className="absolute inset-0 rounded-full bg-white/20 blur-sm group-hover:scale-110 transition-transform opacity-0 group-hover:opacity-100" />
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white relative z-10 animate-pulse">
                <path d="M12 2C8.13 2 5 5.13 5 9v3c0 3.87 3.13 7 7 7s7-3.13 7-7V9c0-3.87-3.13-7-7-7zm0 11.5c-2.48 0-4.5-2.02-4.5-4.5V9c0-2.48 2.02-4.5 4.5-4.5s4.5 2.02 4.5 4.5v3c0 2.48-2.02 4.5-4.5 4.5z" fill="currentColor"/>
                <path d="M12 6c-1.65 0-3 1.35-3 3v3c0 1.65 1.35 3 3 3s3-1.35 3-3V9c0-1.65-1.35-3-3-3z" fill="currentColor"/>
             </svg>
          </button>
        </div>

        <div className="flex items-center justify-between px-3 py-2 bg-[#0d1629]/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[28px]">
        {navItems.map((item, idx) => {
          if (item.isSpacer) {
            return <div key={`spacer-${idx}`} className="w-14" />;
          }

          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-2xl transition-all duration-300 min-w-[60px] gap-1 ${
                isActive
                  ? "text-brand-primary"
                  : "text-brand-gray hover:text-white active:scale-95"
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-brand-primary/10 rounded-2xl" />
              )}
              <div className={`relative z-10 transition-transform duration-300 ${isActive ? "scale-110" : ""}`}>
                {item.icon(isActive)}
              </div>
              <span className={`relative z-10 text-[10px] font-medium tracking-wide transition-all duration-300 ${
                isActive ? "text-brand-primary" : "text-brand-gray/70"
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
        </div>
      </div>
    </nav>
  );
}
