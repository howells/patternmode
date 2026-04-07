"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Fallback as AvatarFallbackPrimitive } from "@radix-ui/react-avatar";
import type { ComponentProps } from "react";
import {
  getColorFromName,
  getInitials,
  getReadableTextColor,
} from "../../lib/color";
import type { AvatarSize } from "./avatar-root";

// Avatar fallback background opacity (50%) and hex parsing constants
const AVATAR_BG_ALPHA = 0.5;
const HEX_PREFIX_RE_AVATAR = /^#/;
const HEX_CHARS_PER_CHANNEL = 2;
const RED_START = 0;
const GREEN_START = RED_START + HEX_CHARS_PER_CHANNEL;
const zinc_START = GREEN_START + HEX_CHARS_PER_CHANNEL;

const TEXT_SIZE_CLASS: Record<AvatarSize, string> = {
  "2xs": "text-[8px]",
  xs: "text-[9px]",
  sm: "text-[11px]",
  base: "text-[13px]",
  lg: "text-[15px]",
  xl: "text-[17px]",
  "2xl": "text-[19px]",
  "3xl": "text-[22px]",
  "4xl": "text-3xl",
  "5xl": "text-4xl",
  "6xl": "text-5xl",
};

export type AvatarFallbackProps = ComponentProps<
  typeof AvatarFallbackPrimitive
> & {
  size?: AvatarSize;
  /**
   * Full name or label used to:
   * - Derive 1–2 letter initials for fallback text (when children not provided)
   * - Seed deterministic background/text color for readability
   */
  name?: string;
};
function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace(HEX_PREFIX_RE_AVATAR, "");
  const r = Number.parseInt(
    normalized.slice(RED_START, RED_START + HEX_CHARS_PER_CHANNEL),
    16,
  );
  const g = Number.parseInt(
    normalized.slice(GREEN_START, GREEN_START + HEX_CHARS_PER_CHANNEL),
    16,
  );
  const b = Number.parseInt(
    normalized.slice(zinc_START, zinc_START + HEX_CHARS_PER_CHANNEL),
    16,
  );
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * AvatarFallback UI component.
 * Import from "@patternmode/ui/components/avatar".
 * Built on Radix UI primitives for accessible behavior.
 */
export function AvatarFallback({
  className,
  size = "base",
  children,
  style,
  name,
  delayMs,
  ...props
}: AvatarFallbackProps) {
  const providedText =
    typeof children === "string" ? children.trim() : undefined;
  const trimmedName = name?.trim();
  const derivedInitials =
    !providedText && trimmedName ? getInitials(trimmedName) : undefined;

  // For tiny sizes (2xs, xs), show only first initial
  const shouldShowSingleInitial = size === "2xs" || size === "xs";
  const finalInitials =
    shouldShowSingleInitial && derivedInitials
      ? derivedInitials.charAt(0)
      : derivedInitials;
  /** fallback content area */

  const fallbackContent = providedText ?? finalInitials;

  // Seed color from full name when available for better distribution; fall back to displayed text.
  const colorSeed = trimmedName ?? fallbackContent;
  const backgroundColor = colorSeed ? getColorFromName(colorSeed) : undefined;
  const color = backgroundColor
    ? getReadableTextColor(backgroundColor)
    : undefined;
  const bgWithOpacity = backgroundColor
    ? hexToRgba(backgroundColor, AVATAR_BG_ALPHA)
    : undefined;

  return (
    <AvatarFallbackPrimitive
      className={cn(
        "flex size-full items-center justify-center bg-muted font-medium uppercase",
        TEXT_SIZE_CLASS[size],
        className,
      )}
      data-component="avatar-fallback"
      data-slot="avatar-fallback"
      delayMs={delayMs}
      style={{ backgroundColor: bgWithOpacity, color, ...style }}
      {...props}
    >
      {children ?? fallbackContent}
    </AvatarFallbackPrimitive>
  );
}
