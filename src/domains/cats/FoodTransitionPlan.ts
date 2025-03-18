import { DryFood, FoodType, WetFood } from "./Food.ts";

export type ContinuedFood = {
  food: DryFood | WetFood;
  amount: number;
};

export type FoodTransitionPlan = {
  day: number;
  currentFoodGrams: number;
  newFoodGrams: number;
  totalCalories: number;
  newFoodPercentage: number;
  continuedFoods: {
    food: DryFood | WetFood;
    grams: number;
    calories: number;
  }[];
};

function getCaloriesPerGram(food: DryFood | WetFood): number {
  if (food.type === FoodType.Dry) {
    return food.kcalPer100 / 100;
  } else {
    return food.kcalPerBag / food.gramsPerBag;
  }
}

function getGramsFromAmount(food: DryFood | WetFood, amount: number): number {
  if (food.type === FoodType.Dry) {
    return amount;
  } else {
    return amount * food.gramsPerBag;
  }
}

function getCaloriesFromAmount(
  food: DryFood | WetFood,
  amount: number,
): number {
  if (food.type === FoodType.Dry) {
    return (food.kcalPer100 * amount) / 100;
  } else {
    return amount * food.kcalPerBag;
  }
}

export function calculateFoodTransitionPlan(
  currentFood: DryFood | WetFood,
  newFood: DryFood | WetFood,
  requiredCalories: number,
  transitionDays: number,
  targetPercentage: number,
  continuedFoods: ContinuedFood[] = [],
): FoodTransitionPlan[] {
  const plans: FoodTransitionPlan[] = [];
  const currentFoodCaloriesPerGram = getCaloriesPerGram(currentFood);
  const newFoodCaloriesPerGram = getCaloriesPerGram(newFood);

  const continuedTotalCalories = continuedFoods.reduce(
    (sum, cf) => sum + getCaloriesFromAmount(cf.food, cf.amount),
    0,
  );

  const transitionCalories = requiredCalories - continuedTotalCalories;
  const dailyIncrease = targetPercentage / transitionDays;

  for (let day = 1; day <= transitionDays; day++) {
    const currentPercentage = dailyIncrease * day;
    const newFoodRatio = currentPercentage / 100;
    const currentFoodRatio = 1 - newFoodRatio;

    const totalNewFoodCalories = transitionCalories * newFoodRatio;
    const totalCurrentFoodCalories = transitionCalories * currentFoodRatio;

    const newFoodGrams = totalNewFoodCalories / newFoodCaloriesPerGram;
    const currentFoodGrams =
      totalCurrentFoodCalories / currentFoodCaloriesPerGram;

    plans.push({
      day,
      currentFoodGrams: Math.round(currentFoodGrams * 10) / 10,
      newFoodGrams: Math.round(newFoodGrams * 10) / 10,
      totalCalories: Math.round(requiredCalories),
      newFoodPercentage: Math.round(currentPercentage),
      continuedFoods: continuedFoods.map((cf) => ({
        food: cf.food,
        grams: Math.round(getGramsFromAmount(cf.food, cf.amount) * 10) / 10,
        calories: Math.round(getCaloriesFromAmount(cf.food, cf.amount)),
      })),
    });
  }

  return plans;
}
