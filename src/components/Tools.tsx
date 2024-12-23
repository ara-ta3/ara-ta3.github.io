import React from "react";
//import { useNavigate } from "react-router-dom";

const Tools: React.FC = () => {
  //  const navigate = useNavigate();
  const tools = [
    {
      id: 1,
      name: "24時間スケジューラー",
      description: "1日のスケジュールを入力し、グラフで生成します。",
      //      navigate: () => navigate("/schedules"),
    },
    {
      id: 2,
      name: "猫のカロリー計算",
      description: "RER/DERの計算をします。",
      //      navigate: () => navigate("/cat/calorie"),
    },
  ];
  return (
    <section id="tools" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition"
              //              onClick={tool.navigate}
            >
              <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
              <p className="text-gray-600">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
