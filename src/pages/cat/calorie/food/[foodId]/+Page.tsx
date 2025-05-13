import React from "react";
import { CalorieTabs } from "../../../../../components/cats/CalorieTabs";
import { usePageContext } from "vike-react/usePageContext";

const CatCalorieFood: React.FC = () => {
  const pageContext = usePageContext();
  const foodId = pageContext.routeParams?.foodId;

  return <CalorieTabs defaultTab="計算" initialFoodId={foodId} />;
};

export default CatCalorieFood;
