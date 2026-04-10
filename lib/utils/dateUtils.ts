/**
 * Happi - Tarih Hesaplama Yardımcıları
 * 
 * Hamilelik ve doğum sonrası tarih hesaplamaları.
 * Tüm hesaplamalar beklenen doğum tarihi (EDD) üzerinden yapılır.
 */

import { DateCalculation, Period } from "../types";

/** Hamilelik süresi (gün cinsinden): 40 hafta = 280 gün */
const PREGNANCY_DURATION_DAYS = 280;

/**
 * Beklenen doğum tarihine (EDD) göre mevcut hafta/gün bilgisini hesaplar.
 * 
 * @param expectedDueDate - Beklenen doğum tarihi (ISO string veya Date)
 * @returns DateCalculation objesi
 */
export function calculateCurrentDate(expectedDueDate: string | Date): DateCalculation {
  const dueDate = new Date(expectedDueDate);
  const today = new Date();
  
  // Saat farkını sıfırla (gün bazında hesaplama)
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);
  
  // Hamileliğin başlangıç tarihini hesapla (EDD - 280 gün)
  const pregnancyStart = new Date(dueDate);
  pregnancyStart.setDate(pregnancyStart.getDate() - PREGNANCY_DURATION_DAYS);
  
  // Hamilelik başlangıcından bu yana geçen gün
  const msDiff = today.getTime() - pregnancyStart.getTime();
  const totalDays = Math.floor(msDiff / (1000 * 60 * 60 * 24));
  
  // Doğuma kalan gün
  const msToDue = dueDate.getTime() - today.getTime();
  const daysUntilDue = Math.floor(msToDue / (1000 * 60 * 60 * 24));
  
  // Hafta ve gün hesabı
  const currentWeek = Math.floor(totalDays / 7) + 1;
  const dayOfWeek = (totalDays % 7) + 1;
  
  // Dönem belirleme
  const period = determinePeriod(totalDays, daysUntilDue);
  
  // İlerleme yüzdesi (hamilelik + 3 yıl = 280 + 1095 = 1375 gün)
  const totalJourneyDays = PREGNANCY_DURATION_DAYS + (3 * 365);
  const percentComplete = Math.min(100, Math.max(0, (totalDays / totalJourneyDays) * 100));
  
  return {
    currentDay: totalDays,
    currentWeek: Math.max(1, currentWeek),
    dayOfWeek,
    period,
    totalDays,
    daysUntilDue,
    percentComplete,
  };
}

/**
 * Gün sayısına göre dönem belirler.
 */
function determinePeriod(totalDays: number, daysUntilDue: number): Period {
  if (daysUntilDue > 0) return "pregnancy";
  
  const daysAfterBirth = Math.abs(daysUntilDue);
  
  if (daysAfterBirth <= 28) return "newborn"; // 0-4 hafta
  if (daysAfterBirth <= 365) return "infant"; // 1-12 ay
  return "toddler"; // 1-3 yaş
}

/**
 * Son adet tarihinden (LMP) beklenen doğum tarihini hesaplar.
 * Naegele formülü: LMP + 280 gün
 */
export function calculateDueDateFromLMP(lmpDate: string | Date): Date {
  const lmp = new Date(lmpDate);
  const dueDate = new Date(lmp);
  dueDate.setDate(dueDate.getDate() + PREGNANCY_DURATION_DAYS);
  return dueDate;
}

/**
 * Tarih formatlama (Türkçe)
 */
export function formatDateTurkish(date: Date): string {
  const months = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];
  
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Dönem adını Türkçe olarak döndürür.
 */
export function getPeriodName(period: Period): string {
  const names: Record<Period, string> = {
    pregnancy: "Hamilelik",
    newborn: "Yenidoğan",
    infant: "Bebek",
    toddler: "Yürümeye Başlayan",
  };
  return names[period];
}

/**
 * Hafta numarasına göre hangi döneme denk geldiği (doğum sonrası)
 */
export function getPostnatalAge(daysAfterBirth: number): string {
  if (daysAfterBirth < 0) return "";
  
  const months = Math.floor(daysAfterBirth / 30.44);
  const years = Math.floor(daysAfterBirth / 365.25);
  
  if (daysAfterBirth <= 7) return `${daysAfterBirth} günlük`;
  if (daysAfterBirth <= 28) return `${Math.floor(daysAfterBirth / 7)} haftalık`;
  if (months < 12) return `${months} aylık`;
  if (months < 24) return `${years} yaş ${months - 12} ay`;
  return `${years} yaş`;
}
