## 2026-05-22 00:32 — /arc:implement
**Task:** Aperto and Stacksheet architecture refactor
**Outcome:** Complete (4/4 tasks)
**Files:** packages/stacksheet/src/renderer.tsx, packages/stacksheet/src/sheet-panel.tsx, packages/stacksheet/src/renderer-effects.ts, packages/stacksheet/src/renderer-helpers.ts, packages/aperto/src/aperto.tsx, packages/aperto/src/media-rendering.tsx, packages/aperto/src/media-transition.tsx, packages/aperto/src/expanded-media-stage.tsx, apps/web/components/option-bar.tsx
**Agents spawned:** none; implemented directly in Codex
**Decisions:**
- Kept visual behavior unchanged and limited the work to internal module extraction.
- Added Stacksheet helper characterization tests because those pure helpers are now reusable boundaries.
- Used existing Aperto, Stacksheet, Deck, and web build checks as the behavior-preserving verification suite.
**Next:** Ready for review or push.

---
