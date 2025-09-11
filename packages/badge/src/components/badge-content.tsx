"use client";

import type * as React from "react";

/**
 * Main content component for badges
 * Handles the primary text content of the badge
 */
export type BadgeContentProps = {
  children: React.ReactNode;
};

export function BadgeContent({ children }: BadgeContentProps) {
  return <>{children}</>;
}
