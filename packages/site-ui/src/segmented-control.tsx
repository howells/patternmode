"use client";

import { useId, useRef } from "react";
import type { KeyboardEvent } from "react";

const getOptionKey = (value: number | string) => `${typeof value}:${String(value)}`;

export const SegmentedControl = <T extends string | number>({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: T) => void;
  options: { label: string; value: T }[];
  value: T;
}) => {
  const labelId = useId();
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const selectedIndex = options.findIndex((option) => option.value === value);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key !== "ArrowLeft" && event.key !== "ArrowRight") || options.length === 0) {
      return;
    }

    event.preventDefault();
    const delta = event.key === "ArrowLeft" ? -1 : 1;
    const current = selectedIndex === -1 ? 0 : selectedIndex;
    const next = (current + delta + options.length) % options.length;
    const option = options[next];

    if (option === undefined) {
      return;
    }

    onChange(option.value);
    optionRefs.current[next]?.focus();
  };

  return (
    <div className="segmented-field">
      <span id={labelId}>{label}</span>
      <div aria-labelledby={labelId} className="segmented-control" role="radiogroup">
        {options.map((option, index) => {
          const checked = value === option.value;
          const focusable = selectedIndex === -1 ? index === 0 : checked;

          return (
            <button
              aria-checked={checked}
              key={getOptionKey(option.value)}
              onClick={() => {
                onChange(option.value);
              }}
              onKeyDown={handleKeyDown}
              ref={(node) => {
                optionRefs.current[index] = node;
              }}
              // eslint-disable-next-line jsx-a11y/prefer-tag-over-role -- a segmented control is a styled radiogroup of buttons; native radio inputs cannot render the segment UI.
              role="radio"
              tabIndex={focusable ? 0 : -1}
              type="button"
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
