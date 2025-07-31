import React from "react";
import type { ComponentConfig } from "../../lib/component-config-types";
import { jsxToString } from "../../lib/jsx-to-string";
import { DefaultExample, DividerExample, SpacingExample, VerticalExample, WithTextExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "divider",
  name: "Divider",
  description: "A divider component that visually separates content with optional text label.",
  category: "layout" as const,
  icon: "Minus",

  importStatement: `import { Divider } from "@/components/ui/divider";`,
  componentId: "DividerExample",
  props: [
    {
      name: "orientation",
      type: "select",
      options: ["horizontal", "vertical"],
      defaultValue: "horizontal",
      description: "The orientation of the divider."
    },
    {
      name: "spacing",
      type: "select",
      options: ["sm", "md", "lg"],
      defaultValue: "md",
      description: "The spacing around the divider."
    },
    {
      name: "children",
      type: "string",
      description: "Optional text label to display in the center of the divider."
    }
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic horizontal divider.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "with-text",
      title: "With Text",
      description: "Divider with text label in the center.",
      code: jsxToString(<WithTextExample />)},
    {
      id: "vertical",
      title: "Vertical",
      description: "Vertical divider for separating inline content.",
      code: jsxToString(<VerticalExample />)},
    {
      id: "spacing",
      title: "Spacing",
      description: "Different spacing options.",
      code: jsxToString(<SpacingExample />)}
  ]
};