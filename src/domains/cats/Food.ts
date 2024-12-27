import { Nutrition } from "./Nutriction";

export enum FoodType {
  Dry = "dry",
  Wet = "wet",
}

interface Food {
  id: number;
  type: FoodType;
  name: string;
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
}
