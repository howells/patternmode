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

Use `DistributionBar` as a sibling primitive when a weighted visual distribution should be edited with draggable boundary handles.

Distribution segment values are weights, not persisted percentages. The bar renders segment widths proportionally and its legend displays derived percentages.

For external segment controls, keep `segments` controlled and pass the next value to `onChange`. The package also exports `moveDistributionBoundary`, `updateDistributionSegment`, and `removeDistributionSegment` so custom controls can move handles, change segment metadata, or remove a segment without duplicating the bar math. `updateDistributionSegment` does not change distribution values.

Import `@patternmode/swatch/styles.css` once in your app.
