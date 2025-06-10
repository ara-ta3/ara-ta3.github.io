import React from "react";

import { HourlyPieChart } from "@/components/Schedule";
import Breadcrumb from "@/components/Breadcrumb";

const innerData = [
  { id: "睡眠", label: "睡眠", value: 7.5 },
  { id: "仕事", label: "仕事", value: 9.5 },
  { id: "休憩", label: "休憩", value: 4 },
  { id: "運動", label: "運動", value: 2 },
  { id: "その他", label: "その他", value: 1 },
];

const Schedules: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[{ name: "スケジュール管理", url: "/schedules/", isLast: true }]}
      />
      <HourlyPieChart hours={innerData} />
    </div>
  );
};

export default Schedules;
