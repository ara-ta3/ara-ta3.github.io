import React from "react";

const Projects: React.FC = () => {
  const projects = [
    {
      id: 1,
      name: "個人ウェブサイト",
      description: "React、Vike、TypeScriptを使用した静的サイト生成。",
      imageUrl:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
      href: "https://github.com/ara-ta3/ara-ta3.github.io",
    },
    {
      id: 2,
      name: "Nekometry",
      description:
        "猫の体重と活動レベルからRER/DERとごはんの必要な量を計算します。",
      imageUrl:
        "https://images.unsplash.com/photo-1518086834179-0d11d2b376c3?w=400&h=300&fit=crop",
      href: "https://nekometry.web.app/",
    },
    {
      id: 3,
      name: "電力使用量可視化",
      description: "D3.jsを使用したインタラクティブなデータ可視化ツール。",
      imageUrl:
        "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop",
      href: "/electricity/",
    },
    {
      id: 4,
      name: "スケジュール管理",
      description: "効率的なスケジュール管理のためのウェブアプリケーション。",
      imageUrl:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
      href: "/schedules/",
    },
  ];

  return (
    <div id="projects">
      <h2 className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        プロジェクト
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {projects.map((project) => (
          <div key={project.id} className="flex flex-col gap-3 pb-3">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
