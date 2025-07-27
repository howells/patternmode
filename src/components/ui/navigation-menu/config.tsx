import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { NavigationMenuExample, DefaultExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "navigation-menu",
  name: "Navigation Menu",
  description: "A navigation menu component with dropdown support and smooth animations.",
  category: "navigation" as const,
  icon: "Navigation2",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu/navigation-menu";`,
  componentId: "NavigationMenuExample",
  props: [
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "A navigation menu component with dropdown support and smooth animations.",
      code: jsxToString(<DefaultExample />)}
  ]
};