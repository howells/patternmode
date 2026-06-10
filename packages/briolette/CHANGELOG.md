# @patternmode/briolette

## 0.2.0

### Minor Changes

- e7876dc: Add facet density and seam control props to BriolettePicker. `density` chooses the geodesic cut (coarse 20, base 80, fine 180, brilliant 320 facets) and animates between cuts — the finer geometry grows out of (or collapses back into) the coarser one. `seamOpacity` fades the facet seams from full lines to a seamless gem without antialiasing cracks, and `seamColor` recolors them. Palettes now also guarantee every facet a distinct hex, escaping gamut-corner quantization collisions deterministically. The value prop is now fully controllable: hexes supplied from outside re-anchor the sphere around the nearest facet and glide it to center.
