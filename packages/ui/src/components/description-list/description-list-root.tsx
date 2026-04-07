"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { useEffect, useRef, useState } from "react";

interface DescriptionListProps extends React.ComponentProps<"dl"> {
  /** Show separators */
  showSeparators?: boolean;
}

/**
 * DescriptionList UI component.
 * Import from "@patternmode/ui/components/description-list".
 */
function DescriptionList({
  className,
  showSeparators = false,
  ...props
}: DescriptionListProps) {
  return (
    <dl
      className={cn(
        "grid gap-3 text-sm",
        showSeparators &&
          "[&>*:not(:last-child)]:border-border [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:pb-3",
        className,
      )}
      data-component="description-list"
      data-slot="description-list"
      {...props}
    />
  );
}

/**
 * DescriptionItem UI component.
 * Import from "@patternmode/ui/components/description-list".
 */
function DescriptionItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("grid grid-cols-[2fr_3fr] gap-4", className)}
      data-component="description-item"
      data-slot="description-item"
      {...props}
    />
  );
}

/**
 * DescriptionTerm UI component.
 * Import from "@patternmode/ui/components/description-list".
 */
function DescriptionTerm({ className, ...props }: React.ComponentProps<"dt">) {
  return (
    <dt
      className={cn("text-muted-foreground", className)}
      data-component="description-term"
      data-slot="description-term"
      {...props}
    />
  );
}

interface DescriptionDetailsProps extends React.ComponentProps<"dd"> {
  /** Number of lines to clamp to. Set to 0 or undefined for no clamping. */
  clampLines?: number;
}

/**
 * DescriptionDetails UI component.
 * Import from "@patternmode/ui/components/description-list".
 */
function DescriptionDetails({
  className,
  clampLines = 0,
  children,
  ...props
}: DescriptionDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const contentRef = useRef<HTMLSpanElement>(null);

  // Check if content is truncated by comparing scrollHeight to clientHeight
  useEffect(() => {
    if (!(clampLines && contentRef.current)) {
      setIsTruncated(false);
      return;
    }

    const el = contentRef.current;
    // scrollHeight > clientHeight means content is being clipped
    setIsTruncated(el.scrollHeight > el.clientHeight + 1);
  }, [clampLines]);

  const showClamp = clampLines > 0 && !isExpanded;

  return (
    <dd
      className={cn("text-right", className)}
      data-component="description-details"
      data-slot="description-details"
      {...props}
    >
      <span
        ref={contentRef}
        style={
          showClamp
            ? {
                display: "-webkit-box",
                WebkitLineClamp: clampLines,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }
            : undefined
        }
      >
        {children}
      </span>
      {isTruncated && (
        <button
          className="ml-1 text-muted-foreground underline underline-offset-2 hover:text-foreground"
          onClick={() => setIsExpanded(!isExpanded)}
          type="button"
        >
          {isExpanded ? "Less" : "More"}
        </button>
      )}
    </dd>
  );
}

export {
  DescriptionDetails,
  DescriptionItem,
  DescriptionList,
  DescriptionTerm,
};
