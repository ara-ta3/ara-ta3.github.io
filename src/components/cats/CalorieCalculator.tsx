import React, { useMemo, useState } from "react";
import { FoodType, sumOfCalories } from "../../domains/cats/Food.ts";
import {
  Button,
  Card,
  FloatingLabel,
  HR,
  Label,
  Select,
  Table,
  Tooltip,
} from "flowbite-react";
import { MultiplierForm } from "./calculator/Multiplier.tsx";
import { CatCalculatorState } from "../../hooks/cats/useCatCalculator.ts";
import FoodAmount from "./FoodAmount.tsx";
import FoodMaster from "../../domains/cats/FoodMaster.ts";

interface CalorieCalculatorProps {
  props: CatCalculatorState;
  onTransitionClick?: () => void;
}

const CalorieCalculator: React.FC<CalorieCalculatorProps> = ({
  props,
  onTransitionClick,
}) => {
  const [selectedFoodIds, setSelectedFoodIds] = useState<number[]>([]);
  const sumCalorie: number = useMemo(
    () => sumOfCalories(props.calculateTargets, FoodMaster),
    [props.calculateTargets]
  );

  return (
    <div className="">
      <Card className="grid grid-cols-2 flex flex-col grid-item col-span-1 sticky top-0 z-10">
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
        <div className="flex flex-col col-span-1">
          <p>合計カロリー</p>
          <p className="text-xl font-bold">{sumCalorie.toFixed(2)} kcal/day</p>
        </div>
      </Card>
      <HR />
      <div className="flex flex-col grid-item col-span-2 p-4 space-y-4">
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
          <Table className="py-4">
            <Table.Head>
              <Table.HeadCell></Table.HeadCell>
              <Table.HeadCell>フード名</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {FoodMaster.map((f) => (
                <Table.Row key={f.id} className="hover:bg-gray-100">
                  <Table.Cell>
                    <label
                      htmlFor={`food-${f.id}`}
                      className="w-full h-full flex items-center"
                    >
                      <input
                        type="checkbox"
                        id={`food-${f.id}`}
                        value={f.id}
                        className="peer border-gray-300 rounded focus:ring-blue-500"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFoodIds((prev) => [...prev, f.id]);
                          } else {
                            setSelectedFoodIds((prev) =>
                              prev.filter((id) => id !== f.id)
                            );
                          }
                        }}
                      />
                      <div className="peer-checked:bg-blue-100 w-full h-full flex items-center"></div>
                    </label>
                  </Table.Cell>
                  <Table.Cell className="px-6 py-4">
                    <label
                      htmlFor={`food-${f.id}`}
                      className="w-full h-full flex items-center"
                    >
                      {f.name}
                    </label>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Button
            className="whitespace-nowrap space-y-4"
            onClick={() => {
              props.addCalculateTarget(selectedFoodIds);
            }}
          >
            まとめて追加する
          </Button>
        </div>
        <HR />
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
