/** Background surface options for layout components. */
export type Surface = "card" | "muted" | "accent" | "background";

const SURFACE_CLASS: Record<Surface, string> = {
  card: "bg-card",
  muted: "bg-muted",
  accent: "bg-accent",
  background: "bg-background",
};

/** Border edge options — which sides to add a theme border to. */
export type BorderEdge =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "all"
  | ("top" | "right" | "bottom" | "left")[];

const BORDER_EDGE_CLASS = {
  top: "border-t border-border",
  right: "border-r border-border",
  bottom: "border-b border-border",
  left: "border-l border-border",
  all: "border border-border",
} as const;

/** Push surface class into a class array. */
export function pushSurfaceClass(
  classes: string[],
  surface: Surface | undefined,
): void {
  if (surface) {
    classes.push(SURFACE_CLASS[surface]);
  }
}

/** Push border-edge classes into a class array. */
export function pushBorderEdgeClasses(
  classes: string[],
  borderEdge: BorderEdge | undefined,
): void {
  if (!borderEdge) return;

  if (typeof borderEdge === "string") {
    const cls = BORDER_EDGE_CLASS[borderEdge as keyof typeof BORDER_EDGE_CLASS];
    if (cls) classes.push(cls);
    return;
  }

  for (const edge of borderEdge) {
    const cls = BORDER_EDGE_CLASS[edge as keyof typeof BORDER_EDGE_CLASS];
    if (cls) classes.push(cls);
  }
}
