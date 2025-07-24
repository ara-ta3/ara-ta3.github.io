import React from "react";
import BreadcrumbWithSchema from "@/components/BreadcrumbWithSchema";
import { getAllProjects } from "@/utils/projects";
import type { Project } from "@/types/project";

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-white border border-secondary-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        <h2 className="text-xl font-bold text-primary-700 mb-2">
          {project.title}
        </h2>
        <p className="text-primary-500 text-sm mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-secondary-100 text-primary-700 text-xs font-medium rounded"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-secondary-100 text-primary-700 text-xs font-medium rounded">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <a
            href={`/projects/${project.id}`}
            className="inline-flex items-center p-2 text-sm font-medium text-center text-white bg-primary-900 rounded-lg hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 transition-colors"
          >
            詳細を見る
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 hover:text-primary-900 text-sm font-medium"
            >
              {project.buttonText || "Demo"}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectsPage: React.FC = () => {
  const projects = getAllProjects();

  return (
    <>
      <BreadcrumbWithSchema pathname="/projects/" />
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-primary-900">
          趣味プロジェクト一覧
        </h1>
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
