/**
 * TimelineItem Bileşeni
 * 
 * Zaman tüneli sayfasındaki her bir hafta/dönem kartı.
 * Geçmiş, şu an ve gelecek durumlarını farklı stillerle gösterir.
 * Tıklandığında detay modalı açılabilir.
 */

"use client";

import { TimelineEntry } from "@/lib/types";
import { getPeriodColor } from "@/lib/services/dataService";

interface TimelineItemProps {
  entry: TimelineEntry;
  isFirst?: boolean;
  isLast?: boolean;
}

export default function TimelineItem({ entry, isFirst, isLast }: TimelineItemProps) {
  const periodColor = getPeriodColor(entry.period);

  return (
    <div className="relative flex gap-4 pb-1">
      {/* Dikey Çizgi */}
      <div className="relative flex flex-col items-center">
        {/* Üst çizgi */}
        {!isFirst && (
          <div
            className={`w-0.5 flex-1 ${
              entry.isPast || entry.isCurrentWeek
                ? "bg-gradient-to-b from-gray-300 to-gray-300"
                : "bg-gray-200"
            }`}
          />
        )}
        {isFirst && <div className="flex-1" />}

        {/* Nokta */}
        <div
          className={`relative z-10 flex items-center justify-center rounded-full transition-all duration-500 hover:scale-110 ${
            entry.isCurrentWeek
              ? "w-14 h-14 shadow-[0_0_20px_rgba(244,63,94,0.4)]"
              : entry.isPast
              ? "w-10 h-10 shadow-sm"
              : "w-10 h-10 shadow-sm"
          }`}
        >
          {entry.isCurrentWeek ? (
            <>
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${periodColor} animate-pulse-glow border-2 border-white`} />
              <span className="relative text-2xl drop-shadow-md">{entry.emoji}</span>
            </>
          ) : entry.isPast ? (
            <>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-white/50" />
              <span className="relative text-lg opacity-80">{entry.emoji}</span>
            </>
          ) : (
            <>
              <div className="absolute inset-0 rounded-full bg-white border border-gray-200" />
              <div className="absolute inset-2 rounded-full bg-gray-50" />
              <span className="relative text-base opacity-40 grayscale">{entry.emoji}</span>
            </>
          )}
        </div>

        {/* Alt çizgi */}
        {!isLast && (
          <div
            className={`w-0.5 flex-1 ${
              entry.isPast ? "bg-gray-300" : "bg-gray-200"
            }`}
          />
        )}
        {isLast && <div className="flex-1" />}
      </div>

      {/* İçerik Kartı */}
      <div
        className={`group flex-1 mb-6 rounded-[24px] p-5 transition-all duration-500 ease-out hover:-translate-y-1 ${
          entry.isCurrentWeek
            ? "glass-card border-none shadow-[0_10px_40px_rgba(0,0,0,0.08)] ring-1 ring-white/60 scale-[1.02] relative overflow-hidden"
            : entry.isPast
            ? "bg-white/40 backdrop-blur-sm shadow-sm ring-1 ring-gray-200/50 hover:bg-white/60"
            : "bg-white/60 backdrop-blur-md shadow-sm ring-1 ring-gray-100 hover:shadow-md"
        }`}
      >
        {entry.isCurrentWeek && (
            <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${periodColor} rounded-full blur-3xl opacity-20 pointer-events-none group-hover:scale-150 transition-transform duration-700`} />
        )}
        {/* Hafta Etiketi */}
        <div className="flex items-center justify-between mb-1">
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              entry.isCurrentWeek
                ? `bg-gradient-to-r ${periodColor} text-white`
                : entry.isPast
                ? "bg-gray-200 text-gray-600"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {entry.period === "pregnancy"
              ? `${entry.week}. Hafta`
              : `Doğum +${entry.week - 40}. Hafta`}
          </span>
          
          {entry.isCurrentWeek && (
            <span className="text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-medium animate-pulse">
              Şu an
            </span>
          )}
        </div>

        {/* Başlık */}
        <h3
          className={`font-semibold mt-1 ${
            entry.isCurrentWeek
              ? "text-gray-900 text-base"
              : entry.isPast
              ? "text-gray-600 text-sm"
              : "text-gray-700 text-sm"
          }`}
        >
          {entry.title}
        </h3>

        {/* Özet */}
        <p
          className={`mt-1 leading-relaxed ${
            entry.isCurrentWeek
              ? "text-gray-600 text-sm"
              : "text-gray-500 text-xs"
          }`}
        >
          {entry.summary}
        </p>
      </div>
    </div>
  );
}
