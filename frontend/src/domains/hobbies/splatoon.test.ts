import { describe, expect, it } from "vitest";
import type { SplatoonSeasonRecord } from "@/domains/hobbies/splatoon";
import {
  buildSplatoonXpSummary,
  formatSplatoonSeasonPeriod,
  getBestSplatoonRank,
  summarizeSplatoonTargetAchievement,
} from "@/domains/hobbies/splatoon";
import { splatoonSeasonRecords } from "@/data/splatoon";

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
  it("全シーズン・全ルールから最高順位とそのときのXPを返す", () => {
    const bestRank = getBestSplatoonRank(splatoonSeasonRecords);

    expect(bestRank).toEqual({
      season: "2023春 Fresh Season",
      rule: "clamBlitz",
      rank: 2380,
      xp: 2615.2,
    });
  });
});

describe("formatSplatoonSeasonPeriod", () => {
  it("春・夏・秋のシーズンは同じ年の3か月を返す", () => {
    expect(formatSplatoonSeasonPeriod("2023春 Fresh Season")).toBe(
      "2023年3月〜2023年5月",
    );
    expect(formatSplatoonSeasonPeriod("2023夏 Sizzle Season")).toBe(
      "2023年6月〜2023年8月",
    );
    expect(formatSplatoonSeasonPeriod("2023秋 Dizzle Season")).toBe(
      "2023年9月〜2023年11月",
    );
  });

  it("冬のシーズンは翌年2月までを返す", () => {
    expect(formatSplatoonSeasonPeriod("2022冬 Chill Season")).toBe(
      "2022年12月〜2023年2月",
    );
  });

  it("形式が一致しない場合は null を返す", () => {
    expect(formatSplatoonSeasonPeriod("Unknown Season")).toBeNull();
  });
});

describe("summarizeSplatoonTargetAchievement", () => {
  const records: readonly SplatoonSeasonRecord[] = [
    {
      season: "2022冬 Chill Season",
      results: {
        area: { xp: 2379.6, rank: 23560 },
        tower: { xp: 2432.8, rank: 17973 },
        rainmaker: { xp: 2565.3, rank: 5897 },
        clamBlitz: { xp: 2447.6, rank: 13536 },
      },
    },
    {
      season: "2023春 Fresh Season",
      results: {
        area: { xp: 2500.0, rank: 20726 },
        tower: { xp: 2453.0, rank: 11390 },
        rainmaker: { xp: 2386.1, rank: 17568 },
        clamBlitz: { xp: 2615.2, rank: 2380 },
      },
    },
  ];

  it("目標XP以上のシーズン名と全シーズン数を返す", () => {
    expect(summarizeSplatoonTargetAchievement(records, "area", 2400)).toEqual({
      achievedSeasons: ["2023春 Fresh Season"],
      totalSeasons: 2,
    });
  });

  it("目標XPと同値のシーズンも達成として扱う", () => {
    expect(summarizeSplatoonTargetAchievement(records, "area", 2500)).toEqual({
      achievedSeasons: ["2023春 Fresh Season"],
      totalSeasons: 2,
    });
  });

  it("達成シーズンがない場合は空配列を返す", () => {
    expect(summarizeSplatoonTargetAchievement(records, "area", 2600)).toEqual({
      achievedSeasons: [],
      totalSeasons: 2,
    });
  });
});
