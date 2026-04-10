/**
 * TodayCard Bileşeni
 * 
 * Ana sayfada gösterilen "Günün Kartı". Mevcut hamilelik/bebek
 * haftası ve gününe özel bilgiyi görsel bir kart formatında sunar.
 * Yeni tasarıma uyumlu: yumuşak beyaz hap tasarımı, organik gölgeler, marka renkleri.
 */

"use client";

import { DayInfo, DateCalculation } from "@/lib/types";
import { formatWeekDay } from "@/lib/services/dataService";
import { getPeriodName } from "@/lib/utils/dateUtils";

interface TodayCardProps {
  dayInfo: DayInfo;
  dateCalc: DateCalculation;
}

export default function TodayCard({ dayInfo, dateCalc }: TodayCardProps) {
  const periodName = getPeriodName(dayInfo.period);
  const weekDayText = formatWeekDay(dayInfo.week, dayInfo.dayOfWeek, dayInfo.period);
  
  // Progress calculation
  const percentComplete = dayInfo.period === "pregnancy" 
     ? dateCalc.percentComplete 
     : Math.min(100, Math.max(0, ((dateCalc.currentDay - 280) / (3 * 365)) * 100));

  return (
    <div className="px-5 py-2">
      {/* Main Track Card */}
      <div className="relative overflow-hidden bg-white rounded-[40px] shadow-[0_20px_40px_-15px_rgba(232,86,66,0.15)] border border-brand-primary/10 transition-all duration-300">
        
        {/* Soft Organic Blob Background within card */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-2xl -mt-10 -mr-10" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-blue/5 rounded-full blur-3xl -mb-10 -ml-10" />

        <div className="relative p-8 flex flex-col items-center text-center">
          
          {/* Status Label */}
          <div className="mb-2">
            <span className="text-brand-gray text-xs tracking-wider uppercase font-semibold">
              {periodName}
            </span>
          </div>

          {/* Value Display */}
          <h2 className="text-4xl font-serif font-bold text-brand-primary mb-1 tracking-tight">
            {weekDayText.split(' ')[0]} <span className="text-2xl font-sans text-brand-text/80">{weekDayText.split(' ').slice(1).join(' ')}</span>
          </h2>
          
          {/* Subtitle / Day Until Due */}
          <p className="text-brand-gray text-sm mb-6">
            {dayInfo.period === "pregnancy" && dateCalc.daysUntilDue > 0
              ? `Doğuma ${dateCalc.daysUntilDue} gün`
              : dayInfo.title}
          </p>

          {/* Central Circular Graphic Area with Progress */}
          <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
            {/* Outline Progress Track */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle
                cx="96" cy="96" r="88"
                className="text-brand-light-gray/30 stroke-current"
                strokeWidth="6" fill="none"
              />
              <circle
                cx="96" cy="96" r="88"
                className="text-brand-blue stroke-current transition-all duration-1000 ease-out"
                strokeWidth="6" fill="none"
                strokeDasharray="552.9" /* 2 * PI * 88 */
                strokeDashoffset={552.9 - (552.9 * percentComplete) / 100}
                strokeLinecap="round"
              />
            </svg>
            
            {/* Center Content Placeholder (Emoji and Percent) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <div className="w-28 h-28 bg-brand-mint/20 rounded-full flex items-center justify-center overflow-hidden relative shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)]">
                 <div className="absolute -bottom-2 -right-2 text-6xl opacity-20">🍃</div>
                 <span className="text-5xl drop-shadow-sm z-10">{dayInfo.emoji}</span>
               </div>
            </div>
          </div>

          <p className="text-brand-text/70 text-sm leading-relaxed px-2">
            {dayInfo.description}
          </p>
          
          {/* Action Button */}
          <button className="mt-6 px-8 py-3 rounded-full border border-brand-primary/20 text-brand-primary font-semibold text-sm hover:bg-brand-primary hover:text-white transition-colors duration-300">
            Detayları Gör
          </button>
        </div>
      </div>

      {/* Quick Info Cards below */}
      <div className="grid grid-cols-2 gap-4 mt-6 px-1">
        <QuickInfoCard
          icon="💧"
          value={
             dayInfo.period === "pregnancy"
               ? `${dayInfo.week}. Hf`
               : `${Math.max(0, dayInfo.week - 40)}. Hf`
          }
          label="Hafta Tipi"
          colorClass="text-brand-blue"
          bgClass="bg-brand-blue/10"
        />
        <QuickInfoCard
          icon="☀️"
          value={`${dayInfo.dayOfWeek}/7`}
          label="Gün"
          colorClass="text-brand-primary"
          bgClass="bg-brand-primary/10"
        />
      </div>
    </div>
  );
}

function QuickInfoCard({
  icon,
  value,
  label,
  colorClass,
  bgClass
}: {
  icon: string;
  value: string;
  label: string;
  colorClass: string;
  bgClass: string;
}) {
  return (
    <div className={`p-4 bg-white rounded-3xl shadow-sm border border-brand-light-gray/20 flex flex-col items-center justify-center hover:shadow-md transition-shadow`}>
      <div className={`w-10 h-10 mb-2 rounded-full ${bgClass} ${colorClass} flex items-center justify-center text-lg`}>
        {icon}
      </div>
      <div className={`font-bold text-lg text-brand-text`}>
        {value}
      </div>
      <div className="text-xs text-brand-gray mt-1 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}
