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
          className={`relative z-10 flex items-center justify-center rounded-full transition-all duration-300 ${
            entry.isCurrentWeek
              ? "w-12 h-12 shadow-lg"
              : entry.isPast
              ? "w-8 h-8"
              : "w-8 h-8"
          }`}
        >
          {entry.isCurrentWeek ? (
            <>
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${periodColor} animate-pulse`} />
              <span className="relative text-xl">{entry.emoji}</span>
            </>
          ) : entry.isPast ? (
            <>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-300 to-gray-400" />
              <span className="relative text-sm">{entry.emoji}</span>
            </>
          ) : (
            <>
              <div className="absolute inset-0 rounded-full bg-gray-100 border-2 border-gray-200" />
              <span className="relative text-sm opacity-50">{entry.emoji}</span>
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
        className={`flex-1 mb-4 rounded-2xl p-4 transition-all duration-300 ${
          entry.isCurrentWeek
            ? "bg-white shadow-lg border-2 border-rose-200 scale-[1.02]"
            : entry.isPast
            ? "bg-gray-50 opacity-70"
            : "bg-white shadow-sm border border-gray-100"
        }`}
      >
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
