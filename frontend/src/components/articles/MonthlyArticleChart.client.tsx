import React from "react";
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
  if (stats.length === 0) {
    return null;
  }

  const labels = stats.map((stat) => stat.label);
  const data = {
    labels,
    datasets: [
      {
        label: "はてなブログ",
        data: stats.map((stat) => stat.totals.hatena),
        backgroundColor: "rgba(249, 115, 22, 0.7)",
        borderRadius: 6,
        stack: "total",
      },
      {
        label: "Zenn",
        data: stats.map((stat) => stat.totals.zenn),
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

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold text-primary-900 mb-4">
        月別推移（直近{stats.length}か月）
      </h2>
      <div className="rounded-lg border border-secondary-100 bg-white p-4 shadow-sm h-[360px]">
        <Bar data={data} options={options} />
      </div>
    </section>
  );
};

export default MonthlyArticleChartClient;
