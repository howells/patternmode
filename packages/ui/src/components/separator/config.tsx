import type { ComponentConfig } from "../../lib/component-config-types";
import React from "react";
import { jsxToString } from "../../lib/jsx-to-string";
import {
  DefaultExample,
  SizesExample,
  VerticalExample,
  WithTextExample,
} from "./examples";

// Component configuration - single source of truth
export const componentConfig: ComponentConfig = {
  id: "separator",
  name: "Separator",
  description:
    "A visual separator component with optional text labels, built on Base UI's accessible Separator primitive.",
  category: "layout" as const,
  icon: "Minus",

  installation: {
    npm: "@base-ui-components/react",
  },
  importStatement: `import { Separator } from "@patternmode/ui";`,
  componentId: "SeparatorExample",

  // Props that users can experiment with
  props: [
    {
      name: "children",
      type: "string",
      description:
        "Optional text content to display in the center of the separator.",
    },
    {
      name: "orientation",
      type: "select",
      options: [
        { value: "horizontal", label: "Horizontal" },
        { value: "vertical", label: "Vertical" },
      ],
      defaultValue: "horizontal",
      description: "The orientation of the separator.",
    },
    {
      name: "variant",
      type: "select",
      options: [
        { value: "default", label: "Default" },
        { value: "subtle", label: "Subtle" },
        { value: "strong", label: "Strong" },
      ],
      defaultValue: "default",
      description: "The visual style variant.",
    },
    {
      name: "size",
      type: "select",
      options: [
        { value: "sm", label: "Small" },
        { value: "md", label: "Medium" },
        { value: "lg", label: "Large" },
      ],
      defaultValue: "md",
      description: "The thickness/size of the separator.",
    },
    {
      name: "spacing",
      type: "select",
      options: [
        { value: "none", label: "None" },
        { value: "sm", label: "Small" },
        { value: "md", label: "Medium" },
        { value: "lg", label: "Large" },
      ],
      defaultValue: "md",
      description:
        "Vertical spacing around the separator (when used with text).",
    },
  ],

  // Examples showcasing different use cases
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic horizontal separator.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "with-text",
      title: "With Text Label",
      description: "Separator with centered text label.",
      code: jsxToString(<WithTextExample />),
    },
    {
      id: "vertical",
      title: "Vertical",
      description: "Vertical separator for inline content.",
      code: jsxToString(<VerticalExample />),
    },
    {
      id: "sizes",
      title: "Sizes & Variants",
      description: "Different sizes and visual variants.",
      code: jsxToString(<SizesExample />),
    },
  ],
};
