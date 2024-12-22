import React, { useEffect, useState } from "react";
import { CatCalorie as DomainCatCalorie } from "../domains/Cat.ts";
import Header from "../components/Header.tsx";

const CalculatorForm: React.FC<
  {
    setResults: (results: { rer: number; der: number } | null) => void;
    results: { rer: number; der: number } | null;
  }
> = ({ setResults, results }) => {
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

  const multipliers = [{
    name: "維持",
    value: 1,
  }, {
    name: "活発",
    value: 1.2,
  }, {
    name: "成長",
    value: 1.4,
  }].map((m) => {
    return <option value={m.value}>{`${m.name}(係数: ${m.value})`}</option>;
  });
  return (
    <div className="p-4 shadow rounded">
      <dl className="divide-y divide-gray-200">
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm/6 font-medium text-gray-900">
            体重
          </dt>
          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <input
              type="number"
              value={weight}
              step="any"
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border rounded p-2 mt-1"
            />
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm/6 font-medium text-gray-900">
            活動レベル
          </dt>
          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <select
              value={multiplier}
              onChange={(e) => setMultiplier(Number(e.target.value))}
              className="w-full border rounded p-2 mt-1"
            >
              {multipliers}
            </select>
          </dd>
        </div>

        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm/6 font-medium text-gray-900">
            RER
          </dt>
          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            {(results?.rer ?? 0).toFixed(2) ?? 0} kcal/day
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm/6 font-medium text-gray-900">
            DER
          </dt>
          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            {(results?.der ?? 0).toFixed(2)} kcal/day
          </dd>
        </div>
      </dl>
    </div>
  );
};

const Feed: React.FC<{ der: number }> = (props: { der: number }) => {
  const feeds = [
    {
      id: 1,
      name: "ピュリナワン チキン",
      kcalPer100: 413,
    },
  ];

  const FeedData: React.FC = () => {
    return (
      <>
        {feeds.map((f) => {
          return (
            <div key={f.id}>
              <div className="px-4 sm:px-0">
                <h3 className="text-base/7 font-semibold text-gray-900">
                  {f.name}
                </h3>
              </div>
              <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      カロリー
                    </dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {f.kcalPer100}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">
                      必要グラム数
                    </dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {Math.round(props.der / f.kcalPer100 * 100)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <FeedData />
    </div>
  );
};

const CatCalorie: React.FC = () => {
  const [results, setResults] = useState<{ rer: number; der: number } | null>(
    null,
  );

  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold my-4">猫のカロリー計算</h1>
          <CalculatorForm results={results} setResults={setResults} />
          <h1 className="text-2xl font-bold my-4 ">餌</h1>
          <Feed der={results?.der ?? 0} />
        </div>
      </main>
    </>
  );
};

export default CatCalorie;
