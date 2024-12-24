import React, { useState } from "react";
import Header from "../components/Header.tsx";
import Caution from "../components/cats/Caution.tsx";
import CalorieCalculator from "../components/cats/CalorieCalculator.tsx";

import DryFoods from "../components/cats/DryFoods.tsx";
import Reference from "../components/cats/Reference.tsx";
import { Tabs } from "flowbite-react";

const CatCalorie: React.FC = () => {
  const [results, setResults] = useState<{
    rer: number;
    simpleRER: number;
    der: number;
  } | null>(null);

  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold my-4">猫のカロリー計算</h1>
          <Caution />
          <Tabs variant="default">
            <Tabs.Item title="計算">
              <CalorieCalculator results={results} setResults={setResults} />
            </Tabs.Item>
            <Tabs.Item title="ドライフード">
              <DryFoods der={results?.der ?? 0} />
            </Tabs.Item>
            <Tabs.Item title="参考">
              <Reference />
            </Tabs.Item>
          </Tabs>
        </div>
      </main>
    </>
  );
};

export default CatCalorie;
