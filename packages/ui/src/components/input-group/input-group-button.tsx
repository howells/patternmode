"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type { LucideIcon } from "lucide-react";
import type * as React from "react";
import { Button, type ButtonAppearance, type ButtonVariant } from "../button";
import { useInputGroup } from "./input-group-context";
import {
  inputGroupButtonHeightClass,
  inputGroupButtonMarginClass,
  inputGroupSizeToButtonSize,
} from "./input-group-variants";

export type InputGroupButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "size"
> & {
  /** Icon to display. */
  icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Button variant. */
  variant?: ButtonVariant;
  /** Button appearance. */
  appearance?: ButtonAppearance;
};

/**
 * Button element for use inside InputGroup.
 * Automatically sizes based on InputGroup context.
 *
 * @example
 * ```tsx
 * <InputGroup size="base">
 *   <InputGroupInput value={value} onChange={...} />
 *   {value && <InputGroupButton icon={X} onClick={() => setValue("")} />}
 * </InputGroup>
 * ```
 */
export function InputGroupButton({
  className,
  icon,
  variant = "ghost",
  appearance,
  disabled: disabledProp,
  children,
  ...props
}: InputGroupButtonProps) {
  const { size, radius, disabled: contextDisabled } = useInputGroup();
  const disabled = disabledProp ?? contextDisabled;
  const buttonSize = inputGroupSizeToButtonSize(size);
  const marginClass = inputGroupButtonMarginClass(size);
  const heightClass = inputGroupButtonHeightClass(size);

  return (
    <Button
      appearance={appearance}
      className={cn(
        marginClass,
        // Exact height for consistent 2px gap
        heightClass,
        // Nested radius: tighter corners for buttons inside inputs
        radius === "full" ? "rounded-full" : "rounded-sm",
        className,
      )}
      data-component="input-group-button"
      data-slot="input-group-button"
      disabled={disabled}
      icon={icon}
      radius="square"
      size={buttonSize}
      square
      variant={variant}
      {...props}
    >
      {children}
    </Button>
  );
}
