import React from "react";
import type { SplatoonSeasonRecord } from "@/domains/hobbies/splatoon";
import { splatoonRuleLabels, splatoonRules } from "@/domains/hobbies/splatoon";

type Props = {
  records: readonly SplatoonSeasonRecord[];
};

const SplatoonRecordsTable: React.FC<Props> = ({ records }) => {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold text-primary-900">
        シーズン別記録
      </h2>
      <div className="overflow-x-auto rounded-lg border border-secondary-200">
        <table className="min-w-[1080px] border-collapse bg-white text-sm">
          <thead>
            <tr className="bg-primary-50 text-primary-900">
              <th
                className="border-b border-r border-secondary-200 px-4 py-3 text-left"
                rowSpan={2}
              >
                シーズン名
              </th>
              {splatoonRules.map((rule) => (
                <th
                  className="border-b border-r border-secondary-200 px-4 py-3 text-center last:border-r-0"
                  colSpan={2}
                  key={rule}
                >
                  {splatoonRuleLabels[rule]}
                </th>
              ))}
            </tr>
            <tr className="bg-primary-50 text-primary-900">
              {splatoonRules.flatMap((rule) => [
                <th
                  className="border-b border-r border-secondary-200 px-4 py-2 text-right"
                  key={`${rule}-xp`}
                >
                  XP
                </th>,
                <th
                  className="border-b border-r border-secondary-200 px-4 py-2 text-right last:border-r-0"
                  key={`${rule}-rank`}
                >
                  順位
                </th>,
              ])}
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr
                className="border-b border-secondary-100 text-secondary-700 last:border-b-0 hover:bg-secondary-50"
                key={record.season}
              >
                <th className="whitespace-nowrap border-r border-secondary-200 px-4 py-3 text-left font-medium text-secondary-900">
                  {record.season}
                </th>
                {splatoonRules.flatMap((rule) => [
                  <td
                    className="border-r border-secondary-100 px-4 py-3 text-right tabular-nums"
                    key={`${rule}-xp`}
                  >
                    {record.results[rule].xp.toFixed(1)}
                  </td>,
                  <td
                    className="border-r border-secondary-200 px-4 py-3 text-right tabular-nums last:border-r-0"
                    key={`${rule}-rank`}
                  >
                    {record.results[rule].rank}
                  </td>,
                ])}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-secondary-500">
        表は横にスクロールできます。
      </p>
    </section>
  );
};

export default SplatoonRecordsTable;
