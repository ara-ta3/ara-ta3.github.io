import React from "react";

export const HeadingTitle: React.FC<{
  title: string;
  icon?: React.ReactNode;
}> = ({ title, icon }) => {
  return (
    <h2 className="flex items-center gap-2 border-l-4 border-primary-500 pl-3 text-primary-700 text-xl font-bold py-2">
      {icon != null && <span className="text-primary-500 text-lg">{icon}</span>}
      {title}
    </h2>
  );
};
