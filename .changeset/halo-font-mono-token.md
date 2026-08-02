---
"@patternmode/halo": patch
---

Read `--font-mono` instead of `--mono` for the numeric readout's font stack.

`--mono` is not part of the shadcn or Tailwind theme vocabulary; `--font-mono` is, and Tailwind v4 already defines it. Halo's readout now picks up a host application's mono stack with no configuration.

The fallback font list is unchanged, so nothing renders differently out of the box. **Consumers who set `--mono` to style the readout must set `--font-mono` instead.**

This token escaped the earlier vocabulary migration because it is written as a multi-line `var()` call, which the repository's token check could not see. That check has been fixed in the same change.
