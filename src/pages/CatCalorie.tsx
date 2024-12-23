import React, { useEffect, useState } from "react";
import { CatCalorie as DomainCatCalorie } from "../domains/Cat.ts";
import Header from "../components/Header.tsx";

const Caution: React.FC = () => {
  return (
    <>
      <h2 className="text-1xl font-extrabold dark:text-white">
        注意事項
      </h2>
      <p className="my-4 text-sm text-gray-500">
        本サイトの計算結果は参考情報であり、猫の健康状態や栄養管理を保証するものではありません。
      </p>
      <p className="my-4 text-sm text-gray-500">
        判断は飼い主様の責任でお願いいたします。必ずかかりつけの獣医師に相談の上でご利用ください。
      </p>
    </>
  );
};

const CalculatorForm: React.FC<
  {
    setResults: (results: { rer: number; der: number } | null) => void;
    results: { rer: number; der: number } | null;
  }
> = ({ setResults, results }) => {
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
      const der = r.calculateDER(multiplier);
      setResults({ rer, der });
    } else {
      setResults(null);
    }
  }, [weight, multiplier, setResults]);

  const multipliers = [{
    name: "非活動的・肥満傾向",
    value: 1,
  }, {
    name: "減量が必要",
    value: 0.8,
  }, {
    name: "少し増量が必要",
    value: 1.2,
  }, {
    name: "増量が必要",
    value: 1.4,
  }].map((m) => {
    return (
      <div>
        <label key={m.name}>
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
              onChange={(e) => {
                localStorage.setItem("cat.weight", e.target.value);
                setWeight(e.target.value);
              }}
              className="w-full border rounded p-2 mt-1"
            />
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm/6 font-medium text-gray-900">
            係数
          </dt>
          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div>
              {multipliers}
            </div>
          </dd>
        </div>

        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm/6 font-medium text-gray-900">
            RER = 70 × (体重) ^ (3/4)
          </dt>
          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            {(results?.rer ?? 0).toFixed(2) ?? 0} kcal/day
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm/6 font-medium text-gray-900">
            DER = RER × 係数
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
      url: "https://nestle.jp/brand/one/cat/lineup/grainfree1/",
    },
  ];

  return (
    <div className="p-4 bg-white shadow rounded">
      {feeds.map((f) => {
        return (
          <div key={f.id}>
            <div className="px-4 sm:px-0">
              <a href={f.url} target="_blank">{f.name}</a>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900">
                    カロリー(kcal/100g)
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
          <Caution />
          <CalculatorForm results={results} setResults={setResults} />
          <h1 className="text-2xl font-bold my-4 ">ドライフード</h1>
          <Feed der={results?.der ?? 0} />
        </div>
      </main>
    </>
  );
};

export default CatCalorie;
