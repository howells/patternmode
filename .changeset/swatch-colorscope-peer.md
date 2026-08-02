---
"@patternmode/swatch": major
---

`@instruments/colorscope` moves from a regular dependency to a **required peer dependency**.

Swatch previously installed its own copy of `@instruments/colorscope`, which meant an app that also used colorscope directly resolved two copies — Swatch's, floating on its own caret, and the app's. Swatch now shares the host application's single instance.

**Consumers must declare `@instruments/colorscope` themselves**, satisfying `^3.7.1`. pnpm 8+ and npm 7+ auto-install missing peers, so most installs will succeed without changes; Yarn will warn or fail. Apps already depending on colorscope directly need no new dependency, only to confirm their version satisfies the range.

This is released as a major because it transfers a dependency responsibility to consumers and changes which colorscope version executes at runtime: Swatch now runs the host's copy rather than one it controlled.
