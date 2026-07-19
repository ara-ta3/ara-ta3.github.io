import React, { useState } from "react";
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

type Metric = "xp" | "rank";

const RANK_CHART_LIMIT = 20000;

const chartColors: Record<SplatoonRule, string> = {
  area: "#0f766e",
  tower: "#ea580c",
  rainmaker: "#2563eb",
  clamBlitz: "#9333ea",
};

const SplatoonXpChartClient: React.FC<Props> = ({ records }) => {
  const [metric, setMetric] = useState<Metric>("xp");
  const isRank = metric === "rank";
  const data = {
    labels: records.map((record) => record.season),
    datasets: splatoonRules.map((rule) => ({
      label: splatoonRuleLabels[rule],
      data: records.map((record) => {
        const value = record.results[rule][metric];
        return isRank ? Math.min(value, RANK_CHART_LIMIT) : value;
      }),
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
          label: (context: TooltipItem<"line">) => {
            const value = context.parsed.y;
            if (value == null) {
              return `${context.dataset.label}: -`;
            }

            if (!isRank) {
              return `${context.dataset.label}: ${value.toFixed(1)}`;
            }

            const rule = splatoonRules[context.datasetIndex];
            const originalRank = records[context.dataIndex]?.results[rule].rank;
            return originalRank > RANK_CHART_LIMIT
              ? `${context.dataset.label}: 20,000位以下`
              : `${context.dataset.label}: ${value.toLocaleString("ja-JP")}位`;
          },
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
        reverse: isRank,
        max: isRank ? RANK_CHART_LIMIT : undefined,
        title: {
          display: true,
          text: isRank ? "順位" : "XP",
        },
        ticks: isRank
          ? {
              callback: (value) =>
                Number(value) === RANK_CHART_LIMIT
                  ? "20,000位以下"
                  : `${Number(value).toLocaleString("ja-JP")}位`,
            }
          : undefined,
      },
    },
  };

  return (
    <section className="mb-10">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold text-primary-900">
          シーズン推移
        </h2>
        <div className="flex gap-2">
          <button
            aria-pressed={metric === "xp"}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
              metric === "xp"
                ? "bg-primary-600 text-white"
                : "border border-secondary-200 bg-white text-secondary-700 hover:bg-secondary-50"
            }`}
            onClick={() => setMetric("xp")}
            type="button"
          >
            XP
          </button>
          <button
            aria-pressed={metric === "rank"}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
              metric === "rank"
                ? "bg-primary-600 text-white"
                : "border border-secondary-200 bg-white text-secondary-700 hover:bg-secondary-50"
            }`}
            onClick={() => setMetric("rank")}
            type="button"
          >
            順位
          </button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-secondary-100 bg-white p-4 shadow-sm">
        <div className="h-[400px] min-w-[720px]">
          <Line data={data} options={options} />
        </div>
      </div>
      {isRank && (
        <p className="mt-2 text-xs text-secondary-500">
          20,000位より後ろの順位は、20,000位として表示しています。
        </p>
      )}
    </section>
  );
};

export default SplatoonXpChartClient;
