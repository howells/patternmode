"use client";

import { cx } from "@patternmode/utils/cx";
import React from "react";

const IS_APPLE_DEVICE = /Mac|iPhone|iPad|iPod/;

import type { KbdProps } from "./types";
import { kbdVariants } from "./variants";

/**
 * Keyboard shortcut display component for showing keyboard shortcuts and commands.
 */
const Kbd = ({
  ref,
  className,
  children,
  keys,
  platform = "auto",
  size,
  variant,
  ...props
}: KbdProps & { ref?: React.RefObject<HTMLElement | null> }) => {
  // Use state to handle platform detection after hydration to avoid SSR mismatch
  const [isMac, setIsMac] = React.useState(false);
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    setIsHydrated(true);

    if (platform === "mac") {
      setIsMac(true);
    } else if (platform === "pc") {
      setIsMac(false);
    } else if (platform === "auto") {
      // Only detect platform after hydration to avoid SSR mismatch
      setIsMac(IS_APPLE_DEVICE.test(navigator.userAgent));
    }
  }, [platform]);

  // Convert platform-agnostic keys to platform-specific
  const processKeys = (keyList: string[]) => {
    return keyList.map((key) => {
      switch (key.toLowerCase()) {
        case "mod":
        case "cmd":
        case "command":
          return isHydrated && isMac ? "⌘" : "Ctrl";
        case "ctrl":
        case "control":
          return isHydrated && isMac ? "⌃" : "Ctrl";
        case "alt":
        case "option":
          return isHydrated && isMac ? "⌥" : "Alt";
        case "shift":
          return isHydrated && isMac ? "⇧" : "Shift";
        case "meta":
          return isHydrated && isMac ? "⌘" : "Win";
        default:
          return key;
      }
    });
  };

  // For multiple keys, render each as separate kbd elements
  if (keys && keys.length > 0) {
    const processedKeys = processKeys(keys);
    return (
      <span
        className={cx("inline-flex items-center gap-1", className)}
        data-testid="kbd"
        {...props}
      >
        {processedKeys.map((key, index) => (
          <React.Fragment key={key}>
            {index > 0 && <span className="text-xs text-zinc-400">+</span>}
            <kbd className={cx(kbdVariants({ size, variant }))}>{key}</kbd>
          </React.Fragment>
        ))}
      </span>
    );
  }

  // For single keys or children, render as single kbd
  return (
    <kbd
      className={cx(kbdVariants({ size, variant }), className)}
      data-testid="kbd"
      ref={ref}
      {...props}
    >
      {children}
    </kbd>
  );
};

Kbd.displayName = "Kbd";

export { Kbd };
