import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { MenuBarExample, DefaultExample, WithIconsExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "menu-bar",
  name: "Menu Bar",
  description: "A horizontal menu bar containing multiple dropdown menus.",
  category: "navigation" as const,
  icon: "Menu",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import {
  MenuBar,
  MenuBarContent,
  MenuBarItem,
  MenuBarMenu,
  MenuBarTrigger
} from "@/components/ui/menu-bar/menu-bar";`,
  componentId: "MenuBarExample",
  props: [],
  examples: [
    {
      id: "default",
      title: "Basic Menu Bar",
      description: "A horizontal menu bar containing multiple dropdown menus.",
      code: jsxToString(<DefaultExample />),},
    {
      id: "with-icons",
      title: "Menu Bar with Icons",
      description: "Menu bar with icons in menu items",
      code: jsxToString(<WithIconsExample />),},
  ]
};