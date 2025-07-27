import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { DefaultExample, WithDescriptionExample, WithErrorExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "field",
  name: "Field",
  description: "A form field wrapper that combines label, input, and error/help text into a cohesive form element.",
  category: "forms" as const,
  icon: "Square",

  importStatement: `import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";`,
  componentId: "FieldExample",
  props: [
    {
      name: "invalid",
      type: "boolean",
      defaultValue: false,
      description: "Whether the field has validation errors."
    },
    {
      name: "disabled",
      type: "boolean", 
      defaultValue: false,
      description: "Whether the field is disabled."
    }
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic field with label and input.",
      code: jsxToString(<DefaultExample />)
    },
    {
      id: "with-description",
      title: "With Description",
      description: "Field with helpful description text.",
      code: jsxToString(<WithDescriptionExample />)},
    {
      id: "with-error",
      title: "With Error",
      description: "Field showing validation error state.",
      code: jsxToString(<WithErrorExample />)}
  ]
};