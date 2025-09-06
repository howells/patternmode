"use client";

import { useState } from "react";
import { Slider } from "./component";

export function DefaultExample() {
  return <Slider defaultValue={50} max={100} step={1} />;
}

export function RangeExample() {
  return <Slider defaultValue={[25, 75]} max={100} step={1} />;
}

export function WithValueExample() {
  const [value, setValue] = useState(50);

  return (
    <div className="space-y-4">
      <div>
        <div className="font-medium text-sm">Volume: {value}%</div>
        <Slider
          max={100}
          onValueChange={(newValue) =>
            setValue(Array.isArray(newValue) ? newValue[0] : newValue)
          }
          showValue
          step={10}
          value={value}
        />
      </div>
    </div>
  );
}

export function CustomRangeExample() {
  const [value, setValue] = useState(20);

  return (
    <div className="space-y-4">
      <div>
        <div className="font-medium text-sm">Temperature: {value}°C</div>
        <Slider
          max={40}
          min={-10}
          onValueChange={(newValue) =>
            setValue(Array.isArray(newValue) ? newValue[0] : newValue)
          }
          showValue
          step={1}
          value={value}
          valueFormatter={(val) => `${val}°C`}
        />
      </div>
    </div>
  );
}

export function DisabledExample() {
  return <Slider defaultValue={30} disabled max={100} />;
}

export function VerticalExample() {
  const [value, setValue] = useState(40);

  return (
    <div className="flex h-64 items-center">
      <Slider
        max={100}
        min={0}
        onValueChange={(newValue) =>
          setValue(Array.isArray(newValue) ? newValue[0] : newValue)
        }
        orientation="vertical"
        showValue
        step={1}
        value={value}
      />
    </div>
  );
}
