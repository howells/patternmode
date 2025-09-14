import { Dialog } from "@base-ui-components/react/dialog";
import { DEFAULT_ICON_STROKE_WIDTH } from "@patternmode/constants/defaults";
import { Icon } from "@patternmode/icon";
import { cx } from "@patternmode/utils/cx";
import { X } from "lucide-react";
import type * as React from "react";

export type SheetHeaderProps = {
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">;

// Inline dismiss button used only by SheetHeader
const InlineSheetDismissButton = ({
  ref,
  onClick,
  icon: IconComponent = X,
  iconStrokeWidth = DEFAULT_ICON_STROKE_WIDTH,
  size = "base",
  className,
  "aria-label": ariaLabel = "Remove",
}: {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  iconStrokeWidth?: number;
  size?: "sm" | "base" | "lg";
  className?: string;
  "aria-label"?: string;
} & { ref?: React.RefObject<HTMLButtonElement | null> }) => {
  type SmallIconSize = "xs" | "sm";
  const iconSize: SmallIconSize = size === "lg" ? "sm" : "xs";
  return (
    <button
      aria-label={ariaLabel}
      className={cx(
        "flex items-center justify-center rounded-full transition-colors",
        size === "sm" && "size-4",
        size === "base" && "size-5",
        size === "lg" && "size-6",
        "text-zinc-500 dark:text-zinc-400",
        "hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900",
        className
      )}
      onClick={onClick}
      ref={ref}
      type="button"
    >
      <Icon
        icon={IconComponent}
        size={iconSize}
        strokeWidth={iconStrokeWidth}
      />
    </button>
  );
};

export const SheetHeader = ({
  ref,
  children,
  className,
  ...props
}: SheetHeaderProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  return (
    <div
      className="flex items-start justify-between gap-x-4 border-b pb-4 dark:border-zinc-900"
      ref={ref}
      {...props}
    >
      <div className={cx("mt-1 flex flex-col gap-y-1", className)}>
        {children}
      </div>
      <Dialog.Close
        render={
          <InlineSheetDismissButton
            aria-label="Close sheet"
            className="mt-1 shrink-0"
            size="lg"
          />
        }
      />
    </div>
  );
};

SheetHeader.displayName = "Sheet.Header";
