"use client";

import { durations, easings } from "@patternmode/motion";
import { cn } from "@patternmode/ui/utils/cn";
import { AnimatePresence, motion } from "motion/react";
import { memo, useCallback, useEffect, useRef, useState } from "react";

interface ExpandableTextProps {
  /** Content to render inside the expandable area. */
  children: React.ReactNode;
  /** Additional className for the outer container. */
  className?: string;
  /** Collapsed height in rem units. Default: 2.625 (approximately 2 lines of sm text). */
  collapsedHeight?: number;
}

const DEFAULT_COLLAPSED_HEIGHT = 2.625;

/**
 * ExpandableText UI component.
 * Import from "@patternmode/ui/compositions/expandable-text".
 *
 * Renders children in a height-constrained container with a "More"/"Less"
 * toggle when content overflows. Uses motion for smooth height animation.
 */
const ExpandableText = memo(function ExpandableText({
  children,
  className,
  collapsedHeight = DEFAULT_COLLAPSED_HEIGHT,
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const fontSize = Number.parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      const collapsedPx = collapsedHeight * fontSize;
      setIsClamped(contentRef.current.scrollHeight > collapsedPx);
    }
  }, [collapsedHeight]);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const transition = {
    duration: durations.normal,
    ease: easings.customOut,
  };

  const heightValue = `${collapsedHeight}rem`;

  return (
    <motion.div
      animate={{ height: isExpanded ? "auto" : heightValue }}
      className={cn("relative max-w-prose", className)}
      initial={false}
      style={{ overflow: "hidden" }}
      transition={transition}
    >
      <div ref={contentRef}>{children}</div>
      <AnimatePresence mode="wait">
        {isClamped && (
          <motion.button
            animate={{ opacity: 1 }}
            className="absolute right-0 bottom-0.5 bg-gradient-to-r from-card/0 via-card to-card pl-10 text-muted-foreground text-sm underline underline-offset-2"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            key={isExpanded ? "less" : "more"}
            onClick={toggleExpanded}
            transition={transition}
            type="button"
          >
            {isExpanded ? "Less" : "More"}
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

export type { ExpandableTextProps };
export { ExpandableText };
