import type { ComponentConfig } from "../../lib/component-config-types";
import React from "react";
import { jsxToString } from "../../lib/jsx-to-string";
import {
  CompactExample,
  CustomStylingExample,
  DefaultExample,
  NoPaddingExample,
  WithTitleExample,
} from "./examples";

export const componentConfig: ComponentConfig = {
  id: "card",
  name: "Card",
  description:
    "A flexible container component with subtle styling and shadow for grouping related content.",
  category: "layout" as const,
  icon: "RectangleHorizontal",
  importStatement: `import { Card } from "@/components/ui/card";`,
  componentId: "CardExample",
  props: [
    {
      name: "padding",
      type: "select",
      options: [
        "0",
        "0.5",
        "1",
        "1.5",
        "2",
        "2.5",
        "3",
        "3.5",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ],
      defaultValue: "6",
      description:
        "Padding for the card (Tailwind scale). Use 0 for no padding.",
    },
    {
      name: "children",
      type: "textarea",
      defaultValue:
        "This is a card component with some example content. It provides a clean container with subtle styling and shadow.",
      description: "The content to display inside the card.",
    },
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic card with default styling.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "with-title",
      title: "With Title",
      description: "Card with a title and content.",
      code: jsxToString(<WithTitleExample />),
    },
    {
      id: "compact",
      title: "Compact",
      description: "Card with reduced padding using the padding prop.",
      code: jsxToString(<CompactExample />),
    },
    {
      id: "no-padding",
      title: "No Padding",
      description:
        "Card with no internal padding, useful for full-width content.",
      code: jsxToString(<NoPaddingExample />),
    },
    {
      id: "custom-styling",
      title: "Custom Styling",
      description: "Card with custom background and border.",
      code: jsxToString(<CustomStylingExample />),
    },
  ],
};
