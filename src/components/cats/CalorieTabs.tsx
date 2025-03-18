import React, { useState, useEffect } from "react";
import Caution from "./Caution.tsx";
import CalorieCalculator from "./CalorieCalculator.tsx";
import DryFoods from "./Foods.tsx";
import Reference from "./Reference.tsx";
import { Tabs } from "flowbite-react";
import useCatCalculator from "../../hooks/cats/useCatCalculator.ts";
import { FoodTransitionPlanner } from "../FoodTransitionPlanner";

export type TabName = "計算" | "対応フード" | "フード切り替え" | "参考";

interface CalorieTabsProps {
  defaultTab: TabName;
}

export const CalorieTabs: React.FC<CalorieTabsProps> = ({ defaultTab }) => {
  const state = useCatCalculator();
  const [activeTab, setActiveTab] = useState<TabName>(defaultTab);

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold my-4">猫のカロリー計算</h1>
        <Caution />
        <Tabs>
          <Tabs.Item
            active={activeTab === "計算"}
            title="計算"
            onClick={() => setActiveTab("計算")}
          >
            <CalorieCalculator
              props={state}
              onTransitionClick={() => setActiveTab("フード切り替え")}
            />
          </Tabs.Item>
          <Tabs.Item
            active={activeTab === "対応フード"}
            title="対応フード"
            onClick={() => setActiveTab("対応フード")}
          >
            <DryFoods />
          </Tabs.Item>
          <Tabs.Item
            active={activeTab === "フード切り替え"}
            title="フード切り替え"
            onClick={() => setActiveTab("フード切り替え")}
          >
            <FoodTransitionPlanner initialCalories={state.calculated?.der} />
          </Tabs.Item>
          <Tabs.Item
            active={activeTab === "参考"}
            title="参考"
            onClick={() => setActiveTab("参考")}
          >
            <Reference />
          </Tabs.Item>
        </Tabs>
      </div>
    </>
  );
}; 