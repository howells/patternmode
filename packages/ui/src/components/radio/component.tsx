import type { VariantProps } from "tailwind-variants";

import { Radio as BaseRadio } from "@base-ui-components/react/radio";
import React from "react";
import { tv } from "tailwind-variants";

import { cx, focusRing } from "../../lib/utils";

// Radio Item Variants
const radioVariants = tv({
  slots: {
    root: [
      // base
      "group relative flex items-center justify-center appearance-none outline-hidden",
      // focus
      focusRing,
    ],
    indicator: [
      // base
      "flex items-center justify-center",
    ],
    circle: [
      // base
      "flex shrink-0 items-center justify-center rounded-full border shadow-xs",
      // border color
      "border-zinc-200 dark:border-zinc-800",
      // background color
      "bg-white dark:bg-zinc-950",
    ],
    dot: [
      // base
      "shrink-0 rounded-full",
      // indicator color
      "bg-white",
    ],
  },
  variants: {
    size: {
      sm: {
        root: "size-4",
        circle: "size-4",
        dot: "size-1",
      },
      md: {
        root: "size-4",
        circle: "size-4",
        dot: "size-1.5",
      },
      lg: {
        root: "size-5",
        circle: "size-5",
        dot: "size-2",
      },
    },
    variant: {
      default: {
        circle: [
          // checked
          "group-data-[checked]:border-0 group-data-[checked]:border-transparent group-data-[checked]:bg-blue-500",
          // disabled
          "group-data-[disabled]:border-zinc-200 group-data-[disabled]:bg-zinc-100 group-data-[disabled]:text-zinc-400",
          "dark:group-data-[disabled]:border-zinc-700 dark:group-data-[disabled]:bg-zinc-800",
        ],
        dot: [
          // disabled
          "group-data-[disabled]:bg-zinc-400 dark:group-data-[disabled]:bg-zinc-500",
        ],
      },
      card: {
        circle: [
          // checked
          "group-data-[checked]:border-0 group-data-[checked]:border-transparent group-data-[checked]:bg-blue-500",
          // disabled
          "group-data-[disabled]:border-zinc-200 group-data-[disabled]:bg-zinc-100 group-data-[disabled]:text-zinc-400",
          "dark:group-data-[disabled]:border-zinc-700 dark:group-data-[disabled]:bg-zinc-800",
        ],
        dot: [
          // disabled
          "group-data-[disabled]:bg-zinc-400 dark:group-data-[disabled]:bg-zinc-500",
        ],
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

// Radio Label Variants
const radioLabelVariants = tv({
  base: [
    // base
    "flex items-center gap-2 cursor-pointer",
    // text
    "text-sm font-medium text-zinc-900 dark:text-zinc-50",
    // disabled
    "has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:text-zinc-400 dark:has-[[data-disabled]]:text-zinc-600",
  ],
  variants: {
    size: {
      sm: "gap-1.5 text-xs",
      md: "gap-2 text-sm",
      lg: "gap-2.5 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// Radio Card Variants
const radioCardVariants = tv({
  base: [
    // base
    "group relative w-full rounded-md border p-4 text-left shadow-xs transition cursor-pointer",
    // background color
    "bg-white dark:bg-zinc-950",
    // border color
    "border-zinc-200 dark:border-zinc-800",
    // checked
    "data-[checked]:border-blue-500 dark:data-[checked]:border-blue-500",
    // disabled
    "data-[disabled]:border-zinc-100 dark:data-[disabled]:border-zinc-800",
    "data-[disabled]:bg-zinc-50 data-[disabled]:shadow-none dark:data-[disabled]:bg-zinc-900",
    "data-[disabled]:cursor-not-allowed",
    // focus
    "focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2",
  ],
  variants: {
    size: {
      sm: "p-3",
      md: "p-4",
      lg: "p-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type RadioProps = React.ComponentPropsWithoutRef<typeof BaseRadio.Root>;

type RadioIndicatorProps = React.ComponentPropsWithoutRef<typeof BaseRadio.Indicator> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseRadio.Indicator> | null>;
};

type RadioItemProps = {
  /**
   * Size of the radio button affecting the overall dimensions and internal spacing.
   * Controls the circle size, dot size, and overall clickable area.
   */
  size?: VariantProps<typeof radioVariants>["size"];

  /**
   * Visual variant of the radio button affecting styling context.
   * Default variant for standard forms, card variant for enhanced layouts.
   */
  variant?: VariantProps<typeof radioVariants>["variant"];
} & React.ComponentPropsWithoutRef<typeof BaseRadio.Root> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseRadio.Root> | null>;
};

type RadioLabelProps = {
  /**
   * Size variant affecting text size and spacing between radio and label.
   * Should match the size of the associated radio button for consistent appearance.
   */
  size?: VariantProps<typeof radioLabelVariants>["size"];
} & React.ComponentPropsWithoutRef<"label"> & {
  ref?: React.RefObject<HTMLLabelElement | null>;
};

type RadioCardProps = {
  /**
   * Size variant affecting the padding and overall card dimensions.
   * Larger sizes provide more space for rich content layouts.
   */
  size?: VariantProps<typeof radioCardVariants>["size"];

  /**
   * Content to display within the radio card.
   * Can include complex layouts, text, icons, and other UI elements.
   */
  children?: React.ReactNode;

  /**
   * Custom indicator component to replace the default radio indicator.
   * Useful for specialized designs or when integrating with existing components.
   */
  indicator?: React.ReactNode;

  /**
   * Whether to display the radio selection indicator.
   * When false, hides the visual radio button but maintains selection functionality.
   */
  showIndicator?: boolean;
} & React.ComponentPropsWithoutRef<typeof BaseRadio.Root> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseRadio.Root> | null>;
};

type RadioOptionProps = {
  /**
   * The unique value for this radio option within the radio group.
   * Used to identify which option is selected and for form submission.
   */
  value: string;

  /**
   * The main label content for the radio option.
   * Can be a string or more complex React content like formatted text.
   */
  label: React.ReactNode;

  /**
   * Optional secondary text providing additional context or details.
   * Displayed below the main label in a smaller, muted text style.
   */
  description?: React.ReactNode;

  /**
   * Whether this radio option is disabled and cannot be selected.
   * Disabled options are visually dimmed and skip keyboard navigation.
   */
  disabled?: boolean;

  /**
   * Size variant affecting the radio button and text sizing.
   * Should be consistent within a radio group for proper alignment.
   */
  size?: VariantProps<typeof radioVariants>["size"];
} & {
  ref?: React.RefObject<React.ElementRef<typeof BaseRadio.Root> | null>;
};

type RadioCardOptionProps = {
  /**
   * The unique value for this radio card option within the radio group.
   * Used to identify which option is selected and for form submission.
   */
  value: string;

  /**
   * The main title content for the radio card option.
   * Typically displayed prominently at the top of the card.
   */
  title: React.ReactNode;

  /**
   * Optional descriptive content providing additional details about this option.
   * Can include multiple lines, formatting, or additional UI elements.
   */
  description?: React.ReactNode;

  /**
   * Whether this radio card option is disabled and cannot be selected.
   * Disabled cards are visually dimmed and skip keyboard navigation.
   */
  disabled?: boolean;

  /**
   * Size variant affecting the card padding and internal spacing.
   * Larger sizes accommodate more complex content layouts.
   */
  size?: VariantProps<typeof radioCardVariants>["size"];

  /**
   * Whether to display the radio selection indicator within the card.
   * When false, selection state is indicated only through card styling.
   */
  showIndicator?: boolean;
} & {
  ref?: React.RefObject<React.ElementRef<typeof BaseRadio.Root> | null>;
};

/**
 * Root radio component built on Base UI's Radio primitive.
 */
const Radio = (props: RadioProps) => (
  <BaseRadio.Root data-testid="radio" {...props} />
);
Radio.displayName = "Radio";

/**
 * Visual indicator component for showing radio selection state.
 */
const RadioIndicator = ({ ref, className, ...props }: RadioIndicatorProps) => (
  <BaseRadio.Indicator
    ref={ref}
    className={cx("flex items-center justify-center", className)}
    {...props}
  />
);
RadioIndicator.displayName = "RadioIndicator";

/**
 * Styled radio button component with visual circle and dot indicator.
 */
const RadioItem = ({ ref, className, size, variant, ...props }: RadioItemProps) => {
  const { root, circle, indicator, dot } = radioVariants({ size, variant });

  return (
    <BaseRadio.Root ref={ref} className={cx(root(), className)} {...props}>
      <div className={circle()}>
        <BaseRadio.Indicator className={indicator()}>
          <div className={dot()} />
        </BaseRadio.Indicator>
      </div>
    </BaseRadio.Root>
  );
};
RadioItem.displayName = "RadioItem";

/**
 * Label component for radio buttons with proper styling and accessibility.
 */
const RadioLabel = ({ ref, className, size, children, ...props }: RadioLabelProps) => (
  <label
    ref={ref}
    className={cx(radioLabelVariants({ size }), className)}
    {...props}
  >
    {children}
  </label>
);
RadioLabel.displayName = "RadioLabel";

/**
 * Card-style radio button component with enhanced presentation.
 */
const RadioCard = (
  { ref, className, size, children, indicator, showIndicator = true, ...props }: RadioCardProps,
) => (
  <BaseRadio.Root
    ref={ref}
    className={cx(radioCardVariants({ size }), className)}
    {...props}
  >
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1">{children}</div>
      {showIndicator && (
        <div className="flex-shrink-0">
          {indicator || (
            <RadioItem size="md" variant="card" value={props.value} />
          )}
        </div>
      )}
    </div>
  </BaseRadio.Root>
);
RadioCard.displayName = "RadioCard";

/**
 * Complete radio option with integrated label and optional description.
 */
const RadioOption = ({ ref, value, label, description, disabled, size = "md", ...props }: RadioOptionProps) => {
  const { root, circle, indicator, dot } = radioVariants({ size, variant: "default" });

  return (
    <div className={cx(radioLabelVariants({ size }))}>
      <BaseRadio.Root
        ref={ref}
        value={value}
        disabled={disabled}
        className={cx(root())}
        {...props}
      >
        <div className={circle()}>
          <BaseRadio.Indicator className={indicator()}>
            <div className={dot()} />
          </BaseRadio.Indicator>
        </div>
      </BaseRadio.Root>
      <div className="flex flex-col">
        <span>{label}</span>
        {description && (
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {description}
          </span>
        )}
      </div>
    </div>
  );
};
RadioOption.displayName = "RadioOption";

/**
 * Complete card-style radio option with title and optional description.
 */
const RadioCardOption = (
  { ref, value, title, description, disabled, size = "md", showIndicator = true, ...props }: RadioCardOptionProps,
) => (
  <RadioCard
    ref={ref}
    value={value}
    disabled={disabled}
    size={size}
    showIndicator={showIndicator}
    {...props}
  >
    <div className="flex flex-col gap-1">
      <div className="font-medium text-zinc-900 dark:text-zinc-50">
        {title}
      </div>
      {description && (
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          {description}
        </div>
      )}
    </div>
  </RadioCard>
);
RadioCardOption.displayName = "RadioCardOption";

export {
  Radio,
  RadioCard,
  RadioCardOption,
  radioCardVariants,
  RadioIndicator,
  RadioItem,
  RadioLabel,
  radioLabelVariants,
  RadioOption,
  radioVariants,
};

export type {
  RadioCardOptionProps,
  RadioCardProps,
  RadioIndicatorProps,
  RadioItemProps,
  RadioLabelProps,
  RadioOptionProps,
  RadioProps,
};
