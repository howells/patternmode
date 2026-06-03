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

Use `DistributionBar` as a sibling primitive when a weighted visual distribution should be edited with draggable boundary handles.

Distribution segment values are weights, not persisted percentages. The bar renders segment widths proportionally and its legend displays derived percentages.

For external segment controls, keep `segments` controlled and pass the next value to `onChange`. The package also exports `moveDistributionBoundary`, `updateDistributionSegment`, and `removeDistributionSegment` so custom controls can move handles, change segment metadata, or remove a segment without duplicating the bar math. `updateDistributionSegment` does not change distribution values.

Import `@patternmode/swatch/styles.css` once in your app.
