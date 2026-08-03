# @patternmode/swatch

Color, gradient, image, and palette swatch primitives for React.

```tsx
import { DistributionBar, Swatch } from "@patternmode/swatch";
import "@patternmode/swatch/styles.css";

export function Example() {
  return (
    <>
      <Swatch
        aria-label="Palette"
        colors={[
          { color: "#315c4b", ratio: 60 },
          { color: "#e1ebe5", ratio: 40 },
        ]}
        shape="pill"
        size="2xl"
      />
      <DistributionBar
        aria-label="Finish distribution"
        segments={[
          { id: "evergreen", color: "#315c4b", label: "Evergreen", value: 48 },
          { id: "saffron", color: "#d9a441", label: "Saffron", value: 30 },
          { id: "oxblood", color: "#9b3d32", label: "Oxblood", value: 22 },
        ]}
      />
    </>
  );
}
```

Use `color` for a solid fill, `background` for a CSS background value, or `colors` for weighted palette stops. `Swatch` remains representation-only: compose selection around it, or pass `onRemove` when the swatch should expose its built-in remove request affordance.

## Rendering as a child element

By default `Swatch` renders its own `<figure>` wrapper. Pass `asChild` to render
the swatch styling _through_ a single child element instead — the Radix Slot
pattern. Swatch merges its `className`, `style` (including the
`--patternmode-swatch-size` / `--patternmode-swatch-fill` variables), `data-*`
attributes, and remaining props onto the child, and injects the fill / scrim
layers inside it. The child's own props win on conflict, and event handlers are
composed.

Use this when the swatch must _be_ an interactive element, such as a `<button>`
cell in a color matrix:

```tsx
<Swatch asChild color="#315c4b" flat shape="block" size="lg">
  <button onClick={() => select("#315c4b")} type="button" />
</Swatch>
```

`asChild` requires exactly one React element child and does not support
`onRemove` (its remove affordance cannot be composed into an arbitrary slotted
element). Wrap a default Swatch when a remove control is required.

## Optimized images

Swatch can frame media via `children`, but it does not optimize images itself.
If your app uses Next.js, pass your own `next/image` `Image` component as the
child:

```tsx
import { Swatch } from "@patternmode/swatch";
import Image from "next/image";

<Swatch aria-label="Oak veneer" objectFit="cover" shape="square" size="4xl">
  <Image alt="" fill sizes="4.5rem" src="/finishes/oak.jpg" />
</Swatch>;
```

## Distributions: two components, and they are not interchangeable

Use `DistributionBar` when a human allocates the weights and must be able to
change them: it renders a `<fieldset>` with `role="slider"` boundary handles that
drag and answer arrow keys.

Use **`DistributionDisplay`** when the weights were computed — a bin a
calculation filled rather than a share someone assigned. It draws the same
contiguous track and legend and nothing else. Dragging the edge of a computed bin
just lies about what the number is, which is why the read-only one exists rather
than being the editor with its handles hidden.

```tsx
import { DistributionDisplay } from "@patternmode/swatch";

<DistributionDisplay
  aria-label="Colour distribution"
  emptyLabel="unclassified"
  emptyValue={12}
  legend="summary"
  segments={[
    { id: "evergreen", color: "#315c4b", label: "Evergreen", value: 48 },
    { id: "saffron", color: "#d9a441", label: "Saffron", value: 30 },
  ]}
/>;
```

One bordered track with hairline boundaries, not a flex row of individually
rounded `Swatch` blocks — contiguity is the hard part, and separate blocks leak
each swatch's own radius and shadow as seams.

- `legend` — `"segments"` (default, one entry per segment), `"summary"`
  (assigned vs unassigned percentages), or `false`.
- `emptyValue` / `emptyLabel` — unassigned weight, drawn as a muted remainder and
  included in the derived percentages.
- `onSegmentSelect` + `selectedSegmentId` — makes each segment a button and rings
  the selected one. Selection is not editing; the element only becomes a
  `<fieldset>` when it becomes interactive.
- Height and corner radius come from `--patternmode-distribution-height` and
  `--patternmode-distribution-radius`.

Distribution segment values are weights, not persisted percentages. Both
components render segment widths proportionally and their legends display derived
percentages.

For external segment controls, keep `segments` controlled and pass the next value
to `onChange`. `updateDistributionSegment` does not change distribution values.

## Exports

Everything the package ships. If it is not here, it is not public.

### Components

|                       |                                                                                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Swatch`              | Colour, gradient, image and palette swatch. `SwatchProps` is the union of `SwatchDefaultProps` (own `<figure>`) and `SwatchRenderProps` (`asChild`). |
| `DistributionBar`     | The **editor** — draggable, keyboard-adjustable boundary handles. `DistributionBarProps`.                                                            |
| `DistributionDisplay` | The **read-only** strip. `DistributionDisplayProps`.                                                                                                 |

### Distribution helpers

Pure functions over a segment list, so custom controls do not duplicate the bar
math. All return a new array; none mutate.

|                                                                           |                                                                                                          |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `getDistributionTotal(segments)`                                          | Sum of sanitised weights; invalid or negative values count as 0.                                         |
| `getDistributionBoundaryPercent(segments, boundaryIndex)`                 | Percentage position of the boundary after `boundaryIndex`.                                               |
| `moveDistributionBoundary(segments, boundaryIndex, deltaValue, minValue)` | Moves weight between two adjacent segments, preserving their sum and holding each side above `minValue`. |
| `updateDistributionSegment(segments, segmentId, update)`                  | Changes segment metadata (label, colour). Cannot change `value` — the type forbids it.                   |
| `removeDistributionSegment(segments, segmentId)`                          | Removes a segment and redistributes its weight proportionally across the rest.                           |

### Swatch helpers

|                                                   |                                                                                                                                                                                                                                    |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getSwatchColorsBackground(colors, blend?)`       | The CSS background a palette produces. `blend` is `"step"` (default, hard boundaries) or `"smooth"` (interpolated in OKLab). Returns `undefined` for an empty palette.                                                             |
| `getSwatchAtmosphereBackground(colors, options?)` | The soft layered-radial "atmosphere" fill — overlapping elliptical pools rather than a flat or linear ramp. `SwatchAtmosphereOptions`: `density` (0 diffuse → 1 dense, default 0.5) and `gravity` (-1 sinks → 1 rises, default 0). |
| `getSwatchSizeVariableStyle(size, variableName?)` | The inline style object setting `--patternmode-swatch-size` for a size token, for framing something Swatch does not render itself.                                                                                                 |

### Constants and types

`SWATCH_SIZES`, `SWATCH_SIZE_VALUES`, `SWATCH_SHAPES`, `SWATCH_TEXTURES` — the
allowed token lists, with `SwatchSize`, `SwatchShape`, `SwatchTexture` derived
from them, plus `SwatchColorStop` and `SwatchSharedProps`.

`DistributionSegment` and `DistributionSegmentUpdate` are the segment types.
`DistributionBarSegment` and `DistributionBarSegmentUpdate` are their former
names, kept as identical-shape aliases — prefer the neutral ones, since the
segment belongs to both components rather than to the editor.

Import `@patternmode/swatch/styles.css` once in your app.
