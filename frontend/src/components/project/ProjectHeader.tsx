import React from "react";

interface ProjectHeaderProps {
  title: string;
  description: string;
  overview: string;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  title,
  description,
  overview,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-primary-900 tracking-light text-3xl font-bold leading-tight">
            {title}
          </p>
          <p className="text-primary-700 text-sm font-normal leading-normal">
            {description}
          </p>
          <p className="text-primary-700 text-sm font-normal leading-normal">
            {overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
