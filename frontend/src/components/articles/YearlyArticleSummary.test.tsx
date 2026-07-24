import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import YearlyArticleSummary from "@/components/articles/YearlyArticleSummary";
import type { YearlyStat } from "@/domains/articles/types";

const createStat = (year: number): YearlyStat => ({
  year,
  totals: { hatena: 1, zenn: 0, company: 0 },
  sum: 1,
});

const buildStats = (years: number[]): YearlyStat[] => years.map(createStat);

describe("YearlyArticleSummary", () => {
  it("6年以上あるとき既定では直近5年分だけ表示する", () => {
    render(
      <YearlyArticleSummary
        stats={buildStats([2026, 2025, 2024, 2023, 2022, 2021, 2020])}
      />,
    );

    expect(screen.getByText("2022年")).toBeInTheDocument();
    expect(screen.queryByText("2021年")).not.toBeInTheDocument();
    expect(screen.queryByText("2020年")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /すべての年を表示/ }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("展開すると残りの年も表示する", () => {
    render(
      <YearlyArticleSummary
        stats={buildStats([2026, 2025, 2024, 2023, 2022, 2021, 2020])}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /すべての年を表示/ }));

    expect(screen.getByText("2021年")).toBeInTheDocument();
    expect(screen.getByText("2020年")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "直近5年分だけ表示" }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("5年以下のときは折りたたみボタンを表示しない", () => {
    render(
      <YearlyArticleSummary
        stats={buildStats([2026, 2025, 2024, 2023, 2022])}
      />,
    );

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
