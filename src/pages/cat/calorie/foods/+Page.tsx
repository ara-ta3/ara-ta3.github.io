import React from "react";
import { CalorieTabs } from "../../../../components/cats/CalorieTabs";

const CatCalorieFoods: React.FC = () => {
  return <CalorieTabs defaultTab="対応フード一覧" initialFoodId={null} />;
};

export default CatCalorieFoods;
