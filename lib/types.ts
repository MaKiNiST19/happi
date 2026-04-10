/**
 * Happi - Tip Tanımları
 * 
 * Uygulama genelinde kullanılan tüm TypeScript tip tanımları.
 * Veri modeli ileride veritabanına geçişte de aynı kalacak şekilde tasarlandı.
 */

/** Kullanıcı profili - hamilelik/bebek bilgileri */
export interface UserProfile {
  /** Beklenen doğum tarihi (ISO string) */
  expectedDueDate: string;
  /** Bebeğin adı (opsiyonel) */
  babyName?: string;
  /** Onboarding tamamlandı mı */
  onboardingCompleted: boolean;
  /** Bildirim tercihleri */
  notifications: NotificationPreferences;
}

export interface NotificationPreferences {
  daily: boolean;
  weekly: boolean;
  milestones: boolean;
}

export interface DailyInfo {
  day: number;
  title: string;
  summary: string;
  details: string[];
  tips: string[];
}

/** Günlük/Haftalık bilgi kartı */
export interface DayInfo {
  /** Gün (hamilelik başlangıcından itibaren) */
  day: number;
  /** Hafta numarası */
  week: number;
  /** Hafta içindeki gün (1-7) */
  dayOfWeek: number;
  /** Dönem: hamilelik, yenidoğan, bebek, yürümeye başlayan */
  period: Period;
  /** Kısa başlık */
  title: string;
  /** O güne/haftaya özel bilgi */
  description: string;
  /** İkon veya emoji */
  emoji: string;
  /** Kategori */
  category: InfoCategory;
}

/** Haftalık özet bilgisi */
export interface WeekInfo {
  week: number;
  period: Period;
  title: string;
  summary: string;
  emoji: string;
  details: string[];
  babySize?: string;
  tips: string[];
}

/** Keşfet bölümü makale tipi */
export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: ArticleCategory;
  emoji: string;
  readTime: number;
  tags: string[];
}

/** Dönem/Periyot tanımı */
export type Period = "pregnancy" | "newborn" | "infant" | "toddler";

/** Bilgi kategorisi */
export type InfoCategory =
  | "development"
  | "health"
  | "nutrition"
  | "sleep"
  | "milestone"
  | "tip";

/** Makale kategorisi */
export type ArticleCategory =
  | "wonder-weeks"
  | "teething"
  | "solid-foods"
  | "sleep-training"
  | "development"
  | "health"
  | "pregnancy";

/** Zaman tüneli öğesi */
export interface TimelineEntry {
  week: number;
  period: Period;
  title: string;
  summary: string;
  emoji: string;
  isCurrentWeek: boolean;
  isPast: boolean;
}

/** Tarih hesaplama sonucu */
export interface DateCalculation {
  currentDay: number;
  currentWeek: number;
  dayOfWeek: number;
  period: Period;
  totalDays: number;
  daysUntilDue: number;
  percentComplete: number;
}
