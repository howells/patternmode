import type { ComponentConfig } from "../../lib/component-config-types";
import React from "react";
import { jsxToString } from "../../lib/jsx-to-string";
import { CheckedExample, DefaultExample, DisabledExample, IndeterminateExample, WithLabelExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "checkbox",
  name: "Checkbox",
  description: "A checkbox input built on Base UI with indeterminate state support and accessible interactions.",
  category: "inputs" as const,
  icon: "Check",

  importStatement: `import { Checkbox } from "@/components/ui/checkbox";`,
  componentId: "CheckboxExample",
  props: [
    {
      name: "checked",
      type: "select",
      options: ["true", "false", "indeterminate"],
      defaultValue: false,
      description: "The checked state of the checkbox. Can be true, false, or 'indeterminate'.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: false,
      description: "Whether the checkbox is disabled.",
    },
    {
      name: "name",
      type: "string",
      description: "The name attribute of the checkbox input.",
    },
    {
      name: "value",
      type: "string",
      description: "The value attribute of the checkbox input.",
    },
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic checkbox with default styling.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "checked",
      title: "Checked",
      description: "Checkbox in checked state.",
      code: jsxToString(<CheckedExample />),
    },
    {
      id: "indeterminate",
      title: "Indeterminate",
      description: "Checkbox in indeterminate state.",
      code: jsxToString(<IndeterminateExample />),
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Disabled checkbox in various states.",
      code: jsxToString(<DisabledExample />),
    },
    {
      id: "with-label",
      title: "With Label",
      description: "Checkbox with associated label.",
      code: jsxToString(<WithLabelExample />),
    },
  ],
};
