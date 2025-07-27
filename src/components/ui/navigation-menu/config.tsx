import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { NavigationMenuExample  } from "./examples";

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
      id: "navigation-menu",
      title: "Basic Navigation Menu",
      description: "A navigation menu component with dropdown support and smooth animations.",
      code: jsxToString(<NavigationMenuExample />)}
  ]
};