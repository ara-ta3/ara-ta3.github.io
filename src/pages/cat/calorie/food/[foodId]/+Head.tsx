import React from "react";
import { usePageContext } from "vike-react/usePageContext";
import FoodMaster from "../../../../../domains/cats/FoodMaster";
import { getFoodDisplayName } from "../../../../../domains/cats/Food";

const Head: React.FC = () => {
  const pageContext = usePageContext();
  const foodId = pageContext.routeParams?.foodId;

  let title = "猫のカロリー計算 | ara-ta3の物置";
  let description = "愛猫に必要なカロリーを計算できるツールです。";

  if (foodId) {
    const food = FoodMaster.find((f) => f.id === Number(foodId));
    if (food) {
      const foodName = getFoodDisplayName(food);
      title = `${foodName} のカロリー計算 | 猫のカロリー計算`;
      description = `【${foodName}】を計算に含めて、愛猫に最適な1日の食事量とカロリーを正確に計算。健康管理に役立つツールです。`;
    }
  }

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`https://ara-ta3.github.io/cat/calorie/food/${foodId}/`}
      />
    </>
  );
};

export default Head;
