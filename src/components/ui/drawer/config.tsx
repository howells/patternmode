import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { DrawerExample, DefaultExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "drawer",
  name: "Drawer",
  description: "A sliding panel that appears from the edge of the screen, typically used for navigation or additional content.",
  category: "overlay" as const,
  icon: "PanelLeftOpen",

  importStatement: `import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";`,
  componentId: "DrawerExample",
  props: [
    {
      name: "direction",
      type: "select", 
      options: ["left", "right", "top", "bottom"],
      defaultValue: "right",
      description: "Direction from which the drawer slides in."
    }
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic drawer sliding from the right.",
      code: jsxToString(<DefaultExample />)}
  ]
};