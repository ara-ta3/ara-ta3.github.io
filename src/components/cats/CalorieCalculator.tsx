import React, { useEffect, useState } from "react";
import { CatCalorie as DomainCatCalorie } from "../../domains/Cat.ts";
import { Card, FloatingLabel } from "flowbite-react";
import { MultiplierForm } from "./calculator/Multiplier.tsx";

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
  return (
    <div className="grid grid-cols-3">
      <div className="flex flex-col grid-item col-span-1 p-2">
        <FloatingLabel
          variant="filled"
          label="体重"
          type="number"
          value={weight}
          step="any"
          onChange={(e) => {
            localStorage.setItem("cat.weight", e.target.value);
            setWeight(e.target.value);
          }}
        />
        <MultiplierForm setMultiplier={setMultiplier} current={multiplier} />
      </div>
      <Card className="flex flex-col grid-item col-span-2">
        <div className="p-4">
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
      </Card>
    </div>
  );
};

export default CalorieCalculator;
