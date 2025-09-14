"use client";

import { useRender } from "@base-ui-components/react/use-render";
import { Icon } from "@patternmode/icon";
import { Loader } from "@patternmode/loader";
import { cx } from "@patternmode/utils/cx";
import { Moon, Sun } from "lucide-react";
import type React from "react";
import type { ThemeToggleProps } from "../types";
import { themeToggleVariants } from "../variants";

export const ThemeToggle = ({
  ref: forwardedRef,
  render = <button type="button" />,
  theme,
  onToggle,
  isLoading = false,
  size = "base",
  variant = "outline",
  rounded = false,
  className,
  ...otherProps
}: ThemeToggleProps & { ref?: React.RefObject<HTMLButtonElement | null> }) => {
  const getIconSize = (sz: ThemeToggleProps["size"]) => {
    switch (sz) {
      case "2xs":
        return "xs" as const;
      case "xs":
        return "sm" as const;
      case "sm":
        return "sm" as const;
      case "base":
        return "base" as const;
      case "lg":
        return "lg" as const;
      default:
        return "base" as const;
    }
  };

  const iconSize = getIconSize(size);
  const otherTheme = theme === "dark" ? "light" : "dark";

  const renderToggleContent = () => {
    if (isLoading) {
      return (
        <Loader
          aria-label="Loading theme toggle"
          size={size === "2xs" ? "xs" : size}
        />
      );
    }
    return (
      <>
        <Icon
          className={cx(
            "text-current transition-all duration-200",
            theme === "dark" ? "scale-0 opacity-0" : "scale-100 opacity-100"
          )}
          icon={Sun}
          size={iconSize}
        />
        <Icon
          className={cx(
            "absolute text-current transition-all duration-200",
            theme === "light" ? "scale-0 opacity-0" : "scale-100 opacity-100"
          )}
          icon={Moon}
          size={iconSize}
        />
      </>
    );
  };

  const defaultProps: useRender.ElementProps<"button"> & {
    "data-testid": string;
  } = {
    type: "button" as const,
    className: cx(themeToggleVariants({ size, variant, rounded }), className),
    "aria-label": `Switch to ${otherTheme} theme`,
    onClick: onToggle,
    disabled: isLoading || otherProps.disabled,
    "data-testid": "theme-toggle",
    children: (
      <>
        <span aria-hidden className="absolute pointer-fine:hidden size-12" />
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
