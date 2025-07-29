// Tremor Radio [v1.0.0] - Base UI

import { cx, focusRing } from "../../lib/utils";
import { Radio as BaseRadio } from "@base-ui-components/react/radio";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

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

/**
 * Root radio component built on Base UI's Radio primitive.
 *
 * Based on Base UI's Radio, providing accessible radio button functionality
 * with proper keyboard navigation and form integration. Use with RadioGroup
 * for managing multiple radio options.
 *
 * @see https://base-ui.com/react/components/radio - Base UI documentation
 */
const Radio = BaseRadio.Root;
Radio.displayName = "Radio";

/**
 * Indicator component that shows the selected state of a radio button.
 *
 * Based on Base UI's Radio.Indicator, this component renders the visual indicator
 * (dot) that appears when the radio is selected. Typically used within RadioItem
 * or custom radio implementations.
 *
 * @see https://base-ui.com/react/components/radio - Base UI documentation
 */
const RadioIndicator = React.forwardRef<
  React.ElementRef<typeof BaseRadio.Indicator>,
  React.ComponentPropsWithoutRef<typeof BaseRadio.Indicator>
>(({ className, ...props }, ref) => (
  <BaseRadio.Indicator
    ref={ref}
    className={cx("flex items-center justify-center", className)}
    {...props}
  />
));
RadioIndicator.displayName = "RadioIndicator";

/**
 * A styled radio button component with visual indicator.
 *
 * Pre-styled radio button built on Base UI's Radio primitive with Tremor-inspired
 * design. Features multiple sizes and variants, with a visual circle and dot indicator.
 * Use within RadioGroup for managing multiple options.
 *
 * @param size - Size variant (sm, md, lg)
 * @param variant - Style variant (default, card)
 *
 * @example
 * ```tsx
 * <RadioItem value="option1" size="md" variant="default" />
 * ```
 *
 * @see https://base-ui.com/react/components/radio - Base UI documentation
 */
const RadioItem = React.forwardRef<
  React.ElementRef<typeof BaseRadio.Root>,
  React.ComponentPropsWithoutRef<typeof BaseRadio.Root> &
    VariantProps<typeof radioVariants>
>(({ className, size, variant, ...props }, ref) => {
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
});
RadioItem.displayName = "RadioItem";

/**
 * Label component for radio buttons with proper styling and accessibility.
 *
 * Provides semantic labeling for radio buttons with size variants and proper
 * cursor behavior. Features disabled state styling and flexible content support.
 * Use to wrap radio buttons and their labels for better UX.
 *
 * @param size - Size variant affecting text size and spacing
 *
 * @example
 * ```tsx
 * <RadioLabel size="md">
 *   <RadioItem value="option" />
 *   <span>Option label</span>
 * </RadioLabel>
 * ```
 */
const RadioLabel = React.forwardRef<
  HTMLLabelElement,
  React.ComponentPropsWithoutRef<"label"> &
    VariantProps<typeof radioLabelVariants>
>(({ className, size, children, ...props }, ref) => (
  <label
    ref={ref}
    className={cx(radioLabelVariants({ size }), className)}
    {...props}
  >
    {children}
  </label>
));
RadioLabel.displayName = "RadioLabel";

/**
 * A card-style radio button component with optional indicator.
 *
 * Expanded radio button styled as a card for better visibility and content support.
 * Features border highlighting when selected and optional radio indicator.
 * Ideal for choice cards with additional content or descriptions.
 *
 * @param size - Size variant affecting padding
 * @param children - Content to display in the card
 * @param indicator - Custom indicator component
 * @param showIndicator - Whether to show the radio indicator
 *
 * @example
 * ```tsx
 * <RadioCard value="premium" size="md">
 *   <h3>Premium Plan</h3>
 *   <p>Advanced features</p>
 * </RadioCard>
 * ```
 *
 * @see https://base-ui.com/react/components/radio - Base UI documentation
 */
