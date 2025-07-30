import React from "react";
import { jsxToString } from "@/lib/jsx-to-string";
import { ListExample, DefaultExample, OrderedExample, WithIconsExample, NestedExample } from "./examples";
import type { ComponentConfig } from "@/lib/component-config-types";

export const componentConfig: ComponentConfig = {
  id: "list",
  name: "List",
  description: "A flexible list component supporting ordered/unordered lists with custom indicators and styling.",
  category: "data" as const,
  componentId: "list",
  icon: "List",

  importStatement: `import { List, ListItem, ListIndicator } from "@/components/ui/list";`,
  props: [
    {
      name: "variant",
      type: "select",
      options: ["marker", "plain"],
      defaultValue: "marker",
      description: "The list style variant."
    },
    {
      name: "as",
      type: "select",
      options: ["ul", "ol"],
      defaultValue: "ul",
      description: "The underlying HTML element to render."
    },
    {
      name: "align",
      type: "select",
      options: ["start", "center", "end"],
      defaultValue: "start",
      description: "Alignment of list items."
    }
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic unordered list with default styling.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "ordered",
      title: "Ordered",
      description: "An ordered list using the as prop.",
      code: jsxToString(<OrderedExample />),
    },
    {
      id: "nested",
      title: "Nested",
      description: "A list with nested items.",
      code: jsxToString(<NestedExample />),
    },
  ]
};