// 記事データ (はてなブログ / Zenn / CARTA TECH BLOG) を収集し、
// frontend/src/domains/articles/articles.data.json を生成する。
//
// ビルド (CD) はこの JSON を読み込んで HTML を生成するため、ビルド時に
// 外部 RSS / API へアクセスしない。データ更新は本スクリプト経由で行い、
// 差分があれば CI が PR を作成する運用を想定している。
//
// 実行: make articles/fetch (= tsx scripts/fetch-articles.ts)

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

type ArticleSource = "hatena" | "zenn" | "company";

// 収集途中の記事。OGP 補完で thumbnailUrl / contentSnippet を後から埋める。
type FetchedArticle = {
  title: string;
  link: string;
  pubDate: string;
  source: ArticleSource;
  contentSnippet?: string;
  thumbnailUrl?: string;
};

// articles.data.json に出力する形。任意項目は値があるときだけ含める。
type StoredArticle = {
  title: string;
  link: string;
  pubDate: string;
  source: ArticleSource;
  contentSnippet?: string;
  thumbnailUrl?: string;
  bookmarkCount?: number;
};

type ZennArticle = {
  path: string;
  title: string;
  published_at: string;
};

type ZennResponse = {
  articles?: ZennArticle[];
  next_page: number | null;
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(
  __dirname,
  "../frontend/src/domains/articles/articles.data.json",
);

const HATENA_ARCHIVE_BASE = "https://arata.hatenadiary.com/archive";
const ZENN_API_BASE =
  "https://zenn.dev/api/articles?username=ara_ta3&order=latest";
const HATENA_BOOKMARK_COUNT_ENDPOINT =
  "https://bookmark.hatenaapis.com/count/entries";
const BOOKMARK_COUNT_BATCH_SIZE = 50;
const SNIPPET_MAX_LENGTH = 140;
const USER_AGENT = "Mozilla/5.0 (ara-ta3.github.io article fetcher)";

// 企業ブログ (source: "company") として扱う記事。現状は CARTA TECH BLOG
// (techblog.cartaholdings.co.jp) の id:arata3da4 名義の記事。著者ページから
// 機械取得しづらいため、ここを正本として保持する。今後別の企業ブログで書いた
// 記事もここに追記すれば同じカテゴリでまとまる。
const COMPANY_BLOG_ARTICLES: FetchedArticle[] = [
  {
    title:
      "サポーターズの「1dayスピード選考会」開発：教科書通りのスクラムから、自分たちの「型」を作るまで",
    link: "https://techblog.cartaholdings.co.jp/entry/2025/12/05/120500",
    pubDate: "2025-12-05T12:05:00+09:00",
    contentSnippet:
      "「1dayスピード選考会」のシステム化という、およそ半年間のプロジェクトで実践した開発プロセスとその裏側の試行錯誤について。",
    source: "company",
    thumbnailUrl:
      "https://cdn-ak.f.st-hatena.com/images/fotolife/n/namu_r21/20251205/20251205121159.png",
  },
  {
    title:
      "AIの登場によりWebエンジニアの仕事はなくなるのか - Coding with AI: The End of Software Development as We Know Itを見て",
    link: "https://techblog.cartaholdings.co.jp/entry/will-emergence-aI-eliminate-jobs-web-engineers",
    pubDate: "2025-06-11T10:56:48+09:00",
    contentSnippet:
      "AIの登場によりWebエンジニアの仕事はなくなるのかという問いに思いを馳せた記事。現役Webエンジニアやこれから目指す学生向け。",
    source: "company",
    thumbnailUrl:
      "https://cdn-ak.f.st-hatena.com/images/fotolife/c/carta_engineers/20250610/20250610175139.png",
  },
  {
    title: "サポーターズで1on1イベントをフルサイクル開発した話",
    link: "https://techblog.cartaholdings.co.jp/entry/2023/12/22/160000",
    pubDate: "2023-12-22T16:00:00+09:00",
    contentSnippet:
      "CARTA TECH BLOG アドベントカレンダー 12/22 の記事。サポーターズで1on1イベントをフルサイクル開発した話。",
    source: "company",
    thumbnailUrl:
      "https://cdn-ak.f.st-hatena.com/images/fotolife/a/arata3da4/20231222/20231222154116.png",
  },
  {
    title:
      "CTOからの挑戦状2016 2ndを手伝った際に書いたPythonコードを晒してみる。",
    link: "https://techblog.cartaholdings.co.jp/entry/2016/12/11/202517",
    pubDate: "2016-12-11T20:25:17+09:00",
    contentSnippet:
      "VOYAGE GROUP の Advent Calendar 2016 11日目の記事。CTOからの挑戦状2016 2ndを手伝った際に書いたPythonコードの紹介。",
    source: "company",
    thumbnailUrl:
      "https://cdn-ak.f.st-hatena.com/images/fotolife/a/arata3da4/20161214/20161214141155.png",
  },
];

const errorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

const decodeHtmlEntities = (text: string): string =>
  text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");

const stripTags = (html: string): string =>
  decodeHtmlEntities(html.replace(/<[^>]+>/g, ""))
    .replace(/\s+/g, " ")
    .trim();

const truncate = (text: string, max: number): string =>
  text.length > max ? `${text.slice(0, max)}…` : text;

const fetchText = async (url: string): Promise<string> => {
  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.text();
};

// はてなブログの月別/全体アーカイブ URL からエントリの投稿日時を復元する。
const hatenaPubDate = (link: string, fallbackDate: string): string => {
  const match = link.match(
    /\/entry\/(\d{4})\/(\d{2})\/(\d{2})\/(\d{2})(\d{2})(\d{2})/,
  );
  if (match) {
    const [, y, mo, d, h, mi, s] = match;
    return `${y}-${mo}-${d}T${h}:${mi}:${s}+09:00`;
  }
  return `${fallbackDate}T00:00:00+09:00`;
};

const parseHatenaArchivePage = (html: string): FetchedArticle[] => {
  const articles: FetchedArticle[] = [];
  const sections = html.split('<section class="archive-entry');
  for (const section of sections.slice(1)) {
    const linkMatch = section.match(
      /<a class="entry-title-link"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/,
    );
    if (!linkMatch) {
      continue;
    }
    const link = linkMatch[1];
    const title = stripTags(linkMatch[2]);
    const dateMatch = section.match(/<time[^>]*datetime="([^"]+)"/);
    const fallbackDate = dateMatch ? dateMatch[1] : "1970-01-01";
    const thumbMatch = section.match(
      /class="entry-thumb"[^>]*background-image:\s*url\('([^']+)'\)/,
    );
    const descMatch = section.match(
      /<p class="entry-description">([\s\S]*?)<\/p>/,
    );
    const contentSnippet = descMatch
      ? truncate(stripTags(descMatch[1]), SNIPPET_MAX_LENGTH)
      : undefined;
    articles.push({
      title,
      link,
      pubDate: hatenaPubDate(link, fallbackDate),
      contentSnippet,
      source: "hatena",
      thumbnailUrl: thumbMatch ? thumbMatch[1] : undefined,
    });
  }
  return articles;
};

