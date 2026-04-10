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
        className={`w-6 h-6 transition-colors ${active ? "text-rose-500" : "text-gray-400"}`}
        fill={active ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={active ? 0 : 1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
  },
  {
    href: "/timeline",
    label: "Zaman Tüneli",
    icon: (active: boolean) => (
      <svg
        className={`w-6 h-6 transition-colors ${active ? "text-rose-500" : "text-gray-400"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        {active && (
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        )}
      </svg>
    ),
  },
  {
    href: "/explore",
    label: "Keşfet",
    icon: (active: boolean) => (
      <svg
        className={`w-6 h-6 transition-colors ${active ? "text-rose-500" : "text-gray-400"}`}
        fill={active ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={active ? 0 : 1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
  },
  {
    href: "/settings",
    label: "Ayarlar",
    icon: (active: boolean) => (
      <svg
        className={`w-6 h-6 transition-colors ${active ? "text-rose-500" : "text-gray-400"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-6 left-4 right-4 z-40 pointer-events-none safe-area-bottom">
      <div className="max-w-md mx-auto pointer-events-auto">
        <div className="flex items-center justify-around px-2 py-2 bg-white/80 backdrop-blur-[24px] border border-white shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-[28px] supports-[backdrop-filter]:bg-white/60">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-2xl transition-all duration-300 min-w-[64px] ${
                isActive
                  ? "text-rose-500"
                  : "text-gray-400 hover:text-gray-600 active:scale-95"
              }`}
            >
              {/* Active Background Pill */}
              {isActive && (
                <div className="absolute inset-0 bg-rose-50 rounded-2xl -z-10 animate-fade-in" />
              )}
              <div className="relative z-10 flex flex-col items-center justify-center">
                <div className={`transition-transform duration-300 ${isActive ? '-translate-y-1' : ''}`}>
                  {item.icon(isActive)}
                </div>
                {isActive && (
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                )}
              </div>
              {isActive ? null : (
                <span
                  className={`text-[10px] mt-1 font-medium transition-colors opacity-0 absolute`}
                >
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
        </div>
      </div>
    </nav>
  );
}
