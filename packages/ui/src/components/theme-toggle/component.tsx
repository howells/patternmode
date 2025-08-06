"use client";

import type { ThemeToggleProps } from "./types";
import { useRender } from "@base-ui-components/react/use-render";
import { Loader2, Moon, Sun } from "lucide-react";
import React from "react";
import { config } from "../../lib/config";
import { cx } from "../../lib/utils";
import { themeToggleVariants } from "./variants";

/**
 * Toggle button for switching between light and dark themes.
 * Generic component that requires theme state and toggle handler from parent.
 */
export const ThemeToggle = ({ 
  ref: forwardedRef, 
  render = <button />,
  theme, 
  onToggle, 
  isLoading = false, 
  size = "default", 
  variant = "outline", 
  rounded = false, 
  className,
  ...otherProps 
}: ThemeToggleProps & { ref?: React.RefObject<HTMLButtonElement | null> }) => {
  
  // Get icon size based on button size
  const getIconSize = (size: ThemeToggleProps["size"]) => {
    switch (size) {
      case "xs":
        return "sm" as const;
      case "sm":
        return "sm" as const;
      case "default":
        return "base" as const;
      case "lg":
        return "lg" as const;
      default:
        return "base" as const;
    }
  };

  const iconSize = getIconSize(size);
  const otherTheme = theme === "dark" ? "light" : "dark";
  const strokeWidth = config.getIconStrokeWidth();

  const renderToggleContent = () => {
    if (isLoading) {
      return (
        <Loader2 
          className={cx("animate-spin text-current", {
            "size-3": iconSize === "sm",
            "size-4": iconSize === "base", 
            "size-5": iconSize === "lg",
          })}
          strokeWidth={strokeWidth}
        />
      );
    }

    return (
      <>
        {/* Sun icon - visible in light mode */}
        <Sun
          className={cx(
            "text-current transition-all duration-200",
            theme === "dark" ? "scale-0 opacity-0" : "scale-100 opacity-100",
            {
              "size-3": iconSize === "sm",
              "size-4": iconSize === "base", 
              "size-5": iconSize === "lg",
            }
          )}
          strokeWidth={strokeWidth}
        />
        
        {/* Moon icon - visible in dark mode */}  
        <Moon
          className={cx(
            "absolute text-current transition-all duration-200",
            theme === "light" ? "scale-0 opacity-0" : "scale-100 opacity-100",
            {
              "size-3": iconSize === "sm",
              "size-4": iconSize === "base", 
              "size-5": iconSize === "lg",
            }
          )}
          strokeWidth={strokeWidth}
        />
      </>
    );
  };

  const defaultProps: useRender.ElementProps<"button"> & { "data-testid": string } = {
    type: "button" as const,
    className: cx(
      themeToggleVariants({ size, variant, rounded }),
      className,
    ),
    "aria-label": `Switch to ${otherTheme} theme`,
    onClick: onToggle,
    disabled: isLoading || otherProps.disabled,
    "data-testid": "theme-toggle",
    children: (
      <>
        {/* Touch target for mobile devices */}
        <span className="absolute size-12 pointer-fine:hidden" aria-hidden="true" />
        {renderToggleContent()}
      </>
    ),
  };

  const element = useRender({
    render,
    ref: forwardedRef ?? undefined,
    props: { ...defaultProps, ...otherProps },
  });

  return element;
};

ThemeToggle.displayName = "ThemeToggle";