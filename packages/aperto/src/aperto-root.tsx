"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { domMax, LayoutGroup, LazyMotion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { ApertoContext } from "./context";
import { PRESETS } from "./presets";
import type { DismissibleConfig, MotionPresetName, MotionVariants } from "./types";

export interface ApertoRootProps extends Omit<
  ComponentPropsWithoutRef<typeof Dialog.Root>,
  "open" | "onOpenChange"
> {
  children: ReactNode;
  /** Whether dragging can dismiss the content (default: true) */
  dismissible?: boolean | DismissibleConfig;
  /** Layout ID for shared element transition (auto-generated if omitted) */
  layoutId?: string;
  /** Motion preset or per-component variants */
  motion?: MotionPresetName | MotionVariants;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Force reduced motion regardless of system preference */
  reduceMotion?: boolean;
}

const ApertoRoot = ({
  children,
  dismissible = true,
  layoutId: layoutIdProp,
  motion: motionProp = "smooth",
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  reduceMotion: reduceMotionProp,
  ...dialogProps
}: ApertoRootProps) => {
  const generatedId = useId();
  const layoutId = layoutIdProp ?? `aperto-${generatedId}`;
  const systemReducedMotion = useReducedMotion() ?? false;
  const shouldReduce = reduceMotionProp ?? systemReducedMotion;

  // Uncontrolled state fallback
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const onOpenChange = (nextOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }
    controlledOnOpenChange?.(nextOpen);
  };

  // Resolve global preset name
  const globalPresetName: MotionPresetName = typeof motionProp === "string" ? motionProp : "smooth";
  const variants: MotionVariants | undefined =
    typeof motionProp === "object" ? motionProp : undefined;

  const presetName: MotionPresetName = shouldReduce ? "reduced" : globalPresetName;
  const preset = PRESETS[presetName];
  const contextValue = {
    dismissible,
    layoutId,
    onOpenChange,
    open,
    preset,
    presetName,
    reduceMotion: shouldReduce,
    variants,
  };

  return (
    <ApertoContext.Provider value={contextValue}>
      <Dialog.Root onOpenChange={onOpenChange} open={open} {...dialogProps}>
        <LazyMotion features={domMax}>
          <LayoutGroup id={layoutId}>{children}</LayoutGroup>
        </LazyMotion>
      </Dialog.Root>
    </ApertoContext.Provider>
  );
};

export { ApertoRoot };
