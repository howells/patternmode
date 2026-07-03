# ScrollFrame

A Radix-based scroll frame with measured fades and movement controls.

ScrollFrame wraps a scroll area with edge fades that know where the scroll
actually is — each fade appears only while there is content beyond its edge —
plus optional previous/next controls, hidden-but-mounted scrollbars, and
click-and-drag scrolling.

```bash
npm install @patternmode/scrollframe
```

Peer dependencies: `react ^19`, `react-dom ^19`.

## Quick start

```tsx
import { ScrollFrame } from "@patternmode/scrollframe";
import "@patternmode/scrollframe/styles.css";

<ScrollFrame aria-label="Activity" className="h-96">
  {items.map((item) => (
    <ActivityRow key={item.id} item={item} />
  ))}
</ScrollFrame>;
```

The frame fills its container (`height: 100%` on the viewport), so give the
frame itself a bounded height.

## Fades

Fades render at the scroll edges and hide when their edge is rested against or
unreachable.

```tsx
<ScrollFrame fades="end" fadeSize={26} fadeColor="var(--surface)">
```

- `fades` — `true` (both edges, default), `"start"`, `"end"`, `"none"`, or a
  per-axis map when `axes="both"`.
- `fadeSize` — ramp length; number (px) or any CSS length. Default `2rem`.
- `fadeColor` — the painted gradient color. Default `var(--surface, #fff)`.

### `fadeMode="mask"`

The default `"color"` mode paints a `fadeColor` gradient over the content,
which only works on a solid surface. When the frame sits on a translucent,
blurred, image, or otherwise non-uniform backdrop, use mask mode — the
viewport fades its own content to transparent so the real backdrop shows
through:

```tsx
<ScrollFrame fadeMode="mask" fadeSize={26}>
```

Mask mode keeps the measured behavior (ramps collapse at the scroll extremes,
animated), honors `fades` and both axes, and needs no `fadeColor`.

## Axes, scrollbars, controls

```tsx
<ScrollFrame
  axes="horizontal"       // "vertical" (default) | "horizontal" | "both"
  scrollbars="hidden"     // "auto" (default) | "always" | "hover" | "hidden"
  controls                 // previous/next buttons; or { axis, visibility }
  scrollStep="page"       // "page" | px number | (state, axis) => px
  dragScroll               // click-and-drag scrolling; or a config object
>
```

## Composition

For custom layouts, compose the parts under `ScrollFrame.Root`:

```tsx
<ScrollFrame.Root axes="vertical" fadeMode="mask">
  <ScrollFrame.Viewport>{children}</ScrollFrame.Viewport>
  <ScrollFrame.Fade edge="start" /> {/* color mode only */}
  <ScrollFrame.Fade edge="end" />
  <ScrollFrame.Scrollbar orientation="vertical">
    <ScrollFrame.Thumb />
  </ScrollFrame.Scrollbar>
  <ScrollFrame.Previous />
  <ScrollFrame.Next />
</ScrollFrame.Root>
```

`useScrollFrame()` exposes the live state (edge positions, scrollability,
`scrollByStep`) for custom controls. In mask mode the viewport masks itself;
painted `Fade` parts are unnecessary.

## Styling

Import `@patternmode/scrollframe/styles.css` once. Theme hooks:

- `--surface`, `--border` — control/scrollbar chrome fallbacks
- `--patternmode-scrollframe-fade-color`, `--patternmode-scrollframe-fade-size`

Reduced motion is honored: fade transitions disable and movement controls
scroll instantly under `prefers-reduced-motion: reduce`.
