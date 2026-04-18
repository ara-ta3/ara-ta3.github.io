import React from "react";
import Common from "@/components/headertags/Common";

const Head: React.FC = () => {
  return (
    <>
      <Common />
      <title>スライド一覧 | ara-ta3のページ</title>
      <meta
        name="description"
        content="ara-ta3が登壇・勉強会などで作成した Marp スライドの一覧です。"
      />
      <meta property="og:title" content="スライド一覧 | ara-ta3のページ" />
      <meta
        property="og:description"
        content="ara-ta3が登壇・勉強会などで作成した Marp スライドの一覧です。"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://ara-ta3.github.io/slides" />
    </>
  );
};

export default Head;
