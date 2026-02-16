import React from "react";
import { HeadingTitle } from "@/components/Heading";
import { getAllProjects } from "@/utils/projects";

const Projects: React.FC = () => {
  const projects = getAllProjects();
  return (
    <div id="projects" className="py-4">
      <HeadingTitle title="個人開発" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col gap-4 p-4 shadow-md hover:shadow-lg"
          >
            <a href={`projects/${project.id}`}>
              <h3 className="text-primary-700 text-lg font-medium mb-2">
                {project.title}
              </h3>
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-auto rounded-lg "
                />
              )}
              <div>
                <p className="text-primary-900 text-sm font-normal py-2">
                  {project.description}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
