import { afterEach, describe, expect, it } from "vitest";
import { buildMonthlyStats, buildYearlyStats } from "@/utils/articleStats";
import type { Article } from "@/utils/rss";

const createArticle = (overrides: Partial<Article>): Article => ({
  title: overrides.title ?? "title",
  link: overrides.link ?? "https://example.com",
  pubDate: overrides.pubDate ?? new Date(),
  source: overrides.source ?? "hatena",
  contentSnippet: overrides.contentSnippet,
  creator: overrides.creator,
});

describe("articleStats", () => {
  const originalTZ = process.env.TZ;

  afterEach(() => {
    process.env.TZ = originalTZ;
  });

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
