import React from "react";

import BreadcrumbWithSchema from "@/components/BreadcrumbWithSchema";
import ProjectCard from "@/components/project/ProjectCard";
import { getAllProjects } from "@/utils/projects";

const ProjectsPage: React.FC = () => {
  const projects = getAllProjects();

  return (
    <>
      <BreadcrumbWithSchema pathname="/projects/" />
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-primary-900">個人開発</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
};

export default ProjectsPage;
