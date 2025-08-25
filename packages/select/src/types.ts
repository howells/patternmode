import type { Select as BaseSelect } from "@base-ui-components/react/select";
import type React from "react";
import type { Size } from "@patternmode/config/sizes";

export type SelectTriggerProps = React.ComponentPropsWithoutRef<
  typeof BaseSelect.Trigger
> & {
  hasError?: boolean;
  size?: Size;
};

export type SelectScrollUpButtonProps = React.ComponentPropsWithoutRef<
  typeof BaseSelect.ScrollUpArrow
>;

export type SelectScrollDownButtonProps = React.ComponentPropsWithoutRef<
  typeof BaseSelect.ScrollDownArrow
>;

export type SelectBackdropProps = React.ComponentPropsWithoutRef<
  typeof BaseSelect.Backdrop
>;

export type SelectPortalProps = React.ComponentPropsWithoutRef<
  typeof BaseSelect.Portal
>;

export type SelectPositionerProps = React.ComponentPropsWithoutRef<
  typeof BaseSelect.Positioner
> & {
  sideOffset?: number;
  collisionPadding?: number;
  alignItemWithTrigger?: boolean;
};

type PopSize = Exclude<Size, "2xs">;

export type SelectContentProps = React.ComponentPropsWithoutRef<
  typeof BaseSelect.Popup
> & {
  sideOffset?: number;
  collisionPadding?: number;
  side?: "bottom" | "left" | "right" | "top";
  align?: "start" | "center" | "end";
  alignItemWithTrigger?: boolean;
  size?: PopSize;
};

export type SelectGroupLabelProps = React.ComponentPropsWithoutRef<
  typeof BaseSelect.GroupLabel
>;

export type SelectItemProps = React.ComponentPropsWithoutRef<
  typeof BaseSelect.Item
> & {
  size?: PopSize;
};

export type SelectSeparatorProps = React.ComponentPropsWithoutRef<
  typeof BaseSelect.Separator
>;

export type SelectArrowProps = React.ComponentPropsWithoutRef<
  typeof BaseSelect.Arrow
>;
