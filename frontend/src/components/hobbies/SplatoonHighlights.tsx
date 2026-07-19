import React from "react";
import type { SplatoonHighlights as Highlights } from "@/domains/hobbies/splatoon";
import { splatoonRuleLabels } from "@/domains/hobbies/splatoon";

type Props = {
  highlights: Highlights;
};

const SplatoonHighlights: React.FC<Props> = ({ highlights }) => {
  return (
    <div className="mb-10 grid gap-4 sm:grid-cols-2">
      <section className="rounded-xl border border-primary-100 bg-primary-50 p-5">
        <p className="text-sm font-semibold text-primary-600">歴代最高XP</p>
        <p className="mt-2 text-3xl font-bold text-primary-900">
          {highlights.highestXp.value.toFixed(1)}
        </p>
        <p className="mt-2 text-sm text-secondary-600">
          {highlights.highestXp.season}・
          {splatoonRuleLabels[highlights.highestXp.rule]}
        </p>
      </section>
      <section className="rounded-xl border border-secondary-200 bg-secondary-50 p-5">
        <p className="text-sm font-semibold text-secondary-600">歴代最高順位</p>
        <p className="mt-2 text-3xl font-bold text-secondary-900">
          {highlights.bestRank.value.toLocaleString("ja-JP")}位
        </p>
        <p className="mt-2 text-sm text-secondary-600">
          {highlights.bestRank.season}・
          {splatoonRuleLabels[highlights.bestRank.rule]}
        </p>
      </section>
    </div>
  );
};

export default SplatoonHighlights;
