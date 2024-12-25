import { Label, Radio } from "flowbite-react";
import React from "react";

const multipliers = [
  {
    name: "非活動的・肥満傾向",
    value: 1,
  },
  {
    name: "減量が必要",
    value: 0.8,
  },
  {
    name: "少し増量が必要",
    value: 1.2,
  },
  {
    name: "増量が必要",
    value: 1.4,
  },
];

export const MultiplierForm: React.FC<{
  current: number;
  setMultiplier: (m: number) => void;
}> = (props) => {
  return (
    <fieldset className="flex flex-col w-full">
      <legend className="text-sm mb-2 text-gray-500">係数</legend>
      {multipliers.map((m) => {
        return (
          <div key={m.name} className="w-full">
            <div className="flex items-center py-2 w-full">
              <Radio
                id={m.name}
                name={m.name}
                value={m.value}
                checked={m.value === props.current}
                onChange={(e) => props.setMultiplier(Number(e.target.value))}
              />
              <Label htmlFor={m.name} className="whitespace-nowrap mx-2">
                {m.name}({m.value})
              </Label>
            </div>
          </div>
        );
      })}
    </fieldset>
  );
};
