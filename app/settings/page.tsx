/**
 * Happi - Ayarlar Sayfası
 * 
 * Kullanıcı ayarları: doğum tarihi düzenleme, bildirim tercihleri,
 * uygulama bilgisi ve veri sıfırlama seçenekleri.
 */

"use client";

import { useState, useEffect } from "react";
import {
  getUserProfile,
  saveUserProfile,
  clearUserProfile,
} from "@/lib/services/dataService";
import { formatDateTurkish, calculateCurrentDate, getPeriodName } from "@/lib/utils/dateUtils";
import type { UserProfile } from "@/lib/types";

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [dateValue, setDateValue] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const p = getUserProfile();
    setProfile(p);
    if (p?.expectedDueDate) {
      const date = new Date(p.expectedDueDate);
      setDateValue(date.toISOString().split("T")[0]);
    }
  }, []);

  const handleDateChange = (newDate: string) => {
    setDateValue(newDate);
    if (profile) {
      const updatedProfile: UserProfile = {
        ...profile,
        expectedDueDate: new Date(newDate).toISOString(),
      };
      saveUserProfile(updatedProfile);
      setProfile(updatedProfile);
      showSaveMessage();
    }
  };

  const handleNotificationToggle = (
    key: "daily" | "weekly" | "milestones"
  ) => {
    if (!profile) return;
    const updatedProfile: UserProfile = {
      ...profile,
      notifications: {
        ...profile.notifications,
        [key]: !profile.notifications[key],
      },
    };
    saveUserProfile(updatedProfile);
    setProfile(updatedProfile);
    showSaveMessage();
  };

  const handleReset = () => {
    clearUserProfile();
    window.location.href = "/";
  };

  const showSaveMessage = () => {
    setSaveMessage("Kaydedildi ✓");
    setTimeout(() => setSaveMessage(""), 2000);
  };

  const dateCalc = profile?.expectedDueDate
    ? calculateCurrentDate(profile.expectedDueDate)
    : null;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <header className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          ⚙️ Ayarlar
        </h1>
        {saveMessage && (
          <div className="mt-2 text-sm text-green-600 font-medium animate-fade-in">
            {saveMessage}
          </div>
        )}
      </header>

      <div className="px-4 space-y-4">
        {/* Durum Özeti */}
        {dateCalc && profile && (
          <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl p-4 border border-rose-100">
            <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span>📊</span> Mevcut Durum
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <InfoItem
                label="Dönem"
                value={getPeriodName(dateCalc.period)}
              />
              <InfoItem label="Hafta" value={`${dateCalc.currentWeek}. Hafta`} />
              <InfoItem
                label="Tahmini Doğum"
                value={formatDateTurkish(new Date(profile.expectedDueDate))}
              />
              <InfoItem
                label="İlerleme"
                value={`%${Math.round(dateCalc.percentComplete)}`}
              />
            </div>
          </div>
        )}

        {/* Tarih Ayarı */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span>📅</span> Tahmini Doğum Tarihi
          </h2>
          <input
            type="date"
            value={dateValue}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl focus:border-rose-400 focus:ring-4 focus:ring-rose-100 outline-none transition-all duration-200 text-gray-700 bg-gray-50"
          />
          <p className="text-xs text-gray-400 mt-2">
            Tarihi değiştirmek tüm hesaplamaları günceller.
          </p>
        </div>

        {/* Bildirim Ayarları */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span>🔔</span> Bildirimler
          </h2>
          <div className="space-y-3">
            <ToggleItem
              label="Günlük Bildirimler"
              description="Her gün güncel bilgi al"
              checked={profile?.notifications.daily ?? true}
              onChange={() => handleNotificationToggle("daily")}
            />
            <ToggleItem
              label="Haftalık Özet"
              description="Her hafta gelişim özeti"
              checked={profile?.notifications.weekly ?? true}
              onChange={() => handleNotificationToggle("weekly")}
            />
            <ToggleItem
              label="Kilometre Taşları"
              description="Önemli gelişim anlarında bildirim"
              checked={profile?.notifications.milestones ?? true}
              onChange={() => handleNotificationToggle("milestones")}
            />
          </div>
        </div>

        {/* Hakkında */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span>ℹ️</span> Hakkında
          </h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-medium">Uygulama:</span> Happi v1.0.0
            </p>
            <p>
              <span className="font-medium">Açıklama:</span> Hamilelikten 3
              yaşına kadar bebek gelişim takip uygulaması.
            </p>
            <p className="text-xs text-gray-400 mt-3">
              ⚠️ Bu uygulama tıbbi tavsiye yerine geçmez. Sağlık konularında
              her zaman doktorunuza danışın.
            </p>
          </div>
        </div>

        {/* Veri Sıfırlama */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-red-100">
          <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span>🗑️</span> Veri Yönetimi
          </h2>
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full py-3 px-4 bg-red-50 text-red-600 font-medium rounded-xl hover:bg-red-100 transition-colors text-sm"
            >
              Tüm Verileri Sıfırla
            </button>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-red-600">
                Tüm verileriniz silinecek. Bu işlem geri alınamaz!
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 px-4 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition-colors text-sm"
                >
                  Evet, Sıfırla
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors text-sm"
                >
                  İptal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Alt Boşluk */}
      <div className="h-8" />
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/60 rounded-xl p-3">
      <p className="text-[10px] text-gray-400 uppercase tracking-wider">
        {label}
      </p>
      <p className="font-semibold text-gray-800 text-sm mt-0.5">{value}</p>
    </div>
  );
}

function ToggleItem({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-1">
      <div>
        <p className="font-medium text-gray-700 text-sm">{label}</p>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
          checked ? "bg-rose-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
            checked ? "translate-x-5.5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
