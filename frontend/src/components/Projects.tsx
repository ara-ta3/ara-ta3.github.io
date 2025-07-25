import React from "react";
import { HeadingTitle } from "@/components/Heading";
import StructuredData, { type ProjectData } from "@/components/StructuredData";
import { getAllProjects } from "@/utils/projects";

const Projects: React.FC = () => {
  const projects = getAllProjects().filter((p) => p.imageUrl !== undefined);

  const projectsData: ProjectData[] = projects.map((project) => ({
    name: project.title,
    description: project.description,
    image: project.imageUrl,
    url: project.demoUrl
      ? `https://ara-ta3.github.io/projects/${project.id}`
      : undefined,
    author: "ara-ta3",
    programmingLanguage: project.technologies.filter((tech) =>
      ["TypeScript", "JavaScript", "React", "Scala", "Go", "Python"].includes(
        tech,
      ),
    ),
    applicationCategory: "WebApplication",
  }));
  return (
    <>
      <StructuredData projects={projectsData} />
      <div id="projects" className="py-4">
        <HeadingTitle title="プロジェクト" />
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 p-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col gap-4 p-4 shadow-md hover:shadow-lg"
            >
              <a href={`projects/${project.id}`}>
                <h3 className="text-primary-700 text-lg font-medium mb-2">
                  {project.title}
                </h3>
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-auto rounded-lg "
                />
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
    </>
  );
};

export default Projects;
