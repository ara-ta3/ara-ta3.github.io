import React from "react";

import { DryFoods, Food } from "../../domains/Cat.ts";

const DryFoodTableBody: React.FC<{ feed: Food; der: number }> = (
  props,
) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4">
        <a
          className="hover:underline text-blue-600"
          href={props.feed.url}
          target="_blank"
        >
          {props.feed.name}
        </a>
      </td>
      <td className="px-6 py-4">{props.feed.kcalPer100}</td>
      <td className="px-6 py-4">
        {Math.round(props.der / props.feed.kcalPer100 * 100)}
      </td>
      <td className="px-6 py-4">{props.feed.nutrition.carbohydrate}</td>
      <td className="px-6 py-4">{props.feed.nutrition.protein}</td>
      <td className="px-6 py-4">{props.feed.nutrition.fat}</td>
      <td className="px-6 py-4">{props.feed.nutrition.fiber}</td>
      <td className="px-6 py-4">{props.feed.nutrition.ash}</td>
      <td className="px-6 py-4">{props.feed.nutrition.moisture}</td>
    </tr>
  );
};

const DryFoodTable: React.FC<{ der: number }> = (props: { der: number }) => {
  return (
    <div className="relative overflow-x-auto">
      <h1 className="text-2xl font-bold my-4 ">ドライフード</h1>
      <table className="w-full text-sm text-left">
        <thead>
          <tr>
            <th className="px-6 py-3">名称</th>
            <th className="px-6 py-3">カロリー(kcal/100g)</th>
            <th className="px-6 py-3">必要グラム数</th>
            <th className="px-6 py-3">糖質(概算)</th>
            <th className="px-6 py-3">たんぱく質</th>
            <th className="px-6 py-3">脂質</th>
            <th className="px-6 py-3">粗繊維</th>
            <th className="px-6 py-3">灰分</th>
            <th className="px-6 py-3">水分</th>
          </tr>
        </thead>
        <tbody>
          {DryFoods.map((f) => (
            <DryFoodTableBody key={f.id} der={props.der} feed={f} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DryFoodTable;
