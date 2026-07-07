"use client";

import { Dialog } from "@base-ui/react/dialog";
import { m } from "motion/react";
import type { ComponentPropsWithRef } from "react";

import { useApertoContext } from "./context";
import { resolvePreset } from "./presets";
import type { MotionPresetName } from "./types";

const TRIGGER_OPEN_Z_INDEX = 1000;

export interface ApertoTriggerProps extends ComponentPropsWithRef<typeof Dialog.Trigger> {
  /** Internal flag used by grouped thumbnails to raise only the active trigger. */
  active?: boolean;
  /** Override motion preset for this trigger */
  motion?: MotionPresetName;
  /** Internal shared layout ID override for grouped thumbnails. */
  sharedLayoutId?: string | false;
}

const ApertoTrigger = ({
  active,
  children,
  motion: motionOverride,
  ref,
  sharedLayoutId,
  ...props
}: ApertoTriggerProps) => {
  const ctx = useApertoContext();
  const shouldRaise = ctx.open && (active ?? true);
  const zIndex = shouldRaise ? TRIGGER_OPEN_Z_INDEX : 0;

  const resolved = resolvePreset(
    "trigger",
    motionOverride,
    ctx.presetName,
    ctx.variants,
    ctx.reduceMotion,
  );
  const layoutId =
    sharedLayoutId === false ? undefined : (sharedLayoutId ?? `${ctx.layoutId}-shared`);

  return (
    // `key` sits on the Trigger (not the render element, which Base UI re-clones)
    // so a changing shared `layoutId` still remounts the Motion button and
    // resets its layout animation.
    <Dialog.Trigger
      key={layoutId ?? "unshared"}
      ref={ref}
      render={
        <m.button
          data-aperto-active={shouldRaise ? "" : undefined}
          data-slot="aperto-trigger"
          layout
          layoutCrossfade={false}
          layoutId={layoutId}
          style={{ zIndex }}
          transition={resolved.transition}
          type="button"
        >
          {children}
        </m.button>
      }
      {...props}
    />
  );
};

ApertoTrigger.displayName = "ApertoTrigger";

export { ApertoTrigger };
