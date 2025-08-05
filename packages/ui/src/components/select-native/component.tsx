import type { SelectNativeProps } from "./types";

import React from "react";
import { cx } from "../../lib/utils";
import { selectNativeStyles } from "./variants";

/**
 * A styled native HTML select component with consistent design system styling.
 */
const SelectNative = ({ ref: forwardedRef, className, hasError, size, ...props }: SelectNativeProps & { ref?: React.RefObject<HTMLSelectElement | null> }) => {
  return (
    <select
      ref={forwardedRef}
      className={cx(selectNativeStyles({ hasError, size }), className)}
      data-testid="select-native"
      {...props}
    />
  );
};

SelectNative.displayName = "SelectNative";

export { SelectNative };
