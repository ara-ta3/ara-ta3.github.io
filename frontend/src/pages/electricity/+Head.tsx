import React from "react";
import StructuredData from "@/components/StructuredData";

const Head: React.FC = () => {
  return (
    <>
      <title>電気代比較ツール</title>
      <meta
        name="description"
        content="電力会社の料金を比較して最適なプランを見つけるツール"
      />
      <link rel="canonical" href="https://ara-ta3.github.io/electricity/" />
      <StructuredData
        data={{
          title: "電気代比較ツール",
          description: "電力会社の料金を比較して最適なプランを見つけるツール",
          url: "https://ara-ta3.github.io/electricity/",
          type: "WebPage",
        }}
        softwareApp={{
          name: "電気代比較ツール",
          description: "電力会社の料金を比較して最適なプランを見つけるツール",
          url: "/electricity/",
          applicationCategory: "WebApplication",
          operatingSystem: "Web",
          authorName: "ara-ta3",
          offers: { price: "0", priceCurrency: "JPY" },
        }}
      />
    </>
  );
};

export default Head;
