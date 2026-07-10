---
"@patternmode/system": patch
"@patternmode/stacksheet": patch
---

Replace regex named capture groups with indexed groups so vendored copies compile under consumer TypeScript configs targeting ES2017 (named groups require ES2018+). No behavior change.
