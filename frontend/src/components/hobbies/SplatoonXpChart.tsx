import React, { useEffect, useState } from "react";
import type { SplatoonSeasonRecord } from "@/domains/hobbies/splatoon";

type Props = {
  records: readonly SplatoonSeasonRecord[];
};

type ClientChart = React.ComponentType<Props>;

const SplatoonXpChart: React.FC<Props> = (props) => {
  const [ClientComponent, setClientComponent] = useState<ClientChart | null>(
    null,
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let mounted = true;

    import("@/components/hobbies/SplatoonXpChart.client")
      .then((module) => {
        if (mounted) {
          setClientComponent(() => module.default);
        }
      })
      .catch((error) => {
        console.error("Failed to load SplatoonXpChart.client", error);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (!ClientComponent) {
    return (
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold text-primary-900">
          シーズン推移
        </h2>
        <div className="rounded-lg border border-dashed border-secondary-200 bg-primary-50 p-4 text-center text-primary-500">
          ブラウザ環境でチャートを読み込み中です…
        </div>
      </section>
    );
  }

  return <ClientComponent {...props} />;
};

export default SplatoonXpChart;
