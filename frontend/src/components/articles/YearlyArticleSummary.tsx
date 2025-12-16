import React from "react";
import type { YearlyStat } from "@/domains/articles/types";

const SOURCE_META = {
  hatena: {
    label: "はてなブログ",
    badgeClass: "bg-orange-100 text-orange-800",
  },
  zenn: {
    label: "Zenn",
    badgeClass: "bg-blue-100 text-blue-800",
  },
} as const;

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
  if (stats.length === 0) {
    return null;
  }

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
              <th className="px-4 py-3 font-semibold">はてなブログ</th>
              <th className="px-4 py-3 font-semibold">Zenn</th>
              <th className="px-4 py-3 font-semibold text-right">合計</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat) => (
              <tr
                key={stat.year}
                className="border-t border-secondary-100 text-primary-900"
              >
                <td className="px-4 py-3 font-semibold">{stat.year}年</td>
                <td className="px-4 py-3">
                  <SourceBadge
                    label={SOURCE_META.hatena.label}
                    count={stat.totals.hatena}
                    badgeClass={SOURCE_META.hatena.badgeClass}
                  />
                </td>
                <td className="px-4 py-3">
                  <SourceBadge
                    label={SOURCE_META.zenn.label}
                    count={stat.totals.zenn}
                    badgeClass={SOURCE_META.zenn.badgeClass}
                  />
                </td>
                <td className="px-4 py-3 text-right font-semibold">
                  {stat.sum}本
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default YearlyArticleSummary;
