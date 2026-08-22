import React from "react";
import { useData } from "vike-react/useData";
import Common from "@/components/headertags/Common";
import type { Data } from "@/pages/projects/@id/+data";

const Head: React.FC = () => {
  const { project } = useData<Data>();
  const title = `${project.title} | ara-ta3の個人サイト`;
  const description = project.metaDescription ?? project.overview;

  return (
    <>
      <Common />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`https://ara-ta3.github.io/projects/${project.id}`}
      />
    </>
  );
};

export default Head;
