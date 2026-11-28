"use client";

import type { LucideIcon } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactElement, ReactNode } from "react";

import { ToolbarControl } from "./filter-toolbar";

/** The page before or after: a URL, a custom link element, an action, or none. */
export type PageStep =
  | { readonly href: string }
  | { readonly onClick: () => void }
  | { readonly render: ReactElement }
  | null;

export interface PageRangeProps {
  count: number;
  start: number;
  total?: number | undefined;
}

/** The rows on show: "1–50 of 74,208", or "1–50" when the index does not count them all. */
export const PageRange = ({ count, start, total }: PageRangeProps) => {
  if (count === 0) {
    return "No rows";
  }

  const range = `${start.toLocaleString("en-US")}–${(start + count - 1).toLocaleString("en-US")}`;

  return total === undefined ? range : `${range} of ${total.toLocaleString("en-US")}`;
};

const stepRender = (step: PageStep, label: string): ReactElement | undefined => {
  if (step === null) {
    return undefined;
  }

  if ("render" in step) {
    return step.render;
  }

  if ("href" in step) {
    return (
      <a aria-label={label} href={step.href}>
        <span className="patternmode-filters-sr-only">{label}</span>
      </a>
    );
  }

  return undefined;
};

const StepControl = ({
  icon: StepIcon,
  label,
  step,
}: {
  icon: LucideIcon;
  label: string;
  step: PageStep;
}) => (
  <ToolbarControl
    aria-label={label}
    className="patternmode-toolbar-pages__step"
    disabled={step === null}
    onClick={
      step !== null && "onClick" in step
        ? () => {
            step.onClick();
          }
        : undefined
    }
    render={stepRender(step, label)}
  >
    <StepIcon aria-hidden="true" className="patternmode-filters-icon" />
  </ToolbarControl>
);

export interface ToolbarPagesProps {
  next: PageStep;
  previous: PageStep;
  /** The rows on show; a grid makes it the rows-per-page menu. */
  range: ReactNode;
}

/**
 * Paging at the right end of a list's toolbar: the rows on show, then the
 * page before and after. The arrows show only when there is another page.
 */
export const ToolbarPages = ({ next, previous, range }: ToolbarPagesProps) => (
  <>
    {range}
    {previous === null && next === null ? null : (
      <>
        <StepControl icon={ChevronLeft} label="Previous page" step={previous} />
        <StepControl icon={ChevronRight} label="Next page" step={next} />
      </>
    )}
  </>
);
