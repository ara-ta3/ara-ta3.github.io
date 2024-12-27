import { Nutrition } from "./Nutrition";
import { describe, it, expect } from "vitest";

describe("Nutrition", () => {
  it("炭水化物の概算を出せる", () => {
    const nutrition = new Nutrition(35, 14, 2, 9, 12);
    expect(nutrition.carbohydrate).toBe(28);
  });

  it("炭水化物の概算が0を下回った場合、0になる", () => {
    const nutrition = new Nutrition(8.5, 1, 0.5, 3, 99);
    expect(nutrition.carbohydrate).toBe(0);
  });
});
