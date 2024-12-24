import React, { useEffect, useState } from "react";
import { CatCalorie as DomainCatCalorie } from "../../domains/Cat.ts";
import { Alert, Card, FloatingLabel } from "flowbite-react";
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
        <div className="grid grid-cols-2">
          <div className="flex flex-col grid-item col-span-1">
            <p>安静時のエネルギー要求量 RER</p>
            <p className="text-xl font-bold">
              {(results?.rer ?? 0).toFixed(2) ?? 0} kcal/day
            </p>
          </div>
          <div className="flex flex-col grid-item col-span-1">
            <p>1日当たりのエネルギー要求量 DER</p>
            <p className="text-xl font-bold">
              {(results?.der ?? 0).toFixed(2)} kcal/day
            </p>
          </div>
        </div>
        <Alert color="info">
          <p className="text-sm">RER = 70 × 体重^(3/4)</p>
          <p className="text-sm mt-2">DER = RER × 係数</p>
        </Alert>
      </Card>
    </div>
  );
};

export default CalorieCalculator;
