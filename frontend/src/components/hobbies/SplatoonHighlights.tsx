import React, { useState } from "react";
import type {
  SplatoonHighlight,
  SplatoonXpSummary,
} from "@/domains/hobbies/splatoon";
import { splatoonRuleLabels, splatoonRules } from "@/domains/hobbies/splatoon";

type Props = {
  xpSummary: SplatoonXpSummary;
  bestRank: SplatoonHighlight;
};

type SelectedPeriod = "all" | number;

const SplatoonHighlights: React.FC<Props> = ({ xpSummary, bestRank }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<SelectedPeriod>("all");
  const selectedHighestXp =
    selectedPeriod === "all"
      ? xpSummary.allTime
      : (xpSummary.yearly.find(({ year }) => year === selectedPeriod)
          ?.highestXpByRule ?? xpSummary.allTime);

  return (
    <div className="mb-10 space-y-6">
      <section>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-2xl font-semibold text-primary-900">
            ルール別最高XP
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              aria-pressed={selectedPeriod === "all"}
              className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                selectedPeriod === "all"
                  ? "bg-primary-600 text-white"
                  : "border border-secondary-200 bg-white text-secondary-700 hover:bg-secondary-50"
              }`}
              onClick={() => setSelectedPeriod("all")}
              type="button"
            >
              通算
            </button>
            {xpSummary.yearly.map(({ year }) => (
              <button
                aria-pressed={selectedPeriod === year}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                  selectedPeriod === year
                    ? "bg-primary-600 text-white"
                    : "border border-secondary-200 bg-white text-secondary-700 hover:bg-secondary-50"
                }`}
                key={year}
                onClick={() => setSelectedPeriod(year)}
                type="button"
              >
                {year}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {splatoonRules.map((rule) => (
            <div
              className="rounded-xl border border-primary-100 bg-primary-50 p-5"
              key={rule}
            >
              <p className="text-sm font-semibold text-primary-600">
                {splatoonRuleLabels[rule]}
              </p>
              <p className="mt-2 text-3xl font-bold text-primary-900">
                {selectedHighestXp[rule].value.toFixed(1)}
              </p>
              <p className="mt-2 text-sm text-secondary-600">
                {selectedHighestXp[rule].season}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-secondary-200 bg-secondary-50 p-5">
        <p className="text-sm font-semibold text-secondary-600">歴代最高順位</p>
        <p className="mt-2 text-3xl font-bold text-secondary-900">
          {bestRank.value.toLocaleString("ja-JP")}位
        </p>
        <p className="mt-2 text-sm text-secondary-600">
          {bestRank.season}・{splatoonRuleLabels[bestRank.rule]}
        </p>
      </section>
    </div>
  );
};

export default SplatoonHighlights;
