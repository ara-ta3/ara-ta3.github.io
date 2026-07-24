import React, { useState } from "react";
import { ARTICLE_SOURCES, SOURCE_META } from "@/domains/articles/constants";
import type { YearlyStat } from "@/domains/articles/types";

const DEFAULT_VISIBLE_YEARS = 5;

type Props = {
  stats: YearlyStat[];
};

const SourceBadge: React.FC<{
  label: string;
  count: number;
  badgeClass: string;
}> = ({ label, count, badgeClass }) => (
  <div className="flex items-center gap-2">
    <span className={`px-2 py-1 rounded text-xs font-semibold ${badgeClass}`}>
      {label}
    </span>
    <span className="text-primary-700 font-medium">{count}本</span>
  </div>
);

const YearlyArticleSummary: React.FC<Props> = ({ stats }) => {
  const [expanded, setExpanded] = useState(false);

  if (stats.length === 0) {
    return null;
  }

  const hasMore = stats.length > DEFAULT_VISIBLE_YEARS;
  const visibleStats =
    expanded || !hasMore ? stats : stats.slice(0, DEFAULT_VISIBLE_YEARS);

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold text-primary-900 mb-4">
        年間サマリー
      </h2>
      <div className="overflow-x-auto rounded-lg border border-secondary-100 bg-white shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-secondary-50 text-primary-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3 font-semibold">年</th>
              {ARTICLE_SOURCES.map((source) => (
                <th key={source} className="px-4 py-3 font-semibold">
                  {SOURCE_META[source].label}
                </th>
              ))}
              <th className="px-4 py-3 font-semibold text-right">合計</th>
            </tr>
          </thead>
          <tbody>
            {visibleStats.map((stat) => (
              <tr
                key={stat.year}
                className="border-t border-secondary-100 text-primary-900"
              >
                <td className="px-4 py-3 font-semibold">{stat.year}年</td>
                {ARTICLE_SOURCES.map((source) => (
                  <td key={source} className="px-4 py-3">
                    <SourceBadge
                      label={SOURCE_META[source].label}
                      count={stat.totals[source]}
                      badgeClass={SOURCE_META[source].badgeClass}
                    />
                  </td>
                ))}
                <td className="px-4 py-3 text-right font-semibold">
                  {stat.sum}本
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hasMore && (
        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            className="text-sm font-medium text-secondary-600 hover:text-secondary-700"
          >
            {expanded
              ? "直近5年分だけ表示"
              : `すべての年を表示（残り${stats.length - DEFAULT_VISIBLE_YEARS}年分）`}
          </button>
        </div>
      )}
    </section>
  );
};

export default YearlyArticleSummary;
