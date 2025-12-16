import { afterEach, describe, expect, it } from "vitest";
import {
  buildMonthlyStats,
  buildYearlyStats,
} from "@/domains/articles/stats.usecase";
import type { Article } from "@/utils/rss";

const createArticle = (overrides: Partial<Article>): Article => ({
  title: overrides.title ?? "title",
  link: overrides.link ?? "https://example.com",
  pubDate: overrides.pubDate ?? new Date(),
  source: overrides.source ?? "hatena",
  contentSnippet: overrides.contentSnippet,
  creator: overrides.creator,
});

const createArticleByDate = (
  date: string,
  source: Article["source"] = "hatena",
): Article =>
  createArticle({
    title: `title-${date}`,
    link: `https://example.com/${date}`,
    pubDate: new Date(date),
    source,
  });

describe("articleStats", () => {
  const originalTZ = process.env.TZ;

  afterEach(() => {
    process.env.TZ = originalTZ;
  });

  describe("buildMonthlyStats", () => {
    it("JST 0時の記事を UTC 環境でも正しい月で集計する", () => {
      process.env.TZ = "UTC";

      const stats = buildMonthlyStats(
        [
          createArticle({
            title: "december",
            pubDate: new Date("2024-12-01T00:00:00+09:00"),
          }),
          createArticle({
            title: "november",
            pubDate: new Date("2024-11-15T12:00:00+09:00"),
          }),
        ],
        { months: 0 },
      );

      expect(stats.map((stat) => stat.label)).toEqual([
        "2024年11月",
        "2024年12月",
      ]);
      expect(
        stats.find((stat) => stat.label === "2024年12月")?.totals.hatena,
      ).toBe(1);
    });

    it("欠損月を 0 件で埋めてから範囲を切り出す", () => {
      const articles: Article[] = [
        createArticleByDate("2025-01-15T12:00:00Z", "hatena"),
        createArticleByDate("2025-03-10T12:00:00Z", "zenn"),
        createArticleByDate("2025-12-20T12:00:00Z", "hatena"),
      ];

      const stats = buildMonthlyStats(articles, { months: 12 });

      expect(stats).toHaveLength(12);
      expect(stats[0]).toMatchObject({
        year: 2025,
        month: 1,
        totals: { hatena: 1, zenn: 0 },
        sum: 1,
      });
      expect(stats[1]).toMatchObject({
        year: 2025,
        month: 2,
        totals: { hatena: 0, zenn: 0 },
        sum: 0,
      });
      expect(stats[2]).toMatchObject({
        year: 2025,
        month: 3,
        totals: { hatena: 0, zenn: 1 },
        sum: 1,
      });
      expect(stats[11]).toMatchObject({
        year: 2025,
        month: 12,
        totals: { hatena: 1, zenn: 0 },
        sum: 1,
      });
    });

    it("欠損月を補完した上で months オプションを反映する", () => {
      const articles: Article[] = [
        createArticleByDate("2024-11-05T12:00:00Z", "hatena"),
        createArticleByDate("2025-04-01T12:00:00Z", "zenn"),
      ];

      const stats = buildMonthlyStats(articles, { months: 4 });

      expect(stats.map((stat) => `${stat.year}-${stat.month}`)).toEqual([
        "2025-1",
        "2025-2",
        "2025-3",
        "2025-4",
      ]);
    });
  });

  describe("buildYearlyStats", () => {
    it("年次集計も JST 基準で扱う", () => {
      process.env.TZ = "UTC";

      const stats = buildYearlyStats([
        createArticle({
          title: "newyear",
          pubDate: new Date("2024-01-01T00:00:00+09:00"),
        }),
        createArticle({
          title: "prevyear",
          pubDate: new Date("2023-12-01T00:00:00+09:00"),
        }),
      ]);

      expect(stats.map((stat) => stat.year)).toEqual([2024, 2023]);
    });
  });
});
