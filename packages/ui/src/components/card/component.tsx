import type { ResponsiveSpacing, SpacingValue } from "../../presentation/spacing-utils";
import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import React from "react";

import { generateResponsiveSpacingClasses, getBaseSpacingValue, getPaddingClass } from "../../presentation/spacing-utils";
import { cx } from "../../utils/cx";
import { Subheading } from "../subheading/component";
import { cardVariants } from "./variants";

type CardProps = {
  /**
   * Visual style variant of the card.
   * Default provides standard card styling, dashed creates a drop zone style.
   */
  variant?: "default" | "dashed";
  /**
   * Padding scale value (0-24) - can be responsive.
   * Controls internal spacing throughout the card using the 4px grid system.
   */
  padding?: ResponsiveSpacing<SpacingValue>;
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
} & useRender.ComponentProps<"div">;

/**
 * Container component with consistent styling for grouping related content.
 */
const Card = (
  { ref: forwardedRef, render = <div />, variant, padding, fillHeight, className, ...props }: CardProps & { ref?: React.RefObject<HTMLDivElement | null> },
) => {
  // Get base padding value for non-responsive case
  const basePadding = getBaseSpacingValue(padding);

  // Generate responsive padding classes
  const responsivePaddingClasses = generateResponsiveSpacingClasses("padding", padding);

  // Get base padding class if we have a base value
  const basePaddingClass = basePadding !== undefined ? getPaddingClass(basePadding) : "";

  const defaultProps: useRender.ElementProps<"div"> = {
    "className": cx(
      cardVariants({ variant, fillHeight }),
      basePaddingClass,
      responsivePaddingClasses,
      className,
    ),
    "data-testid": "card",
  } as React.HTMLAttributes<HTMLDivElement>;

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
   * Usually includes CardHeading and CardDescription.
   */
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Card header component for titles, descriptions and actions.
 */
const CardHeader = ({ ref, className, border = false, ...props }: CardHeaderProps & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div
    ref={ref}
    className={cx(
      "flex flex-col space-y-1.5 p-6",
      border && "border-b border-zinc-200 dark:border-zinc-800 card-border",
      className,
    )}
    {...props}
  />
);
CardHeader.displayName = "CardHeader";

type CardHeadingProps = {
  /**
   * Additional CSS classes.
   * Applied to the heading element.
   */
  className?: string;
  /**
   * Heading text or content.
   * When a string is provided, uses Subheading component with default styling.
   * When a React element is provided, renders it directly.
   */
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;

/**
 * Card heading component with consistent typography.
 */
const CardHeading = ({ ref, className, children, ...props }: CardHeadingProps & { ref?: React.RefObject<HTMLHeadingElement | null> }) => {
  // If children is a string, wrap in Subheading component
  if (typeof children === "string") {
    return (
      <Subheading
        className={className}
        {...props}
      >
        {children}
      </Subheading>
    );
  }

  // If children is a React element or other content, render directly
  return (
    <h3
      ref={ref}
      className={cx(
        "text-lg font-semibold leading-none tracking-tight text-zinc-950 dark:text-white",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
};
CardHeading.displayName = "CardHeading";

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
  children: React.ReactNode;
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
  children: React.ReactNode;
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
   * Whether to show a border at the top of the footer.
   * Useful for visually separating footer from content.
   */
  border?: boolean;
  /**
   * Additional CSS classes.
   * Applied to the footer container.
   */
  className?: string;
  /**
   * Footer content.
   * Usually action buttons or additional information.
   */
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Card footer component for actions or additional content.
 */
const CardFooter = ({ ref, className, border = false, ...props }: CardFooterProps & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div
    ref={ref}
    className={cx(
      "flex items-center px-6 pb-6 rounded-b-lg",
      "bg-zinc-50 dark:bg-zinc-900",
      border ? "pt-6" : "pt-0",
      border && "border-t card-border",
      className,
    )}
    {...props}
  />
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardContent,
  type CardContentProps,
  CardDescription,
  type CardDescriptionProps,
  CardFooter,
  type CardFooterProps,
  CardHeader,
  type CardHeaderProps,
  CardHeading,
  type CardHeadingProps,
  type CardProps,
};
