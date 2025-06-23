import React from "react";
import Common from "@/components/headertags/Common";

const Head: React.FC = () => {
  return (
    <>
      <Common />
      <title>プロジェクト一覧 | ara-ta3.github.io</title>
      <meta
        name="description"
        content="開発したプロジェクトの一覧。Webアプリケーション、ツール、ライブラリなど様々な技術を活用した開発事例をご紹介。"
      />
      <meta
        property="og:title"
        content="プロジェクト一覧 | ara-ta3.github.io"
      />
      <meta
        property="og:description"
        content="開発したプロジェクトの一覧。Webアプリケーション、ツール、ライブラリなど様々な技術を活用した開発事例をご紹介。"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://ara-ta3.github.io/projects" />
    </>
  );
};

export default Head;
