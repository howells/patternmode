"use client";

import * as Dialog from "@radix-ui/react-dialog";
import {
  type MotionStyle,
  m,
  type PanInfo,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from "react";

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
  ComponentPropsWithoutRef<typeof Dialog.Content>,
  "asChild" | "forceMount"
> {
  /** Motion preset override for this content panel, independent of the root preset. */
  motion?: MotionPresetName;
  /** Built-in positioning strategy. Use "none" for custom primitive compositions. */
  placement?: "center" | "none";
  /** Internal shared layout ID override for grouped media. */
  sharedLayoutId?: string | false;
}

const ApertoContent = forwardRef<HTMLDivElement, ApertoContentProps>(
  (
    {
      children,
      className,
      motion: motionOverride,
      placement = "center",
      sharedLayoutId,
      style,
      ...props
    },
    ref
  ) => {
    const ctx = useApertoContext();
    const [isDragging, setIsDragging] = useState(false);
    const resolved = resolvePreset(
      "content",
      motionOverride,
      ctx.presetName,
      ctx.variants,
      ctx.reduceMotion
    );

    const contentLayoutId =
      sharedLayoutId === false
        ? undefined
        : (sharedLayoutId ?? `${ctx.layoutId}-shared`);

    const dragSpring = getDragSpring(resolved);
    const isDismissible = ctx.dismissible !== false;

    const dismissConfig: DismissibleConfig =
      typeof ctx.dismissible === "object" ? ctx.dismissible : {};
    const distanceThreshold =
      dismissConfig.threshold ?? DEFAULT_DISTANCE_THRESHOLD;
    const velocityThreshold =
      dismissConfig.velocity ?? DEFAULT_VELOCITY_THRESHOLD;

    const dragX = useMotionValue(0);
    const dragY = useMotionValue(0);
    const springX = useSpring(dragX, dragSpring);
    const springY = useSpring(dragY, dragSpring);

    const distance = useTransform(() =>
      Math.hypot(springX.get(), springY.get())
    );
    const scaleMotion = useTransform(distance, SCALE_INPUT, SCALE_OUTPUT);
    const opacityMotion = useTransform(distance, OPACITY_INPUT, OPACITY_OUTPUT);
    const resistance = useTransform(distance, calculateResistance);

    const handleDrag = useCallback(
      (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (!isDragging) {
          setIsDragging(true);
        }
        const r = resistance.get();
        dragX.set(info.offset.x * r);
        dragY.set(info.offset.y * r);
      },
      [dragX, dragY, isDragging, resistance]
    );

    const handleDragEnd = useCallback(
      (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        setIsDragging(false);
        const speed = Math.hypot(info.velocity.x, info.velocity.y);
        const dist = Math.hypot(info.offset.x, info.offset.y);

        if (speed > velocityThreshold || dist > distanceThreshold) {
          ctx.onOpenChange(false);
          return;
        }

        dragX.set(0);
        dragY.set(0);
      },
      [ctx.onOpenChange, distanceThreshold, dragX, dragY, velocityThreshold]
    );

    const motionStyle = useMemo(
      (): MotionStyle => ({
        cursor: isDragging ? "grabbing" : isDismissible ? "grab" : undefined,
        opacity: opacityMotion,
        scale: scaleMotion,
        x: springX,
        y: springY,
        ...(placement === "center"
          ? {
              left: "50%",
              top: "50%",
              translate: "-50% -50%",
            }
          : {}),
        ...style,
      }),
      [
        isDismissible,
        isDragging,
        opacityMotion,
        placement,
        scaleMotion,
        springX,
        springY,
        style,
      ]
    );

    return (
      <Dialog.Content asChild forceMount {...props}>
        <m.div
          className={className}
          data-slot="aperto-content"
          drag={isDismissible}
          dragConstraints={{ bottom: 0, left: 0, right: 0, top: 0 }}
          dragElastic={0}
          dragMomentum={false}
          dragSnapToOrigin
          layout={contentLayoutId ? true : undefined}
          layoutId={contentLayoutId}
          onDrag={isDismissible ? handleDrag : undefined}
          onDragEnd={isDismissible ? handleDragEnd : undefined}
          ref={ref}
          style={motionStyle}
          transition={resolved.transition}
        >
          {children}
        </m.div>
      </Dialog.Content>
    );
  }
);

ApertoContent.displayName = "ApertoContent";

export { ApertoContent };
