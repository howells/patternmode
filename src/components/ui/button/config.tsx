import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { ButtonExample, DefaultExample, SecondaryExample, DestructiveExample, OutlineExample, GhostExample, LinkExample, WithIconsExample, LoadingExample, SizesExample, FullWidthExample, KeyboardShortcutsExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "button",
  name: "Button",
  description:
    "A clickable button component with multiple variants and states.",
  category: "inputs" as const,
  icon: "MousePointer",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import { Button } from "@/components/ui/button/button";`,
  componentId: "ButtonExample",
  props: [
    {
      name: "variant",
      type: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link"
      ],
      defaultValue: "default",
      description: "The visual style variant of the button."
    },
    {
      name: "size",
      type: "select",
      options: ["default", "sm", "icon", "icon-sm"],
      defaultValue: "default",
      description: "The size of the button."
    },
    {
      name: "rounded",
      type: "boolean",
      defaultValue: false,
      description:
        "Makes the button fully rounded (circular for icon buttons)."
    },
    {
      name: "children",
      type: "string",
      defaultValue: "Button",
      description: "The content to display inside the button."
    },
    {
      name: "isLoading",
      type: "boolean",
      defaultValue: false,
      description: "Shows loading spinner and disables the button."
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: false,
      description: "Disables the button interaction."
    },
    {
      name: "fullWidth",
      type: "boolean",
      defaultValue: false,
      description: "Makes the button take the full width of its container."
    },
    {
      name: "textAlign",
      type: "select",
      options: ["left", "center", "right"],
      defaultValue: "center",
      description: "Text alignment within the button."
    },
    {
      name: "leftIcon",
      type: "icon",
      description: "Icon to display on the left side."
    },
    {
      name: "rightIcon",
      type: "icon",
      description: "Icon to display on the right side."
    },
    {
      name: "loadingText",
      type: "string",
      description: "Text to show when loading (optional)."
    },
    {
      name: "kbd",
      type: "string",
      description:
        "Keyboard shortcut to display and trigger the button action (e.g., 'mod+K', 'Enter').",
      defaultValue: ""
    }
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic button with default styling.",
      code: jsxToString(<DefaultExample />)},
    {
      id: "secondary",
      title: "Secondary",
      description: "Button with secondary styling.",
      code: jsxToString(<SecondaryExample />)},
    {
      id: "destructive",
      title: "Destructive",
      description: "Button for destructive actions.",
      code: jsxToString(<DestructiveExample />)},
    {
      id: "outline",
      title: "Outline",
      description: "Button with outline styling.",
      code: jsxToString(<OutlineExample />)},
    {
      id: "ghost",
      title: "Ghost",
      description: "Button with ghost styling.",
      code: jsxToString(<GhostExample />)},
    {
      id: "link",
      title: "Link",
      description: "Button styled as a link.",
      code: jsxToString(<LinkExample />)},
    {
      id: "with-icons",
      title: "With Icons",
      description: "Button with left and right icons.",
      code: jsxToString(<WithIconsExample />)},
    {
      id: "loading",
      title: "Loading State",
      description: "Button in loading state.",
      code: jsxToString(<LoadingExample />)},
    {
      id: "sizes",
      title: "Sizes",
      description: "Different button sizes.",
      code: jsxToString(<SizesExample />)},
    {
      id: "full-width",
      title: "Full Width",
      description: "Button that spans the full width.",
      code: jsxToString(<FullWidthExample />)},
    {
      id: "keyboard-shortcuts",
      title: "Keyboard Shortcuts",
      description:
        "Buttons with keyboard shortcuts that display and trigger actions.",
      code: jsxToString(<KeyboardShortcutsExample />)}
  ]
};
