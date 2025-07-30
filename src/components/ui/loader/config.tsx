import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { LoaderExample, DefaultExample, SizesExample, WithTextExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "loader",
  name: "Loader",
  description: "A spinning loader indicator with configurable size.",
  category: "feedback" as const,
  icon: "Loader2",

  installation: {
    npm: "@base-ui-components/react",
  },
  importStatement: `import { Loader } from "@patternmode/ui";`,
  componentId: "LoaderExample",
  props: [
    {
      name: "size",
      type: "select",
      options: [
        { value: "xs", label: "xs (12px)" },
        { value: "sm", label: "sm (16px)" },
        { value: "base", label: "base (16px)" },
        { value: "lg", label: "lg (24px)" },
        { value: "xl", label: "xl (32px)" },
      ],
      defaultValue: "base",
      description: "The size of the loader.",
    },
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "A spinning loader indicator with configurable size.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Loader in different sizes.",
      code: jsxToString(<SizesExample />),
    },
    {
      id: "with-text",
      title: "With Text",
      description: "Loader with accompanying text.",
      code: jsxToString(<WithTextExample />),
    },
  ],
};
