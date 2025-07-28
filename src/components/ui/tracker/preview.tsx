import React from "react";
import { Tracker, type TrackerBlockProps } from "./tracker";

// Preview component for prop explorer system
export const TrackerExample = ({
  data = '[{"color":"bg-emerald-500","tooltip":"Step 1: Completed"},{"color":"bg-blue-500","tooltip":"Step 2: In Progress"},{"color":"bg-zinc-300","tooltip":"Step 3: Pending"}]',
  defaultBackgroundColor,
  hoverEffect,
  ...props
}: {
  data?: string | TrackerBlockProps[];
  defaultBackgroundColor?: string;
  hoverEffect?: boolean;
  [key: string]: unknown;
}) => {
  // Handle prop transformations - convert string to array if needed
  let trackerData: TrackerBlockProps[];
  
  if (typeof data === 'string') {
    try {
      trackerData = JSON.parse(data);
    } catch {
      trackerData = [
        { color: "bg-emerald-500", tooltip: "Step 1: Completed" },
        { color: "bg-blue-500", tooltip: "Step 2: In Progress" },
        { color: "bg-zinc-300", tooltip: "Step 3: Pending" }
      ];
    }
  } else if (Array.isArray(data)) {
    trackerData = data;
  } else {
    // Default data when no data is provided
    trackerData = [
      { color: "bg-emerald-500", tooltip: "Step 1: Completed" },
      { color: "bg-blue-500", tooltip: "Step 2: In Progress" },
      { color: "bg-zinc-300", tooltip: "Step 3: Pending" }
    ];
  }

  return (
    <Tracker 
      data={trackerData}
      defaultBackgroundColor={defaultBackgroundColor}
      hoverEffect={hoverEffect}
      {...props}
    />
  );
};