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
    </div>
  );
}

function ArticleCard({
  article,
  isExpanded,
  onToggle,
}: {
  article: Article;
  isExpanded: boolean;
  onToggle: () => void;
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
                  return (
                    <h3
                      key={idx}
                      className="text-base font-bold text-gray-800 mt-4 mb-2"
                    >
                      {paragraph.replace("## ", "")}
                    </h3>
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
