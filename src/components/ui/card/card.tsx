// Card Component [v1.0.0] - Pure Implementation

import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import React from "react";

import { cx } from "@/lib/utils";

/**
 * Props for the Card component.
 *
 * @interface CardProps
 * @extends useRender.ComponentProps<"div">
 */
interface CardProps extends useRender.ComponentProps<"div"> {
  /**
   * Padding for the card (Tailwind scale).
   * @default 6
   */
  padding?:
    | 0
    | 0.5
    | 1
    | 1.5
    | 2
    | 2.5
    | 3
    | 3.5
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12;
  /**
   * Whether the card should fill the height of its container.
   * Useful in grid layouts or flex containers.
   * @default false
   */
  fillHeight?: boolean;
}

/**
 * A flexible container component with Tremor-inspired styling.
 *
 * Built using Base UI's render prop pattern for maximum flexibility while
 * maintaining consistent styling. Features configurable padding, subtle borders,
 * and dark mode support. Perfect for grouping related content and creating
 * structured layouts.
 *
 * @param render - Custom element to render (defaults to div)
 * @param padding - Padding scale value (0-12, defaults to 6)
 * @param fillHeight - Whether card should fill container height (defaults to false)
 * @param className - Additional CSS classes
 *
 * @component
 * @example
 * ```tsx
 * // Basic card
 * <Card>
 *   <h2>Card Title</h2>
 *   <p>Card content goes here.</p>
 * </Card>
 *
 * // Card with header components
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description goes here</CardDescription>
 *     <CardAction>
 *       <Button variant="outline">Action</Button>
 *     </CardAction>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card content</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Submit</Button>
 *   </CardFooter>
 * </Card>
 *
 * // Card with custom padding
 * <Card padding={4}>
 *   <h3>Less padding</h3>
 *   <p>More compact layout.</p>
 * </Card>
 *
 * // Card with no padding (for custom layouts)
 * <Card padding={0}>
 *   <img src="/image.jpg" alt="Full width image" />
 *   <div className="p-6">
 *     <h3>Custom padding areas</h3>
 *   </div>
 * </Card>
 *
 * // Card that fills container height (useful in grids)
 * <Grid columns={3}>
 *   <GridCell>
 *     <Card fillHeight>
 *       <h3>Tall Card</h3>
 *       <p>This card will stretch to match the height of other grid cells.</p>
 *     </Card>
 *   </GridCell>
 * </Grid>
 * ```
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { render = <div />, padding = 6, fillHeight = false, className, ...props },
    forwardedRef
  ) => {
    const defaultProps: useRender.ElementProps<"div"> = {
      className: cx(
        // base
        "relative w-full rounded-lg text-left text-sm shadow-xs inset-ring-1 inset-ring-black/10 dark:inset-ring-white/10",
        // height
        fillHeight && "h-full",
        // padding
        padding === 0 && "p-0",
        padding === 0.5 && "p-0.5",
        padding === 1 && "p-1",
        padding === 1.5 && "p-1.5",
        padding === 2 && "p-2",
        padding === 2.5 && "p-2.5",
        padding === 3 && "p-3",
        padding === 3.5 && "p-3.5",
        padding === 4 && "p-4",
        padding === 5 && "p-5",
        padding === 6 && "p-6",
        padding === 7 && "p-7",
        padding === 8 && "p-8",
        padding === 9 && "p-9",
        padding === 10 && "p-10",
        padding === 11 && "p-11",
        padding === 12 && "p-12",
        // inset ring border (similar to button)
        "inset-ring-1 inset-ring-black/10",
        "dark:inset-ring-white/10",
        // background color
        "bg-white dark:bg-[#090E1A]",
        className
      ),
    };

    const element = useRender({
      render,
      ref: forwardedRef,
      props: mergeProps<"div">(defaultProps, props),
    });

    return element;
  }
);

Card.displayName = "Card";

/**
 * Card header component for titles, descriptions and actions.
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { border?: boolean }
>(({ className, border = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cx(
      "flex flex-col space-y-1.5 p-6",
      border && "border-b border-zinc-200 dark:border-zinc-800",
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/**
 * Card title component with consistent typography.
 */
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cx(
      "text-lg font-semibold leading-none tracking-tight text-zinc-950 dark:text-white",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/**
 * Card description component with muted text styling.
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cx("text-sm text-zinc-500 dark:text-zinc-400", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/**
 * Card action component for buttons or interactive elements in the header.
 */
const CardAction = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cx("flex items-center", className)} {...props} />
));
CardAction.displayName = "CardAction";

/**
 * Card content component for main content area.
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cx("p-6", className)} {...props} />
));
CardContent.displayName = "CardContent";

/**
 * Card footer component for actions or additional content.
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cx("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  type CardProps,
};
