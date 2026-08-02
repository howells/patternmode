---
"@patternmode/briolette": minor
"@patternmode/parquet": patch
"@patternmode/swatch": major
"@patternmode/system": minor
"@patternmode/halo": minor
---

Require `@instruments/colorscope@^3.17.0`, and delete the workaround it makes dead

colorscope below 3.17.0 assumed its HSL inputs were already in range. They were
not always, and it did not say so: an unwrapped hue fell straight through
`hslToRgb`'s `< 60`/`< 120` sector chain into the final 300–360 branch, and a
negative saturation was used as-is. Both returned a confidently wrong colour with
no error and no malformed output — `hsl(400, 100%, 40%)`, which is `hsl(40)`, an
orange, came back a darker magenta. 3.17.0 fixes it at the root: hue wraps,
saturation and lightness clamp, non-finite throws.

- **swatch, briolette, halo** raise the colorscope peer floor to `^3.17.0`. This
  is breaking: a consumer resolving an older colorscope no longer satisfies the
  peer.
- **halo** deletes its own hue-normalizing, 0–100-clamping wrapper around
  `hslToHex`. It existed only to patch this defect, and the guarantee now lives in
  the library. `hslToHex` is still exported and still behaves identically; the
  existing `hslToHex(720, 200, -20) === "#000000"` test passes either way, which
  is what proved the deletion safe. Two other repos had independently written the
  same wrapper — the fix was one layer down, not a shared helper.
- **system** raises its colorscope floor. This is the package where the defect was
  actually live: `isLightColor` accepts any CSS colour string a consumer passes
  and hands `hsl()` channels straight to `hslToRgb` unguarded, and its result
  drives `data-tone`. It needed no defensive code, only the floor.
- **parquet** drops `@instruments/colorscope` entirely. It has not imported it
  since moving to `@patternmode/system`'s `isLightColor`; the dependency was
  vestigial. Its README no longer claims contrast is computed "via colorscope"
  when the route is indirect.

`system` keeps colorscope as a regular dependency rather than moving it to a peer.
A peer there would force colorscope onto every consumer of stacksheet,
scrollframe, tags, deck and status — packages that import only `joinClassNames`
and sizing helpers and never touch colour. colorscope is pure functions, so a
duplicated copy is wasteful rather than incorrect, unlike a React context; and
with the floor at `^3.17.0` every version it can resolve carries the fix. The
proper fix is to split the colour helpers out of `system`, which is a larger
change than this one.
