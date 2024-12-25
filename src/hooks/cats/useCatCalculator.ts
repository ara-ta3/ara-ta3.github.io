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
  calculateTargets: CalculateTarget[];
  setCalculateTargets: (v: CalculateTarget[]) => void;
}

export interface CatCalculatedResultState {
  rer: number;
  der: number;
  simpleRer: number;
}

export interface CalculateTarget {
  foodId: number;
  grams: number;
}

export default function (): CatCalculatorState {
  const { weight, setWeight } = useWeight();
  const { multiplier, setMultiplier } = useMultiplier();
  const [calculated, setCalculated] = useState<CatCalculatedResultState | null>(
    null
  );
  const [targets, setTargets] = useState<CalculateTarget[]>([]);

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
    setCalculateTargets: setTargets,
  };
}
