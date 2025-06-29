import Parser from "rss-parser";

export interface Article {
  title: string;
  link: string;
  pubDate: Date;
  contentSnippet?: string;
  creator?: string;
  source: "hatena" | "zenn";
}

const parser = new Parser();

const RSS_FEEDS = [
  { url: "https://arata.hatenadiary.com/rss", source: "hatena" as const },
  { url: "https://zenn.dev/ara_ta3/feed", source: "zenn" as const },
];

async function fetchRSSFeed(
  url: string,
  source: Article["source"],
): Promise<Article[]> {
  try {
    const feed = await parser.parseURL(url);
    return feed.items
      .map((item) => ({
        title: item.title || "",
        link: item.link || "",
        pubDate: new Date(item.pubDate || item.isoDate || ""),
        contentSnippet: item.contentSnippet || item.summary,
        creator: item.creator || item.author,
        source,
      }))
      .filter((article) => article.title && article.link);
  } catch (error) {
    console.error(`Failed to fetch RSS feed from ${url}:`, error);
    return [];
  }
}

export async function fetchAllArticles(): Promise<Article[]> {
  return fetchAllArticlesWithLimit(10);
}

export async function fetchAllArticlesWithLimit(
  limit: number,
): Promise<Article[]> {
  const allArticlesPromises = RSS_FEEDS.map(({ url, source }) =>
    fetchRSSFeed(url, source),
  );

  const allArticlesArrays = await Promise.allSettled(allArticlesPromises);

  const allArticles = allArticlesArrays
    .filter(
      (result): result is PromiseFulfilledResult<Article[]> =>
        result.status === "fulfilled",
    )
    .flatMap((result) => result.value);

  return allArticles
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
    .slice(0, limit);
}
