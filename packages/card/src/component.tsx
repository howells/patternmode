import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { HeadingElement } from "@patternmode/heading-element";
import { Subheading } from "@patternmode/subheading";
import { cx } from "@patternmode/utils/cx";
import type {
  ResponsiveSpacing,
  SpacingValue,
} from "@patternmode/utils/spacing";
import {
  generateResponsiveSpacingClasses,
  getBaseSpacingValue,
  getPaddingClass,
} from "@patternmode/utils/spacing";
import type React from "react";
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
  const responsivePaddingClasses = generateResponsiveSpacingClasses(
    "padding",
    padding
  );
  const basePaddingClass =
    basePadding !== undefined ? getPaddingClass(basePadding) : "";

  const defaultProps: useRender.ElementProps<"div"> = {
    className: cx(
      cardVariants({ variant, fillHeight }),
      basePaddingClass,
      responsivePaddingClasses,
      className
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
  border?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
const CardHeader = ({
  ref,
  className,
  border = true,
  ...props
}: CardHeaderProps & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div
    className={cx(
      "flex flex-col space-y-1.5 p-6",
      border && "border-zinc-950/5 border-b dark:border-zinc-800",
      className
    )}
    ref={ref}
    {...props}
  />
);
CardHeader.displayName = "CardHeader";

type CardHeadingProps = {
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;
const CardHeading = ({
  ref,
  className,
  children,
  ...props
}: CardHeadingProps & { ref?: React.RefObject<HTMLHeadingElement | null> }) => {
  if (typeof children === "string") {
    return (
      <Subheading className={className} {...props}>
        {children}
      </Subheading>
    );
  }
  return (
    <HeadingElement
      className={cx(
        "text-lg text-zinc-950 leading-none tracking-tight dark:text-white",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </HeadingElement>
  );
};
CardHeading.displayName = "CardHeading";

type CardDescriptionProps = {
  className?: string;
} & React.HTMLAttributes<HTMLParagraphElement>;
const CardDescription = ({
  ref,
  className,
  ...props
}: CardDescriptionProps & {
  ref?: React.RefObject<HTMLParagraphElement | null>;
}) => (
  <p
    className={cx("text-sm text-zinc-500 dark:text-zinc-400", className)}
    ref={ref}
    {...props}
  />
);
CardDescription.displayName = "CardDescription";

type CardContentProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
const CardContent = ({
  ref,
  className,
  ...props
}: CardContentProps & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div className={cx("p-6 text-sm", className)} ref={ref} {...props} />
);
CardContent.displayName = "CardContent";

type CardFooterProps = {
  border?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
const CardFooter = ({
  ref,
  className,
  border = false,
  ...props
}: CardFooterProps & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div
    className={cx(
      "mt-auto flex items-center rounded-b-lg px-6 pb-6",
      "bg-zinc-50 dark:bg-zinc-900",
      border ? "pt-6" : "pt-0",
      border && "border-zinc-100 border-t dark:border-zinc-800",
      className
    )}
    ref={ref}
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
