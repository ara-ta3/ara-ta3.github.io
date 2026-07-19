export const splatoonRules = [
  "area",
  "tower",
  "rainmaker",
  "clamBlitz",
] as const;

export type SplatoonRule = (typeof splatoonRules)[number];

export const splatoonRuleLabels: Record<SplatoonRule, string> = {
  area: "エリア",
  tower: "ヤグラ",
  rainmaker: "ホコ",
  clamBlitz: "アサリ",
};

export type SplatoonResult = {
  xp: number;
  rank: number;
};

export type SplatoonSeasonRecord = {
  season: string;
  results: Record<SplatoonRule, SplatoonResult>;
};

export type SplatoonHighlight = {
  season: string;
  rule: SplatoonRule;
  value: number;
};

export type SplatoonHighlights = {
  highestXp: SplatoonHighlight;
  bestRank: SplatoonHighlight;
};

export const getSplatoonHighlights = (
  records: readonly [SplatoonSeasonRecord, ...SplatoonSeasonRecord[]],
): SplatoonHighlights => {
  const firstRecord = records[0];
  const firstRule = splatoonRules[0];
  let highestXp: SplatoonHighlight = {
    season: firstRecord.season,
    rule: firstRule,
    value: firstRecord.results[firstRule].xp,
  };
  let bestRank: SplatoonHighlight = {
    season: firstRecord.season,
    rule: firstRule,
    value: firstRecord.results[firstRule].rank,
  };

  records.forEach((record) => {
    splatoonRules.forEach((rule) => {
      const result = record.results[rule];

      if (result.xp > highestXp.value) {
        highestXp = { season: record.season, rule, value: result.xp };
      }

      if (result.rank < bestRank.value) {
        bestRank = { season: record.season, rule, value: result.rank };
      }
    });
  });

  return { highestXp, bestRank };
};
