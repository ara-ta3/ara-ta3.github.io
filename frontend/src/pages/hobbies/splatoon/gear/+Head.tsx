import React from "react";

const Head: React.FC = () => {
  const title = "Splatoon 3のギアメモ | ara-ta3の個人サイト";
  const description =
    "Splatoon 3で使っている5つのギア構成のメモ。マイコーデ画像と、メイン・サブの個数でまとめたギアパワー一覧を掲載しています。";
  const url = "https://ara-ta3.github.io/hobbies/splatoon/gear/";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
    </>
  );
};

export default Head;
