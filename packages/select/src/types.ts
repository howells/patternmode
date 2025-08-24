import type { Size } from "@patternmode/config/sizes";

export type SelectTriggerProps = {
  hasError?: boolean;
  size?: Size;
  className?: string;
  children?: React.ReactNode;
  render?: React.ReactNode;
} & React.ComponentPropsWithoutRef<any>;

export type SelectScrollUpButtonProps = React.ComponentPropsWithoutRef<any>;
export type SelectScrollDownButtonProps = React.ComponentPropsWithoutRef<any>;
export type SelectBackdropProps = React.ComponentPropsWithoutRef<any>;
export type SelectPositionerProps = React.ComponentPropsWithoutRef<any> & {
  sideOffset?: number;
  collisionPadding?: number;
  alignItemWithTrigger?: boolean;
};
export type SelectContentProps = React.ComponentPropsWithoutRef<any> & {
  sideOffset?: number;
  collisionPadding?: number;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  size?: Size;
  alignItemWithTrigger?: boolean;
};
export type SelectGroupLabelProps = React.ComponentPropsWithoutRef<any>;
export type SelectItemProps = React.ComponentPropsWithoutRef<any> & { size?: Size };
export type SelectSeparatorProps = React.ComponentPropsWithoutRef<any>;
export type SelectArrowProps = React.ComponentPropsWithoutRef<any>;

