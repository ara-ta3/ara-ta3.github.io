import { ArticleSource } from "@/domains/articles/types";

export const ARTICLE_SOURCES: ArticleSource[] = ["hatena", "zenn"];
const TOKYO_TIMEZONE = "Asia/Tokyo";

export const tokyoYearMonthFormatter = new Intl.DateTimeFormat("ja-JP", {
  timeZone: TOKYO_TIMEZONE,
  year: "numeric",
  month: "2-digit",
});
