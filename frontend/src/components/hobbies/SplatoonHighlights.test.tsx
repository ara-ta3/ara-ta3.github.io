import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SplatoonHighlights from "@/components/hobbies/SplatoonHighlights";
import { splatoonSeasonRecords } from "@/data/splatoon";
import {
  buildSplatoonXpSummary,
  getBestSplatoonRank,
} from "@/domains/hobbies/splatoon";

describe("SplatoonHighlights", () => {
  it("初期表示では通算を選択し、ルール別の歴代最高XPを表示する", () => {
    render(
      <SplatoonHighlights
        bestRank={getBestSplatoonRank(splatoonSeasonRecords)}
        xpSummary={buildSplatoonXpSummary(splatoonSeasonRecords)}
      />,
    );

    expect(screen.getByRole("button", { name: "通算" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "2025" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(
      screen.getAllByRole("button").map((button) => button.textContent),
    ).toEqual(["通算", "2022", "2023", "2024", "2025", "2026"]);
    expect(screen.getByText("2566.0")).toBeInTheDocument();
    expect(screen.getByText("2630.1")).toBeInTheDocument();
    expect(screen.getByText("2565.3")).toBeInTheDocument();
    expect(screen.getByText("2615.2")).toBeInTheDocument();
  });

  it("2025年を選択すると選択状態とルール別最高XPを切り替える", () => {
    render(
      <SplatoonHighlights
        bestRank={getBestSplatoonRank(splatoonSeasonRecords)}
        xpSummary={buildSplatoonXpSummary(splatoonSeasonRecords)}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "2025" }));

    expect(screen.getByRole("button", { name: "通算" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(screen.getByRole("button", { name: "2025" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByText("2447.2")).toBeInTheDocument();
    expect(screen.getByText("2471.6")).toBeInTheDocument();
    expect(screen.getByText("2452.5")).toBeInTheDocument();
    expect(screen.getByText("2564.1")).toBeInTheDocument();
  });
});
