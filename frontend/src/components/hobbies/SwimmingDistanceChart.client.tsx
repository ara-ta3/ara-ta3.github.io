import React from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import type { ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";
import type { SwimmingYearSummary } from "@/domains/hobbies/swimming";
import {
  formatSwimmingDistance,
  formatSwimmingMonth,
} from "@/domains/hobbies/swimming";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type Props = {
  yearly: readonly SwimmingYearSummary[];
};

const months = Array.from({ length: 12 }, (_, index) => index + 1);
const colors = ["#0f766e", "#2563eb", "#ea580c", "#9333ea"];

const SwimmingDistanceChartClient: React.FC<Props> = ({ yearly }) => {
  const data = {
    labels: months.map(formatSwimmingMonth),
    datasets: [...yearly].reverse().map((yearSummary, index) => ({
      label: `${yearSummary.year}年`,
      data: months.map(
        (month) =>
          yearSummary.months.find((summary) => summary.month === month)
            ?.distanceMeters ?? null,
      ),
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length],
      borderRadius: 4,
      maxBarThickness: 48,
    })),
  };
  const options: ChartOptions<"bar"> = {
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
        beginAtZero: true,
        title: { display: true, text: "距離 (m)" },
        ticks: {
          precision: 0,
          callback: (value) => Number(value).toLocaleString("ja-JP"),
        },
      },
    },
  };

  return (
    <div className="h-[340px] sm:h-[400px]">
      <Bar
        aria-label="年別の月間水泳距離。横軸は1月から12月、縦軸は距離（m）"
        data={data}
        options={options}
        role="img"
      />
    </div>
  );
};

export default SwimmingDistanceChartClient;
