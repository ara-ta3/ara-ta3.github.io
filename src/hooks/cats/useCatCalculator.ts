import { useEffect, useState } from "react";
import useWeight from "./useWeight";
import useMultiplier from "./useMultiplier";
import { CatCalorie } from "../../domains/Cat";

export interface CatCalculatorState {
  weight: string;
  setWeight: (w: string) => void;
  multiplier: number;
  setMultiplier: (w: number) => void;
  calculated: {
    rer: number;
    der: number;
    simpleRer: number;
  } | null;
  calculateTargets: CalculateTarget;
  addCalculateTarget: (key: FoodId) => void;
  chagneCalculateTargetGram: (key: FoodId, gramValue: number) => void;
}

export interface CatCalculatedResultState {
  rer: number;
  der: number;
  simpleRer: number;
}

export interface CalculateTarget {
  [key: FoodId]: { gram: number };
}

type FoodId = number;

function useCalculateTarget() {
  const [targets, setTargets] = useState<{ [key: FoodId]: { gram: number } }>(
    {}
  );

  const addTarget = (key: FoodId) => {
    setTargets((prev) => {
      if (key in prev) return prev;
      return { ...prev, [key]: { gram: 0 } };
    });
  };

  const changeGram = (key: FoodId, gramValue: number) => {
    setTargets((prev) => {
      const p = prev[key] ?? {};
      return {
        ...prev,
        [key]: { ...p, ["gram"]: gramValue },
      };
    });
  };

  return {
    targets,
    addTarget,
    changeGram,
  };
}

export default function (): CatCalculatorState {
  const { weight, setWeight } = useWeight();
  const { multiplier, setMultiplier } = useMultiplier();
  const [calculated, setCalculated] = useState<CatCalculatedResultState | null>(
    null
  );
  const { targets, addTarget, changeGram } = useCalculateTarget();

  useEffect(() => {
    const parsedWeight = parseFloat(weight);
    if (!isNaN(parsedWeight) && parsedWeight > 0 && multiplier > 0) {
      const r = new CatCalorie(parsedWeight);
      const rer = r.calculateRER();
      const simpleRer = r.calculateSimpleRER();
      const der = r.calculateDER(multiplier);
      setCalculated({ rer, simpleRer, der });
    } else {
      setCalculated(null);
    }
  }, [weight, multiplier]);

  return {
    weight,
    setWeight,
    multiplier,
    setMultiplier,
    calculated,
    calculateTargets: targets,
    addCalculateTarget: addTarget,
    chagneCalculateTargetGram: changeGram,
  };
}
