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
    <div className="animate-fade-in">
      {/* Header */}
      <header className="px-5 pt-6 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Merhaba 👋</p>
            <h1 className="text-2xl font-bold text-gray-800">
              Happi
            </h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center text-white text-lg shadow-lg shadow-rose-400/20">
            🌱
          </div>
        </div>
      </header>

      {/* Günün Kartı */}
      {dayInfo && dateCalc && (
        <TodayCard dayInfo={dayInfo} dateCalc={dateCalc} />
      )}

      {/* Hafta Detayları */}
      {weekDetails && (
        <div className="px-4 mt-4">
          {/* Bebek Boyutu */}
          {weekDetails.babySize && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-2xl">
                  🍎
                </div>
                <div>
                  <p className="text-xs text-gray-400">Bebeğin Boyutu</p>
                  <p className="font-semibold text-gray-800">{weekDetails.babySize}</p>
                </div>
              </div>
            </div>
          )}

          {/* Detaylar */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-lg">📋</span> Bu Hafta Neler Oluyor?
            </h3>
            <ul className="space-y-2">
              {weekDetails.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-rose-400 mt-0.5 flex-shrink-0">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* İpuçları */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100 mb-3">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-lg">💡</span> İpuçları
            </h3>
            <ul className="space-y-2">
              {weekDetails.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-amber-500 mt-0.5 flex-shrink-0">✦</span>
                  <span>{tip}</span>
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
