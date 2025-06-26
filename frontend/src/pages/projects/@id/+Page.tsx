import React, { useEffect } from "react";
import { useData } from "vike-react/useData";
import ProjectHeader from "@/components/project/ProjectHeader";
import TechnologiesSection from "@/components/project/TechnologiesSection";
import ProjectDetails from "@/components/project/ProjectDetails";
import ScreenshotGallery from "@/components/project/ScreenshotGallery";
import DemoButton from "@/components/project/DemoButton";
import { useBreadcrumbStore } from "@/stores/breadcrumbStore";
import type { Data } from "@/pages/projects/@id/+data";

const ProjectDetailPage: React.FC = () => {
  const { project } = useData<Data>();
  const setBreadcrumbItems = useBreadcrumbStore(
    (state) => state.setBreadcrumbItems,
  );

  useEffect(() => {
    setBreadcrumbItems([
      {
        name: "プロジェクト",
        url: "/projects/",
        isLast: false,
      },
      {
        name: project.title,
        url: `/projects/${project.id}`,
        isLast: true,
      },
    ]);
  }, [setBreadcrumbItems, project.title, project.id]);

  return (
    <>
      <ProjectHeader
        title={project.title}
        description={project.description}
        overview={project.overview}
      />
      <TechnologiesSection technologies={project.technologies} />
      <ProjectDetails details={project.details} />
      <ScreenshotGallery imageUrl={project.imageUrl} />
      <DemoButton demoUrl={project.demoUrl} buttonText={project.buttonText} />
    </>
  );
};

export default ProjectDetailPage;
