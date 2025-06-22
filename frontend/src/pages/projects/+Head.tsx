import React from "react";
import Common from "@/components/headertags/Common";

const Head: React.FC = () => {
  return (
    <>
      <Common />
      <title>プロジェクト詳細 | ara-ta3.github.io</title>
      <meta
        name="description"
        content="個人ウェブサイトプロジェクトの詳細。Vike、React、TypeScriptを使用したモダンな静的サイト生成による開発事例。"
      />
      <meta
        property="og:title"
        content="プロジェクト詳細 | ara-ta3.github.io"
      />
      <meta
        property="og:description"
        content="個人ウェブサイトプロジェクトの詳細。Vike、React、TypeScriptを使用したモダンな静的サイト生成による開発事例。"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://ara-ta3.github.io/projects" />
    </>
  );
};

export default Head;
