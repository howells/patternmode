import { cx } from "@patternmode/utils/cx";
import type React from "react";

export type SkeletonProps = {
  className?: string;
  children?: React.ReactNode;
  rounded?: boolean | "none" | "sm" | "md" | "lg" | "xl" | "full";
  variant?: "default" | "shimmer";
} & React.ComponentPropsWithoutRef<"div">;

const roundedClass = (rounded: SkeletonProps["rounded"]) => {
  if (rounded === false) return;
  if (rounded === true || rounded == null) return "rounded-md";
  if (rounded === "none") return "rounded-none";
  if (rounded === "full") return "rounded-full";
  return `rounded-${rounded}`;
};

const Skeleton = ({
  className,
  rounded = true,
  variant = "default",
  ...props
}: SkeletonProps) => {
  const base = "bg-zinc-200 dark:bg-zinc-800";
  const shimmer =
    "relative overflow-hidden after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_1.5s_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/60 after:to-transparent dark:after:via-white/10";
  const animation = variant === "shimmer" ? shimmer : "animate-pulse";
  return (
    <div
      className={cx(base, animation, roundedClass(rounded), className)}
      data-testid="skeleton"
      {...props}
    />
  );
};

Skeleton.displayName = "Skeleton";

export { Skeleton };
