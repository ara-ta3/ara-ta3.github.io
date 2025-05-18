import React from "react";
// import { ResponsivePie } from "@nivo/pie";

interface Hourly {
  id: string;
  label: string;
  value: number;
}

const HourlyPieChart: React.FC<{ hours: Hourly[] }> = () => {
  // const getTimeColor = (hour: number) => {
  //   if (hour > 4 && hour < 12) return "#FFECB3";
  //   if (hour >= 12 && hour < 19) return "#FFD180";
  //   if (hour >= 19 || hour <= 4) return "#81D4FA";
  //   return "#D3D3D3";
  // };
  // const outerData = Array.from({ length: 24 }, (_, i) => ({
  //   id: `${i}:00`,
  //   label: `${i}:00`,
  //   value: 1,
  //   color: getTimeColor(i),
  // }));

  return <div>Chart functionality removed</div>;
};

export { HourlyPieChart };
