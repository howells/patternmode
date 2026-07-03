---
"@patternmode/system": patch
---

Constrain `isResponsiveValue`'s generic to `number | string` so arbitrary
object values can no longer be misclassified as responsive breakpoint maps,
and declare `"sideEffects": false` for better tree-shaking.
