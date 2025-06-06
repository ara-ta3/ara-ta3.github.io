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

  const handleChange = (index: number, value: string) => {
    const updated = [...usage];
    updated[index] = Number(value);
    setUsage(updated);
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-primary-500">
        電気代比較ツール
      </h1>
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
            {companies.map((c) => (
              <Table.Row key={c.name} className="bg-white">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                  {c.name}
                </Table.Cell>
                {usage.map((u, idx) => {
                  const result = calcCharge(u, c);
                  return (
                    <Table.Cell key={idx} className="align-top">
                      <div>{Math.round(result.total).toLocaleString()}円</div>
                      <div className="text-xs text-gray-600">
                        基本+段階:{" "}
                        {Math.round(result.basicTier).toLocaleString()}円<br />
                        燃料費調整: {Math.round(result.fuel).toLocaleString()}円
                        <br />
                        再エネ賦課金:{" "}
                        {Math.round(result.renewable).toLocaleString()}円<br />
                        容量拠出金:{" "}
                        {Math.round(result.capacity).toLocaleString()}円
                      </div>
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </section>
  );
};

export default ElectricityComparison;
