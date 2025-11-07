import React, { useEffect, useState } from "react";
import type { MonthlyStat } from "@/utils/articleStats";

type Props = {
  stats: MonthlyStat[];
};

type ClientChart = React.ComponentType<Props>;

const MonthlyArticleChart: React.FC<Props> = (props) => {
  const [ClientComponent, setClientComponent] = useState<ClientChart | null>(
    null,
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let mounted = true;

    import("./MonthlyArticleChart.client")
      .then((module) => {
        if (mounted) {
          setClientComponent(() => module.default);
        }
      })
      .catch((error) => {
        console.error("Failed to load MonthlyArticleChart.client", error);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (!ClientComponent) {
    return (
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-primary-900 mb-4">
          月別推移
        </h2>
        <div className="rounded-lg border border-dashed border-secondary-200 bg-primary-50 p-4 text-center text-primary-500">
          ブラウザ環境でチャートを読み込み中です…
        </div>
      </section>
    );
  }

  return <ClientComponent {...props} />;
};

export default MonthlyArticleChart;
