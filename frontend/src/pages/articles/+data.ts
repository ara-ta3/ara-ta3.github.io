import { buildPopularArticles } from "@/domains/articles/popular.usecase";
import { buildArticleStats } from "@/domains/articles/stats.usecase";
import { MonthlyStat, YearlyStat } from "@/domains/articles/types";
import { fetchAllArticlesWithLimit, type Article } from "@/utils/rss";

export type Data = {
  articles: Article[];
  popularArticles: Article[];
  yearlyStats: YearlyStat[];
  monthlyStats: MonthlyStat[];
};

export default async function data(): Promise<Data> {
  const articles = await fetchAllArticlesWithLimit(200);
  const popularArticles = buildPopularArticles(articles);
  const { yearlyStats, monthlyStats } = buildArticleStats(articles, {
    monthlyMonths: 0,
  });
  return {
    articles,
    popularArticles,
    yearlyStats,
    monthlyStats,
  };
}
