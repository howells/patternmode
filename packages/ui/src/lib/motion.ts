/** biome-ignore-all lint/performance/noBarrelFile: intentional package or module entrypoint */
/**
 * Re-export motion tokens for UI components.
 * Components should import from here rather than directly from @patternmode/motion.
 */
export {
  type Duration,
  durationMs,
  durations,
  type Easing,
  easings,
  easingsCSS,
  type Preset,
  presets,
  type Scale,
  type SpringType,
  scales,
  springs,
} from "@patternmode/motion";
