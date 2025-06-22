import React from "react";

export const HeadingTitle: React.FC<{
  title: string;
}> = ({ title }) => {
  return (
    <h2 className="text-primary-700 text-xl font-bold px-4 py-2 ">{title}</h2>
  );
};
