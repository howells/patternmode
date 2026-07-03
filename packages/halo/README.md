# @patternmode/halo

Round saturation/lightness color picker with a compact hue arc.

```tsx
import { HaloPicker, type HaloColor } from "@patternmode/halo";
import "@patternmode/halo/styles.css";

export function Example() {
  const [color, setColor] = useState<HaloColor>({ h: 16, s: 48, l: 69 });
  return <HaloPicker aria-label="Accent color" value={color} onChange={setColor} />;
}
```

`HaloPicker` is controlled: pass an HSL value and update it in `onChange`.

## Interaction

- **Drag the round pad** to set saturation (left–right) and lightness
  (bottom–top). The pad is focusable: arrow keys nudge saturation
  (Left/Right) and lightness (Up/Down), Shift for larger steps.
- **Drag the hue arc** (or use the arrow keys of its hidden slider) to set
  hue. Hue is emitted in `0..359` — the arc's far end is the same red as its
  start and reads as the canonical `0`.

## API

| Prop        | Type                                     | Default    | Description                                                                   |
| ----------- | ---------------------------------------- | ---------- | ----------------------------------------------------------------------------- |
| `value`     | `HaloColor`                              | —          | Controlled HSL color value (`{ h, s, l }`).                                   |
| `onChange`  | `(value: HaloColor) => void`             | —          | Called whenever the pad, hue arc, or keyboard changes the HSL value.          |
| `placement` | `"bottom" \| "left" \| "right" \| "top"` | `"bottom"` | Which side of the pad the hue arc sits on. The value readout follows the arc. |
| `label`     | `string`                                 | `"Color"`  | Hidden fieldset legend used when the picker has no `aria-label`.              |
| `showValue` | `boolean`                                | `true`     | Whether to show the computed hex value alongside the wheel.                   |

The package also exports the geometry helpers and `hslToHex` for custom
readouts.
