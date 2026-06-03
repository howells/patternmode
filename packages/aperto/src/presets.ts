import { durations, easings, springs } from "./motion-tokens";
import type { DragSpringConfig, MotionPreset, MotionPresetName, MotionVariants } from "./types";

/**
 * Motion presets — each bundles transition timing AND drag physics
 * so "snappy" feels snappy everywhere: open, close, and drag.
 *
 * Curves and springs are local copies of the Howells motion tokens so the
 * published package has no private workspace runtime dependencies.
 */
export const PRESETS: Record<MotionPresetName, MotionPreset> = {
  bouncy: {
    drag: {
      damping: springs.snappy.damping,
      restDelta: 0.01,
      stiffness: springs.snappy.stiffness,
    },
    transition: {
      damping: springs.bouncy.damping,
      mass: springs.bouncy.mass,
      stiffness: springs.bouncy.stiffness,
      type: "spring",
    },
  },
  reduced: {
    drag: { damping: 50, restDelta: 0.1, stiffness: 1000 },
    transition: { duration: 0.01, ease: "linear" },
  },
  smooth: {
    drag: {
      damping: springs.natural.damping,
      restDelta: 0.01,
      stiffness: springs.natural.stiffness,
    },
    transition: { duration: durations.moderate, ease: easings.customGentle },
  },
  snappy: {
    drag: {
      damping: springs.stiff.damping,
      restDelta: 0.01,
      stiffness: springs.stiff.stiffness,
    },
    transition: { duration: durations.snappy, ease: easings.snappy },
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
export const resolvePreset = (
  componentType: ComponentType,
  componentMotion: MotionPresetName | undefined,
  globalPreset: MotionPresetName,
  variants: MotionVariants | undefined,
  reduceMotion: boolean,
): MotionPreset => {
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
};

/** Extract the drag spring config from a preset */
export const getDragSpring = (preset: MotionPreset): DragSpringConfig => preset.drag;
