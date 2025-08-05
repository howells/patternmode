// Tremor Toggle [v1.0.0] - Base UI

"use client";

import type { ToggleProps } from "./types";
import { Toggle as BaseToggle } from "@base-ui-components/react/toggle";

import React from "react";
import { cx } from "../../lib/utils";
import { toggleVariants } from "./variants";

/**
 * A two-state button component that toggles between pressed (on) and unpressed (off) states.
 */
const Toggle = ({ ref, className, variant, size, ...props }: ToggleProps & { ref?: React.RefObject<React.ElementRef<typeof BaseToggle> | null> }) => (
  <BaseToggle
    data-testid="toggle"
    ref={ref}
    className={cx(toggleVariants({ variant, size }), className)}
    {...props}
  />
);

Toggle.displayName = "Toggle";

// Export individual components for advanced usage
const ToggleRoot = BaseToggle;

export { Toggle, ToggleRoot };
