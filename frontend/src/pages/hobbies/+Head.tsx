import React from "react";
import { usePageContext } from "vike-react/usePageContext";

const Head: React.FC = () => {
  const pageContext = usePageContext();
  const isHobbiesIndex = ["/hobbies", "/hobbies/"].includes(
    pageContext.urlPathname,
  );
  if (!isHobbiesIndex) {
    return null;
  }

  const title = "趣味の記録 | ara-ta3の個人サイト";
  const description =
    "ara-ta3が好きなゲームや、継続している趣味の記録をまとめたページです。Splatoon 3のプレイ記録と水泳の記録を掲載しています。";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href="https://ara-ta3.github.io/hobbies/" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://ara-ta3.github.io/hobbies/" />
    </>
  );
};

export default Head;
