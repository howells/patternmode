import { DEFAULT_ICON_STROKE_WIDTH } from "@patternmode/constants/defaults";
import { cx } from "@patternmode/utils/cx";
import { X } from "lucide-react";
import type * as React from "react";
import { Icon } from "@patternmode/icon";
import { focusRing } from "@patternmode/config/styles";
import { tv } from "tailwind-variants";

export type DismissButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  iconStrokeWidth?: number;
  size?: "xs" | "sm" | "base" | "lg";
  "aria-label"?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const dismissButtonVariants = tv({
  base: [
    "flex items-center justify-center rounded-full transition-colors",
    "text-current",
    "hover:bg-current/10 hover:text-current",
    focusRing,
  ],
  variants: { size: { xs: "size-3.5", sm: "size-4", base: "size-5", lg: "size-6" } },
  defaultVariants: { size: "base" },
});

const dismissButtonToIconSizeMap = { xs: "xs", sm: "sm", base: "base", lg: "lg" } as const;

export const DismissButton = ({
  ref,
  onClick,
  icon: IconComponent = X,
  iconStrokeWidth = DEFAULT_ICON_STROKE_WIDTH,
  size = "base",
  className,
  "aria-label": ariaLabel = "Remove",
  ...props
}: DismissButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) => {
  const iconSize = dismissButtonToIconSizeMap[size];
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      data-testid="dismiss-button"
      className={cx(dismissButtonVariants({ size }), className)}
      aria-label={ariaLabel}
      {...props}
    >
      <Icon icon={IconComponent} size={iconSize} strokeWidth={iconStrokeWidth} />
    </button>
  );
};
