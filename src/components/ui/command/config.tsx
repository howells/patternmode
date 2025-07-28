import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import React from "react";
import { DefaultExample, DialogModeExample, SizesExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "command",
  name: "Command",
  description:
    "A command palette and search interface for quick actions and navigation.",
  category: "overlay" as const,
  icon: "Terminal",

  installation: {
    npm: "cmdk",
  },
  importStatement: `import { Command, CommandDialog, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command/command";`,

  props: [
    {
      name: "value",
      type: "string",
      defaultValue: "",
      description: "The value of the search input.",
    },
    {
      name: "onValueChange",
      type: "function",
      defaultValue: undefined,
      description: "Callback when the search value changes.",
    },
    {
      name: "placeholder",
      type: "string",
      defaultValue: "Search...",
      description: "Placeholder text for the search input.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: false,
      description: "Whether the command palette is disabled.",
    },
    {
      name: "loop",
      type: "boolean",
      defaultValue: false,
      description:
        "Whether to loop through items when using keyboard navigation.",
    },
  ],

  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic command palette with groups and items.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "dialog-mode",
      title: "Dialog Mode",
      description: "Command palette as a modal dialog.",
      code: jsxToString(<DialogModeExample />),
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Different size variants of the command palette.",
      code: jsxToString(<SizesExample />),
    },
  ],
};
