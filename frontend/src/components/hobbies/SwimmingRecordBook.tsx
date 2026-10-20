import React from "react";
import SwimmingDistanceChart from "@/components/hobbies/SwimmingDistanceChart";
import type {
  SwimmingRaceResult,
  SwimmingRecord,
} from "@/domains/hobbies/swimming";
import {
  buildSwimmingSummary,
  formatSwimmingDate,
  formatSwimmingDistance,
} from "@/domains/hobbies/swimming";
import swimmingRecordsData from "@/data/swimmingRecords.json";

const records: readonly SwimmingRecord[] = swimmingRecordsData.records;
const raceResults: readonly SwimmingRaceResult[] =
  swimmingRecordsData.raceResults;

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
      {raceResults.length > 0 && (
        <section aria-labelledby="swimming-race-results">
          <h2
            className="mb-4 text-2xl font-semibold text-primary-900"
            id="swimming-race-results"
          >
            記録会の結果
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {raceResults.map((result) => (
              <li
                className="rounded-xl border border-primary-200 bg-primary-50 p-5 sm:p-6"
                key={result.id}
              >
                <h3 className="text-lg font-semibold text-primary-900">
                  {result.event}
                </h3>
                <p className="mt-3 text-4xl font-bold tabular-nums text-primary-900">
                  {result.timeSeconds}
                  <span className="ml-1 text-lg font-medium">秒</span>
                </p>
                {result.meetName && (
                  <p className="mt-3 text-sm text-secondary-600">
                    {result.meetName}
                  </p>
                )}
                {result.date && (
                  <time
                    className="mt-2 block text-sm text-secondary-600"
                    dateTime={result.date}
                  >
                    {formatSwimmingDate(result.date)}
                  </time>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

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
          <div className="rounded-xl border border-secondary-200 bg-white p-4 shadow-sm sm:p-5">
            <SwimmingDistanceChart yearly={summary.yearly} />
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
