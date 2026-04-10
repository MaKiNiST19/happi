/**
 * Happi - Zaman Tüneli Sayfası
 * 
 * Hamileliğin 1. haftasından bebeğin 3 yaşına kadar olan tüm süreci
 * dikey bir zaman tüneli formatında gösterir. Mevcut hafta otomatik olarak
 * odaklanır ve öne çıkar.
 */

"use client";

import { useState, useEffect, useRef } from "react";
import TimelineItem from "@/components/TimelineItem";
import { getUserProfile, getTimelineEntries } from "@/lib/services/dataService";
import type { TimelineEntry } from "@/lib/types";

export default function TimelinePage() {
  const [entries, setEntries] = useState<TimelineEntry[]>([]);
  const [filter, setFilter] = useState<"all" | "pregnancy" | "newborn" | "infant" | "toddler">("all");
  const [isLoading, setIsLoading] = useState(true);
  const currentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const profile = getUserProfile();
    if (profile?.expectedDueDate) {
      const timelineEntries = getTimelineEntries(profile.expectedDueDate);
      setEntries(timelineEntries);
    }
    setIsLoading(false);
  }, []);

  // Mevcut haftaya scroll et
  useEffect(() => {
    if (currentRef.current) {
      setTimeout(() => {
        currentRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 300);
    }
  }, [entries, filter]);

  const filteredEntries =
    filter === "all" ? entries : entries.filter((e) => e.period === filter);

  const filters = [
    { key: "all" as const, label: "Tümü", emoji: "📋" },
    { key: "pregnancy" as const, label: "Hamilelik", emoji: "🤰" },
    { key: "newborn" as const, label: "Yenidoğan", emoji: "👶" },
    { key: "infant" as const, label: "Bebek", emoji: "🍼" },
    { key: "toddler" as const, label: "Yürümeye Başlayan", emoji: "🧒" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-4xl mb-3 animate-bounce-slow">⏰</div>
          <p className="text-gray-400 animate-pulse">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="text-center">
          <div className="text-5xl mb-4">📅</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Henüz Tarih Girilmedi</h2>
          <p className="text-gray-500">
            Zaman tünelini görmek için ana sayfadan doğum tarihinizi girmelisiniz.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl px-5 pt-6 pb-3">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          ⏰ Zaman Tüneli
        </h1>

        {/* Filtre Butonları */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                filter === f.key
                  ? "bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {f.emoji} {f.label}
            </button>
          ))}
        </div>
      </header>

      {/* Zaman Tüneli */}
      <div className="px-4 pt-2">
        {filteredEntries.map((entry, idx) => (
          <div
            key={`${entry.period}-${entry.week}`}
            ref={entry.isCurrentWeek ? currentRef : undefined}
          >
            {/* Dönem Başlığı */}
            {idx === 0 ||
            filteredEntries[idx - 1]?.period !== entry.period ? (
              <div className="flex items-center gap-3 mb-4 mt-6 first:mt-0">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200" />
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {entry.period === "pregnancy"
                    ? "🤰 Hamilelik"
                    : entry.period === "newborn"
                    ? "👶 Yenidoğan"
                    : entry.period === "infant"
                    ? "🍼 Bebek"
                    : "🧒 Yürümeye Başlayan"}
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200" />
              </div>
            ) : null}

            <TimelineItem
              entry={entry}
              isFirst={idx === 0}
              isLast={idx === filteredEntries.length - 1}
            />
          </div>
        ))}
      </div>

      {/* Alt Boşluk */}
      <div className="h-8" />
    </div>
  );
}
