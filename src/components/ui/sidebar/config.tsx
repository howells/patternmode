import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { DefaultExample, WithSubmenuExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "sidebar",
  name: "Sidebar",
  description:
    "A versatile sidebar component for navigation and content organization.",
  category: "navigation" as const,
  icon: "PanelLeft",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarToggle,
  SidebarDivider
} from "@/components/ui/sidebar/sidebar";`,
  props: [],
  examples: [
    {
      id: "default",
      title: "Basic Sidebar",
      description: "A simple sidebar with navigation items",
      code: jsxToString(<DefaultExample />),},
    {
      id: "with-submenu",
      title: "Sidebar with Submenu",
      description: "Sidebar with nested menu items",
      code: jsxToString(<WithSubmenuExample />),},
  ]
};
