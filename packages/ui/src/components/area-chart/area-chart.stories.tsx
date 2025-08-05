import * as React from "react";
import { AreaChart } from "./component";

export const TestAreaChart = () => (
  <AreaChart
    data={[{ index: "index", categories: { category: "category" }, value: 1 }]}
    index="index"
    categories={["category"]}
  >
    Test AreaChart
  </AreaChart>
);
