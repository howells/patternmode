"use client";

import type { ComponentExample } from "../../../lib/component-config-types";
import { DonutChart } from "@patternmode/ui";

import React, { useState } from "react";

// Default donut chart
export const DefaultExample = () => {
  const data = [
    { name: "Chrome", value: 61.04 },
    { name: "Safari", value: 24.57 },
    { name: "Edge", value: 5.29 },
    { name: "Firefox", value: 5.83 },
    { name: "Other", value: 3.27 },
  ];

  return (
    <DonutChart
      data={data}
      category="name"
      value="value"
      valueFormatter={value => `${value}%`}
    />
  );
};

// Pie variant
export const PieVariantExample = () => {
  const data = [
    { segment: "Desktop", users: 2400 },
    { segment: "Mobile", users: 1800 },
    { segment: "Tablet", users: 600 },
  ];

  return (
    <DonutChart
      data={data}
      category="segment"
      value="users"
      variant="pie"
      colors={["blue", "emerald", "amber"]}
      valueFormatter={value => `${value.toLocaleString()} users`}
    />
  );
};

// With center label
export const WithLabelExample = () => {
  const data = [
    { category: "Revenue", amount: 45000 },
    { category: "Costs", amount: 32000 },
    { category: "Profit", amount: 13000 },
  ];

  return (
    <DonutChart
      data={data}
      category="category"
      value="amount"
      showLabel
      valueFormatter={value => `$${(value / 1000).toFixed(0)}K`}
    />
  );
};

// Custom colors
export const CustomColorsExample = () => {
  const data = [
    { status: "Completed", count: 120 },
    { status: "In Progress", count: 45 },
    { status: "Pending", count: 30 },
    { status: "Cancelled", count: 15 },
  ];

  return (
    <DonutChart
      data={data}
      category="status"
      value="count"
      colors={["emerald", "blue", "amber", "pink"]}
      valueFormatter={value => `${value} tasks`}
    />
  );
};

// Interactive
export const InteractiveExample = () => {
  const [selectedSegment, setSelectedSegment] = useState<any>(null);
  const data = [
    { department: "Engineering", budget: 250000 },
    { department: "Marketing", budget: 150000 },
    { department: "Sales", budget: 180000 },
    { department: "Support", budget: 80000 },
  ];

  return (
    <div className="space-y-4">
      <DonutChart
        data={data}
        category="department"
        value="budget"
        showLabel
        onValueChange={setSelectedSegment}
        valueFormatter={value => `$${(value / 1000).toFixed(0)}K`}
      />
      {selectedSegment && (
        <div className="text-sm text-zinc-600">
          Selected:
          {" "}
          {selectedSegment.categoryClicked}
          {" "}
          -
          $
          {(selectedSegment.budget / 1000).toFixed(0)}
          K
        </div>
      )}
    </div>
  );
};

// Small size
export const SmallSizeExample = () => {
  const data = [
    { type: "Success", value: 85 },
    { type: "Warning", value: 10 },
    { type: "Error", value: 5 },
  ];

  return (
    <DonutChart
      data={data}
      category="type"
      value="value"
      className="h-24 w-24"
      showLabel
      colors={["emerald", "amber", "pink"]}
      valueFormatter={value => `${value}%`}
    />
  );
};

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "DefaultExample",
    title: "Default",
    description: "Basic usage example",
    component: DefaultExample,
  },
  {
    id: "PieVariantExample",
    title: "Pie Variant",
    description: "Pie Variant example",
    component: PieVariantExample,
  },
  {
    id: "WithLabelExample",
    title: "With Label",
    description: "With Label example",
    component: WithLabelExample,
  },
  {
    id: "CustomColorsExample",
    title: "Custom Colors",
    description: "Custom Colors example",
    component: CustomColorsExample,
  },
  {
    id: "InteractiveExample",
    title: "Interactive",
    description: "Interactive example",
    component: InteractiveExample,
  },
  {
    id: "SmallSizeExample",
    title: "Small Size",
    description: "Small Size example",
    component: SmallSizeExample,
  },
];
