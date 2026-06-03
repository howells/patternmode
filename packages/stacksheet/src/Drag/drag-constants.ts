/** Elements that should never initiate a drag */
export const INTERACTIVE_TAGS = new Set(["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"]);

/** Dead zone in px before committing to drag vs text selection */
export const DEAD_ZONE = 10;

/** Max angle (degrees) from dismiss axis to qualify as drag intent */
export const MAX_ANGLE_DEG = 35;

/** Rubber-band resistance factor for dragging past resting position */
export const RUBBER_BAND_FACTOR = 0.6;
