# @patternmode/parquet

A proportional color mosaic. Each tile's **area** encodes its weight, and the
layout re-tiles and morphs when the palette changes — the two-dimensional,
read-only counterpart to Swatch's `DistributionBar`.

```tsx
import { Parquet } from "@patternmode/parquet";
import "@patternmode/parquet/styles.css";

const palette = [
  { color: "#c2703e", value: 0.42, label: "Terracotta" },
  { color: "#2d5a27", value: 0.28, label: "Forest" },
  { color: "#1b2a4a", value: 0.18, label: "Navy" },
  { color: "#e8b4b8", value: 0.12, label: "Blush" },
];

export function Example() {
  return <Parquet colors={palette} showLabels />;
}
```

`Parquet` is **controlled**: it renders one distribution and morphs (a CSS
transition on the tiles' geometry) whenever `colors` changes. Rotation, in-view gating, and surrounding stats are the
consumer's responsibility — pass a new `colors` array to animate to a new palette.

## Tiles and slots

Tiles are assigned to **slots** by descending area, so the largest weight always
occupies slot 0. When the palette changes, slot 0 morphs from the old biggest
tile to the new biggest tile instead of teleporting. Set `slotCount` to keep a
fixed number of slots when morphing between palettes of different lengths —
extra slots collapse to nothing.

## Input

`colors` is an array of `ParquetTile`, which extends the shared
`WeightedColorSegment` (`{ color, value, label? }`) from `@patternmode/system`.
The same array can drive a `DistributionBar` and a `Parquet`. `value` is a
relative weight, not a persisted percentage; zero, negative, and invalid weights
render no tile.

## Labels

With `showLabels`, each tile shows its `label` and derived percentage on hover,
with a foreground color chosen for contrast (via `@patternmode/system`'s
`isLightColor`, which resolves perceptual lightness). Pass
`renderTile(tile, { percent, isLight, slot, width, height })` to replace the
label content entirely.

## Props

| Prop            | Type                        | Default         | Description                                  |
| --------------- | --------------------------- | --------------- | -------------------------------------------- |
| `colors`        | `ParquetTile[]`             | —               | Weighted colors to pack.                     |
| `aspectRatio`   | `number`                    | `4 / 3`         | Mosaic width ÷ height.                       |
| `gap`           | `number`                    | `10`            | Gap between tiles, in internal layout units. |
| `slotCount`     | `number`                    | `colors.length` | Fixed slot count for stable morphs.          |
| `showLabels`    | `boolean`                   | `false`         | Show built-in hover labels.                  |
| `renderTile`    | `(tile, meta) => ReactNode` | —               | Custom tile content.                         |
| `disableMotion` | `boolean`                   | `false`         | Disable enter/morph animation.               |

The pure `packSquarified` algorithm is also exported for custom renderers.
