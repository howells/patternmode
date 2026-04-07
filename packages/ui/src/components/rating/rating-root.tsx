"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Star } from "lucide-react";
import { useCallback, useState } from "react";
import type { ComponentSize } from "../../lib/size";
import { Icon } from "../icon";

const RATING_ICON_SIZE: Record<"sm" | "base" | "lg", ComponentSize> = {
  sm: "xs",
  base: "sm",
  lg: "base",
};

export interface RatingProps {
  /** Number of stars. Default 5. */
  count?: number;
  /** Default value (uncontrolled). */
  defaultValue?: number;
  /** Whether the rating is disabled. */
  disabled?: boolean;
  /** Called when value changes. */
  onValueChange?: (value: number) => void;
  /** Whether the rating is read-only (shows value but can't change). */
  readOnly?: boolean;
  /** Size variant. */
  size?: "sm" | "base" | "lg";
  /** Controlled value (0 to count). */
  value?: number;
}

/**
 * Star rating component. Supports controlled/uncontrolled, hover preview,
 * and keyboard navigation.
 *
 * @example
 * ```tsx
 * <Rating defaultValue={3} onValueChange={setRating} />
 * <Rating value={4.5} readOnly size="sm" />
 * ```
 */
export function Rating({
  count = 5,
  defaultValue = 0,
  disabled = false,
  onValueChange,
  readOnly = false,
  size = "base",
  value: controlledValue,
}: RatingProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const currentValue = isControlled ? controlledValue : internalValue;
  const displayValue = hoverValue ?? currentValue;
  const interactive = !disabled && !readOnly;
  const iconSize = RATING_ICON_SIZE[size];

  const setValue = useCallback(
    (newValue: number) => {
      if (!interactive) return;
      // Toggle off if clicking the same value
      const finalValue = newValue === currentValue ? 0 : newValue;
      if (!isControlled) setInternalValue(finalValue);
      onValueChange?.(finalValue);
    },
    [interactive, currentValue, isControlled, onValueChange],
  );

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5",
        disabled && "opacity-50",
      )}
      data-component="rating"
      data-slot="rating"
      onMouseLeave={interactive ? () => setHoverValue(null) : undefined}
      role="radiogroup"
    >
      {Array.from({ length: count }, (_, i) => {
        const starValue = i + 1;
        const isFilled = displayValue >= starValue;
        const isHalf = !isFilled && displayValue >= starValue - 0.5;

        return (
          <button
            aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
            className={cn(
              "relative transition-colors",
              interactive && "cursor-pointer hover:scale-110",
              !interactive && "cursor-default",
              isFilled
                ? "text-amber-400"
                : isHalf
                  ? "text-amber-400"
                  : "text-muted-foreground/30",
            )}
            disabled={disabled}
            key={starValue}
            onClick={() => setValue(starValue)}
            onMouseEnter={
              interactive ? () => setHoverValue(starValue) : undefined
            }
            tabIndex={interactive ? 0 : -1}
            type="button"
          >
            <Icon
              icon={Star}
              size={iconSize}
              className={cn(isFilled || isHalf ? "fill-current" : "")}
            />
            {/* Half star overlay */}
            {isHalf && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: "50%" }}
              >
                <Icon icon={Star} size={iconSize} className="fill-current" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
