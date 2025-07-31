import type { ComponentConfig } from "../../lib/component-config-types";
import React from "react";
import { jsxToString } from "../../lib/jsx-to-string";
import { ButtonStyleExample, ControlledExample, DefaultExample, DisabledExample, MultipleSelectionExample, SizesExample, VariantsExample, VerticalExample, WithTextExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "toggle-group",
  name: "Toggle Group",
  description:
    "A group of toggle buttons where one or more can be selected, with support for different variants, sizes, and orientations.",
  category: "inputs" as const,
  icon: "ToggleLeft",

  installation: {
    npm: "@base-ui-components/react",
  },
  importStatement: `import { ToggleGroup, ToggleGroupItem } from "@patternmode/ui";`,
  componentId: "ToggleGroupExample",
  props: [
    {
      name: "variant",
      type: "select",
      options: [
        "default",
        "outline",
        "ghost",
        "button-default",
        "button-secondary",
        "button-outline",
        "button-ghost",
        "button-destructive",
      ],
      defaultValue: "default",
      description:
        "Visual style variant of the toggle group. Button variants use shared Button component styling.",
    },
    {
      name: "size",
      type: "select",
      options: [
        "sm",
        "default",
        "lg",
        "button-sm",
        "button-default",
        "button-lg",
      ],
      defaultValue: "default",
      description:
        "Size of the toggle group items. Button sizes use shared Button component sizing.",
    },
    {
      name: "orientation",
      type: "select",
      options: ["horizontal", "vertical"],
      defaultValue: "horizontal",
      description: "Layout orientation of the toggle group.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: false,
      description: "Disable all toggle items in the group.",
    },
    {
      name: "showMultiple",
      type: "boolean",
      defaultValue: false,
      description: "Show multiple selection example in preview.",
    },
  ],
  examples: [
    {
      id: "default",
      title: "Default Toggle Group",
      description: "Basic toggle group with icon buttons for text alignment.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "multiple-selection",
      title: "Multiple Selection",
      description:
        "Toggle group that allows multiple items to be selected simultaneously.",
      code: jsxToString(<MultipleSelectionExample />),
    },
    {
      id: "with-text",
      title: "With Text Labels",
      description: "Toggle group items with both icons and text labels.",
      code: jsxToString(<WithTextExample />),
    },
    {
      id: "variants",
      title: "Different Variants",
      description: "Toggle groups with default, outline, and ghost variants.",
      code: jsxToString(<VariantsExample />),
    },
    {
      id: "button-style",
      title: "Button Style Variants",
      description:
        "Toggle groups using shared Button component styling with all button variants and proper pressed states.",
      code: jsxToString(<ButtonStyleExample />),
    },
    {
      id: "sizes",
      title: "Different Sizes",
      description: "Toggle groups in small, default, and large sizes.",
      code: jsxToString(<SizesExample />),
    },
    {
      id: "vertical",
      title: "Vertical Orientation",
      description: "Toggle group arranged vertically instead of horizontally.",
      code: jsxToString(<VerticalExample />),
    },
    {
      id: "disabled",
      title: "Disabled State",
      description: "Toggle group in disabled state.",
      code: jsxToString(<DisabledExample />),
    },
    {
      id: "controlled",
      title: "Controlled Component",
      description: "Toggle group with controlled state and external controls.",
      code: jsxToString(<ControlledExample />),
    },
  ],
};
