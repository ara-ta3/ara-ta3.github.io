import Parser from "rss-parser";

export interface Article {
  title: string;
  link: string;
  pubDate: Date;
  contentSnippet?: string;
  creator?: string;
  source: "hatena" | "zenn";
  thumbnailUrl?: string;
}

const parser = new Parser({
  customFields: {
    item: ["media:thumbnail", "media:content", "content:encoded"],
  },
});

const RSS_FEEDS = [
  { url: "https://arata.hatenadiary.com/rss", source: "hatena" as const },
  { url: "https://zenn.dev/ara_ta3/feed", source: "zenn" as const },
];

type ParserItem = {
  enclosure?: {
    url?: string | null;
  };
} & Record<string, unknown>;

const toNonEmptyString = (value: unknown): string | undefined => {
  if (typeof value !== "string") {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const extractMediaUrl = (value: unknown): string | undefined => {
  if (!value) {
    return undefined;
  }
  if (Array.isArray(value)) {
    for (const entry of value) {
      const url = extractMediaUrl(entry);
      if (url) {
        return url;
      }
    }
    return undefined;
  }
  if (typeof value === "object") {
    const record = value as { url?: unknown; $?: { url?: unknown } };
    return toNonEmptyString(record.url) ?? toNonEmptyString(record.$?.url);
  }
  return toNonEmptyString(value);
};

const extractImageUrlFromHtml = (
  html: string | undefined,
): string | undefined => {
  if (!html) {
    return undefined;
  }
  const normalized = html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
  const match = normalized.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1];
};

const extractThumbnailUrl = (item: ParserItem): string | undefined => {
  const enclosureUrl = toNonEmptyString(item.enclosure?.url);
  if (enclosureUrl) {
    return enclosureUrl;
  }

  const record = item as Record<string, unknown>;
  const mediaUrl =
    extractMediaUrl(record["media:thumbnail"]) ||
    extractMediaUrl(record["media:content"]);
  if (mediaUrl) {
    return mediaUrl;
  }

  const html =
    toNonEmptyString(record["content:encoded"]) ||
    toNonEmptyString(record.content) ||
    toNonEmptyString(record.description);

  return extractImageUrlFromHtml(html);
};

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
        thumbnailUrl: extractThumbnailUrl(item as ParserItem),
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
