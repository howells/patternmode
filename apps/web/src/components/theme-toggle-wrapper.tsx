"use client";

import { ThemeToggle } from "@patternmode/ui/components/theme-toggle";
import { useTheme } from "next-themes";
import React from "react";

type ThemeToggleWrapperProps = {
  /**
   * Size variant for the toggle button.
   */
  size?: "xs" | "sm" | "base" | "lg";
  /**
   * Visual variant for the toggle button.
   */
  variant?: "primary" | "secondary" | "outline" | "outline-dashed" | "ghost" | "destructive" | "inverse-ghost" | "link" | "minimal";
  /**
   * Whether to use rounded/pill shape.
   */
  rounded?: boolean;
  /**
   * Additional CSS classes.
   */
  className?: string;
};

/**
 * Theme toggle wrapper that integrates the generic ThemeToggle component
 * with next-themes for the web application.
 */
export function ThemeToggleWrapper({
  size = "base",
  variant = "outline",
  rounded = false,
  className,
}: ThemeToggleWrapperProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <ThemeToggle
        theme="light" // fallback while loading
        onToggle={() => {}}
        isLoading={true}
        size={size}
        variant={variant}
        rounded={rounded}
        className={className}
      />
    );
  }

  const currentTheme = (resolvedTheme as "light" | "dark") || "light";
  const otherTheme = currentTheme === "dark" ? "light" : "dark";

  return (
    <ThemeToggle
      theme={currentTheme}
      onToggle={() => setTheme(otherTheme)}
      size={size}
      variant={variant}
      rounded={rounded}
      className={className}
    />
  );
}