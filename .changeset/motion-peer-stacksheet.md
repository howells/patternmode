---
"@patternmode/stacksheet": major
---

`motion` is now a peer dependency, not a regular one.

Shipping it as a regular dependency let a consumer end up with two copies of
the animation library in one tree. Sheet enter/exit animations run through the same context. A duplicate copy is not a second
instance of the same thing — React context does not cross the boundary, so
`LazyMotion` and `LayoutGroup` set up by one copy are invisible to components
rendered against the other, and the failure is silent.

**Migration: declare `motion` yourself.** Range `^12.40.0`. Every consumer in
this estate already does, because the package importing patternmode imports
motion too — so this is a version bump, not an install-graph change.
