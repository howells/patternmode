"use client";

import React from "react";
import { ComboChart } from "./component";

export const ComboChartExample = () => {
  const data = [
    { month: "Jan", revenue: 4000, users: 240 },
    { month: "Feb", revenue: 3000, users: 139 },
    { month: "Mar", revenue: 2000, users: 380 },
    { month: "Apr", revenue: 2780, users: 309 },
    { month: "May", revenue: 1890, users: 400 },
    { month: "Jun", revenue: 2390, users: 280 },
  ];

  return (
    <ComboChart
      data={data}
      index="month"
      barSeries={{
        categories: ["revenue"],
        colors: ["blue"],
        valueFormatter: value => `$${value}`,
      }}
      lineSeries={{
        categories: ["users"],
        colors: ["emerald"],
        valueFormatter: value => `${value}`,
      }}
    />
  );
};

export default ComboChartExample;
