import { describe, expect, it } from "vitest";
import { buildPopularArticles } from "@/domains/articles/popular.usecase";
import type { Article } from "@/domains/articles/articles";

const createArticle = (overrides: Partial<Article>): Article => ({
  title: overrides.title ?? "title",
  link: overrides.link ?? "https://example.com",
  pubDate: overrides.pubDate ?? new Date("2025-01-01T00:00:00+09:00"),
  source: overrides.source ?? "hatena",
  bookmarkCount: overrides.bookmarkCount,
});

describe("buildPopularArticles", () => {
  it("ブックマーク数の降順で並べ、上限件数で切り出す", () => {
    const articles = [
      createArticle({ link: "a", bookmarkCount: 3 }),
      createArticle({ link: "b", bookmarkCount: 10 }),
      createArticle({ link: "c", bookmarkCount: 7 }),
    ];

    const result = buildPopularArticles(articles, { limit: 2 });

    expect(result.map((article) => article.link)).toEqual(["b", "c"]);
  });

  it("最小ブックマーク数(既定2)未満の記事を除外する", () => {
    const articles = [
      createArticle({ link: "a", bookmarkCount: 0 }),
      createArticle({ link: "b", bookmarkCount: 1 }),
      createArticle({ link: "c", bookmarkCount: undefined }),
      createArticle({ link: "d", bookmarkCount: 2 }),
    ];

    const result = buildPopularArticles(articles);

    expect(result.map((article) => article.link)).toEqual(["d"]);
  });

  it("同数の場合は新しい記事を優先する", () => {
    const articles = [
      createArticle({
        link: "old",
        bookmarkCount: 5,
        pubDate: new Date("2020-01-01T00:00:00+09:00"),
      }),
      createArticle({
        link: "new",
        bookmarkCount: 5,
        pubDate: new Date("2025-01-01T00:00:00+09:00"),
      }),
    ];

    const result = buildPopularArticles(articles);

    expect(result.map((article) => article.link)).toEqual(["new", "old"]);
  });
});
