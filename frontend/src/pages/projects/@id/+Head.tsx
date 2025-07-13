import React from "react";
import { useData } from "vike-react/useData";
import Common from "@/components/headertags/Common";
import type { Data } from "@/pages/projects/@id/+data";

const Head: React.FC = () => {
  const { project } = useData<Data>();

  return (
    <>
      <Common />
      <title>{`${project.title} | ara-ta3.github.io`}</title>
      <meta name="description" content={project.description} />
      <meta
        property="og:title"
        content={`${project.title} | ara-ta3.github.io`}
      />
      <meta property="og:description" content={project.description} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`https://ara-ta3.github.io/projects/${project.id}`}
      />
    </>
  );
};

export default Head;
