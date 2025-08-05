import * as React from "react";
import { DonutChart } from "./component";

export const TestDonutChart = () => (
  <DonutChart
    data={[{ category: "category", value: 1 }]}
    category="category"
    value="value"
    colors={["blue", "emerald", "violet", "amber", "gray", "cyan", "pink", "lime", "fuchsia"]}
  >
    Test DonutChart
  </DonutChart>
);
