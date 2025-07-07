import React from "react";
import StructuredData from "@/components/StructuredData";

const Head: React.FC = () => {
  return (
    <>
      <title>スケジュール管理</title>
      <meta
        name="description"
        content="時間配分を円グラフで視覚化するスケジュール管理ツール"
      />
      <link rel="canonical" href="https://ara-ta3.github.io/schedules/" />
      <StructuredData
        data={{
          title: "スケジュール管理",
          description: "時間配分を円グラフで視覚化するスケジュール管理ツール",
          url: "https://ara-ta3.github.io/schedules/",
          type: "SoftwareApplication",
        }}
      />
    </>
  );
};

export default Head;
