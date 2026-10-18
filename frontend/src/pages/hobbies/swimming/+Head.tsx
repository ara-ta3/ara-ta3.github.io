import React from "react";

const Head: React.FC = () => {
  const title = "水泳の記録 | ara-ta3の個人サイト";
  const description =
    "記録会の種目・タイムと、日々泳いだ距離やメモを掲載しています。月ごと・年ごとの水泳距離も振り返れます。";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link
        rel="canonical"
        href="https://ara-ta3.github.io/hobbies/swimming/"
      />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="https://ara-ta3.github.io/hobbies/swimming/"
      />
    </>
  );
};

export default Head;
