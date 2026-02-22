import React from "react";

import { HeadingTitle } from "@/components/Heading";
import ProjectCard from "@/components/project/ProjectCard";
import { getAllProjects } from "@/utils/projects";

const Projects: React.FC = () => {
  const projects = getAllProjects().filter(
    (project) => project.id !== "personal-website",
  );

  return (
    <div id="projects" className="py-4">
      <HeadingTitle title="個人開発" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
