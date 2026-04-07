import { cn } from "@patternmode/ui/utils/cn";
import type { LucideIcon } from "lucide-react";
import type * as React from "react";
import { Icon } from "../../components/icon";
import type { WithTestId } from "../../lib/types";

interface IconCardProps
  extends WithTestId<Omit<React.ComponentProps<"button">, "children">> {
  /** The icon to display */
  icon: LucideIcon;
  /** Label text below the icon */
  label: string;
  /** Whether the card is currently selected */
  selected?: boolean;
}

/**
 * A selectable card with an icon and label, typically used for option selection.
 *
 * @param props - The icon card props
 * @param props.icon - Lucide icon component to display
 * @param props.label - Text label below the icon
 * @param props.selected - Whether the card is in selected state
 * @param props.testId - Test ID for testing purposes
 * @param props.className - Additional CSS classes
 * @param props... - All other standard HTML button element props
 *
 * @example
 * ```tsx
 * <IconCard
 *   icon={HomeIcon}
 *   label="Residential"
 *   selected={selectedValue === "residential"}
 *   onClick={() => setSelectedValue("residential")}
 * />
 * ```
 */
function IconCard({
  icon,
  label,
  selected = false,
  className,
  testId,
  ...props
}: IconCardProps) {
  return (
    <button
      className={cn("group flex flex-col items-center gap-3", className)}
      data-component="icon-card"
      data-selected={selected}
      data-testid={testId}
      type="button"
      {...props}
    >
      <div
        className={cn(
          "flex aspect-square w-full items-center justify-center rounded-lg border shadow-xs transition-colors",
          selected
            ? "border-foreground bg-accent"
            : "border-input bg-input group-hover:border-foreground/30",
        )}
        data-slot="icon-card-content"
      >
        <Icon className="stroke-[1.25]" icon={icon} size="3xl" />
      </div>
      <span className="font-medium text-sm" data-slot="icon-card-label">
        {label}
      </span>
    </button>
  );
}

export { IconCard, type IconCardProps };
