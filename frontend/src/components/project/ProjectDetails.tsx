import React from "react";

interface ProjectDetail {
  label: string;
  value: string;
}

interface ProjectDetailsProps {
  details: ProjectDetail[];
}

const ProjectDetailRow: React.FC<{ detail: ProjectDetail }> = ({ detail }) => {
  return (
    <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbe0e6] py-5">
      <p className="text-[#60748a] text-sm font-normal leading-normal">
        {detail.label}
      </p>
      <p className="text-[#111418] text-sm font-normal leading-normal">
        {detail.value}
      </p>
    </div>
  );
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ details }) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Project Details
      </h3>
      <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
        {details.map((detail, index) => (
          <ProjectDetailRow key={index} detail={detail} />
        ))}
      </div>
    </div>
  );
};

export default ProjectDetails;
