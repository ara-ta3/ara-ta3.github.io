import React from "react";

const Head: React.FC = () => {
  const title = "猫のカロリー計算 | ara-ta3の物置";
  const description = "愛猫に必要なカロリーを計算できるツールです。";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="https://ara-ta3.github.io/cat/calorie/"
      />
    </>
  );
};

export default Head;