const fetchHatenaArticles = async (): Promise<FetchedArticle[]> => {
  const articles: FetchedArticle[] = [];
  let page = 1;
  // 安全のためページ数に上限を設ける。
  for (; page <= 100; page += 1) {
    const html = await fetchText(`${HATENA_ARCHIVE_BASE}?page=${page}`);
    const pageArticles = parseHatenaArchivePage(html);
    articles.push(...pageArticles);
    if (!html.includes("pager-next") || pageArticles.length === 0) {
      break;
    }
  }
  console.log(`hatena: ${articles.length} 件 (${page} ページ)`);
  return articles;
};

const extractMeta = (html: string, property: string): string | undefined => {
  const patterns = [
    new RegExp(`<meta[^>]*property="${property}"[^>]*content="([^"]*)"`, "i"),
    new RegExp(`<meta[^>]*content="([^"]*)"[^>]*property="${property}"`, "i"),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      return decodeHtmlEntities(match[1]);
    }
  }
  return undefined;
};

const fetchZennArticles = async (): Promise<FetchedArticle[]> => {
  const articles: FetchedArticle[] = [];
  let nextUrl: string | null = ZENN_API_BASE;
  while (nextUrl) {
    const response = await fetch(nextUrl, {
      headers: { "User-Agent": USER_AGENT },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${nextUrl}: ${response.status}`);
    }
    const json = (await response.json()) as ZennResponse;
    for (const item of json.articles ?? []) {
      articles.push({
        title: item.title,
        link: `https://zenn.dev${item.path}`,
        pubDate: new Date(item.published_at).toISOString(),
        source: "zenn",
      });
    }
    nextUrl = json.next_page
      ? `https://zenn.dev/api/articles?username=ara_ta3&order=latest&page=${json.next_page}`
      : null;
  }

  // OGP から description / thumbnail を補完する。
  for (const article of articles) {
    try {
      const html = await fetchText(article.link);
      const image = extractMeta(html, "og:image");
      const description = extractMeta(html, "og:description");
      if (image) {
        article.thumbnailUrl = image;
      }
      if (description) {
        article.contentSnippet = truncate(description, SNIPPET_MAX_LENGTH);
      }
    } catch (error) {
      console.warn(`zenn OGP 取得失敗: ${article.link}`, errorMessage(error));
    }
  }
  console.log(`zenn: ${articles.length} 件`);
  return articles;
};

