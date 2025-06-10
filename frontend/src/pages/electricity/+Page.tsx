import React, { useState } from "react";
import { Table } from "flowbite-react";
import Breadcrumb from "@/components/Breadcrumb";
import useLocalStorage from "@/hooks/useLocalStorage";

interface ChargeBreakdown {
  basicTier: number;
  fuel: number;
  renewable: number;
  capacity: number;
  total: number;
}

interface CompanyParam {
  name: string;
  base: number;
  m1: number;
  m2: number;
  m3: number;
  fuelRate: number;
  capacity: number;
  firstLimit?: number;
  secondLimit?: number;
}

const renewableRate = 3; // yen per kWh, common for all companies

const months = Array.from({ length: 12 }, (_, i) => {
  const date = new Date();
  // 今月ではなく先月から12か月分を表示する
  date.setMonth(date.getMonth() - (i + 1));
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
});

const STORAGE_USAGE_KEY = "electricityUsage";

const calcBasicTier = (
  kWh: number,
  base: number,
  m1: number,
  m2: number,
  m3: number,
  firstLimit = 120,
  secondLimit = 300,
): number => {
  const first = Math.min(kWh, firstLimit) * m1;
  const second =
    kWh > firstLimit
      ? Math.min(kWh - firstLimit, secondLimit - firstLimit) * m2
      : 0;
  const third = kWh > secondLimit ? (kWh - secondLimit) * m3 : 0;
  return Math.floor(base + first + second + third);
};

const calcCharge = (kWh: number, p: CompanyParam): ChargeBreakdown => {
  const basicTier = calcBasicTier(
    kWh,
    p.base,
    p.m1,
    p.m2,
    p.m3,
    p.firstLimit,
    p.secondLimit,
  );
  const fuel = kWh * p.fuelRate;
  const renewable = kWh * renewableRate;
  const capacity = p.capacity;
  const total = basicTier + fuel + renewable + capacity;
  return { basicTier, fuel, renewable, capacity, total };
};

const calcMonthlyTotals = (usage: number[], p: CompanyParam): number[] =>
  usage.map((u) => calcCharge(u, p).total);

const calcStats = (
  usage: number[],
  p: CompanyParam,
): { average: number; median: number; sum: number } => {
  const totals = calcMonthlyTotals(usage, p);
  const sum = totals.reduce((acc, v) => acc + v, 0);
  const average = totals.length ? sum / totals.length : 0;
  const sorted = [...totals].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median =
    sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
  return { average, median, sum };
};

const companies: CompanyParam[] = [
  {
    name: "A社",
    base: 1000,
    m1: 19,
    m2: 25,
    m3: 30,
    fuelRate: 2,
    capacity: 200,
  },
  {
    name: "B社",
    base: 1100,
    m1: 18,
    m2: 23,
    m3: 27,
    fuelRate: 1.8,
    capacity: 250,
  },
];

type UsageMap = Record<string, number>;

const ElectricityComparison: React.FC = () => {
  const [usage, setUsage] = useLocalStorage<UsageMap>(STORAGE_USAGE_KEY, {});
  const [sort, setSort] = useState<{
    key: "average" | "median" | "sum" | null;
    order: "asc" | "desc";
  }>({ key: null, order: "desc" });
  const usageArray = months.map((m) => usage[m] ?? 0);

  const handleChange = (index: number, value: string) => {
    const key = months[index];
    const numeric = parseFloat(value);
    setUsage((prev) => ({
      ...prev,
      [key]: Number.isNaN(numeric) ? 0 : numeric,
    }));
  };

  const sortedCompanies = [...companies].sort((a, b) => {
    if (!sort.key) return 0;
    const aStats = calcStats(usageArray, a)[sort.key];
    const bStats = calcStats(usageArray, b)[sort.key];
    return sort.order === "desc" ? bStats - aStats : aStats - bStats;
  });

  return (
    <section className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { name: "電気代比較ツール", url: "/electricity/", isLast: true },
        ]}
      />
      <h1 className="text-3xl font-bold mb-4 text-center text-primary-500">
        電気代比較ツール
      </h1>
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>会社</Table.HeadCell>
            <Table.HeadCell>
              <button
                type="button"
                onClick={() =>
                  setSort((prev) => ({
                    key: "average",
                    order:
                      prev.key === "average" && prev.order === "desc"
                        ? "asc"
                        : "desc",
                  }))
                }
              >
                平均
                {sort.key === "average"
                  ? sort.order === "desc"
                    ? "▼"
                    : "▲"
                  : ""}
              </button>
            </Table.HeadCell>
            <Table.HeadCell>
              <button
                type="button"
                onClick={() =>
                  setSort((prev) => ({
                    key: "median",
                    order:
                      prev.key === "median" && prev.order === "desc"
                        ? "asc"
                        : "desc",
                  }))
                }
              >
                中央値
                {sort.key === "median"
                  ? sort.order === "desc"
                    ? "▼"
                    : "▲"
                  : ""}
              </button>
            </Table.HeadCell>
            <Table.HeadCell>
              <button
                type="button"
                onClick={() =>
                  setSort((prev) => ({
                    key: "sum",
                    order:
                      prev.key === "sum" && prev.order === "desc"
                        ? "asc"
                        : "desc",
                  }))
                }
              >
                合計
                {sort.key === "sum" ? (sort.order === "desc" ? "▼" : "▲") : ""}
              </button>
            </Table.HeadCell>
            {months.map((m) => (
              <Table.HeadCell key={m}>{m}</Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white">
              <Table.Cell className="font-medium text-gray-900">
                使用量(kWh)
              </Table.Cell>
              <Table.Cell />
              <Table.Cell />
              <Table.Cell />
              {months.map((m, idx) => (
                <Table.Cell key={m}>
                  <input
                    type="text"
                    value={usage[m] ? String(usage[m]) : ""}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    className="w-20 border rounded p-1"
                  />
                </Table.Cell>
              ))}
            </Table.Row>
            {sortedCompanies.map((c) => {
              const stats = calcStats(usageArray, c);
              return (
                <Table.Row key={c.name} className="bg-white">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                    {c.name}
                  </Table.Cell>
                  <Table.Cell>
                    {Math.round(stats.average).toLocaleString()}円
                  </Table.Cell>
                  <Table.Cell>
                    {Math.round(stats.median).toLocaleString()}円
                  </Table.Cell>
                  <Table.Cell>
                    {Math.round(stats.sum).toLocaleString()}円
                  </Table.Cell>
                  {usageArray.map((u, idx) => {
                    const result = calcCharge(u, c);
                    return (
                      <Table.Cell key={idx} className="align-top">
                        <div>{Math.round(result.total).toLocaleString()}円</div>
                        <div className="text-xs text-gray-600 space-y-1">
                          <div>
                            基本+段階:
                            {Math.round(result.basicTier).toLocaleString()}円 /
                            燃料費調整:
                            {Math.round(result.fuel).toLocaleString()}円
                          </div>
                          <div>
                            再エネ賦課金:
                            {Math.round(result.renewable).toLocaleString()}円 /
                            容量拠出金:
                            {Math.round(result.capacity).toLocaleString()}円
                          </div>
                        </div>
                      </Table.Cell>
                    );
                  })}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </section>
  );
};

export default ElectricityComparison;
