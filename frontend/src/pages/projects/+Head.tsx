import React from "react";
import { usePageContext } from "vike-react/usePageContext";
import Common from "@/components/headertags/Common";

const Head: React.FC = () => {
  const pageContext = usePageContext();
  const isDetailPage = Boolean(pageContext.routeParams?.id);
  if (isDetailPage) {
    return null;
  }

  return (
    <>
      <Common />
      <title>個人開発一覧 | ara-ta3.github.io</title>
      <meta
        name="description"
        content="開発した個人開発の一覧。Webアプリケーション、ツール、ライブラリなど様々な技術を活用した開発事例をご紹介。"
      />
      <meta
        property="og:title"
        content="個人開発一覧 | ara-ta3.github.io"
      />
      <meta
        property="og:description"
        content="開発した個人開発の一覧。Webアプリケーション、ツール、ライブラリなど様々な技術を活用した開発事例をご紹介。"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://ara-ta3.github.io/projects" />
    </>
  );
};

export default Head;
