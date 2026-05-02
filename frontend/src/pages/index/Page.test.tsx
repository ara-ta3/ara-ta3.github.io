import React from "react";
import { render } from "@testing-library/react";
import { expect, test, describe, vi } from "vitest";
import Home from "@/pages/index/+Page.tsx";

// useDataをモック
vi.mock("vike-react/useData", () => ({
  useData: () => ({
    articles: [
      {
        title: "テスト記事1",
        link: "https://example.com/1",
        pubDate: new Date("2025-01-15"),
        source: "hatena",
        contentSnippet: "テスト記事の説明",
      },
      {
        title: "テスト記事2",
        link: "https://example.com/2",
        pubDate: new Date("2025-01-14"),
        source: "zenn",
        contentSnippet: "もう一つのテスト記事",
      },
    ],
    latestSlides: [
      {
        slug: "2026-04-22-ai-era-code-review",
        title: "AI時代のコードレビュー",
        description: "AI Agent時代におけるコードレビューの役割整理",
        image:
          "https://ara-ta3.github.io/slides/assets/2026-04-22-ai-era-code-review.png",
        date: "2026-04-22",
        url: "/slides/2026-04-22-ai-era-code-review.html",
        eventName: "AI時代のコードレビューLT会",
        eventUrl: "https://supporterz-seminar.connpass.com/event/388882/",
      },
    ],
  }),
}));

describe("Home Snapshot Test", () => {
  test("render Home", () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});
