import type { LucideIcon } from "lucide-react";
import type * as React from "react";
import type { ComponentSize } from "../../lib/size";

/** Component size scale for Input and related parts. */
export type InputSize = Exclude<ComponentSize, "3xl">;

export type InputIcon =
  | LucideIcon
  | React.ComponentType<React.SVGProps<SVGSVGElement>>;
