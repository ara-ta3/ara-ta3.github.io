import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Breadcrumb from "./Breadcrumb";
import type { BreadcrumbItem } from "@/hooks/useBreadcrumbs";

describe("Breadcrumb", () => {
  it("空の配列の場合は何も表示しない", () => {
    const { container } = render(<Breadcrumb items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("パンくずリストの全アイテムがDOMに表示される", () => {
    const items: BreadcrumbItem[] = [
      { name: "ホーム", url: "/", isLast: false },
      { name: "プロジェクト", url: "/projects/", isLast: false },
      { name: "プロジェクト詳細", url: "/projects/test", isLast: true },
    ];

    render(<Breadcrumb items={items} />);

    expect(screen.getByText("ホーム")).toBeInTheDocument();
    expect(screen.getByText("プロジェクト")).toBeInTheDocument();
    expect(screen.getByText("プロジェクト詳細")).toBeInTheDocument();
  });

  it("ホームアイテムにリンクが設定される", () => {
    const items: BreadcrumbItem[] = [
      { name: "ホーム", url: "/", isLast: false },
      { name: "プロジェクト", url: "/projects/", isLast: true },
    ];

    render(<Breadcrumb items={items} />);

    const homeLink = screen.getByText("ホーム").closest("a");
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("最後のアイテムはリンクではない", () => {
    const items: BreadcrumbItem[] = [
      { name: "ホーム", url: "/", isLast: false },
      { name: "現在のページ", url: "/current", isLast: true },
    ];

    render(<Breadcrumb items={items} />);

    const lastItem = screen.getByText("現在のページ");
    expect(lastItem.closest("a")).toBeNull();
    
    const homeLink = screen.getByText("ホーム").closest("a");
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("最後のアイテムにtext-gray-500クラスが適用される", () => {
    const items: BreadcrumbItem[] = [
      { name: "ホーム", url: "/", isLast: false },
      { name: "現在のページ", url: "/current", isLast: true },
    ];

    render(<Breadcrumb items={items} />);

    const lastItem = screen.getByText("現在のページ");
    expect(lastItem).toHaveClass("text-gray-500");
  });
});