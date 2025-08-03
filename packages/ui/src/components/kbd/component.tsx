"use client";

import type { VariantProps } from "tailwind-variants";

import React from "react";
import { tv } from "tailwind-variants";

import { cx } from "../../lib/utils";

const kbdVariants = tv({
  base: [
    // Base styling
    "pointer-events-none inline-flex items-center gap-1 rounded border font-mono font-medium",
  ],
  variants: {
    variant: {
      default: [
        // Light mode
        "border-zinc-200 bg-zinc-100 text-zinc-600",
        // Dark mode
        "dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
      ],
      onDarkButton: [
        // For use on dark buttons (default, destructive)
        "border-white/20 bg-white/10 text-white/90",
        "dark:border-white/20 dark:bg-white/10 dark:text-white/90",
      ],
      onLightButton: [
        // For use on light buttons (secondary, outline, ghost)
        "border-zinc-900/20 bg-zinc-900/10 text-zinc-900/90",
        "dark:border-zinc-100/20 dark:bg-zinc-100/10 dark:text-zinc-100/90",
      ],
    },
    size: {
      xs: "h-4 px-1 text-[9px]",
      sm: "h-5 px-1.5 text-[10px]",
      base: "h-6 px-2 text-sm",
      lg: "h-7 px-2.5 text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  },
});

type KbdProps = {
  /**
   * Array of keys to display for complex key combinations.
   * When provided, each key will be rendered as a separate kbd element.
   * @example ["cmd", "shift", "k"] or ["⌘", "⇧", "K"]
   */
  keys?: string[];
  /**
   * Platform for modifier key display.
   * Controls how modifier keys are rendered (Mac symbols vs text).
   * "auto" detects the platform automatically.
   */
  platform?: "mac" | "pc" | "auto";
  /**
   * Visual variant for different contexts.
   * Use "onDarkButton" when inside dark buttons, "onLightButton" for light buttons.
   */
  variant?: "default" | "onDarkButton" | "onLightButton";
} & React.ComponentPropsWithoutRef<"kbd"> & VariantProps<typeof kbdVariants>;

/**
 * Keyboard shortcut display component for showing keyboard shortcuts and commands.
 */
const Kbd = (
  { ref, className, children, keys, platform = "auto", size, variant, ...props }: KbdProps & { ref?: React.RefObject<HTMLElement | null> },
) => {
  // Use state to handle platform detection after hydration to avoid SSR mismatch
  const [isMac, setIsMac] = React.useState(false);
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    setIsHydrated(true);

    if (platform === "mac") {
      setIsMac(true);
    }
    else if (platform === "pc") {
      setIsMac(false);
    }
    else if (platform === "auto") {
      // Only detect platform after hydration to avoid SSR mismatch
      setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.userAgent));
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
        {...props}
      >
        {processedKeys.map((key, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="text-zinc-400 text-xs">+</span>}
            <kbd className={cx(kbdVariants({ size, variant }))}>{key}</kbd>
          </React.Fragment>
        ))}
      </span>
    );
  }

  // For single keys or children, render as single kbd
  return (
    <kbd
      ref={ref}
      className={cx(kbdVariants({ size, variant }), className)}
      {...props}
    >
      {children}
    </kbd>
  );
};

Kbd.displayName = "Kbd";

export { Kbd, type KbdProps, kbdVariants };
