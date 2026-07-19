import { describe, expect, it } from "vitest";
import { splatoonSeasonRecords } from "@/data/splatoon";
import {
  buildSplatoonXpSummary,
  getBestSplatoonRank,
} from "@/domains/hobbies/splatoon";

describe("buildSplatoonXpSummary", () => {
  it("全シーズンからルール別の歴代最高XPを返す", () => {
    const summary = buildSplatoonXpSummary(splatoonSeasonRecords);

    expect(summary.allTime).toEqual({
      area: {
        season: "2024冬 Chill Season",
        rule: "area",
        value: 2566.0,
      },
      tower: {
        season: "2024夏 Sizzle Season",
        rule: "tower",
        value: 2630.1,
      },
      rainmaker: {
        season: "2022冬 Chill Season",
        rule: "rainmaker",
        value: 2565.3,
      },
      clamBlitz: {
        season: "2023春 Fresh Season",
        rule: "clamBlitz",
        value: 2615.2,
      },
    });
  });

  it("年別にルール別の最高XPを返す", () => {
    const summary = buildSplatoonXpSummary(splatoonSeasonRecords);

    expect(summary.yearly[3]).toEqual({
      year: 2025,
      highestXpByRule: {
        area: {
          season: "2025夏 Sizzle Season",
          rule: "area",
          value: 2447.2,
        },
        tower: {
          season: "2025秋 Dizzle Season",
          rule: "tower",
          value: 2471.6,
        },
        rainmaker: {
          season: "2025夏 Sizzle Season",
          rule: "rainmaker",
          value: 2452.5,
        },
        clamBlitz: {
          season: "2025春 Fresh Season",
          rule: "clamBlitz",
          value: 2564.1,
        },
      },
    });
  });
});

describe("getBestSplatoonRank", () => {
  it("全シーズン・全ルールから最高順位を返す", () => {
    const bestRank = getBestSplatoonRank(splatoonSeasonRecords);

    expect(bestRank).toEqual({
      season: "2023春 Fresh Season",
      rule: "clamBlitz",
      value: 2380,
    });
  });
});
