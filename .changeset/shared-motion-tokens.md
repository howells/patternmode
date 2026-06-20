---
"@patternmode/aperto": patch
"@patternmode/status": patch
"@patternmode/stacksheet": patch
---

Consume the shared `@howells/motion` tokens instead of locally duplicated spring
and easing values, so motion feel stays consistent across the catalog. No public
API or behavior change: aperto drops its hand-copied token file, status reuses
`easings.snappy`/`easings.smooth`, and stacksheet sources `snappy`/`subtle` from
the shared springs while keeping its intentional `stiff` damping fork.
