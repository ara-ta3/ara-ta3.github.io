import { Nutrition } from "./Nutrition.ts";

export enum FoodType {
  Dry = "dry",
  Wet = "wet",
}

export type FoodId = number;

interface Food {
  id: FoodId;
  type: FoodType;
  brand: string;
  series?: string;
  target?: string;
  flavor?: string;
  url: string;
  nutrition: Nutrition;
}

export interface DryFood extends Food {
  type: FoodType.Dry;
  kcalPer100: number;
}

export interface WetFood extends Food {
  type: FoodType.Wet;
  kcalPerBag: number;
  gramsPerBag: number;
  texture?: string;
}

export function sumOfCalories(
  targets: {
    [key: FoodId]: { gram: number };
  },
  foods: (DryFood | WetFood)[],
): number {
  return Object.entries(targets).reduce((sum, [foodId, value]) => {
    const f = foods.find((x) => x.id === Number(foodId));
    if (f?.type === FoodType.Wet) {
      const cal = (value["gram"] / f.gramsPerBag) * f.kcalPerBag;
      return sum + cal;
    } else if (f?.type === FoodType.Dry) {
      const cal = (value["gram"] * f.kcalPer100) / 100;
      return sum + cal;
    }
    return sum;
  }, 0);
}

export function getFoodDisplayName(food: DryFood | WetFood): string {
  const parts: string[] = [food.brand];

  if (food.series) {
    parts.push(food.series);
  }

  if (food.target) {
    parts.push(`(${food.target})`);
  }

  let displayName = parts.join(" ");

  if (food.flavor) {
    displayName += ` - ${food.flavor}`;
  }

  return displayName;
}
