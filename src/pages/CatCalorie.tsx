import React, { useEffect, useState } from "react";
import { CatCalorie as DomainCatCalorie } from "../domains/Cat.ts";

const CalculatorForm: React.FC<
  { setResults: (results: { rer: number; der: number } | null) => void }
> = ({ setResults }) => {
  const [weight, setWeight] = useState<string>("");
  const [multiplier, setMultiplier] = useState<number>(1);

  useEffect(() => {
    const parsedWeight = parseFloat(weight);
    if (!isNaN(parsedWeight) && parsedWeight > 0 && multiplier > 0) {
      const r = new DomainCatCalorie(parsedWeight);
      const rer = r.calculateRER();
      const der = r.calculateDER(multiplier);
      setResults({ rer, der });
    } else {
      setResults(null);
    }
  }, [weight, multiplier, setResults]);

  return (
    <div className="p-4 bg-white shadow rounded">
      <label className="block mb-2">
        体重 (kg):
        <input
          type="number"
          value={weight}
          step="any"
          onChange={(e) => setWeight(Number(e.target.value))}
          className="w-full border rounded p-2 mt-1"
        />
      </label>
      <label className="block mb-4">
        活動レベル:
        <select
          value={multiplier}
          onChange={(e) => setMultiplier(Number(e.target.value))}
          className="w-full border rounded p-2 mt-1"
        >
          <option value={1}>維持</option>
          <option value={1.2}>活発</option>
          <option value={1.4}>成長</option>
        </select>
      </label>
    </div>
  );
};

const Results: React.FC<{ results: { rer: number; der: number } | null }> = (
  { results },
) => {
  if (!results) return null;

  return (
    <div className="mt-4 p-4 bg-green-100 rounded">
      <h2 className="text-lg font-bold">Results</h2>
      <p>RER: {results.rer.toFixed(2)} kcal/day</p>
      <p>DER: {results.der.toFixed(2)} kcal/day</p>
    </div>
  );
};

const CatCalorie: React.FC = () => {
  const [results, setResults] = useState<{ rer: number; der: number } | null>(
    null,
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">猫のカロリー計算</h1>
      <CalculatorForm setResults={setResults} />
      <Results results={results} />
    </div>
  );
};

export default CatCalorie;
