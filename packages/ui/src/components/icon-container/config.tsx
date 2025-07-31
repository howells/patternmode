import type { ComponentConfig } from "../../lib/component-config-types";
import React from "react";
import { jsxToString } from "../../lib/jsx-to-string";
import { BasicExample, CenteredExample, CustomColorsExample, ExtraLargeExample, LargeSizeExample, SemanticVariantsExample, SizeVariantsExample, WithCustomColorExample, WithVariantExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "icon-container",
  name: "Icon Container",
  description:
    "A component for displaying icons within colored, rounded containers. Supports semantic variants and custom Tailwind colors with automatic theming.",
  category: "media" as const,
  componentId: "icon-container",
  icon: "Square",

  installation: {
    npm: "lucide-react",
  },
  importStatement: `import { IconContainer } from "@/components/ui/icon-container";`,
  props: [
    {
      name: "icon",
      type: "component",
      required: true,
      description: "The Lucide icon component to render.",
    },
    {
      name: "size",
      type: "select",
      options: ["sm", "base", "lg", "xl"],
      defaultValue: "base",
      description:
        "Size of the container. sm=32px, base=40px, lg=48px, xl=64px.",
    },
    {
      name: "variant",
      type: "select",
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
      ],
      defaultValue: "neutral",
      description: "Semantic variant for consistent theming.",
    },
    {
      name: "color",
      type: "string",
      description: "Custom Tailwind color (overrides variant).",
    },
    {
      name: "iconSize",
      type: "select",
      options: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl"],
      defaultValue: "base",
      description: "Size of the icon within the container.",
    },
    {
      name: "centered",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to center the container horizontally.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes for the container.",
    },
    {
      name: "iconClassName",
      type: "string",
      description: "Additional CSS classes for the icon.",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Basic Icon Container",
      description: "A simple icon container with default styling.",
      code: jsxToString(<BasicExample />),
    },
    {
      id: "with-variant",
      title: "With Variant",
      description: "Icon container with semantic variant.",
      code: jsxToString(<WithVariantExample />),
    },
    {
      id: "with-custom-color",
      title: "With Custom Color",
      description: "Icon container with custom Tailwind color.",
      code: jsxToString(<WithCustomColorExample />),
    },
    {
      id: "large-size",
      title: "Large Size",
      description: "A larger icon container.",
      code: jsxToString(<LargeSizeExample />),
    },
    {
      id: "extra-large",
      title: "Extra Large",
      description: "Extra large icon container with custom icon size.",
      code: jsxToString(<ExtraLargeExample />),
    },
    {
      id: "semantic-variants",
      title: "Semantic Variants",
      description: "Different semantic variant combinations.",
      code: jsxToString(<SemanticVariantsExample />),
    },
    {
      id: "custom-colors",
      title: "Custom Colors",
      description: "Different custom Tailwind color combinations.",
      code: jsxToString(<CustomColorsExample />),
    },
    {
      id: "size-variants",
      title: "Size Variants",
      description: "Different container sizes.",
      code: jsxToString(<SizeVariantsExample />),
    },
    {
      id: "centered",
      title: "Centered",
      description: "Centered icon container.",
      code: jsxToString(<CenteredExample />),
    },
  ],
};
