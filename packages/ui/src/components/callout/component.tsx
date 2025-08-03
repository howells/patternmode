import type { VariantProps } from "tailwind-variants";

import React from "react";
import { tv } from "tailwind-variants";

import { cx } from "../../lib/utils";
import { Subheading } from "../subheading";
import { Text } from "../text";

/**
 * Style variants for callout components.
 *
 * Defines color schemes for different types of callouts including
 * informational, success, error, warning, and neutral variants.
 */
const calloutVariants = tv({
  base: "flex flex-col overflow-hidden rounded-md p-4 text-sm",
  variants: {
    /**
     * Visual style variant.
     */
    variant: {
      /**
       * Default informational style (blue).
       */
      default: [
        // text color
        "text-blue-900 dark:text-blue-400",
        // background color
        "bg-blue-50 dark:bg-blue-950/70",
      ],
      /**
       * Success state style (green).
       */
      success: [
        // text color
        "text-emerald-900 dark:text-emerald-500",
        // background color
        "bg-emerald-50 dark:bg-emerald-950/70",
      ],
      /**
       * Error state style (red).
       */
      error: [
        // text color
        "text-red-900 dark:text-red-500",
        // background color
        "bg-red-50 dark:bg-red-950/70",
      ],
      /**
       * Warning state style (yellow).
       */
      warning: [
        // text color
        "text-yellow-900 dark:text-yellow-500",
        // background color
        "bg-yellow-50 dark:bg-yellow-950/70",
      ],
      /**
       * Neutral informational style (gray).
       */
      neutral: [
        // text color
        "text-zinc-900 dark:text-zinc-400",
        // background color
        "bg-zinc-100 dark:bg-zinc-800/70",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type CalloutProps = {
  /**
   * Optional title text for the callout.
   * Displays prominently at the top of the callout to summarize the message.
   */
  title?: string;
  /**
   * Optional icon component to display.
   * Shows at the left side of the callout to provide visual context for the message type.
   */
  icon?: React.ComponentType<{ className?: string }>;
  /**
   * Visual style variant of the callout.
   * Controls the color scheme to indicate the type of message (info, success, error, warning, neutral).
   */
  variant?: VariantProps<typeof calloutVariants>["variant"];
} & React.ComponentPropsWithoutRef<"div">;

/**
 * Highlighted content box for important information, warnings, or tips.
 */
const Callout = (
  { ref: forwardedRef, title, icon: Icon, className, variant = "default", children, ...props }: CalloutProps & { ref?: React.RefObject<HTMLDivElement | null> },
) => {
  return (
    <div
      ref={forwardedRef}
      className={cx(calloutVariants({ variant }), className)}
      {...props}
    >
      <div className={cx("flex items-start gap-3")}>
        {Icon && (
          <Icon className={cx("size-4 shrink-0 mt-1")} aria-hidden="true" />
        )}
        <div className={cx("flex-1")}>
          {title && <Subheading level={3}>{title}</Subheading>}
          {children && (
            <Text className={cx(title ? "mt-2 max-w-prose" : "")}>
              {children}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

Callout.displayName = "Callout";

export { Callout, type CalloutProps, calloutVariants };
