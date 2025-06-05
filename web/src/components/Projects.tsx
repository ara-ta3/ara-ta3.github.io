import React from "react";
import { Card } from "flowbite-react";

const Projects: React.FC = () => {
  const tools = [
    //    {
    //      id: 1,
    //      name: "24時間スケジューラー",
    //      description: "1日のスケジュールを入力し、グラフで生成します。",
    //      href: "/schedules/",
    //    },
    {
      id: 1,
      name: "Nekometry",
      ruby: "ネコメトリー",
      description:
        "猫の体重と活動レベルからRER/DERとごはんの必要な量を計算します。",
      href: "https://nekometry.web.app/",
    },
  ];
  return (
    <section id="projects" className="py-8 bg-base">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center text-primary-500">
          Personal Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {tools.map((tool) => {
            if (tool.ruby !== undefined) {
              return (
                <Card key={tool.id} className="w-full" href={tool.href}>
                  <ruby>
                    <h5 className="text-xl md:text-xl font-bold text-primary-500">
                      {tool.name}
                    </h5>
                    <rt className="text-sm text-primary-700">{tool.ruby}</rt>
                  </ruby>
                  <p className="font-normal text-gray-700 text-primary-700">
                    {tool.description}
                  </p>
                </Card>
              );
            }
            return (
              <Card key={tool.id} className="w-full" href={tool.href}>
                <h5 className="text-xl md:text-xl font-bold text-primary-500">
                  {tool.name}
                </h5>
                <p className="font-normal text-gray-700 text-primary-700">
                  {tool.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
