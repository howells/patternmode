import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { SelectNativeExample, DefaultExample, WithGroupsExample, SizesExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "select-native",
  name: "Select Native",
  description: "A native HTML select element with custom styling.",
  category: "inputs" as const,
  icon: "ChevronDown",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import { SelectNative } from "@patternmode/ui";`,
  componentId: "SelectNativeExample",
  props: [
    {
      name: "value",
      type: "string",
      description: "Selected value",
      defaultValue: ""
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the select is disabled",
      defaultValue: false
    },
    {
      name: "size",
      type: "select",
      description: "Size of the select",
      options: ["sm", "md", "lg"],
      defaultValue: "md"
    },
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "A styled native select element",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "with-groups",
      title: "With Option Groups",
      description: "Native select with grouped options",
      code: jsxToString(<WithGroupsExample />),
    },
    {
      id: "sizes",
      title: "Different Sizes",
      description: "Native select in different sizes",
      code: jsxToString(<SizesExample />),
    },
  ]
};