import type { Size } from "@patternmode/config/sizes";
import { DEFAULT_ICON_STROKE_WIDTH } from "@patternmode/constants/defaults";
import { Icon } from "@patternmode/icon";
import type { IconSize } from "@patternmode/icon/types";
import { cx } from "@patternmode/utils/cx";
import { ChevronsUpDown } from "lucide-react";
import type React from "react";
import type { SelectNativeProps } from "../types";
import { selectNativeStyles } from "../variants";

const SelectNative = ({
  ref: forwardedRef,
  className,
  hasError,
  size,
  ...props
}: SelectNativeProps & { ref?: React.RefObject<HTMLSelectElement | null> }) => {
  const mapStyleSize = (s?: Size): "xs" | "sm" | "base" | "lg" | undefined => {
    if (s === undefined) {
      return;
    }
    if (s === "2xs") {
      return "xs";
    }
    return s;
  };
  const styleSize = mapStyleSize(size);
  return (
    <div className="relative">
      <select
        className={cx(
          selectNativeStyles({ hasError, size: styleSize }),
          className
        )}
        data-testid="select-native"
        ref={forwardedRef}
        {...props}
      />
      <div
        className={cx(
          "pointer-events-none absolute inset-y-0 right-0 flex items-center",
          size === "xs" && "pr-2.5",
          size === "sm" && "pr-3",
          size === "base" && "pr-3",
          size === "lg" && "pr-4"
        )}
      >
        <span className="text-zinc-400 dark:text-zinc-500">
          {(() => {
            const mapIconSize = (s?: Size): IconSize => {
              if (s === "2xs") {
                return "xs";
              }
              return s ?? "base";
            };
            return (
              <Icon
                icon={ChevronsUpDown}
                size={mapIconSize(size)}
                strokeWidth={DEFAULT_ICON_STROKE_WIDTH}
              />
            );
          })()}
        </span>
      </div>
    </div>
  );
};

SelectNative.displayName = "SelectNative";

export { SelectNative };
