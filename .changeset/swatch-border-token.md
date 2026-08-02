---
"@patternmode/swatch": patch
---

Read the standard `--border` theme variable instead of `--border-subtle`.

`--border-subtle` was the one custom property in Patternmode's CSS vocabulary that is not part of the shadcn theme token set, so a consumer wiring up a stock shadcn theme got every other Swatch colour themed and this one silently falling back to a hardcoded hex. It now reads `--border`, which shadcn defines.

Fallback values are unchanged, so nothing renders differently out of the box. **Consumers who set `--border-subtle` to theme Swatch must set `--border` instead** — and if they already define `--border` for shadcn, Swatch now picks it up with no configuration.
