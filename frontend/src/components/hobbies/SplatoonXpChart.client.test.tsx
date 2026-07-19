import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SplatoonXpChartClient from "@/components/hobbies/SplatoonXpChart.client";
import type { SplatoonSeasonRecord } from "@/domains/hobbies/splatoon";

vi.mock("chart.js", () => ({
  CategoryScale: {},
  Chart: { register: vi.fn() },
  Legend: {},
  LinearScale: {},
  LineElement: {},
  PointElement: {},
  Tooltip: {},
}));

vi.mock("react-chartjs-2", () => ({
  Line: ({ data }: { data: { datasets: { data: number[] }[] } }) => (
    <div data-testid="chart-values">
      {data.datasets.map((dataset) => dataset.data.join(",")).join("|")}
    </div>
  ),
}));

const records: readonly SplatoonSeasonRecord[] = [
  {
    season: "2022冬 Chill Season",
    results: {
      area: { xp: 2379.6, rank: 23560 },
      tower: { xp: 2432.8, rank: 17973 },
      rainmaker: { xp: 2565.3, rank: 5897 },
      clamBlitz: { xp: 2447.6, rank: 13536 },
    },
  },
];

describe("SplatoonXpChartClient", () => {
  beforeEach(() => {
    render(<SplatoonXpChartClient records={records} />);
  });

  it("初期表示ではXPを選択し、4ルールのXPを表示する", () => {
    expect(screen.getByRole("button", { name: "XP" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "順位" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(screen.getByTestId("chart-values")).toHaveTextContent(
      "2379.6|2432.8|2565.3|2447.6",
    );
  });

  it("順位を選択すると選択状態と4ルールの表示値を切り替える", () => {
    fireEvent.click(screen.getByRole("button", { name: "順位" }));

    expect(screen.getByRole("button", { name: "XP" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(screen.getByRole("button", { name: "順位" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByTestId("chart-values")).toHaveTextContent(
      "20000|17973|5897|13536",
    );
    expect(
      screen.getByText(
        "20,000位より後ろの順位は、20,000位として表示しています。",
      ),
    ).toBeInTheDocument();
  });
});
