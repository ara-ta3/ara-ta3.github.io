import { Article } from "@/utils/rss";

export type ArticleSource = Article["source"];
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
