---
"@patternmode/status": minor
---

Status no longer needs `motion`: the peer dependency is removed. The border arc animates with a CSS transition that follows the `motion` prop and reduced motion, and the fill sweep writes its path without re-rendering on every frame.

- `size` is written inline only when passed, so a consumer's stylesheet can set `--patternmode-status-size`.
