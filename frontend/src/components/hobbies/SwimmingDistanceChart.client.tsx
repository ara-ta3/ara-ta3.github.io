import React from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  BarElement,
  BarController,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import type { ChartData, ChartDataset, ChartOptions } from "chart.js";
import { Chart } from "react-chartjs-2";
import type { SwimmingYearSummary } from "@/domains/hobbies/swimming";
import {
  formatSwimmingDistance,
  formatSwimmingMonth,
} from "@/domains/hobbies/swimming";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
);

type Props = {
  yearly: readonly SwimmingYearSummary[];
};

const months = Array.from({ length: 12 }, (_, index) => index + 1);
const colors = ["#0f766e", "#2563eb", "#ea580c", "#9333ea"];
const countColors = ["#ea580c", "#9333ea", "#0f766e", "#2563eb"];

const SwimmingDistanceChartClient: React.FC<Props> = ({ yearly }) => {
  const data: ChartData<"bar" | "line", (number | null)[]> = {
    labels: months.map(formatSwimmingMonth),
    datasets: [...yearly]
      .reverse()
      .flatMap<ChartDataset<"bar" | "line", (number | null)[]>>(
        (yearSummary, index) => [
          {
            type: "bar",
            label: `${yearSummary.year}年 距離`,
            data: months.map(
              (month) =>
                yearSummary.months.find((summary) => summary.month === month)
                  ?.distanceMeters ?? null,
            ),
            yAxisID: "y",
            order: 2,
            borderColor: colors[index % colors.length],
            backgroundColor: colors[index % colors.length],
            borderRadius: 4,
            maxBarThickness: 48,
          },
          {
            type: "line",
            label: `${yearSummary.year}年 回数`,
            data: months.map(
              (month) =>
                yearSummary.months.find((summary) => summary.month === month)
                  ?.recordCount ?? null,
            ),
            yAxisID: "yCount",
            order: 1,
            borderColor: countColors[index % countColors.length],
            backgroundColor: countColors[index % countColors.length],
            pointRadius: 4,
            pointHoverRadius: 6,
            spanGaps: false,
            tension: 0,
          },
        ],
      ),
  };
  const options: ChartOptions<"bar" | "line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (context) =>
            context.parsed.y == null
              ? `${context.dataset.label}: 記録なし`
              : context.dataset.yAxisID === "yCount"
                ? `${context.dataset.label}: ${context.parsed.y}回`
                : `${context.dataset.label}: ${formatSwimmingDistance(context.parsed.y)}`,
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: "月" },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          callback: (_, index) => months[index],
        },
      },
      y: {
        position: "left",
        beginAtZero: true,
        title: { display: true, text: "距離 (m)" },
        ticks: {
          precision: 0,
          callback: (value) => Number(value).toLocaleString("ja-JP"),
        },
      },
      yCount: {
        position: "right",
        beginAtZero: true,
        suggestedMax: 1,
        title: { display: true, text: "回数 (回)" },
        ticks: { precision: 0 },
        grid: { drawOnChartArea: false },
      },
    },
  };

  return (
    <div className="h-[340px] sm:h-[400px]">
      <Chart
        type="bar"
        aria-label="年別の月間水泳距離と回数。横軸は1月から12月、左軸は距離（m）、右軸は回数（回）"
        data={data}
        options={options}
        role="img"
      />
    </div>
  );
};

export default SwimmingDistanceChartClient;
