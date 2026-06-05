# @patternmode/status

Animated discrete progress marks for React.

```tsx
import { StatusMark } from "@patternmode/status";
import "@patternmode/status/styles.css";

export function Example() {
  return (
    <div>
      <StatusMark value={75} label="Almost complete" color="#315c4b" trackColor="#edeae2" />
      <StatusMark status="null" label="Not measured yet" />
    </div>
  );
}
```

`StatusMark` is for compact, discrete progress communication: null, empty,
quarter, half, three-quarter, and full. Numeric `value` props are clamped from
`0` to `100` and snapped to the nearest quarter step.

Use `status="null"` when progress is explicitly not yet known or measured. Null
progress is distinct from `status="empty"` or `value={0}`, which represent known
zero progress.

The default `variant="fill"` renders a filled progress mark. Use
`variant="border"` for an outline progress arc. `color` controls active progress,
while `trackColor` controls inactive and placeholder structure.
