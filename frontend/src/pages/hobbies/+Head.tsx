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
    "ara-ta3が好きなゲームや、継続している遊びの記録をまとめたページです。現在はSplatoon 3のXマッチにおけるシーズン別の最高XPと順位を掲載しています。";

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
