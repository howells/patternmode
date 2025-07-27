import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { DefaultExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "table",
  name: "Table",
  description: "A data table component for displaying tabular data with headers and rows.",
  category: "data" as const,
  icon: "Table",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow
} from "@/components/ui/table/table";`,
  componentId: "TableExample",
  props: [
    {
      name: "bleed",
      type: "boolean",
      defaultValue: false,
      description: "Remove padding from table cells."
    },
    {
      name: "dense",
      type: "boolean", 
      defaultValue: false,
      description: "Use a more compact table layout."
    },
    {
      name: "striped",
      type: "boolean",
      defaultValue: false,
      description: "Add alternating row colors."
    },
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "A data table component for displaying tabular data with headers and rows.",
      code: jsxToString(<DefaultExample />)}
  ]
};