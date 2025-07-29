import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { DefaultExample, SmallExample, LargeExample, WithLabelExample, IndeterminateExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "progress-circle",
  name: "Progress Circle",
  description: "A circular progress indicator showing completion percentage.",
  category: "feedback" as const,
  icon: "Loader",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import { ProgressCircle } from "@/components/ui/progress-circle/progress-circle";`,
  props: [
    {
      name: "value",
      type: "number",
      description: "The progress value (0-100)",
      defaultValue: 50
    },
    {
      name: "size",
      type: "select",
      description: "Size of the progress circle",
      options: ["sm", "md", "lg"],
      defaultValue: "md"
    },
    {
      name: "showLabel",
      type: "boolean",
      description: "Whether to show the percentage label",
      defaultValue: false
    },
    {
      name: "indeterminate",
      type: "boolean",
      description: "Whether the progress is indeterminate",
      defaultValue: false
    },
  ],
  examples: [
    {
      id: "default",
      title: "Basic Progress Circle",
      description: "A circular progress indicator showing completion percentage.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "small",
      title: "Small Progress Circle",
      description: "A smaller circular progress indicator",
      code: jsxToString(<SmallExample />),
    },
    {
      id: "large",
      title: "Large Progress Circle",
      description: "A larger circular progress indicator",
      code: jsxToString(<LargeExample />),
    },
    {
      id: "with-label",
      title: "Progress Circle with Label",
      description: "Circular progress with text label",
      code: jsxToString(<WithLabelExample />),
    },
    {
      id: "indeterminate",
      title: "Indeterminate Progress Circle",
      description: "Circular progress in loading state",
      code: jsxToString(<IndeterminateExample />),
    },
  ]
};