// Configuration data - no React imports or JSX
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import {
  BorderedExample,
  CustomColorExample,
  DefaultExample,
  DismissExample,
  RoundedExample,
  SizesExample,
  DotExample,
  VariantsExample,
  WithIconsExample,
} from "./examples";

// Component configuration - single source of truth
export const componentConfig: ComponentConfig = {
  id: "badge",
  name: "Badge",
  description: "A label used to show a status or category.",
  category: "feedback" as const,
  icon: "Award",

  installation: {
    npm: "@base-ui-components/react",
  },
  importStatement: `import { Badge } from "@/components/ui/badge";`,
  componentId: "BadgeExample",

  // Props that users can experiment with
  props: [
    {
      name: "variant",
      type: "select",
      description: "The visual style variant of the badge.",
      defaultValue: "default",
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
    },
    {
      name: "size",
      type: "select",
      description: "The size of the badge.",
      defaultValue: "base",
      options: ["sm", "base", "lg"],
    },
    {
      name: "bordered",
      type: "boolean",
      description: "Whether to show a border around the badge.",
      defaultValue: false,
    },
    {
      name: "rounded",
      type: "boolean",
      description: "Whether to use full border radius for a pill shape.",
      defaultValue: false,
    },
    {
      name: "color",
      type: "select",
      description:
        "Custom color from Tailwind palette. Overrides variant when provided.",
      options: [
        "slate",
        "gray",
        "zinc",
        "neutral",
        "stone",
        "red",
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
        "purple",
        "fuchsia",
        "pink",
        "rose",
      ],
    },
    {
      name: "statusDot",
      type: "boolean",
      description:
        "Whether to show a status dot. Overrides leftIcon and rightIcon when enabled.",
      defaultValue: false,
    },
    {
      name: "statusAnimated",
      type: "boolean",
      description: "Whether to animate the status dot for active statuses.",
      defaultValue: false,
    },
    {
      name: "leftIcon",
      type: "icon",
      description: "Icon component to display on the left side.",
    },
    {
      name: "rightIcon",
      type: "icon",
      description: "Icon component to display on the right side.",
    },
    {
      name: "children",
      type: "string",
      description: "The content to display inside the badge.",
      defaultValue: "Badge",
    },
    {
      name: "onDismiss",
      type: "boolean",
      description:
        "Whether to show a dismiss button (X) that can be clicked to remove the badge.",
      defaultValue: false,
    },
    {
      name: "dismissIcon",
      type: "icon",
      description: "Custom icon for the dismiss button. Defaults to X icon.",
    },
  ],

  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic badge with default styling.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "with-icons",
      title: "With Icons",
      description: "Badge with left and right icons.",
      code: jsxToString(<WithIconsExample />),
    },
    {
      id: "dismiss",
      title: "Dismissible",
      description: "Badges with dismiss buttons for removal.",
      code: jsxToString(<DismissExample />),
    },
    {
      id: "variants",
      title: "Variants",
      description: "Different badge variants for various states.",
      code: jsxToString(<VariantsExample />),
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Different badge sizes.",
      code: jsxToString(<SizesExample />),
    },
    {
      id: "bordered",
      title: "Bordered",
      description: "Badge with and without borders.",
      code: jsxToString(<BorderedExample />),
    },
    {
      id: "rounded",
      title: "Rounded",
      description: "Badge with full border radius.",
      code: jsxToString(<RoundedExample />),
    },
    {
      id: "dot",
      title: "Status Dot",
      description: "Badge with a status dot.",
      code: jsxToString(<DotExample />),
    },
    {
      id: "custom-color",
      title: "Custom Color",
      description: "Badge with a custom color.",
      code: jsxToString(<CustomColorExample />),
    },
  ],
};
