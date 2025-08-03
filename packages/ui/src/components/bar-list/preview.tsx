"use client";

import React from "react";
import { BarList } from "./component";

const previewData = [
  { name: "Product A", value: 4000 },
  { name: "Product B", value: 3200 },
  { name: "Product C", value: 2800 },
  { name: "Product D", value: 1900 },
  { name: "Product E", value: 1200 },
];

export const BarListExample = () => (
  <div className="p-8">
    <BarList
      data={previewData}
      valueFormatter={value => `$${value.toLocaleString()}`}
      showAnimation={true}
    />
  </div>
);

export default BarListExample;
