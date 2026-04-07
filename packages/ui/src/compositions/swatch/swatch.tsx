import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Icon } from "../../components/icon";
import { isLightColor } from "../../lib/colors";
import {
  type SwatchSize,
  swatchIconSizeMap,
  swatchSizeMap,
} from "../../lib/size";
import { cn } from "../../utils/cn";

interface SwatchProps {
  /** Image or custom content rendered on top of the color */
  children?: ReactNode;
  /** Additional className */
  className?: string;
  /** CSS color value (hex, rgb, hsl, etc.) */
  color?: string;
  /** Icon to display when selected (e.g., Check, X). Contrast-aware coloring is automatic. */
  icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Override light color detection for contrast handling */
  isLight?: boolean;
  /** White border ring for embedding swatches in input fields */
  raised?: boolean;
  /** Whether this swatch appears selected */
  selected?: boolean;
  /** Show selection ring when selected (default: true) */
  showRing?: boolean;
  /** Size from shared swatch size system */
  size?: SwatchSize;
  /** Inline styles (useful for pixel-based sizing) */
  style?: React.CSSProperties;
  /** Whether this option is unavailable (out of stock) */
  unavailable?: boolean;
}

/**
 * Low-level visual swatch primitive for colors and images.
 *
 * Renders a circular swatch with consistent selection styling (double-ring pattern).
 * Sets contrast-aware text color (light/dark) so any children or icons automatically
 * inherit the correct color for readability.
 *
 * @example
 * ```tsx
 * // Color swatch with selection ring
 * <Swatch color="#ff0000" selected size="base" />
 *
 * // With icon overlay when selected
 * <Swatch color="#ff0000" icon={Check} selected />
 *
 * // Image swatch
 * <Swatch selected>
 *   <Image src="/swatch.jpg" alt="PatternModel" fill className="object-cover" />
 * </Swatch>
 * ```
 */
function Swatch({
  color,
  children,
  size = "base",
  raised = false,
  selected = false,
  showRing = true,
  icon,
  unavailable = false,
  isLight: isLightOverride,
  className,
  style,
}: SwatchProps) {
  // Determine if color is light for contrast handling
  const isLightComputed =
    isLightOverride ?? (color ? isLightColor(color) : false);

  // Composite box-shadow: always shadow-xs + optional border/ring
  const shadowParts: string[] = [
    // Always: shadow-xs for depth
    "0px 1px 2px rgba(17, 24, 39, 0.1)",
  ];

  if (selected && showRing) {
    // Selection ring (double-ring pattern)
    shadowParts.push(
      "0 0 0 2px var(--color-input)",
      "0 0 0 4px var(--color-primary)",
    );
  } else if (raised) {
    // White border ring
    shadowParts.push("0 0 0 2px white");
  }

  const composedShadow = shadowParts.join(", ");

  return (
    <span
      className={cn(
        // Base styles - container for rings and color
        "relative inline-flex items-center justify-center rounded-full",
        swatchSizeMap[size],
        // Contrast-aware text color — inherited by all children (icons, labels, etc.)
        isLightComputed ? "text-gray-900" : "text-white",
        // Transition for smooth selection
        "transition-shadow duration-150",
        // Unavailable state
        unavailable && "opacity-50",
        className,
      )}
      data-selected={selected}
      style={{
        ...style,
        boxShadow: composedShadow,
      }}
    >
      {/* Color background */}
      {color ? (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: color }}
        />
      ) : null}

      {/* Image or custom content */}
      {children ? (
        <span
          aria-hidden
          className="absolute inset-0 overflow-hidden rounded-full"
        >
          {children}
        </span>
      ) : null}

      {/* Darkening gradient overlay — adds depth to color/image swatches */}
      {color || children ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%)",
          }}
        />
      ) : null}

      {/* Icon overlay for selected state */}
      {selected && icon ? (
        <span
          className="absolute inset-0 flex items-center justify-center"
          data-slot="swatch-icon"
        >
          <Icon
            className="stroke-[2.5]"
            icon={icon}
            size={swatchIconSizeMap[size]}
          />
        </span>
      ) : null}

      {/* Unavailable indicator (diagonal line) */}
      {unavailable ? (
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="h-0.5 w-full -rotate-45 bg-white shadow-sm" />
        </span>
      ) : null}
    </span>
  );
}

export { Swatch, type SwatchProps };
