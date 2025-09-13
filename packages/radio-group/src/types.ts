import type { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";
import type React from "react";
import type { VariantProps } from "tailwind-variants";
import type {
  radioGroupItemVariants,
  radioGroupRootVariants,
} from "./variants";

export type RadioGroupRootProps = {
  /**
   * Layout orientation for the radio group items.
   */
  orientation?: VariantProps<typeof radioGroupRootVariants>["orientation"];
} & React.ComponentPropsWithoutRef<typeof BaseRadioGroup> & {
    ref?: React.RefObject<React.ElementRef<typeof BaseRadioGroup> | null>;
  };

export type RadioGroupItemProps = {
  /**
   * The value this radio item represents in the group.
   * Must be unique within the RadioGroup and is used to track selection state.
   */
  value: string;

  /**
   * Whether this radio item is disabled.
   * When true, the item cannot be selected and displays with muted styling.
   */
  disabled?: boolean;

  /**
   * Size variant for the radio item.
   */
  size?: VariantProps<typeof radioGroupItemVariants>["size"];

  /**
   * Visual style variant for the radio item.
   */
  variant?: VariantProps<typeof radioGroupItemVariants>["variant"];

  /**
   * Color theme for the radio item.
   */
  color?: VariantProps<typeof radioGroupItemVariants>["color"];

  /**
   * Whether to use high contrast colors for better accessibility.
   */
  highContrast?: VariantProps<typeof radioGroupItemVariants>["highContrast"];

  /**
   * Content to display inside the radio item.
   * Can include text, icons, or any JSX elements.
   */
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"button"> & {
    ref?: React.RefObject<HTMLDivElement | null>;
  };
