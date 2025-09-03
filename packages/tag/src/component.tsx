import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { Avatar } from "@patternmode/avatar";
import { DEFAULT_ICON_STROKE_WIDTH } from "@patternmode/constants/defaults";
import { DismissButton } from "@patternmode/dismiss-button";
import { Icon } from "@patternmode/icon";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";

function getPaddingClasses(
  avatar: TagProps["avatar"],
  dismissible: boolean
): string {
  if (avatar) {
    return dismissible ? "pl-1 pr-1" : "pl-1 pr-3";
  }
  return dismissible ? "pl-2.5 pr-1" : "px-3";
}

export type TagProps = {
  label?: string;
  value: string;
  count?: string | number;
  countClassName?: string;
  dismissible?: boolean;
  onDismiss?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  leftIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  iconStrokeWidth?: number;
  avatar?: { src?: string; alt?: string; initials?: string };
  dismissAriaLabel?: string;
} & useRender.ComponentProps<"span">;

const Tag = ({
  ref: forwardedRef,
  render = <span />,
  label,
  value,
  count,
  countClassName,
  dismissible = false,
  onDismiss,
  icon,
  leftIcon,
  iconStrokeWidth = DEFAULT_ICON_STROKE_WIDTH,
  avatar,
  className,
  dismissAriaLabel = "Remove",
  ...props
}: TagProps) => {
  const effectiveIcon = icon || leftIcon;
  const defaultProps: useRender.ElementProps<"span"> & {
    "data-testid": string;
  } = {
    "data-testid": "tag",
    className: cx(
      "inline-flex items-center gap-x-2 rounded-full py-1 text-sm",
      getPaddingClasses(avatar, dismissible),
      "bg-white dark:bg-[#090E1A]",
      "text-zinc-700 dark:text-zinc-300",
      "ring-1 ring-inset ring-zinc-200 dark:ring-zinc-800",
      className
    ),
    children: (
      <>
        {avatar && (
          <Avatar
            alt={avatar.alt}
            className="size-6"
            initials={avatar.initials}
            size="xs"
            src={avatar.src}
          />
        )}
        {effectiveIcon && !avatar && (
          <Icon icon={effectiveIcon} size="xs" strokeWidth={iconStrokeWidth} />
        )}
        {label && (
          <>
            <span className="text-xs text-zinc-700 dark:text-zinc-300">
              {label}
            </span>
            <span className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
          </>
        )}
        <span className="font-medium text-xs text-zinc-900 dark:text-zinc-50">
          {value}
          {count !== undefined && count !== "" && (
            <span
              className={cx(
                "ml-1.5 font-normal text-xs text-zinc-500 dark:text-zinc-400",
                countClassName
              )}
            >
              {count}
            </span>
          )}
        </span>
        {dismissible && (
          <DismissButton
            aria-label={dismissAriaLabel}
            className={cx(
              count !== undefined && count !== "" ? "-ml-1.5" : "-ml-1"
            )}
            onClick={onDismiss}
            size="xs"
          />
        )}
      </>
    ) as React.ReactNode,
  };

  const element = useRender({
    render,
    ref: forwardedRef,
    props: mergeProps<"span">(defaultProps, props),
  });
  return element;
};

Tag.displayName = "Tag";

export { Tag };
