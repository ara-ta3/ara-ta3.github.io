import React from "react";
import { Button, FloatingLabel, Label } from "flowbite-react";
import { DryFood, FoodType, WetFood } from "../../domains/Cat";

const FoodAmount: React.FC<{
  food: DryFood | WetFood;
  grams: number;
  der: number;
  changeGram: (foodId: number, grams: number) => void;
  currentSumGrams: number;
}> = ({ food, grams, der, changeGram, currentSumGrams }) => {
  if (food.type === FoodType.Dry) {
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
            onChange={(e) => console.log(e.target.value)}
          />
          <Button
            className="whitespace-nowrap"
            onClick={() => {
              const rest = der - currentSumGrams;
              changeGram(food.id, Math.round((rest / food.kcalPer100) * 100));
            }}
          >
            最大化
          </Button>
        </div>
      </div>
    );
  } else if (food.type === FoodType.Wet) {
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
            onChange={(e) => console.log(e.target.value)}
          />
          <Button
            className="whitespace-nowrap"
            onClick={() => {
              changeGram(food.id, food.gramsPerBag);
            }}
          >
            1袋分
          </Button>
          <Button
            className="whitespace-nowrap"
            onClick={() => {
              changeGram(food.id, food.gramsPerBag / 2);
            }}
          >
            半分
          </Button>
          <Button
            className="whitespace-nowrap"
            onClick={() => {
              changeGram(food.id, 0);
            }}
          >
            なし
          </Button>
        </div>
      </div>
    );
  }
};

export default FoodAmount;
