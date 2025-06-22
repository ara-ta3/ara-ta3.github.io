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
          <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight">
            {title}
          </p>
          <p className="text-[#60748a] text-sm font-normal leading-normal">
            {description}
          </p>
        </div>
      </div>
      <p className="text-[#111418] text-base font-normal leading-normal pb-3 pt-1 px-4">
        {overview}
      </p>
    </div>
  );
};

export default ProjectHeader;
