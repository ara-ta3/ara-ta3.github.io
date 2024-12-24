import React, { useEffect, useState } from "react";
import { CatCalorie as DomainCatCalorie } from "../../domains/Cat.ts";

const multipliers = [
  {
    name: "非活動的・肥満傾向",
    value: 1,
  },
  {
    name: "減量が必要",
    value: 0.8,
  },
  {
    name: "少し増量が必要",
    value: 1.2,
  },
  {
    name: "増量が必要",
    value: 1.4,
  },
];

const CalorieCalculator: React.FC<{
  setResults: (
    results: { rer: number; simpleRER: number; der: number } | null
  ) => void;
  results: { rer: number; simpleRER: number; der: number } | null;
}> = ({ setResults, results }) => {
  const [weight, setWeight] = useState<string>("");
  const [multiplier, setMultiplier] = useState<number>(1);
  useEffect(() => {
    const s = localStorage.getItem("cat.weight");
    if (s) {
      setWeight(s);
    }
    const m = parseFloat(localStorage.getItem("cat.multiplier") ?? "");
    if (!isNaN(m)) {
      setMultiplier(m);
    }
  }, []);

  useEffect(() => {
    const parsedWeight = parseFloat(weight);
    if (!isNaN(parsedWeight) && parsedWeight > 0 && multiplier > 0) {
      const r = new DomainCatCalorie(parsedWeight);
      const rer = r.calculateRER();
      const simpleRER = r.calculateSimpleRER();
      const der = r.calculateDER(multiplier);
      setResults({ rer, simpleRER, der });
    } else {
      setResults(null);
    }
  }, [weight, multiplier, setResults]);
  const ms = multipliers.map((m) => {
    return (
      <div key={m.name}>
        <label>
          <input
            className="mx-2"
            type="radio"
            value={m.value}
            checked={m.value === multiplier}
            onChange={(e) => {
              localStorage.setItem("cat.multiplier", e.target.value);
              setMultiplier(Number(e.target.value));
            }}
          />
          {m.name}({m.value})
        </label>
      </div>
    );
  });
  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col items-left justify-left">
        <div className="p-4 shadow rounded">
          <dl className="divide-y divide-gray-200">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">体重</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                <input
                  type="number"
                  value={weight}
                  step="any"
                  onChange={(e) => {
                    localStorage.setItem("cat.weight", e.target.value);
                    setWeight(e.target.value);
                  }}
                  className="w-full border rounded p-2 mt-1"
                />
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">係数</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                <div>{ms}</div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="p-4 shadow rounded">
          <dt className="text-sm/6 font-medium text-gray-900">
            <p>安静時のエネルギー要求量 RER</p>
          </dt>
          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <p>
              {(results?.rer ?? 0).toFixed(2) ?? 0} kcal/day (= 70 × 体重^(3/4))
            </p>
            <p className="text-xs text-gray-400">
              簡易式の場合 {(results?.simpleRER ?? 0).toFixed(2) ?? 0} kcal/day
              (= 体重 × 30 + 70) 簡易式は計算結果のみで後の計算には使いません
            </p>
          </dd>
          <dt className="mt-4 text-sm/6 font-medium text-gray-900">
            1日当たりのエネルギー要求量 DER
          </dt>
          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            {(results?.der ?? 0).toFixed(2)} kcal/day (= RER × 係数)
          </dd>
        </div>
      </div>
    </div>
  );
};

export default CalorieCalculator;
