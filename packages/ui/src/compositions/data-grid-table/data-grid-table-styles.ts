import type { Column } from "@tanstack/react-table";
import { cva } from "class-variance-authority";
import type { CSSProperties } from "react";

const headerCellSpacingVariants = cva("", {
  variants: {
    size: {
      dense: "h-9 px-2.5",
      default: "h-12 px-4",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const bodyCellSpacingVariants = cva("", {
  variants: {
    size: {
      dense: "px-4 py-2",
      default: "px-6 py-4",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

function getPinningStyles<TData>(column: Column<TData>): CSSProperties {
  const isPinned = column.getIsPinned();

  return {
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
}

export { bodyCellSpacingVariants, getPinningStyles, headerCellSpacingVariants };
