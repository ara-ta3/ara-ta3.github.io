import type { Article } from "@/utils/rss";

type ArticleSource = Article["source"];

const ARTICLE_SOURCES: ArticleSource[] = ["hatena", "zenn"];

export type SourceTotals = Record<ArticleSource, number>;

export type YearlyStat = {
  year: number;
  totals: SourceTotals;
  sum: number;
};

export type MonthlyStat = {
  year: number;
  month: number;
  label: string;
  totals: SourceTotals;
  sum: number;
};

const createEmptyTotals = (): SourceTotals =>
  ARTICLE_SOURCES.reduce(
    (acc, source) => {
      acc[source] = 0;
      return acc;
    },
    {} as SourceTotals,
  );

const incrementTotals = (totals: SourceTotals, source: ArticleSource) => {
  totals[source] += 1;
};

const sumTotals = (totals: SourceTotals): number =>
  ARTICLE_SOURCES.reduce((sum, source) => sum + totals[source], 0);

export const buildYearlyStats = (articles: Article[]): YearlyStat[] => {
  const yearlyMap = new Map<number, SourceTotals>();

  articles.forEach((article) => {
    const year = article.pubDate.getFullYear();
    const totals = yearlyMap.get(year) ?? createEmptyTotals();
    incrementTotals(totals, article.source);
    yearlyMap.set(year, totals);
  });

  return Array.from(yearlyMap.entries())
    .map(([year, totals]) => ({
      year,
      totals,
      sum: sumTotals(totals),
    }))
    .sort((a, b) => b.year - a.year);
};

export const buildMonthlyStats = (
  articles: Article[],
  options: { months?: number } = {},
): MonthlyStat[] => {
  const { months = 12 } = options;
  const monthlyMap = new Map<
    string,
    { year: number; month: number; label: string; totals: SourceTotals }
  >();

  articles.forEach((article) => {
    const date = article.pubDate;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const key = `${year}-${month}`;
    const label = `${year}年${month.toString().padStart(2, "0")}月`;

    if (!monthlyMap.has(key)) {
      monthlyMap.set(key, {
        year,
        month,
        label,
        totals: createEmptyTotals(),
      });
    }

    const entry = monthlyMap.get(key)!;
    incrementTotals(entry.totals, article.source);
  });

  const sorted = Array.from(monthlyMap.values())
    .map((entry) => ({
      ...entry,
      sum: sumTotals(entry.totals),
    }))
    .sort((a, b) => {
      if (a.year === b.year) {
        return a.month - b.month;
      }
      return a.year - b.year;
    });

  return months > 0 ? sorted.slice(-months) : sorted;
};

export const buildArticleStats = (articles: Article[]) => ({
  yearlyStats: buildYearlyStats(articles),
  monthlyStats: buildMonthlyStats(articles),
});
