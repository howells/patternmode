"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "motion/react";
import { forwardRef } from "react";

import { useApertoContext } from "./context";
import { resolvePreset } from "./presets";
import type { MotionPresetName } from "./types";

export interface ApertoOverlayProps {
	className?: string;
	/** Internal flag used to fade the overlay during measured close transitions. */
	fadeOut?: boolean;
	/** Override motion preset for the overlay */
	motion?: MotionPresetName;
	style?: React.CSSProperties;
}

const ApertoOverlay = forwardRef<HTMLDivElement, ApertoOverlayProps>(
	({ className, fadeOut, motion: motionOverride, style }, ref) => {
		const ctx = useApertoContext();
		const resolved = resolvePreset(
			"backdrop",
			motionOverride,
			ctx.presetName,
			ctx.variants,
			ctx.reduceMotion,
		);

		return (
			<Dialog.Overlay asChild forceMount>
				<motion.div
					animate={{ opacity: fadeOut ? 0 : 1 }}
					className={className}
					data-slot="aperto-overlay"
					exit={{ opacity: 0 }}
					initial={{ opacity: 0 }}
					ref={ref}
					style={style}
					transition={resolved.transition}
				/>
			</Dialog.Overlay>
		);
	},
);

ApertoOverlay.displayName = "ApertoOverlay";

export { ApertoOverlay };
