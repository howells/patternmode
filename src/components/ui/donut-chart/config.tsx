import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { DonutChartExample, DefaultExample, PieVariantExample, WithLabelExample, CustomColorsExample, InteractiveExample, SmallSizeExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "donut-chart",
  name: "Donut Chart",
  description: "A circular chart that displays data as segments of a donut or pie, perfect for showing proportional data.",
  category: "charts" as const,
  icon: "PieChart",

  importStatement: `import { DonutChart } from "@/components/ui/donut-chart";`,
  componentId: "DonutChartExample",
  props: [
    {
      name: "variant",
      type: "select",
      options: ["donut", "pie"],
      defaultValue: "donut",
      description: "The chart variant - donut has a hollow center, pie is solid."
    },
    {
      name: "showLabel",
      type: "boolean",
      defaultValue: false,
      description: "Whether to show the total value label in the center of donut charts."
    },
    {
      name: "showTooltip",
      type: "boolean",
      defaultValue: true,
      description: "Whether to show tooltips on hover."
    },
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic donut chart showing data segments.",
      code: jsxToString(<DefaultExample />),, value: 61.04 },
  { name: "Safari", value: 24.57 },
  { name: "Edge", value: 5.29 },
  { name: "Firefox", value: 5.83 },
  { name: "Other", value: 3.27 },
];

<DonutChart
  data={data}
  category="name"
  value="value"
  valueFormatter={(value) => \`\${value}%\`}
/>`
    },
    {
      id: "pie-variant",
      title: "Pie Chart",
      description: "Solid pie chart without hollow center.",
      code: jsxToString(<PieVariantExample />),, users: 2400 },
  { segment: "Mobile", users: 1800 },
  { segment: "Tablet", users: 600 },
];

<DonutChart
  data={data}
  category="segment"
  value="users"
  variant="pie"
  colors={["blue", "emerald", "amber"]}
  valueFormatter={(value) => \`\${value.toLocaleString()} users\`}
/>`
    },
    {
      id: "with-label",
      title: "With Center Label",
      description: "Donut chart with total value displayed in center.",
      code: jsxToString(<WithLabelExample />),, amount: 45000 },
  { category: "Costs", amount: 32000 },
  { category: "Profit", amount: 13000 },
];

<DonutChart
  data={data}
  category="category"
  value="amount"
  showLabel
  valueFormatter={(value) => \`$\${(value / 1000).toFixed(0)}K\`}
/>`
    },
    {
      id: "custom-colors",
      title: "Custom Colors",
      description: "Donut chart with custom color scheme.",
      code: jsxToString(<CustomColorsExample />),, count: 120 },
  { status: "In Progress", count: 45 },
  { status: "Pending", count: 30 },
  { status: "Cancelled", count: 15 },
];

<DonutChart
  data={data}
  category="status"
  value="count"
  colors={["emerald", "blue", "amber", "red"]}
  valueFormatter={(value) => \`\${value} tasks\`}
/>`
    },
    {
      id: "interactive",
      title: "Interactive",
      description: "Clickable donut chart with selection state.",
      code: jsxToString(<InteractiveExample />),, budget: 250000 },
  { department: "Marketing", budget: 150000 },
  { department: "Sales", budget: 180000 },
  { department: "Support", budget: 80000 },
];

<div className="space-y-4">
  <DonutChart
    data={data}
    category="department"
    value="budget"
    showLabel
    onValueChange={setSelectedSegment}
    valueFormatter={(value) => \`$\${(value / 1000).toFixed(0)}K\`}
  />
  {selectedSegment && (
    <div className="text-sm text-zinc-600">
      Selected: {selectedSegment.categoryClicked} - 
      $\{(selectedSegment.budget / 1000).toFixed(0)}K
    </div>
  )}
</div>`
    },
    {
      id: "small-size",
      title: "Small Size",
      description: "Compact donut chart for dashboard widgets.",
      code: jsxToString(<SmallSizeExample />),, value: 85 },
  { type: "Warning", value: 10 },
  { type: "Error", value: 5 },
];

<DonutChart
  data={data}
  category="type"
  value="value"
  className="h-24 w-24"
  showLabel
  colors={["emerald", "amber", "red"]}
  valueFormatter={(value) => \`\${value}%\`}
/>`
    },
  ]
};