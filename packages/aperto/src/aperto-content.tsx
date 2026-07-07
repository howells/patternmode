"use client";

import { Dialog } from "@base-ui/react/dialog";
import { m, useMotionValue, useSpring, useTransform } from "motion/react";
import type { MotionStyle, PanInfo } from "motion/react";
import { useState } from "react";
import type { ComponentPropsWithRef, CSSProperties } from "react";

import { useApertoContext } from "./context";
import {
  calculateResistance,
  DEFAULT_DISTANCE_THRESHOLD,
  DEFAULT_VELOCITY_THRESHOLD,
  OPACITY_INPUT,
  OPACITY_OUTPUT,
  SCALE_INPUT,
  SCALE_OUTPUT,
} from "./physics";
import { getDragSpring, resolvePreset } from "./presets";
import type { DismissibleConfig, MotionPresetName } from "./types";

export interface ApertoContentProps extends Omit<
  ComponentPropsWithRef<typeof Dialog.Popup>,
  "render" | "hidden" | "className" | "style"
> {
  /** Constrained to a plain string/object (Base UI's function forms aren't used). */
  className?: string;
  style?: CSSProperties;
  /** Motion preset override for this content panel, independent of the root preset. */
  motion?: MotionPresetName;
  /** Built-in positioning strategy. Use "none" for custom primitive compositions. */
  placement?: "center" | "none";
  /** Internal shared layout ID override for grouped media. */
  sharedLayoutId?: string | false;
}

const ApertoContent = ({
  children,
  className,
  motion: motionOverride,
  placement = "center",
  ref,
  sharedLayoutId,
  style,
  ...props
}: ApertoContentProps) => {
  const ctx = useApertoContext();
  const [isDragging, setIsDragging] = useState(false);
  const resolved = resolvePreset(
    "content",
    motionOverride,
    ctx.presetName,
    ctx.variants,
    ctx.reduceMotion,
  );

  const contentLayoutId =
    sharedLayoutId === false ? undefined : (sharedLayoutId ?? `${ctx.layoutId}-shared`);

  const dragSpring = getDragSpring(resolved);
  const isDismissible = ctx.dismissible !== false;

  const dismissConfig: DismissibleConfig =
    typeof ctx.dismissible === "object" ? ctx.dismissible : {};
  const distanceThreshold = dismissConfig.threshold ?? DEFAULT_DISTANCE_THRESHOLD;
  const velocityThreshold = dismissConfig.velocity ?? DEFAULT_VELOCITY_THRESHOLD;

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const springX = useSpring(dragX, dragSpring);
  const springY = useSpring(dragY, dragSpring);

  const distance = useTransform(() => Math.hypot(springX.get(), springY.get()));
  const scaleMotion = useTransform(distance, SCALE_INPUT, SCALE_OUTPUT);
  const opacityMotion = useTransform(distance, OPACITY_INPUT, OPACITY_OUTPUT);
  const resistance = useTransform(distance, calculateResistance);
  const { onOpenChange } = ctx;

  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isDragging) {
      setIsDragging(true);
    }
    const r = resistance.get();
    dragX.set(info.offset.x * r);
    dragY.set(info.offset.y * r);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const speed = Math.hypot(info.velocity.x, info.velocity.y);
    const dist = Math.hypot(info.offset.x, info.offset.y);

    if (speed > velocityThreshold || dist > distanceThreshold) {
      onOpenChange(false);
      return;
    }

    dragX.set(0);
    dragY.set(0);
  };

  const placementStyle =
    placement === "center"
      ? {
          left: "50%",
          top: "50%",
          translate: "-50% -50%",
        }
      : {};
  let cursor: MotionStyle["cursor"];

  if (isDragging) {
    cursor = "grabbing";
  } else if (isDismissible) {
    cursor = "grab";
  }

  const motionStyle: MotionStyle = {
    cursor,
    opacity: opacityMotion,
    scale: scaleMotion,
    x: springX,
    y: springY,
    ...placementStyle,
    ...style,
  };

  return (
    // `hidden={false}` neutralises Base UI's `hidden: !mounted` so the content
    // stays visible while Motion plays the drag-dismiss / shared-layout exit on
    // close (Motion animations are invisible to Base UI's `getAnimations()`
    // unmount detection); `AnimatePresence` in the portal owns the real unmount.
    <Dialog.Popup
      className={className}
      hidden={false}
      ref={ref}
      render={
        <m.div
          data-slot="aperto-content"
          drag={isDismissible}
          dragConstraints={{ bottom: 0, left: 0, right: 0, top: 0 }}
          dragElastic={0}
          dragMomentum={false}
          dragSnapToOrigin
          layout={contentLayoutId === undefined || contentLayoutId === "" ? undefined : true}
          layoutId={contentLayoutId}
          onDrag={isDismissible ? handleDrag : undefined}
          onDragEnd={isDismissible ? handleDragEnd : undefined}
          style={motionStyle}
          transition={resolved.transition}
        >
          {children}
        </m.div>
      }
      {...props}
    />
  );
};

ApertoContent.displayName = "ApertoContent";

export { ApertoContent };
