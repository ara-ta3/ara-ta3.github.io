import { Article } from "@/utils/rss";

export type PopularArticlesOptions = {
  limit?: number;
  minBookmarks?: number;
};

export const buildPopularArticles = (
  articles: Article[],
  options: PopularArticlesOptions = {},
): Article[] => {
  const { limit = 6, minBookmarks = 2 } = options;

  return articles
    .filter((article) => (article.bookmarkCount ?? 0) >= minBookmarks)
    .sort((a, b) => {
      const diff = (b.bookmarkCount ?? 0) - (a.bookmarkCount ?? 0);
      if (diff !== 0) {
        return diff;
      }
      return b.pubDate.getTime() - a.pubDate.getTime();
    })
    .slice(0, limit);
};
