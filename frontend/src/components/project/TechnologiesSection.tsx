import React from "react";

interface TechnologiesSectionProps {
  technologies: string[];
}

const TechnologyTag: React.FC<{ technology: string }> = ({ technology }) => {
  return (
    <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary-100 pl-4 pr-4">
      <p className="text-primary-700 text-sm font-medium leading-normal">
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
      <h3 className="text-primary-900 text-xl font-bold leading-tight px-4 py-2">
        技術スタック
      </h3>
      <div className="flex gap-3 p-2 flex-wrap px-4">
        {technologies.map((tech) => (
          <TechnologyTag key={tech} technology={tech} />
        ))}
      </div>
    </div>
  );
};

export default TechnologiesSection;
