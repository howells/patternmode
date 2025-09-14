import { HeadingElement } from "@patternmode/heading-element";
import { Subheading } from "@patternmode/subheading";
import { cx } from "@patternmode/utils/cx";
import type React from "react";

export type CardHeadingProps = {
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;

export const CardHeading = ({
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
