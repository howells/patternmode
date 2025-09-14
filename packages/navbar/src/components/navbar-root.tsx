"use client";

import { cx } from "@patternmode/utils/cx";
import type React from "react";

type NavbarProps = {
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<"nav">;

/**
 * Root navbar component for horizontal navigation layouts.
 */
const Navbar = ({ className, ...props }: NavbarProps) => {
  return (
    <nav
      data-testid="navbar"
      {...props}
      className={cx(className, "flex flex-1 items-center gap-4 py-2.5")}
    />
  );
};

Navbar.displayName = "Navbar";

export { Navbar };
export type { NavbarProps };
