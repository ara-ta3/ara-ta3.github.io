import React, { useState } from "react";
import Header from "../components/Header.tsx";
import Caution from "../components/cats/Caution.tsx";
import CalorieCalculator from "../components/cats/CalorieCalculator.tsx";

import DryFoods from "../components/cats/DryFoods.tsx";
import Reference from "../components/cats/Reference.tsx";

const CatCalorie: React.FC = () => {
  const [results, setResults] = useState<{ rer: number; der: number } | null>(
    null,
  );

  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold my-4">猫のカロリー計算</h1>
          <Caution />
          <div className="grid grid-cols-2">
            <div className="flex items-center justify-center">
              <CalorieCalculator results={results} setResults={setResults} />
            </div>
            <div className="bg-blue-100 flex items-center justify-center">
              <CalorieCalculator results={results} setResults={setResults} />
            </div>
          </div>
          <div>
            <DryFoods der={results?.der ?? 0} />
          </div>
          <div>
            <Reference />
          </div>
        </div>
      </main>
    </>
  );
};

export default CatCalorie;
