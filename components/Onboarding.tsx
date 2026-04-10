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
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 transition-opacity duration-500 ${
        isAnimating ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Dekoratif arka plan elementleri */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-rose-200/40 to-pink-300/40 blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-amber-200/40 to-orange-300/40 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-sky-200/30 to-blue-300/30 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative px-6 w-full max-w-md mx-auto">
        {/* Welcome Step */}
        {step === "welcome" && (
          <div className="text-center animate-fade-in">
            <div className="text-7xl mb-6 animate-bounce-slow">🌱</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent mb-4">
              Happi
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Bebeğinizin büyüme yolculuğunda
            </p>
            <p className="text-lg text-gray-600 mb-10">
              yanınızdayız 💕
            </p>
            <p className="text-sm text-gray-400 mb-8">
              Hamileliğin başından 3 yaşına kadar günlük bilgiler, gelişim takibi ve çok daha fazlası.
            </p>
            <button
              onClick={() => setStep("method")}
              className="w-full py-4 px-8 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-semibold rounded-2xl shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/30 active:scale-[0.98] transition-all duration-200 text-lg"
            >
              Başlayalım ✨
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

            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <input
                type="date"
                value={dateValue}
                onChange={(e) => setDateValue(e.target.value)}
                className="w-full text-center text-xl py-4 px-4 border-2 border-gray-200 rounded-xl focus:border-rose-400 focus:ring-4 focus:ring-rose-100 outline-none transition-all duration-200 text-gray-700"
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
              className={`w-full py-4 px-8 font-semibold rounded-2xl shadow-lg text-lg transition-all duration-200 ${
                dateValue
                  ? "bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/30 active:scale-[0.98]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              }`}
            >
              Happi'ye Başla 🚀
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
