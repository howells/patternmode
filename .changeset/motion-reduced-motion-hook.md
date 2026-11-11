---
"@howells/motion": minor
---

Added `usePrefersReducedMotion` at `@howells/motion/react`: a live, SSR-safe reduced-motion hook built on `useSyncExternalStore`. It lives on its own subpath so the token entry stays importable from server code; `react` is an optional peer dependency used only by that subpath.
