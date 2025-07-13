import React from "react";
import { useData } from "vike-react/useData";
import ProjectHeader from "@/components/project/ProjectHeader";
import TechnologiesSection from "@/components/project/TechnologiesSection";
import ProjectDetails from "@/components/project/ProjectDetails";
import ScreenshotGallery from "@/components/project/ScreenshotGallery";
import DemoButton from "@/components/project/DemoButton";
import BreadcrumbWithSchema from "@/components/BreadcrumbWithSchema";
import type { Data } from "@/pages/projects/@id/+data";

const ProjectDetailPage: React.FC = () => {
  const { project } = useData<Data>();

  return (
    <>
      <BreadcrumbWithSchema pathname={`/projects/${project.id}`} />
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
