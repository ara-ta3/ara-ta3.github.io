import React from "react";
import Nekometry from "@/assets/images/nekometry.jpg";

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
    <div id="projects">
      <h2 className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        プロジェクト
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4">
        {projects.map((project) => (
          <div key={project.id} className="flex flex-col gap-3 pb-3">
            <h3>Nekometry</h3>
            <a href={project.href} target="_blank">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                style={{ backgroundImage: `url("${project.imageUrl}")` }}
              ></div>
              <div>
                <p className="text-[#121416] text-base font-medium leading-normal">
                  {project.name}
                </p>
                <p className="text-[#6a7581] text-sm font-normal leading-normal">
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
