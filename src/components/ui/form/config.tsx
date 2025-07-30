import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { FormExample, DefaultExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "form",
  name: "Form",
  description:
    "A modern form component that integrates Base UI Form with Zod validation for type-safe, accessible forms.",
  category: "forms" as const,
  icon: "FileText",

  importStatement: `import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormDescription,
  FormError
} from "@patternmode/ui";
import { Textarea } from "@patternmode/ui";
import { Button } from "@patternmode/ui";
import { z } from "zod";`,
  componentId: "FormExample",
  props: [
    {
      name: "disabled",
      type: "boolean",
      defaultValue: false,
      description: "Whether the form is disabled."
    },
  ],
  examples: [
    {
      id: "default",
      title: "Contact Form",
      description:
        "A complete form with Zod validation, including text inputs and textarea.",
      code: jsxToString(<DefaultExample />),
    },
  ]
};
