import type { ComponentType } from "react";

export const examples: Record<
  string,
  () => Promise<{ default: ComponentType }>
> = {
  alert: () => import("../examples/alert"),
  badge: () => import("../examples/badge"),
  button: () => import("../examples/button"),
  "button-icons": () => import("../examples/button-icons"),
  "button-loading": () => import("../examples/button-loading"),
  card: () => import("../examples/card"),
  dialog: () => import("../examples/dialog"),
  flex: () => import("../examples/flex"),
  "flex-responsive": () => import("../examples/flex-responsive"),
  heading: () => import("../examples/heading"),
  input: () => import("../examples/input"),
  "input-states": () => import("../examples/input-states"),
  select: () => import("../examples/select"),
  tabs: () => import("../examples/tabs"),
  transition: () => import("../examples/transition"),
};
