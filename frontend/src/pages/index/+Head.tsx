import React from "react";
import StructuredData from "@/components/StructuredData";

const Head: React.FC = () => {
  return (
    <>
      <title>ara-ta3の個人ページ</title>
      <meta name="description" content="portfolioのように見える遊び場です" />
      <link rel="canonical" href="https://ara-ta3.github.io/" />
      <StructuredData
        data={{
          title: "ara-ta3の個人ページ",
          description: "portfolioのように見える遊び場です",
          url: "https://ara-ta3.github.io/",
          type: "WebSite",
        }}
      />
    </>
  );
};

export default Head;
