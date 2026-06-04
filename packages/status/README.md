# @patternmode/status

Animated discrete status marks for React.

```tsx
import { StatusMark } from "@patternmode/status";
import "@patternmode/status/styles.css";

export function Example() {
  return (
    <div>
      <StatusMark
        value={75}
        label="Almost complete"
        border
        fill
        color="#315c4b"
        fillColor="#315c4b2e"
      />
      <StatusMark status="blocked" label="Blocked" tone="danger" />
    </div>
  );
}
```

`StatusMark` is for compact, discrete status communication: empty, quarter,
half, three-quarter, full, pending, blocked, paused, unknown, unavailable, and
complete. Numeric `value` props are clamped from `0` to `100` and snapped to the
nearest discrete visual step.

Scale states render with `fill` and `border` enabled by default. Set
`fill={false}` for an outline-only progress arc, `border={false}` for a softer
fill-only mark, or supply `color`, `fillColor`, and `trackColor` for
instance-level color control.

The SVG is authored by Patternmode with lucide-compatible geometry rather than
rendering lucide icons directly. That keeps the transition skeleton shared, so
states can animate through path length, opacity, and scale instead of swapping
whole icons.
