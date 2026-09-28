# @patternmode/channel

## 0.2.1

### Patch Changes

- 03ea00d: Let a range's veil vanish at the endpoints so the pill's rounded end stays undimmed around a thumb parked there.
- 03ea00d: Draw a range's dimmed veil on the track instead of clipping the control. Chromium ignores calc() values for overflow-clip-margin, so the clip cut the pill's rounded ends off flush with the thumbs at both endpoints.
- 03ea00d: Stop a range's veil at the thumb's outer edge rather than its centre, so the glass thumb no longer shows the veil's seam through it.
- Updated dependencies [1b9efbc]
  - @patternmode/swatch@5.0.0

## 0.2.0

### Minor Changes

- f4234e3: Introduce ChannelSlider: gradient channels with inset glass thumbs, single values or ranges, accessible Base UI interactions, independent live and committed callbacks, and the exact Swatch size scale.
