// Base UI render-prop helpers — the successor to Radix's `asChild`/`Slot`.
//
// NOTE: this file is duplicated verbatim across the patternmode primitive
// packages (aperto, scrollframe, stacksheet, swatch, tags). It exists so the
// `render` prop contract has a single named type per package and one import
// site to audit. Keep the copies in sync.
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

export { mergeProps, useRender };

/**
 * Public `render` prop type. Pass a React element (`render={<a href="…" />}`)
 * to render the component's styling and behaviour through that element instead
 * of its default tag, or a function for full control over prop spreading.
 */
export type RenderProp<State = Record<string, unknown>> = useRender.RenderProp<State>;
