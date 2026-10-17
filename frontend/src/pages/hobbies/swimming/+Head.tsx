import React from "react";

const Head: React.FC = () => {
  const title = "水泳の記録 | ara-ta3の個人サイト";
  const description =
    "泳いだ日や距離、メモを記録し、月ごと・年ごとの水泳距離を振り返るページです。";

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
