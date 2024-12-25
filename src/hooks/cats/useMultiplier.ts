import { useEffect, useState } from "react";

export default function () {
  const [multiplier, setMultiplier] = useState<number>(1);
  useEffect(() => {
    const m = parseFloat(localStorage.getItem("cat.multiplier") ?? "");
    if (!isNaN(m)) {
      setMultiplier(m);
    }
  }, []);

  return {
    multiplier,
    setMultiplier: (m: number) => {
      setMultiplier(m);
      localStorage.setItem("cat.multiplier", m.toString());
    },
  };
}
