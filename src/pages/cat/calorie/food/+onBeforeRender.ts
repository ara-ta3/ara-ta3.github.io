import { PageContext } from "vike/types";
import FoodMaster from "../../../../domains/cats/FoodMaster";
import { getFoodDisplayName } from "../../../../domains/cats/Food";

export async function onBeforeRender(pageContext: PageContext) {
  const foodId = parseInt(pageContext.routeParams?.foodId);

  let title = "猫のカロリー計算 | ara-ta3の物置";
  let description = "愛猫に必要なカロリーを計算できるツールです。";

  if (!isNaN(foodId)) {
    const food = FoodMaster.find((f) => f.id === foodId);
    if (food) {
      const foodName = getFoodDisplayName(food);
      title = `${foodName} のカロリー計算 | 猫のカロリー計算`;
      description = `【${foodName}】を計算に含めて、愛猫に最適な1日の食事量とカロリーを正確に計算。健康管理に役立つツールです。`;
    }
  }

  return {
    pageContext: {
      data: { foodId, title, description },
    },
  };
}

export interface PageData {
  foodId: number;
  title: string;
  description: string;
}