const fetchBookmarkCounts = async (
  links: string[],
): Promise<Record<string, number>> => {
  const counts: Record<string, number> = {};
  for (let i = 0; i < links.length; i += BOOKMARK_COUNT_BATCH_SIZE) {
    const batch = links.slice(i, i + BOOKMARK_COUNT_BATCH_SIZE);
    const query = batch
      .map((url) => `url=${encodeURIComponent(url)}`)
      .join("&");
    try {
      const response = await fetch(
        `${HATENA_BOOKMARK_COUNT_ENDPOINT}?${query}`,
        { headers: { "User-Agent": USER_AGENT } },
      );
      if (!response.ok) {
        continue;
      }
      Object.assign(counts, (await response.json()) as Record<string, number>);
    } catch (error) {
      console.warn("はてブ数取得失敗", errorMessage(error));
    }
  }
  return counts;
};

const main = async (): Promise<void> => {
  const [hatena, zenn] = await Promise.all([
    fetchHatenaArticles(),
    fetchZennArticles(),
  ]);
  const articles: FetchedArticle[] = [
    ...hatena,
    ...zenn,
    ...COMPANY_BLOG_ARTICLES,
  ];

  const bookmarkCounts = await fetchBookmarkCounts(
    articles.map((article) => article.link),
  );

  const withCounts: StoredArticle[] = articles.map((article) => {
    const bookmarkCount = bookmarkCounts[article.link];
    const normalized: StoredArticle = {
      title: article.title,
      link: article.link,
      pubDate: article.pubDate,
      source: article.source,
    };
    if (article.contentSnippet) {
      normalized.contentSnippet = article.contentSnippet;
    }
    if (article.thumbnailUrl) {
      normalized.thumbnailUrl = article.thumbnailUrl;
    }
    if (typeof bookmarkCount === "number") {
      normalized.bookmarkCount = bookmarkCount;
    }
    return normalized;
  });

  withCounts.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
  );

  await writeFile(OUTPUT_PATH, `${JSON.stringify(withCounts, null, 2)}\n`);
  console.log(`書き込み完了: ${OUTPUT_PATH} (${withCounts.length} 件)`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
