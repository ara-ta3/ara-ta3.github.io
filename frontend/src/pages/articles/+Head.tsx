import React from "react";

export function Head() {
  const title = "技術記事一覧 | ara-ta3の個人サイト";
  const description =
    "ara-ta3がはてなブログ、Zenn、企業ブログなどで公開した技術記事の一覧です。Scala、TypeScript、開発組織やコードレビューに関する記事をまとめています。";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </>
  );
}
