---
"@patternmode/tags": patch
---

Read the standard `--border` theme variable instead of `--border-subtle`.

`--border-subtle` was the one custom property in Patternmode's CSS vocabulary that is not part of the shadcn theme token set, so a consumer wiring up a stock shadcn theme got every other Tags colour themed and this one silently falling back to a hardcoded hex. It now reads `--border`, which shadcn defines.

Fallback values are unchanged, so nothing renders differently out of the box. **Consumers who set `--border-subtle` to theme Tags must set `--border` instead** — and if they already define `--border` for shadcn, Tags now picks it up with no configuration.
