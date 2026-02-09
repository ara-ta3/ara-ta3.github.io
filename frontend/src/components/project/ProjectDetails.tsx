import React from "react";
import type { ProjectDetail } from "@/types/project";

interface ProjectDetailsProps {
  details: ProjectDetail[];
}

const ProjectDetailRow: React.FC<{ detail: ProjectDetail }> = ({ detail }) => {
  return (
    <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbe0e6] py-5">
      <p className="text-primary-900 text-sm font-normal leading-normal">
        {detail.label}
      </p>
      <p className="text-primary-700 text-sm font-normal leading-normal">
        {detail.value}
      </p>
    </div>
  );
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ details }) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-primary-900 text-xl font-bold leading-tight px-4 py-4">
        個人開発について
      </h2>
      <div className="grid grid-cols-2 gap-x-4 px-4">
        {details.map((detail, index) => (
          <ProjectDetailRow key={index} detail={detail} />
        ))}
      </div>
    </div>
  );
};

export default ProjectDetails;