const RadioCard = React.forwardRef<
  React.ElementRef<typeof BaseRadio.Root>,
  React.ComponentPropsWithoutRef<typeof BaseRadio.Root> &
    VariantProps<typeof radioCardVariants> & {
      /** Content to display in the card */
      children?: React.ReactNode;
      /** Custom indicator component */
      indicator?: React.ReactNode;
      /** Whether to show the radio indicator */
      showIndicator?: boolean;
    }
>(
  (
    { className, size, children, indicator, showIndicator = true, ...props },
    ref
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
  )
);
RadioCard.displayName = "RadioCard";

/**
 * Props for the RadioOption component.
 *
 * @interface RadioOptionProps
 */
interface RadioOptionProps {
  /** The value of the radio option */
  value: string;
  /** Label text or content */
  label: React.ReactNode;
  /** Optional description text */
  description?: React.ReactNode;
  /** Whether the option is disabled */
  disabled?: boolean;
  /** Size variant */
  size?: VariantProps<typeof radioVariants>["size"];
}

/**
 * Complete radio option with label and optional description.
 *
 * Pre-composed radio button with integrated label and description support.
 * Combines RadioItem and RadioLabel for common use cases, reducing boilerplate
 * while maintaining flexibility and proper accessibility.
 *
 * @param value - The value of the radio option
 * @param label - Label text or content
 * @param description - Optional description text
 * @param disabled - Whether the option is disabled
 * @param size - Size variant
 *
 * @example
 * ```tsx
 * <RadioOption
 *   value="standard"
 *   label="Standard Plan"
 *   description="Basic features included"
 *   size="md"
 * />
 * ```
 *
 * @see https://base-ui.com/react/components/radio - Base UI documentation
 */
const RadioOption = React.forwardRef<
  React.ElementRef<typeof BaseRadio.Root>,
  RadioOptionProps
>(({ value, label, description, disabled, size = "md", ...props }, ref) => (
  <RadioLabel size={size}>
    <RadioItem
      ref={ref}
      value={value}
      disabled={disabled}
      size={size}
      {...props}
    />
    <div className="flex flex-col">
      <span>{label}</span>
      {description && (
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {description}
        </span>
      )}
    </div>
  </RadioLabel>
));
RadioOption.displayName = "RadioOption";

/**
 * Props for the RadioCardOption component.
 *
 * @interface RadioCardOptionProps
 */
interface RadioCardOptionProps {
  /** The value of the radio card option */
  value: string;
  /** Title text or content */
  title: React.ReactNode;
  /** Optional description text */
  description?: React.ReactNode;
  /** Whether the option is disabled */
  disabled?: boolean;
  /** Size variant */
  size?: VariantProps<typeof radioCardVariants>["size"];
  /** Whether to show the radio indicator */
  showIndicator?: boolean;
}

/**
 * Complete card-style radio option with title and optional description.
 *
 * Pre-composed radio card with integrated title and description layout.
 * Combines RadioCard with structured content for rich choice presentations.
 * Ideal for feature comparisons, plan selections, or option cards.
 *
 * @param value - The value of the radio card option
 * @param title - Title text or content
 * @param description - Optional description text
 * @param disabled - Whether the option is disabled
 * @param size - Size variant affecting padding
 * @param showIndicator - Whether to show the radio indicator
 *
 * @example
 * ```tsx
 * <RadioCardOption
 *   value="enterprise"
 *   title="Enterprise Plan"
 *   description="Full feature access with priority support"
 *   size="lg"
 * />
 * ```
 *
 * @see https://base-ui.com/react/components/radio - Base UI documentation
 */
const RadioCardOption = React.forwardRef<
  React.ElementRef<typeof BaseRadio.Root>,
  RadioCardOptionProps
>(
  (
    {
      value,
      title,
      description,
      disabled,
      size = "md",
      showIndicator = true,
      ...props
    },
    ref
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
  )
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
