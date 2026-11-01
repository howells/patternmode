# @patternmode/channel

## 0.2.7

### Patch Changes

- Updated dependencies [e8d30a9]
  - @patternmode/swatch@5.1.3

## 0.2.6

### Patch Changes

- e1ab95a: Keep the thumb's keyboard focus ring visible on dark ramps. On a near-black track the ring measured 2.3:1 against the track and 1.2:1 against the glass; it now has a band of the page colour inside it, so it contrasts at either end of any ramp.
- Updated dependencies [e1ab95a]
  - @patternmode/swatch@5.1.2

## 0.2.5

### Patch Changes

- Updated dependencies
  - @patternmode/swatch@5.1.1

## 0.2.4

### Patch Changes

- A range's undimmed stretch now ends in a round cap around each thumb instead of a straight edge beside it.
- 5add3d1: Update @base-ui/react to the latest release.

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
