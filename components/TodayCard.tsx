/**
 * TodayCard Bileşeni
 * 
 * Ana sayfada gösterilen "Günün Kartı". Mevcut hamilelik/bebek
 * haftası ve gününe özel bilgiyi görsel bir kart formatında sunar.
 * Yeni tasarıma uyumlu: Dark Glassmorphism, overlapping cards.
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
    <div className="w-full relative min-h-[440px] flex items-center justify-center pt-8 pb-12">
      
      {/* Background glow for the stack */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-primary/20 rounded-full blur-[80px]" />

      {/* STACK CONTAINER */}
      <div className="relative w-full max-w-[320px] h-[360px] flex items-center justify-center">

        {/* --- BOTTOM CARD (Tilted Left) --- */}
        <div className="absolute w-[240px] h-[260px] glass-folder rounded-3xl p-5 shadow-2xl transition-transform duration-700 ease-out 
                        transform -rotate-12 -translate-x-12 translate-y-8 opacity-80 hover:-rotate-6 hover:-translate-x-16 hover:opacity-100 z-10 flex flex-col justify-end">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-brand-blue/30 rounded-full blur-[40px] mix-blend-screen pointer-events-none" />
          
          <div className="flex items-center space-x-2 mb-3">
             <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center">
               <span className="text-brand-text text-sm">📅</span>
             </div>
             <p className="font-sans text-xs text-brand-text-muted font-medium uppercase tracking-wider">{periodName}</p>
          </div>
          
          <p className="text-brand-text/90 font-medium text-sm leading-relaxed text-balance">
            {dayInfo.description.length > 80 ? dayInfo.description.substring(0, 80) + '...' : dayInfo.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-brand-text-muted text-xs">{dayInfo.period === "pregnancy" && dateCalc.daysUntilDue > 0 ? `Doğuma ${dateCalc.daysUntilDue} gün` : ''}</p>
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20">
              <span className="text-[10px]">✨</span>
            </div>
          </div>
        </div>

        {/* --- MIDDLE CARD (Tilted Right) --- */}
        <div className="absolute w-[220px] h-[240px] glass-folder rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-out 
                        transform rotate-12 translate-x-14 translate-y-4 hover:rotate-6 hover:translate-x-20 z-20">
          
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/30 to-brand-primary/20 mix-blend-overlay z-10" />
          
          <div className="absolute inset-0 flex items-center justify-center bg-[#0d1629]">
            {/* Using a large emoji instead of an image to keep it dynamic */}
            <div className="text-8xl filter drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] relative z-20 animate-float">
              {dayInfo.emoji}
            </div>
            
            {/* Abstract background blobs for middle card */}
            <div className="absolute w-32 h-32 bg-brand-primary/50 blur-[30px] rounded-full top-0 right-0 mix-blend-screen animate-pulse-glow" />
            <div className="absolute w-40 h-40 bg-brand-blue/40 blur-[40px] rounded-full bottom-0 left-0 mix-blend-screen" />
          </div>
          
          <div className="absolute bottom-4 right-4 z-30 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center">
            <span className="text-white text-lg">✦</span>
          </div>
        </div>

        {/* --- TOP CARD (Center, floating forward) --- */}
        <div className="absolute w-[260px] h-[220px] rounded-3xl p-6 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-out 
                        transform hover:scale-105 z-30 flex flex-col justify-between
                        bg-black/40 backdrop-blur-xl border border-white/20">
           {/* Progress Ring overlaid delicately in top card background */}
           <div className="absolute -right-16 -top-16 opacity-30 pointer-events-none">
              <svg width="240" height="240" className="transform -rotate-90">
                <circle cx="120" cy="120" r="100" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="none" />
                <circle cx="120" cy="120" r="100" stroke="var(--color-brand-mint)" strokeWidth="4" fill="none" 
                        strokeDasharray="628.3" strokeDashoffset={628.3 - (628.3 * percentComplete) / 100} strokeLinecap="round" />
              </svg>
           </div>

           <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4">
                <span className="w-2 h-2 rounded-full bg-brand-mint animate-pulse" />
                <span className="text-white text-xs font-semibold tracking-wide uppercase">{dayInfo.title}</span>
              </div>
              <h2 className="text-4xl font-serif font-black text-white leading-tight drop-shadow-md">
                {weekDayText.split(' ')[0]} 
                <span className="block text-2xl font-sans font-light text-brand-text-muted mt-1">{weekDayText.split(' ').slice(1).join(' ')}</span>
              </h2>
           </div>

           <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
             <div>
                <p className="text-brand-text-muted text-xs uppercase tracking-wider mb-1">Durum</p>
                <p className="text-white font-medium text-sm">{Math.round(percentComplete)}% Tamamlandı</p>
             </div>
             <button className="h-10 px-4 bg-brand-primary text-white rounded-full text-sm font-semibold shadow-[0_0_20px_rgba(133,82,242,0.4)] hover:bg-brand-primary/90 transition-all hover:scale-105">
               Göz At
             </button>
           </div>
        </div>

      </div>
    </div>
  );
}
