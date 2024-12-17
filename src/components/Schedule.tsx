import React from "react";
import { ResponsivePie } from "@nivo/pie";

const HourlyPieChart = () => {
  const getTimeColor = (hour: number) => {
    if (hour > 4 && hour < 12) return "#FFECB3";
    if (hour >= 12 && hour < 19) return "#FFD180";
    if (hour >= 19 || hour <= 4) return "#81D4FA";
    return "#D3D3D3";
  };
  const outerData = Array.from({ length: 24 }, (_, i) => ({
    id: `${i}:00`,
    label: `${i}:00`,
    value: 1,
    color: getTimeColor(i),
  }));

  const innerData = [
    { id: "睡眠", label: "睡眠", value: 7.5 },
    { id: "仕事", label: "仕事", value: 9.5 },
    { id: "休憩", label: "休憩", value: 4 },
    { id: "運動", label: "運動", value: 2 },
    { id: "その他", label: "その他", value: 1 },
  ];

  const chartOptions = {
    margin: { top: 20, right: 20, bottom: 40, left: 20 },
    innerRadius: 0.5,
    activeOuterRadiusOffset: 8,
    padAngle: 0.7,
    cornerRadius: 3,
    borderWidth: 1,
    borderColor: { from: "color", modifiers: [["darker", 0.6]] },
    arcLinkLabelsSkipAngle: 10,
    arcLinkLabelsTextColor: "#333",
    arcLabelsTextColor: { from: "color", modifiers: [["darker", 2]] },
  };

  return (
    <div style={{ height: "600px", display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative", width: "600px", height: "600px" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <ResponsivePie
            data={outerData}
            {...chartOptions}
            innerRadius={0.8}
            colors={{ datum: "data.color" }}
            enableArcLinkLabels={false}
            enableArcLabels={true}
            arcLabelsTextColor="#000"
            arcLabel={(e) =>
              `${e.label}`}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "15%",
            width: "70%",
            height: "70%",
          }}
        >
          <ResponsivePie
            data={innerData}
            {...chartOptions}
            colors={{ scheme: "nivo" }}
            enableArcLinkLabels={false}
            enableArcLabels={true}
            arcLabelsTextColor="#000"
            arcLabel={(e) => `${e.label}`}
          />
        </div>
      </div>
    </div>
  );
};

export { HourlyPieChart };
