# @patternmode/briolette

A spinnable geodesic color sphere. At rest its 80 facets span the whole color
universe — hue around the equator, lightness pole to pole. Selecting a facet
repaints the sphere with similar-but-distinct neighbors of that color, built
directly in OKLab via
[`@instruments/colorscope`](https://www.npmjs.com/package/@instruments/colorscope)
so spacing is perceptually even: hue rotates around the anchor's azimuth,
lightness shifts along the pole axis into whatever headroom the anchor has,
and chroma swings with distance. Grey and near-neutral anchors bloom into a
wheel of tints, the far hemisphere glides toward the anchor's complement, and
out-of-gamut neighbors are pulled back by reducing chroma only — so every
facet stays a distinct, honest choice. Each further selection tightens the
neighborhood, but never past a floor. Selecting the pinned facet again unsets
the value.

## Usage

```tsx
import { BriolettePicker } from "@patternmode/briolette";
import "@patternmode/briolette/styles.css";

export function AccentColorField() {
  const [color, setColor] = useState<string | null>(null);

  return <BriolettePicker aria-label="Accent color" value={color} onChange={setColor} />;
}
```

## Interaction

- **Drag** (or arrow keys) to spin the sphere; it drifts slowly while idle.
- **Select a facet** to choose its hex color and refine the sphere around it. The
  sphere glides so your selection ends up centered, facing the viewer.
- **Select the pinned facet again** (or press Escape) to unset.
- **Enter** selects the facet closest to the viewer.

Honors `prefers-reduced-motion`: idle drift and inertia are disabled, leaving
only direct manipulation.

## API

| Prop        | Type                              | Default   | Description                              |
| ----------- | --------------------------------- | --------- | ---------------------------------------- |
| `value`     | `string \| null`                  | —         | Controlled hex color value.              |
| `onChange`  | `(value: string \| null) => void` | —         | Selection and unset callback.            |
| `label`     | `string`                          | `"Color"` | Accessible name for the sphere stage.    |
| `showValue` | `boolean`                         | `true`    | Shows the hex output beneath the sphere. |
| `size`      | `number`                          | `280`     | Rendered sphere size in pixels.          |

Geometry and palette helpers (`buildBrioletteFaces`, `projectBrioletteFaces`,
`buildBriolettePalette`, `brioletteUniverseColor`, `brioletteNeighborColor`) are exported
for custom renderers.
