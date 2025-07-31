import type { ComponentConfig } from "../../lib/component-config-types";
import React from "react";
import { jsxToString } from "../../lib/jsx-to-string";
import { DefaultExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "responsive-drawer",
  name: "Responsive Drawer",
  description:
    "A drawer component that adapts to different screen sizes, showing as a sheet on mobile and a dialog on desktop.",
  category: "overlay" as const,
  componentId: "responsive-drawer",
  icon: "PanelLeft",

  installation: {
    npm: "@base-ui-components/react",
  },
  importStatement: `import {
  ResponsiveDrawer,
  ResponsiveDrawerBody,
  ResponsiveDrawerClose,
  ResponsiveDrawerContent,
  ResponsiveDrawerDescription,
  ResponsiveDrawerFooter,
  ResponsiveDrawerHeader,
  ResponsiveDrawerTitle,
  ResponsiveDrawerTrigger
} from "@patternmode/ui";`,
  props: [
    {
      name: "open",
      type: "boolean",
      description: "Whether the drawer is open",
      defaultValue: false,
    },
  ],
  examples: [
    {
      id: "default",
      title: "Basic Responsive Drawer",
      description: "A drawer that adapts to screen size",
      code: jsxToString(<DefaultExample />),
    },
  ],
};
