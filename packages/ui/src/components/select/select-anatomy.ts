import { defineAnatomy } from "../../lib/anatomy";

/**
 * selectAnatomy helper for SelectAnatomy.
 * Import from "@patternmode/ui/components/select-anatomy".
 */
export const selectAnatomy = defineAnatomy({
  slot: "Select",
  label: "Select",
  description: "Dropdown selection input",
  children: [
    {
      slot: "SelectTrigger",
      label: "Trigger",
      description: "Button showing current value",
    },
    {
      slot: "SelectValue",
      label: "Value",
      description: "Displayed selected value",
    },
    {
      slot: "SelectContent",
      label: "Content",
      description: "Dropdown options container",
      children: [
        {
          slot: "SelectGroup",
          label: "Group",
          description: "Grouped options",
        },
        {
          slot: "SelectLabel",
          label: "Label",
          description: "Group label",
        },
        {
          slot: "SelectItem",
          label: "Item",
          description: "Selectable option",
        },
        {
          slot: "SelectSeparator",
          label: "Separator",
          description: "Visual divider",
        },
      ],
    },
  ],
});
