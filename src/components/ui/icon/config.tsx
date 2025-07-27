import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import {
  DefaultExample,
  SizesExample,
  WithTextExample,
  CustomStrokeExample,
  LayoutExample,
} from "./examples";

export const componentConfig: ComponentConfig = {
  id: "icon",
  name: "Icon",
  description:
    "Centralized icon component that provides consistent sizing and styling across all UI components. Built for Lucide React icons with automatic sizing based on context.",
  category: "utility" as const,
  icon: "Star",

  installation: {
    npm: "lucide-react",
  },
  importStatement: `import { Icon } from "@/components/ui/icon";`,
  componentId: "IconExample",
  props: [
    {
      name: "icon",
      type: "component",
      required: true,
      description: "The Lucide icon component to render.",
    },
    {
      name: "size",
      type: "select",
      options: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl"],
      defaultValue: "base",
      description:
        "Size of the icon. xs=12px, sm=14px, base=16px, lg=20px, xl=24px, 2xl=32px, 3xl=48px.",
    },
    {
      name: "strokeWidth",
      type: "number",
      defaultValue: "1.5",
      description: "Stroke width for the icon (defaults to global config).",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to apply to the icon.",
    },
  ],
  examples: [
    {
      id: "default",
      title: "Default Icon",
      description: "Basic icon with default size and stroke width.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "sizes",
      title: "Different Sizes",
      description: "Icons in all available sizes from xs (12px) to 3xl (48px).",
      code: jsxToString(<SizesExample />),
    },
    {
      id: "with-text",
      title: "Icons with Text",
      description:
        "Icons paired with text using flex layout and gap for proper spacing.",
      code: jsxToString(<WithTextExample />),
    },
    {
      id: "custom-stroke",
      title: "Custom Stroke Width",
      description: "Icons with different stroke widths for visual variety.",
      code: jsxToString(<CustomStrokeExample />),
    },
    {
      id: "layout",
      title: "Layout Examples",
      description:
        "Different ways to handle spacing and layout with icons - using flex gap, margins, and different gap sizes.",
      code: jsxToString(<LayoutExample />),
    },
  ],
};
