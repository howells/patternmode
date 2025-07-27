import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { SheetExample, DefaultExample, SidesExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "sheet",
  name: "Sheet",
  description:
    "Extends the Dialog component to display content that complements the main content of the screen.",
  category: "overlay" as const,
  icon: "Sheet",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet/sheet";`,
  componentId: "SheetExample",
  props: [
    {
      name: "side",
      type: "select",
      description: "The side of the screen the sheet appears from",
      options: ["top", "right", "bottom", "left"],
      defaultValue: "right"
    },
  ],
  examples: [
    {
      id: "default",
      title: "Basic Sheet",
      description: "A sheet that slides in from the right",
      code: jsxToString(<DefaultExample />),},
    {
      id: "sides",
      title: "Sheet Sides",
      description: "Sheets from different sides",
      code: jsxToString(<SidesExample />),},
  ]
};
