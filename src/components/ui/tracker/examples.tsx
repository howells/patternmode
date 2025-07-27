import React from "react";
import { Tracker } from "./tracker";

export function TrackerExample() {
  return (
    <Tracker data={[
      { color: "bg-emerald-500", tooltip: "Step 1: Completed" },
      { color: "bg-blue-500", tooltip: "Step 2: In Progress" },
      { color: "bg-zinc-300", tooltip: "Step 3: Pending" }
    ]} />
  );
}