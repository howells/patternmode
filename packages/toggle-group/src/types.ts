import type { Toggle as BaseToggle } from "@base-ui-components/react/toggle";
import type { ToggleGroup as BaseToggleGroup } from "@base-ui-components/react/toggle-group";
import type { useRender } from "@base-ui-components/react/use-render";
import type { Size } from "@patternmode/config/sizes";
import type React from "react";
import type { VariantProps } from "tailwind-variants";
import type { ButtonProps } from "@patternmode/button";
type SimpleIconComponent = React.ComponentType<{ className?: string; strokeWidth?: number }>;
import type { toggleGroupVariants } from "./variants";

export type ToggleGroupProps = {
  variant?: VariantProps<typeof toggleGroupVariants>["variant"];
  size?: Size;
  orientation?: VariantProps<typeof toggleGroupVariants>["orientation"];
} & React.ComponentPropsWithoutRef<typeof BaseToggleGroup>;

export type ToggleGroupItemProps = {
  value: string;
  leftIcon?: SimpleIconComponent;
  rightIcon?: SimpleIconComponent;
  iconStrokeWidth?: number;
  variant?: VariantProps<typeof toggleGroupVariants>["variant"];
  size?: Size;
  render?: useRender.RenderProp<Record<string, unknown>>;
  icon?: ButtonProps["icon"];
  fullWidth?: ButtonProps["fullWidth"];
  rounded?: ButtonProps["rounded"];
} & React.ComponentPropsWithoutRef<typeof BaseToggle>;
