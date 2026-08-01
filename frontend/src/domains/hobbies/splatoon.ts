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

export type SplatoonBestRank = {
  season: string;
  rule: SplatoonRule;
  rank: number;
  xp: number;
};

export type SplatoonHighestXpByRule = Record<SplatoonRule, SplatoonHighlight>;

const splatoonSeasonStartMonths = {
  春: 3,
  夏: 6,
  秋: 9,
  冬: 12,
} as const;

type SplatoonSeasonName = keyof typeof splatoonSeasonStartMonths;

export const formatSplatoonSeasonPeriod = (season: string): string | null => {
  const matched = /^(\d{4})([春夏秋冬])/.exec(season);

  if (matched == null) {
    return null;
  }

  const year = Number.parseInt(matched[1], 10);
  const startMonth =
    splatoonSeasonStartMonths[matched[2] as SplatoonSeasonName];
  const isAcrossYears = startMonth === 12;
  const endYear = isAcrossYears ? year + 1 : year;
  const endMonth = isAcrossYears ? 2 : startMonth + 2;

  return `${year}年${startMonth}月〜${endYear}年${endMonth}月`;
};

export type SplatoonYearlyHighestXp = {
  year: number;
  highestXpByRule: SplatoonHighestXpByRule;
};

export type SplatoonXpSummary = {
  allTime: SplatoonHighestXpByRule;
  yearly: SplatoonYearlyHighestXp[];
};

const createHighestXpByRule = (
  record: SplatoonSeasonRecord,
): SplatoonHighestXpByRule => ({
  area: { season: record.season, rule: "area", value: record.results.area.xp },
  tower: {
    season: record.season,
    rule: "tower",
    value: record.results.tower.xp,
  },
  rainmaker: {
    season: record.season,
    rule: "rainmaker",
    value: record.results.rainmaker.xp,
  },
  clamBlitz: {
    season: record.season,
    rule: "clamBlitz",
    value: record.results.clamBlitz.xp,
  },
});

const updateHighestXpByRule = (
  current: SplatoonHighestXpByRule,
  record: SplatoonSeasonRecord,
): void => {
  splatoonRules.forEach((rule) => {
    if (record.results[rule].xp > current[rule].value) {
      current[rule] = {
        season: record.season,
        rule,
        value: record.results[rule].xp,
      };
    }
  });
};

export const getSplatoonRecordYear = (record: SplatoonSeasonRecord): number =>
  Number.parseInt(record.season.slice(0, 4), 10);

export const buildSplatoonXpSummary = (
  records: readonly [SplatoonSeasonRecord, ...SplatoonSeasonRecord[]],
): SplatoonXpSummary => {
  const firstRecord = records[0];
  const allTime = createHighestXpByRule(firstRecord);
  const highestXpByYear = new Map<number, SplatoonHighestXpByRule>();

  records.forEach((record) => {
    const year = getSplatoonRecordYear(record);
    const yearlyHighestXp = highestXpByYear.get(year);

    updateHighestXpByRule(allTime, record);
    if (yearlyHighestXp == null) {
      highestXpByYear.set(year, createHighestXpByRule(record));
    } else {
      updateHighestXpByRule(yearlyHighestXp, record);
    }
  });

  return {
    allTime,
    yearly: [...highestXpByYear.entries()]
      .sort(([left], [right]) => left - right)
      .map(([year, highestXpByRule]) => ({ year, highestXpByRule })),
  };
};

export type SplatoonTargetAchievement = {
  achievedSeasons: readonly string[];
  totalSeasons: number;
};

export const summarizeSplatoonTargetAchievement = (
  records: readonly SplatoonSeasonRecord[],
  rule: SplatoonRule,
  targetXp: number,
): SplatoonTargetAchievement => ({
  achievedSeasons: records
    .filter((record) => record.results[rule].xp >= targetXp)
    .map((record) => record.season),
  totalSeasons: records.length,
});

export const getBestSplatoonRank = (
  records: readonly [SplatoonSeasonRecord, ...SplatoonSeasonRecord[]],
): SplatoonBestRank => {
  const firstRecord = records[0];
  const firstRule = splatoonRules[0];
  let bestRank: SplatoonBestRank = {
    season: firstRecord.season,
    rule: firstRule,
    rank: firstRecord.results[firstRule].rank,
    xp: firstRecord.results[firstRule].xp,
  };

  records.forEach((record) => {
    splatoonRules.forEach((rule) => {
      const result = record.results[rule];

      if (result.rank < bestRank.rank) {
        bestRank = {
          season: record.season,
          rule,
          rank: result.rank,
          xp: result.xp,
        };
      }
    });
  });

  return bestRank;
};
