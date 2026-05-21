import { durations, easings, springs } from "@howells/motion";
import type {
	DragSpringConfig,
	MotionPreset,
	MotionPresetName,
	MotionVariants,
} from "./types";

/**
 * Motion presets — each bundles transition timing AND drag physics
 * so "snappy" feels snappy everywhere: open, close, and drag.
 *
 * Curves and springs sourced from @howells/motion tokens.
 */
export const PRESETS: Record<MotionPresetName, MotionPreset> = {
	snappy: {
		transition: { ease: easings.snappy, duration: durations.snappy },
		drag: {
			stiffness: springs.stiff.stiffness,
			damping: springs.stiff.damping,
			restDelta: 0.01,
		},
	},
	smooth: {
		transition: { ease: easings.customGentle, duration: durations.moderate },
		drag: {
			stiffness: springs.natural.stiffness,
			damping: springs.natural.damping,
			restDelta: 0.01,
		},
	},
	bouncy: {
		transition: {
			type: "spring",
			stiffness: springs.bouncy.stiffness,
			damping: springs.bouncy.damping,
			mass: springs.bouncy.mass,
		},
		drag: {
			stiffness: springs.snappy.stiffness,
			damping: springs.snappy.damping,
			restDelta: 0.01,
		},
	},
	reduced: {
		transition: { ease: "linear", duration: 0.01 },
		drag: { stiffness: 1000, damping: 50, restDelta: 0.1 },
	},
};

type ComponentType = "trigger" | "content" | "backdrop";

/**
 * Three-level motion resolution:
 * 1. Component-level override (highest)
 * 2. Per-component variant from Root
 * 3. Global preset from Root (lowest)
 *
 * If `prefers-reduced-motion` is active, always returns "reduced".
 */
export function resolvePreset(
	componentType: ComponentType,
	componentMotion: MotionPresetName | undefined,
	globalPreset: MotionPresetName,
	variants: MotionVariants | undefined,
	reduceMotion: boolean,
): MotionPreset {
	if (reduceMotion) {
		return PRESETS.reduced;
	}

	// 1. Component-level override
	if (componentMotion) {
		return PRESETS[componentMotion];
	}

	// 2. Per-component variant
	if (variants?.[componentType]) {
		return PRESETS[variants[componentType]];
	}

	// 3. Global preset
	return PRESETS[globalPreset];
}

/** Extract the drag spring config from a preset */
export function getDragSpring(preset: MotionPreset): DragSpringConfig {
	return preset.drag;
}
