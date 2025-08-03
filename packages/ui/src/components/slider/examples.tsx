"use client";

import React, { useState } from "react";
import { Slider } from "./component";

export function DefaultExample() {
  return <Slider defaultValue={[50]} max={100} step={1} />;
}

export function RangeExample() {
  return <Slider defaultValue={[25, 75]} max={100} step={1} />;
}

export function WithValueExample() {
  const [value, setValue] = useState([50]);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">
          Volume: {value[0]}%
        </label>
        <Slider
          value={value}
          onValueChange={(newValue) => setValue(Array.isArray(newValue) ? newValue : [newValue])}
          max={100}
          step={10}
          showValue
        />
      </div>
    </div>
  );
}

export function CustomRangeExample() {
  const [value, setValue] = useState([20]);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">
          Temperature: {value[0]}°C
        </label>
        <Slider
          value={value}
          onValueChange={(newValue) => setValue(Array.isArray(newValue) ? newValue : [newValue])}
          min={-10}
          max={40}
          step={1}
          showValue
          valueFormatter={val => `${val}°C`}
        />
      </div>
    </div>
  );
}

export function DisabledExample() {
  return <Slider defaultValue={[30]} max={100} disabled />;
}

export function VerticalExample() {
  const [value, setValue] = useState([40]);

  return (
    <div className="h-64 flex items-center">
      <Slider
        value={value}
        onValueChange={(newValue) => setValue(Array.isArray(newValue) ? newValue : [newValue])}
        min={0}
        max={100}
        step={1}
        orientation="vertical"
        showValue
      />
    </div>
  );
}
