import React from "react";

const Head: React.FC = () => {
  const title = "Splatoon 3のXマッチ記録 | ara-ta3の個人サイト";
  const description =
    "ara-ta3のSplatoon 3プレイ記録です。Xマッチのルール別・シーズン別の最高XPと最終順位を、推移グラフや一覧表とともに掲載しています。";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link
        rel="canonical"
        href="https://ara-ta3.github.io/hobbies/splatoon/"
      />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="https://ara-ta3.github.io/hobbies/splatoon/"
      />
    </>
  );
};

export default Head;
