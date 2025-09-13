import type { CheckboxGroup as BaseCheckboxGroup } from "@base-ui-components/react/checkbox-group";
import type { CardProps } from "@patternmode/card";
import type React from "react";

export type CheckboxCardsProps = React.ComponentPropsWithoutRef<
  typeof BaseCheckboxGroup
> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseCheckboxGroup> | null>;
};

export type CheckboxCardProps = {
  /**
   * The value this checkbox card represents in the group.
   * Must be unique within the CheckboxCards and is used to track selection state.
   */
  value: string;

  /**
   * Whether this checkbox card option is disabled.
   * When true, the card cannot be selected and displays with muted styling.
   */
  disabled?: boolean;

  /**
   * Content to display inside the checkbox card.
   * Can include rich content like text, icons, pricing, descriptions, or any JSX elements.
   */
  children?: React.ReactNode;
} & Omit<CardProps, "value" | "disabled" | "children"> & {
    ref?: React.RefObject<HTMLDivElement | null>;
  };
