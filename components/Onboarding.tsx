/**
 * Onboarding Bileşeni
 * 
 * Kullanıcıdan hamilelik bilgilerini (beklenen doğum tarihi veya son adet tarihi)
 * alan ilk karşılama ekranı. Tarih girilince kullanıcı profilini kaydeder
 * ve ana sayfaya geçiş yapar.
 */

"use client";

import { useState } from "react";
import { saveUserProfile } from "@/lib/services/dataService";
import { calculateDueDateFromLMP, formatDateTurkish } from "@/lib/utils/dateUtils";

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState<"welcome" | "method" | "date">("welcome");
  const [method, setMethod] = useState<"edd" | "lmp" | "born">("edd");
  const [dateValue, setDateValue] = useState("");
  const [parentName, setParentName] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = () => {
    if (!dateValue) return;

    let expectedDueDate: string;

    if (method === "lmp") {
      const dueDate = calculateDueDateFromLMP(dateValue);
      expectedDueDate = dueDate.toISOString();
    } else {
      // For both edd and born, the entered date becomes the baseline due date / birth date
      expectedDueDate = new Date(dateValue).toISOString();
    }

    saveUserProfile({
      parentName: parentName.trim() || undefined,
      expectedDueDate,
      onboardingCompleted: true,
      notifications: {
        daily: true,
        weekly: true,
        milestones: true,
      },
    });

    setIsAnimating(true);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#FFFBF7] transition-opacity duration-700 ${
        isAnimating ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Ultra-Modern Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 h-[500px] w-[500px] animate-pulse-glow rounded-full bg-rose-200/40 blur-[80px]" />
        <div className="absolute -bottom-48 -left-48 h-[600px] w-[600px] animate-pulse-glow rounded-full bg-orange-200/30 blur-[100px]" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 animate-float rounded-full bg-sky-200/20 blur-[120px]" style={{ animationDelay: "3s" }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="relative px-6 w-full max-w-md mx-auto">
        {/* Welcome Step */}
        {step === "welcome" && (
            <div className="text-center animate-fade-in glass-card relative z-10 rounded-[40px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
              <div className="text-[80px] mb-6 animate-bounce-slow drop-shadow-xl">🌱</div>
              <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-transparent mb-4 pb-2">
                Happi
              </h1>
              <p className="text-xl font-medium text-gray-700 mb-2">
                Bebeğinizin büyüme yolculuğunda
              </p>
              <p className="text-xl font-medium text-gray-700 mb-8">
                yanınızdayız <span className="inline-block animate-pulse">💕</span>
              </p>
              <p className="text-sm text-gray-500 mb-10 leading-relaxed px-4">
                Hamileliğin başından 3 yaşına kadar günlük bilgiler, gelişim takibi ve çok daha fazlası.
              </p>
              <button
                onClick={() => setStep("method")}
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-rose-500 via-orange-500 to-rose-500 bg-[length:200%_auto] py-4 px-8 text-lg font-bold text-white shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all duration-300 hover:bg-[100%_center] hover:shadow-[0_0_30px_rgba(244,63,94,0.6)] hover:-translate-y-1 active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative flex items-center justify-center gap-2">
                  Serüvene Başla ✨
                </span>
              </button>
            </div>
        )}

        {/* Method Selection Step */}
        {step === "method" && (
          <div className="animate-fade-in">
            <button
              onClick={() => setStep("welcome")}
              className="mb-6 text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Geri
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Hangi bilginiz var?
            </h2>
            <p className="text-gray-500 mb-8">
              İkisinden biri yeterli. Tahmini de olabilir.
            </p>

            <div className="space-y-4">
              <button
                onClick={() => {
                  setMethod("edd");
                  setStep("date");
                }}
                className="w-full p-5 bg-white rounded-2xl border-2 border-transparent hover:border-rose-300 shadow-sm hover:shadow-md transition-all duration-200 text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    📅
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Tahmini Doğum Tarihi</h3>
                    <p className="text-sm text-gray-500">Doktorunuzun verdiği tarih</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  setMethod("lmp");
                  setStep("date");
                }}
                className="w-full p-5 bg-white rounded-2xl border-2 border-transparent hover:border-amber-300 shadow-sm hover:shadow-md transition-all duration-200 text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    🩸
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Son Adet Tarihi</h3>
                    <p className="text-sm text-gray-500">Son adetinizin ilk günü</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  setMethod("born");
                  setStep("date");
                }}
                className="w-full p-5 bg-white rounded-2xl border-2 border-transparent hover:border-sky-300 shadow-sm hover:shadow-md transition-all duration-200 text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    👶
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Bebeğim Doğdu</h3>
                    <p className="text-sm text-gray-500">Bebeğinizin doğum tarihi</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Date Input Step */}
        {step === "date" && (
          <div className="animate-fade-in">
            <button
              onClick={() => setStep("method")}
              className="mb-6 text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Geri
            </button>

            <div className="text-center mb-8">
              <div className="text-5xl mb-4">
                {method === "edd" ? "📅" : method === "lmp" ? "🩸" : "👶"}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {method === "edd"
                  ? "Tahmini Doğum Tarihi"
                  : method === "lmp"
                  ? "Son Adet Tarihi"
                  : "Doğum Tarihi"}
              </h2>
              <p className="text-gray-500">
                {method === "edd"
                  ? "Doktorunuzun belirlediği tahmini doğum tarihinizi girin."
                  : method === "lmp"
                  ? "Son adet döneminizin ilk gününü girin."
                  : "Bebeğinizin doğduğu tarihi girin."}
              </p>
            </div>

            <div className="bg-white/80 rounded-[32px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-rose-50 mb-6 backdrop-blur-sm">
              <label className="block text-sm font-bold text-gray-700 mb-2 pl-2">Size Nasıl Hitap Edelim?</label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="Örn: Ayşe"
                className="w-full text-center text-xl py-4 px-4 mb-6 border-2 border-gray-100 rounded-2xl focus:border-rose-400 focus:ring-4 focus:ring-rose-100 outline-none transition-all duration-300 text-gray-700 bg-white/60"
              />

              <label className="block text-sm font-bold text-gray-700 mb-2 pl-2">
                {method === "edd"
                  ? "Tahmini Doğum Tarihiniz"
                  : method === "lmp"
                  ? "Son Adet Tarihiniz"
                  : "Bebeğinizin Doğum Tarihi"}
              </label>
              <input
                type="date"
                value={dateValue}
                onChange={(e) => setDateValue(e.target.value)}
                className="w-full text-center text-xl py-4 px-4 border-2 border-gray-100 rounded-2xl focus:border-rose-400 focus:ring-4 focus:ring-rose-100 outline-none transition-all duration-300 text-gray-700 bg-white/60"
              />
              
              {dateValue && method === "lmp" && (
                <div className="mt-4 p-4 bg-amber-50 rounded-xl">
                  <p className="text-sm text-amber-700">
                    <span className="font-semibold">Tahmini doğum tarihiniz:</span>{" "}
                    {formatDateTurkish(calculateDueDateFromLMP(dateValue))}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!dateValue}
              className={`group relative w-full overflow-hidden rounded-2xl py-4 px-8 text-lg font-bold transition-all duration-300 ${
                dateValue
                  ? "bg-gradient-to-r from-rose-500 via-orange-500 to-rose-500 bg-[length:200%_auto] text-white shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:bg-[100%_center] hover:shadow-[0_0_30px_rgba(244,63,94,0.6)] hover:-translate-y-1 active:scale-[0.98]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              }`}
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative flex items-center justify-center gap-2">
                Happi'ye Başla 🚀
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
