import * as React from "react";
import { Tracker } from "./component";

export const TestTracker = () => (
  <Tracker 
    data={[
      { key: 1, color: "bg-blue-500", tooltip: "Step 1" },
      { key: 2, color: "bg-green-500", tooltip: "Step 2" },
      { key: 3, color: "bg-yellow-500", tooltip: "Step 3" }
    ]} 
  />
);
