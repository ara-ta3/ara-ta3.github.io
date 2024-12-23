import React from "react";

const feeds = [
  {
    id: 1,
    name: "ピュリナワン チキン",
    kcalPer100: 413,
    url: "https://nestle.jp/brand/one/cat/lineup/grainfree1/",
  },
];

const DryFoods: React.FC<{ der: number }> = (props: { der: number }) => {
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

export default DryFoods;
