import React from "react";
import { Tracker } from "./tracker";

export const TrackerExample = () => (
  <Tracker data={[
    { color: "bg-emerald-500", tooltip: "Step 1: Completed" },
    { color: "bg-blue-500", tooltip: "Step 2: In Progress" },
    { color: "bg-zinc-300", tooltip: "Step 3: Pending" }
  ]} />
);

export const SystemStatusExample = () => (
  <Tracker
    data={[
      { color: "bg-emerald-500", tooltip: "Healthy services: 95%" },
      { color: "bg-amber-500", tooltip: "Warning: 4%" },
      { color: "bg-red-500", tooltip: "Critical: 1%" },
    ]}
  />
);

export const ProjectProgressExample = () => (
  <Tracker
    data={[
      { color: "bg-emerald-500", tooltip: "Completed tasks: 85%" },
      { color: "bg-blue-500", tooltip: "In progress: 10%" },
      { color: "bg-amber-500", tooltip: "Pending review: 3%" },
      { color: "bg-red-500", tooltip: "Failed: 2%" },
    ]}
    hoverEffect
  />
);