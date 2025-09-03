import { getColorClasses } from "@patternmode/constants/variants";
import { Icon } from "@patternmode/icon";
import { cx } from "@patternmode/utils/cx";
import type { IconContainerProps } from "./types";
import { iconContainerVariants } from "./variants";

export const IconContainer = ({
  icon,
  size,
  variant,
  color,
  iconSize = "base",
  centered = false,
  className,
  iconClassName,
  ...props
}: IconContainerProps) => {
  const colorClasses = color ? getColorClasses(color) : null;

  return (
    <div
      className={cx(
        iconContainerVariants({ size, variant }),
        colorClasses?.bgMuted,
        centered && "mx-auto",
        className
      )}
      data-testid="icon-container"
      {...props}
    >
      <Icon
        className={cx(colorClasses?.textLight, iconClassName)}
        icon={icon}
        size={iconSize}
      />
    </div>
  );
};
