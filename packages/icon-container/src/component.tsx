import { cx } from "@patternmode/utils/cx";
import { getColorClasses } from "@patternmode/constants/variants";
import { Icon } from "@patternmode/icon";
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
      data-testid="icon-container"
      className={cx(
        iconContainerVariants({ size, variant }),
        colorClasses?.bgMuted,
        centered && "mx-auto",
        className,
      )}
      {...props}
    >
      <Icon icon={icon} size={iconSize} className={cx(colorClasses?.textLight, iconClassName)} />
    </div>
  );
};

