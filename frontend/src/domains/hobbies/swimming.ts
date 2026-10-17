export type SwimmingRecord = {
  id: string;
  date: string;
  distanceMeters: number;
  note: string;
};

export type SwimmingMonthSummary = {
  year: number;
  month: number;
  distanceMeters: number;
  recordCount: number;
};

export type SwimmingYearSummary = {
  year: number;
  distanceMeters: number;
  recordCount: number;
  months: SwimmingMonthSummary[];
};

export type SwimmingSummary = {
  allTimeMeters: number;
  yearly: SwimmingYearSummary[];
};

const getYearMonth = (date: string): { year: number; month: number } => ({
  year: Number(date.slice(0, 4)),
  month: Number(date.slice(5, 7)),
});

export const buildSwimmingSummary = (
  records: readonly SwimmingRecord[],
): SwimmingSummary => {
  const monthlySummaries = new Map<string, SwimmingMonthSummary>();

  records.forEach((record) => {
    const { year, month } = getYearMonth(record.date);
    const key = `${year}-${month}`;
    const summary = monthlySummaries.get(key) ?? {
      year,
      month,
      distanceMeters: 0,
      recordCount: 0,
    };

    summary.distanceMeters += record.distanceMeters;
    summary.recordCount += 1;
    monthlySummaries.set(key, summary);
  });

  const yearlySummaries = new Map<number, SwimmingYearSummary>();
  monthlySummaries.forEach((monthSummary) => {
    const yearSummary = yearlySummaries.get(monthSummary.year) ?? {
      year: monthSummary.year,
      distanceMeters: 0,
      recordCount: 0,
      months: [],
    };

    yearSummary.distanceMeters += monthSummary.distanceMeters;
    yearSummary.recordCount += monthSummary.recordCount;
    yearSummary.months.push(monthSummary);
    yearlySummaries.set(monthSummary.year, yearSummary);
  });

  return {
    allTimeMeters: records.reduce(
      (total, record) => total + record.distanceMeters,
      0,
    ),
    yearly: [...yearlySummaries.values()]
      .map((yearSummary) => ({
        ...yearSummary,
        months: [...yearSummary.months].sort(
          (left, right) => right.month - left.month,
        ),
      }))
      .sort((left, right) => right.year - left.year),
  };
};

export const formatSwimmingDistance = (distanceMeters: number): string =>
  `${distanceMeters.toLocaleString("ja-JP")} m`;

export const formatSwimmingDate = (date: string): string =>
  new Date(`${date}T00:00:00`).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });

export const formatSwimmingMonth = (month: number): string => `${month}月`;
