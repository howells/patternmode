import { defaultConfig } from "@patternmode/config/default-config";
import { cx } from "@patternmode/utils/cx";
import { ChevronsUpDown } from "lucide-react";
import type React from "react";
import { Icon } from "@patternmode/icon";
import type { SelectNativeProps } from "./types";
import { selectNativeStyles } from "./variants";

const SelectNative = ({ ref: forwardedRef, className, hasError, size, ...props }: SelectNativeProps & { ref?: React.RefObject<HTMLSelectElement | null> }) => {
  return (
    <div className="relative">
      <select ref={forwardedRef} className={cx(selectNativeStyles({ hasError, size }), className)} data-testid="select-native" {...props} />
      <div className={cx("absolute inset-y-0 right-0 flex items-center pointer-events-none", size === "xs" && "pr-2.5", size === "sm" && "pr-3", size === "base" && "pr-3", size === "lg" && "pr-4")}> 
        <span className="text-zinc-400 dark:text-zinc-500">
          <Icon icon={ChevronsUpDown} size={size === "2xs" ? "xs" : size} strokeWidth={defaultConfig.components.iconStrokeWidth} />
        </span>
      </div>
    </div>
  );
};

SelectNative.displayName = "SelectNative";

export { SelectNative };

