import React from "react";
import type { SwimmingRecord } from "@/domains/hobbies/swimming";
import {
  buildSwimmingSummary,
  formatSwimmingDate,
  formatSwimmingDistance,
  formatSwimmingMonth,
} from "@/domains/hobbies/swimming";
import swimmingRecordsData from "@/data/swimmingRecords.json";

const records: readonly SwimmingRecord[] = swimmingRecordsData.records;

const SwimmingRecordBook: React.FC = () => {
  const summary = buildSwimmingSummary(records);
  const latestYear = summary.yearly[0];
  const latestMonth = latestYear?.months[0];
  const sortedRecords = [...records].sort((left, right) =>
    right.date.localeCompare(left.date),
  );
  const highlights = [
    { label: "累計距離", distanceMeters: summary.allTimeMeters },
    {
      label: latestYear ? `${latestYear.year}年の合計` : "年別合計",
      distanceMeters: latestYear?.distanceMeters ?? 0,
    },
    {
      label:
        latestYear && latestMonth
          ? `${latestYear.year}年${latestMonth.month}月`
          : "月別合計",
      distanceMeters: latestMonth?.distanceMeters ?? 0,
    },
  ];

  return (
    <div className="space-y-10">
      <section aria-label="距離のまとめ" className="grid gap-3 sm:grid-cols-3">
        {highlights.map((highlight) => (
          <div
            className="rounded-xl border border-primary-100 bg-primary-50 p-5"
            key={highlight.label}
          >
            <p className="text-sm font-medium text-primary-700">
              {highlight.label}
            </p>
            <p className="mt-2 text-2xl font-bold tabular-nums text-primary-900">
              {formatSwimmingDistance(highlight.distanceMeters)}
            </p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-primary-900">
          年・月ごとの合計
        </h2>
        {summary.yearly.length === 0 ? (
          <p className="rounded-xl border border-secondary-200 bg-white p-5 text-secondary-600">
            まだ水泳の記録がありません。
          </p>
        ) : (
          <div className="space-y-4">
            {summary.yearly.map((yearSummary) => (
              <article
                className="rounded-xl border border-secondary-200 bg-white p-5 shadow-sm"
                key={yearSummary.year}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-semibold text-primary-900">
                    {yearSummary.year}年
                  </h3>
                  <p className="font-semibold tabular-nums text-primary-700">
                    {formatSwimmingDistance(yearSummary.distanceMeters)}
                    <span className="ml-2 text-sm font-normal text-secondary-500">
                      {yearSummary.recordCount}回
                    </span>
                  </p>
                </div>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {yearSummary.months.map((monthSummary) => (
                    <li
                      className="flex items-center justify-between gap-3 rounded-lg bg-secondary-50 px-4 py-3"
                      key={monthSummary.month}
                    >
                      <span className="font-medium text-primary-900">
                        {formatSwimmingMonth(monthSummary.month)}
                        <span className="ml-2 text-xs font-normal text-secondary-500">
                          {monthSummary.recordCount}回
                        </span>
                      </span>
                      <span className="font-semibold tabular-nums text-secondary-700">
                        {formatSwimmingDistance(monthSummary.distanceMeters)}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-primary-900">
          泳いだ記録
        </h2>
        {sortedRecords.length === 0 ? (
          <p className="rounded-xl border border-secondary-200 bg-white p-5 text-secondary-600">
            まだ水泳の記録がありません。
          </p>
        ) : (
          <ol className="divide-y divide-secondary-100 rounded-xl border border-secondary-200 bg-white shadow-sm">
            {sortedRecords.map((record) => (
              <li className="p-4 sm:p-5" key={record.id}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <time
                    className="font-medium text-primary-900"
                    dateTime={record.date}
                  >
                    {formatSwimmingDate(record.date)}
                  </time>
                  <span className="font-semibold tabular-nums text-primary-700">
                    {formatSwimmingDistance(record.distanceMeters)}
                  </span>
                </div>
                {record.note && (
                  <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-secondary-600">
                    {record.note}
                  </p>
                )}
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
};

export default SwimmingRecordBook;
