import type { ComponentConfig } from "../../lib/component-config-types";
import React from "react";
import { jsxToString } from "../../lib/jsx-to-string";
import { AnimatedExample, BasicExample, ColorVariantsExample, SemanticVariantsExample, SizesExample, WithLabelsExample, WithoutLabelsExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "dot",
  name: "Dot",
  description: "A small dot indicator to show status or state.",
  category: "feedback" as const,
  icon: "Circle",

  installation: {
    npm: "@base-ui-components/react",
  },
  importStatement: `import { Dot } from "@patternmode/ui";`,
  componentId: "DotExample",
  props: [
    {
      name: "variant",
      type: "select",
      description: "Semantic variant for the dot",
      options: [
        "default",
        "neutral",
        "success",
        "info",
        "warning",
        "error",
        "critical",
        "positive",
        "negative",
        "purple",
        "pink",
        "rose",
        "orange",
        "amber",
        "yellow",
        "lime",
        "green",
        "emerald",
        "teal",
        "cyan",
        "sky",
        "blue",
        "indigo",
        "violet",
        "fuchsia",
      ],
      defaultValue: "default",
    },
    {
      name: "size",
      type: "select",
      description: "Size of the dot",
      options: ["sm", "default", "lg"],
      defaultValue: "default",
    },
    {
      name: "animated",
      type: "boolean",
      description: "Whether the dot should animate",
      defaultValue: false,
    },
    {
      name: "label",
      type: "string",
      description: "Optional text label to display next to the dot",
      defaultValue: "",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Basic Usage",
      description: "Simple dot indicators in common variants",
      code: jsxToString(<BasicExample />),
    },
    {
      id: "semantic-variants",
      title: "Semantic Variants",
      description: "All semantic variants with labels",
      code: jsxToString(<SemanticVariantsExample />),
    },
    {
      id: "color-variants",
      title: "Color Variants",
      description: "Dots using Tailwind color variants",
      code: jsxToString(<ColorVariantsExample />),
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Dots in different sizes",
      code: jsxToString(<SizesExample />),
    },
    {
      id: "with-labels",
      title: "With Labels",
      description: "Dot indicators with descriptive text labels",
      code: jsxToString(<WithLabelsExample />),
    },
    {
      id: "without-labels",
      title: "Without Labels",
      description: "Minimal dot indicators without text",
      code: jsxToString(<WithoutLabelsExample />),
    },
    {
      id: "animated",
      title: "Animated",
      description: "Animated dots for active states",
      code: jsxToString(<AnimatedExample />),
    },
  ],
};
