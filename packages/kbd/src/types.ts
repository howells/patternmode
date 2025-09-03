import type React from "react";
import type { VariantProps } from "tailwind-variants";
import type { kbdVariants } from "./variants";

export type KbdProps = {
  /**
   * Array of keys to display for complex key combinations.
   * When provided, each key will be rendered as a separate kbd element.
   * @example ["cmd", "shift", "k"] or ["⌘", "⇧", "K"]
   */
  keys?: string[];
  /**
   * Platform for modifier key display.
   * Controls how modifier keys are rendered (Mac symbols vs text).
   * "auto" detects the platform automatically.
   */
  platform?: "mac" | "pc" | "auto";
  /**
   * Visual variant for different contexts.
   * Use "onDarkButton" when inside dark buttons, "onLightButton" for light buttons.
   */
  variant?: "default" | "onDarkButton" | "onLightButton";
} & React.ComponentPropsWithoutRef<"kbd"> &
  VariantProps<typeof kbdVariants>;
