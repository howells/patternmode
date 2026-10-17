import type { SpringPreset } from "./springs";
import { springs } from "./springs";
import type {
  ResolvedConfig,
  ResponsiveSide,
  Side,
  SideConfig,
  SpringConfig,
  StackingConfig,
  StacksheetConfig,
} from "./types";
// ── Defaults ────────────────────────────────────
const DEFAULT_STACKING: StackingConfig = {
  offsetStep: 16,
  opacityStep: 0,
  radius: 12,
  renderThreshold: 3,
  scaleStep: 0.04,
};
const DEFAULT_SIDE: ResponsiveSide = {
  desktop: "right",
  mobile: "bottom",
};
const DEFAULT_CONFIG: Omit<ResolvedConfig, "side" | "spring" | "stacking"> = {
  ariaLabel: "Sheet dialog",
  breakpoint: 768,
  closeOnBackdrop: true,
  closeOnEscape: true,
  closeThreshold: 0.25,
  dismissible: true,
  drag: true,
  handle: "inside",
  lockScroll: true,
  maxDepth: Number.POSITIVE_INFINITY,
  maxWidth: "90vw",
  modal: true,
  repositionInputs: true,
  scaleBackgroundAmount: 0.97,
  shouldScaleBackground: false,
  showOverlay: true,
  snapPoints: [],
  snapToSequentialPoints: false,
  velocityThreshold: 0.5,
  width: 420,
  zIndex: 100,
};
// ── Helpers ─────────────────────────────────────
const isSideName = (side: SideConfig | undefined): side is Side => typeof side === "string";

const isSpringPreset = (
  spring: SpringPreset | Partial<SpringConfig> | undefined,
): spring is SpringPreset => typeof spring === "string";

/** Normalize a string side to a responsive object, merging with defaults. */
const resolveSide = (side: SideConfig | undefined): ResponsiveSide => {
  if (isSideName(side)) {
    return { desktop: side, mobile: side };
  }
  return { ...DEFAULT_SIDE, ...side };
};
/** Resolve a preset name to a SpringConfig, or merge partial config with defaults. */
const resolveSpring = (spring: SpringPreset | Partial<SpringConfig> | undefined): SpringConfig => {
  if (isSpringPreset(spring)) {
    return springs[spring];
  }
  return { ...springs.stiff, ...spring };
};
// ── Resolver ────────────────────────────────────
/** Merge user-provided config with defaults. Resolves union types (side, spring) to concrete values. */
export const resolveConfig = (config: StacksheetConfig = {}): ResolvedConfig => {
  const { side, spring, stacking, ...scalarConfig } = config;
  // SAFETY: `scalarConfig` is StacksheetConfig without side, spring and stacking, so the entries
  // that survive the filter are the scalar keys of ResolvedConfig with their defined values.
  const definedConfig = Object.fromEntries(
    Object.entries(scalarConfig).filter(([, value]) => value !== undefined),
  ) as Partial<Omit<ResolvedConfig, "side" | "spring" | "stacking">>;

  return {
    ...DEFAULT_CONFIG,
    ...definedConfig,
    side: resolveSide(side),
    spring: resolveSpring(spring),
    stacking: { ...DEFAULT_STACKING, ...stacking },
  };
};
