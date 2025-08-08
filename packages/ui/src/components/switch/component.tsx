import type { SwitchProps } from "./types";
import { Switch as BaseSwitch } from "@base-ui-components/react/switch";

import React from "react";
import { cx } from "../../utils/cx";
import { switchVariants } from "./variants";

/**
 * A binary toggle switch component for on/off states with smooth animations and full accessibility support.
 */
const Switch = ({ ref: forwardedRef, className, size, label, ...props }: SwitchProps & { ref?: React.RefObject<React.ElementRef<typeof BaseSwitch.Root> | null> }) => {
  const { root, thumb } = switchVariants({ size });

  if (label) {
    return (
      <div className="flex items-center space-x-2">
        <BaseSwitch.Root
          ref={forwardedRef}
          className={cx(root(), className)}
          data-testid="switch"
          {...props}
        >
          <BaseSwitch.Thumb className={cx(thumb())} />
        </BaseSwitch.Root>
        <span className="text-sm text-zinc-900 dark:text-zinc-100">
          {label}
        </span>
      </div>
    );
  }

  return (
    <BaseSwitch.Root
      ref={forwardedRef}
      className={cx(root(), className)}
      data-testid="switch"
      {...props}
    >
      <BaseSwitch.Thumb className={cx(thumb())} />
    </BaseSwitch.Root>
  );
};

Switch.displayName = "Switch";

// Export individual components for advanced usage
const SwitchRoot = BaseSwitch.Root;
const SwitchThumb = BaseSwitch.Thumb;

export { Switch, SwitchRoot, SwitchThumb };
