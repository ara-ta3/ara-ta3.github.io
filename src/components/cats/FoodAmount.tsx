import React from "react";
import { Button, FloatingLabel, Label } from "flowbite-react";
import { DryFood, FoodType, WetFood } from "../../domains/cats/Food";

const FoodAmount: React.FC<{
  food: DryFood | WetFood;
  grams: number;
  der: number;
  changeGram: (foodId: number, grams: number) => void;
  currentSumCalorie: number;
}> = ({ food, grams, der, changeGram, currentSumCalorie }) => {
  if (food.type === FoodType.Dry) {
    const currentCalorieExceptThisFood =
      currentSumCalorie - food.kcalPer100 * (grams / 100);
    return (
      <div className="px-2 my-2">
        <Label htmlFor={`Food${food.id}`}>{food.name}</Label>
        <div className="flex items-center gap-2">
          <FloatingLabel
            id={`Food${food.id}`}
            variant="outlined"
            label="グラム数"
            type="number"
            value={grams}
            step="any"
            onChange={(e) => {
              changeGram(food.id, Number(e.target.value));
            }}
          />
          <Button
            className="whitespace-nowrap"
            onClick={() => {
              changeGram(
                food.id,
                Math.round(
                  ((der - currentCalorieExceptThisFood) / food.kcalPer100) * 100
                )
              );
            }}
          >
            最大化
          </Button>
        </div>
      </div>
    );
  } else if (food.type === FoodType.Wet) {
    const [bags, setBags] = React.useState<number>(grams / food.gramsPerBag || 0);
    return (
      <div className="px-2 my-2">
        <Label htmlFor={`Food${food.id}`}>{food.name}</Label>
        <div className="flex items-center gap-2">
          <FloatingLabel
            id={`bags-${food.id}`}
            variant="outlined"
            label="袋数"
            type="number"
            value={bags}
            step="any"
            onChange={(e) => {
              const newBags = Number(e.target.value);
              setBags(newBags);
              changeGram(food.id, newBags * food.gramsPerBag);
            }}
          />
          <Button
            className="whitespace-nowrap"
            onClick={() => {
              setBags(bags + 1);
              changeGram(food.id, (bags + 1) * food.gramsPerBag);
            }}
          >
            +1袋
          </Button>
          <Button
            className="whitespace-nowrap"
            onClick={() => {
              setBags(bags + 0.5);
              changeGram(food.id, (bags + 0.5) * food.gramsPerBag);
            }}
          >
            +0.5袋
          </Button>
          <Button
            className="whitespace-nowrap"
            onClick={() => {
              setBags(0);
              changeGram(food.id, 0);
            }}
          >
            0袋
          </Button>
        </div>
      </div>
    );
  }
};

export default FoodAmount;
