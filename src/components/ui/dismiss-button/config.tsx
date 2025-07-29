import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { DismissButtonExample, DefaultExample, SizesExample, PositionedExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "dismiss-button",
  name: "Dismiss Button",
  description: "A reusable dismiss/remove button with consistent styling.",
  category: "utility" as const,
  icon: "X",

  installation: {
    npm: "lucide-react",
  },
  importStatement: `import { DismissButton } from "@/components/ui/dismiss-button/dismiss-button";`,
  props: [
    {
      name: "size",
      type: "select",
      description: "Size of the dismiss button",
      options: ["sm", "base", "lg"],
      defaultValue: "base",
    },
    {
      name: "onClick",
      type: "function",
      description: "Callback when the dismiss button is clicked",
      defaultValue: "() => {}",
    },
  ],
  examples: [
    {
      id: "default",
      title: "Basic Dismiss Button",
      description: "Simple dismiss button with default styling",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "sizes",
      title: "Different Sizes",
      description: "Dismiss buttons in various sizes",
      code: jsxToString(<SizesExample />),
    },
    {
      id: "positioned",
      title: "Positioned in Context",
      description: "Dismiss buttons with negative margins for tight spacing",
      code: jsxToString(<PositionedExample />),
    },
  ],
};
