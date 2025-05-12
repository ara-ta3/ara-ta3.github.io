import { describe, it, expect } from "vitest";
import { FoodType, sumOfCalories } from "./Food";
import { Nutrition } from "./Nutrition";

describe("Food", () => {
  const dummyNutrition = new Nutrition(1, 1, 1, 1, 1);
  it("sumOfCaloriesがDryFoodのカロリーを返す", () => {
    expect(
      sumOfCalories({ "1": { gram: 50 } }, [
        {
          id: 1,
          type: FoodType.Dry,
          brand: "food",
          url: "url",
          kcalPer100: 30,
          nutrition: dummyNutrition,
        },
      ]),
    ).toBe(15);
  });

  it("sumOfCaloriesがWetFoodのカロリーを返す", () => {
    expect(
      sumOfCalories({ "1": { gram: 25 } }, [
        {
          id: 1,
          type: FoodType.Wet,
          brand: "food",
          url: "url",
          kcalPerBag: 80,
          gramsPerBag: 50,
          nutrition: dummyNutrition,
        },
      ]),
    ).toBe(40);
  });

  it("sumOfCaloriesがDryFoodとWetFoodのカロリー合算値を返す", () => {
    expect(
      sumOfCalories({ "1": { gram: 25 }, "2": { gram: 60 } }, [
        {
          id: 1,
          type: FoodType.Wet,
          brand: "food",
          url: "url",
          kcalPerBag: 80,
          gramsPerBag: 50,
          nutrition: dummyNutrition,
        },
        {
          id: 2,
          type: FoodType.Dry,
          brand: "food",
          url: "url",
          kcalPer100: 400,
          nutrition: dummyNutrition,
        },
      ]),
    ).toBe(280);
  });

  it("sumOfCaloriesの対象が空の場合0で返す", () => {
    expect(
      sumOfCalories({}, [
        {
          id: 1,
          type: FoodType.Wet,
          brand: "food",
          url: "url",
          kcalPerBag: 80,
          gramsPerBag: 50,
          nutrition: dummyNutrition,
        },
      ]),
    ).toBe(0);
  });
});
