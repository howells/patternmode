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

## Theming

The mark reads its colours from the standard shadcn theme variables — `--ring`
for `tone="accent"`, `--muted-foreground` for `tone="muted"` — and falls back to
built-in defaults when the host defines neither.

The inactive track is derived: it is the active colour tinted 12% toward the
ground the mark sits on. That ground is `--patternmode-status-surface`, which
resolves from `--background` and falls back to `white`.

A themed UI therefore needs no wiring in either light or dark mode. Set the
property yourself when the host has no `--background`, or when a mark sits on a
raised surface rather than the canvas:

```css
.panel .patternmode-status-mark {
  --patternmode-status-surface: var(--card);
}
```

The track must stay quieter than the arc, so it has to be tinted toward the
surface behind it — a track tinted toward white on a dark ground outshines the
arc and every mark reads full. `trackColor` still overrides this per instance.
