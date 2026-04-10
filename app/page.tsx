/**
 * Happi - Ana Sayfa
 * 
 * Kullanıcı henüz onboarding yapmadıysa Onboarding bileşenini gösterir.
 * Onboarding tamamlandıysa günün bilgi kartını (TodayCard) ve
 * ek bilgileri gösterir.
 */

"use client";

import { useState, useEffect } from "react";
import Onboarding from "@/components/Onboarding";
import TodayCard from "@/components/TodayCard";
import { getUserProfile, getTodayInfo } from "@/lib/services/dataService";
import { calculateCurrentDate, getPeriodName, formatDateTurkish } from "@/lib/utils/dateUtils";
import { getPregnancyWeekInfo, getPostnatalWeekInfo } from "@/lib/services/dataService";
import type { UserProfile, DayInfo, DateCalculation } from "@/lib/types";

export default function HomePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [dayInfo, setDayInfo] = useState<DayInfo | null>(null);
  const [dateCalc, setDateCalc] = useState<DateCalculation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const userProfile = getUserProfile();
    setProfile(userProfile);

    if (!userProfile || !userProfile.onboardingCompleted) {
      setShowOnboarding(true);
      setIsLoading(false);
      return;
    }

    const info = getTodayInfo(userProfile.expectedDueDate);
    const calc = calculateCurrentDate(userProfile.expectedDueDate);
    
    setDayInfo(info);
    setDateCalc(calc);
    setShowOnboarding(false);
    setIsLoading(false);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    loadData();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce-slow">🌱</div>
          <p className="text-gray-400 animate-pulse">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Hafta detay bilgisini al
  const weekDetails = dayInfo
    ? dayInfo.period === "pregnancy"
      ? getPregnancyWeekInfo(dayInfo.week)
      : getPostnatalWeekInfo(Math.max(0, dayInfo.week - 40))
    : null;

  return (
    <div className="animate-fade-in pb-10">
      {/* Modern Top Header matched with the screenshot */}
      <header className="px-6 pt-12 pb-2">
        <div className="max-w-sm mx-auto flex items-center justify-between mb-8">
          <button className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:bg-white/10 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          
          <button className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:bg-white/10 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
          </button>
        </div>
        
        <div className="max-w-sm mx-auto text-center">
          <p className="text-brand-text-muted/80 text-sm font-medium tracking-widest uppercase mb-2">Merhaba</p>
          <h1 className="text-4xl font-sans font-semibold tracking-tight text-white px-4 leading-tight">
            Hey <span className="text-brand-primary drop-shadow-[0_0_15px_rgba(133,82,242,0.8)]">{profile?.parentName ? profile.parentName : "Happi"}</span>,
            <br />
            <span className="text-white/90">what's on your mind?</span>
          </h1>
        </div>
      </header>

      {/* Günün Kartı */}
      {dayInfo && dateCalc && (
        <TodayCard dayInfo={dayInfo} dateCalc={dateCalc} />
      )}

      {/* Hafta Detayları */}
      {weekDetails && (
        <div className="px-5 mt-8 max-w-sm mx-auto">
          {/* Bebek Boyutu */}
          {weekDetails.babySize && (
            <div className="glass-folder rounded-3xl p-5 mb-5 group hover:scale-[1.02] transition-transform cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-brand-blue/20 flex items-center justify-center text-3xl shadow-[inset_0_0_15px_rgba(255,255,255,0.1)]">
                  🍎
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-brand-text-muted mb-1">Bebeğin Boyutu</p>
                  <p className="font-bold text-lg text-white group-hover:text-brand-mint transition-colors">{weekDetails.babySize}</p>
                </div>
              </div>
            </div>
          )}

          {/* Detaylar */}
          <div className="glass-folder rounded-3xl p-6 mb-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 blur-2xl rounded-full mix-blend-screen" />
            <h3 className="font-sans font-semibold text-lg text-white mb-5 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center text-sm">📋</span> 
              Bu Hafta Neler Oluyor?
            </h3>
            <ul className="space-y-4">
              {weekDetails.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-4 text-[14px] font-normal text-brand-text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(133,82,242,0.8)]" />
                  <span className="leading-relaxed text-brand-text/90">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* İpuçları */}
          <div className="glass-folder rounded-3xl p-6 mb-6">
            <h3 className="font-sans font-semibold text-lg text-white mb-5 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-mint/20 flex items-center justify-center text-sm">💡</span> 
              İpuçları
            </h3>
            <ul className="space-y-4">
              {weekDetails.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-4 text-[14px] font-normal text-brand-text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-mint mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(168,202,255,0.8)]" />
                  <span className="leading-relaxed text-brand-text/90">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Alt Boşluk */}
      <div className="h-4" />
    </div>
  );
}
