/**
 * TodayCard Bileşeni
 * 
 * Ana sayfada gösterilen "Günün Kartı". Mevcut hamilelik/bebek
 * haftası ve gününe özel bilgiyi görsel bir kart formatında sunar.
 * Dönemine göre renk değiştirir ve ilerleme gösterir.
 */

"use client";

import { DayInfo, DateCalculation } from "@/lib/types";
import {
  formatWeekDay,
  getPeriodColor,
  getPeriodBgColor,
} from "@/lib/services/dataService";
import { getPeriodName } from "@/lib/utils/dateUtils";

interface TodayCardProps {
  dayInfo: DayInfo;
  dateCalc: DateCalculation;
}

export default function TodayCard({ dayInfo, dateCalc }: TodayCardProps) {
  const periodColor = getPeriodColor(dayInfo.period);
  const periodBg = getPeriodBgColor(dayInfo.period);
  const periodName = getPeriodName(dayInfo.period);
  const weekDayText = formatWeekDay(dayInfo.week, dayInfo.dayOfWeek, dayInfo.period);

  return (
    <div className="px-4 py-2">
      <div className="group relative overflow-hidden rounded-[30px] border border-white/50 bg-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
        
        {/* Animated Gradient Background Base */}
        <div className={`absolute inset-0 bg-gradient-to-br ${periodColor} opacity-90 transition-opacity duration-700 group-hover:opacity-100`} />
        
        {/* Complex Uiverse-like Decorations */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 -right-16 h-64 w-64 animate-pulse-glow rounded-full bg-white/20 blur-3xl mix-blend-overlay" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 animate-float rounded-full bg-white/20 blur-2xl mix-blend-overlay" />
          <div className="absolute top-1/2 left-1/3 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-xl mix-blend-soft-light" />
          {/* Shimmer Effect */}
          <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* İçerik */}
        <div className="relative p-6 pb-5">
          {/* Dönem ve Tarih Bilgisi */}
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
              {periodName}
            </span>
            <span className="text-white/80 text-xs">
              {dayInfo.period === "pregnancy" && dateCalc.daysUntilDue > 0
                ? `Doğuma ${dateCalc.daysUntilDue} gün`
                : ""}
            </span>
          </div>

          {/* Emoji */}
          <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-white/20 p-4 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)] backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
            <span className="text-5xl drop-shadow-md">{dayInfo.emoji}</span>
          </div>

          {/* Hafta/Gün Başlığı */}
          <h2 className="mb-1 text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
            {weekDayText}
          </h2>

          {/* Alt başlık */}
          <h3 className="text-lg font-semibold text-white/90 mb-3">
            {dayInfo.title}
          </h3>

          {/* Açıklama */}
          <p className="text-white/80 leading-relaxed text-sm mb-5">
            {dayInfo.description}
          </p>

          {/* İlerleme Çubuğu */}
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-white/60">
                {dayInfo.period === "pregnancy" ? "Doğuma İlerleme" : "Büyüme Serüveni (3 Yaş)"}
              </span>
              <span className="text-xs text-white/80 font-medium">
                %{dayInfo.period === "pregnancy" 
                   ? Math.round(dateCalc.percentComplete) 
                   : Math.min(100, Math.round(((dateCalc.currentDay - 280) / (3 * 365)) * 100))}
              </span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
              <div
                className="h-full bg-white/90 rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                style={{ width: `${dayInfo.period === "pregnancy" 
                   ? dateCalc.percentComplete 
                   : Math.min(100, Math.max(0, ((dateCalc.currentDay - 280) / (3 * 365)) * 100))}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hızlı Bilgi Kartları */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <QuickInfoCard
          emoji="📅"
          label="Hafta"
          value={
            dayInfo.period === "pregnancy"
              ? `${dayInfo.week}`
              : `${Math.max(0, dayInfo.week - 40)}`
          }
          bgColor={periodBg}
        />
        <QuickInfoCard
          emoji="📊"
          label="Gün"
          value={`${dayInfo.dayOfWeek}/7`}
          bgColor={periodBg}
        />
        <QuickInfoCard
          emoji="🎯"
          label="Dönem"
          value={periodName}
          bgColor={periodBg}
          small
        />
      </div>
    </div>
  );
}

function QuickInfoCard({
  emoji,
  label,
  value,
  bgColor,
  small,
}: {
  emoji: string;
  label: string;
  value: string;
  bgColor: string;
  small?: boolean;
}) {
  return (
    <div className={`glass-card ${bgColor.replace('bg-', 'bg-')}/50 relative overflow-hidden rounded-[20px] p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}>
      <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/50 text-xl shadow-sm backdrop-blur-sm">
        {emoji}
      </div>
      <div className={`font-bold tracking-tight text-gray-800 ${small ? "text-sm" : "text-xl"}`}>
        {value}
      </div>
      <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-gray-500">{label}</div>
    </div>
  );
}
