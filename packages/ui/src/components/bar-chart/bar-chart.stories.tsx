import * as React from "react";
import { BarChart } from "./component";

export const TestBarChart = () => (
  <BarChart
    data={[{ index: "index", categories: { category: "category" }, value: 1 }, { index: "index", categories: { category: "category" }, value: 2 }]}
    index="index"
    categories={["category"]}
    showLegend
    showXAxis
    showYAxis
    showGridLines
    showTooltip
    enableLegendSlider
  >
    Test BarChart
  </BarChart>
);
