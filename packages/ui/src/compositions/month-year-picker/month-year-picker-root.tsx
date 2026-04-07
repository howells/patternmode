"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { useCallback, useEffect, useRef, useState } from "react";
import { Text } from "../../components/text";
import { Toggle, type ToggleSize } from "../../components/toggle";

/** Short month labels */
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/** Value returned by MonthYearPicker */
export type MonthYearPickerValue = Date | "beyond" | "unsure";

type ToggleVariant = "default" | "secondary";

export interface MonthYearPickerProps {
  /** Label for "beyond" option. Default: "Beyond {lastYear}" */
  beyondLabel?: string;

  className?: string;

  /** Month section label. Default: "Choose Month" */
  monthLabel?: string;
  /** Called when selection is committed (auto-advances when both month and year selected) */
  onChange?: (value: MonthYearPickerValue) => void;
  /** Show "I'm not sure" option. Default: false */
  showUnsure?: boolean;

  /** Toggle size. Default: "lg" */
  size?: ToggleSize;
  /** Label for "unsure" option. Default: "I'm not sure" */
  unsureLabel?: string;
  /** Current value */
  value?: MonthYearPickerValue | null;
  /** Toggle variant. Default: "default" */
  variant?: ToggleVariant;
  /** Year section label. Default: "Choose Year" */
  yearLabel?: string;

  /** Number of years to show from current year. Default: 10 */
  yearsAhead?: number;
}

/**
 * MonthYearPicker allows selecting a month and year, or choosing "Beyond" / "I'm not sure".
 * Auto-advances to the next step when both month and year are selected.
 *
 * @example
 * ```tsx
 * <MonthYearPicker
 *   value={selectedDate}
 *   onChange={(value) => setSelectedDate(value)}
 *   yearsAhead={10}
 * />
 * ```
 */
export function MonthYearPicker({
  value,
  onChange,
  yearsAhead = 10,
  beyondLabel,
  showUnsure = false,
  unsureLabel = "I'm not sure",
  size = "lg",
  variant = "default",
  monthLabel = "Choose Month",
  yearLabel = "Choose Year",
  className,
}: MonthYearPickerProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: yearsAhead }, (_, i) => currentYear + i);
  const lastYear = years.at(-1);
  const resolvedBeyondLabel = beyondLabel ?? `Beyond ${lastYear}`;

  // Track if user has interacted in this session (prevents auto-advance on mount)
  const hasInteracted = useRef(false);

  // Local selection state for partial selections (before both are complete)
  const [pendingMonth, setPendingMonth] = useState<number | null>(null);
  const [pendingYear, setPendingYear] = useState<number | null>(null);

  // Derive selected state from value prop or pending state
  const savedMonth = value instanceof Date ? value.getMonth() : null;
  const savedYear = value instanceof Date ? value.getFullYear() : null;

  // Use pending state while selecting, saved state when complete
  const selectedMonth = pendingMonth ?? savedMonth;
  const selectedYear = pendingYear ?? savedYear;

  const isBeyond = value === "beyond";
  const isUnsure = value === "unsure";

  // Reset pending state when value changes externally
  useEffect(() => {
    if (value instanceof Date) {
      setPendingMonth(null);
      setPendingYear(null);
    } else if (value === "beyond" || value === "unsure" || value === null) {
      setPendingMonth(null);
      setPendingYear(null);
    }
  }, [value]);

  // Check if both selections are complete and auto-advance
  const maybeAutoAdvance = useCallback(
    (month: number | null, year: number | null) => {
      if (hasInteracted.current && month !== null && year !== null) {
        const date = new Date(year, month, 1);
        onChange?.(date);
      }
    },
    [onChange],
  );

  const handleMonthSelect = useCallback(
    (monthIndex: number, pressed: boolean) => {
      if (!pressed) {
        return;
      }
      hasInteracted.current = true;
      setPendingMonth(monthIndex);
      maybeAutoAdvance(monthIndex, selectedYear);
    },
    [selectedYear, maybeAutoAdvance],
  );

  const handleYearSelect = useCallback(
    (year: number, pressed: boolean) => {
      if (!pressed) {
        return;
      }
      hasInteracted.current = true;
      setPendingYear(year);
      maybeAutoAdvance(selectedMonth, year);
    },
    [selectedMonth, maybeAutoAdvance],
  );

  const handleBeyondSelect = useCallback(
    (pressed: boolean) => {
      if (!pressed) {
        return;
      }
      setPendingMonth(null);
      setPendingYear(null);
      onChange?.("beyond");
    },
    [onChange],
  );

  const handleUnsureSelect = useCallback(
    (pressed: boolean) => {
      if (!pressed) {
        return;
      }
      setPendingMonth(null);
      setPendingYear(null);
      onChange?.("unsure");
    },
    [onChange],
  );

  return (
    <div
      className={cn("flex flex-col gap-5", className)}
      data-component="month-year-picker"
    >
      {/* Month Section */}
      <div className="flex flex-col gap-2">
        <Text className="text-muted-foreground" size="xs" weight="medium">
          {monthLabel}
        </Text>
        <div className="grid grid-cols-4 gap-2">
          {MONTHS.map((month, index) => {
            const isSelected =
              selectedMonth === index && !isBeyond && !isUnsure;
            return (
              <Toggle
                defaultPressed={false}
                key={month}
                onPressedChange={(pressed) => handleMonthSelect(index, pressed)}
                pressed={isSelected}
                size={size}
                variant={variant}
              >
                {month}
              </Toggle>
            );
          })}
        </div>
      </div>

      {/* Year Section */}
      <div className="flex flex-col gap-2">
        <Text className="text-muted-foreground" size="xs" weight="medium">
          {yearLabel}
        </Text>
        <div className="grid grid-cols-5 gap-2">
          {years.map((year) => {
            const isSelected = selectedYear === year && !isBeyond && !isUnsure;
            return (
              <Toggle
                defaultPressed={false}
                key={year}
                onPressedChange={(pressed) => handleYearSelect(year, pressed)}
                pressed={isSelected}
                size={size}
                variant={variant}
              >
                {year}
              </Toggle>
            );
          })}
        </div>
      </div>

      {/* Special options */}
      <div className="flex flex-wrap gap-2">
        <Toggle
          defaultPressed={false}
          onPressedChange={handleBeyondSelect}
          pressed={isBeyond}
          size={size}
          variant={variant}
        >
          {resolvedBeyondLabel}
        </Toggle>
        {showUnsure && (
          <Toggle
            defaultPressed={false}
            onPressedChange={handleUnsureSelect}
            pressed={isUnsure}
            size={size}
            variant={variant}
          >
            {unsureLabel}
          </Toggle>
        )}
      </div>
    </div>
  );
}
