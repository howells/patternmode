export const COMPONENT_SIZES = ["sm", "base", "lg"] as const;

export type ComponentSize = (typeof COMPONENT_SIZES)[number];
