import React, { useState } from "react";
import { DryFoods } from "../../domains/Cat.ts";
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

const CalorieCalculator: React.FC<{
  props: CatCalculatorState;
}> = ({ props }) => {
  const [selectedFoodId, setSelectedFoodId] = useState<number | undefined>(
    undefined
  );

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
              {DryFoods.map((f) => {
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
            const f = DryFoods.find((x) => x?.id === Number(foodId));
            if (f === undefined) {
              return <></>;
            }
            return (
              <div key={foodId} className="px-2 my-2">
                <Label htmlFor={"Food" + f.id}>{f.name}</Label>
                <div className="flex items-center gap-2">
                  <FloatingLabel
                    id={"Food" + f.id}
                    variant="outlined"
                    label="グラム数"
                    type="number"
                    value={value["gram"]}
                    step="any"
                    onChange={(e) => console.log(e.target.value)}
                  />
                  <Button
                    className="whitespace-nowrap"
                    onClick={() => {
                      props.chagneCalculateTargetGram(
                        foodId,
                        Math.round(
                          ((props.calculated?.der ?? 0) / f.kcalPer100) * 100
                        )
                      );
                    }}
                  >
                    最大化
                  </Button>
                </div>
              </div>
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
      </Card>
    </div>
  );
};

export default CalorieCalculator;
