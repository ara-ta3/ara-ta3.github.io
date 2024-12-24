import { Card } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Tools: React.FC = () => {
  const navigate = useNavigate();
  const tools = [
    {
      id: 1,
      name: "24時間スケジューラー",
      description: "1日のスケジュールを入力し、グラフで生成します。",
      navigate: () => navigate("/schedules"),
    },
    {
      id: 2,
      name: "猫のカロリー計算",
      description:
        "猫の体重と活動レベルからRER/DERとごはんの必要な量を計算します。",
      navigate: () => navigate("/cat/calorie"),
    },
  ];
  return (
    <section id="tools" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Card key={tool.id} className="w-full" onClick={tool.navigate}>
              <h5 className="text-2xl font-bold text-gray-900">{tool.name}</h5>
              <p className="font-normal text-gray-700">{tool.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
