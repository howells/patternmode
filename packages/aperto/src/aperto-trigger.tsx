"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "motion/react";
import {
	type ComponentPropsWithoutRef,
	forwardRef,
	useCallback,
	useEffect,
	useState,
} from "react";

import { useApertoContext } from "./context";
import { resolvePreset } from "./presets";
import type { MotionPresetName } from "./types";

const TRIGGER_OPEN_Z_INDEX = 1000;

export interface ApertoTriggerProps
	extends ComponentPropsWithoutRef<typeof Dialog.Trigger> {
	/** Internal flag used by grouped thumbnails to raise only the active trigger. */
	active?: boolean;
	/** Override motion preset for this trigger */
	motion?: MotionPresetName;
	/** Internal shared layout ID override for grouped thumbnails. */
	sharedLayoutId?: string | false;
}

const ApertoTrigger = forwardRef<HTMLButtonElement, ApertoTriggerProps>(
	(
		{ active, children, motion: motionOverride, sharedLayoutId, ...props },
		ref,
	) => {
		const ctx = useApertoContext();
		const shouldRaise = ctx.open && (active ?? true);
		const [zIndex, setZIndex] = useState(
			shouldRaise ? TRIGGER_OPEN_Z_INDEX : 0,
		);

		useEffect(() => {
			if (shouldRaise) {
				setZIndex(TRIGGER_OPEN_Z_INDEX);
			} else if (ctx.open) {
				setZIndex(0);
			}
		}, [ctx.open, shouldRaise]);

		const handleLayoutAnimationComplete = useCallback(() => {
			if (!shouldRaise) {
				setZIndex(0);
			}
		}, [shouldRaise]);

		const resolved = resolvePreset(
			"trigger",
			motionOverride,
			ctx.presetName,
			ctx.variants,
			ctx.reduceMotion,
		);
		const layoutId =
			sharedLayoutId === false
				? undefined
				: (sharedLayoutId ?? `${ctx.layoutId}-shared`);

		return (
			<Dialog.Trigger asChild ref={ref} {...props}>
				<motion.button
					data-slot="aperto-trigger"
					key={layoutId ?? "unshared"}
					layout
					layoutCrossfade={false}
					layoutId={layoutId}
					onLayoutAnimationComplete={handleLayoutAnimationComplete}
					style={{ zIndex }}
					transition={resolved.transition}
					type="button"
				>
					{children}
				</motion.button>
			</Dialog.Trigger>
		);
	},
);

ApertoTrigger.displayName = "ApertoTrigger";

export { ApertoTrigger };
