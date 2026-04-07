import { defineAnatomy } from "../../lib/anatomy";

/**
 * dropdownMenuAnatomy helper for DropdownMenuAnatomy.
 * Import from "@patternmode/ui/components/dropdown-menu-anatomy".
 */
export const dropdownMenuAnatomy = defineAnatomy({
  slot: "DropdownMenu",
  label: "Dropdown Menu",
  description: "Dropdown menu triggered by a button",
  children: [
    {
      slot: "DropdownMenuTrigger",
      label: "Trigger",
      description: "Button that opens menu",
    },
    {
      slot: "DropdownMenuContent",
      label: "Content",
      description: "Menu content container",
      children: [
        {
          slot: "DropdownMenuItem",
          label: "Item",
          description: "Menu item",
        },
        {
          slot: "DropdownMenuCheckboxItem",
          label: "Checkbox Item",
          description: "Toggleable item",
        },
        {
          slot: "DropdownMenuRadioGroup",
          label: "Radio Group",
          description: "Exclusive selection group",
        },
        {
          slot: "DropdownMenuRadioItem",
          label: "Radio Item",
          description: "Radio option",
        },
        {
          slot: "DropdownMenuLabel",
          label: "Label",
          description: "Section label",
        },
        {
          slot: "DropdownMenuSeparator",
          label: "Separator",
          description: "Visual divider",
        },
        {
          slot: "DropdownMenuSub",
          label: "Submenu",
          description: "Nested submenu",
          children: [
            {
              slot: "DropdownMenuSubTrigger",
              label: "Submenu Trigger",
              description: "Opens nested menu",
            },
            {
              slot: "DropdownMenuSubContent",
              label: "Submenu Content",
              description: "Nested menu container",
            },
          ],
        },
        {
          slot: "DropdownMenuShortcut",
          label: "Shortcut",
          description: "Keyboard shortcut",
        },
      ],
    },
  ],
});
