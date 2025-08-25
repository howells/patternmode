import { DEFAULT_ICON_STROKE_WIDTH } from "@patternmode/constants/defaults";
import { cx } from "@patternmode/utils/cx";
import { X } from "lucide-react";
import type React from "react";
import { Icon } from "@patternmode/icon";
import type { DismissButtonProps } from "./types";
import { dismissButtonVariants } from "./variants";

const dismissButtonToIconSizeMap = { xs: "xs", sm: "sm", base: "base", lg: "lg" } as const;

const DismissButton = ({
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

DismissButton.displayName = "DismissButton";

export { DismissButton };
