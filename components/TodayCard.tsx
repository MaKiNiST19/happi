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
      {/* Ana Kart */}
      <div className="relative overflow-hidden rounded-3xl shadow-xl">
        {/* Gradient Arka Plan */}
        <div className={`absolute inset-0 bg-gradient-to-br ${periodColor} opacity-90`} />
        
        {/* Dekoratif elementler */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/10 blur-xl" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10 blur-xl" />
          <div className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full bg-white/5 blur-lg" />
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
          <div className="text-5xl mb-3">{dayInfo.emoji}</div>

          {/* Hafta/Gün Başlığı */}
          <h2 className="text-3xl font-bold text-white mb-1">
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
              <span className="text-xs text-white/60">İlerleme</span>
              <span className="text-xs text-white/80 font-medium">
                %{Math.round(dateCalc.percentComplete)}
              </span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
              <div
                className="h-full bg-white/80 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${dateCalc.percentComplete}%` }}
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
    <div className={`${bgColor} rounded-2xl p-3 text-center`}>
      <div className="text-lg mb-1">{emoji}</div>
      <div className={`font-bold text-gray-800 ${small ? "text-xs" : "text-lg"}`}>
        {value}
      </div>
      <div className="text-[10px] text-gray-500 mt-0.5">{label}</div>
    </div>
  );
}
