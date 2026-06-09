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
The package also exports the geometry helpers and `hslToHex` for custom
readouts.
