import React from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import type { ChartOptions, TooltipItem } from "chart.js";
import { Line } from "react-chartjs-2";
import type {
  SplatoonRule,
  SplatoonSeasonRecord,
} from "@/domains/hobbies/splatoon";
import { splatoonRuleLabels, splatoonRules } from "@/domains/hobbies/splatoon";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

type Props = {
  records: readonly SplatoonSeasonRecord[];
};

const chartColors: Record<SplatoonRule, string> = {
  area: "#0f766e",
  tower: "#ea580c",
  rainmaker: "#2563eb",
  clamBlitz: "#9333ea",
};

const SplatoonXpChartClient: React.FC<Props> = ({ records }) => {
  const data = {
    labels: records.map((record) => record.season),
    datasets: splatoonRules.map((rule) => ({
      label: splatoonRuleLabels[rule],
      data: records.map((record) => record.results[rule].xp),
      borderColor: chartColors[rule],
      backgroundColor: chartColors[rule],
      pointRadius: 3,
      pointHoverRadius: 5,
      tension: 0.2,
    })),
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"line">) =>
            `${context.dataset.label}: ${context.parsed.y?.toFixed(1) ?? "-"}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        title: {
          display: true,
          text: "XP",
        },
      },
    },
  };

  return (
    <section className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold text-primary-900">
        シーズンXP推移
      </h2>
      <div className="overflow-x-auto rounded-lg border border-secondary-100 bg-white p-4 shadow-sm">
        <div className="h-[400px] min-w-[720px]">
          <Line data={data} options={options} />
        </div>
      </div>
    </section>
  );
};

export default SplatoonXpChartClient;
