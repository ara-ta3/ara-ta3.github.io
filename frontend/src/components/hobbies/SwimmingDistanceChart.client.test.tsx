import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SwimmingDistanceChartClient from "@/components/hobbies/SwimmingDistanceChart.client";

const { renderChart } = vi.hoisted(() => ({ renderChart: vi.fn() }));

vi.mock("react-chartjs-2", () => ({
  Chart: (props: unknown) => {
    renderChart(props);
    return <canvas />;
  },
}));

describe("SwimmingDistanceChartClient", () => {
  it("1〜12月を順に並べ、記録のない月と距離0の月を区別する", () => {
    render(
      <SwimmingDistanceChartClient
        yearly={[
          {
            year: 2026,
            distanceMeters: 2500,
            recordCount: 2,
            months: [
              { year: 2026, month: 3, distanceMeters: 2500, recordCount: 1 },
              { year: 2026, month: 1, distanceMeters: 0, recordCount: 1 },
            ],
          },
        ]}
      />,
    );

    expect(renderChart).toHaveBeenLastCalledWith(
      expect.objectContaining({
        data: {
          labels: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          datasets: [
            expect.objectContaining({
              type: "bar",
              yAxisID: "y",
              label: "2026年 距離",
              data: [
                0,
                null,
                2500,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
              ],
            }),
            expect.objectContaining({
              type: "line",
              label: "2026年 回数",
              yAxisID: "yCount",
              data: [
                1,
                null,
                1,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
              ],
              spanGaps: false,
            }),
          ],
        },
        options: expect.objectContaining({
          scales: expect.objectContaining({
            y: expect.objectContaining({
              position: "left",
              beginAtZero: true,
              title: { display: true, text: "距離 (m)" },
            }),
            yCount: expect.objectContaining({
              position: "right",
              beginAtZero: true,
              title: { display: true, text: "回数 (回)" },
              ticks: { precision: 0 },
            }),
          }),
        }),
      }),
    );
  });

  it("年ごとの距離と回数を古い年から別々の系列で表示する", () => {
    render(
      <SwimmingDistanceChartClient
        yearly={[
          {
            year: 2026,
            distanceMeters: 2000,
            recordCount: 1,
            months: [
              { year: 2026, month: 5, distanceMeters: 2000, recordCount: 1 },
            ],
          },
          {
            year: 2025,
            distanceMeters: 1000,
            recordCount: 1,
            months: [
              { year: 2025, month: 5, distanceMeters: 1000, recordCount: 1 },
            ],
          },
        ]}
      />,
    );

    expect(renderChart).toHaveBeenLastCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          datasets: [
            expect.objectContaining({
              type: "bar",
              yAxisID: "y",
              label: "2025年 距離",
              data: [
                null,
                null,
                null,
                null,
                1000,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
              ],
            }),
            expect.objectContaining({
              type: "line",
              label: "2025年 回数",
              yAxisID: "yCount",
              data: [
                null,
                null,
                null,
                null,
                1,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
              ],
            }),
            expect.objectContaining({
              type: "bar",
              yAxisID: "y",
              label: "2026年 距離",
              data: [
                null,
                null,
                null,
                null,
                2000,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
              ],
            }),
            expect.objectContaining({
              type: "line",
              label: "2026年 回数",
              yAxisID: "yCount",
              data: [
                null,
                null,
                null,
                null,
                1,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
              ],
            }),
          ],
        }),
      }),
    );
  });
});
