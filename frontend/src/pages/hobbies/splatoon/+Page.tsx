import React from "react";
import SplatoonHeader from "@/components/hobbies/SplatoonHeader";
import SplatoonHighlights from "@/components/hobbies/SplatoonHighlights";
import SplatoonRecordsTable from "@/components/hobbies/SplatoonRecordsTable";
import SplatoonXpChart from "@/components/hobbies/SplatoonXpChart";
import {
  buildSplatoonXpSummary,
  getBestSplatoonRank,
} from "@/domains/hobbies/splatoon";
import { splatoonSeasonRecords } from "@/data/splatoon";

const SplatoonPage: React.FC = () => {
  const xpSummary = buildSplatoonXpSummary(splatoonSeasonRecords);
  const bestRank = getBestSplatoonRank(splatoonSeasonRecords);

  return (
    <>
      <SplatoonHeader activePage="records" />

      <article>
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Game Record
          </p>
          <h2 className="mt-1 text-3xl font-bold text-primary-900">
            Splatoon 3
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-secondary-600">
            Xマッチで遊んだ記録です。各シーズンの4ルール別の最高XPと順位を残しています。
          </p>
        </div>

        <SplatoonHighlights bestRank={bestRank} xpSummary={xpSummary} />
        <SplatoonXpChart records={splatoonSeasonRecords} />
        <SplatoonRecordsTable records={splatoonSeasonRecords} />
      </article>
    </>
  );
};

export default SplatoonPage;
