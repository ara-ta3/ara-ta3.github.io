import React from "react";
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
  return (
    <div className="grid grid-cols-3">
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
            <Select id="dry-foods">
              {DryFoods.map((f) => {
                return <option key={f.id}>{f.name}</option>;
              })}
            </Select>
            <Button
              className="whitespace-nowrap"
              onClick={() =>
                props.setCalculateTargets([{ foodId: 1, grams: 0 }])
              }
            >
              追加する
            </Button>
          </div>
        </div>
        <HR />
        <div>
          {props.calculateTargets.map((t) => {
            const f = DryFoods.find((x) => x?.id === t.foodId);
            if (f === undefined) {
              return <></>;
            }
            return (
              <div key={t.foodId} className="flex item-center gap-2 px-2">
                <FloatingLabel
                  className="w-full"
                  variant="outlined"
                  label={f.name + " g数"}
                  type="number"
                  value={t.grams}
                  step="any"
                  onChange={(e) => console.log(e.target.value)}
                />
                <Button
                  className="whitespace-nowrap"
                  onClick={() => {
                    props.setCalculateTargets([
                      {
                        foodId: 1,
                        grams: Math.round(
                          ((props.calculated?.der ?? 0) / f.kcalPer100) * 100
                        ),
                      },
                    ]);
                  }}
                >
                  最大化
                </Button>
              </div>
            );
          })}
        </div>
      </div>
      <Card className="flex flex-col grid-item col-span-2">
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
