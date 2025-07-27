import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { ScrollAreaExample, DefaultExample, HorizontalExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "scroll-area",
  name: "Scroll Area",
  description:
    "Augments native scroll functionality for custom, cross-browser styling.",
  category: "utility" as const,
  icon: "ScrollText",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import { ScrollArea } from "@/components/ui/scroll-area/scroll-area";`,
  componentId: "ScrollAreaExample",
  props: [
  ],
  examples: [
    {
      id: "default",
      title: "Basic Scroll Area",
      description: "A scrollable container with custom scrollbar",
      code: jsxToString(<DefaultExample />),},
    {
      id: "horizontal",
      title: "Horizontal Scroll",
      description: "A horizontally scrollable area",
      code: jsxToString(<HorizontalExample />),},
  ]
};
