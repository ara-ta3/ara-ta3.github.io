import React, { useState } from "react";
import { Table } from "flowbite-react";

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
  date.setMonth(date.getMonth() - (11 - i));
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
});

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

const ElectricityComparison: React.FC = () => {
  const [usage, setUsage] = useState<number[]>(Array(12).fill(0));
  const [sortKey, setSortKey] = useState<"none" | "average" | "median" | "sum">(
    "none",
  );

  const handleChange = (index: number, value: string) => {
    const updated = [...usage];
    updated[index] = Number(value);
    setUsage(updated);
  };

  const sortedCompanies = [...companies].sort((a, b) => {
    if (sortKey === "none") return 0;
    const aStats = calcStats(usage, a)[sortKey];
    const bStats = calcStats(usage, b)[sortKey];
    return bStats - aStats;
  });

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-primary-500">
        電気代比較ツール
      </h1>
      <div className="mb-4 text-right">
        <label className="mr-2" htmlFor="sort">
          ソート
        </label>
        <select
          id="sort"
          value={sortKey}
          onChange={(e) =>
            setSortKey(e.target.value as "none" | "average" | "median" | "sum")
          }
          className="border rounded p-1"
        >
          <option value="none">--</option>
          <option value="average">平均</option>
          <option value="median">中央値</option>
          <option value="sum">合計</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>会社</Table.HeadCell>
            {months.map((m) => (
              <Table.HeadCell key={m}>{m}</Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white">
              <Table.Cell className="font-medium text-gray-900">
                使用量(kWh)
              </Table.Cell>
              {usage.map((u, idx) => (
                <Table.Cell key={idx}>
                  <input
                    type="number"
                    min="0"
                    value={u}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    className="w-20 border rounded p-1"
                  />
                </Table.Cell>
              ))}
            </Table.Row>
            {sortedCompanies.map((c) => {
              const stats = calcStats(usage, c);
              return (
                <Table.Row key={c.name} className="bg-white">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                    {`${c.name} (平均: ${Math.round(stats.average).toLocaleString()}円 / 中央: ${Math.round(stats.median).toLocaleString()}円 / 合計: ${Math.round(stats.sum).toLocaleString()}円)`}
                  </Table.Cell>
                  {usage.map((u, idx) => {
                    const result = calcCharge(u, c);
                    return (
                      <Table.Cell key={idx} className="align-top">
                        <div>{Math.round(result.total).toLocaleString()}円</div>
                        <div className="text-xs text-gray-600">
                          基本+段階:{" "}
                          {Math.round(result.basicTier).toLocaleString()}円
                          <br />
                          燃料費調整: {Math.round(result.fuel).toLocaleString()}
                          円<br />
                          再エネ賦課金:{" "}
                          {Math.round(result.renewable).toLocaleString()}円
                          <br />
                          容量拠出金:{" "}
                          {Math.round(result.capacity).toLocaleString()}円
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
