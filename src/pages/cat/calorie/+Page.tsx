import React, { useState } from "react";
import Caution from "../../../components/cats/Caution.tsx";
import CalorieCalculator from "../../../components/cats/CalorieCalculator.tsx";

import DryFoods from "../../../components/cats/DryFoods.tsx";

const CatCalorie: React.FC = () => {
  const [results, setResults] = useState<{ rer: number; der: number } | null>(
    null,
  );

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold my-4">猫のカロリー計算</h1>
        <Caution />
        <CalorieCalculator results={results} setResults={setResults} />
        <h1 className="text-2xl font-bold my-4 ">ドライフード</h1>
        <DryFoods der={results?.der ?? 0} />
      </div>
    </>
  );
};

export default CatCalorie;
