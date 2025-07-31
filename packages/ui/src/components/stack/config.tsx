import React from "react";
import type { ComponentConfig } from "../../lib/component-config-types";
import { jsxToString } from "../../lib/jsx-to-string";
import { AlignmentExample, CustomSpacingExample, DefaultExample, HorizontalExample, StackExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "stack",
  name: "Stack",
  description:
    "A layout component that arranges its children vertically or horizontally with consistent spacing.",
  category: "layout" as const,
  icon: "Layers",

  installation: {
    npm: "@base-ui-components/react",
  },
  importStatement: `import { Stack } from "@patternmode/ui";`,
  componentId: "StackExample",
  props: [
    {
      name: "direction",
      type: "select",
      description: "Stack direction",
      options: ["vertical", "horizontal"],
      defaultValue: "vertical",
    },
    {
      name: "spacing",
      type: "select",
      description: "Spacing between items",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    {
      name: "align",
      type: "select",
      description: "Alignment of items",
      options: ["start", "center", "end", "stretch"],
      defaultValue: "stretch",
    },
  ],
  examples: [
    {
      id: "default",
      title: "Vertical Stack",
      description: "Items stacked vertically with spacing",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "horizontal",
      title: "Horizontal Stack",
      description: "Items arranged horizontally",
      code: jsxToString(<HorizontalExample />),
    },
    {
      id: "custom-spacing",
      title: "Custom Spacing",
      description: "Stack with different spacing options",
      code: jsxToString(<CustomSpacingExample />),
    },
    {
      id: "alignment",
      title: "Different Alignments",
      description: "Stack with various alignment options",
      code: jsxToString(<AlignmentExample />),
    },
  ],
};
