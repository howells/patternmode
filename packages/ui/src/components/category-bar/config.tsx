import type { ComponentConfig } from "../../lib/component-config-types";
import React from "react";
import { jsxToString } from "../../lib/jsx-to-string";
import { DefaultExample, ManyCategoriesExample, NoLabelsExample, UnevenDistributionExample, WithMarkerExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "category-bar",
  name: "CategoryBar",
  description:
    "A category bar chart component for displaying segmented data with optional labels and markers.",
  category: "charts" as const,
  icon: "Layers",

  importStatement: `import { CategoryBar } from "@/components/ui/category-bar";`,
  componentId: "CategoryBarExample",
  props: [
    {
      name: "values",
      type: "array",
      defaultValue: [40, 30, 20, 10],
      description: "Array of numeric values for each category segment.",
      required: true,
    },
    {
      name: "showLabels",
      type: "boolean",
      defaultValue: true,
      description: "Whether to show numeric labels above the bar.",
    },
    {
      name: "showMarker",
      type: "boolean",
      defaultValue: false,
      description: "Whether to show a marker indicator on the bar.",
    },
    {
      name: "markerValue",
      type: "number",
      defaultValue: 50,
      min: 0,
      max: 100,
      description: "The value position for the marker (when enabled).",
    },
    {
      name: "markerTooltip",
      type: "string",
      defaultValue: "Target: 50",
      description: "Tooltip text for the marker.",
    },
    {
      name: "showMarkerAnimation",
      type: "boolean",
      defaultValue: true,
      description: "Whether to animate marker position changes.",
    },
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic category bar with labels.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "with-marker",
      title: "With Marker",
      description: "Category bar with a target marker.",
      code: jsxToString(<WithMarkerExample />),
    },
    {
      id: "no-labels",
      title: "No Labels",
      description: "Category bar without numeric labels.",
      code: jsxToString(<NoLabelsExample />),
    },
    {
      id: "uneven-distribution",
      title: "Uneven Distribution",
      description: "Category bar with varying segment sizes.",
      code: jsxToString(<UnevenDistributionExample />),
    },
    {
      id: "many-categories",
      title: "Many Categories",
      description: "Category bar with multiple small segments.",
      code: jsxToString(<ManyCategoriesExample />),
    },
  ],
};
