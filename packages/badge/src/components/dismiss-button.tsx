import type { Size } from "@patternmode/config/sizes";
import { DEFAULT_ICON_STROKE_WIDTH } from "@patternmode/constants/defaults";
import { Icon } from "@patternmode/icon";
import { cx } from "@patternmode/utils/cx";
import { focusRing } from "@patternmode/utils/focus-ring";
import { X } from "lucide-react";
import type * as React from "react";
import { tv } from "tailwind-variants";

export type DismissButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  iconStrokeWidth?: number;
  size?: Size;
  "aria-label"?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const dismissButtonVariants = tv({
  base: [
    "flex items-center justify-center rounded-full transition-colors",
    "text-current",
    "hover:bg-current/10 hover:text-current",
    focusRing,
  ],
  variants: {
    size: {
      "2xs": "size-3",
      xs: "size-3.5",
      sm: "size-4",
      base: "size-5",
      lg: "size-6",
    },
  },
  defaultVariants: { size: "base" },
});

const dismissButtonToIconSizeMap = {
  "2xs": "xs",
  xs: "xs",
  sm: "sm",
  base: "base",
  lg: "lg",
} as const;

export const DismissButton = ({
  ref,
  onClick,
  icon: IconComponent = X,
  iconStrokeWidth = DEFAULT_ICON_STROKE_WIDTH,
  size = "base",
  className,
  "aria-label": ariaLabel = "Remove",
  ...props
}: DismissButtonProps & {
  ref?: React.RefObject<HTMLButtonElement | null>;
}) => {
  const iconSize = dismissButtonToIconSizeMap[size];
  return (
    <button
      aria-label={ariaLabel}
      className={cx(dismissButtonVariants({ size }), className)}
      data-testid="dismiss-button"
      onClick={onClick}
      ref={ref}
      type="button"
      {...props}
    >
      <Icon
        icon={IconComponent}
        size={iconSize}
        strokeWidth={iconStrokeWidth}
      />
    </button>
  );
};
