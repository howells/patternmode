import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { DefaultExample, WithDividerExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "navbar",
  name: "Navbar",
  description: "A navigation bar component with branding, sections, and items.",
  category: "navigation" as const,
  icon: "Navigation",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import {
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarLabel,
  NavbarSection
} from "@/components/ui/navbar/navbar";`,
  componentId: "NavbarExample",
  props: [],
  examples: [
    {
      id: "default",
      title: "Basic Navbar",
      description: "A navigation bar component with branding, sections, and items.",
      code: jsxToString(<DefaultExample />)
    },
    {
      id: "with-divider",
      title: "Navbar with Divider",
      description: "Navigation bar with sections separated by dividers",
      code: jsxToString(<WithDividerExample />)
    },
  ]
};