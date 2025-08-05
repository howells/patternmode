import * as React from "react";
import { ComboChart } from "./component";

export const TestComboChart = () => (
  <ComboChart
    data={[{ index: "index", categories: { category: "category" }, value: 1 }]}
    index="index"
    barSeries={{ categories: ["category"], colors: ["blue", "emerald", "violet", "amber", "gray", "cyan", "pink", "lime", "fuchsia"] }}
    lineSeries={{ categories: ["category"], colors: ["blue", "emerald", "violet", "amber", "gray", "cyan", "pink", "lime", "fuchsia"] }}
    showLegend
    showXAxis
    showGridLines
    showTooltip
    enableLegendSlider
  >Test ComboChart</ComboChart>
);
