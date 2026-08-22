import React from "react";

const Head: React.FC = () => {
  const title = "登壇資料・スライド一覧 | ara-ta3の個人サイト";
  const description =
    "ara-ta3がカンファレンスや勉強会で発表した登壇資料とスライドの一覧です。Scala、Web開発、コードレビューなどのテーマごとに公開資料をまとめています。";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://ara-ta3.github.io/slides" />
    </>
  );
};

export default Head;
