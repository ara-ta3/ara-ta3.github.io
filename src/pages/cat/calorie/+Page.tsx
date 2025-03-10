import React from "react";
import Caution from "../../../components/cats/Caution.tsx";
import CalorieCalculator from "../../../components/cats/CalorieCalculator.tsx";

import DryFoods from "../../../components/cats/Foods.tsx";
import Reference from "../../../components/cats/Reference.tsx";
import { Tabs } from "flowbite-react";
import useCatCalculator from "../../../hooks/cats/useCatCalculator.ts";
import { FoodTransitionPlanner } from "../../../components/FoodTransitionPlanner";

const CatCalorie: React.FC = () => {
  const state = useCatCalculator();
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold my-4">猫のカロリー計算</h1>
        <Caution />
        <Tabs variant="default">
          <Tabs.Item title="計算">
            <CalorieCalculator props={state} />
          </Tabs.Item>
          <Tabs.Item title="フード切り替え">
            <FoodTransitionPlanner />
          </Tabs.Item>
          <Tabs.Item title="対応フード">
            <DryFoods />
          </Tabs.Item>
          <Tabs.Item title="参考">
            <Reference />
          </Tabs.Item>
        </Tabs>
      </div>
    </>
  );
};

export default CatCalorie;
