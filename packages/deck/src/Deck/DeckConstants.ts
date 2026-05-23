import type { AdvanceDirection } from "../types";

export const DEFAULT_VISIBLE_COUNT = 3;
export const DEFAULT_DISTANCE_THRESHOLD = 0.35;
export const DEFAULT_VELOCITY_THRESHOLD = 500;
export const DEFAULT_PEEK_OFFSET = 16;
export const DEFAULT_SCALE_STEP = 0.045;
export const DEFAULT_ROTATION = 6;
export const DEFAULT_PERSPECTIVE = 1000;
export const DEFAULT_DRAG_ELASTIC = 0.9;
export const DEFAULT_DIRECTIONS: AdvanceDirection[] = ["left", "right"];

export const DRAG_TILT_MAX = 15;
export const DRAG_TILT_RAMP = 250;
export const DRAG_INFLUENCE_RAMP = 80;
export const EXIT_ROTATION = 20;
export const BG_RESPONSE_FACTOR = 0.4;
export const BG_RESPONSE_RAMP = 150;
