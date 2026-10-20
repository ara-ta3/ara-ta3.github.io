import React, { useEffect, useState } from "react";
import type { SwimmingYearSummary } from "@/domains/hobbies/swimming";

type Props = {
  yearly: readonly SwimmingYearSummary[];
};

const SwimmingDistanceChart: React.FC<Props> = (props) => {
  const [ClientChart, setClientChart] =
    useState<React.ComponentType<Props> | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    let mounted = true;
    const loadChart = async () => {
      try {
        const module =
          await import("@/components/hobbies/SwimmingDistanceChart.client");
        if (mounted) {
          setClientChart(() => module.default);
        }
      } catch {
        if (mounted) {
          setLoadFailed(true);
        }
      }
    };
    void loadChart();
    return () => {
      mounted = false;
    };
  }, []);

  return ClientChart ? (
    <ClientChart {...props} />
  ) : (
    <div className="flex h-[340px] items-center justify-center text-sm text-secondary-500">
      {loadFailed
        ? "グラフを読み込めませんでした。下の一覧で距離と回数を確認できます。"
        : "グラフを読み込み中です…"}
    </div>
  );
};

export default SwimmingDistanceChart;
