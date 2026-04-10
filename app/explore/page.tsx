/**
 * Happi - Keşfet Sayfası
 * 
 * Hamilelik, bebek bakımı ve gelişim konularındaki makalelerin
 * listelendiği sayfa. Kategoriye göre filtreleme imkanı sunar.
 * Her makale tıklandığında inline olarak genişler.
 */

"use client";

import { useState } from "react";
import { getAllArticles } from "@/lib/services/dataService";
import type { Article } from "@/lib/types";

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);
  const [modalData, setModalData] = useState<{title: string, content: string} | null>(null);

  const getDetailedContent = (heading: string) => {
    // Statik detaylı içerik kütüphanesi (Gelecekte AI veya veritabanı ile beslenebilir)
    const db: Record<string, string> = {
      "Atak Haftaları Nedir?": "Atak haftaları (Wonder Weeks), bebeğinizin sinir sisteminde meydana gelen ani değişimleri ve sıçramaları ifade eder. Bu dönemlerde bebeklerin beyni, dünyayı algılama kalıplarını kökten değiştirir. Bebek bu yeni algıya alışmaya çalışırken korkabilir, daha fazla anneye yapışma ihtiyacı duyar. Bu geçiş süreçlerinde ağlama krizleri, iştahsızlık veya uyku gerilemesi yaşanması çok normaldir.",
      "10 Atak Haftası": "Hollandalı uzmanlar tarafından yapılan araştırmalara göre bir bebeğin ilk 20 ayında tam 10 farklı zihinsel sıçrama yaşadığı tespit edilmiştir.\n\nÖne çıkanlar:\n✨ 5. Hafta (Değişen Duyular)\n🧩 8. Hafta (Kalıpları Anlama)\n🔄 12. Hafta (Yumuşak Geçişler)\n\nHer atak fırtınasının ardından bebeğiniz yeni bir beceri kazanarak (örneğin ilk kıkırdama veya nesne yakalama) sizi şaşırtacaktır.",
      "Atak Döneminde Ne Yapmalı?": "Bu dönem fırtınalı bir deniz gibidir ve bebeğinizin güvenli limanı sizsiniz.\n\n1. Tensel temas (kanguru bakımı) bol bol uygulayın.\n2. Uyku ve beslenme reddine karşı esnek olun, onu zorlamayın.\n3. Bebeğinizin ağlamalarının şımarıklık değil, korku/büyüme sancısı olduğunu kendinize sık sık hatırlatın.\nBol sabır ve şefkat bu sürecin en iyi ilacıdır.",
      "Motor Gelişim": "Motor gelişim kaba (emekleme, yürüme) ve ince (kalem tutma, boncuk dizme) olarak ikiye ayrılır. İlk 3 yıldaki gelişimin temeli bol bol yere uzanmak (Tummy Time) ve bebepe hareket özgürlüğü tanımaktır.",
      "Dil Gelişimi": "Dil gelişimi bebeğin anne karnında sesinizi duymasıyla başlar. Onunla bebekçe konuşmak yerine düzgün ve melodik bir Türkçe ile konuşmak, göz teması kurarak şarkılar söylemek dil gelişiminin en büyük destekçisidir.",
      "Emzirme": "Emzirme bir arz-talep meselesidir. Bebek memeyi ne kadar çok emerse süt üretimi o kadar artar. İlk günlerde süt miktarından ziyade doğru kavramaya (latch) ve sancısız emzirmeye odaklanılmalıdır."
    };

    // Tam eşleşme yoksa kısmi eşleşmeye bak
    for (const key in db) {
      if (heading.includes(key) || key.includes(heading)) return db[key];
    }
    
    // VarsayılanFallback
    return "Bu konu hakkında çok yakında uzman makaleleri ve derinlemesine sesli/yazılı açıklamalar Happi'ye eklenecek! Bizi takip etmeye devam edin.";
  };

  const handleHeadingClick = (heading: string) => {
    setModalData({
      title: heading,
      content: getDetailedContent(heading)
    });
  };

  const articles = getAllArticles();

  const categories = [
    { key: "all", label: "Tümü", emoji: "📚" },
    { key: "wonder-weeks", label: "Atak Haftaları", emoji: "⚡" },
    { key: "teething", label: "Diş Çıkarma", emoji: "🦷" },
    { key: "solid-foods", label: "Katı Gıda", emoji: "🥄" },
    { key: "sleep-training", label: "Uyku", emoji: "😴" },
    { key: "development", label: "Gelişim", emoji: "📊" },
    { key: "health", label: "Sağlık", emoji: "❤️" },
    { key: "pregnancy", label: "Hamilelik", emoji: "🤰" },
  ];

  const filteredArticles =
    selectedCategory === "all"
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl px-5 pt-6 pb-3">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          📚 Keşfet
        </h1>

        {/* Kategori Filtreleri */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                selectedCategory === cat.key
                  ? "bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </header>

      {/* Makale Listesi */}
      <div className="px-4 pt-2 space-y-3">
        {filteredArticles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            isExpanded={expandedArticle === article.id}
            onToggle={() =>
              setExpandedArticle(
                expandedArticle === article.id ? null : article.id
              )
            }
            onHeadingClick={handleHeadingClick}
          />
        ))}

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-gray-500">Bu kategoride henüz makale yok.</p>
          </div>
        )}
      </div>

      {/* Alt Boşluk */}
      <div className="h-8" />

      {/* Detay Modalı */}
      {modalData && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md animate-fade-in px-4"
          onClick={() => setModalData(null)}
        >
          <div 
            className="animate-slide-up w-full max-w-md bg-white rounded-[32px] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.1)] relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dekoratif Işıklar */}
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-rose-200/40 rounded-full blur-2xl" />
            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-orange-200/40 rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-bold bg-gradient-to-br from-rose-500 to-orange-500 text-transparent bg-clip-text pr-4 leading-tight">
                  {modalData.title}
                </h2>
                <button 
                  onClick={() => setModalData(null)}
                  className="p-2 bg-gray-50 text-gray-500 rounded-full hover:bg-gray-100 flex-shrink-0 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="prose prose-sm prose-rose text-gray-600">
                {modalData.content.split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-3 leading-relaxed">{paragraph}</p>
                ))}
              </div>

              <button 
                onClick={() => setModalData(null)}
                className="mt-6 w-full py-3.5 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-semibold rounded-2xl shadow-lg shadow-rose-200 active:scale-[0.98] transition-transform"
              >
                Anladım, Teşekkürler ✨
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ArticleCard({
  article,
  isExpanded,
  onToggle,
  onHeadingClick,
}: {
  article: Article;
  isExpanded: boolean;
  onToggle: () => void;
  onHeadingClick: (heading: string) => void;
}) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 overflow-hidden ${
        isExpanded ? "border-rose-200 shadow-md" : "border-gray-100"
      }`}
    >
      {/* Kart Başlığı (Tıklanabilir) */}
      <button
        onClick={onToggle}
        className="w-full text-left p-4 flex items-start gap-3 touch-feedback"
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-100 to-orange-100 flex items-center justify-center text-2xl flex-shrink-0">
          {article.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-1">
            {article.title}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2">
            {article.summary}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[10px] text-gray-400 flex items-center gap-1">
              📖 {article.readTime} dk okuma
            </span>
            <div className="flex gap-1">
              {article.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`text-gray-400 transition-transform duration-300 mt-1 ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {/* Genişletilmiş İçerik */}
      {isExpanded && (
        <div className="px-4 pb-4 animate-slide-up">
          <div className="border-t border-gray-100 pt-4">
            <div className="prose prose-sm max-w-none text-gray-600">
              {article.content.split("\n\n").map((paragraph, idx) => {
                if (paragraph.startsWith("## ")) {
                  const headingText = paragraph.replace("## ", "");
                  return (
                    <button
                      key={idx}
                      onClick={() => onHeadingClick(headingText)}
                      className="group flex w-full items-center justify-between mt-6 mb-3 px-4 py-3 bg-rose-50/50 hover:bg-rose-50 border border-rose-100 rounded-xl transition-all duration-300 text-left active:scale-[0.98]"
                    >
                      <h3 className="text-base font-bold text-gray-800 transition-colors group-hover:text-rose-600">
                        {headingText}
                      </h3>
                      <div className="flex items-center gap-1 text-xs font-semibold text-rose-500 bg-white rounded-full px-2.5 py-1 shadow-sm opacity-90 group-hover:opacity-100 group-hover:shadow-md transition-all">
                        <span>Detay</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  );
                }
                if (paragraph.startsWith("### ")) {
                  return (
                    <h4
                      key={idx}
                      className="text-sm font-semibold text-gray-700 mt-3 mb-1"
                    >
                      {paragraph.replace("### ", "")}
                    </h4>
                  );
                }
                if (paragraph.startsWith("- ") || paragraph.startsWith("1. ")) {
                  const items = paragraph.split("\n");
                  return (
                    <ul key={idx} className="space-y-1 my-2">
                      {items.map((item, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-600 flex items-start gap-2"
                        >
                          <span className="text-rose-400 mt-0.5 flex-shrink-0">
                            •
                          </span>
                          <span>
                            {item.replace(/^[-\d.]\s*/, "").replace(/\*\*/g, "")}
                          </span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.startsWith("|")) {
                  return (
                    <div
                      key={idx}
                      className="overflow-x-auto my-3 text-xs bg-gray-50 rounded-xl p-3"
                    >
                      <pre className="whitespace-pre-wrap text-gray-600">
                        {paragraph}
                      </pre>
                    </div>
                  );
                }
                return (
                  <p key={idx} className="text-sm leading-relaxed my-2">
                    {paragraph.replace(/\*\*/g, "")}
                  </p>
                );
              })}
            </div>

            {/* Etiketler */}
            <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-gray-100">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-1 bg-rose-50 text-rose-500 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
