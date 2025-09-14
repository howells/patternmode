"use client";

import { Subheading } from "@patternmode/subheading";
import { Text } from "@patternmode/text";
import { cx } from "@patternmode/utils/cx";
import type React from "react";
import type { CalloutProps } from "../types";
import { calloutVariants } from "../variants";

const Callout = ({
  ref: forwardedRef,
  title,
  icon: Icon,
  className,
  variant = "default",
  children,
  ...props
}: CalloutProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  return (
    <div
      className={cx(calloutVariants({ variant }), className)}
      data-testid="callout"
      ref={forwardedRef}
      {...props}
    >
      <div className={cx("flex items-start gap-3")}>
        {Icon && (
          <Icon aria-hidden="true" className={cx("mt-1 size-4 shrink-0")} />
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

export { Callout };
