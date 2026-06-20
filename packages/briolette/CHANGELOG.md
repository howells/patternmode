# @patternmode/briolette

## 0.3.1

### Patch Changes

- b8e0048: Use `@instruments/colorscope` for color math instead of hand-rolled helpers, and
  upgrade colorscope to `^3.5.0` (the previously pinned `2.0.1` was deprecated).
  Swatch now derives light/dark tone from perceptual OKLab lightness and builds
  atmosphere alpha via colorscope conversion; Halo delegates its HSL→hex
  conversion to colorscope while keeping its defensive input clamping. Halo and
  atmosphere output are unchanged; only swatch tone selection on borderline colors
  may shift to the perceptual model.

## 0.3.0

### Minor Changes

- Two selection fixes. A controlled value present at mount (e.g. restored from a URL) now anchors and centers its facet exactly like a later external change, instead of being absorbed as the baseline. And clicking far from the current anchor now travels — opening a fresh depth-1 neighborhood around the new color — instead of refining deeper, so exploring outward never tightens the spread; near clicks still refine. New `maxDepth` prop caps refinement depth, and `nextBrioletteDepth` / `BRIOLETTE_TRAVEL_ANGLE` are exported.

## 0.2.0

### Minor Changes

- e7876dc: Add facet density and seam control props to BriolettePicker. `density` chooses the geodesic cut (coarse 20, base 80, fine 180, brilliant 320 facets) and animates between cuts — the finer geometry grows out of (or collapses back into) the coarser one. `seamOpacity` fades the facet seams from full lines to a seamless gem without antialiasing cracks, and `seamColor` recolors them. Palettes now also guarantee every facet a distinct hex, escaping gamut-corner quantization collisions deterministically. The value prop is now fully controllable: hexes supplied from outside re-anchor the sphere around the nearest facet and glide it to center.
