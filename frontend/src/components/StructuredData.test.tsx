import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import StructuredData from "@/components/StructuredData";

describe("StructuredData", () => {
  test("WebSiteのtitleとdescriptionを1つのJSON-LDへ出力する", () => {
    const { container } = render(
      <StructuredData
        data={{
          title: "ara-ta3の個人サイト | 技術記事・登壇資料・個人開発",
          description:
            "ScalaやTypeScriptを中心にWeb開発をしているara-ta3の個人サイトです。",
          url: "https://ara-ta3.github.io/",
          type: "WebSite",
        }}
      />,
    );

    const scripts = container.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    expect(scripts).toHaveLength(1);
    expect(JSON.parse(scripts[0].textContent ?? "")).toEqual({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "ara-ta3の個人サイト | 技術記事・登壇資料・個人開発",
      description:
        "ScalaやTypeScriptを中心にWeb開発をしているara-ta3の個人サイトです。",
      url: "https://ara-ta3.github.io/",
      alternateName: "ara-ta3.github.io",
      author: {
        "@type": "Person",
        name: "ara-ta3",
        url: "https://x.com/ara_ta3",
        sameAs: ["https://x.com/ara_ta3", "https://github.com/ara-ta3"],
      },
    });
  });
});
