import type { useRender } from "@base-ui-components/react/use-render";
import type { Size } from "@patternmode/constants/sizes";
import type { ContainerVariantProps } from "./variants";

/**
 * Props for the Container component.
 *
 * - `size` maps to shared Size keys from @patternmode/constants/sizes
 * - `center` toggles horizontal centering via margin auto
 * - `fluid` removes max-width constraints (full-bleed)
 */
export type ContainerProps = {
  size?: Size;
  center?: boolean;
  fluid?: boolean;
  className?: string;
  render?: useRender.RenderProp<Record<string, unknown>>;
} & useRender.ComponentProps<"div">;

export type { ContainerVariantProps };
