import type { SelectNativeProps } from "./types";

import { ChevronsUpDown } from "lucide-react";
import React from "react";
import { config } from "../../lib/config";
import { renderIcon } from "../../lib/icon-utils";
import { cx } from "../../lib/utils";
import { selectNativeStyles } from "./variants";

/**
 * A styled native HTML select component with consistent design system styling.
 */
const SelectNative = ({ ref: forwardedRef, className, hasError, size, ...props }: SelectNativeProps & { ref?: React.RefObject<HTMLSelectElement | null> }) => {
  return (
    <div className="relative">
      <select
        ref={forwardedRef}
        className={cx(selectNativeStyles({ hasError, size }), className)}
        data-testid="select-native"
        {...props}
      />
      {/* Custom chevron icon - matches Select component */}
      <div className={cx(
        "absolute inset-y-0 right-0 flex items-center pointer-events-none",
        // Size-based positioning to match padding
        size === "xs" && "pr-2.5",
        size === "sm" && "pr-3",
        size === "base" && "pr-3",
        size === "lg" && "pr-4",
      )}
      >
        <span className="text-zinc-400 dark:text-zinc-500">
          {renderIcon(ChevronsUpDown, size, config.getIconStrokeWidth())}
        </span>
      </div>
    </div>
  );
};

SelectNative.displayName = "SelectNative";

export { SelectNative };
