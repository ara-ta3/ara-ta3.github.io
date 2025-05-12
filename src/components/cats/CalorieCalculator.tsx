import React, { useMemo, useState } from "react";
import {
  FoodType,
  sumOfCalories,
  getFoodDisplayName,
} from "../../domains/cats/Food.ts";
import {
  Button,
  Card,
  FloatingLabel,
  HR,
  Label,
  Select,
  Tooltip,
} from "flowbite-react";
import { MultiplierForm } from "./calculator/Multiplier.tsx";
import { CatCalculatorState } from "../../hooks/cats/useCatCalculator.ts";
import FoodAmount from "./FoodAmount.tsx";
import FoodMaster from "../../domains/cats/FoodMaster.ts";
import { DryFood, WetFood } from "../../domains/cats/Food.ts";

interface CalorieCalculatorProps {
  props: CatCalculatorState;
  onTransitionClick?: () => void;
}

const SelectedFoodItemDisplay: React.FC<{
  food: DryFood | WetFood;
  grams: number;
  mealsPerDay: number;
}> = ({ food, grams, mealsPerDay }) => {
  let calorie = 0;
  if (food.type === FoodType.Wet) {
    calorie = (grams / food.gramsPerBag) * food.kcalPerBag;
  } else if (food.type === FoodType.Dry) {
    calorie = (grams * food.kcalPer100) / 100;
  }

  const displayAmount =
    food.type === FoodType.Wet && food.gramsPerBag
      ? `${(grams / food.gramsPerBag).toFixed(1)}袋 (${grams}g)`
      : `${grams}g`;

  const displayAmountPerMeal =
    mealsPerDay > 0
      ? food.type === FoodType.Wet && food.gramsPerBag
        ? `${(grams / food.gramsPerBag / mealsPerDay).toFixed(1)}袋 (${(grams / mealsPerDay).toFixed(1)}g)`
        : `${(grams / mealsPerDay).toFixed(1)}g`
      : "N/A";

  return (
    <div key={food.id} className="grid grid-cols-5 gap-4 py-2">
      <div className="text-xs sm:text-base col-span-2">{`${food.brand} ${food.flavor ?? ""}`}</div>
      <div>{displayAmountPerMeal}</div>
      <div>{displayAmount}</div>
      <div>{calorie.toFixed(2)} kcal</div>
    </div>
  );
};

const SelectedFoodTableDisplay: React.FC<{
  calculateTargets: {
    [key: number]: { gram: number };
  };
  mealsPerDay: number;
}> = ({ calculateTargets, mealsPerDay }) => {
  return (
    <div className="overflow-x-auto w-full">
      <div className="grid grid-cols-5 gap-4 border-b pb-2 text-sm">
        <div className="col-span-2">フード</div>
        <div>
          <p>1食毎</p>
          <p>(1日{mealsPerDay}食)</p>
        </div>
        <div>合計量</div>
        <div>合計カロリー</div>
      </div>
      <div>
        {Object.entries(calculateTargets).map(([id, value]) => {
          const foodId = Number(id);
          const f = FoodMaster.find((x) => x?.id === Number(foodId));
          if (f === undefined) {
            return null;
          }
          return (
            <SelectedFoodItemDisplay
              key={foodId}
              food={f}
              grams={value["gram"]}
              mealsPerDay={mealsPerDay}
            />
          );
        })}
      </div>
    </div>
  );
};

const CalorieCalculator: React.FC<CalorieCalculatorProps> = ({
  props,
  onTransitionClick,
}) => {
  const [selectedFoodId, setSelectedFoodId] = useState<number | undefined>(
    undefined
  );
  const [mealsPerDay, setMealsPerDay] = useState<number>(2);

  const sumCalorie: number = useMemo(
    () => sumOfCalories(props.calculateTargets, FoodMaster),
    [props.calculateTargets]
  );

  return (
    <div className="grid gap-4">
      <Card className="flex flex-col grid-item col-span-1">
        <div className="grid grid-cols-2">
          <div className="flex flex-col grid-item col-span-1">
            <Tooltip content="70 × 体重^(3/4)">
              <p className="underline">安静時のエネルギー要求量 RER</p>
            </Tooltip>
            <p className="text-xl font-bold">
              {(props.calculated?.rer ?? 0).toFixed(2)} kcal/day
            </p>
          </div>
          <div className="flex flex-col grid-item col-span-1">
            <Tooltip content="RER × 係数">
              <p className="underline">1日当たりのエネルギー要求量 DER</p>
            </Tooltip>
            <p className="text-xl font-bold">
              {(props.calculated?.der ?? 0).toFixed(2)} kcal/day
            </p>
          </div>
        </div>
        <div className="flex flex-col grid-item col-span-1">
          <p>合計カロリー</p>
          <p className="text-xl font-bold">{sumCalorie.toFixed(2)} kcal/day</p>
        </div>
      </Card>
      <div className="flex flex-col grid-item col-span-1 p-2 space-y-4">
        <FloatingLabel
          variant="outlined"
          label="体重"
          type="number"
          value={props.weight}
          step="any"
          onChange={(e) => props.setWeight(e.target.value)}
        />
        <MultiplierForm
          setMultiplier={props.setMultiplier}
          current={props.multiplier}
        />
        <Card className="sticky top-0 z-20">
          <div className="flex flex-col grid-item col-span-1">
            <SelectedFoodTableDisplay
              calculateTargets={props.calculateTargets}
              mealsPerDay={mealsPerDay}
            />
          </div>
        </Card>

        <FloatingLabel
          variant="outlined"
          label="1日の食事回数"
          type="number"
          value={mealsPerDay}
          step="1"
          min="1"
          onChange={(e) => setMealsPerDay(Number(e.target.value))}
        />
        <div>
          <Label
            htmlFor="dry-foods"
            value="フードの必要g数の計算対象に追加する"
          />
          <div className="flex item-center gap-2">
            <Select
              id="dry-foods"
              value={selectedFoodId || ""}
              onChange={(e) => setSelectedFoodId(Number(e.target.value))}
            >
              <option value={""} disabled>
                選択してください
              </option>
              {FoodMaster.map((f) => {
                return (
                  <option key={f.id} value={f.id}>
                    {getFoodDisplayName(f)}
                  </option>
                );
              })}
            </Select>
            <Button
              className="whitespace-nowrap"
              onClick={() => {
                selectedFoodId && props.addCalculateTarget(selectedFoodId);
              }}
            >
              追加する
            </Button>
          </div>
        </div>
        <div>
          {Object.entries(props.calculateTargets).map(([id, value]) => {
            const foodId = Number(id);
            const f = FoodMaster.find((x) => x?.id === Number(foodId));
            if (f === undefined) {
              return <></>;
            }
            return (
              <FoodAmount
                key={foodId}
                food={f}
                currentSumCalorie={sumCalorie}
                grams={value["gram"]}
                der={props.calculated?.der ?? 0}
                changeGram={props.chagneCalculateTargetGram}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalorieCalculator;
