export const SEMANTIC_VARIANTS = [
  "default",
  "secondary",
  "accent",
  "success",
  "destructive",
] as const;

export type SemanticVariant = (typeof SEMANTIC_VARIANTS)[number];
