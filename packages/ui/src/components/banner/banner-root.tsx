"use client";

import { springs } from "@patternmode/motion";
import { cn } from "@patternmode/ui/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useState } from "react";
import { CircularProgress } from "../../compositions/circular-progress";
import type { ComponentSize } from "../../lib/size";
import { Button } from "../button";
import { Icon } from "../icon";

const bannerVariants = cva(
  ["relative flex items-center gap-3 rounded-lg p-4", "font-semibold text-sm"],
  {
    variants: {
      variant: {
        default: "bg-gray-200/60 text-foreground",
        affirmative: "bg-affirmative-soft text-affirmative-foreground",
        warning: "bg-warning-soft text-warning-foreground",
        error: "bg-error-soft text-error-foreground",
        brand: "bg-brand-soft text-brand-foreground",
        dark: "bg-gray-800 text-gray-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface BannerAction {
  /** Optional trailing icon (e.g., ArrowRight) */
  icon?: LucideIcon;
  /** Button label text */
  label: string;
  /** Click handler */
  onClick: () => void;
}

interface BannerProps extends VariantProps<typeof bannerVariants> {
  /** Main message content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Lucide icon to display on the left */
  icon?: LucideIcon;
  /** Dismiss callback — renders X button on the right */
  onDismiss?: () => void;
  /** Primary action button */
  primaryAction?: BannerAction;
  /** Progress value 0-100, shows circular progress indicator instead of icon */
  progress?: number;
  /** Secondary/ghost action button */
  secondaryAction?: BannerAction;
  /** Whether to show the dismiss button (defaults to true) */
  showDismiss?: boolean;
  /** Size of the banner (affects progress ring and icon) */
  size?: ComponentSize;
  /** Controls visibility with animated enter/exit transitions */
  visible?: boolean;
}

/**
 * Banner component for displaying contextual messages with optional actions.
 *
 * @example
 * ```tsx
 * // Simple message with dismiss
 * <Banner variant="affirmative" icon={Sparkles} onDismiss={() => {}}>
 *   You've approved 25 patternmodels
 * </Banner>
 *
 * // With actions
 * <Banner
 *   variant="affirmative"
 *   icon={Sparkles}
 *   secondaryAction={{ label: "Not now", onClick: handleDismiss }}
 *   primaryAction={{
 *     label: "Update Phase",
 *     onClick: handleUpdate,
 *     icon: ArrowRight
 *   }}
 * >
 *   Ready to update the project phase?
 * </Banner>
 *
 * // With progress indicator
 * <Banner variant="default" progress={60}>
 *   Review 2 more samples to unlock a reward
 * </Banner>
 * ```
 */
function BannerIndicator({
  progress,
  icon,
  size,
}: {
  icon: BannerProps["icon"];
  progress: BannerProps["progress"];
  size: ComponentSize;
}) {
  if (progress !== undefined) {
    return <CircularProgress size={size} value={progress} />;
  }
  if (icon) {
    return <Icon className="shrink-0" icon={icon} size="lg" />;
  }
  return null;
}

function BannerActionButton({
  action,
  isDark,
  type,
}: {
  action: BannerAction | undefined;
  isDark: boolean;
  type: "primary" | "secondary";
}) {
  if (!action) {
    return null;
  }
  if (type === "secondary") {
    return (
      <Button
        className={isDark ? "!text-white hover:bg-white/10" : undefined}
        onClick={action.onClick}
        radius="full"
        size="sm"
        type="button"
        variant="ghost"
      >
        {action.label}
      </Button>
    );
  }
  return (
    <Button
      className={
        isDark ? "bg-white text-gray-900 hover:bg-gray-100" : undefined
      }
      onClick={action.onClick}
      radius="full"
      size="sm"
      suffixIcon={action.icon ?? ArrowRight}
      type="button"
      variant={isDark ? "outline" : "default"}
    >
      {action.label}
    </Button>
  );
}

function BannerDismiss({
  isDark,
  onDismiss,
  visible,
}: {
  isDark: boolean;
  onDismiss: (() => void) | undefined;
  visible: boolean;
}) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-1/2 right-4 -translate-y-1/2"
          exit={{ opacity: 0, scale: 0.8 }}
          initial={{ opacity: 0, scale: 0.8 }}
          transition={springs.subtle}
        >
          <Button
            aria-label="Dismiss"
            className={isDark ? "!text-white hover:bg-white/10" : undefined}
            icon={X}
            onClick={onDismiss}
            radius="full"
            size="icon-sm"
            square
            type="button"
            variant="ghost"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function Banner({
  variant,
  icon,
  progress,
  size = "sm",
  children,
  visible = true,
  onDismiss,
  showDismiss = true,
  secondaryAction,
  primaryAction,
  className,
}: BannerProps) {
  const isDark = variant === "dark";
  const [isHovered, setIsHovered] = useState(false);
  const canDismiss = onDismiss && showDismiss;

  return (
    <AnimatePresence mode="popLayout">
      {visible ? (
        <motion.div
          animate={{
            opacity: 1,
            y: 0,
            paddingRight: isHovered && canDismiss ? 60 : 16,
          }}
          className={cn(bannerVariants({ variant }), "pr-0", className)}
          data-component="banner"
          exit={{ opacity: 0, y: -8 }}
          initial={{ opacity: 0, y: 8, paddingRight: 16 }}
          layout
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          transition={springs.subtle}
        >
          <BannerIndicator icon={icon} progress={progress} size={size} />
          <div className="min-w-0 flex-1">{children}</div>
          <BannerActionButton
            action={secondaryAction}
            isDark={isDark}
            type="secondary"
          />
          <BannerActionButton
            action={primaryAction}
            isDark={isDark}
            type="primary"
          />
          <BannerDismiss
            isDark={isDark}
            onDismiss={onDismiss}
            visible={!!(canDismiss && isHovered)}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export type { BannerAction, BannerProps };
