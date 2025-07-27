import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { ResponsiveDrawerExample, DefaultExample, WithFormExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "responsive-drawer",
  name: "Responsive Drawer",
  description:
    "A drawer component that adapts to different screen sizes, showing as a sheet on mobile and a dialog on desktop.",
  category: "overlay" as const,
  icon: "PanelLeft",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import {
  ResponsiveDrawer,
  ResponsiveDrawerContent,
  ResponsiveDrawerDescription,
  ResponsiveDrawerHeader,
  ResponsiveDrawerTitle,
  ResponsiveDrawerTrigger
} from "@/components/ui/responsive-drawer/responsive-drawer";`,
  componentId: "ResponsiveDrawerExample",
  props: [
    {
      name: "open",
      type: "boolean",
      description: "Whether the drawer is open",
      defaultValue: false
    },
  ],
  examples: [
    {
      id: "default",
      title: "Basic Responsive Drawer",
      description: "A drawer that adapts to screen size",
      code: jsxToString(<DefaultExample />),},
    {
      id: "with-form",
      title: "Responsive Drawer with Form",
      description: "A responsive drawer containing a form",
      code: jsxToString(<WithFormExample />),},
  ]
};
