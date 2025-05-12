import React from "react";
import { CalorieTabs } from "../../../components/cats/CalorieTabs";
import { usePageContext } from "vike-react/usePageContext";

const CatCalorie: React.FC = () => {
  const pageContext = usePageContext();
  const foodId = pageContext.urlParsed.search["foodId"];

  return <CalorieTabs defaultTab="計算" initialFoodId={foodId} />;
};

export default CatCalorie;
