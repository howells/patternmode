import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { cx } from "@patternmode/utils/cx";
import type { ResponsiveSpacing, SpacingValue } from "@patternmode/utils/spacing";
import { generateResponsiveSpacingClasses, getBaseSpacingValue, getPaddingClass } from "@patternmode/utils/spacing";
import type React from "react";
import { Subheading } from "@patternmode/subheading";
import { cardVariants } from "./variants";

type CardProps = {
  variant?: "default" | "dashed";
  padding?: ResponsiveSpacing<SpacingValue>;
  fillHeight?: boolean;
  render?: useRender.RenderProp<Record<string, unknown>>;
  className?: string;
} & useRender.ComponentProps<"div">;

const Card = ({
  ref: forwardedRef,
  render = <div />,
  variant,
  padding,
  fillHeight,
  className,
  ...props
}: CardProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const basePadding = getBaseSpacingValue(padding);
  const responsivePaddingClasses = generateResponsiveSpacingClasses("padding", padding);
  const basePaddingClass = basePadding !== undefined ? getPaddingClass(basePadding) : "";

  const defaultProps: useRender.ElementProps<"div"> = {
    className: cx(cardVariants({ variant, fillHeight }), basePaddingClass, responsivePaddingClasses, className),
    "data-testid": "card",
  } as React.HTMLAttributes<HTMLDivElement>;

  const element = useRender({ render, ref: forwardedRef, props: mergeProps<"div">(defaultProps, props) });
  return element;
};

Card.displayName = "Card";

type CardHeaderProps = { border?: boolean; className?: string } & React.HTMLAttributes<HTMLDivElement>;
const CardHeader = ({ ref, className, border = false, ...props }: CardHeaderProps & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div ref={ref} className={cx("flex flex-col space-y-1.5 p-6", border && "border-b border-zinc-200 dark:border-zinc-800 card-border", className)} {...props} />
);
CardHeader.displayName = "CardHeader";

type CardHeadingProps = { className?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>;
const CardHeading = ({ ref, className, children, ...props }: CardHeadingProps & { ref?: React.RefObject<HTMLHeadingElement | null> }) => {
  if (typeof children === "string") {
    return (
      <Subheading className={className} {...props}>
        {children}
      </Subheading>
    );
  }
  return (
    <h3 ref={ref} className={cx("text-lg font-semibold leading-none tracking-tight text-zinc-950 dark:text-white", className)} {...props}>
      {children}
    </h3>
  );
};
CardHeading.displayName = "CardHeading";

type CardDescriptionProps = { className?: string } & React.HTMLAttributes<HTMLParagraphElement>;
const CardDescription = ({ ref, className, ...props }: CardDescriptionProps & { ref?: React.RefObject<HTMLParagraphElement | null> }) => (
  <p ref={ref} className={cx("text-sm text-zinc-500 dark:text-zinc-400", className)} {...props} />
);
CardDescription.displayName = "CardDescription";

type CardContentProps = { className?: string } & React.HTMLAttributes<HTMLDivElement>;
const CardContent = ({ ref, className, ...props }: CardContentProps & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div ref={ref} className={cx("p-6", className)} {...props} />
);
CardContent.displayName = "CardContent";

type CardFooterProps = { border?: boolean; className?: string } & React.HTMLAttributes<HTMLDivElement>;
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

