import React from "react";
import { usePageContext } from "vike-react/usePageContext";
import { PageContext } from "vike/types";
import { PageData } from "./+onBeforeRender";

const Head: React.FC = () => {
  const pageContext = usePageContext() as PageContext<PageData>;
  const title = pageContext.data.title;
  const description = pageContext.data.description;
  const foodId = pageContext.data.foodId;
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`https://ara-ta3.github.io/cat/calorie/food/${foodId}/`}
      />
    </>
  );
};

export default Head;
