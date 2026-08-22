import React from "react";
import { usePageContext } from "vike-react/usePageContext";
import Common from "@/components/headertags/Common";

const Head: React.FC = () => {
  const pageContext = usePageContext();
  const isDetailPage = Boolean(pageContext.routeParams?.id);
  if (isDetailPage) {
    return null;
  }

  const title = "個人開発一覧 | ara-ta3の個人サイト";
  const description =
    "ara-ta3が開発したWebアプリケーションやツールの一覧です。使用技術、開発の背景、主な機能、公開先をプロジェクトごとに紹介しています。";

  return (
    <>
      <Common />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://ara-ta3.github.io/projects" />
    </>
  );
};

export default Head;
