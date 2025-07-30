import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { DefaultExample, CardExample, ListExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "skeleton",
  name: "Skeleton",
  description: "Use to show a placeholder while content is loading.",
  category: "feedback" as const,
  icon: "Loader",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import { Skeleton } from "@/components/ui/skeleton/skeleton";`,
  props: [
  ],
  examples: [
    {
      id: "default",
      title: "Basic Skeleton",
      description: "A simple skeleton loader",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "card",
      title: "Card Skeleton",
      description: "Skeleton for a card component",
      code: jsxToString(<CardExample />),
    },
    {
      id: "list",
      title: "List Skeleton",
      description: "Skeleton for a list of items",
      code: jsxToString(<ListExample />),
    },
  ]
};