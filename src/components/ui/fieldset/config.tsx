import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { FieldsetExample, DefaultExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "fieldset",
  name: "Fieldset",
  description: "A fieldset component that groups related form controls with an optional legend.",
  category: "forms" as const,
  icon: "Group",

  importStatement: `import { Fieldset, FieldsetLegend } from "@/components/ui/fieldset";`,
  componentId: "FieldsetExample",
  props: [
    {
      name: "disabled",
      type: "boolean",
      defaultValue: false,
      description: "Whether the fieldset is disabled."
    },
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic fieldset with legend and form fields.",
      code: jsxToString(<DefaultExample />),
    },
  ]
};