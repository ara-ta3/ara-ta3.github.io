import React from "react";
import { useData } from "vike-react/useData";
import Footer from "@/components/Footer";
import ProjectHeader from "@/components/project/ProjectHeader";
import TechnologiesSection from "@/components/project/TechnologiesSection";
import ProjectDetails from "@/components/project/ProjectDetails";
import ScreenshotGallery from "@/components/project/ScreenshotGallery";
import DemoButton from "@/components/project/DemoButton";
import Breadcrumb from "@/components/Breadcrumb";
import type { Data } from "@/pages/projects/@id/+data";

const ProjectDetailPage: React.FC = () => {
  const { project } = useData<Data>();

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-4">
          <div className="flex flex-col max-w-[960px] flex-1">
            <Breadcrumb
              items={[
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
              ]}
            />

            <ProjectHeader
              title={project.title}
              description={project.description}
              overview={project.overview}
            />
            <TechnologiesSection technologies={project.technologies} />
            <ProjectDetails details={project.details} />
            <ScreenshotGallery imageUrl={project.imageUrl} />
            <DemoButton
              demoUrl={project.demoUrl}
              buttonText={project.buttonText}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
