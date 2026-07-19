import { describe, expect, it } from "vitest";
import { splatoonSeasonRecords } from "@/data/splatoon";
import { getSplatoonHighlights } from "@/domains/hobbies/splatoon";

describe("getSplatoonHighlights", () => {
  it("全シーズン・全ルールから歴代最高XPと最高順位を返す", () => {
    const highlights = getSplatoonHighlights(splatoonSeasonRecords);

    expect(highlights).toEqual({
      highestXp: {
        season: "2024夏 Sizzle Season",
        rule: "tower",
        value: 2630.1,
      },
      bestRank: {
        season: "2023春 Fresh Season",
        rule: "clamBlitz",
        value: 2380,
      },
    });
  });
});
