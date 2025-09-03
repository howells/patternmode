"use client";

import { Icon } from "@patternmode/icon";
import type { IconComponent, IconSize } from "@patternmode/icon/types";
import { IconContainer } from "@patternmode/icon-container";
import { cx } from "@patternmode/utils/cx";
import type React from "react";

export type FeatureItemProps = React.HTMLAttributes<HTMLDivElement> & {
  icon?: IconComponent;
  iconSize?: IconSize;
  heading: string;
  iconPosition?: "left" | "top";
};

export const FeatureItem = ({
  icon: FeatureIcon,
  iconSize = "sm",
  heading,
  iconPosition = "left",
  className,
  children,
  ...props
}: FeatureItemProps) => {
  if (iconPosition === "top") {
    return (
      <div
        className={cx("text-sm", className)}
        data-testid="feature-item"
        {...props}
      >
        {FeatureIcon ? (
          <IconContainer
            aria-hidden="true"
            className="mb-3 rounded-full bg-zinc-200"
            icon={FeatureIcon}
            iconSize={iconSize}
          />
        ) : null}
        <dt className="text-zinc-900 dark:text-zinc-100">{heading}</dt>
        <dd className="mt-2 text-zinc-600 dark:text-zinc-400">{children}</dd>
      </div>
    );
  }

  return (
    <div
      className={cx("relative text-sm", className)}
      data-testid="feature-item"
      {...props}
    >
      <dt className="text-zinc-900 dark:text-zinc-100">
        {FeatureIcon ? (
          <Icon
            aria-hidden="true"
            className="-left-7 absolute top-[0.2rem]"
            icon={FeatureIcon}
            size={iconSize}
          />
        ) : null}
        {heading}
      </dt>
      <dd className="mt-2 text-zinc-600 dark:text-zinc-400">{children}</dd>
    </div>
  );
};
