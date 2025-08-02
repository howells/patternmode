"use client";

import type { ComponentExample } from "../../../lib/component-config-types";
import { Tracker } from "@patternmode/ui";

import React from "react";

export const TrackerExample = () => (
  <Tracker data={[
    { color: "bg-emerald-500", tooltip: "Step 1: Completed" },
    { color: "bg-blue-500", tooltip: "Step 2: In Progress" },
    { color: "bg-zinc-300", tooltip: "Step 3: Pending" },
  ]}
  />
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

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "TrackerExample",
    title: "Tracker",
    description: "Tracker example",
    component: TrackerExample,
  },
  {
    id: "SystemStatusExample",
    title: "System Status",
    description: "System Status example",
    component: SystemStatusExample,
  },
  {
    id: "ProjectProgressExample",
    title: "Project Progress",
    description: "Project Progress example",
    component: ProjectProgressExample,
  },
];
