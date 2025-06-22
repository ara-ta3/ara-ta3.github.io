import React from "react";
import Nekometry from "@/assets/images/nekometry.jpg";
import { HeadingTitle } from "./Heading";

const Projects: React.FC = () => {
  const projects = [
    {
      id: 1,
      name: "Nekometry",
      description:
        "猫の体重と活動レベルからRER/DERとごはんの必要な量を計算します。",
      imageUrl: Nekometry as string,
      href: "https://nekometry.web.app/",
    },
  ];

  return (
    <div id="projects" className="py-4">
      <HeadingTitle title="プロジェクト" />
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 p-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col gap-4 p-4 shadow-md hover:shadow-lg"
          >
            <a href={project.href} target="_blank">
              <h3 className="text-primary-700 text-lg font-medium mb-2">
                {project.name}
              </h3>
              <img
                src={project.imageUrl}
                alt={project.name}
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
  );
};

export default Projects;
