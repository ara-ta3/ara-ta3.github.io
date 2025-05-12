import { FC } from "react";
import { CalorieTabs } from "../../../../components/cats/CalorieTabs";
import React from "react";

const CatCalorieReference: FC = () => {
  return <CalorieTabs defaultTab="参考" initialFoodId={null} />;
};

export default CatCalorieReference;
