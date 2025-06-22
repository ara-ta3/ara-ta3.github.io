import React from "react";

interface TechnologiesSectionProps {
  technologies: string[];
}

const TechnologyTag: React.FC<{ technology: string }> = ({ technology }) => {
  return (
    <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#f0f2f5] pl-4 pr-4">
      <p className="text-[#111418] text-sm font-medium leading-normal">
        {technology}
      </p>
    </div>
  );
};

const TechnologiesSection: React.FC<TechnologiesSectionProps> = ({
  technologies,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Technologies Used
      </h3>
      <div className="flex gap-3 p-3 flex-wrap pr-4">
        {technologies.map((tech) => (
          <TechnologyTag key={tech} technology={tech} />
        ))}
      </div>
    </div>
  );
};

export default TechnologiesSection;
