import React from "react";
import { type ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { KbdExample, DefaultExample, CombinationExample, SizesExample } from "./examples";

export const componentConfig: ComponentConfig = {
  name: "Kbd",
  id: "kbd",
  description: "Display keyboard shortcuts in a consistent, styled format",
  category: "text" as const,
  icon: "Keyboard",

  componentId: "KbdExample",
  importStatement: 'import { Kbd } from "@patternmode/ui";',
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic keyboard shortcut display",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "combination",
      title: "Key Combination",
      description: "Multiple keys for complex shortcuts",
      code: jsxToString(<CombinationExample />),
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Different size variants",
      code: jsxToString(<SizesExample />),
    },
  ],
  props: [
    {
      name: "keys",
      type: "string[]",
      description: "Array of keys to display for complex combinations",
      required: false
    },
    {
      name: "platform",
      type: '"mac" | "pc" | "auto"',
      description: "Platform for modifier key display",
      required: false,
      defaultValue: "auto"
    },
    {
      name: "size",
      type: '"xs" | "sm" | "base" | "lg"',
      description: "Size variant of the keyboard shortcut",
      required: false,
      defaultValue: "sm",
      options: ["xs", "sm", "base", "lg"]
    },
    {
      name: "children",
      type: "React.ReactNode",
      description: "Key text to display for simple shortcuts",
      required: false
    },
  ]
};
