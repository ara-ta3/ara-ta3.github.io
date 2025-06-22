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
  }),
}));

describe("Home Snapshot Test", () => {
  test("render Home", () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});
