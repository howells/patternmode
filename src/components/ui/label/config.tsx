import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { LabelExample, RequiredExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "label",
  name: "Label",
  description: "A label component for form inputs and interactive elements with proper accessibility support.",
  category: "forms" as const,
  icon: "Tag",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import { Label } from "@/components/ui/label/label";`,
  props: [
    {
      name: "children",
      type: "string",
      defaultValue: "Label text",
      description: "The label content."
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: false,
      description: "Show required indicator."
    },
    {
      name: "htmlFor",
      type: "string",
      description: "Associates the label with a form control."
    }
  ],
  examples: [
    {
      id: "label",
      title: "Default",
      description: "A label component for form inputs and interactive elements with proper accessibility support.",
      code: jsxToString(<LabelExample />),
    },
    {
      id: "required",
      title: "Required Field",
      description: "Label indicating a required field.",
      code: jsxToString(<RequiredExample />),
    }
  ]
};