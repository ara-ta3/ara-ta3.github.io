import { useEffect, useState } from "react";

export default function () {
  const [weight, setWeight] = useState<string>("");
  useEffect(() => {
    const s = localStorage.getItem("cat.weight");
    if (s) {
      setWeight(s);
    }
  }, []);

  return {
    weight,
    setWeight: (w: string) => {
      setWeight(w);
      localStorage.setItem("cat.weight", w);
    },
  };
}
