import { defineAnatomy } from "../../lib/anatomy";

/**
 * InputGroup component anatomy.
 * Documents the composition structure for inputs with addons, icons, and buttons.
 */
export const inputGroupAnatomy = defineAnatomy({
  slot: "input-group",
  label: "InputGroup",
  description:
    "Composition container for inputs with addons, icons, and buttons",
  children: [
    {
      slot: "input-group-icon",
      label: "InputGroupIcon",
      description: "Decorative icon (typically at inline-start)",
    },
    {
      slot: "input-group-addon",
      label: "InputGroupAddon",
      description:
        "Text or icon addon with alignment (inline-start, inline-end, block-start, block-end)",
    },
    {
      slot: "input-group-control",
      label: "InputGroupInput / InputGroupTextarea",
      description: "The form control element (input or textarea)",
    },
    {
      slot: "input-group-button",
      label: "InputGroupButton",
      description: "Action button (clear, copy, submit, etc.)",
    },
  ],
});
