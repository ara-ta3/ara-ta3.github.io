import React, { useEffect } from "react";
import { CalorieTabs } from "../../../components/cats/CalorieTabs";
import { usePageContext } from "vike-react/usePageContext";

const CatCalorie: React.FC = () => {
  const pageContext = usePageContext();
  const foodId = pageContext.urlParsed.search["foodId"];

  // Redirect to the new URL pattern if foodId is present
  useEffect(() => {
    if (foodId) {
      window.location.href = `/cat/calorie/food/${foodId}/`;
    }
  }, [foodId]);

  return <CalorieTabs defaultTab="計算" initialFoodId={null} />;
};

export default CatCalorie;
