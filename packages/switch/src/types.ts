import type { Switch as BaseSwitch } from "@base-ui-components/react/switch";
import type React from "react";

/**
 * Accessible Switch props with a standardized controlled API.
 *
 * Controlled: pass `checked` and `onChange`.
 * Uncontrolled: pass `defaultChecked` and optionally `onChange`.
 *
 * The switch is labelable via `htmlFor` when an `id` is provided
 * (a hidden checkbox input is rendered and synchronized for label support).
 */
export type SwitchProps = Omit<
  React.ComponentPropsWithoutRef<typeof BaseSwitch.Root>,
  "children" | "checked" | "defaultChecked" | "onCheckedChange" | "onChange"
> & {
  className?: string;
  size?: "xs" | "sm" | "base" | "lg";
  /** Inline label text (optional). Prefer external <label htmlFor>. */
  label?: string;

  /** Controlled on/off state. */
  checked?: boolean;
  /** Uncontrolled initial state. */
  defaultChecked?: boolean;
  /** Called with the next checked state. No synthetic events. */
  onChange?: (checked: boolean) => void;

  /** Optional id/name for form integration and htmlFor labeling. */
  id?: string;
  name?: string;
};
