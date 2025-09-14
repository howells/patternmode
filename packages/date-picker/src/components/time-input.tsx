"use client";

import { focusInput } from "@patternmode/utils/focus-input";
import { cx } from "@patternmode/utils/cx";
import type { TimeValue } from "@react-aria/datepicker";
import { useDateSegment, useTimeField } from "@react-aria/datepicker";
import { useTimeFieldState } from "@react-stately/datepicker";
import * as React from "react";

type Segment = ReturnType<typeof useTimeFieldState>["segments"][number];

type TimeSegmentProps = {
  segment: Segment;
  state: ReturnType<typeof useTimeFieldState>;
};

const TimeSegment = ({ segment, state }: TimeSegmentProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  if (!segment.isEditable && segment.type === "literal" && segment.text !== ":") {
    return null;
  }

  return (
    <div
      {...segmentProps}
      className={cx(
        "relative block w-full appearance-none rounded-md border px-2.5 py-1.5 text-left uppercase tabular-nums outline-hidden transition sm:text-sm",
        "dark:border-zinc-800",
        "text-zinc-900 dark:text-zinc-50",
        "bg-white dark:bg-zinc-950",
        focusInput,
        {
          "w-fit! border-none bg-transparent px-0 text-zinc-400 shadow-none": segment.type === "literal",
          "bg-zinc-100 text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500": state.isDisabled && segment.text !== ":",
        }
      )}
      ref={ref}
    >
      {segment.isPlaceholder ? segment.placeholder : segment.text}
    </div>
  );
};

export type TimeInputProps = Parameters<typeof useTimeField>[0] & {
  ref?: React.RefObject<HTMLDivElement | null>;
};

export const TimeInput = ({ ref, hourCycle, ...props }: TimeInputProps) => {
  const innerRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => innerRef?.current);

  const locale = window !== undefined ? window.navigator.language : "en-US";

  const state = useTimeFieldState({ hourCycle, locale, shouldForceLeadingZeros: true, autoFocus: true, ...props });
  const { fieldProps } = useTimeField({ ...props, hourCycle, shouldForceLeadingZeros: true }, state, innerRef);

  return (
    <div {...fieldProps} className="group/time-input inline-flex w-full gap-x-2" ref={innerRef}>
      {state.segments.map((segment, i) => (
        <TimeSegment key={`${segment.type}-${i}`} segment={segment} state={state} />
      ))}
    </div>
  );
};

TimeInput.displayName = "TimeInput";
