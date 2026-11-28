"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "cn";
import type { ReactNode } from "react";

export interface FilterToolbarProps {
  /** The search field, filter chips, and AddFilter control. */
  children: ReactNode;
  className?: string;
  /** At the right end: counts, Sort, Columns, and paging. */
  end?: ReactNode;
}

/**
 * The one row above a list: search, filter chips and "Filter" on the left;
 * the count, sorting, columns and paging at the right end.
 */
export const FilterToolbar = ({ children, className, end }: FilterToolbarProps) => (
  <div className={cn("patternmode-filter-toolbar", className)}>
    <div className="patternmode-filter-toolbar__start">{children}</div>
    {end === undefined ? null : <div className="patternmode-filter-toolbar__end">{end}</div>}
  </div>
);

export type ToolbarControlProps = useRender.ComponentProps<"button">;

/**
 * A quiet toolbar control: "Filter", "Sort", "Clear", the column picker, a
 * page arrow. Popover and menu triggers render it through `render`.
 */
export const ToolbarControl = ({ className, render, ...props }: ToolbarControlProps) =>
  useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn("patternmode-toolbar-control", className),
        type: render === undefined ? "button" : undefined,
      },
      props,
    ),
    render,
  });
