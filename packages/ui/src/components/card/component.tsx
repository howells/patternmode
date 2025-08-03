import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import React from "react";
import { tv } from "tailwind-variants";

import { cx } from "../../lib/utils";

const cardVariants = tv({
  base: [
    // base
    "relative w-full rounded-lg text-left text-sm",
  ],
  variants: {
    variant: {
      default: [
        "shadow-xs inset-ring-1 inset-ring-black/10 dark:inset-ring-white/10",
        "bg-white dark:bg-[#090E1A]",
      ],
      dashed: [
        "border-2 border-dashed border-zinc-300 dark:border-zinc-600",
        "hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors",
        "bg-transparent",
      ],
    },
    padding: {
      0: "p-0",
      0.5: "p-0.5",
      1: "p-1",
      1.5: "p-1.5",
      2: "p-2",
      2.5: "p-2.5",
      3: "p-3",
      3.5: "p-3.5",
      4: "p-4",
      5: "p-5",
      6: "p-6",
      7: "p-7",
      8: "p-8",
      9: "p-9",
      10: "p-10",
      11: "p-11",
      12: "p-12",
    },
    fillHeight: {
      true: "h-full",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: 0,
    fillHeight: false,
  },
});

type CardProps = {
  /**
   * Visual style variant of the card.
   * Default provides standard card styling, dashed creates a drop zone style.
   */
  variant?: "default" | "dashed";
  /**
   * Padding scale value (0-12).
   * Controls internal spacing throughout the card.
   */
  padding?: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /**
   * Whether card should fill container height.
   * Useful for creating equal-height cards in grid layouts.
   */
  fillHeight?: boolean;
  /**
   * Custom element to render (defaults to div).
   * Enables semantic flexibility while maintaining styling.
   */
  render?: useRender.RenderProp<Record<string, unknown>>;
  /**
   * Additional CSS classes.
   * Merged with component styling classes.
   */
  className?: string;
  /**
   * Card content.
   * Can include CardHeader, CardContent, CardFooter, etc.
   */
  children?: React.ReactNode;
} & useRender.ComponentProps<"div">;

/**
 * Container component with consistent styling for grouping related content.
 */
const Card = (
  { ref: forwardedRef, render = <div />, variant, padding, fillHeight, className, ...props }: CardProps & { ref?: React.RefObject<HTMLDivElement | null> },
) => {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: cx(cardVariants({ variant, padding, fillHeight }), className),
  };

  const element = useRender({
    render,
    ref: forwardedRef,
    props: mergeProps<"div">(defaultProps, props),
  });

  return element;
};

Card.displayName = "Card";

type CardHeaderProps = {
  /**
   * Whether to show a border at the bottom of the header.
   * Useful for visually separating header from content.
   */
  border?: boolean;
  /**
   * Additional CSS classes.
   * Applied to the header container.
   */
  className?: string;
  /**
   * Header content.
   * Usually includes CardTitle, CardDescription, and CardAction.
   */
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Card header component for titles, descriptions and actions.
 */
const CardHeader = ({ ref, className, border = false, ...props }: CardHeaderProps & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div
    ref={ref}
    className={cx(
      "flex flex-col space-y-1.5 p-6",
      border && "border-b border-zinc-200 dark:border-zinc-800",
      className,
    )}
    {...props}
  />
);
CardHeader.displayName = "CardHeader";

type CardTitleProps = {
  /**
   * Additional CSS classes.
   * Applied to the title heading element.
   */
  className?: string;
  /**
   * Title text or content.
   * Displayed with prominent typography.
   */
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;

/**
 * Card title component with consistent typography.
 */
const CardTitle = ({ ref, className, ...props }: CardTitleProps & { ref?: React.RefObject<HTMLHeadingElement | null> }) => (
  <h3
    ref={ref}
    className={cx(
      "text-lg font-semibold leading-none tracking-tight text-zinc-950 dark:text-white",
      className,
    )}
    {...props}
  />
);
CardTitle.displayName = "CardTitle";

type CardDescriptionProps = {
  /**
   * Additional CSS classes.
   * Applied to the description paragraph element.
   */
  className?: string;
  /**
   * Description text or content.
   * Displayed with muted styling below the title.
   */
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLParagraphElement>;

/**
 * Card description component with muted text styling.
 */
const CardDescription = ({ ref, className, ...props }: CardDescriptionProps & { ref?: React.RefObject<HTMLParagraphElement | null> }) => (
  <p
    ref={ref}
    className={cx("text-sm text-zinc-500 dark:text-zinc-400", className)}
    {...props}
  />
);
CardDescription.displayName = "CardDescription";

type CardActionProps = {
  /**
   * Additional CSS classes.
   * Applied to the action container.
   */
  className?: string;
  /**
   * Action content.
   * Usually buttons or interactive elements.
   */
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Card action component for buttons or interactive elements in the header.
 */
const CardAction = ({ ref, className, ...props }: CardActionProps & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div ref={ref} className={cx("flex items-center", className)} {...props} />
);
CardAction.displayName = "CardAction";

type CardContentProps = {
  /**
   * Additional CSS classes.
   * Applied to the content container.
   */
  className?: string;
  /**
   * Main content.
   * The primary content area of the card.
   */
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Card content component for main content area.
 */
const CardContent = ({ ref, className, ...props }: CardContentProps & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div ref={ref} className={cx("p-6", className)} {...props} />
);
CardContent.displayName = "CardContent";

type CardFooterProps = {
  /**
   * Additional CSS classes.
   * Applied to the footer container.
   */
  className?: string;
  /**
   * Footer content.
   * Usually action buttons or additional information.
   */
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Card footer component for actions or additional content.
 */
const CardFooter = ({ ref, className, ...props }: CardFooterProps & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div
    ref={ref}
    className={cx("flex items-center p-6 pt-0", className)}
    {...props}
  />
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardAction,
  type CardActionProps,
  CardContent,
  type CardContentProps,
  CardDescription,
  type CardDescriptionProps,
  CardFooter,
  type CardFooterProps,
  CardHeader,
  type CardHeaderProps,
  type CardProps,
  CardTitle,
  type CardTitleProps,
  cardVariants,
};
