import React from "react";
import StructuredData from "@/components/StructuredData";

const Head: React.FC = () => {
  const title = "ara-ta3の個人サイト | 技術記事・登壇資料・個人開発";
  const description =
    "ScalaやTypeScriptを中心にWeb開発をしているara-ta3の個人サイトです。技術記事、登壇資料、個人開発プロジェクト、趣味の記録をまとめています。";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href="https://ara-ta3.github.io/" />
      <StructuredData
        data={{
          title,
          description,
          url: "https://ara-ta3.github.io/",
          type: "WebSite",
        }}
      />
    </>
  );
};

export default Head;
