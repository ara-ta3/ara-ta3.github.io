import articlesData from "@/domains/articles/articles.data.json";

export interface Article {
  title: string;
  link: string;
  pubDate: Date;
  contentSnippet?: string;
  creator?: string;
  source: "hatena" | "zenn" | "company";
  thumbnailUrl?: string;
  bookmarkCount?: number;
}

type StoredArticle = Omit<Article, "pubDate"> & { pubDate: string };

// articles.data.json は scripts/fetch-articles.mts が生成する正本データ。
// ビルド時は外部 RSS / API へアクセスせず、この JSON を読み込む。
const STORED_ARTICLES: Article[] = (articlesData as StoredArticle[])
  .map((article) => ({ ...article, pubDate: new Date(article.pubDate) }))
  .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

export async function fetchAllArticles(): Promise<Article[]> {
  return fetchAllArticlesWithLimit(10);
}

export async function fetchAllArticlesWithLimit(
  limit: number,
): Promise<Article[]> {
  return STORED_ARTICLES.slice(0, limit);
}
