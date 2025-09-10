import { Icon } from "@patternmode/icon";
import { Loader } from "@patternmode/loader";
import { cx } from "@patternmode/utils/cx";
import type { ButtonProps } from "../types";
import { getIconContainerSize, getIconSize, getLoaderSize } from "../utils";
import { getIconOpacityClass } from "../utils/button-utils";

export type IconContainerProps = {
  size: ButtonProps["size"];
  icon?: ButtonProps["icon"] | ButtonProps["leftIcon"];
  isLoading?: boolean;
  loadingText?: string;
  showOnHover?: boolean;
  iconStrokeWidth?: number;
};

/**
 * Reusable component for rendering icon containers with loading states
 */
export const IconContainer: React.FC<IconContainerProps> = ({
  size = "base",
  icon,
  isLoading = false,
  loadingText,
  showOnHover = false,
  iconStrokeWidth,
}) => {
  return (
    <span className="relative flex items-center transition-all duration-150 ease-in-out">
      <div
        className={`relative ${getIconContainerSize(size)} flex items-center justify-center`}
      >
        <div
          className={cx(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-150 ease-in-out",
            isLoading ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <Loader
            aria-label={loadingText || "Loading"}
            size={getLoaderSize(size)}
          />
        </div>
        {icon && (
          <div
            className={cx(
              "absolute inset-0 flex items-center justify-center transition-opacity duration-150 ease-in-out",
              getIconOpacityClass(isLoading, showOnHover)
            )}
          >
            <Icon
              icon={icon}
              size={getIconSize(size)}
              strokeWidth={iconStrokeWidth}
            />
          </div>
        )}
      </div>
    </span>
  );
};
