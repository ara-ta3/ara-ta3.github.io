import React, { useMemo, useState } from "react";
import { Foods, FoodType } from "../../domains/Cat.ts";
import {
  Alert,
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

const CalorieCalculator: React.FC<{
  props: CatCalculatorState;
}> = ({ props }) => {
  const [selectedFoodId, setSelectedFoodId] = useState<number | undefined>(
    undefined
  );
  const currentSumGrams = useMemo(() => {
    return Object.values(props.calculateTargets).reduce(
      (sum, target) => sum + target.gram,
      0
    );
  }, [props.calculateTargets]);

  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col grid-item col-span-1 p-2">
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
        <HR />
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
              {Foods.map((f) => {
                return (
                  <option key={f.id} value={f.id}>
                    {f.name}
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
        <HR />
        <div>
          {Object.entries(props.calculateTargets).map(([id, value]) => {
            const foodId = Number(id);
            const f = Foods.find((x) => x?.id === Number(foodId));
            if (f === undefined) {
              return <></>;
            }
            return (
              <FoodAmount
                key={foodId}
                food={f}
                currentSumGrams={currentSumGrams}
                grams={value["gram"]}
                der={props.calculated?.der ?? 0}
                changeGram={props.chagneCalculateTargetGram}
              />
            );
          })}
        </div>
      </div>
      <Card className="flex flex-col grid-item col-span-1">
        <div className="grid grid-cols-2">
          <div className="flex flex-col grid-item col-span-1">
            <Tooltip content="70 × 体重^(3/4)">
              <p className="underline">安静時のエネルギー要求量 RER</p>
            </Tooltip>
            <p className="text-xl font-bold">
              {(props.calculated?.rer ?? 0).toFixed(2) ?? 0} kcal/day
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
          <p className="text-xl font-bold">
            {Object.entries(props.calculateTargets).reduce(
              (sum, [foodId, value]) => {
                const f = Foods.find((x) => x.id === Number(foodId));
                if (f?.type === FoodType.Wet) {
                  const cal = (value["gram"] / f.gramsPerBag) * f.kcalPerBag;
                  console.log(cal);
                  return sum + cal;
                } else if (f?.type === FoodType.Dry) {
                  return sum + (value["gram"] * (f?.kcalPer100 || 0)) / 100;
                }
                return sum;
              },
              0
            )}{" "}
            kcal/day
          </p>
        </div>
      </Card>
    </div>
  );
};

export default CalorieCalculator;
