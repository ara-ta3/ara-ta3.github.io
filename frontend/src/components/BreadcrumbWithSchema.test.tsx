import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import BreadcrumbWithSchema from "@/components/BreadcrumbWithSchema";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";

vi.mock("@/hooks/useBreadcrumbs", () => ({
  useBreadcrumbs: vi.fn(),
}));

const mockUseBreadcrumbs = vi.mocked(useBreadcrumbs);

describe("BreadcrumbWithSchema", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("パンくずリストが空の場合は何も表示しない", () => {
    mockUseBreadcrumbs.mockReturnValue([]);

    const { container } = render(<BreadcrumbWithSchema pathname="/test" />);

    expect(container.firstChild).toBeNull();
  });

  it("BreadcrumbとBreadcrumbSchemaの両方を表示する", () => {
    const mockBreadcrumbs = [
      { name: "ホーム", url: "/", isLast: false },
      { name: "プロジェクト", url: "/projects/", isLast: true },
    ];

    mockUseBreadcrumbs.mockReturnValue(mockBreadcrumbs);

    const { container } = render(
      <BreadcrumbWithSchema pathname="/projects/" />,
    );

    expect(screen.getByText("ホーム")).toBeInTheDocument();
    expect(screen.getByText("プロジェクト")).toBeInTheDocument();

    const scriptTag = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(scriptTag).toBeInTheDocument();
  });

  it("指定されたpathnameでuseBreadcrumbsを呼び出す", () => {
    mockUseBreadcrumbs.mockReturnValue([]);

    render(<BreadcrumbWithSchema pathname="/projects/test-project" />);

    expect(mockUseBreadcrumbs).toHaveBeenCalledWith("/projects/test-project");
  });

  it("BreadcrumbとBreadcrumbSchemaに同じアイテムデータを渡す", () => {
    const mockBreadcrumbs = [
      { name: "ホーム", url: "/", isLast: false },
      { name: "記事一覧", url: "/articles/", isLast: true },
    ];

    mockUseBreadcrumbs.mockReturnValue(mockBreadcrumbs);

    const { container } = render(
      <BreadcrumbWithSchema pathname="/articles/" />,
    );

    expect(screen.getByText("ホーム")).toBeInTheDocument();
    expect(screen.getByText("記事一覧")).toBeInTheDocument();

    const scriptTag = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonLD = JSON.parse(scriptTag?.textContent || "{}");

    expect(jsonLD.itemListElement).toHaveLength(2);
    expect(jsonLD.itemListElement[0].name).toBe("ホーム");
    expect(jsonLD.itemListElement[1].name).toBe("記事一覧");
  });

  it("3階層のパンくずリストで全階層を表示しJSON-LDに反映する", () => {
    const mockBreadcrumbs = [
      { name: "ホーム", url: "/", isLast: false },
      { name: "プロジェクト", url: "/projects/", isLast: false },
      {
        name: "個人ウェブサイト",
        url: "/projects/personal-website",
        isLast: true,
      },
    ];

    mockUseBreadcrumbs.mockReturnValue(mockBreadcrumbs);

    const { container } = render(
      <BreadcrumbWithSchema pathname="/projects/personal-website" />,
    );

    expect(screen.getByText("ホーム")).toBeInTheDocument();
    expect(screen.getByText("プロジェクト")).toBeInTheDocument();
    expect(screen.getByText("個人ウェブサイト")).toBeInTheDocument();

    const scriptTag = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonLD = JSON.parse(scriptTag?.textContent || "{}");

    expect(jsonLD.itemListElement).toHaveLength(3);
    expect(
      jsonLD.itemListElement.map((item: { name: string }) => item.name),
    ).toEqual(["ホーム", "プロジェクト", "個人ウェブサイト"]);
  });
});
