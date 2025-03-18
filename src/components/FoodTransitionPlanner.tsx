import React, { useState, useEffect } from "react";
import {
  calculateFoodTransitionPlan,
  ContinuedFood,
} from "../domains/cats/FoodTransitionPlan";
import { DryFood, FoodType, WetFood } from "../domains/cats/Food";
import FoodMaster from "../domains/cats/FoodMaster";
import { Select, Button } from "flowbite-react";

interface FoodTransitionPlannerProps {
  initialCalories?: number;
}

export const FoodTransitionPlanner: React.FC<FoodTransitionPlannerProps> = ({
  initialCalories,
}) => {
  const [currentFoodId, setCurrentFoodId] = useState<number | undefined>(
    undefined,
  );
  const [newFoodId, setNewFoodId] = useState<number | undefined>(undefined);
  const [requiredCalories, setRequiredCalories] = useState(0);
  const [transitionDays, setTransitionDays] = useState(7);
  const [continuedFoods, setContinuedFoods] = useState<ContinuedFood[]>([]);
  const [selectedContinuedFoodId, setSelectedContinuedFoodId] = useState<
    number | undefined
  >(undefined);
  const [selectedContinuedFoodAmount, setSelectedContinuedFoodAmount] =
    useState<number>(0);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const currentFood = FoodMaster.find((f) => f.id === currentFoodId);
  const newFood = FoodMaster.find((f) => f.id === newFoodId);
  const selectedContinuedFood = FoodMaster.find(
    (f) => f.id === selectedContinuedFoodId,
  );

  const addContinuedFood = () => {
    if (selectedContinuedFood && selectedContinuedFoodAmount > 0) {
      setContinuedFoods([
        ...continuedFoods,
        {
          food: selectedContinuedFood,
          amount: selectedContinuedFoodAmount,
        },
      ]);
      setSelectedContinuedFoodId(undefined);
      setSelectedContinuedFoodAmount(0);
    }
  };

  const removeContinuedFood = (index: number) => {
    setContinuedFoods(continuedFoods.filter((_, i) => i !== index));
  };

  const plans =
    currentFood && newFood
      ? calculateFoodTransitionPlan(
          currentFood,
          newFood,
          requiredCalories,
          transitionDays,
          100,
          continuedFoods,
        )
      : [];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">フード切り替えプランナー</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">現在のフード</h3>
          <div>
            <label className="block text-sm font-medium">フード選択</label>
            <Select
              value={currentFoodId || ""}
              onChange={(e) => setCurrentFoodId(Number(e.target.value))}
              className="mt-1 block w-full"
            >
              <option value="">選択してください</option>
              {FoodMaster.map((food) => (
                <option key={food.id} value={food.id}>
                  {food.name} (
                  {food.type === FoodType.Dry
                    ? `${food.kcalPer100}kcal/100g`
                    : `${food.kcalPerBag}kcal/${food.gramsPerBag}g`}
                  )
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">新しいフード</h3>
          <div>
            <label className="block text-sm font-medium">フード選択</label>
            <Select
              value={newFoodId || ""}
              onChange={(e) => setNewFoodId(Number(e.target.value))}
              className="mt-1 block w-full"
            >
              <option value="">選択してください</option>
              {FoodMaster.map((food) => (
                <option key={food.id} value={food.id}>
                  {food.name} (
                  {food.type === FoodType.Dry
                    ? `${food.kcalPer100}kcal/100g`
                    : `${food.kcalPerBag}kcal/${food.gramsPerBag}g`}
                  )
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">継続フード</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">フード選択</label>
            <Select
              value={selectedContinuedFoodId || ""}
              onChange={(e) =>
                setSelectedContinuedFoodId(Number(e.target.value))
              }
              className="mt-1 block w-full"
            >
              <option value="">選択してください</option>
              {FoodMaster.map((food) => (
                <option key={food.id} value={food.id}>
                  {food.name} (
                  {food.type === FoodType.Dry
                    ? `${food.kcalPer100}kcal/100g`
                    : `${food.kcalPerBag}kcal/${food.gramsPerBag}g`}
                  )
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium">
              {selectedContinuedFood?.type === FoodType.Wet
                ? "袋数"
                : "グラム数"}
            </label>
            <input
              type="number"
              value={selectedContinuedFoodAmount || ""}
              onChange={(e) =>
                setSelectedContinuedFoodAmount(parseFloat(e.target.value))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={addContinuedFood}
              disabled={
                !selectedContinuedFood || selectedContinuedFoodAmount <= 0
              }
              className="w-full"
            >
              追加
            </Button>
          </div>
        </div>

        {continuedFoods.length > 0 && (
          <div className="mt-4">
            <h4 className="text-lg font-medium mb-2">追加済みの継続フード</h4>
            <div className="space-y-2">
              {continuedFoods.map((cf, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded"
                >
                  <span>
                    {cf.food.name} -{" "}
                    {cf.food.type === FoodType.Wet
                      ? `${cf.amount}袋`
                      : `${cf.amount}g`}
                  </span>
                  <Button
                    color="failure"
                    size="xs"
                    onClick={() => removeContinuedFood(index)}
                  >
                    削除
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium">
            必要カロリー (kcal/日)
          </label>
          <input
            type="number"
            value={requiredCalories || ""}
            onChange={(e) => setRequiredCalories(parseFloat(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">切り替え日数</label>
          <input
            type="number"
            value={transitionDays}
            onChange={(e) => setTransitionDays(parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">開始日</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                日目
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                日付
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                現在のフード (g)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                新しいフード (g)
              </th>
              {plans[0]?.continuedFoods.map((cf, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  継続フード {index + 1} (g)
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                合計カロリー
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                新フードの割合 (%)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {plans.map((plan) => {
              const date = new Date(startDate);
              date.setDate(date.getDate() + plan.day - 1);
              return (
                <tr key={plan.day}>
                  <td className="px-6 py-4 whitespace-nowrap">{plan.day}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {date.toLocaleDateString("ja-JP")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {plan.currentFoodGrams}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {plan.newFoodGrams}
                  </td>
                  {plan.continuedFoods.map((cf, index) => (
                    <td key={index} className="px-6 py-4 whitespace-nowrap">
                      {cf.grams}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {plan.totalCalories}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {plan.newFoodPercentage}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
