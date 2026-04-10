/**
 * TodayCard Bileşeni
 *
 * Ana sayfada gösterilen sürüklenebilir 3'lü kart yığını.
 * Kartlar ileri/geri sürüklenerek sırası değiştirilebilir.
 */

"use client";

import { useState, useRef, useCallback } from "react";
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

  const percentComplete =
    dayInfo.period === "pregnancy"
      ? dateCalc.percentComplete
      : Math.min(100, Math.max(0, ((dateCalc.currentDay - 280) / (3 * 365)) * 100));

  // Card order: index 0 = front/top, 1 = middle, 2 = back
  const [order, setOrder] = useState<[number, number, number]>([0, 1, 2]);
  const [dragging, setDragging] = useState(false);
  const [dragDelta, setDragDelta] = useState({ x: 0, y: 0 });
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const topCardRef = useRef<HTMLDivElement>(null);

  const cycleForward = useCallback(() => {
    setOrder(([a, b, c]) => [c, a, b]);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStart.current = { x: e.clientX, y: e.clientY };
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragStart.current || !dragging) return;
    setDragDelta({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handlePointerUp = () => {
    if (!dragStart.current) return;
    const threshold = 60;
    if (Math.abs(dragDelta.x) > threshold || Math.abs(dragDelta.y) > threshold) {
      cycleForward();
    }
    setDragging(false);
    setDragDelta({ x: 0, y: 0 });
    dragStart.current = null;
  };

  // Define the 3 card variants
  const cards = [
    // Card A: Info / Period card
    (zIndex: number, style: React.CSSProperties, isTop: boolean) => (
      <div
        key="card-a"
        style={{ ...style, zIndex }}
        className={`absolute w-[240px] h-[260px] glass-folder rounded-3xl p-5 shadow-2xl flex flex-col justify-end
          ${isTop ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
        onPointerDown={isTop ? handlePointerDown : undefined}
        onPointerMove={isTop ? handlePointerMove : undefined}
        onPointerUp={isTop ? handlePointerUp : undefined}
        ref={isTop ? topCardRef : undefined}
      >
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-brand-blue/30 rounded-full blur-[40px] mix-blend-screen pointer-events-none" />
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center">
            <span className="text-brand-text text-sm">📅</span>
          </div>
          <p className="font-sans text-xs text-brand-text-muted font-medium uppercase tracking-wider">{periodName}</p>
        </div>
        <p className="text-brand-text/90 font-medium text-sm leading-relaxed text-balance">
          {dayInfo.description.length > 80 ? dayInfo.description.substring(0, 80) + "…" : dayInfo.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-brand-text-muted text-xs">
            {dayInfo.period === "pregnancy" && dateCalc.daysUntilDue > 0 ? `Doğuma ${dateCalc.daysUntilDue} gün` : ""}
          </p>
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20">
            <span className="text-[10px]">✨</span>
          </div>
        </div>
        {isTop && <SwipeHint />}
      </div>
    ),

    // Card B: Emoji / Visual card
    (zIndex: number, style: React.CSSProperties, isTop: boolean) => (
      <div
        key="card-b"
        style={{ ...style, zIndex }}
        className={`absolute w-[220px] h-[240px] glass-folder rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]
          ${isTop ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
        onPointerDown={isTop ? handlePointerDown : undefined}
        onPointerMove={isTop ? handlePointerMove : undefined}
        onPointerUp={isTop ? handlePointerUp : undefined}
        ref={isTop ? topCardRef : undefined}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/30 to-brand-primary/20 mix-blend-overlay z-10" />
        <div className="absolute inset-0 flex items-center justify-center bg-[#0d1629]">
          <div className="text-8xl filter drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] relative z-20 animate-float select-none">
            {dayInfo.emoji}
          </div>
          <div className="absolute w-32 h-32 bg-brand-primary/50 blur-[30px] rounded-full top-0 right-0 mix-blend-screen animate-pulse-glow" />
          <div className="absolute w-40 h-40 bg-brand-blue/40 blur-[40px] rounded-full bottom-0 left-0 mix-blend-screen" />
        </div>
        <div className="absolute bottom-4 right-4 z-30 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center">
          <span className="text-white text-lg">✦</span>
        </div>
        {isTop && <SwipeHint />}
      </div>
    ),

    // Card C: Progress / Status card
    (zIndex: number, style: React.CSSProperties, isTop: boolean) => (
      <div
        key="card-c"
        style={{ ...style, zIndex }}
        className={`absolute w-[260px] h-[220px] rounded-3xl p-6 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] flex flex-col justify-between
          bg-black/40 backdrop-blur-xl border border-white/20
          ${isTop ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
        onPointerDown={isTop ? handlePointerDown : undefined}
        onPointerMove={isTop ? handlePointerMove : undefined}
        onPointerUp={isTop ? handlePointerUp : undefined}
        ref={isTop ? topCardRef : undefined}
      >
        <div className="absolute -right-16 -top-16 opacity-30 pointer-events-none">
          <svg width="240" height="240" className="transform -rotate-90">
            <circle cx="120" cy="120" r="100" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="none" />
            <circle
              cx="120" cy="120" r="100"
              stroke="var(--color-brand-mint)" strokeWidth="4" fill="none"
              strokeDasharray="628.3"
              strokeDashoffset={628.3 - (628.3 * percentComplete) / 100}
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-mint animate-pulse" />
            <span className="text-white text-xs font-semibold tracking-wide uppercase">{dayInfo.title}</span>
          </div>
          <h2 className="text-4xl font-serif font-black text-white leading-tight drop-shadow-md">
            {weekDayText.split(" ")[0]}
            <span className="block text-2xl font-sans font-light text-brand-text-muted mt-1">
              {weekDayText.split(" ").slice(1).join(" ")}
            </span>
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
        {isTop && <SwipeHint />}
      </div>
    ),
  ];

  // Positions for each slot: slot 0 = top/front, 1 = mid, 2 = back
  const slotStyles: React.CSSProperties[] = [
    // Front (top)
    {
      transform: dragging
        ? `translate(${dragDelta.x * 0.4}px, ${dragDelta.y * 0.4}px) rotate(${dragDelta.x * 0.04}deg)`
        : "translateY(0px) rotate(0deg)",
      transition: dragging ? "none" : "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
    },
    // Middle
    {
      transform: "rotate(10deg) translate(12px, 12px) scale(0.95)",
      transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
    },
    // Back
    {
      transform: "rotate(-10deg) translate(-14px, 18px) scale(0.9)",
      transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
      opacity: 0.75,
    },
  ];

  // order[i] = which card sits in slot i
  // We need: for each card (0,1,2), what slot is it in?
  const cardSlot = [0, 1, 2].map((cardIdx) => order.indexOf(cardIdx));

  return (
    <div className="w-full relative min-h-[440px] flex items-center justify-center pt-8 pb-12">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-primary/20 rounded-full blur-[80px]" />

      <div className="relative w-full max-w-[320px] h-[360px] flex items-center justify-center select-none">
        {cards.map((renderCard, cardIdx) => {
          const slot = cardSlot[cardIdx];
          const isTop = slot === 0;
          const zIndex = 30 - slot * 10;
          return renderCard(zIndex, slotStyles[slot], isTop);
        })}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            onClick={() => {
              // Rotate until card i is at front
              setOrder((prev) => {
                const idx = prev.indexOf(i);
                if (idx === 0) return prev;
                if (idx === 1) return [prev[1], prev[2], prev[0]];
                return [prev[2], prev[0], prev[1]];
              });
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              order[0] === i ? "bg-brand-primary w-5" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function SwipeHint() {
  return (
    <div className="absolute top-3 right-3 flex items-center gap-1 opacity-50 pointer-events-none">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
      </svg>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </div>
  );
}
