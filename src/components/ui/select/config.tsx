import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { SelectExample, DefaultExample, WithGroupsExample, SmallSizeExample, FormSelectExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "select",
  name: "Select",
  description:
    "Displays a list of options for the user to pick from—triggered by a button.",
  category: "inputs" as const,
  icon: "ChevronUpDown",

  installation: {
    npm: "@base-ui-components/react",
  },
  importStatement: `import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select/select";`,
  componentId: "SelectExample",
  props: [
    {
      name: "value",
      type: "string",
      description: "Selected value",
      defaultValue: "",
    },
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder text",
      defaultValue: "Select an option",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the select is disabled",
      defaultValue: false,
    },
    {
      name: "size",
      type: "select",
      options: ["default", "sm"],
      defaultValue: "default",
      description: "Size variant of the select trigger",
    },
  ],
  examples: [
    {
      id: "default",
      title: "Basic Select",
      description: "A simple select dropdown",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "with-groups",
      title: "Select with Groups",
      description: "Select with grouped options",
      code: jsxToString(<WithGroupsExample />),
    },
    {
      id: "small-size",
      title: "Small Select",
      description: "Select with small size variant",
      code: jsxToString(<SmallSizeExample />),
    },
    {
      id: "form-select",
      title: "Form Select",
      description: "Select integrated in a form",
      code: jsxToString(<FormSelectExample />),
    },
  ],
};
