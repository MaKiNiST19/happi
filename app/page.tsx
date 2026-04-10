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
      {/* Header */}
      <header className="px-6 pt-10 pb-4">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-brand-gray/80 tracking-wide mb-1 opacity-80 uppercase">Merhaba</p>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-serif font-black tracking-tight text-brand-text">
              {profile?.parentName ? profile.parentName : "Happi"}
            </h1>
            <div className="w-12 h-12 rounded-full bg-white border border-brand-primary/20 flex items-center justify-center text-xl shadow-sm text-brand-primary shadow-brand-primary/10">
              🌱
            </div>
          </div>
        </div>
      </header>

      {/* Günün Kartı */}
      {dayInfo && dateCalc && (
        <TodayCard dayInfo={dayInfo} dateCalc={dateCalc} />
      )}

      {/* Hafta Detayları */}
      {weekDetails && (
        <div className="px-5 mt-6">
          {/* Bebek Boyutu */}
          {weekDetails.babySize && (
            <div className="bg-white rounded-[24px] p-5 shadow-sm border border-brand-light-gray/20 mb-4 transition-all hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-brand-primary/10 flex items-center justify-center text-3xl">
                  🍎
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-brand-gray mb-1">Bebeğin Boyutu</p>
                  <p className="font-bold text-lg text-brand-text">{weekDetails.babySize}</p>
                </div>
              </div>
            </div>
          )}

          {/* Detaylar */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-brand-light-gray/20 mb-4">
            <h3 className="font-serif font-bold text-xl text-brand-text mb-4 flex items-center gap-2">
              <span className="text-brand-blue">📋</span> Bu Hafta Neler Oluyor?
            </h3>
            <ul className="space-y-3">
              {weekDetails.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[15px] font-medium text-brand-text/80">
                  <span className="text-brand-mint text-lg mt-0.5 flex-shrink-0">•</span>
                  <span className="leading-relaxed">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* İpuçları */}
          <div className="bg-brand-primary/5 rounded-[24px] p-6 border border-brand-primary/10 mb-6">
            <h3 className="font-serif font-bold text-xl text-brand-primary mb-4 flex items-center gap-2">
              <span className="text-2xl">💡</span> İpuçları
            </h3>
            <ul className="space-y-3">
              {weekDetails.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[15px] font-medium text-brand-text/80">
                  <span className="text-brand-primary mt-0.5 flex-shrink-0">✦</span>
                  <span className="leading-relaxed">{tip}</span>
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
