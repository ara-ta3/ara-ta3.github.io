import React, { useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { MonthlyStat } from "@/utils/articleStats";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type Props = {
  stats: MonthlyStat[];
};

const MonthlyArticleChartClient: React.FC<Props> = ({ stats }) => {
  const [startIndex, setStartIndex] = useState(() =>
    Math.max(stats.length - 12, 0),
  );
  const [endIndex, setEndIndex] = useState(() => Math.max(stats.length - 1, 0));

  const clampIndex = (index: number) => {
    if (stats.length === 0) return 0;
    return Math.min(Math.max(index, 0), stats.length - 1);
  };

  const clampedStart = clampIndex(startIndex);
  const clampedEnd = Math.max(clampedStart, clampIndex(endIndex));

  const selectedStats = useMemo(
    () => stats.slice(clampedStart, clampedEnd + 1),
    [stats, clampedStart, clampedEnd],
  );

  const handleStartChange = (value: number) => {
    setStartIndex(value);
    setEndIndex((prev) => Math.max(prev, value));
  };

  const handleEndChange = (value: number) => {
    setEndIndex(value);
    setStartIndex((prev) => Math.min(prev, value));
  };

  if (stats.length === 0) {
    return null;
  }

  const labels = selectedStats.map((stat) => stat.label);
  const data = {
    labels,
    datasets: [
      {
        label: "はてなブログ",
        data: selectedStats.map((stat) => stat.totals.hatena),
        backgroundColor: "rgba(249, 115, 22, 0.7)",
        borderRadius: 6,
        stack: "total",
      },
      {
        label: "Zenn",
        data: selectedStats.map((stat) => stat.totals.zenn),
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        borderRadius: 6,
        stack: "total",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: { dataset: { label: string }; raw: number }) =>
            `${context.dataset.label}: ${context.raw}本`,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
    },
  };

  const startLabel = stats[clampedStart]?.label ?? "";
  const endLabel = stats[clampedEnd]?.label ?? "";

  return (
    <section className="mb-10">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-primary-900">
            月別推移（{selectedStats.length}か月）
          </h2>
          {startLabel && endLabel && (
            <p className="text-sm text-primary-500">
              {startLabel} 〜 {endLabel} を表示中
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <label className="flex flex-col gap-1 text-sm text-primary-700">
            <span className="text-xs font-semibold text-primary-500">
              開始月
            </span>
            <select
              value={clampedStart}
              onChange={(e) => handleStartChange(Number(e.target.value))}
              className="rounded-lg border border-secondary-200 bg-white px-3 py-2 text-sm text-primary-900 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
            >
              {stats.map((stat, index) => (
                <option key={stat.label} value={index}>
                  {stat.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm text-primary-700">
            <span className="text-xs font-semibold text-primary-500">
              終了月
            </span>
            <select
              value={clampedEnd}
              onChange={(e) => handleEndChange(Number(e.target.value))}
              className="rounded-lg border border-secondary-200 bg-white px-3 py-2 text-sm text-primary-900 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
            >
              {stats.map((stat, index) => (
                <option key={stat.label} value={index}>
                  {stat.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="rounded-lg border border-secondary-100 bg-white p-4 shadow-sm h-[360px]">
        <Bar data={data} options={options} />
      </div>
    </section>
  );
};

export default MonthlyArticleChartClient;
