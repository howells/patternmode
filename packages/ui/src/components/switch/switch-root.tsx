"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { focusInput } from "@patternmode/ui/utils/focus-input";
import { hasErrorInput } from "@patternmode/ui/utils/has-error-input";
import { Root, Thumb } from "@radix-ui/react-switch";
import type * as React from "react";
import type { ComponentSize } from "../../lib/size";

/** Size configuration for switch track and thumb */
const SWITCH_SIZES: Record<
  ComponentSize,
  {
    track: string;
    thumb: string;
    checkedX: string;
    indeterminateX: string;
  }
> = {
  "2xs": {
    track: "h-3 w-5",
    thumb: "size-2",
    checkedX: "data-[state=checked]:translate-x-[10px]",
    indeterminateX: "data-[state=indeterminate]:translate-x-[4px]",
  },
  xs: {
    track: "h-3.5 w-6",
    thumb: "size-2.5",
    checkedX: "data-[state=checked]:translate-x-[12px]",
    indeterminateX: "data-[state=indeterminate]:translate-x-[5px]",
  },
  sm: {
    track: "h-4 w-7",
    thumb: "size-3",
    checkedX: "data-[state=checked]:translate-x-[14px]",
    indeterminateX: "data-[state=indeterminate]:translate-x-[7px]",
  },
  base: {
    track: "h-[1.15rem] w-8",
    thumb: "size-3.5",
    checkedX: "data-[state=checked]:translate-x-4",
    indeterminateX: "data-[state=indeterminate]:translate-x-[9px]",
  },
  lg: {
    track: "h-5 w-9",
    thumb: "size-4",
    checkedX: "data-[state=checked]:translate-x-[18px]",
    indeterminateX: "data-[state=indeterminate]:translate-x-[10px]",
  },
  xl: {
    track: "h-6 w-11",
    thumb: "size-5",
    checkedX: "data-[state=checked]:translate-x-[22px]",
    indeterminateX: "data-[state=indeterminate]:translate-x-[12px]",
  },
  "2xl": {
    track: "h-7 w-[52px]",
    thumb: "size-6",
    checkedX: "data-[state=checked]:translate-x-[26px]",
    indeterminateX: "data-[state=indeterminate]:translate-x-[14px]",
  },
  "3xl": {
    track: "h-8 w-[60px]",
    thumb: "size-7",
    checkedX: "data-[state=checked]:translate-x-[30px]",
    indeterminateX: "data-[state=indeterminate]:translate-x-[16px]",
  },
};

type SwitchProps = React.ComponentProps<typeof Root> & {
  /** Switch size */
  size?: ComponentSize;
};

/**
 * Renders a toggle switch for boolean on/off states.
 *
 * @param props - The switch props
 * @param props.size - Switch size. Options: "2xs", "xs", "sm", "base" (default), "lg", "xl", "2xl", "3xl".
 * @param props.checked - Controlled checked state. Use with onCheckedChange.
 * @param props.defaultChecked - Uncontrolled default checked state.
 * @param props.onCheckedChange - Callback when checked state changes.
 * @param props.disabled - Disable the switch. Defaults to false.
 * @param props.className - Additional CSS classes to apply.
 * @param props... - All other Radix UI Switch.Root props.
 *
 * @example
 * ```tsx
 * <Switch checked={enabled} onCheckedChange={setEnabled} />
 * <Switch size="lg" defaultChecked />
 * ```
 */
function Switch({ className, size = "base", ...props }: SwitchProps) {
  const sizeConfig = SWITCH_SIZES[size];

  return (
    <Root
      className={cn(
        "peer inline-flex shrink-0 items-center rounded-full border-transparent outline-none transition-all disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=indeterminate]:bg-muted data-[state=unchecked]:bg-muted data-[state=checked]:shadow-xs dark:data-[state=checked]:bg-muted-foreground dark:data-[state=unchecked]:bg-secondary",
        sizeConfig.track,
        focusInput(),
        hasErrorInput,
        className,
      )}
      data-component="switch"
      data-slot="switch"
      {...props}
    >
      <Thumb
        className={cn(
          "pointer-events-none block rounded-full bg-input shadow-sm ring-0 transition-transform data-[state=unchecked]:translate-x-0.5 dark:bg-white",
          sizeConfig.thumb,
          sizeConfig.checkedX,
          sizeConfig.indeterminateX,
        )}
        data-component="switch-thumb"
        data-slot="switch-thumb"
      />
    </Root>
  );
}

export { Switch };
