"use client";

import { durations, springs } from "@patternmode/motion";
import { cn } from "@patternmode/ui/utils/cn";
import { Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

import {
  DEFAULT_COLOR_COLUMNS,
  DEFAULT_MATERIAL_COLORS,
  DEFAULT_MATERIAL_COLORS_HSL,
  PREVIEW_COLOR_INDICES,
} from "../../lib/colors";
import { type SwatchSize, swatchSizePx } from "../../lib/size";
import { Swatch } from "../swatch";

interface ColorPickerBaseProps {
  /** Additional class names for the container. */
  className?: string;
  /** When true, shows only initialRows with an expand button. @default false */
  collapsible?: boolean;
  /** Number of columns in the grid. @default 5 */
  columns?: number;
  /** Whether the picker is disabled. */
  disabled?: boolean;
  /** When true, picker spans full width with auto-fill columns. @default false */
  fluid?: boolean;
  /** Gap between dots in pixels. @default 6 */
  gap?: number;
  /** Number of rows to show when collapsed. @default 3 */
  initialRows?: number;
  /** Size of swatches from shared size system. @default "base" */
  size?: SwatchSize;
}

type ColorPickerSingleProps = ColorPickerBaseProps & {
  /**
   * Selection mode.
   * @default "single"
   */
  mode?: "single";
  /** Currently selected hex color string (e.g., "#a26e95"), or `null` if none selected. */
  value?: string | null;
  /** Callback when a color is selected or deselected. */
  onChange?: (color: string | null) => void;
};

type ColorPickerMultipleProps = ColorPickerBaseProps & {
  /** Selection mode. */
  mode: "multiple";
  /** Currently selected hex color strings (e.g., ["#a26e95"]). */
  value?: string[];
  /** Callback when colors are selected or deselected. */
  onChange?: (colors: string[]) => void;
};

export type ColorPickerProps =
  | ColorPickerSingleProps
  | ColorPickerMultipleProps;

/**
 * ColorPicker displays a grid of color swatches for selection.
 *
 * Uses the curated patternmodel color palette organized in rows by hue family.
 */
export function ColorPicker(props: ColorPickerProps) {
  const {
    className,
    disabled = false,
    size = "base",
    gap = 8,
    columns = DEFAULT_COLOR_COLUMNS,
    fluid = false,
    collapsible = false,
    initialRows: _initialRows = 3,
  } = props;

  const [isExpanded, setIsExpanded] = useState(!collapsible);

  // Get pixel size for grid calculations from shared size system
  const swatchPx = swatchSizePx[size];

  const mode = props.mode ?? "single";
  const value = props.value;
  const onChangeSingle =
    mode === "single" ? (props as ColorPickerSingleProps).onChange : undefined;
  const onChangeMultiple =
    mode === "multiple"
      ? (props as ColorPickerMultipleProps).onChange
      : undefined;

  const [singleValue, setSingleValue] = useState<string | null>(() => {
    if (mode === "single") {
      return (props as ColorPickerSingleProps).value ?? null;
    }
    return null;
  });

  const [multipleValue, setMultipleValue] = useState<string[]>(() => {
    if (mode === "multiple") {
      return (props as ColorPickerMultipleProps).value ?? [];
    }
    return [];
  });

  const handleToggle = useCallback(
    (color: string) => {
      if (disabled) {
        return;
      }

      if (mode === "single") {
        const newValue = singleValue === color ? null : color;
        setSingleValue(newValue);
        onChangeSingle?.(newValue);
        return;
      }

      const isSelected = multipleValue.includes(color);
      const newValue = isSelected
        ? multipleValue.filter((selectedColor) => selectedColor !== color)
        : [...multipleValue, color];
      setMultipleValue(newValue);
      onChangeMultiple?.(newValue);
    },
    [
      disabled,
      mode,
      multipleValue,
      onChangeMultiple,
      onChangeSingle,
      singleValue,
    ],
  );

  const isColorSelected = useCallback(
    (color: string) => {
      if (mode === "single") {
        return singleValue === color;
      }
      return multipleValue.includes(color);
    },
    [mode, singleValue, multipleValue],
  );

  useEffect(() => {
    if (mode === "single") {
      setSingleValue((value as string | null | undefined) ?? null);
      return;
    }
    setMultipleValue((value as string[] | undefined) ?? []);
  }, [mode, value]);

  // Add 8px for ring padding (4px each side to accommodate selection ring inset-[-4px])
  const ringPadding = 8;
  const gridWidth = columns * swatchPx + (columns - 1) * gap + ringPadding;

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  // When collapsed with collapsible, show curated preview colors
  // When expanded or not collapsible, show full palette
  const showPreview = collapsible && !isExpanded;
  const colorsToShow = showPreview
    ? PREVIEW_COLOR_INDICES.map((i) => ({
        hex: DEFAULT_MATERIAL_COLORS[i],
        hsl: DEFAULT_MATERIAL_COLORS_HSL[i],
        originalIndex: i,
      }))
    : DEFAULT_MATERIAL_COLORS.map((hex, i) => ({
        hex,
        hsl: DEFAULT_MATERIAL_COLORS_HSL[i],
        originalIndex: i,
      }));

  const showExpandButton = collapsible;

  return (
    <fieldset
      aria-disabled={disabled}
      className={cn("relative min-w-0 border-0 p-0", className)}
      data-component="color-picker"
      data-testid="color-picker"
      style={fluid ? undefined : { width: gridWidth }}
    >
      <legend className="sr-only">Color selection</legend>
      <motion.div
        initial={false}
        layout
        transition={{
          layout: springs.subtle,
        }}
      >
        <div
          className={cn(fluid ? "flex flex-wrap p-1" : "grid p-1")}
          style={
            fluid
              ? { gap: `${gap}px` }
              : {
                  gridTemplateColumns: `repeat(${columns}, ${swatchPx}px)`,
                  gap: `${gap}px`,
                }
          }
        >
          {colorsToShow.map(({ hex, hsl, originalIndex }) => {
            if (!hsl) {
              return null;
            }

            const isSelected = isColorSelected(`#${hex}`);

            return (
              <motion.button
                aria-label={isSelected ? "Deselect color" : "Select color"}
                aria-pressed={isSelected}
                className={cn(
                  // overflow-visible allows Swatch's selection rings to extend outside
                  "overflow-visible rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2",
                  disabled && "cursor-not-allowed opacity-50",
                  !disabled && "cursor-pointer",
                )}
                data-testid={`color-picker-swatch-${hex.toLowerCase()}`}
                disabled={disabled}
                key={`${hex}-${originalIndex}`}
                layout
                onClick={() => handleToggle(`#${hex}`)}
                transition={{
                  layout: springs.subtle,
                }}
                type="button"
              >
                <Swatch
                  color={hsl}
                  icon={Check}
                  selected={isSelected}
                  showRing={false}
                  size={size}
                />
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Expand/Collapse button */}
      <AnimatePresence>
        {showExpandButton ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center pt-2"
            exit={{ opacity: 0, y: -8 }}
            initial={{ opacity: 0, y: -8 }}
            transition={{ duration: durations.normal }}
          >
            <button
              aria-expanded={isExpanded}
              aria-label={isExpanded ? "Show fewer colors" : "Show all colors"}
              className="group flex size-7 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
              data-testid="color-picker-expand"
              onClick={toggleExpanded}
              type="button"
            >
              <motion.svg
                animate={{ rotate: isExpanded ? 45 : 0 }}
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                transition={{
                  duration: durations.normal,
                  ease: [0.34, 1.56, 0.64, 1], // Custom overshoot for playful rotation
                }}
                viewBox="0 0 24 24"
              >
                <path d="M12 5v14M5 12h14" />
              </motion.svg>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </fieldset>
  );
}
