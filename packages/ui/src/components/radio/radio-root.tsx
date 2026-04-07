"use client";

import { durations } from "@patternmode/motion/durations";
import { easings } from "@patternmode/motion/easings";
import { cn } from "@patternmode/ui/utils/cn";
import { focusInput } from "@patternmode/ui/utils/focus-input";
import { hasErrorInput } from "@patternmode/ui/utils/has-error-input";
import { Indicator, Item } from "@radix-ui/react-radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";
import type * as React from "react";
import type { ComponentSize } from "../../lib/size";

/**
 * Size mapping for the inner dot relative to outer circle.
 * The dot should be roughly 50% of the outer circle size.
 */
const DOT_SIZE_CLASS: Record<ComponentSize, string> = {
  "2xs": "size-1.5",
  xs: "size-1.5",
  sm: "size-2",
  base: "size-2",
  lg: "size-2.5",
  xl: "size-2.5",
  "2xl": "size-3",
  "3xl": "size-3.5",
};

/**
 * radioVariants variant class helper for Radio.
 * Import from "@patternmode/ui/components/radio".
 * Built on Radix UI primitives for accessible behavior.
 * Uses variant-based styling via class-variance-authority.
 * Includes motion-based animations.
 */
const radioVariants = cva(
  "aspect-square shrink-0 rounded-full border border-gray-400/90 bg-card text-primary outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        "2xs": "size-3.5",
        xs: "size-4",
        sm: "size-4.5",
        base: "size-5",
        lg: "size-5.5",
        xl: "size-6",
        "2xl": "size-7",
        "3xl": "size-8",
      } satisfies Record<ComponentSize, string>,
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

export type RadioProps = React.ComponentProps<typeof Item> &
  VariantProps<typeof radioVariants>;

interface RadioDotProps
  extends Omit<React.ComponentProps<typeof motion.span>, "children"> {
  size?: ComponentSize;
}

/** Internal animated dot indicator */
function RadioDot({ className, size = "sm", ...props }: RadioDotProps) {
  return (
    <motion.span
      animate={{ scale: 1, opacity: 1 }}
      aria-hidden
      className={cn(
        "block rounded-full bg-primary",
        DOT_SIZE_CLASS[size],
        className,
      )}
      data-slot="radio-dot"
      exit={{ scale: 0.8, opacity: 0 }}
      initial={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: durations.quick, ease: easings.customOut }}
      {...props}
    />
  );
}

/**
 * Individual radio button. Must be used within a RadioGroup.
 *
 * @param props - The radio props
 * @param props.value - Unique value for this radio option (required).
 * @param props.size - Size using shared ComponentSize scale. Defaults to "sm".
 * @param props.disabled - Disable this radio button. Defaults to false.
 * @param props.className - Additional CSS classes to apply.
 * @param props... - All other Radix UI RadioGroup.Item props.
 *
 * @example
 * ```tsx
 * <RadioGroup>
 *   <Radio value="option1" />
 *   <Radio value="option2" size="lg" />
 * </RadioGroup>
 * ```
 */
function Radio({ className, size, ...props }: RadioProps) {
  return (
    <Item
      className={cn(
        radioVariants({ size }),
        focusInput(),
        hasErrorInput,
        className,
      )}
      data-component="radio"
      data-slot="radio"
      {...props}
    >
      <Indicator
        className="flex items-center justify-center"
        data-component="radio-indicator"
        data-slot="radio-indicator"
      >
        <RadioDot size={size ?? undefined} />
      </Indicator>
    </Item>
  );
}

export { Radio, radioVariants };
