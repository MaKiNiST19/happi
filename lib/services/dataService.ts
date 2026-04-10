/**
 * Happi - Veri Servis Katmanı
 * 
 * Tüm veri erişimi bu servis üzerinden yapılır.
 * İleride veritabanı (Supabase, Firebase vb.) entegrasyonunda
 * sadece bu dosyanın güncellenmesi yeterli olacaktır.
 */

import { UserProfile, WeekInfo, Article, TimelineEntry, DayInfo } from "../types";
import { pregnancyWeeks, postnatalWeeks } from "../data/weeklyData";
import { dailyPregnancyData } from "../data/dailyData";
import { articles } from "../data/articles";
import { calculateCurrentDate, getPeriodName } from "../utils/dateUtils";

const STORAGE_KEY = "happi_user_profile";

// ==========================================
// Kullanıcı Profili Servisleri
// ==========================================

/**
 * Kullanıcı profilini localStorage'dan alır.
 * İleride API çağrısına dönüştürülebilir.
 */
export function getUserProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as UserProfile;
  } catch {
    return null;
  }
}

/**
 * Kullanıcı profilini kaydeder.
 */
export function saveUserProfile(profile: UserProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

/**
 * Kullanıcı profilini siler (reset).
 */
export function clearUserProfile(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

// ==========================================
// Haftalık Veri Servisleri
// ==========================================

/**
 * Belirli bir hamilelik haftasının verisini döndürür.
 */
export function getPregnancyWeekInfo(week: number): WeekInfo | undefined {
  return pregnancyWeeks.find(w => w.week === week);
}

/**
 * Belirli bir doğum sonrası haftanın verisini döndürür.
 * En yakın eşleşmeyi bulur (her hafta için veri olmayabilir).
 */
export function getPostnatalWeekInfo(week: number): WeekInfo | undefined {
  // Tam eşleşme var mı?
  const exact = postnatalWeeks.find(w => w.week === week);
  if (exact) return exact;
  
  // En yakın önceki haftayı bul
  const sorted = [...postnatalWeeks].sort((a, b) => b.week - a.week);
  return sorted.find(w => w.week <= week);
}

/**
 * Mevcut güne ait bilgi kartını döndürür.
 */
export function getTodayInfo(expectedDueDate: string): DayInfo | null {
  const calc = calculateCurrentDate(expectedDueDate);
  
  if (calc.period === "pregnancy") {
    // 1. Önce Daily dataya bak:
    // Sadece tam eşleşen gün yoksa, en yakın önceki günü bul
    // Çünkü CSV'de her gün yok, gün atlamalı var (1, 3, 5, 8 vb.)
    let currentDaily = dailyPregnancyData[0];
    for (let i = 0; i < dailyPregnancyData.length; i++) {
        if (dailyPregnancyData[i].day <= calc.currentDay) {
            currentDaily = dailyPregnancyData[i];
        } else {
            break;
        }
    }

    // Eğer geçerli bir daily data varsa (ki hep var) onu döndür
    if (currentDaily && calc.currentDay >= 1) {
        return {
            day: calc.currentDay,
            week: calc.currentWeek,
            dayOfWeek: calc.dayOfWeek,
            period: calc.period,
            title: currentDaily.title,
            description: currentDaily.summary,
            emoji: "🌟", // TODO: can use custom 
            category: "development",
        };
    }

    // 2. Yoksa Fallback olarak weekly datayı döndür
    const weekInfo = getPregnancyWeekInfo(calc.currentWeek);
    if (!weekInfo) return null;
    return {
        day: calc.currentDay,
        week: calc.currentWeek,
        dayOfWeek: calc.dayOfWeek,
        period: calc.period,
        title: weekInfo.title,
        description: weekInfo.summary,
        emoji: weekInfo.emoji,
        category: "development",
    };
  } else {
    // Doğum sonrası hafta/gün hesabı
    const postnatalWeek = calc.currentWeek - 40; // 40 hafta hamilelik çıkar
    const weekInfo = getPostnatalWeekInfo(Math.max(0, postnatalWeek));
    if (!weekInfo) return null;
    return {
        day: calc.currentDay, // total days
        week: postnatalWeek,
        dayOfWeek: calc.dayOfWeek,
        period: calc.period,
        title: weekInfo.title,
        description: weekInfo.summary,
        emoji: weekInfo.emoji,
        category: "development",
    };
  }
}


// ==========================================
// Zaman Tüneli Servisleri
// ==========================================

/**
 * Tüm zaman tüneli verilerini döndürür.
 */
export function getTimelineEntries(expectedDueDate: string): TimelineEntry[] {
  const calc = calculateCurrentDate(expectedDueDate);
  const entries: TimelineEntry[] = [];
  
  // Hamilelik haftaları
  for (const week of pregnancyWeeks) {
    entries.push({
      week: week.week,
      period: "pregnancy",
      title: week.title,
      summary: week.summary,
      emoji: week.emoji,
      isCurrentWeek: calc.period === "pregnancy" && calc.currentWeek === week.week,
      isPast: calc.period !== "pregnancy" || calc.currentWeek > week.week,
    });
  }
  
  // Doğum sonrası haftalar
  for (const week of postnatalWeeks) {
    const absoluteWeek = week.week + 40;
    entries.push({
      week: absoluteWeek,
      period: week.period,
      title: week.title,
      summary: week.summary,
      emoji: week.emoji,
      isCurrentWeek: calc.currentWeek === absoluteWeek,
      isPast: calc.currentWeek > absoluteWeek,
    });
  }
  
  return entries;
}

// ==========================================
// Makale Servisleri
// ==========================================

/**
 * Tüm makaleleri döndürür.
 */
export function getAllArticles(): Article[] {
  return articles;
}

/**
 * Kategoriye göre makaleleri filtreler.
 */
export function getArticlesByCategory(category: string): Article[] {
  return articles.filter(a => a.category === category);
}

/**
 * ID ile makale döndürür.
 */
export function getArticleById(id: string): Article | undefined {
  return articles.find(a => a.id === id);
}

// ==========================================
// Yardımcı Fonksiyonlar
// ==========================================

/**
 * Hamilelik hafta bilgisini formatlar.
 * Örn: "22. Hafta, 3. Gün"
 */
export function formatWeekDay(week: number, day: number, period: string): string {
  if (period === "pregnancy") {
    return `${week}. Hafta, ${day}. Gün`;
  }
  
  // Doğum sonrası
  const postnatalWeek = week - 40;
  if (postnatalWeek <= 0) return "Doğum Günü! 🎉";
  
  const months = Math.floor((postnatalWeek * 7) / 30.44);
  const years = Math.floor(months / 12);
  
  if (months < 1) return `${postnatalWeek}. Hafta`;
  if (months < 12) return `${months}. Ay`;
  if (years === 1) return `${years} Yaş ${months - 12} Ay`;
  return `${years} Yaş ${months - (years * 12)} Ay`;
}

/**
 * Dönem rengini döndürür (Tailwind class).
 */
export function getPeriodColor(period: string): string {
  const colors: Record<string, string> = {
    pregnancy: "from-rose-400 to-pink-500",
    newborn: "from-amber-400 to-orange-500",
    infant: "from-sky-400 to-blue-500",
    toddler: "from-emerald-400 to-green-500",
  };
  return colors[period] || "from-gray-400 to-gray-500";
}

/**
 * Dönem arka plan rengini döndürür.
 */
export function getPeriodBgColor(period: string): string {
  const colors: Record<string, string> = {
    pregnancy: "bg-rose-50",
    newborn: "bg-amber-50",
    infant: "bg-sky-50",
    toddler: "bg-emerald-50",
  };
  return colors[period] || "bg-gray-50";
}
