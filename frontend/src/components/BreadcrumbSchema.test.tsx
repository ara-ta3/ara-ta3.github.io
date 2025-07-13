import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import BreadcrumbSchema from "./BreadcrumbSchema";
import type { BreadcrumbItem } from "@/hooks/useBreadcrumbs";

describe("BreadcrumbSchema", () => {
  it("空の配列の場合は何も出力しない", () => {
    const { container } = render(<BreadcrumbSchema items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("Schema.org BreadcrumbList仕様に準拠したJSON-LDを生成する", () => {
    const items: BreadcrumbItem[] = [
      { name: "ホーム", url: "/", isLast: false },
      { name: "プロジェクト", url: "/projects/", isLast: false },
      { name: "プロジェクト詳細", url: "/projects/test", isLast: true },
    ];

    const { container } = render(<BreadcrumbSchema items={items} />);
    
    const scriptTag = container.querySelector('script[type="application/ld+json"]');
    expect(scriptTag).toBeInTheDocument();
    
    const jsonLD = JSON.parse(scriptTag?.textContent || "{}");
    
    expect(jsonLD).toEqual({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "ホーム",
          item: "https://ara-ta3.github.io/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "プロジェクト",
          item: "https://ara-ta3.github.io/projects/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "プロジェクト詳細",
          item: "https://ara-ta3.github.io/projects/test",
        },
      ],
    });
  });

  it("単一アイテムでもposition1から開始するJSON-LDを生成する", () => {
    const items: BreadcrumbItem[] = [
      { name: "ホーム", url: "/", isLast: true },
    ];

    const { container } = render(<BreadcrumbSchema items={items} />);
    
    const scriptTag = container.querySelector('script[type="application/ld+json"]');
    const jsonLD = JSON.parse(scriptTag?.textContent || "{}");
    
    expect(jsonLD.itemListElement).toHaveLength(1);
    expect(jsonLD.itemListElement[0]).toEqual({
      "@type": "ListItem",
      position: 1,
      name: "ホーム",
      item: "https://ara-ta3.github.io/",
    });
  });

  it("絶対URLをそのまま使用する", () => {
    const items: BreadcrumbItem[] = [
      { name: "外部リンク", url: "https://example.com", isLast: true },
    ];

    const { container } = render(<BreadcrumbSchema items={items} />);
    
    const scriptTag = container.querySelector('script[type="application/ld+json"]');
    const jsonLD = JSON.parse(scriptTag?.textContent || "{}");
    
    expect(jsonLD.itemListElement[0].item).toBe("https://example.com");
  });

  it("複数アイテムに1から連番のposition値を設定する", () => {
    const items: BreadcrumbItem[] = [
      { name: "Item 1", url: "/item1", isLast: false },
      { name: "Item 2", url: "/item2", isLast: false },
      { name: "Item 3", url: "/item3", isLast: false },
      { name: "Item 4", url: "/item4", isLast: true },
    ];

    const { container } = render(<BreadcrumbSchema items={items} />);
    
    const scriptTag = container.querySelector('script[type="application/ld+json"]');
    const jsonLD = JSON.parse(scriptTag?.textContent || "{}");
    
    expect(jsonLD.itemListElement).toHaveLength(4);
    jsonLD.itemListElement.forEach((item: any, index: number) => {
      expect(item.position).toBe(index + 1);
    });
  });

  it("application/ld+json形式のscriptタグを生成する", () => {
    const items: BreadcrumbItem[] = [
      { name: "テスト", url: "/test", isLast: true },
    ];

    const { container } = render(<BreadcrumbSchema items={items} />);
    
    const scriptTag = container.querySelector("script");
    expect(scriptTag).toHaveAttribute("type", "application/ld+json");
  });
});