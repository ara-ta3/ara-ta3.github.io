import { fetchAllArticlesWithLimit, type Article } from "@/utils/rss";
import {
  buildArticleStats,
  type MonthlyStat,
  type YearlyStat,
} from "@/utils/articleStats";

export type Data = {
  articles: Article[];
  yearlyStats: YearlyStat[];
  monthlyStats: MonthlyStat[];
};

export default async function data(): Promise<Data> {
  const articles = await fetchAllArticlesWithLimit(200);
  const { yearlyStats, monthlyStats } = buildArticleStats(articles, {
    monthlyMonths: 0,
  });
  return {
    articles,
    yearlyStats,
    monthlyStats,
  };
}
