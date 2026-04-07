import { defineAnatomy } from "../../lib/anatomy";

/**
 * commandAnatomy helper for CommandAnatomy.
 * Import from "@patternmode/ui/components/command-anatomy".
 */
export const commandAnatomy = defineAnatomy({
  slot: "Command",
  label: "Command",
  description: "Command palette / search interface",
  children: [
    {
      slot: "CommandInput",
      label: "Input",
      description: "Search input field",
    },
    {
      slot: "CommandList",
      label: "List",
      description: "Results container",
      children: [
        {
          slot: "CommandEmpty",
          label: "Empty",
          description: "No results message",
        },
        {
          slot: "CommandGroup",
          label: "Group",
          description: "Grouped items with heading",
          children: [
            {
              slot: "CommandItem",
              label: "Item",
              description: "Selectable command item",
            },
          ],
        },
        {
          slot: "CommandSeparator",
          label: "Separator",
          description: "Visual divider",
        },
      ],
    },
    {
      slot: "CommandShortcut",
      label: "Shortcut",
      description: "Keyboard shortcut hint",
    },
  ],
});
