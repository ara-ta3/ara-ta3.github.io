import { ArticleSource } from "@/domains/articles/types";

export const ARTICLE_SOURCES: ArticleSource[] = ["hatena", "zenn", "carta"];

type SourceMeta = {
  label: string;
  badgeClass: string;
  chartColor: string;
};

export const SOURCE_META: Record<ArticleSource, SourceMeta> = {
  hatena: {
    label: "はてなブログ",
    badgeClass: "bg-orange-100 text-orange-800",
    chartColor: "rgba(249, 115, 22, 0.7)",
  },
  zenn: {
    label: "Zenn",
    badgeClass: "bg-blue-100 text-blue-800",
    chartColor: "rgba(59, 130, 246, 0.7)",
  },
  carta: {
    label: "CARTA TECH BLOG",
    badgeClass: "bg-emerald-100 text-emerald-800",
    chartColor: "rgba(16, 185, 129, 0.7)",
  },
};

const TOKYO_TIMEZONE = "Asia/Tokyo";

export const tokyoYearMonthFormatter = new Intl.DateTimeFormat("ja-JP", {
  timeZone: TOKYO_TIMEZONE,
  year: "numeric",
  month: "2-digit",
});
