import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import {
  ComplexMenuExample,
  DefaultMenuExample,
  WithCheckboxesExample,
  WithIconsExample,
  WithRadioGroupExample,
  WithSubmenuExample,
} from "./examples";

export const componentConfig: ComponentConfig = {
  id: "menu",
  name: "Menu",
  description:
    "Dropdown menu component built on Base UI with support for nested submenus, radio groups, checkboxes, and keyboard navigation.",
  category: "overlay" as const,
  icon: "Menu",

  installation: {
    npm: "@base-ui-components/react",
  },
  importStatement: `import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger
} from "@/components/ui/menu/menu";`,
  componentId: "MenuExample",
  props: [
    {
      name: "children",
      type: "string",
      defaultValue: "Menu",
      description: "The trigger button content.",
    },
    {
      name: "align",
      type: "select",
      options: ["start", "center", "end"],
      defaultValue: "start",
      description: "Menu alignment relative to trigger.",
    },
    {
      name: "sideOffset",
      type: "number",
      defaultValue: 5,
      description: "Distance in pixels from the trigger.",
    },
  ],
  examples: [
    {
      id: "menu",
      title: "Default",
      description:
        "Dropdown menu component built on Base UI with support for nested submenus, radio groups, checkboxes, and keyboard navigation.",
      code: jsxToString(<DefaultMenuExample />),
    },
    {
      id: "with-icons",
      title: "With Icons",
      description: "Menu items with icons and shortcuts.",
      code: jsxToString(<WithIconsExample />),
    },
    {
      id: "with-checkboxes",
      title: "With Checkboxes",
      description: "Menu with checkbox items for toggleable options.",
      code: jsxToString(<WithCheckboxesExample />),
    },
    {
      id: "with-radio-group",
      title: "With Radio Group",
      description: "Menu with radio group for selecting one option.",
      code: jsxToString(<WithRadioGroupExample />),
    },
    {
      id: "with-submenu",
      title: "With Submenu",
      description: "Menu with nested submenu items.",
      code: jsxToString(<WithSubmenuExample />),
    },
    {
      id: "complex-menu",
      title: "Complex Menu",
      description: "Full-featured menu with all component types.",
      code: jsxToString(<ComplexMenuExample />),
    },
  ],
};
